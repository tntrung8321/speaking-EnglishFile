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

// ==================== CRISP GEOMETRIC SVG LINE ICONS (ANTI-SLOP UI SYSTEM) ====================
const ICONS = {
  eye: `<svg class="ui-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.06 12.35a1 1 0 0 1 0-.7C3.78 7.5 7.56 5 12 5s8.22 2.5 9.94 6.65a1 1 0 0 1 0 .7C20.22 16.5 16.44 19 12 19s-8.22-2.5-9.94-6.65Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  eyeOff: `<svg class="ui-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c4.44 0 8.22 2.5 9.94 6.65a1 1 0 0 1 0 .7 10.7 10.7 0 0 1-1.92 3.12"/><path d="M6.61 6.61A11.2 11.2 0 0 0 2.06 11.65a1 1 0 0 0 0 .7C3.78 16.5 7.56 19 12 19a10.4 10.4 0 0 0 5.39-1.47"/><path d="M14.12 14.12a3 3 0 0 1-4.24-4.24"/><path d="m3 3 18 18"/></svg>`,
  volume: `<svg class="ui-ico" viewBox="0 0 24 24" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
  bulb: `<svg class="ui-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
  bulbSm: `<svg class="ui-ico ui-ico-xs" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
  headphones: `<svg class="ui-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>`,
  bookOpen: `<svg class="ui-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  timer: `<svg class="ui-ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 1.5"/><path d="M10 2h4"/></svg>`,
  play: `<svg class="ui-ico ui-ico-xs" viewBox="0 0 24 24" aria-hidden="true"><polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none"/></svg>`,
  pause: `<svg class="ui-ico ui-ico-xs" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none"/><rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none"/></svg>`,
  reset: `<svg class="ui-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>`,
  zoom: `<svg class="ui-ico ui-ico-sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>`,
  shuffle: `<svg class="ui-ico ui-ico-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 3h5v5"/><path d="M4 20 21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/></svg>`,
  mic: `<svg class="ui-ico ui-ico-lg" viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><path d="M12 17v4"/><path d="M8 21h8"/></svg>`,
  users: `<svg class="ui-ico ui-ico-lg" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  chat: `<svg class="ui-ico ui-ico-xs" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  image: `<svg class="ui-ico ui-ico-sm" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/></svg>`,
  imageLg: `<svg class="ui-ico ui-ico-lg" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/></svg>`,
  heartChat: `<svg class="ui-ico ui-ico-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 14a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M12 12.8s-3.2-1.95-3.2-3.95a1.85 1.85 0 0 1 3.2-1.25 1.85 1.85 0 0 1 3.2 1.25c0 2-3.2 3.95-3.2 3.95Z"/></svg>`,
  heartChatLg: `<svg class="ui-ico ui-ico-lg" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 14a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M12 12.8s-3.2-1.95-3.2-3.95a1.85 1.85 0 0 1 3.2-1.25 1.85 1.85 0 0 1 3.2 1.25c0 2-3.2 3.95-3.2 3.95Z"/></svg>`,
  map: `<svg class="ui-ico ui-ico-xs" viewBox="0 0 24 24" aria-hidden="true"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>`,
  pin: `<svg class="ui-ico ui-ico-xs" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  arrowRight: `<svg class="ui-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>`,
  arrowUp: `<svg class="ui-ico ui-ico-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5"/><path d="m6 11 6-6 6 6"/></svg>`,
  lock: `<svg class="ui-ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`,
  close: `<svg class="ui-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
};

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

  const stateIcon = timerState.running ? ICONS.pause : ICONS.play;
  el.innerHTML = `
    <button class="timer-pill ${statusClass}" onclick="toggleTimer(event)" title="Start / Pause Timer">
      ${ICONS.timer}
      <span>${formatTime(timerState.seconds)}</span>
      ${stateIcon}
    </button>
    <button class="timer-reset" onclick="resetTimer(event)" title="Reset Timer">${ICONS.reset}</button>
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
  if (typeof closeTourOverlayOnly === "function") {
    closeTourOverlayOnly();
  }
  const app = document.getElementById("app");
  document.getElementById("backBtn").style.visibility = state.screen === "home" ? "hidden" : "visible";
  renderHeaderCenter();

  if (state.screen === "home") renderHome(app);
  else if (state.screen === "mode") renderMode(app);
  else if (state.screen === "role") renderRoleSelect(app);
  else if (state.screen === "scene_p1") renderPart1Scene(app);
  else if (state.screen === "scene_p2") renderPart2Scene(app);

  if (typeof maybeAutoStartTour === "function") {
    maybeAutoStartTour();
  }
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
          <div class="final-arrow">${isLocked ? ICONS.lock : ICONS.arrowRight}</div>
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
  const isFinal = state.unitKey === "final";
  const p1Sub = isFinal
    ? "4 Random Exam Questions • Listening Reflex"
    : "8 Questions • Listening Mode & Sentence Audio";

  let modeCardsHtml = "";
  if (state.level === "A2") {
    const spotSub = isFinal
      ? "6 Exam Picture Sets • Compare Pic A &amp; B + Follow-up"
      : "Compare Picture A &amp; Picture B + Follow-up Question";
    const feelSub = isFinal
      ? "6 Exam Dialogue Sets • Problem, Sympathy &amp; Advice + Follow-up"
      : "4-Step Dialogue (Ask Problem &amp; Give Advice) + Follow-up";

    modeCardsHtml = `
      <div class="big-card mode-card-p1" style="border-color: var(--primary);" onclick="navigate({screen: 'scene_p1', part: 1, hideP1Text: true})">
        <span class="mode-task-badge mode-badge-p1">Part 1 • Personal Q&amp;A</span>
        <div class="card-icon card-icon-svg icon-primary">${ICONS.mic}</div>
        <div class="card-title">Part 1: Social Interaction</div>
        <div class="card-sub">${p1Sub}</div>
      </div>
      <div class="big-card mode-card-spot" onclick="navigate({screen: 'role', part: 2, scenarioIdx: 0, variantIdx: 0})">
        <span class="mode-task-badge mode-badge-spot">Part 2 • Exam Task 1</span>
        <div class="card-icon card-icon-svg icon-ask">${ICONS.imageLg}</div>
        <div class="card-title">Part 2A: Spot the Differences</div>
        <div class="card-sub">${spotSub}</div>
      </div>
      <div class="big-card mode-card-feelings" onclick="navigate({screen: 'role', part: 2, scenarioIdx: 1, variantIdx: 0})">
        <span class="mode-task-badge mode-badge-feelings">Part 2 • Exam Task 2</span>
        <div class="card-icon card-icon-svg icon-feelings">${ICONS.heartChatLg}</div>
        <div class="card-title">Part 2B: Feelings &amp; Advice ("What's the matter?")</div>
        <div class="card-sub">${feelSub}</div>
      </div>
    `;
  } else {
    modeCardsHtml = `
      <div class="big-card" style="border-color: var(--primary);" onclick="navigate({screen: 'scene_p1', part: 1, hideP1Text: true})">
        <div class="card-icon card-icon-svg icon-primary">${ICONS.mic}</div>
        <div class="card-title">Part 1: Social Interaction</div>
        <div class="card-sub">${p1Sub}</div>
      </div>
      <div class="big-card" style="border-color: var(--ask-color);" onclick="navigate({screen: 'role', part: 2, scenarioIdx: 0, variantIdx: 0})">
        <div class="card-icon card-icon-svg icon-ask">${ICONS.users}</div>
        <div class="card-title">Part 2: Pair Role-play</div>
        <div class="card-sub">${unit.part2.taskName}</div>
      </div>
    `;
  }

  app.innerHTML = `
    <div class="screen-title">${unit.icon} ${unit.title}</div>
    <div class="grid">
      ${modeCardsHtml}
    </div>
    <div class="pedagogy-note">
      <div class="pedagogy-note-header">${ICONS.bulbSm} <span>Study Tip • Lưu ý khi ôn luyện</span></div>
      <p class="pedagogy-note-en">
        All <strong>Hints</strong> are <strong>sample suggestions only</strong>, not fixed exam answers. Use your own real ideas and personal details instead of memorizing mechanically!
      </p>
      <p class="pedagogy-note-vi">
        Các câu trong mục <strong>Gợi ý</strong> chỉ mang tính tham khảo về cấu trúc &amp; ý tưởng, <strong>không phải đáp án bắt buộc</strong>. Hãy linh hoạt thay đổi theo thông tin thật của bạn để nói tự nhiên, tránh học thuộc lòng rập khuôn nhé!
      </p>
    </div>
  `;
}

// Prominent 50/50 Dual-Task Switcher for Level A2 Part 2 (Task 1: Spot Differences vs Task 2: Feelings & Advice)
function renderA2TaskSwitcher() {
  const isSpot = state.scenarioIdx === 0;
  const isFeel = state.scenarioIdx === 1;
  return `
    <div class="a2-task-switcher" role="tablist" aria-label="Level A2 Part 2 Exam Tasks">
      <button type="button" class="a2-task-tab tab-spot ${isSpot ? 'active active-spot' : ''}" onclick="switchA2Task(0, false)">
        <span class="a2-tab-ico">${ICONS.image}</span>
        <span class="a2-tab-text">
          <span class="a2-tab-kicker">Part 2 • Task 1</span>
          <span class="a2-tab-name">Spot Differences</span>
        </span>
      </button>
      <button type="button" class="a2-task-tab tab-feelings ${isFeel ? 'active active-feelings' : ''}" onclick="switchA2Task(1, false)">
        <span class="a2-tab-ico">${ICONS.heartChat}</span>
        <span class="a2-tab-text">
          <span class="a2-tab-kicker">Part 2 • Task 2</span>
          <span class="a2-tab-name">Feelings &amp; Advice</span>
        </span>
      </button>
    </div>
  `;
}

// Bottom Call-to-Action Card in Level A2 Part 2 so students never forget to practice the other Part 2 format
function renderA2NextTaskBanner() {
  if (state.level !== "A2") return "";
  if (state.scenarioIdx === 0) {
    return `
      <button type="button" class="next-task-banner to-feelings" onclick="switchA2Task(1, true)">
        <div class="next-task-left">
          <div class="next-task-icon">${ICONS.heartChat}</div>
          <div class="next-task-copy">
            <span class="next-task-kicker">Next Part 2 Task • Luyện tiếp dạng đề 2</span>
            <span class="next-task-title">Task 2: Feelings &amp; Advice ("What's the matter?")</span>
            <span class="next-task-sub">4-step problem &amp; advice role-play (Role ${state.role})</span>
          </div>
        </div>
        <span class="next-task-arrow">${ICONS.arrowRight}</span>
      </button>
    `;
  }
  return `
    <button type="button" class="next-task-banner to-spot" onclick="switchA2Task(0, true)">
      <div class="next-task-left">
        <div class="next-task-icon">${ICONS.image}</div>
        <div class="next-task-copy">
          <span class="next-task-kicker">Other Part 2 Task • Chuyển sang dạng đề 1</span>
          <span class="next-task-title">Task 1: Spot the Differences</span>
          <span class="next-task-sub">Compare Picture A &amp; Picture B (Role ${state.role})</span>
        </div>
      </div>
      <span class="next-task-arrow">${ICONS.arrowRight}</span>
    </button>
  `;
}

function switchA2Task(targetIdx, shouldScrollTop) {
  const data = getLevelData();
  const unit = data && data[state.unitKey];
  if (!unit || !unit.part2 || !unit.part2.scenarios[targetIdx]) return;
  if (state.scenarioIdx === targetIdx && !shouldScrollTop) return;

  const nextEntry = unit.part2.scenarios[targetIdx];
  state.scenarioIdx = targetIdx;
  if (nextEntry.variants && nextEntry.variants.length > 0) {
    state.variantIdx = state.variantIdx % nextEntry.variants.length;
  } else {
    state.variantIdx = 0;
  }
  clearHints();
  if (state.screen === "scene_p2") {
    resetTimer();
  }
  render();
  if (shouldScrollTop && typeof window.scrollTo === "function") {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  }
}

function renderRoleSelect(app) {
  const data = getLevelData();
  const unit = data[state.unitKey];
  const scenarios = unit.part2.scenarios;
  const isFinal = state.unitKey === "final";
  const isA2 = state.level === "A2";

  let switcherHtml = "";
  if (isA2) {
    switcherHtml = renderA2TaskSwitcher();
  } else {
    switcherHtml = `<div class="scenario-pills" style="justify-content:center; margin-bottom:10px;">`;
    scenarios.forEach((sc, idx) => {
      const active = idx === state.scenarioIdx ? "active" : "";
      const text = sc.label || `Scenario ${idx + 1}`;
      switcherHtml += `<div class="pill ${active}" onclick="selectScenario(${idx})">${text}</div>`;
    });
    switcherHtml += `</div>`;
  }

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

  const titleText = isA2 ? "Choose Part 2 Task &amp; Role" : "Choose Scenario &amp; Role";

  app.innerHTML = `
    <div class="screen-title">${titleText}</div>
    ${switcherHtml}
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

// Part 1: Exam Listening Mode (questions hidden by default) + Full-Sentence Audio + Word Tap + Answer Hint
function renderPart1Scene(app) {
  const data = getLevelData();
  const unit = data[state.unitKey];
  const isFinal = state.unitKey === "final";
  const activeList = (isFinal && state.showAllFinalP1) ? unit.allPart1 : unit.part1;

  const modeIcon = state.hideP1Text ? ICONS.headphones : ICONS.bookOpen;
  const modeTitle = state.hideP1Text
    ? "Listening Mode"
    : "Reading Mode";
  const modeSub = state.hideP1Text
    ? "Questions hidden • Listen &amp; answer aloud first"
    : "Questions visible • Tap any word to look up";
  const toggleBtnContent = state.hideP1Text
    ? `${ICONS.eye} <span>Show all</span>`
    : `${ICONS.eyeOff} <span>Hide text</span>`;

  let html = `
    <div class="screen-title">${unit.title} — Part 1</div>
    <div class="listen-mode-bar ${state.hideP1Text ? 'is-listening' : 'is-reading'}">
      <div class="listen-mode-left">
        <span class="listen-mode-badge">${modeIcon}</span>
        <div class="listen-mode-info">
          <span class="listen-mode-title">${modeTitle}</span>
          <span class="listen-mode-sub">${modeSub}</span>
        </div>
      </div>
      <button class="listen-toggle-btn" onclick="toggleP1ListeningMode(event)">
        ${toggleBtnContent}
      </button>
    </div>
  `;

  if (isFinal) {
    html += `
      <div class="random-bar">
        <button class="random-btn" onclick="drawNewMockP1()">${ICONS.shuffle} <span>Random 4 Questions</span></button>
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
              <button class="spk-sent-btn" onclick="speakSentence(event, '${escAttr(item.h)}')" title="Listen to full sample answer">${ICONS.volume}</button>
              <button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Close Answer Hint">${ICONS.bulb}</button>
            </div>
          </div>
          <div class="qa-sub-q">
            <button class="mini-spk-btn" onclick="speakSentence(event, '${escAttr(item.q)}')" title="Replay question">${ICONS.volume}</button>
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
              <button class="eye-btn" onclick="toggleRevealP1Card(event, '${key}')" title="Show question text">${ICONS.eye} <span>Show</span></button>
              <button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Answer Hint">${ICONS.bulb}</button>
            </div>
          </div>
          <button class="listen-hero-btn" onclick="speakSentence(event, '${escAttr(item.q)}')">
            ${ICONS.volume}
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
              ${state.hideP1Text ? `<button class="eye-btn active" onclick="toggleRevealP1Card(event, '${key}')" title="Hide question text">${ICONS.eyeOff} <span>Hide</span></button>` : ""}
              <button class="spk-sent-btn" onclick="speakSentence(event, '${escAttr(item.q)}')" title="Listen to full question">${ICONS.volume}</button>
              <button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Answer Hint">${ICONS.bulb}</button>
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
            <button class="spk-sent-btn map-spk-btn" onclick="speakSentence(event, '${escAttr(cell.dir)}')" title="Listen to full directions">${ICONS.volume}</button>
            <button class="hint-btn map-hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Directions">${ICONS.bulb}</button>
          </div>
        `;
      }

      return `
        <div class="bldg-box bldg-known">
          <span class="bldg-tag"><span class="bldg-dot"></span> YOU KNOW [${cell.num}]</span>
          <span class="bldg-name">${renderSpeakableText(cell.name)}</span>
          <span class="bldg-sub">Tap hint for directions</span>
          <button class="hint-btn map-hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Directions">${ICONS.bulb}</button>
        </div>
      `;
    }

    if (isLandmark) {
      return `
        <div class="bldg-box bldg-landmark">
          <span class="bldg-tag">${ICONS.pin} LANDMARK</span>
          <span class="bldg-name">${renderSpeakableText(cell.name)}</span>
        </div>
      `;
    }

    return `
      <div class="bldg-box bldg-mystery">
        <span class="bldg-tag">UNKNOWN</span>
        <span class="bldg-name">? Building [${cell.num}]</span>
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
    : `${ICONS.chat} <span>Follow-up Question • Student ${state.role}</span>`;
  const subQuestionHtml = isPeeking
    ? `
      <div class="qa-sub-q">
        <button class="mini-spk-btn" onclick="speakSentence(event, '${escAttr(followUpItem.q)}')" title="Replay follow-up question">${ICONS.volume}</button>
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
          <button class="spk-sent-btn" onclick="speakSentence(event, '${escAttr(bodyText)}')" title="Listen to full sentence">${ICONS.volume}</button>
          <button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Answer Hint">${ICONS.bulb}</button>
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
            <button class="spk-sent-btn" onclick="speakSentence(event, '${escAttr(d.sentence)}')" title="Listen to full sentence">${ICONS.volume}</button>
            <button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Comparison Sentence">${ICONS.bulb}</button>
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
        <button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Comparison Sentence">${ICONS.bulb}</button>
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
          <button class="z-close-btn" onclick="closeImageZoom(event)" title="Close">${ICONS.close}</button>
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
      <div class="spot-controls-head">
        <div class="spot-photo-header">
          <span class="spot-title-wrap">${ICONS.image} <span>${sd.title}</span></span>
          <button class="zoom-badge" onclick="openImageZoom(event, '${sd.img}', '${spotViewMode === 'B' ? 'B' : 'A'}')">${ICONS.zoom} <span>Zoom</span></button>
        </div>
        <div class="spot-view-bar">
          <button class="view-mode-btn ${spotViewMode === 'stack' ? 'active' : ''}" onclick="setSpotViewMode(event, 'stack')">A &amp; B (Large)</button>
          <button class="view-mode-btn ${spotViewMode === 'A' ? 'active' : ''}" onclick="setSpotViewMode(event, 'A')">Pic A</button>
          <button class="view-mode-btn ${spotViewMode === 'B' ? 'active' : ''}" onclick="setSpotViewMode(event, 'B')">Pic B</button>
          <button class="view-mode-btn ${spotViewMode === 'side' ? 'active' : ''}" onclick="setSpotViewMode(event, 'side')">A | B</button>
        </div>
      </div>
      ${photoBodyHtml}
      <div class="spot-instruct">${sd.instruction}</div>
    </div>

    <div class="section-card ask-section">
      <div class="section-header header-ask">
        <span>8 DIFFERENCES (DESCRIBE AT LEAST 6)</span>
        <span class="hint-legend">${ICONS.bulbSm} <span>Sentence + Audio</span></span>
      </div>
      <div class="diff-list">
        ${diffCardsHtml}
      </div>
    </div>

    ${renderFollowUpCard(followUpItem)}
    ${renderA2NextTaskBanner()}
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
  const isA2 = state.level === "A2";

  const badgeClass = state.role === "A" ? "badge-a" : "badge-b";
  const otherRole = state.role === "A" ? "B" : "A";

  let variantBtnHtml = "";
  if (isFinal && scenarios[state.scenarioIdx].variants) {
    const totalVars = scenarios[state.scenarioIdx].variants.length;
    variantBtnHtml = `<button class="variant-pill" onclick="cycleFinalVariant()" title="Switch Exam Set">Set #${state.variantIdx + 1}/${totalVars} ↻</button>`;
  }

  let topControlsHtml = "";
  if (isA2) {
    const leftMetaHtml = isFinal
      ? `<div class="scenario-pills">${variantBtnHtml}<button class="pill pill-icon" onclick="randomFinalScenario()" title="Random Task & Set">${ICONS.shuffle}</button></div>`
      : `<span class="a2-active-chip ${state.scenarioIdx === 1 ? 'chip-feelings' : 'chip-spot'}">${state.scenarioIdx === 1 ? "Task 2 • What's the matter?" : "Task 1 • Compare Pic A &amp; B"}</span>`;

    topControlsHtml = `
      ${renderA2TaskSwitcher()}
      <div class="top-controls">
        ${leftMetaHtml}
        <div class="role-switch-group">
          <span class="role-badge ${badgeClass}">Role ${state.role}</span>
          <button class="switch-btn" onclick="switchRole()">Switch → ${otherRole}</button>
        </div>
      </div>
    `;
  } else {
    let pillsHtml = `<div class="scenario-pills">`;
    scenarios.forEach((sc, idx) => {
      const active = idx === state.scenarioIdx ? "active" : "";
      const text = sc.label || `#${idx + 1}`;
      pillsHtml += `<div class="pill ${active}" onclick="changeSceneScenario(${idx})">${text}</div>`;
    });
    if (isFinal) {
      pillsHtml += `<button class="pill pill-icon" onclick="randomFinalScenario()" title="Random Task & Set">${ICONS.shuffle}</button>`;
    }
    pillsHtml += `</div>`;

    topControlsHtml = `
      <div class="top-controls">
        ${pillsHtml}
        <div class="role-switch-group">
          ${variantBtnHtml}
          <span class="role-badge ${badgeClass}">Role ${state.role}</span>
          <button class="switch-btn" onclick="switchRole()">Switch → ${otherRole}</button>
        </div>
      </div>
    `;
  }

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
            <button class="spk-sent-btn" onclick="speakSentence(event, '${escAttr(row.q)}')" title="Listen to full sentence">${ICONS.volume}</button>
            <button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Full Sentence">${ICONS.bulb}</button>
          </div>
        </div>
      `;
    }

    const contentHtml = `${renderSpeakableText(row.label)}${noQMark ? "" : '<span class="q-inline">?</span>'}`;
    return `
      <div class="ask-box">
        <span class="ask-text">${contentHtml}</span>
        <button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Full Sentence">${ICONS.bulb}</button>
      </div>
    `;
  }).join("");

  const cleanAskTitle = roleData.askTitle.replace(/\s*\(Hold.*?\)/i, "");
  const askSectionHtml = `
    <div class="section-card ask-section">
      <div class="section-header header-ask">
        <span>${cleanAskTitle}</span>
        <span class="hint-legend">${ICONS.bulbSm} <span>Hint + Audio</span></span>
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
          <span class="map-head-left">${ICONS.map} <span>Map (Tap hint on green lots for directions)</span></span>
          <span>? = Ask partner</span>
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
              <span class="start-arrow">${ICONS.arrowUp}</span>
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
            <button class="spk-sent-btn" onclick="speakSentence(event, '${escAttr(item.a)}')" title="Listen to full sentence">${ICONS.volume}</button>
            <button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Full Sentence">${ICONS.bulb}</button>
          </div>
        `
        : `<button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Full Sentence">${ICONS.bulb}</button>`;

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
          <span class="hint-legend">${ICONS.bulbSm} <span>Hint + Audio</span></span>
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
  const nextTaskHtml = renderA2NextTaskBanner();

  app.innerHTML = `
    ${topControlsHtml}
    ${mainBodyHtml}
    ${followUpHtml}
    ${nextTaskHtml}
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

// ==================== CONTEXTUAL INTERACTIVE SPOTLIGHT WALKTHROUGH ====================
const TOUR_STORAGE_PREFIX = "ef_tour_v1_";
const AUTO_TOUR_IDS = new Set([
  "home",
  "p1",
  "p2_a1_role",
  "p2_a1_map",
  "p2_a2_spot",
  "p2_a2_role"
]);

const TOUR_DEFS = {
  home: [
    {
      selector: ".level-bar",
      title: "Choose Level • Chọn trình độ",
      en: "Switch between Level A1 (Beginner) and Level A2 (Elementary) question banks anytime.",
      vi: "Chuyển đổi nhanh giữa bộ đề Level A1 và Level A2 tương ứng với lớp học của bạn."
    },
    {
      selector: ".active-unit",
      title: "Practice by Unit • Ôn theo bài",
      en: "Open any unit to practice Part 1 personal questions and Part 2 pair role-plays.",
      vi: "Chọn từng cụm bài học để luyện riêng phản xạ câu hỏi Part 1 và hội thoại cặp Part 2."
    },
    {
      selector: ".final-banner",
      title: "Mock Final Exam • Thi thử cuối khóa",
      en: "Draw random Part 1 & Part 2 test sets formatted just like the official speaking exam.",
      vi: "Bốc đề ngẫu nhiên Part 1 & Part 2 sát với cấu trúc đề thi vấn đáp cuối khóa."
    }
  ],
  mode: [
    {
      selector: ".grid",
      title: "Choose Exam Part • Chọn phần thi",
      en: "Part 1 trains listening & personal Q&A; Part 2 trains interactive Student A / B role-play.",
      vi: "Part 1 luyện nghe – trả lời câu hỏi cá nhân; Part 2 luyện đóng vai tương tác Student A / B."
    },
    {
      selector: ".pedagogy-note",
      title: "Flexible Hints • Lưu ý tránh học vẹt",
      en: "Sample hints are structure guides only—adapt them naturally with your own real details!",
      vi: "Các câu gợi ý chỉ để tham khảo cấu trúc & ý tưởng, hãy thay bằng thông tin thật của bạn nhé!"
    }
  ],
  role: [
    {
      selector: ".a2-task-switcher, .scenario-pills",
      title: "Select Task / Scenario • Chọn dạng đề",
      en: "Pick your Part 2 task or scenario set above before entering your role-play card.",
      vi: "Chọn dạng đề hoặc kịch bản ở thanh phía trên trước khi bắt đầu đóng vai."
    },
    {
      selector: ".grid-2",
      title: "Pick Your Role • Chọn vai A hoặc B",
      en: "Start as Student A or Student B—you can switch roles anytime inside with 1 tap.",
      vi: "Chọn vai Student A hoặc Student B (vào bên trong bạn vẫn đổi vai qua lại được ngay)."
    }
  ],
  p1: [
    {
      selector: ".qa-card",
      title: "Listen First • Nghe & mở chữ câu hỏi",
      en: "Questions are hidden like the real exam: tap Listen and answer aloud first. Tap Show to check text (then tap any single word to hear its pronunciation!).",
      vi: "Câu hỏi mặc định ẩn chữ như thi thật: hãy bấm Listen để nghe và tự trả lời trước. Bấm Show để kiểm tra chữ (khi hiện chữ, chạm vào từ bất kỳ để nghe phát âm từ lẻ!)."
    },
    {
      selector: ".qa-card .hint-btn",
      title: "Sample Hint • Gợi ý câu trả lời mẫu",
      en: "Tap the lightbulb icon to view a sample answer and tap the speaker icon to hear full-sentence intonation.",
      vi: "Bấm biểu tượng bóng đèn để xem câu gợi ý mẫu và bấm nút loa để nghe ngữ điệu cả câu."
    },
    {
      selector: ".listen-mode-bar",
      title: "Show All & Timer • Hiện chữ & Đồng hồ",
      en: "Tap Show all if you prefer reading all questions at once, and tap the 04:00 timer in the header to pace yourself.",
      vi: "Bấm Show all nếu muốn hiển thị sẵn toàn bộ câu hỏi, và bấm đồng hồ 04:00 trên thanh tiêu đề để canh giờ thi."
    }
  ],
  p2_a1_role: [
    {
      selector: ".top-controls",
      title: "Scenario & Role • Chọn đề & Đổi vai",
      en: "Switch scenarios (#1–#3) on the left, and tap Switch → B to practice both Student A and Student B.",
      vi: "Chuyển đổi đề (#1–#3) ở bên trái và bấm Switch → B để luyện tập trọn vẹn cả hai vai A và B."
    },
    {
      selector: ".section-card",
      title: "Cues & Audio • Từ khóa & Nghe câu mẫu",
      en: "Cards are ordered by who speaks first. Speak from the cues, or tap the lightbulb to view & hear full model sentences.",
      vi: "Các khung đã xếp sẵn theo thứ tự ai nói trước. Hãy nhìn từ khóa để tự đặt câu; khi bí hãy bấm bóng đèn để mở chữ & nghe câu mẫu."
    },
    {
      selector: "#headerCenter",
      title: "3-Minute Timer • Đồng hồ 3 phút",
      en: "Tap the countdown timer in the header to practice within the 3-minute Part 2 exam limit.",
      vi: "Bấm vào đồng hồ trên thanh tiêu đề để canh thời gian hội thoại cặp đúng chuẩn 3 phút đi thi."
    }
  ],
  p2_a1_map: [
    {
      selector: ".crossroads-card",
      title: "Crossroads Map • Bản đồ chỉ đường",
      en: "Start at YOU ARE HERE. Green lots are places you know (tap the lightbulb to hear full directions); yellow ? lots are places to ask your partner.",
      vi: "Xuất phát từ YOU ARE HERE. Ô màu xanh là địa điểm bạn biết (bấm bóng đèn để xem & nghe câu chỉ đường); ô vàng dấu ? là nơi bạn cần hỏi bạn cùng cặp ở khung dưới."
    },
    {
      selector: ".role-switch-group",
      title: "Swap Map Role • Đổi góc nhìn vai B",
      en: "Tap Switch → B to swap known and unknown buildings for Student B.",
      vi: "Bấm Switch → B để chuyển sang bản đồ thông tin của Student B."
    }
  ],
  p2_a2_spot: [
    {
      selector: ".spot-controls-head",
      title: "View & Zoom • Tách tranh to & Phóng to",
      en: "View stacked full-width A & B, flip between Pic A / Pic B, or tap Zoom to pan and inspect small details on your phone.",
      vi: "Xem chế độ tách 2 tranh cỡ lớn, bấm chuyển nhanh Pic A / Pic B, hoặc bấm Zoom để vuốt soi rõ từng chi tiết nhỏ trên điện thoại."
    },
    {
      selector: ".diff-box",
      title: "Compare & Listen • Mô tả điểm khác nhau",
      en: "Describe at least 6 of the 8 differences from the cues. Tap the lightbulb to open and listen to a complete comparison sentence.",
      vi: "Dựa vào gợi ý ngắn để tự mô tả ít nhất 6/8 điểm khác nhau. Bấm bóng đèn để xem chữ và bấm loa nghe nguyên câu so sánh mẫu."
    },
    {
      selector: ".followup-card",
      title: "Follow-up Question • Câu hỏi phụ cuối bài",
      en: "Finish by answering the examiner's personal follow-up question for your role at the bottom (switch roles to see Student B's question!).",
      vi: "Sau khi so sánh tranh xong, nhớ luyện trả lời thêm câu hỏi mở rộng ở cuối trang dành riêng cho từng vai A / B nhé!"
    }
  ],
  p2_a2_role: [
    {
      selector: ".section-card",
      title: "4-Step Dialogue • Hội thoại 4 bước",
      en: "Follow steps 1 → 4 in order to ask what's wrong, sympathize, and give advice. Tap the lightbulb to view & hear sample lines.",
      vi: "Thực hành nói theo thứ tự bước 1 → 4 (hỏi thăm vấn đề, chia sẻ và đưa lời khuyên). Bấm bóng đèn để xem chữ & nghe câu mẫu."
    },
    {
      selector: ".followup-card",
      title: "Switch Role & Follow-up • Đổi vai & Câu hỏi phụ",
      en: "Use Switch → B at the top to practice both roles, and answer the personal follow-up question at the bottom!",
      vi: "Bấm Switch → B ở đầu trang để luyện cả hai vai, và trả lời thêm câu hỏi cá nhân mở rộng ở thẻ cuối bài!"
    }
  ]
};

let seenToursMem = {};
let tourAutoTimer = null;
let tourRepositionTimer = null;
let tourState = {
  active: false,
  tourId: null,
  steps: [],
  stepIdx: 0
};

function hasSeenTour(tourId) {
  if (!tourId) return true;
  if (seenToursMem[tourId]) return true;
  try {
    return window.localStorage && window.localStorage.getItem(TOUR_STORAGE_PREFIX + tourId) === "1";
  } catch (e) {
    return false;
  }
}

function markTourSeen(tourId) {
  if (!tourId) return;
  seenToursMem[tourId] = true;
  try {
    if (window.localStorage) {
      window.localStorage.setItem(TOUR_STORAGE_PREFIX + tourId, "1");
    }
  } catch (e) {}
}

function getTourIdForCurrentState() {
  if (state.screen === "home") return "home";
  if (state.screen === "mode") return "mode";
  if (state.screen === "role") return "role";
  if (state.screen === "scene_p1") return "p1";
  if (state.screen === "scene_p2") {
    const sc = getActiveScenario();
    if (!sc) return null;
    if (sc.spotDiff) return "p2_a2_spot";
    if (sc.interactiveMap) return "p2_a1_map";
    const rData = sc[state.role];
    if (rData && rData.followUp) return "p2_a2_role";
    return "p2_a1_role";
  }
  return null;
}

function closeTourOverlayOnly() {
  if (tourAutoTimer) {
    clearTimeout(tourAutoTimer);
    tourAutoTimer = null;
  }
  if (tourRepositionTimer) {
    clearTimeout(tourRepositionTimer);
    tourRepositionTimer = null;
  }
  tourState.active = false;
  tourState.tourId = null;
  tourState.steps = [];
  tourState.stepIdx = 0;
  const overlay = document.getElementById("tourOverlay");
  if (overlay) {
    overlay.classList.remove("active");
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = "";
  }
}

function maybeAutoStartTour() {
  if (tourAutoTimer) {
    clearTimeout(tourAutoTimer);
    tourAutoTimer = null;
  }
  if (zoomedImgSrc) return;
  const tid = getTourIdForCurrentState();
  if (!tid || !AUTO_TOUR_IDS.has(tid) || hasSeenTour(tid)) return;
  tourAutoTimer = setTimeout(() => {
    tourAutoTimer = null;
    if (!zoomedImgSrc && getTourIdForCurrentState() === tid && !hasSeenTour(tid)) {
      startTour(tid);
    }
  }, 90);
}

function startCurrentScreenTour(event) {
  if (event) event.stopPropagation();
  stopAllAudio();
  if (zoomedImgSrc) {
    zoomedImgSrc = null;
    render();
  }
  const tid = getTourIdForCurrentState();
  if (tid) {
    startTour(tid);
  }
}

function startTour(tourId) {
  const rawSteps = TOUR_DEFS[tourId];
  if (!rawSteps || !rawSteps.length) return;
  const validSteps = rawSteps.filter(st => typeof document.querySelector === "function" && document.querySelector(st.selector));
  if (!validSteps.length) return;

  const overlay = document.getElementById("tourOverlay");
  if (!overlay) return;

  tourState = {
    active: true,
    tourId,
    steps: validSteps,
    stepIdx: 0
  };

  overlay.innerHTML = `
    <div class="tour-shield"></div>
    <div class="tour-spotlight" id="tourSpotlight"></div>
    <div class="tour-card" id="tourCard" role="dialog" aria-modal="true"></div>
  `;
  overlay.classList.add("active");
  overlay.setAttribute("aria-hidden", "false");

  renderTourStep(true);
}

function renderTourStep(shouldScroll) {
  if (!tourState.active) return;
  const step = tourState.steps[tourState.stepIdx];
  const card = document.getElementById("tourCard");
  if (!step || !card) {
    closeTourOverlayOnly();
    return;
  }

  const total = tourState.steps.length;
  const idx = tourState.stepIdx;
  const isLast = idx === total - 1;

  const dotsHtml = tourState.steps.map((_, dIdx) =>
    `<span class="tour-dot ${dIdx === idx ? 'active' : ''}"></span>`
  ).join("");

  const prevBtnHtml = idx > 0
    ? `<button class="tour-btn tour-btn-ghost" onclick="prevTourStep(event)">Back</button>`
    : "";

  const nextLabel = isLast ? "Done • Xong" : "Next • Tiếp →";

  card.innerHTML = `
    <div class="tour-card-top">
      <span class="tour-step-badge">Guide ${idx + 1} / ${total}</span>
      <button class="tour-skip-btn" onclick="skipTour(event)" title="Skip guide for this screen">Skip • Bỏ qua</button>
    </div>
    <div class="tour-title">${step.title}</div>
    <p class="tour-en">${step.en}</p>
    <p class="tour-vi">${step.vi}</p>
    <div class="tour-card-bottom">
      <div class="tour-dots">${dotsHtml}</div>
      <div class="tour-nav-btns">
        ${prevBtnHtml}
        <button class="tour-btn tour-btn-primary" onclick="nextTourStep(event)">${nextLabel}</button>
      </div>
    </div>
  `;

  if (shouldScroll) {
    scrollTourTargetIntoView(step.selector);
  }
  positionTourElements();
  if (tourRepositionTimer) clearTimeout(tourRepositionTimer);
  tourRepositionTimer = setTimeout(() => {
    positionTourElements();
  }, 260);
}

function scrollTourTargetIntoView(selector) {
  if (typeof document.querySelector !== "function" || typeof window.scrollTo !== "function") return;
  const el = document.querySelector(selector);
  if (!el || typeof el.getBoundingClientRect !== "function") return;

  // Header elements stay sticky; no scroll needed
  if (selector === "#headerCenter") return;

  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || 667;
  const headerH = 58;
  const scrollY = window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || 0;

  if (rect.top < headerH + 10 || rect.bottom > vh - 190) {
    const desiredTop = rect.height > vh * 0.42
      ? headerH + 10
      : Math.max(headerH + 12, Math.min(130, (vh - rect.height) * 0.25));
    const targetScroll = Math.max(0, scrollY + rect.top - desiredTop);
    try {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    } catch (e) {
      window.scrollTo(0, targetScroll);
    }
  }
}

function positionTourElements() {
  if (!tourState.active) return;
  const step = tourState.steps[tourState.stepIdx];
  const spot = document.getElementById("tourSpotlight");
  const card = document.getElementById("tourCard");
  if (!step || !spot || !card || typeof document.querySelector !== "function") return;

  const target = document.querySelector(step.selector);
  if (!target || typeof target.getBoundingClientRect !== "function") return;

  const vw = window.innerWidth || 375;
  const vh = window.innerHeight || 667;
  const pad = 6;

  const rect = target.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const cardH = cardRect.height || 195;
  const cardW = cardRect.width || Math.min(348, vw - 24);

  let sLeft = Math.max(6, rect.left - pad);
  let sTop = Math.max(6, rect.top - pad);
  let sWidth = Math.min(vw - sLeft - 6, rect.width + pad * 2);
  let sHeight = Math.min(vh - sTop - 6, rect.height + pad * 2);

  let cTop;
  const spaceBelow = vh - (sTop + sHeight);
  const spaceAbove = sTop;

  if (spaceBelow >= cardH + 20) {
    cTop = sTop + sHeight + 12;
  } else if (spaceAbove >= cardH + 20) {
    cTop = sTop - cardH - 12;
  } else {
    // Tall target on mobile: frame upper portion cleanly & dock tooltip card below without overlapping
    const maxSpotBottom = Math.max(sTop + 72, vh - cardH - 24);
    sHeight = Math.max(60, maxSpotBottom - sTop);
    cTop = Math.max(12, vh - cardH - 12);
  }

  const targetCenterX = sLeft + sWidth / 2;
  let cLeft = targetCenterX - cardW / 2;
  cLeft = Math.max(12, Math.min(vw - cardW - 12, cLeft));

  spot.style.left = `${Math.round(sLeft)}px`;
  spot.style.top = `${Math.round(sTop)}px`;
  spot.style.width = `${Math.round(sWidth)}px`;
  spot.style.height = `${Math.round(sHeight)}px`;

  card.style.left = `${Math.round(cLeft)}px`;
  card.style.top = `${Math.round(cTop)}px`;
}

function nextTourStep(event) {
  if (event) event.stopPropagation();
  if (!tourState.active) return;
  if (tourState.stepIdx < tourState.steps.length - 1) {
    tourState.stepIdx++;
    renderTourStep(true);
  } else {
    skipTour(event);
  }
}

function prevTourStep(event) {
  if (event) event.stopPropagation();
  if (!tourState.active) return;
  if (tourState.stepIdx > 0) {
    tourState.stepIdx--;
    renderTourStep(true);
  }
}

function skipTour(event) {
  if (event) event.stopPropagation();
  if (tourState.tourId) {
    markTourSeen(tourState.tourId);
  }
  closeTourOverlayOnly();
}

if (typeof window.addEventListener === "function") {
  window.addEventListener("resize", () => {
    if (tourState.active) positionTourElements();
  });
  window.addEventListener("scroll", () => {
    if (tourState.active) positionTourElements();
  }, { passive: true });
  window.addEventListener("keydown", e => {
    if (!tourState.active) return;
    if (e.key === "Escape") skipTour(e);
    else if (e.key === "ArrowRight") nextTourStep(e);
    else if (e.key === "ArrowLeft") prevTourStep(e);
  });
}

render();
