import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { modules, narrationStarts, particles } from "./data";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };
const mix = (f, input, output) =>
  interpolate(f, input, output, {
    ...clamp,
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });

const Mark = ({ small = false }) => (
  <div className={`mark ${small ? "small" : ""}`}>
    <b>S</b>
    <span>
      STAGECORE<small>RISE. COMPETE. CONQUER.</small>
    </span>
  </div>
);
const Kicker = ({ children }) => (
  <div className="kicker">
    <i />
    {children}
  </div>
);

const Atmosphere = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill className="atmosphere">
      <div
        className="aurora a"
        style={{
          transform: `translate(${Math.sin(f / 70) * 70}px,${Math.cos(f / 90) * 45}px)`,
        }}
      />
      <div
        className="aurora b"
        style={{
          transform: `translate(${Math.cos(f / 80) * 55}px,${Math.sin(f / 60) * 65}px)`,
        }}
      />
      <div className="grid-floor" />
      {particles.map((p, i) => (
        <i
          className="particle"
          key={i}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: mix((f + p.delay) % 120, [0, 60, 120], [0.08, 0.8, 0.08]),
          }}
        />
      ))}
      <div className="vignette" />
      <div className="grain" />
    </AbsoluteFill>
  );
};

const Problem = () => {
  const f = useCurrentFrame();
  const cards = [
    ["DISCORD", "Team comms"],
    ["SHEETS", "Result tracking"],
    ["BRACKET SITE", "Tournament ops"],
    ["RANK.GG", "Skill rating"],
    ["MESSENGER", "Roster updates"],
  ];
  return (
    <AbsoluteFill className="scene problem">
      <div className="problem-copy">
        <Kicker>THE CURRENT REALITY</Kicker>
        <h1>
          Competitive gaming
          <br />
          <em>lost the plot.</em>
        </h1>
        <p>Five tools. Four identities. Zero shared context.</p>
      </div>
      <div className="chaos">
        {cards.map((c, i) => {
          const e = spring({
            frame: f - 25 - i * 20,
            fps: 30,
            config: { damping: 12 },
          });
          return (
            <div
              className={`chaos-card c${i}`}
              key={c[0]}
              style={{
                opacity: e,
                transform: `translateY(${(1 - e) * 180 + Math.sin((f + i * 22) / 20) * 10}px) rotate(${[-8, 5, -4, 7, -6][i]}deg)`,
              }}
            >
              <div className="fake-toolbar">
                <i />
                <i />
                <i />
              </div>
              <b>{c[0]}</b>
              <span>{c[1]}</span>
              <em>OUT OF SYNC</em>
              <div className="fake-lines">
                <i />
                <i />
                <i />
              </div>
            </div>
          );
        })}
        <svg className="tangle" viewBox="0 0 800 600">
          <path d="M30 90 C250 5 300 560 760 210 S350 15 30 520" />
          <path d="M20 410 C390 590 310 30 770 480" />
        </svg>
      </div>
      <div
        className="split-flash"
        style={{ width: `${mix(f, [280, 324], [0, 100])}%` }}
      />
      <div className="problem-footer">
        PLAYERS <i /> TEAMS <i /> ORGANIZERS <b>FRAGMENTED</b>
      </div>
    </AbsoluteFill>
  );
};

const Intro = () => {
  const f = useCurrentFrame(),
    p = spring({ frame: f, fps: 30, config: { damping: 11, mass: 0.8 } });
  return (
    <AbsoluteFill className="scene intro">
      <div className="orbit o1" />
      <div className="orbit o2" />
      <div className="orbit o3" />
      <div className="core-beam" />
      <div
        className="intro-lock"
        style={{ opacity: p, transform: `scale(${0.7 + p * 0.3})` }}
      >
        <Mark />
        <h2>
          THE OPERATING SYSTEM
          <br />
          <span>FOR COMPETITIVE GAMING</span>
        </h2>
        <p>One platform. One identity. One competitive ecosystem.</p>
      </div>
      <div className="system-ready">
        SYSTEM ONLINE <b>●</b>
      </div>
    </AbsoluteFill>
  );
};

const Sidebar = ({ active }) => (
  <div className="ui-sidebar">
    <Mark small />
    {[
      "Dashboard",
      "My Profile",
      "Tournaments",
      "Teams",
      "Leaderboard",
      "Statistics",
      "Wallet",
      "Messages",
    ].map((x) => (
      <div key={x} className={x.toLowerCase().includes(active) ? "active" : ""}>
        <i />
        {x}
      </div>
    ))}
    <div className="join-card">
      <b>YOUR ARENA AWAITS</b>
      <span>12 live events</span>
      <button>JOIN NOW</button>
    </div>
  </div>
);
const Shell = ({ active, children }) => (
  <div className="app-shell">
    <Sidebar active={active} />
    <div className="ui-main">
      <div className="ui-top">
        <div className="search">
          ⌕ &nbsp; Search tournaments, teams, players… <kbd>⌘ K</kbd>
        </div>
        <div className="top-actions">
          ◉ &nbsp; ◇ &nbsp; <b>AN</b>
          <span>
            ANANDMOHAN<small>ONLINE</small>
          </span>
        </div>
      </div>
      {children}
    </div>
  </div>
);
const Panel = ({ className = "", children, ...props }) => (
  <div className={`panel ${className}`} {...props}>
    {children}
  </div>
);
const Stat = ({ label, value, color = "purple", n = 0 }) => {
  const f = useCurrentFrame();
  return (
    <Panel className="stat">
      <small>{label}</small>
      <strong className={color}>
        {typeof value === "number"
          ? Math.round(mix(f % 270, [0, 90], [0, value]))
          : value}
      </strong>
      <svg viewBox="0 0 90 34">
        <path
          d={`M2 29 Q 18 ${25 - n} 28 20 T 48 ${23 - n} T 66 9 T 88 ${14 + n}`}
        />
      </svg>
    </Panel>
  );
};

const Overview = () => (
  <Shell active="dashboard">
    <div className="dash">
      <Panel className="welcome">
        <div>
          <small>WELCOME BACK</small>
          <h3>
            Ready to conquer, <span>anandmohan</span>?
          </h3>
          <p>Your next match starts in 1 hour.</p>
        </div>
        <div className="identity">
          <i>🎮</i>
          <span>
            RANK<b>Diamond IV</b>
          </span>
          <span>
            TEAM<b>Team Alpha</b>
          </span>
        </div>
      </Panel>
      <Panel className="rank-card">
        <small>CURRENT RANK</small>
        <div className="diamond">◇</div>
        <b>Diamond IV</b>
        <span>3250 / 3600 RP</span>
        <i />
      </Panel>
      <div className="stats-row">
        <Stat label="MATCHES PLAYED" value={125} />
        <Stat label="MATCHES WON" value={85} />
        <Stat label="WIN RATE" value="68%" color="cyan" />
        <Stat label="K/D RATIO" value="1.85" />
        <Stat label="TOURNAMENTS" value={9} color="cyan" />
      </div>
      <Panel className="upcoming">
        <small>UPCOMING MATCH</small>
        <h4>
          TEAM ALPHA <em>VS</em> TEAM BRAVO
        </h4>
        <div>QUARTER FINAL · BEST OF 3</div>
        <button>VIEW MATCH DETAILS</button>
      </Panel>
      <Panel className="activity">
        <small>RECENT ACTIVITY</small>
        {[
          "Registration approved for Valorant Cup #12",
          "Match against Team Delta scheduled",
          "₹1,000 prize payout received",
        ].map((x) => (
          <p key={x}>
            <i />
            {x}
            <span>JUST NOW</span>
          </p>
        ))}
      </Panel>
    </div>
  </Shell>
);

const Profile = () => (
  <Shell active="profile">
    <div className="profile-page">
      <Panel className="profile-hero">
        <div className="banner-grid" />
        <div className="avatar">
          AN<i>✓</i>
        </div>
        <div>
          <small>VERIFIED COMPETITOR</small>
          <h3>anandmohan</h3>
          <p>India · Valorant · Team Alpha</p>
        </div>
        <button>EDIT PROFILE</button>
      </Panel>
      <div className="stats-row four">
        <Stat label="MATCHES" value={125} />
        <Stat label="WIN RATE" value="68%" color="cyan" />
        <Stat label="K/D" value="1.85" />
        <Stat label="TOURNAMENT WINS" value={4} color="cyan" />
      </div>
      <Panel className="achievements">
        <small>ACHIEVEMENTS</small>
        <div className="medals">
          {[
            ["♛", "MVP SHOWDOWN"],
            ["◆", "DIAMOND IV"],
            ["⚡", "10 WIN STREAK"],
            ["◎", "SHARPSHOOTER"],
          ].map((x) => (
            <span key={x[1]}>
              <b>{x[0]}</b>
              {x[1]}
            </span>
          ))}
        </div>
      </Panel>
      <Panel className="history">
        <small>MATCH HISTORY</small>
        {[
          ["TEAM DELTA", "13 — 8", "WIN"],
          ["VELOCITY", "11 — 13", "LOSS"],
          ["GODLIKE", "13 — 4", "WIN"],
        ].map((x) => (
          <div key={x[0]}>
            <i>V</i>
            <b>{x[0]}</b>
            <span>VALORANT · ASCENT</span>
            <strong>{x[1]}</strong>
            <em className={x[2]}>{x[2]}</em>
          </div>
        ))}
      </Panel>
    </div>
  </Shell>
);

const Tournaments = () => (
  <Shell active="tournaments">
    <div className="tourney-page">
      <div className="page-head">
        <div>
          <Kicker>TOURNAMENT CENTER</Kicker>
          <h3>Tournaments Arena</h3>
          <p>
            Discover global events and register without leaving your competitive
            profile.
          </p>
        </div>
        <div className="tabs">
          <b>ALL</b>
          <span>REGISTERED</span>
          <span>LIVE</span>
          <span>UPCOMING</span>
        </div>
      </div>
      <div className="tourney-grid">
        {[
          ["VALORANT CUP #12", "₹25,000", "MAY 25", "VALORANT"],
          ["BGMI MASTERS", "₹50,000", "LIVE NOW", "BGMI"],
          ["FREE FIRE CLASH", "₹10,000", "JUN 01", "FREE FIRE"],
          ["STAGECORE CS2 CUP", "₹30,000", "JUN 08", "CS2"],
        ].map((x, i) => (
          <Panel className={`tourney-card game${i}`} key={x[0]}>
            <div className="game-art">
              <i />
              <b>{x[3]}</b>
            </div>
            <small>{i === 1 ? "LIVE" : "UPCOMING"}</small>
            <h4>{x[0]}</h4>
            <div>
              <span>
                PRIZE POOL<b>{x[1]}</b>
              </span>
              <span>
                STARTS<b>{x[2]}</b>
              </span>
            </div>
            <button>{i === 0 ? "REGISTER INSTANTLY" : "VIEW DETAILS"}</button>
          </Panel>
        ))}
      </div>
    </div>
  </Shell>
);

const Bracket = () => (
  <Shell active="tournaments">
    <div className="bracket-page">
      <div className="page-head">
        <div>
          <Kicker>LIVE TOURNAMENT</Kicker>
          <h3>Valorant Cup #12</h3>
          <p>Automated bracket · 16 teams · Best of 3</p>
        </div>
        <div className="live-pill">● LIVE</div>
      </div>
      <div className="bracket-board">
        {[
          ["ROUND OF 16", 4],
          ["QUARTER FINAL", 3],
          ["SEMI FINAL", 2],
          ["GRAND FINAL", 1],
        ].map((round, col) => (
          <div className="bracket-col" key={round[0]}>
            <small>{round[0]}</small>
            {Array.from({ length: round[1] }, (_, i) => (
              <Panel className="match-node" key={i}>
                <span>
                  {
                    ["Team Alpha", "Velocity", "GodLike", "Reckoning"][
                      (i + col) % 4
                    ]
                  }
                  <b>{i % 2 ? 1 : 2}</b>
                </span>
                <span>
                  {
                    ["Team Delta", "Entity", "Team Soul", "Immortal"][
                      (i + col) % 4
                    ]
                  }
                  <b>{i % 2 ? 2 : 0}</b>
                </span>
                <em>{col === 3 ? "LIVE" : "VERIFIED"}</em>
              </Panel>
            ))}
          </div>
        ))}
      </div>
      <div className="match-flow">
        <span>
          CHECK-IN <b>✓</b>
        </span>
        <i />
        <span>
          MAP VETO <b>✓</b>
        </span>
        <i />
        <span>
          PLAY <b>●</b>
        </span>
        <i />
        <span>
          VERIFY <b>↗</b>
        </span>
      </div>
    </div>
  </Shell>
);

const Teams = () => (
  <Shell active="teams">
    <div className="teams-page">
      <div className="page-head">
        <div>
          <Kicker>TEAM OPERATIONS</Kicker>
          <h3>Team Alpha</h3>
          <p>Roster health, recruitment and roles—managed in one place.</p>
        </div>
        <button className="primary">+ INVITE PLAYER</button>
      </div>
      <div className="team-layout">
        <Panel className="team-card">
          <div className="team-logo">TA</div>
          <h3>Team Alpha</h3>
          <span>VALORANT · INDIA</span>
          <div className="level">
            <i />
            <small>TEAM LEVEL 12</small>
          </div>
          <div className="recruit">
            <b>RECRUITMENT</b>
            <span>OPEN ●</span>
          </div>
        </Panel>
        <Panel className="roster">
          <small>ACTIVE ROSTER · 5 / 6</small>
          {[
            ["SentinelX", "CAPTAIN / IGL", "CONQUEROR"],
            ["anandmohan", "DUELIST", "DIAMOND IV"],
            ["Jonathan_Jr", "SENTINEL", "CONQUEROR"],
            ["KillerFF", "INITIATOR", "ACE"],
            ["RDX_Gamer", "CONTROLLER", "CONQUEROR"],
          ].map((x, i) => (
            <div key={x[0]}>
              <i>{x[0].slice(0, 2).toUpperCase()}</i>
              <b>
                {x[0]}
                {i === 1 && <em>YOU</em>}
              </b>
              <span>{x[1]}</span>
              <strong>{x[2]}</strong>
              <button>•••</button>
            </div>
          ))}
        </Panel>
        <Panel className="team-health">
          <small>TEAM PERFORMANCE</small>
          <div className="donut">
            <b>74%</b>
          </div>
          <p>
            Win rate <b>68%</b>
          </p>
          <p>
            Team synergy <b>82%</b>
          </p>
          <p>
            Roster stability <b>91%</b>
          </p>
        </Panel>
      </div>
    </div>
  </Shell>
);

const Rankings = () => {
  const f = useCurrentFrame();
  return (
    <Shell active="leaderboard">
      <div className="rankings-page">
        <div className="page-head">
          <div>
            <Kicker>RANKING ENGINE</Kicker>
            <h3>Global Leaderboard</h3>
            <p>One result updates player, team and seasonal standings.</p>
          </div>
          <div className="tabs">
            <b>GLOBAL</b>
            <span>REGIONAL</span>
            <span>SEASON 06</span>
          </div>
        </div>
        <div className="podium">
          {[
            ["2", "SlayerX", "3,842"],
            ["1", "JONATHAN", "4,108"],
            ["3", "Mortal", "3,721"],
          ].map((x, i) => (
            <Panel
              key={x[1]}
              style={{ transform: `translateY(${i === 1 ? -35 : 0}px)` }}
            >
              <strong>#{x[0]}</strong>
              <i>{x[1][0]}</i>
              <b>{x[1]}</b>
              <span>{x[2]} RP</span>
            </Panel>
          ))}
        </div>
        <Panel className="rank-table">
          <div className="table-head">
            RANK <span>PLAYER</span>
            <span>TEAM</span>
            <span>REGION</span>
            <span>WIN RATE</span>
            <span>RATING</span>
          </div>
          {["anandmohan", "Viper", "Coldzera_In", "ShadowX"].map((x, i) => (
            <div className={i === 0 ? "me" : ""} key={x}>
              <b>#{4 + i}</b>
              <i>{x.slice(0, 2).toUpperCase()}</i>
              <strong>{x}</strong>
              <span>{i === 0 ? "Team Alpha" : "Velocity Gaming"}</span>
              <span>INDIA</span>
              <span>{68 - i * 2}%</span>
              <em>+{Math.round(mix(f % 285, [0, 120], [0, 32 - i * 3]))} RP</em>
            </div>
          ))}
        </Panel>
      </div>
    </Shell>
  );
};

const Comms = () => (
  <Shell active="messages">
    <div className="comms-page">
      <Panel className="channels">
        <small>MESSAGES</small>
        <div className="channel-search">⌕ Search channels</div>
        {[
          "# TEAM-ALPHA",
          "# TOURNAMENT-ANNOUNCEMENTS",
          "# GENERAL-CHAT",
          "# HELP-SUPPORT",
        ].map((x, i) => (
          <div className={i === 0 ? "active" : ""} key={x}>
            <b>{x}</b>
            <span>{5 + i * 3} MEMBERS ONLINE</span>
          </div>
        ))}
        <div className="secure">◆ END-TO-END ENCRYPTED</div>
      </Panel>
      <Panel className="chat">
        <div className="chat-head">
          <div>
            <b>#TEAM-ALPHA</b>
            <small>5 MEMBERS ONLINE</small>
          </div>
          <span>♙ &nbsp; ☏ &nbsp; ▣ &nbsp; •••</span>
        </div>
        <div className="messages">
          {[
            ["XENO", "Hey squad, everyone practice the split-push strategy."],
            ["SLAYER", "Two more scenarios. Then we lock the veto."],
            ["COACH_RED", "Check-in starts at 07:30. Don’t be late."],
            ["YOU", "Got it coach. I’m warmed up and ready."],
          ].map((x, i) => (
            <div className={i === 3 ? "mine" : ""} key={x[0]}>
              <i>{x[0][0]}</i>
              <span>
                <b>
                  {x[0]} <em>14:{15 + i * 7}</em>
                </b>
                <p>{x[1]}</p>
              </span>
            </div>
          ))}
        </div>
        <div className="composer">
          ⊕ &nbsp; Message #team-alpha… <span>☺ &nbsp; ➤</span>
        </div>
      </Panel>
      <Panel className="call-card">
        <div className="pulse-call">☎</div>
        <small>TEAM VOICE</small>
        <h4>5 connected</h4>
        <div className="avatars">
          {["AN", "SX", "JN", "KF", "RG"].map((x) => (
            <i key={x}>{x}</i>
          ))}
        </div>
        <button>JOIN CALL</button>
        <div className="e2ee">● E2EE KEYS VERIFIED</div>
      </Panel>
      <Panel className="notifs">
        <small>SMART NOTIFICATIONS</small>
        {[
          ["MATCH IN 1 HOUR", "Map veto is open"],
          ["ROSTER APPROVED", "Team Alpha confirmed"],
          ["ACHIEVEMENT", "10 win streak unlocked"],
        ].map((x) => (
          <p key={x[0]}>
            <i>◆</i>
            <b>
              {x[0]}
              <span>{x[1]}</span>
            </b>
          </p>
        ))}
      </Panel>
    </div>
  </Shell>
);

const Analytics = () => {
  const f = useCurrentFrame();
  const pts = [70, 44, 55, 26, 38, 18, 8];
  return (
    <Shell active="statistics">
      <div className="analytics-page">
        <div className="page-head">
          <div>
            <Kicker>PERFORMANCE INTELLIGENCE</Kicker>
            <h3>Competitive Analytics</h3>
            <p>
              Performance, growth and rewards—connected to every verified match.
            </p>
          </div>
          <div className="game-select">VALORANT⌄</div>
        </div>
        <div className="stats-row four">
          <Stat label="WIN RATE" value="68%" />
          <Stat label="K/D RATIO" value="1.85" color="cyan" />
          <Stat label="AVG SCORE" value={284} />
          <Stat label="PRIZE EARNINGS" value="₹12.5K" color="cyan" />
        </div>
        <Panel className="line-chart">
          <small>RATING PROGRESSION</small>
          <strong>
            +18.4% <span>THIS SEASON</span>
          </strong>
          <svg viewBox="0 0 700 230" preserveAspectRatio="none">
            <defs>
              <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#8b5cf6" stopOpacity=".5" />
                <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              className="area"
              d="M0 190 C80 180 100 130 180 140 S280 95 350 110 S455 45 520 70 S620 35 700 20 L700 230 L0 230Z"
            />
            <path
              className="line"
              pathLength="1"
              style={{ strokeDashoffset: 1 - mix(f % 285, [20, 190], [0, 1]) }}
              d="M0 190 C80 180 100 130 180 140 S280 95 350 110 S455 45 520 70 S620 35 700 20"
            />
          </svg>
        </Panel>
        <Panel className="map-form">
          <small>MAP PERFORMANCE</small>
          {[
            ["ASCENT", 76],
            ["HAVEN", 64],
            ["SPLIT", 58],
            ["BIND", 71],
          ].map((x) => (
            <p key={x[0]}>
              <b>{x[0]}</b>
              <i>
                <em
                  style={{ width: `${mix(f % 285, [40, 160], [0, x[1]])}%` }}
                />
              </i>
              <span>{x[1]}%</span>
            </p>
          ))}
        </Panel>
        <Panel className="wallet-mini">
          <small>PRIZE WALLET</small>
          <strong>₹5,420</strong>
          <span>AVAILABLE BALANCE</span>
          <button>WITHDRAW VIA UPI</button>
          <p>
            Last payout <b>+ ₹1,000</b>
          </p>
        </Panel>
      </div>
    </Shell>
  );
};

const moduleViews = {
  overview: Overview,
  profile: Profile,
  tournaments: Tournaments,
  bracket: Bracket,
  teams: Teams,
  rankings: Rankings,
  comms: Comms,
  analytics: Analytics,
};
const ModuleWrapper = ({ module: m, View }) => {
  const f = useCurrentFrame();
  const e = spring({
    frame: f,
    fps: 30,
    config: { damping: 18, mass: 0.7 },
  });
  const out = mix(f, [m.duration - 25, m.duration], [1, 0]);
  return (
    <div
      className="module"
      style={{
        opacity: e * out,
        transform: `perspective(1800px) translateZ(${(1 - e) * -350}px) rotateX(${(1 - e) * 5}deg) scale(${0.91 + e * 0.09})`,
      }}
    >
      <div className="feature-copy">
        <Kicker>{m.eyebrow}</Kicker>
        <h2>{m.title}</h2>
        <p>{m.benefit}</p>
        <div>
          {m.chips.map((c) => (
            <span key={c}>✓ {c}</span>
          ))}
        </div>
      </div>
      <View />
      <div className="module-no">
        {String(modules.indexOf(m) + 1).padStart(2, "0")}
        <span>/08</span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill className="scene dashboard-scene">
      {modules.map((m) => {
        const View = moduleViews[m.type];
        return (
          <Sequence from={m.at} durationInFrames={m.duration} key={m.type} layout="none">
            <ModuleWrapper module={m} View={View} />
          </Sequence>
        );
      })}
      <div className="chapter-progress">
        <i style={{ width: `${mix(f, [0, 1893], [0, 100])}%` }} />
      </div>
    </AbsoluteFill>
  );
};

const FeatureShowcase = () => {
  const f = useCurrentFrame(),
    l = f;
  const bars = [55, 78, 66, 92, 74, 100, 86];
  return (
    <AbsoluteFill className="scene feature-showcase">
      <div className="organizer-copy">
        <Kicker>ORGANIZER CONTROL PLANE</Kicker>
        <h2>
          Run the arena.
          <br />
          <span>Not the busywork.</span>
        </h2>
        <p>
          Create tournaments, approve participants, automate seeding, verify
          matches, moderate reports and grow the community.
        </p>
        <div className="security-pills">
          <span>JWT SECURITY</span>
          <span>RATE LIMITING</span>
          <span>ANTI-CHEAT</span>
          <span>E2EE COMMS</span>
        </div>
      </div>
      <div className="admin-ui">
        <div className="admin-side">
          <Mark small />
          {[
            "Overview",
            "Tournaments",
            "Registrations",
            "Teams",
            "Players",
            "Reports",
            "Settings",
          ].map((x, i) => (
            <span className={i === 1 ? "active" : ""} key={x}>
              {x}
            </span>
          ))}
        </div>
        <div className="admin-main">
          <div className="admin-head">
            <div>
              <small>TOURNAMENT OPERATIONS</small>
              <h3>Organizer Command Center</h3>
            </div>
            <button>+ CREATE TOURNAMENT</button>
          </div>
          <div className="admin-stats">
            {[
              ["LIVE EVENTS", "12"],
              ["ACTIVE PLAYERS", "8,429"],
              ["VERIFIED MATCHES", "1,284"],
              ["CHECK-IN RATE", "96.8%"],
            ].map((x) => (
              <Panel key={x[0]}>
                <small>{x[0]}</small>
                <strong>{x[1]}</strong>
                <i>↗ 12.4%</i>
              </Panel>
            ))}
          </div>
          <div className="admin-panels">
            <Panel>
              <small>PARTICIPANT GROWTH</small>
              <div className="bars">
                {bars.map((h, i) => (
                  <i
                    key={i}
                    style={{
                      height: `${mix(l, [20 + i * 6, 90 + i * 6], [0, h])}%`,
                    }}
                  />
                ))}
              </div>
            </Panel>
            <Panel className="seed">
              <small>AUTOMATED SEEDING</small>
              {[
                "Team Alpha  2",
                "Velocity  1",
                "GodLike  2",
                "Reckoning  0",
              ].map((x) => (
                <span key={x}>{x}</span>
              ))}
              <button>GENERATE BRACKET</button>
            </Panel>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Ecosystem = () => {
  const f = useCurrentFrame(),
    l = f;
  const nodes = [
    ["PLAYER", "Identity + stats"],
    ["TEAM", "Roster + comms"],
    ["EVENT", "Bracket + matches"],
    ["ORGANIZER", "Control + growth"],
    ["RANK", "Verified results"],
    ["COMMUNITY", "Feed + rewards"],
  ];
  return (
    <AbsoluteFill className="scene ecosystem">
      <div className="eco-copy">
        <Kicker>ONE CONNECTED GRAPH</Kicker>
        <h2>
          Every action
          <br />
          <span>strengthens the ecosystem.</span>
        </h2>
        <p>
          A match updates rank. Rank shapes discovery. Discovery grows teams,
          tournaments and communities.
        </p>
      </div>
      <div className="network">
        <svg viewBox="0 0 800 700">
          {nodes.map((_, i) => {
            const a = (i * Math.PI * 2) / nodes.length,
              x = 400 + Math.cos(a) * 265,
              y = 350 + Math.sin(a) * 250;
            return (
              <line
                key={i}
                x1="400"
                y1="350"
                x2={x}
                y2={y}
                style={{
                  strokeDashoffset: mix(l, [i * 12, 120 + i * 12], [1, 0]),
                }}
              />
            );
          })}
        </svg>
        <div className="network-core">
          <Mark small />
        </div>
        {nodes.map((n, i) => {
          const a = (i * Math.PI * 2) / nodes.length,
            x = 50 + Math.cos(a) * 33,
            y = 50 + Math.sin(a) * 38;
          return (
            <Panel
              className="eco-node"
              key={n[0]}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                opacity: mix(l, [25 + i * 12, 65 + i * 12], [0, 1]),
              }}
            >
              <i>◆</i>
              <b>{n[0]}</b>
              <span>{n[1]}</span>
            </Panel>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const Compete = () => {
  const f = useCurrentFrame();
  const p = spring({ frame: f, fps: 30, config: { damping: 12 } });

  // 3D rotations based on frame progression
  const rotateX = mix(f, [0, 225], [6, -3]);
  const rotateY = mix(f, [0, 225], [-8, 6]);

  return (
    <AbsoluteFill className="scene compete-scene">
      <div className="words-bg">COMPETE</div>
      <div className="compete-layout">
        {/* Left Pane - Animated Tournament Bracket */}
        <div className="left-pane" style={{ transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${0.9 + p * 0.1})` }}>
          <div className="compete-card">
            <div>
              <Kicker>TOURNAMENTS & MATCH PROGRESSION</Kicker>
              <h2>RISE THROUGH THE BRACKETS</h2>
              <p>Climb the competitive ladders, register with a click, and track your match history automatically.</p>
            </div>
            
            <div className="bracket-tree">
              {/* SVG connection lines that light up in sync */}
              <svg className="bracket-svg" viewBox="0 0 460 300">
                <defs>
                  <linearGradient id="bracket-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                {/* Quarter to Semi lines */}
                <path d="M 120 70 L 150 70 L 150 115 L 180 115" className={f > 40 ? "active" : ""} />
                <path d="M 120 230 L 150 230 L 150 185 L 180 185" className={f > 60 ? "active" : ""} />
                {/* Semi to Final line */}
                <path d="M 300 150 L 350 150" className={f > 100 ? "active" : ""} />
              </svg>

              {/* Round 1: Quarterfinals */}
              <div className="bracket-round">
                <small>QUARTERS</small>
                <div className="bracket-match highlight" style={{ opacity: mix(f, [15, 45], [0, 1]) }}>
                  <div className="bracket-team win">
                    <span>Team Alpha</span>
                    <b>2</b>
                  </div>
                  <div className="bracket-team">
                    <span>Velocity Gaming</span>
                    <b>0</b>
                  </div>
                </div>
                <div className="bracket-match" style={{ opacity: mix(f, [35, 65], [0, 1]) }}>
                  <div className="bracket-team win">
                    <span>GodLike Esports</span>
                    <b>2</b>
                  </div>
                  <div className="bracket-team">
                    <span>Reckoning</span>
                    <b>1</b>
                  </div>
                </div>
              </div>

              {/* Round 2: Semifinals */}
              <div className="bracket-round">
                <small>SEMIS</small>
                <div className="bracket-match highlight" style={{ opacity: mix(f, [65, 95], [0, 1]) }}>
                  <div className="bracket-team win" style={{ opacity: mix(f, [105, 125], [0.5, 1]) }}>
                    <span>Team Alpha</span>
                    <b>{f > 115 ? "2" : "—"}</b>
                  </div>
                  <div className="bracket-team" style={{ opacity: mix(f, [85, 105], [0.5, 1]) }}>
                    <span>GodLike Esports</span>
                    <b>{f > 115 ? "1" : "—"}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane - Dynamic Leaderboard Ranking Up */}
        <div className="right-pane" style={{ transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${0.9 + p * 0.1})` }}>
          <div className="mini-leaderboard">
            {[
              { rank: 1, name: "JONATHAN", team: "GODLIKE ESPORTS", rp: "4,108 RP", delay: 10 },
              { rank: 2, name: "SlayerX", team: "TEAM ALPHA", rp: "3,842 RP", delay: 25 },
              { rank: 3, name: "Mortal", team: "SOUL ESPORTS", rp: "3,721 RP", delay: 40 },
            ].map((x) => (
              <div className="leaderboard-row" key={x.name} style={{ opacity: mix(f, [x.delay, x.delay + 20], [0, 1]) }}>
                <div className="rank">#{x.rank}</div>
                <div className="avatar">{x.name[0]}</div>
                <div className="info">
                  <div className="name">{x.name}</div>
                  <div className="team">{x.team}</div>
                </div>
                <div className="rp">{x.rp}</div>
              </div>
            ))}

            {/* User Row - Ranking Up Animation */}
            <div 
              className={`leaderboard-row ${f > 90 ? "highlight" : ""}`}
              style={{ 
                opacity: mix(f, [55, 75], [0, 1]),
                transform: f > 90 ? `scale(1.04) translateZ(10px)` : "scale(1)"
              }}
            >
              <div className="rank" style={{ color: f > 90 ? "#a855f7" : "" }}>#{f > 90 ? "4" : "5"}</div>
              <div className="avatar" style={{ background: f > 90 ? "linear-gradient(135deg, #a855f7, #6046e8)" : "" }}>AN</div>
              <div className="info">
                <div className="name">anandmohan</div>
                <div className="team">TEAM ALPHA · YOU</div>
              </div>
              <div className="rp">
                {f > 90 ? "3,635 RP" : "3,600 RP"}
                {f > 95 && <span style={{ opacity: mix(f, [95, 115], [0, 1]) }}>+35 RP WIN</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Connect = () => {
  const f = useCurrentFrame();
  const p = spring({ frame: f, fps: 30, config: { damping: 12 } });

  const rotateX = mix(f, [0, 232], [-5, 5]);
  const rotateY = mix(f, [0, 232], [8, -8]);

  return (
    <AbsoluteFill className="scene connect-scene">
      <div className="words-bg">CONNECT</div>
      <div className="connect-layout">
        {/* Left Pane - Squad Comms & Voice Activity */}
        <div className="left-pane" style={{ transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${0.9 + p * 0.1})` }}>
          <div className="connect-card">
            <div>
              <Kicker>SQUAD OPERATIONS & COMMS</Kicker>
              <h2>ALIGN WITH YOUR SQUAD</h2>
              <p>Encrypted text, smart game alerts, and low-latency voice chat keep the communications seamless.</p>
            </div>

            <div className="voice-grid">
              {[
                { name: "SentinelX", role: "CAPTAIN / IGL", initials: "SX", talking: true, delay: 10 },
                { name: "Slayer", role: "DUELIST", initials: "SL", talking: false, delay: 20 },
                { name: "KillerFF", role: "INITIATOR", initials: "KF", talking: false, delay: 30 },
                { name: "anandmohan", role: "DUELIST (YOU)", initials: "AN", talking: true, delay: 40 }
              ].map((x) => {
                const isTalking = x.talking && f > 50;
                return (
                  <div 
                    className={`voice-avatar ${isTalking ? "talking" : ""}`} 
                    key={x.name} 
                    style={{ opacity: mix(f, [x.delay, x.delay + 20], [0, 1]) }}
                  >
                    <div className="voice-circle">
                      <div className="circle-glow" />
                      <div className="initials">{x.initials}</div>
                    </div>
                    <b>{x.name}</b>
                    <span>{x.role}</span>
                    {isTalking && (
                      <div className="voice-waves">
                        {[0, 1, 2, 3, 4].map((i) => {
                          const waveH = 4 + Math.abs(Math.sin((f + i * 5) / 3)) * 14;
                          return <i key={i} style={{ height: `${waveH}px` }} />;
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Pane - Chat Messages slide in */}
        <div className="right-pane" style={{ transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${0.9 + p * 0.1})` }}>
          <div className="chat-pane">
            <div className="chat-pane-head">
              <b>#team-alpha</b>
              <span>● VOICE CHANNEL CONNECTED</span>
            </div>

            <div className="chat-pane-messages">
              {/* Message 1 */}
              {f > 25 && (
                <div className="chat-bubble-new">
                  <div className="avatar">SL</div>
                  <div className="content">
                    <div className="meta">
                      <span className="name">Slayer</span>
                      <span className="role">DUELIST</span>
                    </div>
                    <div className="text">Ready for the Ascent veto? Veto is active now.</div>
                  </div>
                </div>
              )}

              {/* Message 2 */}
              {f > 65 && (
                <div className="chat-bubble-new">
                  <div className="avatar">CR</div>
                  <div className="content">
                    <div className="meta">
                      <span className="name">COACH_RED</span>
                      <span className="role">COACH</span>
                    </div>
                    <div className="text">Veto starts in 5. Lock Ascent if open. otherwise split.</div>
                  </div>
                </div>
              )}

              {/* Message 3 */}
              {f > 105 && (
                <div className="chat-bubble-new mine">
                  <div className="avatar">AN</div>
                  <div className="content">
                    <div className="meta">
                      <span className="name">anandmohan</span>
                      <span className="role">YOU</span>
                    </div>
                    <div className="text">Ascent locked. Veto checked, we are ready! Let's go.</div>
                  </div>
                </div>
              )}
            </div>

            <div className="chat-pane-footer">
              Type message #team-alpha…
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Outro = () => {
  const f = useCurrentFrame();
  const l = f;
  const p = spring({ frame: l, fps: 30, config: { damping: 12 } });
  
  // Count up competitor numbers
  const count = Math.round(mix(l, [0, 80], [12840, 18429]));

  // Particle positions
  const numParticles = 30;
  const particleParams = Array.from({ length: numParticles }, (_, i) => {
    const angle = (i * Math.PI * 2) / numParticles;
    const speed = 2 + (i % 3) * 2;
    const delay = (i * 6) % 60;
    return { angle, speed, delay };
  });

  return (
    <AbsoluteFill className="scene outro">
      {/* Dynamic Starburst Particles */}
      <svg className="particle-svg" viewBox="0 0 1920 1080">
        {particleParams.map((part, i) => {
          const activeFrame = f - part.delay;
          if (activeFrame < 0 || activeFrame > 90) return null;
          const distance = activeFrame * part.speed;
          const opacity = mix(activeFrame, [0, 30, 90], [0, 0.7, 0]);
          const cx = 960 + Math.cos(part.angle) * distance;
          const cy = 540 + Math.sin(part.angle) * distance;
          const r = mix(activeFrame, [0, 90], [2, 5]);
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill={i % 2 ? "#a855f7" : "#06b6d4"}
              opacity={opacity}
            />
          );
        })}
      </svg>

      {/* Rotating Ring Atmosphere */}
      <div className="outro-rings">
        <i style={{ transform: `translate(-50%, -50%) rotate(${f * 0.4}deg)` }} />
        <i style={{ transform: `translate(-50%, -50%) rotate(${-f * 0.25}deg)` }} />
        <i style={{ transform: `translate(-50%, -50%) rotate(${f * 0.15}deg)` }} />
      </div>

      <div className="outro-lock" style={{ opacity: p, transform: `scale(${0.78 + p * 0.22})` }}>
        {/* Rotating 3D-effect Logo Emblem */}
        <div 
          className="brand-emblem"
          style={{
            transform: `perspective(800px) rotateY(${f * 1.5}deg) rotateX(${Math.sin(f/15) * 10}deg)`
          }}
        >
          S
        </div>
        
        <Mark />
        <h2>CONQUER the Arena.</h2>
        <p>
          <b>{count.toLocaleString("en-US")}</b> competitors—and rising.
        </p>

        {/* Highlighted Pillars synchronized with voice beats */}
        <div className="outro-pillars">
          <div className={`outro-pillar compete ${f >= 30 ? "show" : ""} ${f >= 30 && f < 90 ? "highlight" : ""}`}>
            <b>COMPETE</b>
            <span>Tournaments & ladders</span>
          </div>
          <div className={`outro-pillar connect ${f >= 80 ? "show" : ""} ${f >= 80 && f < 140 ? "highlight" : ""}`}>
            <b>CONNECT</b>
            <span>Squad voice & chat comms</span>
          </div>
          <div className={`outro-pillar conquer ${f >= 130 ? "show" : ""} ${f >= 130 ? "highlight" : ""}`}>
            <b>CONQUER</b>
            <span>Prizes & verified history</span>
          </div>
        </div>

        <div className="cta" style={{ opacity: mix(f, [140, 160], [0, 1]), transform: `translateY(${mix(f, [140, 160], [20, 0])}px)` }}>
          JOIN THE FUTURE OF COMPETITIVE GAMING <span>→</span>
        </div>
        <small style={{ opacity: mix(f, [150, 170], [0, 0.6]) }}>STAGECORE.GG</small>
      </div>
    </AbsoluteFill>
  );
};

const Sound = ({ soundtrack, narration }) => (
  <>
    {soundtrack && (
      <Audio
        src={staticFile("video/audio/stagecore-soundscape.wav")}
        volume={0.2}
      />
    )}{" "}
    {narration &&
      narrationStarts.map((at, i) => (
        <Sequence from={at} key={i}>
          <Audio
            src={staticFile(
              `video/audio/narration-${String(i + 1).padStart(2, "0")}.wav`,
            )}
            volume={1}
          />
        </Sequence>
      ))}
  </>
);
export const StageCorePromo = ({ soundtrack = true, narration = true }) => (
  <AbsoluteFill className="video">
    <Atmosphere />
    <Sequence from={0} durationInFrames={324}>
      <Problem />
    </Sequence>
    <Sequence from={324} durationInFrames={208}>
      <Intro />
    </Sequence>
    <Sequence from={532} durationInFrames={1893}>
      <Dashboard />
    </Sequence>
    <Sequence from={2425} durationInFrames={165}>
      <FeatureShowcase />
    </Sequence>
    <Sequence from={2590} durationInFrames={227}>
      <Ecosystem />
    </Sequence>
    <Sequence from={2817} durationInFrames={225}>
      <Compete />
    </Sequence>
    <Sequence from={3042} durationInFrames={232}>
      <Connect />
    </Sequence>
    <Sequence from={3274} durationInFrames={326}>
      <Outro />
    </Sequence>
    <Sound soundtrack={soundtrack} narration={narration} />
    <div className="safe-frame" />
  </AbsoluteFill>
);
