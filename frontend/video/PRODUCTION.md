# StageCore product launch film

## Timeline and camera direction

| Scene | Time | Camera and transition | Sound cues |
|---|---:|---|---|
| Fragmentation | 00:00–00:15 | Oblique cards enter at conflicting angles; tangled SVG paths cross the frame; a horizontal energy wipe resolves the chaos. | Notification clutter, low sub pulse, synchronization impact at 00:15. |
| Meet StageCore | 00:15–00:27 | Concentric orbital reveal, centered brand lockup, slow push toward the core. | Clean system boot, tonal lift. |
| Dashboard deep dive | 00:27–01:39 | Eight 9-second feature fly-throughs. Each code-rendered interface eases from negative Z, settles into a glass plane, then morphs to the next module. | UI ticks, soft whooshes, result-confirmation chimes. |
| Organizer control | 01:39–01:50 | Perspective shift to the organizer control plane; charts grow and bracket seeding resolves. | Denser rhythmic bed, verification hits. |
| Unified ecosystem | 01:50–01:56 | Pull back from interface scale to a connected platform graph; links draw outward from StageCore. | Expanding stereo shimmer. |
| Future / CTA | 01:56–02:00 | Fast orbital collapse into the final brand lockup and CTA. | Final sub impact and resolved logo chord. |

All visual surfaces are React/HTML/CSS/SVG. No screenshots, screen recordings, raster UI, or website capture are referenced by the composition.

## Rendering

```bash
npm install
# Optional: requires a local JDK and generates the synthetic music bed/data.
javac video/java/StageCoreDataGenerator.java
java -cp video/java StageCoreDataGenerator public/video
npm run video:studio
npm run video:render
```

1080p master is `1920×1080`, 30 fps, 3,600 frames. For 4K, render with `--scale=2`:

```bash
npx remotion render video/index.jsx StageCoreLaunch out/stagecore-launch-4k.mp4 --codec=h264 --crf=16 --scale=2
```

The composition props expose `soundtrack` and `narration` toggles for clean picture, music-only, and final mix exports. The synthetic soundtrack defaults off until the optional Java generator has been run.
