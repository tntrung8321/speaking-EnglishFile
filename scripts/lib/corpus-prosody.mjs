export function cleanSentenceForSpeech(rawText) {
  if (!rawText) return "";
  const s = String(rawText)
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

export function computeAudioId(cleanedText) {
  const norm = String(cleanedText || "").trim().replace(/\s+/g, " ");
  const bytes = new TextEncoder().encode(norm);
  let hash = 0x811c9dc5;
  for (let i = 0; i < bytes.length; i++) {
    hash ^= bytes[i];
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

const CATEGORY_PRIORITY = {
  p2_feelings_problem: 6,
  p2_feelings_sympathy: 5,
  p2_spot_diff: 4,
  p2_directions: 3,
  question: 2,
  answer: 1
};

export function isGratitudeReaction(text) {
  const s = String(text || "").trim();
  return (
    /\bthanks?\b/i.test(s) ||
    /^(that's a (good|great)|that sounds (good|great)|you're (so kind|right)|haha|good idea|okay,?\s*i'll|alright)/i.test(s)
  );
}

export function extractSpeakableCorpus(levelData) {
  const byId = new Map();

  function register(rawText, category, level, unitKey) {
    const cleaned = cleanSentenceForSpeech(rawText);
    if (!cleaned) return;
    const id = computeAudioId(cleaned);
    const prev = byId.get(id);
    if (!prev) {
      byId.set(id, {
        id,
        raw: String(rawText),
        cleaned,
        category,
        level,
        unitKey,
        levels: [level],
        unitKeys: [unitKey]
      });
      return;
    }
    if (!prev.levels.includes(level)) prev.levels.push(level);
    if (!prev.unitKeys.includes(unitKey)) prev.unitKeys.push(unitKey);
    if ((CATEGORY_PRIORITY[category] || 0) > (CATEGORY_PRIORITY[prev.category] || 0)) {
      prev.category = category;
      prev.level = level;
      prev.unitKey = unitKey;
      prev.raw = String(rawText);
    }
  }

  for (const level of ["A1", "A2"]) {
    const units = (levelData && levelData[level]) || {};
    for (const [unitKey, unit] of Object.entries(units)) {
      for (const item of unit.part1 || []) {
        register(item.q, "question", level, unitKey);
        register(item.h, "answer", level, unitKey);
      }
      for (const item of unit.allPart1 || []) {
        register(item.q, "question", level, unitKey);
        register(item.h, "answer", level, unitKey);
      }

      const scanScenario = sc => {
        if (!sc) return;
        if (Array.isArray(sc.variants)) {
          sc.variants.forEach(scanScenario);
          return;
        }
        if (sc.spotDiff) {
          for (const d of sc.spotDiff.diffs || []) {
            register(d.sentence, "p2_spot_diff", level, unitKey);
          }
          if (sc.spotDiff.followUp) {
            for (const role of ["A", "B"]) {
              const fu = sc.spotDiff.followUp[role];
              if (fu) {
                register(fu.q, "question", level, unitKey);
                register(fu.h, "answer", level, unitKey);
              }
            }
          }
        }
        if (sc.interactiveMap) {
          for (const lot of sc.interactiveMap.lots || []) {
            for (const cell of lot || []) {
              if ((cell.knownBy === "A" || cell.knownBy === "B") && cell.dir) {
                register(cell.dir, "p2_directions", level, unitKey);
              }
            }
          }
        }
        for (const role of ["A", "B"]) {
          const rd = sc[role];
          if (!rd) continue;
          const isA2Feelings = level === "A2" && !sc.spotDiff;
          for (const row of rd.ask || []) {
            register(row.q, isA2Feelings ? "p2_feelings_sympathy" : "question", level, unitKey);
          }
          for (const row of rd.give || []) {
            register(row.a, isA2Feelings ? "p2_feelings_problem" : "answer", level, unitKey);
          }
          if (rd.followUp) {
            register(rd.followUp.q, "question", level, unitKey);
            register(rd.followUp.h, "answer", level, unitKey);
          }
        }
      };

      for (const sc of (unit.part2 && unit.part2.scenarios) || []) {
        scanScenario(sc);
      }
    }
  }

  return Array.from(byId.values());
}

function addSentencePauses(text) {
  return text.replace(/([.?!])\s+(?=[A-Z])/g, "$1 <short pause> ");
}

export function buildExpressiveTurn({ cleaned, category }) {
  const base = String(cleaned || "").trim();

  if (category === "p2_feelings_problem") {
    if (isGratitudeReaction(base)) {
      return {
        text: addSentencePauses(base),
        style: "Natural British English conversational speaker, warm, relieved and genuinely grateful tone"
      };
    }
    const paused = addSentencePauses(base).replace(/,\s+(and|because)\s+/i, ", <short pause> $1 ");
    return {
      text: `<sigh> ${paused}`,
      style: "Natural British English conversational speaker, weary, troubled and emotional tone with authentic human inflection"
    };
  }

  if (category === "p2_feelings_sympathy") {
    const paused = addSentencePauses(base).replace(/\b(Oh no|I'm sorry to hear that),\s+/i, "$1, <short pause> ");
    return {
      text: paused,
      style: "Natural British English conversational speaker, warm, concerned, empathetic and supportive tone"
    };
  }

  if (category === "p2_spot_diff") {
    const paused = base.replace(/,\s+(but|whereas|while)\s+in Picture B/i, ", <short pause> $1 in Picture B");
    return {
      text: paused,
      style: "Clear, natural British English speaker comparing two pictures, expressive contrastive intonation, steady conversational pace"
    };
  }

  if (category === "p2_directions") {
    return {
      text: addSentencePauses(base),
      style: "Friendly British English local giving clear, helpful step-by-step street directions with natural phrasing"
    };
  }

  if (category === "question") {
    return {
      text: addSentencePauses(base),
      style: "Warm, encouraging British English speaking examiner asking a student a question with natural conversational pitch"
    };
  }

  return {
    text: addSentencePauses(base),
    style: "Natural, friendly British English student speaking conversationally with lively rhythm and natural phrasing"
  };
}
