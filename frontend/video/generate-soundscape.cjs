const fs = require('fs');
const path = require('path');

const RATE = 48000;
const SECONDS = 120;
const CUES = [0, 10.8, 17.733, 27.367, 35.667, 44.267, 52.367, 58.567, 67.133, 74.967, 80.833, 86.333, 93.9, 101.4, 109.133];

// Simple LCG random generator to match Java's Random(20260622) behavior for the air noise
class JavaRandom {
  constructor(seed) {
    this.seed = BigInt(seed);
  }
  nextNextDouble() {
    this.seed = (this.seed * 0x5DEECE66Dn + 0xBn) & ((1n << 48n) - 1n);
    const first = Number(this.seed >> 22n);
    this.seed = (this.seed * 0x5DEECE66Dn + 0xBn) & ((1n << 48n) - 1n);
    const second = Number(this.seed >> 22n);
    return ((first << 27) + second) / (1 << 53);
  }
  nextDouble() {
    this.seed = (this.seed * 0x5DEECE66Dn + 0xBn) & ((1n << 48n) - 1n);
    return Number(this.seed) / 281474976710656.0;
  }
}

function writeLE(buf, offset, value) {
  buf.writeUInt32LE(value, offset);
}

function writeShortLE(buf, offset, value) {
  buf.writeUInt16LE(value, offset);
}

function main() {
  const outputDir = path.resolve(__dirname, '../public/video/audio');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const wavPath = path.join(outputDir, 'stagecore-soundscape.wav');
  const samples = RATE * SECONDS;
  const pcm = Buffer.alloc(samples * 2);
  const rand = new JavaRandom(20260622);

  for (let i = 0; i < samples; i++) {
    const t = i / RATE;
    const pulse = 0.5 + 0.5 * Math.sin(2 * Math.PI * 1.9 * t);
    const pad = Math.sin(2 * Math.PI * 55 * t) * 0.11
        + Math.sin(2 * Math.PI * 82.5 * t + 0.4) * 0.07
        + Math.sin(2 * Math.PI * 110 * t + Math.sin(t * 0.3)) * 0.035;
    const rhythm = Math.sin(2 * Math.PI * 220 * t) * Math.pow(pulse, 12) * 0.025;
    
    let cue = 0;
    for (const second of CUES) {
      const dt = t - second;
      if (dt >= 0 && dt < 0.55) {
        cue += Math.sin(2 * Math.PI * (150 - 90 * dt) * dt) * Math.exp(-8 * dt) * 0.18;
      }
    }
    
    const air = (rand.nextDouble() * 2 - 1) * 0.006;
    const fade = Math.min(1, t / 2.0) * Math.min(1, (SECONDS - t) / 3.0);
    
    let value = Math.round((pad + rhythm + cue + air) * fade * 32767);
    value = Math.max(-32768, Math.min(32767, value));
    
    pcm.writeInt16LE(value, i * 2);
  }

  const dataSize = pcm.length;
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  writeLE(header, 4, 36 + dataSize);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  writeLE(header, 16, 16);
  writeShortLE(header, 20, 1); // AudioFormat = PCM
  writeShortLE(header, 22, 1); // NumChannels = 1
  writeLE(header, 24, RATE);
  writeLE(header, 28, RATE * 2);
  writeShortLE(header, 32, 2); // BlockAlign
  writeShortLE(header, 34, 16); // BitsPerSample
  header.write('data', 36);
  writeLE(header, 40, dataSize);

  const fileStream = fs.createWriteStream(wavPath);
  fileStream.write(header);
  fileStream.write(pcm);
  fileStream.end();

  console.log(`Generated deterministic StageCore soundscape in ${wavPath}`);

  // Also write the stagecore-simulation.json in public/video/
  const simDir = path.resolve(__dirname, '../public/video');
  const simPath = path.join(simDir, 'stagecore-simulation.json');
  
  // Custom random for simulation data to match Java Random(8271)
  const simRand = new JavaRandom(8271);
  let rating = 3180;
  let json = `{\n  "fps": 30,\n  "durationSeconds": 120,\n  "rankSamples": [\n`;
  
  for (let i = 0; i < 40; i++) {
    // Java random.nextInt(13)
    const randVal = Math.floor(simRand.nextDouble() * 13);
    rating += 5 + randVal;
    const playersOnline = 12840 + i * 143;
    json += `    {"second": ${i * 3}, "rating": ${rating}, "playersOnline": ${playersOnline}}${i === 39 ? '' : ',\n'}`;
  }
  json += `\n  ],\n  "sceneCues": [0, 10.8, 17.733, 27.367, 35.667, 44.267, 52.367, 58.567, 67.133, 74.967, 80.833, 86.333, 93.9, 101.4, 109.133]\n}\n`;
  fs.writeFileSync(simPath, json, 'utf8');
  console.log(`Generated simulation data in ${simPath}`);
}

main();
