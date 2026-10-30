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

function speakWord(event, word) {
  if (event) {
    event.stopPropagation();
  }
  if (!("speechSynthesis" in window) || !word) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(word);
  utter.lang = "en-GB";
  utter.rate = 0.9;
  window.speechSynthesis.speak(utter);
}

// ==================== LIGHTBULB 💡 HINT TOGGLE & IMAGE ZOOM STATE ====================
let openHints = {};
let zoomedImgSrc = null;

function clearHints() {
  openHints = {};
  zoomedImgSrc = null;
}

function toggleHint(event, key) {
  if (event) {
    event.stopPropagation();
  }
  openHints[key] = !openHints[key];
  render();
}

function toggleImageZoom(event, src) {
  if (event) {
    event.stopPropagation();
  }
  zoomedImgSrc = zoomedImgSrc ? null : src;
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
  showAllFinalP1: false
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
    showAllFinalP1: false
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
    ? "4 Random Exam Questions (or View All 48)"
    : "8 Questions (Tap any word to hear • 💡 for hint)";

  app.innerHTML = `
    <div class="screen-title">${unit.icon} ${unit.title}</div>
    <div class="grid">
      <div class="big-card" style="border-color: var(--primary);" onclick="navigate({screen: 'scene_p1', part: 1})">
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

// Part 1: Tap any word to hear pronunciation; tap 💡 to toggle Answer Hint
function renderPart1Scene(app) {
  const data = getLevelData();
  const unit = data[state.unitKey];
  const isFinal = state.unitKey === "final";
  const activeList = (isFinal && state.showAllFinalP1) ? unit.allPart1 : unit.part1;

  let html = `
    <div class="screen-title">${unit.title} — Part 1</div>
    <div class="usage-tip">
      <span>🔊 Tap any word to hear</span>
      <span>•</span>
      <span>💡 Tap for answer hint</span>
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
    const badgeLabel = isPeeking
      ? `Answer Hint • Q${i + 1}`
      : (item.unitTitle ? `Q${i + 1} • ${item.unitTitle}` : `Question ${i + 1}`);
    const subQuestionHtml = isPeeking
      ? `<div class="qa-sub-q">${renderSpeakableText(item.q)}</div>`
      : "";
    const mainText = isPeeking ? item.h : item.q;

    html += `
      <div class="qa-card ${isPeeking ? 'peeking' : ''}">
        <div class="qa-top">
          <span class="qa-num">${badgeLabel}</span>
          <button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Answer Hint">💡</button>
        </div>
        ${subQuestionHtml}
        <div class="qa-main-text">${renderSpeakableText(mainText)}</div>
      </div>
    `;
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
      const displayContent = isPeeking
        ? renderSpeakableText(cell.dir)
        : renderSpeakableText(cell.name);

      return `
        <div class="bldg-box bldg-known ${isPeeking ? 'peeking' : ''}">
          <span class="bldg-tag">🟢 YOU KNOW [${cell.num}]</span>
          <span class="bldg-name">${displayContent}</span>
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
    ? `<div class="qa-sub-q">${renderSpeakableText(followUpItem.q)}</div>`
    : "";
  const bodyText = isPeeking ? followUpItem.h : followUpItem.q;

  return `
    <div class="qa-card followup-card ${isPeeking ? 'peeking' : ''}">
      <div class="qa-top">
        <span class="qa-num">${badgeText}</span>
        <button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Answer Hint">💡</button>
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
          <button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Comparison Sentence">💡</button>
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
  const zoomModalHtml = zoomedImgSrc
    ? `
      <div class="img-zoom-backdrop" onclick="toggleImageZoom(event, null)">
        <div class="img-zoom-container">
          <img src="${zoomedImgSrc}" alt="${sd.title}" class="spot-img-zoomed">
          <div class="img-zoom-hint">Tap anywhere to close ✕</div>
        </div>
      </div>
    `
    : "";

  return `
    <div class="spot-photo-card">
      <div class="spot-photo-header">
        <span>🖼️ ${sd.title}</span>
        <span class="zoom-badge" onclick="toggleImageZoom(event, '${sd.img}')">🔍 Tap to zoom</span>
      </div>
      <div class="spot-img-wrap" onclick="toggleImageZoom(event, '${sd.img}')">
        <img src="${sd.img}" alt="${sd.title}" class="spot-img" loading="lazy">
      </div>
      <div class="spot-instruct">${sd.instruction}</div>
    </div>

    <div class="section-card ask-section">
      <div class="section-header header-ask">
        <span>8 DIFFERENCES (DESCRIBE AT LEAST 6)</span>
        <span class="hint-legend">💡 Full sentence</span>
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
          <button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Full Sentence">💡</button>
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
        <span class="hint-legend">💡 Hint</span>
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
          <span>🗺️ Map (Tap 💡 on 🟢 for directions)</span>
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

      return `
        <div class="you-box ${isPeeking ? 'peeking' : ''}">
          <div class="you-content">
            <span class="you-label">${renderSpeakableText(item.label)}</span>
            <span class="you-val">${valHtml}</span>
          </div>
          <button class="hint-btn" onclick="toggleHint(event, '${key}')" title="Toggle Full Sentence">💡</button>
        </div>
      `;
    }).join("");

    const cleanGiveTitle = roleData.giveTitle.replace(/\s*\(Hold.*?\)/i, "");
    giveOrMapHtml = `
      <div class="section-card you-section">
        <div class="section-header header-give">
          <span>${cleanGiveTitle}</span>
          <span class="hint-legend">💡 Hint</span>
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
