import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";

export function loadAppContext(manifest = {}) {
  const playLog = [];
  let failFirstSrc = false;
  const ctx = {
    window: { AUDIO_MANIFEST: manifest },
    navigator: { onLine: true },
    localStorage: { getItem: () => "1", setItem: () => {} },
    document: {
      getElementById: () => ({
        innerHTML: "",
        style: {},
        classList: { add() {}, remove() {}, contains: () => false },
        setAttribute() {}
      }),
      querySelector: () => null,
      documentElement: { scrollTop: 0 }
    },
    Audio: function () {
      this.play = () => {
        playLog.push(this.src);
        if (failFirstSrc && this.src.startsWith("audio/")) {
          failFirstSrc = false;
          return Promise.reject(new Error("404"));
        }
        return Promise.resolve();
      };
      this.pause = () => {};
    },
    SpeechSynthesisUtterance: function (t) { this.text = t; },
    setInterval: () => 1,
    clearInterval: () => {},
    setTimeout: () => 1,
    clearTimeout: () => {},
    addEventListener: () => {},
    scrollTo: () => {},
    innerWidth: 390,
    innerHeight: 844,
    TextEncoder,
    console,
    setFailStatic(v) { failFirstSrc = v; },
    getPlayLog: () => playLog
  };
  ctx.window = Object.assign(ctx, ctx.window);
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync("data/a1.js", "utf8"), ctx);
  vm.runInContext(fs.readFileSync("data/a2.js", "utf8"), ctx);
  vm.runInContext(fs.readFileSync("js/app.js", "utf8"), ctx);
  return ctx;
}

test("gitignore protects .env secrets, scripts/node_modules, and /docs/ while allowing .env.example", () => {
  const gi = fs.readFileSync(".gitignore", "utf8");
  for (const pat of [".env", ".env.*", "!.env.example", "scripts/node_modules/", "/docs/"]) {
    assert.ok(gi.includes(pat), `Missing ${pat} in .gitignore`);
  }
});

test("computeAudioId is deterministic 8-hex FNV-1a and speakSentence prefers manifest MP3 with fallback", async () => {
  const ctx = loadAppContext({});
  const cleaned = ctx.cleanSentenceForSpeech("What's the matter? How are you feeling today?");
  const id = ctx.computeAudioId(cleaned);
  assert.match(id, /^[0-9a-f]{8}$/);

  // 1. Not in manifest -> goes straight to translate_tts (zero 404 requests to audio/)
  ctx.speakSentence(null, "What's the matter? How are you feeling today?");
  assert.ok(ctx.getPlayLog()[0].includes("translate_tts"));

  // 2. Present in manifest -> plays static audio/<id>.mp3
  ctx.window.AUDIO_MANIFEST[id] = 1;
  ctx.getPlayLog().length = 0;
  ctx.speakSentence(null, "What's the matter? How are you feeling today?");
  assert.equal(ctx.getPlayLog()[0], `audio/${id}.mp3`);

  // 3. Static MP3 play() rejection -> falls back immediately to translate_tts
  ctx.getPlayLog().length = 0;
  ctx.setFailStatic(true);
  ctx.speakSentence(null, "What's the matter? How are you feeling today?");
  await new Promise(r => setImmediate(r));
  assert.equal(ctx.getPlayLog()[0], `audio/${id}.mp3`);
  assert.ok(ctx.getPlayLog()[1].includes("translate_tts"));
});

test("extractSpeakableCorpus deduplicates ~736 sentences with matching IDs and buildExpressiveTurn injects context emotion without mutating data", async () => {
  const mod = await import("../lib/corpus-prosody.mjs");
  const ctx = loadAppContext({});
  const items = mod.extractSpeakableCorpus(ctx.window.LEVEL_DATA);
  assert.ok(items.length >= 700 && items.length <= 800, `Unexpected corpus size: ${items.length}`);

  // Hash parity between Node generator and browser app.js (test across entire corpus!)
  for (const sample of items) {
    assert.equal(sample.id, ctx.computeAudioId(sample.cleaned));
    assert.doesNotMatch(sample.cleaned, /<(sigh|short pause|breath)>/);
  }

  // Feelings distress line gets <sigh> + troubled/weary British style
  const complaint = mod.buildExpressiveTurn({
    cleaned: "I'm feeling really tired and stressed.",
    category: "p2_feelings_problem"
  });
  assert.ok(complaint.text.startsWith("<sigh> "), complaint.text);
  assert.match(complaint.style, /British/i);
  assert.match(complaint.style, /weary|troubled|tired|emotional/i);

  // Gratitude reaction in Feelings does NOT sigh; uses warm relieved tone
  const thanks = mod.buildExpressiveTurn({
    cleaned: "Thank you so much! I'll go to bed early tonight.",
    category: "p2_feelings_problem"
  });
  assert.doesNotMatch(thanks.text, /<sigh>/);
  assert.match(thanks.style, /relieved|grateful|warm/i);

  // Spot the Differences injects contrastive <short pause> before whereas/but/while
  const diff = mod.buildExpressiveTurn({
    cleaned: "In Picture A, the desk lamp is blue, whereas in Picture B, it is yellow.",
    category: "p2_spot_diff"
  });
  assert.ok(diff.text.includes("<short pause> whereas in Picture B"), diff.text);
});


test("parseWavPcm16 skips extra RIFF LIST chunks and wavBufferToMp3 outputs compact valid MP3", async () => {
  const { parseWavPcm16, wavBufferToMp3 } = await import("../lib/wav-to-mp3.mjs");
  // Build 0.25s 24kHz mono 16-bit sine wave WAV with an extra 16-byte JUNK chunk before data
  const sampleRate = 24000;
  const numSamples = 6000;
  const pcm = Buffer.alloc(numSamples * 2);
  for (let i = 0; i < numSamples; i++) {
    pcm.writeInt16LE(Math.round(Math.sin(i * 0.1) * 12000), i * 2);
  }
  const fmt = Buffer.alloc(24);
  fmt.write("fmt ", 0); fmt.writeUInt32LE(16, 4); fmt.writeUInt16LE(1, 8); fmt.writeUInt16LE(1, 10);
  fmt.writeUInt32LE(sampleRate, 12); fmt.writeUInt32LE(sampleRate * 2, 16); fmt.writeUInt16LE(2, 20); fmt.writeUInt16LE(16, 22);
  const junk = Buffer.alloc(16);
  junk.write("JUNK", 0); junk.writeUInt32LE(8, 4);
  const dataHdr = Buffer.alloc(8);
  dataHdr.write("data", 0); dataHdr.writeUInt32LE(pcm.length, 4);
  const riff = Buffer.alloc(12);
  const bodyLen = 4 + fmt.length + junk.length + dataHdr.length + pcm.length;
  riff.write("RIFF", 0); riff.writeUInt32LE(bodyLen, 4); riff.write("WAVE", 8);
  const wav = Buffer.concat([riff, fmt, junk, dataHdr, pcm]);

  const parsed = parseWavPcm16(wav);
  assert.equal(parsed.sampleRate, 24000);
  assert.equal(parsed.channels, 1);
  assert.equal(parsed.samples.length, numSamples);

  const mp3 = wavBufferToMp3(wav, 48);
  assert.ok(mp3.length > 400 && mp3.length < wav.length / 2, `Unexpected MP3 size ${mp3.length}`);
  assert.equal(mp3[0], 0xff); // MPEG frame sync byte
});


test("runGenerator sends Gemini 3.8 TTS schema, retries HTTP 429, skips existing MP3s on resume, syncs manifest, and surgically updates + prunes 1 edited sentence", async () => {
  const { runGenerator } = await import("../generate-tts.mjs");
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ef-tts-"));
  const audioDir = path.join(tmpDir, "audio");
  const manifestPath = path.join(tmpDir, "audio-manifest.js");

  try {
    // Minimal 0.1s valid 24kHz WAV payload in base64
    const pcm = Buffer.alloc(4800);
    const hdr = Buffer.alloc(44);
    hdr.write("RIFF", 0); hdr.writeUInt32LE(36 + pcm.length, 4); hdr.write("WAVEfmt ", 8);
    hdr.writeUInt32LE(16, 16); hdr.writeUInt16LE(1, 20); hdr.writeUInt16LE(1, 22);
    hdr.writeUInt32LE(24000, 24); hdr.writeUInt32LE(48000, 28); hdr.writeUInt16LE(2, 32);
    hdr.writeUInt16LE(16, 34); hdr.write("data", 36); hdr.writeUInt32LE(pcm.length, 40);
    const b64Wav = Buffer.concat([hdr, pcm]).toString("base64");

    const calls = [];
    let throttleOnce = true;
    const fakeFetch = async (url, init) => {
      const body = JSON.parse(init.body);
      calls.push({ url, headers: init.headers, body });
      if (throttleOnce) {
        throttleOnce = false;
        return { ok: false, status: 429, headers: { get: () => "0" }, text: async () => "rate limited" };
      }
      return {
        ok: true,
        status: 200,
        json: async () => ({
          steps: [{ type: "model_output", content: [{ type: "audio", mime_type: "audio/wav", data: b64Wav }] }]
        })
      };
    };

    const items = [
      { id: "11111111", cleaned: "I'm feeling really tired.", category: "p2_feelings_problem" },
      { id: "22222222", cleaned: "What's your name?", category: "question" }
    ];

    // First run: 1st item hits 429 then succeeds; 2nd item succeeds -> 3 fetch calls total
    const res1 = await runGenerator({
      apiKey: "test-key", items, audioDir, manifestPath, voice: "Aoede",
      model: "gemini-3.8-flash-tts", delayMs: 0, baseBackoffMs: 5, fetchImpl: fakeFetch, quiet: true
    });
    assert.equal(res1.generated, 2);
    assert.equal(res1.skipped, 0);
    assert.equal(calls.length, 3);
    assert.equal(calls[0].headers["x-goog-api-key"], "test-key");
    assert.equal(calls[0].body.model, "gemini-3.8-flash-tts");
    assert.equal(calls[0].body.store, false);
    assert.equal(calls[0].body.response_format.type, "audio");
    assert.equal(calls[0].body.generation_config.speech_config[0].voice, "Aoede");
    assert.equal(calls[0].body.input[0].content[0].annotations[0].type, "speech_metadata");

    // Second run (resume): both MP3s already exist -> 0 new fetch calls!
    const res2 = await runGenerator({
      apiKey: "test-key", items, audioDir, manifestPath, voice: "Aoede",
      model: "gemini-3.8-flash-tts", delayMs: 0, baseBackoffMs: 5, fetchImpl: fakeFetch, quiet: true
    });
    assert.equal(res2.generated, 0);
    assert.equal(res2.skipped, 2);
    assert.equal(calls.length, 3);

    const manifestJs = fs.readFileSync(manifestPath, "utf8");
    assert.ok(manifestJs.includes('"11111111":1') && manifestJs.includes('"22222222":1'));

    // Third run (1 sentence edited: "11111111" replaced by "33333333"): generates ONLY the 1 edited sentence and auto-prunes orphan "11111111.mp3"!
    const editedItems = [
      { id: "33333333", cleaned: "I'm feeling exhausted today.", category: "p2_feelings_problem" },
      { id: "22222222", cleaned: "What's your name?", category: "question" }
    ];
    const res3 = await runGenerator({
      apiKey: "test-key", items: editedItems, activeCorpusIds: new Set(["33333333", "22222222"]),
      pruneOrphans: true, audioDir, manifestPath, voice: "Aoede",
      model: "gemini-3.8-flash-tts", delayMs: 0, baseBackoffMs: 5, fetchImpl: fakeFetch, quiet: true
    });
    assert.equal(res3.generated, 1); // Only the 1 changed sentence!
    assert.equal(res3.skipped, 1);   // Unchanged sentence untouched!
    assert.equal(res3.pruned, 1);    // Old typo MP3 automatically deleted!
    assert.equal(fs.existsSync(path.join(audioDir, "11111111.mp3")), false);
    assert.equal(fs.existsSync(path.join(audioDir, "33333333.mp3")), true);
    const manifestAfterEdit = fs.readFileSync(manifestPath, "utf8");
    assert.ok(!manifestAfterEdit.includes('"11111111":1'));
    assert.ok(manifestAfterEdit.includes('"33333333":1') && manifestAfterEdit.includes('"22222222":1'));
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});


test("review regressions: interactiveMap.lots directions, raw cleanSentenceForSpeech parity, multi-unit membership, and all 12 A2 Feelings reactions", async () => {
  const mod = await import("../lib/corpus-prosody.mjs");
  const ctx = loadAppContext({});
  const items = mod.extractSpeakableCorpus(ctx.window.LEVEL_DATA);

  // Critical #1: All 6 categories (including p2_directions from interactiveMap.lots) must be populated (~752 total)
  const counts = {};
  for (const it of items) {
    counts[it.category] = (counts[it.category] || 0) + 1;
    // Minor #9: Raw cleanSentenceForSpeech parity between browser js/app.js and Node corpus-prosody.mjs
    assert.ok(typeof it.raw === "string" && it.raw.length > 0);
    assert.equal(ctx.cleanSentenceForSpeech(it.raw), mod.cleanSentenceForSpeech(it.raw));
    assert.equal(ctx.cleanSentenceForSpeech(it.raw), it.cleaned);
  }
  for (const cat of ["p2_feelings_problem", "p2_feelings_sympathy", "p2_spot_diff", "p2_directions", "question", "answer"]) {
    assert.ok((counts[cat] || 0) > 0, `Expected category ${cat} to have items, got ${counts[cat] || 0}`);
  }
  assert.ok(counts.p2_directions >= 15, `Expected >=15 map direction sentences, got ${counts.p2_directions}`);

  // Minor #7: Cross-unit / A2 final filtering retains all unitKeys and levels
  const a2FinalMatches = items.filter(it => Array.isArray(it.levels) && it.levels.includes("A2") && Array.isArray(it.unitKeys) && it.unitKeys.includes("final"));
  assert.ok(a2FinalMatches.length >= 100, `Expected A2 final filter to match >=100 items, got ${a2FinalMatches.length}`);

  // Important #4: Upbeat A2 Feelings reactions ("That sounds great! Thanks...", "Haha, you're right! Thanks...") never sigh
  for (const line of [
    "That sounds great! Thanks for your advice, I'll watch a comedy film now.",
    "Haha, you're right! Thanks for your advice, I won't watch horror films at night anymore."
  ]) {
    const turn = mod.buildExpressiveTurn({ cleaned: line, category: "p2_feelings_problem" });
    assert.doesNotMatch(turn.text, /<sigh>/, `Reaction should not sigh: ${turn.text}`);
    assert.match(turn.style, /relieved|grateful|warm/i);
  }
});

test("review regressions: speakSentence guards against stale AbortError after stopAllAudio and double fallback on 404", async () => {
  // Custom Audio harness supporting deferred play() promises and simultaneous onerror + rejection
  const playLog = [];
  let mode = "ok";
  let pendingReject = null;
  let lastAudioInstance = null;

  const ctx = loadAppContext({});
  ctx.Audio = function () {
    lastAudioInstance = this;
    this.play = () => {
      playLog.push(this.src);
      if (mode === "double-fail" && this.src.startsWith("audio/")) {
        mode = "ok";
        if (typeof this.onerror === "function") this.onerror(new Error("404 error event"));
        return Promise.reject(new Error("404 play rejection"));
      }
      if (mode === "defer-static" && this.src.startsWith("audio/")) {
        mode = "ok";
        return new Promise((_, reject) => { pendingReject = reject; });
      }
      return Promise.resolve();
    };
    this.pause = () => {};
  };
  ctx.window.Audio = ctx.Audio;

  const s1 = "What's the matter? How are you feeling today?";
  const id1 = ctx.computeAudioId(ctx.cleanSentenceForSpeech(s1));
  ctx.window.AUDIO_MANIFEST[id1] = 1;

  // 1. Simultaneous onerror + play() rejection triggers translate_tts fallback ONCE, not twice
  mode = "double-fail";
  ctx.speakSentence(null, s1);
  await new Promise(r => setImmediate(r));
  assert.equal(playLog.length, 2, `Expected [static, fallback] once, got: ${JSON.stringify(playLog)}`);
  assert.equal(playLog[0], `audio/${id1}.mp3`);
  assert.ok(playLog[1].includes("translate_tts"));

  // 2. Stale AbortError after stopAllAudio() must NOT trigger ghost fallback playback
  playLog.length = 0;
  mode = "defer-static";
  ctx.speakSentence(null, s1);
  assert.equal(playLog.length, 1);
  ctx.stopAllAudio();
  pendingReject(new Error("AbortError: The play() request was interrupted by pause()"));
  await new Promise(r => setImmediate(r));
  assert.equal(playLog.length, 1, `Expected zero ghost fallback plays after stopAllAudio, got: ${JSON.stringify(playLog)}`);
  assert.ok(lastAudioInstance);
});

test("review regressions: empty WAV throws, CLI validates flags & voices schema, and mid-batch failure syncs partial manifest", async () => {
  const { parseWavPcm16 } = await import("../lib/wav-to-mp3.mjs");
  const { parseCliArgs, formatVoiceEntry, runGenerator } = await import("../generate-tts.mjs");

  // Minor #8: 0-byte data chunk throws instead of encoding silent MP3
  const emptyHdr = Buffer.alloc(44);
  emptyHdr.write("RIFF", 0); emptyHdr.writeUInt32LE(36, 4); emptyHdr.write("WAVEfmt ", 8);
  emptyHdr.writeUInt32LE(16, 16); emptyHdr.writeUInt16LE(1, 20); emptyHdr.writeUInt16LE(1, 22);
  emptyHdr.writeUInt32LE(24000, 24); emptyHdr.writeUInt32LE(48000, 28); emptyHdr.writeUInt16LE(2, 32);
  emptyHdr.writeUInt16LE(16, 34); emptyHdr.write("data", 36); emptyHdr.writeUInt32LE(0, 40);
  assert.throws(() => parseWavPcm16(emptyHdr), /empty PCM data/i);

  // Important #6: parseCliArgs supports --key=value and throws on unknown/malformed flags
  const parsed = parseCliArgs(["--unit=u12", "--sample", "6", "--force"]);
  assert.equal(parsed.unit, "u12");
  assert.equal(parsed.sample, 6);
  assert.equal(parsed.force, true);
  assert.throws(() => parseCliArgs(["--matches", "tired", "--force"]), /Unknown option/i);
  assert.throws(() => parseCliArgs(["--sample", "abc"]), /Invalid numeric value/i);
  assert.throws(() => parseCliArgs(["--match", "--force"]), /Missing value/i);

  // Important #3: formatVoiceEntry reads Gemini v1beta Voices schema (id + display_name)
  const line = formatVoiceEntry({ id: "Aoede", display_name: "Aoede", gender: "female", description: "Breezy and natural" });
  assert.ok(line.includes("Aoede") && !line.includes("undefined"), line);

  // Important #5: Mid-batch error syncs completed MP3s to manifest before rethrowing
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ef-tts-partial-"));
  const audioDir = path.join(tmpDir, "audio");
  const manifestPath = path.join(tmpDir, "audio-manifest.js");
  try {
    const pcm = Buffer.alloc(4800);
    const hdr = Buffer.alloc(44);
    hdr.write("RIFF", 0); hdr.writeUInt32LE(36 + pcm.length, 4); hdr.write("WAVEfmt ", 8);
    hdr.writeUInt32LE(16, 16); hdr.writeUInt16LE(1, 20); hdr.writeUInt16LE(1, 22);
    hdr.writeUInt32LE(24000, 24); hdr.writeUInt32LE(48000, 28); hdr.writeUInt16LE(2, 32);
    hdr.writeUInt16LE(16, 34); hdr.write("data", 36); hdr.writeUInt32LE(pcm.length, 40);
    const b64Wav = Buffer.concat([hdr, pcm]).toString("base64");

    let count = 0;
    const partialFetch = async () => {
      count++;
      if (count === 1) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            steps: [{ type: "model_output", content: [{ type: "audio", mime_type: "audio/wav", data: b64Wav }] }]
          })
        };
      }
      return { ok: false, status: 400, headers: { get: () => null }, text: async () => "quota exceeded" };
    };

    await assert.rejects(
      () => runGenerator({
        apiKey: "test-key",
        items: [
          { id: "aaaaaaaa", cleaned: "Hello there.", category: "answer" },
          { id: "bbbbbbbb", cleaned: "Second sentence.", category: "answer" }
        ],
        audioDir, manifestPath, delayMs: 0, baseBackoffMs: 1, maxRetries: 0, fetchImpl: partialFetch, quiet: true
      }),
      /HTTP 400/
    );

    assert.equal(fs.existsSync(manifestPath), true, "Manifest should be synced even when batch aborts mid-way");
    assert.ok(fs.readFileSync(manifestPath, "utf8").includes('"aaaaaaaa":1'));
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});
