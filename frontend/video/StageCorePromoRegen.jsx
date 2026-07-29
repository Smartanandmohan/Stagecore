import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { modules } from "./data";
import "./regen-styles.css";

// Simple premium scene component
const RegenScene = ({ label, duration, bgColor }) => {
  const f = useCurrentFrame();
  // Fade in/out animation
  const opacity = interpolate(f, [0, 10, duration - 10, duration], [0, 1, 1, 0]);
  return (
    <AbsoluteFill style={{
      background: bgColor,
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Inter, sans-serif",
      fontSize: "4rem",
      opacity,
    }}>
      {label.toUpperCase()}
    </AbsoluteFill>
  );
};

export const StageCorePromoRegen = () => {
  return (
    <>
      {modules.map((m, i) => (
        <Sequence key={i} from={m.at} durationInFrames={m.duration} layout="none">
          <RegenScene
            label={m.type}
            duration={m.duration}
            bgColor={i % 2 === 0 ? "linear-gradient(135deg, #0d0d2b, #1a1a40)" : "linear-gradient(135deg, #1a1a40, #0d0d2b)"}
          />
        </Sequence>
      ))}
    </>
  );
};
