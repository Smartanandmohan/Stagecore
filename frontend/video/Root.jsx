import React from "react";
import { Composition } from "remotion";
import { StageCorePromo } from "./StageCorePromo";
import { StageCorePromoRegen } from "./StageCorePromoRegen";

export const VideoRoot = () => (
  <>
    <Composition
      id="StageCoreLaunch"
      component={StageCorePromo}
      durationInFrames={3600}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ soundtrack: true, narration: true }}
    />
    <Composition
      id="StageCoreRegenDraft"
      component={StageCorePromoRegen}
      durationInFrames={3600}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
