import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.*;

/** Deterministic launch-film data and soundscape generator. No external libraries. */
public final class StageCoreDataGenerator {
  private static final int RATE = 48_000;
  private static final int SECONDS = 120;
  private static final int[] CUES = {0, 15, 27, 36, 45, 54, 63, 72, 81, 90, 99, 110, 116};

  public static void main(String[] args) throws Exception {
    Path output = args.length == 0 ? Path.of("public/video") : Path.of(args[0]);
    Files.createDirectories(output.resolve("audio"));
    writeSimulation(output.resolve("stagecore-simulation.json"));
    writeSoundscape(output.resolve("audio/stagecore-soundscape.wav"));
    System.out.println("Generated deterministic StageCore promo data and 120-second soundscape in " + output);
  }

  private static void writeSimulation(Path path) throws IOException {
    StringBuilder json = new StringBuilder("{\n  \"fps\": 30,\n  \"durationSeconds\": 120,\n  \"rankSamples\": [\n");
    Random random = new Random(8271);
    int rating = 3180;
    for (int i = 0; i < 40; i++) {
      rating += 5 + random.nextInt(13);
      json.append("    {\"second\": ").append(i * 3).append(", \"rating\": ").append(rating)
          .append(", \"playersOnline\": ").append(12_840 + i * 143).append("}")
          .append(i == 39 ? "\n" : ",\n");
    }
    json.append("  ],\n  \"sceneCues\": ").append(Arrays.toString(CUES)).append("\n}\n");
    Files.writeString(path, json.toString(), StandardCharsets.UTF_8);
  }

  private static void writeSoundscape(Path path) throws IOException {
    int samples = RATE * SECONDS;
    byte[] pcm = new byte[samples * 2];
    Random noise = new Random(20260622);
    for (int i = 0; i < samples; i++) {
      double t = i / (double) RATE;
      double pulse = 0.5 + 0.5 * Math.sin(2 * Math.PI * 1.9 * t);
      double pad = Math.sin(2 * Math.PI * 55 * t) * 0.11
          + Math.sin(2 * Math.PI * 82.5 * t + 0.4) * 0.07
          + Math.sin(2 * Math.PI * 110 * t + Math.sin(t * 0.3)) * 0.035;
      double rhythm = Math.sin(2 * Math.PI * 220 * t) * Math.pow(pulse, 12) * 0.025;
      double cue = 0;
      for (int second : CUES) {
        double dt = t - second;
        if (dt >= 0 && dt < 0.55) cue += Math.sin(2 * Math.PI * (150 - 90 * dt) * dt) * Math.exp(-8 * dt) * 0.18;
      }
      double air = (noise.nextDouble() * 2 - 1) * 0.006;
      double fade = Math.min(1, t / 2.0) * Math.min(1, (SECONDS - t) / 3.0);
      short value = (short) Math.max(Short.MIN_VALUE, Math.min(Short.MAX_VALUE, (pad + rhythm + cue + air) * fade * 32767));
      pcm[i * 2] = (byte) value;
      pcm[i * 2 + 1] = (byte) (value >>> 8);
    }
    try (DataOutputStream out = new DataOutputStream(new BufferedOutputStream(Files.newOutputStream(path)))) {
      int dataSize = pcm.length;
      out.writeBytes("RIFF"); writeLE(out, 36 + dataSize); out.writeBytes("WAVEfmt "); writeLE(out, 16);
      writeShortLE(out, 1); writeShortLE(out, 1); writeLE(out, RATE); writeLE(out, RATE * 2);
      writeShortLE(out, 2); writeShortLE(out, 16); out.writeBytes("data"); writeLE(out, dataSize); out.write(pcm);
    }
  }

  private static void writeLE(DataOutputStream out, int value) throws IOException {
    out.writeByte(value); out.writeByte(value >>> 8); out.writeByte(value >>> 16); out.writeByte(value >>> 24);
  }
  private static void writeShortLE(DataOutputStream out, int value) throws IOException {
    out.writeByte(value); out.writeByte(value >>> 8);
  }
}
