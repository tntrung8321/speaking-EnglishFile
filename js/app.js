// ==================== LEVEL DATA ACCESSOR & RANDOMIZER ====================
function getLevelData(lvl) {
  const key = lvl || (typeof state !== "undefined" ? state.level : "A1");
  return (window.LEVEL_DATA && window.LEVEL_DATA[key]) || window.LEVEL_DATA["A1"];
}

function pickRandomFinalQuestions(lvl) {
  const data = getLevelData(lvl || "A1");
  if (!data || !data.final) return;
  const unitKeys = ["u12", "u34", "u56", "u78", "u910", "u1112"];
  const validKeys = unitKeys.filter(k => data[k] && Array.isArray(data[k].part1) && data[k].part1.length > 0);
  if (validKeys.length === 0) return;
  const shuffledUnits = [...validKeys].sort(() => Math.random() - 0.5).slice(0, 4);
  data.final.part1 = shuffledUnits.map(k => {
    const list = data[k].part1;
    const picked = list[Math.floor(Math.random() * list.length)];
    return { ...picked, unitTitle: data[k].title };
  });
}

pickRandomFinalQuestions("A1");
pickRandomFinalQuestions("A2");

// ==================== TAP-TO-SPEAK WORD ENGINE (WEB SPEECH API) ====================
const META_PHRASES = new Set([
  "choose 1 food item",
  "choose 1 drink item",
  "answer barman",
  "answer server",
  "ask total & give money",
  "your birthday",
  "partner's birthday"
]);

function isMetaInstruction(raw) {
  if (!raw) return true;
  const trimmed = raw.trim();
  if (/^\d+\.\s+/.test(trimmed)) return true; // Step instructions like "1. Ask food order"
  if (META_PHRASES.has(trimmed.toLowerCase())) return true;
  return false;
}

function cleanTokenForSpeech(token) {
  if (!token) return "";
  // Skip placeholders with "..." or letter-by-letter spellings like C-H-R-I-S
  if (token.includes("...")) return "";
  const stripped = token
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}✓✗🟢📍❓⬆️←→]/gu, "")
    .replace(/^[^a-zA-Z0-9£$]+|[^a-zA-Z0-9%]+$/g, "");
  if (!stripped) return "";
  if (/^[A-Z](-[A-Z]){2,}$/.test(stripped)) return "";

  if (/^Rest\.?$/i.test(stripped)) return "Restaurant";
  if (stripped === "St") return "Street";
  if (stripped === "Rd") return "Road";
  if (stripped === "Ave") return "Avenue";
  return stripped;
}

function escAttr(str) {
  return String(str || "").replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, "&quot;");
}

function renderSpeakableText(text, forceMeta = false) {
  if (!text) return "";
  if (forceMeta || isMetaInstruction(text)) {
    return text;
  }
  return text.split(/(\s+)/).map(part => {
    if (/^\s+$/.test(part)) return part;
    const spoken = cleanTokenForSpeech(part);
    if (!spoken || !/[a-zA-Z0-9]/.test(spoken)) {
      return part;
    }
    return `<span class="spk-word" onclick="speakWord(event, '${escAttr(spoken)}')">${part}</span>`;
  }).join("");
}

let cachedEnVoice = null;
let sharedAudio = null;
let activeSpkBtn = null;

function clearActiveSpkBtn() {
  if (activeSpkBtn) {
    activeSpkBtn.classList.remove("playing");
    activeSpkBtn = null;
  }
}

function setActiveSpkBtn(btn) {
  clearActiveSpkBtn();
  if (btn && btn.classList) {
    activeSpkBtn = btn;
    activeSpkBtn.classList.add("playing");
  }
}

function stopAllAudio() {
  clearActiveSpkBtn();
  if (sharedAudio) {
    sharedAudio.onended = null;
    sharedAudio.onerror = null;
    try { sharedAudio.pause(); } catch (e) {}
  }
  if ("speechSynthesis" in window && (window.speechSynthesis.speaking || window.speechSynthesis.pending)) {
    window.speechSynthesis.cancel();
  }
}

function pickBestEnglishVoice() {
  if (!("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices() || [];
  if (!voices.length) return null;
  const enVoices = voices.filter(v => {
    const lang = (v.lang || "").toLowerCase().replace("_", "-");
    const name = (v.name || "").toLowerCase();
    if (lang.startsWith("vi") || name.includes("viet")) return false;
    return lang.startsWith("en") || name.includes("english");
  });
  if (!enVoices.length) return null;
  return (
    enVoices.find(v => /en[-_]gb/i.test(v.lang) && /google|siri|daniel|kate|serena|natural/i.test(v.name)) ||
    enVoices.find(v => /en[-_]us/i.test(v.lang) && /google|siri|samantha|alex|natural/i.test(v.name)) ||
    enVoices.find(v => /en[-_]gb/i.test(v.lang)) ||
    enVoices.find(v => /en[-_]us/i.test(v.lang)) ||
    enVoices[0]
  );
}

if ("speechSynthesis" in window) {
  cachedEnVoice = pickBestEnglishVoice();
  if (typeof window.speechSynthesis.onvoiceschanged !== "undefined") {
    window.speechSynthesis.onvoiceschanged = () => {
      cachedEnVoice = pickBestEnglishVoice();
    };
  }
}

function speakViaWebSpeech(text, btn) {
  if (!("speechSynthesis" in window) || !text) {
    clearActiveSpkBtn();
    return;
  }
  cachedEnVoice = cachedEnVoice || pickBestEnglishVoice();
  const runSpeak = () => {
    const utter = new SpeechSynthesisUtterance(text);
    if (cachedEnVoice) {
      utter.voice = cachedEnVoice;
      utter.lang = (cachedEnVoice.lang || "en-US").replace("_", "-");
    } else {
      // en-US is preinstalled on 99% of Android/iOS phones (unlike en-GB which falls back to vi-VN!)
      utter.lang = "en-US";
    }
    utter.rate = 0.92;
    utter.onend = () => clearActiveSpkBtn();
    utter.onerror = () => clearActiveSpkBtn();
    if (btn) setActiveSpkBtn(btn);
    window.speechSynthesis.speak(utter);
  };

  if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
    window.speechSynthesis.cancel();
    setTimeout(runSpeak, 25);
  } else {
    runSpeak();
  }
}

function cleanSentenceForSpeech(rawText) {
  if (!rawText) return "";
  let s = String(rawText)
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}✓✗🟢📍❓⬆️←→]/gu, "")
    .replace(/\([^)]*=[^)]*\)/g, "")
    .replace(/My first name is\.\.\./gi, "My first name is Trung.")
    .replace(/My surname is\.\.\./gi, "My surname is Nguyen.")
    .replace(/My mother's name is\.\.\./gi, "My mother's name is Lan.")
    .replace(/My father's name is\.\.\./gi, "My father's name is Minh.")
    .replace(/\[090\.\.\.\]/gi, "0 9 0, 1 2 3, 4 5 6")
    .replace(/\[\.\.\.@gmail\.com\]/gi, "alex at gmail dot com")
    .replace(/\[£\.\.\.\]/g, "£10.50")
    .replace(/\[\$\.\.\.\]/g, "$10.50")
    .replace(/\b([A-Z])(?:-([A-Z])){2,}\b/g, m => m.split("-").join(", "))
    .replace(/\[([^\]]+)\]/g, (_, inner) => inner.replace(/\s*\/\s*/g, ", or "))
    .replace(/\bHe\s*\/\s*She\b/g, "He or she")
    .replace(/\bhis\s*\/\s*her\b/gi, "his or her")
    .replace(/\bVND\b/g, "Vietnamese dong")
    .replace(/\s*—\s*/g, ". ")
    .replace(/([.?!])\s*\/\s*/g, "$1 Or: ")
    .replace(/\s+\/\s+/g, ", or ")
    .replace(/\bRest\.(?=\s|$)/gi, "Restaurant")
    .replace(/\bSt\b/g, "Street")
    .replace(/\bRd\b/g, "Road")
    .replace(/\bAve\b/g, "Avenue")
    .replace(/\.\.\./g, ".")
    .replace(/\.\s*\./g, ".")
    .replace(/\s{2,}/g, " ")
    .trim();
  return s;
}

function splitSentenceChunks(text, maxLen = 175) {
  if (text.length <= maxLen) return [text];
  const sentences = text.split(/(?<=[.?!])\s+/);
  const chunks = [];
  let current = "";
  for (const part of sentences) {
    if (!part) continue;
    if ((current ? current.length + 1 + part.length : part.length) <= maxLen) {
      current = current ? `${current} ${part}` : part;
    } else {
      if (current) chunks.push(current);
      if (part.length <= maxLen) {
        current = part;
      } else {
        // Split very long single clause at commas or spaces
        const words = part.split(/\s+/);
        let sub = "";
        for (const w of words) {
          if ((sub ? sub.length + 1 + w.length : w.length) <= maxLen) {
            sub = sub ? `${sub} ${w}` : w;
          } else {
            if (sub) chunks.push(sub);
            sub = w;
          }
        }
        current = sub;
      }
    }
  }
  if (current) chunks.push(current);
  return chunks.length ? chunks : [text];
}

function speakSentence(event, rawText) {
  if (event) {
    event.stopPropagation();
  }
  const btn = event ? event.currentTarget : null;
  const cleaned = cleanSentenceForSpeech(rawText);
  if (!cleaned) return;

  stopAllAudio();

  if (navigator.onLine !== false) {
    try {
      if (!sharedAudio) {
        sharedAudio = new Audio();
        sharedAudio.referrerPolicy = "no-referrer";
      }
      const chunks = splitSentenceChunks(cleaned, 175);
      let idx = 0;

      const playNextChunk = () => {
        if (idx >= chunks.length) {
          clearActiveSpkBtn();
          return;
        }
        const chunk = chunks[idx++];
        sharedAudio.onended = () => playNextChunk();
        sharedAudio.onerror = () => {
          sharedAudio.onended = null;
          sharedAudio.onerror = null;
          speakViaWebSpeech(cleaned, btn);
        };
        sharedAudio.src = `https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=en-GB&q=${encodeURIComponent(chunk)}`;
        const p = sharedAudio.play();
        if (p && typeof p.catch === "function") {
          p.catch(() => {
            sharedAudio.onended = null;
            sharedAudio.onerror = null;
            speakViaWebSpeech(cleaned, btn);
          });
        }
      };

      setActiveSpkBtn(btn);
      playNextChunk();
      return;
    } catch (e) {
      // Fall through to Web Speech API
    }
  }

  speakViaWebSpeech(cleaned, btn);
}

function speakWord(event, word) {
  if (event) {
    event.stopPropagation();
  }
  if (!word) return;

  stopAllAudio();

  // Primary on mobile & web: Real British English dictionary audio (never reads in Vietnamese!)
  const isPureEnglishWord = /^[a-zA-Z][a-zA-Z']*$/.test(word);
  if (isPureEnglishWord && navigator.onLine !== false) {
    try {
      if (!sharedAudio) {
        sharedAudio = new Audio();
        sharedAudio.referrerPolicy = "no-referrer";
      }
      sharedAudio.onended = null;
      sharedAudio.onerror = () => {
        sharedAudio.onerror = null;
        speakViaWebSpeech(word);
      };
      sharedAudio.src = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(word)}&type=1`;
      const playPromise = sharedAudio.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          sharedAudio.onerror = null;
          speakViaWebSpeech(word);
        });
      }
      return;
    } catch (e) {
      // Fall through to Web Speech API
    }
  }

  speakViaWebSpeech(word);
}

// ==================== LIGHTBULB 💡 HINT TOGGLE, LISTENING MODE & IMAGE VIEWER STATE ====================
let openHints = {};
let revealedP1 = {};
let zoomedImgSrc = null;
let spotViewMode = "stack"; // "stack" (Pic A full-width above Pic B), "A", "B", or "side"
let zoomScale = 1.6;
let zoomTab = "A"; // Inside fullscreen modal: "A", "B", or "stack"

function clearHints() {
  stopAllAudio();
  openHints = {};
  revealedP1 = {};
  zoomedImgSrc = null;
}

function toggleHint(event, key) {
  if (event) {
    event.stopPropagation();
  }
  stopAllAudio();
  openHints[key] = !openHints[key];
  render();
}

function toggleP1ListeningMode(event) {
  if (event) event.stopPropagation();
  stopAllAudio();
  state.hideP1Text = !state.hideP1Text;
  revealedP1 = {};
  render();
}

function toggleRevealP1Card(event, key) {
  if (event) event.stopPropagation();
  revealedP1[key] = !revealedP1[key];
  render();
}

function setSpotViewMode(event, mode) {
  if (event) event.stopPropagation();
  spotViewMode = mode;
  render();
}

function openImageZoom(event, src, initialTab) {
  if (event) event.stopPropagation();
  zoomedImgSrc = src;
  zoomTab = initialTab || (spotViewMode === "B" ? "B" : "A");
  zoomScale = 1.6;
  render();
}

function closeImageZoom(event) {
  if (event) event.stopPropagation();
  zoomedImgSrc = null;
  render();
}

function setZoomTab(event, tab) {
  if (event) event.stopPropagation();
  zoomTab = tab;
  render();
}

function setZoomScale(event, scale) {
  if (event) event.stopPropagation();
  zoomScale = scale;
  render();
}

// ==================== COMPACT EXAM TIMER ====================
let timerState = {
  seconds: 240,
  defaultSeconds: 240,
  running: false,
  intervalId: null
};

function setTimerMode(part) {
  stopTimerInterval();
  const secs = part === 1 ? 240 : 180; // Part 1: 4 mins (240s), Part 2: 3 mins (180s)
  timerState.seconds = secs;
  timerState.defaultSeconds = secs;
  timerState.running = false;
  renderHeaderCenter();
}

function stopTimerInterval() {
  if (timerState.intervalId) {
    clearInterval(timerState.intervalId);
    timerState.intervalId = null;
  }
  timerState.running = false;
}

function toggleTimer(event) {
  if (event) event.stopPropagation();
  if (timerState.running) {
    stopTimerInterval();
    renderHeaderCenter();
    return;
  }
  if (timerState.seconds <= 0) {
    timerState.seconds = timerState.defaultSeconds;
  }
  timerState.running = true;
  timerState.intervalId = setInterval(() => {
    if (timerState.seconds > 0) {
      timerState.seconds--;
      renderHeaderCenter();
    } else {
      stopTimerInterval();
      renderHeaderCenter();
    }
  }, 1000);
  renderHeaderCenter();
}

function resetTimer(event) {
  if (event) event.stopPropagation();
  stopTimerInterval();
  timerState.seconds = timerState.defaultSeconds;
  renderHeaderCenter();
}

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function renderHeaderCenter() {
  const el = document.getElementById("headerCenter");
  if (!el) return;
  if (state.screen !== "scene_p1" && state.screen !== "scene_p2") {
    el.innerHTML = `<div class="brand">English File ${state.level}</div>`;
    return;
  }
  let statusClass = "";
  if (timerState.seconds === 0) statusClass = "expired";
  else if (timerState.running && timerState.seconds <= 30) statusClass = "warn";
  else if (timerState.running) statusClass = "running";

  const icon = timerState.running ? "⏸" : "▶";
  el.innerHTML = `
    <button class="timer-pill ${statusClass}" onclick="toggleTimer(event)" title="Start / Pause Timer">
      ⏱️ ${formatTime(timerState.seconds)} ${icon}
    </button>
    <button class="timer-reset" onclick="resetTimer(event)" title="Reset Timer">↺</button>
  `;
}

// ==================== STATE ====================
let state = {
  level: "A1",
  screen: "home",
  unitKey: null,
  part: null,
  scenarioIdx: 0,
  variantIdx: 0,
  role: "A",
  showAllFinalP1: false,
  hideP1Text: true
};

let historyStack = [];

function selectLevel(lvl) {
  if (state.level === lvl && state.screen === "home") return;
  stopTimerInterval();
  clearHints();
  historyStack = [];
  const data = getLevelData(lvl);
  if (data && data.final && (!data.final.part1 || data.final.part1.length === 0)) {
    pickRandomFinalQuestions(lvl);
  }
  state = {
    level: lvl,
    screen: "home",
    unitKey: null,
    part: null,
    scenarioIdx: 0,
    variantIdx: 0,
    role: "A",
    showAllFinalP1: false,
    hideP1Text: true
  };
  render();
}

function getActiveScenario() {
  const data = getLevelData();
  const unit = data[state.unitKey];
  const entry = unit.part2.scenarios[state.scenarioIdx];
  if (entry && entry.variants) {
    return entry.variants[state.variantIdx % entry.variants.length];
  }
  return entry;
}

function navigate(newState) {
  historyStack.push({ ...state });
  const prevScreen = state.screen;
  state = { ...state, ...newState };
  clearHints();
  if (state.screen === "scene_p1" && prevScreen !== "scene_p1") {
    setTimerMode(1);
  } else if (state.screen === "scene_p2" && prevScreen !== "scene_p2") {
    setTimerMode(2);
  } else if (state.screen !== "scene_p1" && state.screen !== "scene_p2") {
    stopTimerInterval();
  }
  render();
}

function goBack() {
  if (historyStack.length > 0) {
    state = historyStack.pop();
    clearHints();
    if (state.screen !== "scene_p1" && state.screen !== "scene_p2") {
      stopTimerInterval();
    }
    render();
  }
}

function goHome() {
  stopTimerInterval();
  clearHints();
  historyStack = [];
  state = {
    ...state,
    screen: "home",
    unitKey: null,
    part: null,
    scenarioIdx: 0,
    variantIdx: 0,
    role: "A",
    showAllFinalP1: false
  };
  render();
}

// ==================== RENDER ====================
function render() {
  const app = document.getElementById("app");
  document.getElementById("backBtn").style.visibility = state.screen === "home" ? "hidden" : "visible";
  renderHeaderCenter();

  if (state.screen === "home") renderHome(app);
  else if (state.screen === "mode") renderMode(app);
  else if (state.screen === "role") renderRoleSelect(app);
  else if (state.screen === "scene_p1") renderPart1Scene(app);
  else if (state.screen === "scene_p2") renderPart2Scene(app);
}

function renderLevelBar() {
  const levels = [
    { id: "A1" },
    { id: "A2" }
  ];
  const tabsHtml = levels.map(l => {
    const activeClass = state.level === l.id ? "active" : "";
    return `
      <button class="level-tab ${activeClass}" onclick="selectLevel('${l.id}')">
        <span>Level ${l.id}</span>
      </button>
    `;
  }).join("");
  return `<div class="level-bar">${tabsHtml}</div>`;
}

function renderHome(app) {
  const data = getLevelData();

  let html = renderLevelBar();
  html += `<div class="screen-title">Choose Unit (${state.level})</div><div class="grid grid-2">`;

  for (const [key, item] of Object.entries(data)) {
    const isLocked = item.unlocked === false;
    const clickAttr = isLocked
      ? ""
      : `onclick="navigate({screen: 'mode', unitKey: '${key}'})"`;

    if (key === "final") {
      html += `
        <div class="big-card final-banner ${isLocked ? 'locked-unit' : ''}" ${clickAttr}>
          <div class="final-left">
            <div class="final-icon">${item.icon}</div>
            <div>
              <div class="card-title" style="color: var(--ask-color);">${item.title}</div>
              <div class="card-sub">${item.subtitle}</div>
            </div>
          </div>
          <div class="final-arrow">${isLocked ? '🔒' : '→'}</div>
        </div>
      `;
    } else {
      html += `
        <div class="big-card ${isLocked ? 'locked-unit' : 'active-unit'}" ${clickAttr}>
          <div class="card-icon">${item.icon}</div>
          <div class="card-title">${item.title}</div>
          <div class="card-sub">${item.subtitle}</div>
        </div>
      `;
    }
  }
  html += `</div>`;
  app.innerHTML = html;
}

function renderMode(app) {
  const data = getLevelData();
  const unit = data[state.unitKey];
  const p1Sub = state.unitKey === "final"
    ? "4 Random Exam Questions • 🎧 Listening Mode"
    : "8 Questions • 🎧 Listening Mode & 🔊 Full-Sentence Audio";

  app.innerHTML = `
    <div class="screen-title">${unit.icon} ${unit.title}</div>
    <div class="grid">
      <div class="big-card" style="border-color: var(--primary);" onclick="navigate({screen: 'scene_p1', part: 1, hideP1Text: true})">
        <div class="card-icon">🎙️</div>
        <div class="card-title">Part 1: Social Interaction</div>
        <div class="card-sub">${p1Sub}</div>
      </div>
      <div class="big-card" style="border-color: var(--ask-color);" onclick="navigate({screen: 'role', part: 2, scenarioIdx: 0, variantIdx: 0})">
        <div class="card-icon">👥</div>
        <div class="card-title">Part 2: Pair Role-play</div>
        <div class="card-sub">${unit.part2.taskName}</div>
      </div>
    </div>
    <div class="pedagogy-note">
      <div class="pedagogy-note-header">💡 Study Tip • Lưu ý khi ôn luyện</div>
      <p class="pedagogy-note-en">
        All <strong>💡 Hints</strong> are <strong>sample suggestions only</strong>, not fixed exam answers. Use your own real ideas and personal details instead of memorizing mechanically!
      </p>
      <p class="pedagogy-note-vi">
        Các câu trong mục <strong>💡 Gợi ý</strong> chỉ mang tính tham khảo về cấu trúc &amp; ý tưởng, <strong>không phải đáp án bắt buộc</strong>. Hãy linh hoạt thay đổi theo thông tin thật của bạn để nói tự nhiên, tránh học thuộc lòng rập khuôn nhé!
      </p>
    </div>
  `;
}

function renderRoleSelect(app) {
  const data = getLevelData();
  const unit = data[state.unitKey];
  const scenarios = unit.part2.scenarios;
  const isFinal = state.unitKey === "final";

  let pillsHtml = `<div class="scenario-pills" style="justify-content:center; margin-bottom:10px;">`;
  scenarios.forEach((sc, idx) => {
    const active = idx === state.scenarioIdx ? "active" : "";
    const text = sc.label || `Scenario ${idx + 1}`;
    pillsHtml += `<div class="pill ${active}" onclick="selectScenario(${idx})">${text}</div>`;
  });
  pillsHtml += `</div>`;

  let variantHtml = "";
  if (isFinal && scenarios[state.scenarioIdx].variants) {
    const vars = scenarios[state.scenarioIdx].variants;
    variantHtml = `<div class="scenario-pills" style="justify-content:center; margin-bottom:12px;">`;
    vars.forEach((v, vIdx) => {
      const active = vIdx === state.variantIdx ? "active" : "";
      variantHtml += `<div class="pill ${active}" onclick="selectVariant(${vIdx})">Set #${vIdx + 1}</div>`;
    });
    variantHtml += `</div>`;
  }

  app.innerHTML = `
    <div class="screen-title">Choose Scenario & Role</div>
    ${pillsHtml}
    ${variantHtml}
    <div class="grid grid-2">
      <div class="big-card role-btn-a" onclick="navigate({screen: 'scene_p2', role: 'A'})">
        <div class="card-icon">A</div>
        <div class="card-title">Student A</div>
      </div>
      <div class="big-card role-btn-b" onclick="navigate({screen: 'scene_p2', role: 'B'})">
        <div class="card-icon">B</div>
        <div class="card-title">Student B</div>
      </div>
    </div>
  `;
}

function selectScenario(idx) {
  state.scenarioIdx = idx;
  state.variantIdx = 0;
  clearHints();
  render();
}

function selectVariant(vIdx) {
  state.variantIdx = vIdx;
  clearHints();
  render();
}

// Part 1: Exam Listening Mode (questions hidden by default) + Full-Sentence Audio 🔊 + Word Tap + 💡 Answer Hint
function renderPart1Scene(app) {
  const data = getLevelData();
  const unit = data[state.unitKey];
  const isFinal = state.unitKey === "final";
  const activeList = (isFinal && state.showAllFinalP1) ? unit.allPart1 : unit.part1;

  const modeTitle = state.hideP1Text
    ? "🎧 Listening Mode (Questions Hidden)"
    : "📖 Reading Mode (Questions Visible)";
  const modeSub = state.hideP1Text
    ? "Listen to 🔊 &amp; answer aloud • 👁️ Check text • 💡 Sample hint"
    : "🔊 Full sentence • Tap any word to look up • 💡 Sample hint";

  let html = `
    <div class="screen-title">${unit.title} — Part 1</div>
    <div class="listen-mode-bar ${state.hideP1Text ? 'is-listening' : 'is-reading'}">
      <div class="listen-mode-info">
        <span class="listen-mode-title">${modeTitle}</span>
        <span class="listen-mode-sub">${modeSub}</span>
      </div>
      <button class="listen-toggle-btn" onclick="toggleP1ListeningMode(event)">
        ${state.hideP1Text ? "👁️ Show All" : "🎧 Hide Text"}
      </button>
    </div>
  `;

  if (isFinal) {
    html += `
      <div class="random-bar">
        <button class="random-btn" onclick="drawNewMockP1()">🎲 Random 4 Questions</button>
        <button class="random-btn secondary" onclick="toggleAllFinalP1()">
          ${state.showAllFinalP1 ? "Show 4 Exam Qs" : "All 48 Qs"}
        </button>
      </div>
    `;
  }

  activeList.forEach((item, i) => {
    const key = `p1-${i}`;
    const isPeeking = !!openHints[key];
    const isHidden = state.hideP1Text && !revealedP1[key];
    const badgeLabel = isPeeking
      ? `Answer Hint • Q${i + 1}`
      : (item.unitTitle ? `Q${i + 1} • ${item.unitTitle}` : `Question ${i + 1}`);

    if (isPeeking) {
      html += `
        <div class="qa-card peeking">
          <div class="qa-top">
            <span class="qa-num">${badgeLabel}</span>
            <div class="card-actions">
              <button class="spk-sent-btn" onclick="speakSentence(event, '${escAttr(item.h)}')" title="Listen to full sample answer">🔊</button>
              <button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Close Answer Hint">💡</button>
            </div>
          </div>
          <div class="qa-sub-q">
            <button class="mini-spk-btn" onclick="speakSentence(event, '${escAttr(item.q)}')" title="Replay question">🔊</button>
            <span>${renderSpeakableText(item.q)}</span>
          </div>
          <div class="qa-main-text">${renderSpeakableText(item.h)}</div>
        </div>
      `;
    } else if (isHidden) {
      html += `
        <div class="qa-card masked-q">
          <div class="qa-top">
            <span class="qa-num">${badgeLabel}</span>
            <div class="card-actions">
              <button class="eye-btn" onclick="toggleRevealP1Card(event, '${key}')" title="Show question text">👁️ Text</button>
              <button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Answer Hint">💡</button>
            </div>
          </div>
          <button class="listen-hero-btn" onclick="speakSentence(event, '${escAttr(item.q)}')">
            <span class="listen-hero-icon">🔊</span>
            <span>Listen to Question ${i + 1}</span>
          </button>
        </div>
      `;
    } else {
      html += `
        <div class="qa-card">
          <div class="qa-top">
            <span class="qa-num">${badgeLabel}</span>
            <div class="card-actions">
              ${state.hideP1Text ? `<button class="eye-btn active" onclick="toggleRevealP1Card(event, '${key}')" title="Hide question text">🙈 Hide</button>` : ""}
              <button class="spk-sent-btn" onclick="speakSentence(event, '${escAttr(item.q)}')" title="Listen to full question">🔊</button>
              <button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Answer Hint">💡</button>
            </div>
          </div>
          <div class="qa-main-text">${renderSpeakableText(item.q)}</div>
        </div>
      `;
    }
  });
  app.innerHTML = html;
}

function drawNewMockP1() {
  pickRandomFinalQuestions(state.level);
  state.showAllFinalP1 = false;
  clearHints();
  resetTimer();
  render();
}

function toggleAllFinalP1() {
  state.showAllFinalP1 = !state.showAllFinalP1;
  clearHints();
  render();
}

// Render a corner/side lot on the Crossroads Map (supports 1 or 2 buildings per lot)
function renderMapLot(lotItems, lotIdx) {
  const innerHtml = lotItems.map((cell, subIdx) => {
    const key = `map-${lotIdx}-${subIdx}`;
    const isKnownByRole = cell.knownBy === state.role;
    const isLandmark = cell.knownBy === "BOTH";

    if (isKnownByRole) {
      const isPeeking = !!openHints[key];
      if (isPeeking) {
        return `
          <div class="bldg-box bldg-known peeking">
            <span class="bldg-name">${renderSpeakableText(cell.dir)}</span>
            <button class="spk-sent-btn map-spk-btn" onclick="speakSentence(event, '${escAttr(cell.dir)}')" title="Listen to full directions">🔊</button>
            <button class="hint-btn map-hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Directions">💡</button>
          </div>
        `;
      }

      return `
        <div class="bldg-box bldg-known">
          <span class="bldg-tag">🟢 YOU KNOW [${cell.num}]</span>
          <span class="bldg-name">${renderSpeakableText(cell.name)}</span>
          <span class="bldg-sub">Tap 💡 for directions</span>
          <button class="hint-btn map-hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Directions">💡</button>
        </div>
      `;
    }

    if (isLandmark) {
      return `
        <div class="bldg-box bldg-landmark">
          <span class="bldg-tag">📍 LANDMARK</span>
          <span class="bldg-name">${renderSpeakableText(cell.name)}</span>
        </div>
      `;
    }

    return `
      <div class="bldg-box bldg-mystery">
        <span class="bldg-tag">UNKNOWN</span>
        <span class="bldg-name">❓ Building [${cell.num}]</span>
        <span class="bldg-sub">Unlabelled</span>
      </div>
    `;
  }).join("");

  return `<div class="map-lot">${innerHtml}</div>`;
}

// Render Follow-up Question card at the bottom of A2 Part 2 tasks
function renderFollowUpCard(followUpItem) {
  if (!followUpItem) return "";
  const key = `followup-${state.role}`;
  const isPeeking = !!openHints[key];
  const badgeText = isPeeking
    ? `Follow-up Answer Hint (Student ${state.role})`
    : `💬 Follow-up Question for Student ${state.role}`;
  const subQuestionHtml = isPeeking
    ? `
      <div class="qa-sub-q">
        <button class="mini-spk-btn" onclick="speakSentence(event, '${escAttr(followUpItem.q)}')" title="Replay follow-up question">🔊</button>
        <span>${renderSpeakableText(followUpItem.q)}</span>
      </div>
    `
    : "";
  const bodyText = isPeeking ? followUpItem.h : followUpItem.q;

  return `
    <div class="qa-card followup-card ${isPeeking ? 'peeking' : ''}">
      <div class="qa-top">
        <span class="qa-num">${badgeText}</span>
        <div class="card-actions">
          <button class="spk-sent-btn" onclick="speakSentence(event, '${escAttr(bodyText)}')" title="Listen to full sentence">🔊</button>
          <button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Answer Hint">💡</button>
        </div>
      </div>
      ${subQuestionHtml}
      <div class="qa-main-text">${renderSpeakableText(bodyText)}</div>
    </div>
  `;
}

// Render A2 "Spot the Differences" Interactive Scene
function renderSpotDiffBody(sd) {
  const diffCardsHtml = sd.diffs.map((d, idx) => {
    const key = `diff-${idx}`;
    const isPeeking = !!openHints[key];

    if (isPeeking) {
      return `
        <div class="diff-box peeking">
          <div class="diff-content">
            <span class="diff-peek-label">${d.label}</span>
            <span class="diff-sentence">${renderSpeakableText(d.sentence)}</span>
          </div>
          <div class="card-actions-col">
            <button class="spk-sent-btn" onclick="speakSentence(event, '${escAttr(d.sentence)}')" title="Listen to full sentence">🔊</button>
            <button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Comparison Sentence">💡</button>
          </div>
        </div>
      `;
    }

    return `
      <div class="diff-box">
        <div class="diff-content">
          <span class="diff-label">${d.label}</span>
          <div class="diff-pair">
            <span class="diff-ab"><strong class="tag-a">Pic A:</strong> ${renderSpeakableText(d.a)}</span>
            <span class="diff-ab"><strong class="tag-b">Pic B:</strong> ${renderSpeakableText(d.b)}</span>
          </div>
        </div>
        <button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Comparison Sentence">💡</button>
      </div>
    `;
  }).join("");

  const followUpItem = sd.followUp ? sd.followUp[state.role] : null;

  // Build Main Photo Display (Default: Picture A full-width stacked above Picture B full-width -> 2x larger on phones!)
  let photoBodyHtml = "";
  if (spotViewMode === "stack") {
    photoBodyHtml = `
      <div class="spot-stack">
        <div class="half-crop" onclick="openImageZoom(event, '${sd.img}', 'A')" title="Tap to zoom Picture A">
          <img src="${sd.img}" alt="Picture A" class="half-img half-img-a">
        </div>
        <div class="half-crop" onclick="openImageZoom(event, '${sd.img}', 'B')" title="Tap to zoom Picture B">
          <img src="${sd.img}" alt="Picture B" class="half-img half-img-b">
        </div>
      </div>
    `;
  } else if (spotViewMode === "A") {
    photoBodyHtml = `
      <div class="half-crop" onclick="openImageZoom(event, '${sd.img}', 'A')" title="Tap to zoom Picture A">
        <img src="${sd.img}" alt="Picture A" class="half-img half-img-a">
      </div>
    `;
  } else if (spotViewMode === "B") {
    photoBodyHtml = `
      <div class="half-crop" onclick="openImageZoom(event, '${sd.img}', 'B')" title="Tap to zoom Picture B">
        <img src="${sd.img}" alt="Picture B" class="half-img half-img-b">
      </div>
    `;
  } else {
    photoBodyHtml = `
      <div class="spot-img-wrap" onclick="openImageZoom(event, '${sd.img}', 'stack')">
        <img src="${sd.img}" alt="${sd.title}" class="spot-img">
      </div>
    `;
  }

  let zoomModalHtml = "";
  if (zoomedImgSrc) {
    const scalePct = Math.round(zoomScale * 100);
    let zoomedInnerHtml = "";
    if (zoomTab === "A") {
      zoomedInnerHtml = `
        <div class="half-crop zoom-crop">
          <img src="${zoomedImgSrc}" alt="Picture A" class="half-img half-img-a">
        </div>
      `;
    } else if (zoomTab === "B") {
      zoomedInnerHtml = `
        <div class="half-crop zoom-crop">
          <img src="${zoomedImgSrc}" alt="Picture B" class="half-img half-img-b">
        </div>
      `;
    } else {
      zoomedInnerHtml = `
        <div class="spot-stack">
          <div class="half-crop zoom-crop">
            <img src="${zoomedImgSrc}" alt="Picture A" class="half-img half-img-a">
          </div>
          <div class="half-crop zoom-crop">
            <img src="${zoomedImgSrc}" alt="Picture B" class="half-img half-img-b">
          </div>
        </div>
      `;
    }

    zoomModalHtml = `
      <div class="img-zoom-backdrop">
        <div class="img-zoom-topbar">
          <div class="zoom-tabs">
            <button class="z-btn ${zoomTab === 'A' ? 'active' : ''}" onclick="setZoomTab(event, 'A')">Pic A</button>
            <button class="z-btn ${zoomTab === 'B' ? 'active' : ''}" onclick="setZoomTab(event, 'B')">Pic B</button>
            <button class="z-btn ${zoomTab === 'stack' ? 'active' : ''}" onclick="setZoomTab(event, 'stack')">A & B</button>
          </div>
          <div class="zoom-scales">
            <button class="z-btn ${zoomScale === 1 ? 'active' : ''}" onclick="setZoomScale(event, 1)">1x</button>
            <button class="z-btn ${zoomScale === 1.6 ? 'active' : ''}" onclick="setZoomScale(event, 1.6)">1.6x</button>
            <button class="z-btn ${zoomScale === 2.4 ? 'active' : ''}" onclick="setZoomScale(event, 2.4)">2.4x</button>
          </div>
          <button class="z-close-btn" onclick="closeImageZoom(event)" title="Close">✕</button>
        </div>
        <div class="img-zoom-scroll">
          <div class="img-zoom-canvas" style="width: ${scalePct}%;">
            ${zoomedInnerHtml}
          </div>
        </div>
        <div class="img-zoom-footer">Vuốt để kéo xem chi tiết • Bấm Pic A / Pic B để so sánh nhanh</div>
      </div>
    `;
  }

  return `
    <div class="spot-photo-card">
      <div class="spot-photo-header">
        <span>🖼️ ${sd.title}</span>
        <button class="zoom-badge" onclick="openImageZoom(event, '${sd.img}', '${spotViewMode === 'B' ? 'B' : 'A'}')">🔍 Phóng to</button>
      </div>
      <div class="spot-view-bar">
        <button class="view-mode-btn ${spotViewMode === 'stack' ? 'active' : ''}" onclick="setSpotViewMode(event, 'stack')">↕ A & B (To)</button>
        <button class="view-mode-btn ${spotViewMode === 'A' ? 'active' : ''}" onclick="setSpotViewMode(event, 'A')">Pic A</button>
        <button class="view-mode-btn ${spotViewMode === 'B' ? 'active' : ''}" onclick="setSpotViewMode(event, 'B')">Pic B</button>
        <button class="view-mode-btn ${spotViewMode === 'side' ? 'active' : ''}" onclick="setSpotViewMode(event, 'side')">A | B</button>
      </div>
      ${photoBodyHtml}
      <div class="spot-instruct">${sd.instruction}</div>
    </div>

    <div class="section-card ask-section">
      <div class="section-header header-ask">
        <span>8 DIFFERENCES (DESCRIBE AT LEAST 6)</span>
        <span class="hint-legend">💡 Sentence + 🔊</span>
      </div>
      <div class="diff-list">
        ${diffCardsHtml}
      </div>
    </div>

    ${renderFollowUpCard(followUpItem)}
    ${zoomModalHtml}
  `;
}

// Part 2: Supports Spot the Differences, Interactive Map, and Chronological ASK/GIVE Role-play
function renderPart2Scene(app) {
  const data = getLevelData();
  const unit = data[state.unitKey];
  const scenarios = unit.part2.scenarios;
  const currentSc = getActiveScenario();
  const isFinal = state.unitKey === "final";

  let pillsHtml = `<div class="scenario-pills">`;
  scenarios.forEach((sc, idx) => {
    const active = idx === state.scenarioIdx ? "active" : "";
    const text = sc.label || `#${idx + 1}`;
    pillsHtml += `<div class="pill ${active}" onclick="changeSceneScenario(${idx})">${text}</div>`;
  });
  if (isFinal) {
    pillsHtml += `<div class="pill" style="border-color:var(--ask-color); color:var(--ask-color);" onclick="randomFinalScenario()" title="Random Task & Set">🎲</div>`;
  }
  pillsHtml += `</div>`;

  const badgeClass = state.role === "A" ? "badge-a" : "badge-b";
  const otherRole = state.role === "A" ? "B" : "A";

  let variantBtnHtml = "";
  if (isFinal && scenarios[state.scenarioIdx].variants) {
    const totalVars = scenarios[state.scenarioIdx].variants.length;
    variantBtnHtml = `<button class="variant-pill" onclick="cycleFinalVariant()" title="Switch Exam Set">Set #${state.variantIdx + 1}/${totalVars} ↻</button>`;
  }

  const topControlsHtml = `
    <div class="top-controls">
      ${pillsHtml}
      <div class="role-switch-group">
        ${variantBtnHtml}
        <span class="role-badge ${badgeClass}">Role ${state.role}</span>
        <button class="switch-btn" onclick="switchRole()">Switch → ${otherRole}</button>
      </div>
    </div>
  `;

  // Branch 1: Spot the Differences (Level A2 Task 1)
  if (currentSc.spotDiff) {
    app.innerHTML = topControlsHtml + renderSpotDiffBody(currentSc.spotDiff);
    return;
  }

  const roleData = currentSc[state.role];

  // Build ASK Section HTML
  const isStepListAsk = roleData.ask.length > 0 && roleData.ask.every(r => /^\d+\./.test(r.label.trim()));
  let askItems = roleData.ask.map((row, idx) => {
    const key = `ask-${idx}`;
    const isPeeking = !!openHints[key];
    const noQMark = /\?$/.test(row.label.trim()) || /^\d+\.\s*Advice/i.test(row.label.trim());

    if (isPeeking) {
      return `
        <div class="ask-box peeking">
          <div class="ask-content">
            <span class="ask-peek-label">${row.label}</span>
            <span class="ask-text">${renderSpeakableText(row.q)}</span>
          </div>
          <div class="card-actions-col">
            <button class="spk-sent-btn" onclick="speakSentence(event, '${escAttr(row.q)}')" title="Listen to full sentence">🔊</button>
            <button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Full Sentence">💡</button>
          </div>
        </div>
      `;
    }

    const contentHtml = `${renderSpeakableText(row.label)}${noQMark ? "" : '<span class="q-inline">?</span>'}`;
    return `
      <div class="ask-box">
        <span class="ask-text">${contentHtml}</span>
        <button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Full Sentence">💡</button>
      </div>
    `;
  }).join("");

  const cleanAskTitle = roleData.askTitle.replace(/\s*\(Hold.*?\)/i, "");
  const askSectionHtml = `
    <div class="section-card ask-section">
      <div class="section-header header-ask">
        <span>${cleanAskTitle}</span>
        <span class="hint-legend">💡 Hint + 🔊</span>
      </div>
      <div class="${isStepListAsk ? 'step-list' : 'compact-grid'}">
        ${askItems}
      </div>
    </div>
  `;

  // Build GIVE (or Interactive Map) Section HTML
  let giveOrMapHtml = "";
  if (currentSc.interactiveMap) {
    const im = currentSc.interactiveMap;
    const lots = im.lots;
    giveOrMapHtml = `
      <div class="crossroads-card">
        <div class="map-header">
          <span>🗺️ Map (Tap 💡 on 🟢 for directions + 🔊)</span>
          <span>❓ = Unlabelled</span>
        </div>
        <div class="crossroads-grid">
          ${renderMapLot(lots[0], 0)}
          <div class="road-v"><span class="road-v-label">${im.vRoad}</span></div>
          ${renderMapLot(lots[1], 1)}

          <div class="road-h">
            <span class="road-h-label">← ${im.hRoadTop}</span>
            <span class="road-h-label">${im.hRoadTop} →</span>
          </div>

          ${renderMapLot(lots[2], 2)}
          <div class="road-v"><span class="road-v-label">${im.vRoad}</span></div>
          ${renderMapLot(lots[3], 3)}

          <div class="road-h">
            <span class="road-h-label">← ${im.hRoadBot}</span>
            <span class="road-h-label">${im.hRoadBot} →</span>
          </div>

          ${renderMapLot(lots[4], 4)}
          <div class="start-point">
            <div class="start-Pin">
              <span class="start-arrow">⬆️</span>
              YOU ARE<br>HERE
            </div>
          </div>
          ${renderMapLot(lots[5], 5)}
        </div>
      </div>
    `;
  } else {
    const isStepListGive = roleData.give.length > 0 && roleData.give.every(g => /^\d+\./.test(g.label.trim()));
    let giveItems = roleData.give.map((item, idx) => {
      const key = `give-${idx}`;
      const isPeeking = !!openHints[key];
      const valHtml = isPeeking
        ? renderSpeakableText(item.a)
        : renderSpeakableText(item.val);
      const actionsHtml = isPeeking
        ? `
          <div class="card-actions-col">
            <button class="spk-sent-btn" onclick="speakSentence(event, '${escAttr(item.a)}')" title="Listen to full sentence">🔊</button>
            <button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Full Sentence">💡</button>
          </div>
        `
        : `<button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Full Sentence">💡</button>`;

      return `
        <div class="you-box ${isPeeking ? 'peeking' : ''}">
          <div class="you-content">
            <span class="you-label">${renderSpeakableText(item.label)}</span>
            <span class="you-val">${valHtml}</span>
          </div>
          ${actionsHtml}
        </div>
      `;
    }).join("");

    const cleanGiveTitle = roleData.giveTitle.replace(/\s*\(Hold.*?\)/i, "");
    giveOrMapHtml = `
      <div class="section-card you-section">
        <div class="section-header header-give">
          <span>${cleanGiveTitle}</span>
          <span class="hint-legend">💡 Hint + 🔊</span>
        </div>
        <div class="${isStepListGive ? 'step-list' : 'compact-grid'}">
          ${giveItems}
        </div>
      </div>
    `;
  }

  // Chronological order: if roleData.askFirst is true, put ASK box on top and GIVE box below!
  const mainBodyHtml = (roleData.askFirst && !currentSc.interactiveMap)
    ? (askSectionHtml + giveOrMapHtml)
    : (giveOrMapHtml + askSectionHtml);

  const followUpHtml = renderFollowUpCard(roleData.followUp);

  app.innerHTML = `
    ${topControlsHtml}
    ${mainBodyHtml}
    ${followUpHtml}
  `;
}

function cycleFinalVariant() {
  const data = getLevelData();
  const entry = data.final.part2.scenarios[state.scenarioIdx];
  if (!entry || !entry.variants) return;
  state.variantIdx = (state.variantIdx + 1) % entry.variants.length;
  clearHints();
  render();
}

function randomFinalScenario() {
  const data = getLevelData();
  const scenarios = data.final.part2.scenarios;
  const count = scenarios.length;
  let nextTask = Math.floor(Math.random() * count);
  if (nextTask === state.scenarioIdx && count > 1) nextTask = (nextTask + 1) % count;
  state.scenarioIdx = nextTask;
  const vars = scenarios[nextTask].variants;
  state.variantIdx = vars ? Math.floor(Math.random() * vars.length) : 0;
  clearHints();
  resetTimer();
  render();
}

function changeSceneScenario(idx) {
  state.scenarioIdx = idx;
  state.variantIdx = 0;
  clearHints();
  render();
}

function switchRole() {
  state.role = state.role === "A" ? "B" : "A";
  clearHints();
  render();
}

render();
