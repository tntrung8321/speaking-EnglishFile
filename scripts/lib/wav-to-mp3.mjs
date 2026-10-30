import * as lamejsPkg from "@breezystack/lamejs";

const Mp3Encoder =
  lamejsPkg.Mp3Encoder || (lamejsPkg.default && lamejsPkg.default.Mp3Encoder);

export function parseWavPcm16(wavBuffer) {
  const buf = Buffer.isBuffer(wavBuffer) ? wavBuffer : Buffer.from(wavBuffer);
  if (
    buf.length < 12 ||
    buf.toString("ascii", 0, 4) !== "RIFF" ||
    buf.toString("ascii", 8, 12) !== "WAVE"
  ) {
    throw new Error("Invalid WAV buffer: missing RIFF/WAVE header");
  }

  let fmt = null;
  let dataSlice = null;
  let pos = 12;

  while (pos + 8 <= buf.length) {
    const chunkId = buf.toString("ascii", pos, pos + 4);
    const chunkSize = buf.readUInt32LE(pos + 4);
    const dataStart = pos + 8;
    const dataEnd = Math.min(dataStart + chunkSize, buf.length);

    if (chunkId === "fmt ") {
      if (dataEnd - dataStart < 16) {
        throw new Error("Invalid WAV fmt chunk: shorter than 16 bytes");
      }
      const audioFormat = buf.readUInt16LE(dataStart);
      const channels = buf.readUInt16LE(dataStart + 2);
      const sampleRate = buf.readUInt32LE(dataStart + 4);
      const bitsPerSample = buf.readUInt16LE(dataStart + 14);
      fmt = { audioFormat, channels, sampleRate, bitsPerSample };
    } else if (chunkId === "data") {
      dataSlice = buf.subarray(dataStart, dataEnd);
    }

    pos = dataStart + chunkSize + (chunkSize % 2);
  }

  if (!fmt) throw new Error("Invalid WAV buffer: missing fmt chunk");
  if (!dataSlice) throw new Error("Invalid WAV buffer: missing data chunk");
  if (fmt.audioFormat !== 1) {
    throw new Error(`Unsupported WAV audioFormat ${fmt.audioFormat} (expected PCM = 1)`);
  }
  if (fmt.bitsPerSample !== 16) {
    throw new Error(`Unsupported WAV bitsPerSample ${fmt.bitsPerSample} (expected 16-bit PCM)`);
  }
  if (fmt.channels !== 1 && fmt.channels !== 2) {
    throw new Error(`Unsupported WAV channel count ${fmt.channels}`);
  }

  const totalSamples = Math.floor(dataSlice.length / 2);
  if (totalSamples === 0 || (fmt.channels === 2 && totalSamples < 2)) {
    throw new Error("Invalid WAV buffer: empty PCM data chunk");
  }
  const raw = new Int16Array(totalSamples);
  for (let i = 0; i < totalSamples; i++) {
    raw[i] = dataSlice.readInt16LE(i * 2);
  }

  if (fmt.channels === 2) {
    const monoLen = Math.floor(totalSamples / 2);
    const mono = new Int16Array(monoLen);
    for (let i = 0; i < monoLen; i++) {
      mono[i] = Math.round((raw[i * 2] + raw[i * 2 + 1]) / 2);
    }
    return { sampleRate: fmt.sampleRate, channels: 1, samples: mono };
  }

  return { sampleRate: fmt.sampleRate, channels: 1, samples: raw };
}

function toNodeBuffer(typedArr) {
  if (!typedArr || typedArr.byteLength === 0) return null;
  return Buffer.from(
    new Uint8Array(typedArr.buffer, typedArr.byteOffset, typedArr.byteLength)
  );
}

export function wavBufferToMp3(wavBuffer, kbps = 48) {
  if (typeof Mp3Encoder !== "function") {
    throw new Error("Mp3Encoder export not found in @breezystack/lamejs");
  }
  const { sampleRate, samples } = parseWavPcm16(wavBuffer);
  const encoder = new Mp3Encoder(1, sampleRate, kbps);
  const frameSize = 1152;
  const out = [];

  for (let i = 0; i < samples.length; i += frameSize) {
    const frame = samples.subarray(i, i + frameSize);
    const encoded = toNodeBuffer(encoder.encodeBuffer(frame));
    if (encoded) out.push(encoded);
  }

  const flushed = toNodeBuffer(encoder.flush());
  if (flushed) out.push(flushed);

  return Buffer.concat(out);
}
