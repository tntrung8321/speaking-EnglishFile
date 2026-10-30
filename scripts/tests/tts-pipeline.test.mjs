import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
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

test("gitignore protects .env secrets, scripts/node_modules, and /docs/", () => {
  const gi = fs.readFileSync(".gitignore", "utf8");
  for (const pat of [".env", ".env.*", "scripts/node_modules/", "/docs/"]) {
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
