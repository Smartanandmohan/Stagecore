export const BRAND = {
  ink: "#050816",
  purple: "#7c3aed",
  violet: "#a855f7",
  cyan: "#06b6d4",
};

export const modules = [
  {
    at: 0,
    duration: 309,
    type: "overview",
    eyebrow: "COMMAND CENTER",
    title: "Your competitive life. One view.",
    benefit: "Matches, rank, team and activity stay synchronized.",
    chips: ["125 matches", "68% win rate", "Diamond IV"],
  },
  {
    at: 289,
    duration: 269,
    type: "profile",
    eyebrow: "PLAYER IDENTITY",
    title: "A profile built to prove progress.",
    benefit:
      "Performance history, achievements and reputation travel with you.",
    chips: ["Verified identity", "Achievements", "Match history"],
  },
  {
    at: 538,
    duration: 278,
    type: "tournaments",
    eyebrow: "TOURNAMENT CENTER",
    title: "Discover. Register. Compete.",
    benefit:
      "Instant entry, schedules and check-in live in one continuous flow.",
    chips: ["4 live circuits", "One-click entry", "Check-in ready"],
  },
  {
    at: 796,
    duration: 263,
    type: "bracket",
    eyebrow: "MATCH OPERATIONS",
    title: "From check-in to championship.",
    benefit:
      "Bracket progression, match veto, results and verification stay connected.",
    chips: ["Live bracket", "Map veto", "Verified result"],
  },
  {
    at: 1039,
    duration: 206,
    type: "teams",
    eyebrow: "TEAM OPERATIONS",
    title: "Build the roster. Raise the ceiling.",
    benefit:
      "Create teams, recruit players, assign roles and read team health.",
    chips: ["5 / 6 roster", "Recruitment open", "Role controls"],
  },
  {
    at: 1225,
    duration: 277,
    type: "rankings",
    eyebrow: "RANKING ENGINE",
    title: "Every result moves the ladder.",
    benefit: "Global, regional and seasonal rankings make momentum visible.",
    chips: ["Global", "Regional", "Seasonal"],
  },
  {
    at: 1482,
    duration: 255,
    type: "comms",
    eyebrow: "COMMUNICATION HUB",
    title: "Strategy stays beside the match.",
    benefit:
      "Encrypted messaging, voice, video and alerts keep squads aligned.",
    chips: ["E2EE chat", "Voice + video", "Smart alerts"],
  },
  {
    at: 1717,
    duration: 176,
    type: "analytics",
    eyebrow: "PERFORMANCE INTELLIGENCE",
    title: "Turn every round into an edge.",
    benefit:
      "Win rate, K/D, map form, wallet and growth signals reveal the next move.",
    chips: ["Live trends", "Map form", "Prize wallet"],
  },
];

export const narrationStarts = [
  0, 324, 532, 821, 1070, 1328, 1571, 1757, 2014, 2249, 2425, 2590, 2817, 3042,
  3274,
];
export const particles = Array.from({ length: 42 }, (_, i) => ({
  x: (i * 137.3) % 100,
  y: (i * 71.7) % 100,
  size: 1 + (i % 4),
  delay: (i * 11) % 90,
}));
