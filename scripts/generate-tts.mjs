import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  extractSpeakableCorpus,
  buildExpressiveTurn,
  isGratitudeReaction
} from "./lib/corpus-prosody.mjs";
import { wavBufferToMp3 } from "./lib/wav-to-mp3.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");

const INTERACTIONS_URL = "https://generativelanguage.googleapis.com/v1beta/interactions";
const VOICES_URL = "https://generativelanguage.googleapis.com/v1beta/voices?language_code=en-GB&type=prebuilt";
const PLACEHOLDER_KEY = "your_google_ai_studio_key_here";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export function loadDotEnv(envPath = path.join(REPO_ROOT, ".env")) {
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eqIdx = line.indexOf("=");
    if (eqIdx <= 0) continue;
    const key = line.slice(0, eqIdx).trim();
    let val = line.slice(eqIdx + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) {
      process.env[key] = val;
    }
  }
}

export function loadLevelDataFromRepo(repoRoot = REPO_ROOT) {
  const windowObj = {};
  const ctx = { window: windowObj };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(repoRoot, "data", "a1.js"), "utf8"), ctx);
  vm.runInContext(fs.readFileSync(path.join(repoRoot, "data", "a2.js"), "utf8"), ctx);
  return windowObj.LEVEL_DATA;
}

function extractAudioBase64FromInteraction(payload) {
  const containers = [
    ...(Array.isArray(payload?.steps) ? payload.steps : []),
    ...(Array.isArray(payload?.outputs) ? [{ content: payload.outputs }] : [])
  ];
  for (let i = containers.length - 1; i >= 0; i--) {
    const content = containers[i]?.content;
    if (!Array.isArray(content)) continue;
    for (let j = content.length - 1; j >= 0; j--) {
      const part = content[j];
      if (part && part.type === "audio" && typeof part.data === "string" && part.data.length > 0) {
        return part.data;
      }
    }
  }
  return null;
}

export async function synthesizeGeminiWav({
  apiKey,
  model = "gemini-3.8-flash-tts",
  voice = "Aoede",
  text,
  style,
  maxRetries = 5,
  baseBackoffMs = 1500,
  fetchImpl = globalThis.fetch
}) {
  const requestBody = JSON.stringify({
    model,
    store: false,
    input: [
      {
        type: "user_input",
        content: [
          {
            type: "text",
            text,
            annotations: [{ type: "speech_metadata", style }]
          }
        ]
      }
    ],
    response_format: { type: "audio" },
    generation_config: {
      speech_config: [{ voice }]
    }
  });

  let lastError = null;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    let res;
    try {
      res = await fetchImpl(INTERACTIONS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: requestBody
      });
    } catch (networkErr) {
      lastError = networkErr;
      if (attempt === maxRetries) break;
      await sleep(baseBackoffMs * Math.pow(2, attempt));
      continue;
    }

    if (res.ok) {
      const json = await res.json();
      const b64 = extractAudioBase64FromInteraction(json);
      if (!b64) {
        throw new Error(
          `Gemini TTS response missing audio payload: ${JSON.stringify(json).slice(0, 300)}`
        );
      }
      return Buffer.from(b64, "base64");
    }

    const retryable = res.status === 429 || res.status >= 500;
    const errText = typeof res.text === "function" ? await res.text() : String(res.status);
    lastError = new Error(`Gemini TTS HTTP ${res.status}: ${errText.slice(0, 300)}`);

    if (!retryable || attempt === maxRetries) {
      throw lastError;
    }

    const retryAfterHeader = Number(res.headers?.get?.("retry-after"));
    const waitMs =
      Number.isFinite(retryAfterHeader) && retryAfterHeader > 0
        ? retryAfterHeader * 1000
        : baseBackoffMs * Math.pow(2, attempt);
    await sleep(waitMs);
  }

  throw lastError || new Error("Gemini TTS request failed");
}

export function syncAudioManifest({
  audioDir,
  manifestPath,
  activeIds = null,
  pruneOrphans = false
}) {
  fs.mkdirSync(audioDir, { recursive: true });
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });

  const files = fs.readdirSync(audioDir);
  const validIds = [];
  let pruned = 0;

  for (const name of files) {
    const match = /^([0-9a-f]{8})\.mp3$/i.exec(name);
    if (!match) continue;
    const id = match[1].toLowerCase();
    const fullPath = path.join(audioDir, name);

    let size = 0;
    try {
      size = fs.statSync(fullPath).size;
    } catch {
      continue;
    }

    if (size <= 0) {
      try { fs.unlinkSync(fullPath); } catch {}
      continue;
    }

    if (pruneOrphans && activeIds instanceof Set && !activeIds.has(id)) {
      fs.unlinkSync(fullPath);
      pruned++;
      continue;
    }

    validIds.push(id);
  }

  validIds.sort();
  const entries = validIds.map(id => `"${id}":1`).join(",");
  const jsContent =
    "// Auto-generated by scripts/generate-tts.mjs — maps 8-char FNV-1a sentence IDs to static audio/<id>.mp3\n" +
    `window.AUDIO_MANIFEST = {${entries}};\n`;

  const tmpManifest = `${manifestPath}.tmp`;
  fs.writeFileSync(tmpManifest, jsContent, "utf8");
  fs.renameSync(tmpManifest, manifestPath);

  return { totalManifest: validIds.length, pruned };
}

export function pickBalancedSample(allItems, count) {
  const categories = [
    "p2_feelings_problem",
    "p2_feelings_sympathy",
    "p2_spot_diff",
    "p2_directions",
    "question",
    "answer"
  ];
  const buckets = new Map(categories.map(c => [c, []]));
  for (const item of allItems) {
    const list = buckets.get(item.category) || buckets.get("answer");
    if (
      item.category === "p2_feelings_problem" &&
      !isGratitudeReaction(item.cleaned)
    ) {
      // Prioritize genuine distress lines first so --sample showcases <sigh> acting
      list.unshift(item);
    } else {
      list.push(item);
    }
  }

  const picked = [];
  let idx = 0;
  while (picked.length < count) {
    let addedInRound = false;
    for (const cat of categories) {
      const list = buckets.get(cat);
      if (idx < list.length) {
        picked.push(list[idx]);
        addedInRound = true;
        if (picked.length >= count) break;
      }
    }
    if (!addedInRound) break;
    idx++;
  }
  return picked;
}

export async function runGenerator({
  apiKey,
  items,
  activeCorpusIds = null,
  audioDir = path.join(REPO_ROOT, "audio"),
  manifestPath = path.join(REPO_ROOT, "data", "audio-manifest.js"),
  voice = "Aoede",
  model = "gemini-3.8-flash-tts",
  force = false,
  pruneOrphans = false,
  delayMs = 350,
  baseBackoffMs = 1500,
  maxRetries = 5,
  kbps = 48,
  fetchImpl = globalThis.fetch,
  quiet = false
}) {
  if (!apiKey || apiKey === PLACEHOLDER_KEY) {
    throw new Error(
      "Missing GEMINI_API_KEY. Copy .env.example to .env and paste your free Google AI Studio key (https://aistudio.google.com/apikey)."
    );
  }

  fs.mkdirSync(audioDir, { recursive: true });

  let generated = 0;
  let skipped = 0;

  try {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const outPath = path.join(audioDir, `${item.id}.mp3`);

      if (!force && fs.existsSync(outPath)) {
        try {
          if (fs.statSync(outPath).size > 0) {
            skipped++;
            continue;
          }
        } catch {}
      }

      const turn = buildExpressiveTurn(item);
      if (!quiet) {
        console.log(
          `[${i + 1}/${items.length}] ${item.id} (${item.category}) ${item.cleaned}`
        );
      }

      const wavBuf = await synthesizeGeminiWav({
        apiKey,
        model,
        voice,
        text: turn.text,
        style: turn.style,
        maxRetries,
        baseBackoffMs,
        fetchImpl
      });

      const mp3Buf = wavBufferToMp3(wavBuf, kbps);
      const tmpPath = `${outPath}.tmp`;
      fs.writeFileSync(tmpPath, mp3Buf);
      fs.renameSync(tmpPath, outPath);
      generated++;

      if (generated % 10 === 0) {
        syncAudioManifest({ audioDir, manifestPath, activeIds: null, pruneOrphans: false });
      }

      if (delayMs > 0 && i < items.length - 1) {
        await sleep(delayMs);
      }
    }
  } catch (err) {
    if (generated > 0) {
      try {
        syncAudioManifest({ audioDir, manifestPath, activeIds: null, pruneOrphans: false });
      } catch {}
    }
    throw err;
  }

  const effectiveActiveIds =
    activeCorpusIds instanceof Set ? activeCorpusIds : new Set(items.map(x => x.id));

  const syncRes = syncAudioManifest({
    audioDir,
    manifestPath,
    activeIds: effectiveActiveIds,
    pruneOrphans
  });

  return {
    generated,
    skipped,
    pruned: syncRes.pruned,
    totalManifest: syncRes.totalManifest
  };
}

export function parseCliArgs(argv) {
  const opts = {
    sample: 0,
    match: "",
    unit: "",
    level: "",
    voice: "Aoede",
    lite: false,
    force: false,
    pruneOrphans: true,
    delayMs: 350,
    listVoices: false,
    help: false
  };

  const expanded = [];
  for (const token of argv) {
    if (token.startsWith("--") && token.includes("=")) {
      const eq = token.indexOf("=");
      expanded.push(token.slice(0, eq), token.slice(eq + 1));
    } else {
      expanded.push(token);
    }
  }

  const takeValue = (flag, idx) => {
    const next = expanded[idx + 1];
    if (next === undefined || next === "" || next.startsWith("-")) {
      throw new Error(`Missing value for ${flag}`);
    }
    return next;
  };

  for (let i = 0; i < expanded.length; i++) {
    const arg = expanded[i];
    if (arg === "--sample") {
      const raw = takeValue(arg, i++);
      const num = Number(raw);
      if (!Number.isInteger(num) || num <= 0) {
        throw new Error(`Invalid numeric value for --sample: ${raw}`);
      }
      opts.sample = num;
    } else if (arg === "--match") {
      opts.match = takeValue(arg, i++);
    } else if (arg === "--unit") {
      opts.unit = takeValue(arg, i++);
    } else if (arg === "--level") {
      opts.level = takeValue(arg, i++).toUpperCase();
    } else if (arg === "--voice") {
      opts.voice = takeValue(arg, i++);
    } else if (arg === "--delay-ms") {
      const raw = takeValue(arg, i++);
      const num = Number(raw);
      if (!Number.isFinite(num) || num < 0) {
        throw new Error(`Invalid numeric value for --delay-ms: ${raw}`);
      }
      opts.delayMs = num;
    } else if (arg === "--lite") {
      opts.lite = true;
    } else if (arg === "--force") {
      opts.force = true;
    } else if (arg === "--no-prune") {
      opts.pruneOrphans = false;
    } else if (arg === "--list-voices") {
      opts.listVoices = true;
    } else if (arg === "--help" || arg === "-h") {
      opts.help = true;
    } else {
      throw new Error(`Unknown option: ${arg} (run with --help for usage)`);
    }
  }
  return opts;
}

export function formatVoiceEntry(v) {
  const id = v.id || v.voiceId || v.name || "unknown";
  const label = v.display_name && v.display_name !== id ? `${id} [${v.display_name}]` : id;
  const meta = [v.gender, v.accent].filter(Boolean).join(", ") || "voice";
  return `  - ${label} (${meta}): ${v.description || ""}`.trimEnd();
}

async function listAvailableVoices(apiKey) {
  const res = await fetch(VOICES_URL, {
    headers: { "x-goog-api-key": apiKey }
  });
  if (!res.ok) {
    throw new Error(`Voices endpoint HTTP ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  const voices = data.voices || [];
  console.log(`Available en-GB prebuilt voices (${voices.length}):`);
  for (const v of voices) {
    console.log(formatVoiceEntry(v));
  }
}

async function main() {
  loadDotEnv();
  const opts = parseCliArgs(process.argv.slice(2));

  if (opts.help) {
    console.log(`Usage: node scripts/generate-tts.mjs [options]

Options:
  --sample <N>       Generate N balanced showcase sentences across categories
  --match <text>     Filter sentences containing <text> (case-insensitive)
  --unit <unitKey>   Filter sentences from a specific unit (e.g. u12, u34)
  --level <A1|A2>    Filter sentences from level A1 or A2
  --voice <name>     Prebuilt Gemini voice name (default: Aoede)
  --lite             Use gemini-3.8-flash-lite-tts instead of gemini-3.8-flash-tts
  --force            Re-generate matching MP3s even if already present on disk
  --no-prune         Keep orphan MP3s that are no longer in data/a1.js or data/a2.js
  --delay-ms <ms>    Delay between API requests in ms (default: 350)
  --list-voices      List available en-GB prebuilt voices from Gemini API`);
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (opts.listVoices) {
    if (!apiKey || apiKey === PLACEHOLDER_KEY) {
      throw new Error(
        "Missing GEMINI_API_KEY. Copy .env.example to .env and paste your free Google AI Studio key (https://aistudio.google.com/apikey)."
      );
    }
    await listAvailableVoices(apiKey);
    return;
  }

  const audioDir = path.join(REPO_ROOT, "audio");
  const manifestPath = path.join(REPO_ROOT, "data", "audio-manifest.js");
  const levelData = loadLevelDataFromRepo(REPO_ROOT);
  const fullCorpus = extractSpeakableCorpus(levelData);
  const activeCorpusIds = new Set(fullCorpus.map(x => x.id));

  let targetItems = fullCorpus;
  if (opts.level) {
    targetItems = targetItems.filter(x =>
      Array.isArray(x.levels) ? x.levels.includes(opts.level) : x.level === opts.level
    );
  }
  if (opts.unit) {
    const unitNeedle = opts.unit.toLowerCase();
    targetItems = targetItems.filter(x =>
      Array.isArray(x.unitKeys)
        ? x.unitKeys.some(u => u.toLowerCase() === unitNeedle)
        : x.unitKey.toLowerCase() === unitNeedle
    );
  }
  if (opts.match) {
    const needle = opts.match.toLowerCase();
    targetItems = targetItems.filter(x => x.cleaned.toLowerCase().includes(needle));
  }
  if (opts.sample > 0) {
    targetItems = pickBalancedSample(targetItems, opts.sample);
  }

  const model = opts.lite ? "gemini-3.8-flash-lite-tts" : "gemini-3.8-flash-tts";
  console.log(
    `Gemini Expressive TTS | model=${model} | voice=${opts.voice} | target=${targetItems.length}/${fullCorpus.length} sentences`
  );

  const onSigInt = () => {
    console.log("\nInterrupted (SIGINT) — syncing data/audio-manifest.js before exit...");
    const synced = syncAudioManifest({ audioDir, manifestPath, activeIds: null, pruneOrphans: false });
    console.log(`Synced ${synced.totalManifest} MP3s to data/audio-manifest.js. Re-run anytime to resume.`);
    process.exit(130);
  };
  process.once("SIGINT", onSigInt);

  try {
    const result = await runGenerator({
      apiKey,
      items: targetItems,
      activeCorpusIds,
      audioDir,
      manifestPath,
      voice: opts.voice,
      model,
      force: opts.force,
      pruneOrphans: opts.pruneOrphans,
      delayMs: opts.delayMs
    });

    console.log(
      `\nDone! generated=${result.generated} | skipped=${result.skipped} | pruned=${result.pruned} | manifest=${result.totalManifest} MP3s`
    );

    if (opts.sample > 0 && targetItems.length > 0) {
      console.log("\nShowcase sentences ready to audition in browser:");
      for (const item of targetItems) {
        console.log(`  - [${item.level} ${item.unitKey} | ${item.category}] "${item.cleaned}" -> audio/${item.id}.mp3`);
      }
    }
  } finally {
    process.removeListener("SIGINT", onSigInt);
  }
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  main().catch(err => {
    console.error(`\n[generate-tts error] ${err.message}`);
    process.exit(1);
  });
}
