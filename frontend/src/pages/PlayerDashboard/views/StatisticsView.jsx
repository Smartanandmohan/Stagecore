import React, { useState, useEffect, useCallback } from 'react';
import { TrendingUp, Crosshair, Award, Zap, Target, Compass, BarChart3, Clock, Swords } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

// Helper: read and parse JSON from localStorage safely
const readLocalStorage = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

// Helper: write JSON to localStorage
const writeLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or unavailable – silently ignore
  }
};

// Generate recent date labels relative to today
const generateDateLabels = (count = 5) => {
  const labels = [];
  const now = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i * 3);
    labels.push(d.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }));
  }
  return labels;
};

// Map a numeric value within [minVal, maxVal] to a Y position within [yTop, yBottom]
const mapToY = (value, minVal, maxVal, yTop = 20, yBottom = 130) => {
  if (maxVal === minVal) return (yTop + yBottom) / 2;
  return yBottom - ((value - minVal) / (maxVal - minVal)) * (yBottom - yTop);
};

// Build SVG path + dots from an array of numeric values
const buildGraphData = (values) => {
  const xPositions = [30, 85, 120, 200, 280];
  const padding = 10;
  const minVal = Math.min(...values) - padding;
  const maxVal = Math.max(...values) + padding;

  const coords = values.map((v, i) => ({
    x: xPositions[i],
    y: Math.round(mapToY(v, minVal, maxVal)),
    label: String(Math.round(v)),
  }));

  // Build a smooth quadratic-bezier path through the points
  let points = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 1; i < coords.length; i++) {
    const prev = coords[i - 1];
    const cur = coords[i];
    const cpx = (prev.x + cur.x) / 2;
    points += ` Q ${cpx} ${prev.y} ${cur.x} ${cur.y}`;
  }

  const last = coords[coords.length - 1];
  const area = `${points} L ${last.x} 130 L ${coords[0].x} 130 Z`;

  const dots = coords.map((c) => ({ cx: c.x, cy: c.y, label: c.label }));

  return { points, area, dots };
};

// Derive a pseudo-random but deterministic series of 5 values around a center
const deriveVarianceSeries = (center, spread = 0.2, seed = 0) => {
  const offsets = [
    -0.35 + (seed % 7) * 0.02,
    -0.12 + (seed % 5) * 0.015,
    0,
    0.08 - (seed % 3) * 0.01,
    0.25 + (seed % 4) * 0.02,
  ];
  return offsets.map((o) => center * (1 + o * spread * 2));
};

export const StatisticsView = () => {
  const { user } = useAuth();
  const [selectedGame, setSelectedGame] = useState('Valorant');
  const [userStats, setUserStats] = useState(null);

  // Reads user_stats from localStorage and recomputes game stats
  const loadStats = useCallback(() => {
    const stats = readLocalStorage('user_stats');
    setUserStats(stats);
  }, []);

  // Initial load + listen for storage changes from other tabs
  useEffect(() => {
    loadStats();

    const handleStorage = (e) => {
      if (e.key === 'user_stats') {
        loadStats();
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [loadStats]);

  // ---- Derive dynamic values from userStats (with sensible fallbacks) ----
  const matchesPlayed = userStats?.matchesPlayed ?? 0;
  const matchesWon = userStats?.matchesWon ?? 0;
  const winRate = userStats?.winRate ?? (matchesPlayed > 0 ? Math.round((matchesWon / matchesPlayed) * 100) : 0);
  const kdRatio = userStats?.kdRatio ?? 0;

  // Compute derivative stats from base stats
  const headshotPct = Math.min(99, Math.max(5, Math.round(kdRatio * 18.5))).toFixed(1);
  const avgCombatScore = Math.round(120 + kdRatio * 68 + winRate * 0.5);
  const avgDamagePerRound = (60 + kdRatio * 17.5 + winRate * 0.15).toFixed(1);
  const avgDamageHp = Math.round(400 + kdRatio * 102 + winRate * 2.5);
  const top10Rate = Math.min(99, Math.round(winRate * 1.15 + 5));
  const fdRatio = (kdRatio * 2.2).toFixed(2);

  // Build dynamic game stats using computed values
  const gameStats = {
    Valorant: {
      overview: [
        { label: 'K/D Ratio', value: kdRatio > 0 ? kdRatio.toFixed(2) : '1.85', desc: 'Average Kill/Death', icon: Swords, color: 'text-pink-500 bg-pink-500/10' },
        { label: 'Win Rate', value: winRate > 0 ? `${winRate}%` : '68%', desc: 'Matches Won', icon: Target, color: 'text-gaming-blue bg-gaming-blue/10' },
        { label: 'Headshot %', value: kdRatio > 0 ? `${headshotPct}%` : '34.2%', desc: 'Accuracy rate', icon: Crosshair, color: 'text-gaming-purple bg-gaming-purple/10' },
        { label: 'Avg Combat Score', value: kdRatio > 0 ? String(avgCombatScore) : '245', desc: 'ACS Rating', icon: Zap, color: 'text-amber-500 bg-amber-500/10' }
      ],
      graphLabel: 'Average Combat Score (ACS) variance',
      graphData: kdRatio > 0
        ? buildGraphData(deriveVarianceSeries(avgCombatScore, 0.18, 1))
        : {
            points: 'M 30 90 Q 80 50 120 40 T 200 80 T 280 20',
            area: 'M 30 90 Q 80 50 120 40 T 200 80 T 280 20 L 280 130 L 30 130 Z',
            dots: [
              { cx: 30, cy: 90, label: '180' },
              { cx: 85, cy: 55, label: '210' },
              { cx: 120, cy: 40, label: '245' },
              { cx: 200, cy: 80, label: '195' },
              { cx: 280, cy: 20, label: '265' }
            ]
          },
      weapons: [
        { name: 'Vandal', hsRate: kdRatio > 0 ? `${Math.round(parseFloat(headshotPct) * 1.23)}%` : '42%', kills: `${kdRatio > 0 ? Math.round(matchesPlayed * kdRatio * 2.1) : 980} Kills`, progress: kdRatio > 0 ? Math.round(parseFloat(headshotPct) * 1.23) : 42, icon: '🔫' },
        { name: 'Phantom', hsRate: kdRatio > 0 ? `${Math.round(parseFloat(headshotPct) * 1.02)}%` : '35%', kills: `${kdRatio > 0 ? Math.round(matchesPlayed * kdRatio * 1.4) : 650} Kills`, progress: kdRatio > 0 ? Math.round(parseFloat(headshotPct) * 1.02) : 35, icon: '🔫' },
        { name: 'Operator', hsRate: kdRatio > 0 ? `${Math.min(99, Math.round(winRate * 1.2))}% Acc` : '82% Acc', kills: `${kdRatio > 0 ? Math.round(matchesPlayed * kdRatio * 0.9) : 420} Kills`, progress: kdRatio > 0 ? Math.min(99, Math.round(winRate * 1.2)) : 82, icon: '🎯' },
        { name: 'Sheriff', hsRate: kdRatio > 0 ? `${Math.round(parseFloat(headshotPct) * 1.4)}%` : '48%', kills: `${kdRatio > 0 ? Math.round(matchesPlayed * kdRatio * 0.45) : 210} Kills`, progress: kdRatio > 0 ? Math.round(parseFloat(headshotPct) * 1.4) : 48, icon: '🔫' }
      ],
      maps: [
        { name: 'Ascent', winRate: `${kdRatio > 0 ? Math.min(99, winRate + 4) : 72}%`, matches: `${kdRatio > 0 ? Math.round(matchesPlayed * 0.28) : 18} Played`, progress: kdRatio > 0 ? Math.min(99, winRate + 4) : 72 },
        { name: 'Bind', winRate: `${kdRatio > 0 ? Math.max(10, winRate - 10) : 58}%`, matches: `${kdRatio > 0 ? Math.round(matchesPlayed * 0.23) : 15} Played`, progress: kdRatio > 0 ? Math.max(10, winRate - 10) : 58 },
        { name: 'Haven', winRate: `${kdRatio > 0 ? Math.max(10, winRate - 4) : 64}%`, matches: `${kdRatio > 0 ? Math.round(matchesPlayed * 0.34) : 22} Played`, progress: kdRatio > 0 ? Math.max(10, winRate - 4) : 64 },
        { name: 'Split', winRate: `${kdRatio > 0 ? Math.max(10, winRate - 23) : 45}%`, matches: `${kdRatio > 0 ? Math.round(matchesPlayed * 0.17) : 11} Played`, progress: kdRatio > 0 ? Math.max(10, winRate - 23) : 45 }
      ]
    },
    BGMI: {
      overview: [
        { label: 'F/D Ratio (K/D)', value: kdRatio > 0 ? fdRatio : '4.12', desc: 'Average Finishes/Deaths', icon: Swords, color: 'text-pink-500 bg-pink-500/10' },
        { label: 'Win Rate', value: winRate > 0 ? `${Math.min(99, winRate + 4)}%` : '72%', desc: 'Chicken Dinners', icon: Target, color: 'text-gaming-blue bg-gaming-blue/10' },
        { label: 'Top 10 Rate', value: kdRatio > 0 ? `${top10Rate}%` : '85%', desc: 'Top 10 placement', icon: Award, color: 'text-gaming-purple bg-gaming-purple/10' },
        { label: 'Avg Damage', value: kdRatio > 0 ? `${avgDamageHp} HP` : '820 HP', desc: 'Damage per match', icon: Zap, color: 'text-amber-500 bg-amber-500/10' }
      ],
      graphLabel: 'Total Finishes variance',
      graphData: kdRatio > 0
        ? buildGraphData(deriveVarianceSeries(parseFloat(fdRatio) * 2.1, 0.25, 3))
        : {
            points: 'M 30 110 Q 80 80 120 50 T 200 40 T 280 60',
            area: 'M 30 110 Q 80 80 120 50 T 200 40 T 280 60 L 280 130 L 30 130 Z',
            dots: [
              { cx: 30, cy: 110, label: '3' },
              { cx: 85, cy: 80, label: '5' },
              { cx: 120, cy: 50, label: '8' },
              { cx: 200, cy: 40, label: '9' },
              { cx: 280, cy: 60, label: '7' }
            ]
          },
      weapons: [
        { name: 'M416', hsRate: kdRatio > 0 ? `${Math.round(parseFloat(headshotPct) * 1.02)}% Acc` : '35% Acc', kills: `${kdRatio > 0 ? Math.round(matchesPlayed * kdRatio * 1.8) : 840} Kills`, progress: kdRatio > 0 ? Math.round(parseFloat(headshotPct) * 1.02) : 35, icon: '🔫' },
        { name: 'AWM', hsRate: kdRatio > 0 ? `${Math.min(99, Math.round(winRate * 1.3))}% Acc` : '92% Acc', kills: `${kdRatio > 0 ? Math.round(matchesPlayed * kdRatio * 0.38) : 180} Kills`, progress: kdRatio > 0 ? Math.min(99, Math.round(winRate * 1.3)) : 92, icon: '🎯' },
        { name: 'AKM', hsRate: kdRatio > 0 ? `${Math.round(parseFloat(headshotPct) * 0.82)}% Acc` : '28% Acc', kills: `${kdRatio > 0 ? Math.round(matchesPlayed * kdRatio * 0.88) : 410} Kills`, progress: kdRatio > 0 ? Math.round(parseFloat(headshotPct) * 0.82) : 28, icon: '🔫' },
        { name: 'DP-28', hsRate: kdRatio > 0 ? `${Math.round(parseFloat(headshotPct) * 0.88)}% Acc` : '30% Acc', kills: `${kdRatio > 0 ? Math.round(matchesPlayed * kdRatio * 0.47) : 220} Kills`, progress: kdRatio > 0 ? Math.round(parseFloat(headshotPct) * 0.88) : 30, icon: '🔫' }
      ],
      maps: [
        { name: 'Erangel', winRate: `${kdRatio > 0 ? Math.min(99, winRate + 10) : 78}%`, matches: `${kdRatio > 0 ? Math.round(matchesPlayed * 0.37) : 25} Played`, progress: kdRatio > 0 ? Math.min(99, winRate + 10) : 78 },
        { name: 'Miramar', winRate: `${kdRatio > 0 ? Math.max(10, winRate - 4) : 64}%`, matches: `${kdRatio > 0 ? Math.round(matchesPlayed * 0.26) : 18} Played`, progress: kdRatio > 0 ? Math.max(10, winRate - 4) : 64 },
        { name: 'Sanhok', winRate: `${kdRatio > 0 ? Math.max(10, winRate - 16) : 52}%`, matches: `${kdRatio > 0 ? Math.round(matchesPlayed * 0.22) : 15} Played`, progress: kdRatio > 0 ? Math.max(10, winRate - 16) : 52 },
        { name: 'Vikendi', winRate: `${kdRatio > 0 ? Math.max(10, winRate - 23) : 45}%`, matches: `${kdRatio > 0 ? Math.round(matchesPlayed * 0.15) : 10} Played`, progress: kdRatio > 0 ? Math.max(10, winRate - 23) : 45 }
      ]
    },
    CS2: {
      overview: [
        { label: 'K/D Ratio', value: kdRatio > 0 ? (kdRatio * 0.88).toFixed(2) : '1.62', desc: 'Kill/Death Index', icon: Swords, color: 'text-pink-500 bg-pink-500/10' },
        { label: 'Win Rate', value: winRate > 0 ? `${Math.max(10, winRate - 8)}%` : '60%', desc: 'Competitions Won', icon: Target, color: 'text-gaming-blue bg-gaming-blue/10' },
        { label: 'Headshot %', value: kdRatio > 0 ? `${Math.min(99, (parseFloat(headshotPct) * 1.53)).toFixed(1)}%` : '52.4%', desc: 'HS Accuracy', icon: Crosshair, color: 'text-gaming-purple bg-gaming-purple/10' },
        { label: 'Avg Damage (ADR)', value: kdRatio > 0 ? avgDamagePerRound : '88.5', desc: 'Damage per round', icon: Zap, color: 'text-amber-500 bg-amber-500/10' }
      ],
      graphLabel: 'Average Damage per Round (ADR) variance',
      graphData: kdRatio > 0
        ? buildGraphData(deriveVarianceSeries(parseFloat(avgDamagePerRound), 0.12, 7))
        : {
            points: 'M 30 80 Q 80 90 120 70 T 200 40 T 280 30',
            area: 'M 30 80 Q 80 90 120 70 T 200 40 T 280 30 L 280 130 L 30 130 Z',
            dots: [
              { cx: 30, cy: 80, label: '78' },
              { cx: 85, cy: 90, label: '74' },
              { cx: 120, cy: 70, label: '82' },
              { cx: 200, cy: 40, label: '95' },
              { cx: 280, cy: 30, label: '98' }
            ]
          },
      weapons: [
        { name: 'AK-47', hsRate: kdRatio > 0 ? `${Math.min(99, Math.round(parseFloat(headshotPct) * 1.58))}%` : '54%', kills: `${kdRatio > 0 ? Math.round(matchesPlayed * kdRatio * 1.55) : 720} Kills`, progress: kdRatio > 0 ? Math.min(99, Math.round(parseFloat(headshotPct) * 1.58)) : 54, icon: '🔫' },
        { name: 'M4A4', hsRate: kdRatio > 0 ? `${Math.min(99, Math.round(parseFloat(headshotPct) * 1.4))}%` : '48%', kills: `${kdRatio > 0 ? Math.round(matchesPlayed * kdRatio * 0.97) : 450} Kills`, progress: kdRatio > 0 ? Math.min(99, Math.round(parseFloat(headshotPct) * 1.4)) : 48, icon: '🔫' },
        { name: 'AWP', hsRate: kdRatio > 0 ? `${Math.min(99, Math.round(winRate * 1.25))}% Acc` : '85% Acc', kills: `${kdRatio > 0 ? Math.round(matchesPlayed * kdRatio * 0.54) : 250} Kills`, progress: kdRatio > 0 ? Math.min(99, Math.round(winRate * 1.25)) : 85, icon: '🎯' },
        { name: 'Desert Eagle', hsRate: kdRatio > 0 ? `${Math.min(99, Math.round(parseFloat(headshotPct) * 1.75))}%` : '60%', kills: `${kdRatio > 0 ? Math.round(matchesPlayed * kdRatio * 0.22) : 100} Kills`, progress: kdRatio > 0 ? Math.min(99, Math.round(parseFloat(headshotPct) * 1.75)) : 60, icon: '🔫' }
      ],
      maps: [
        { name: 'Mirage', winRate: `${kdRatio > 0 ? winRate : 68}%`, matches: `${kdRatio > 0 ? Math.round(matchesPlayed * 0.3) : 20} Played`, progress: kdRatio > 0 ? winRate : 68 },
        { name: 'Inferno', winRate: `${kdRatio > 0 ? Math.max(10, winRate - 13) : 55}%`, matches: `${kdRatio > 0 ? Math.round(matchesPlayed * 0.24) : 16} Played`, progress: kdRatio > 0 ? Math.max(10, winRate - 13) : 55 },
        { name: 'Nuke', winRate: `${kdRatio > 0 ? Math.max(10, winRate - 18) : 50}%`, matches: `${kdRatio > 0 ? Math.round(matchesPlayed * 0.18) : 12} Played`, progress: kdRatio > 0 ? Math.max(10, winRate - 18) : 50 },
        { name: 'Overpass', winRate: `${kdRatio > 0 ? Math.max(10, winRate - 6) : 62}%`, matches: `${kdRatio > 0 ? Math.round(matchesPlayed * 0.22) : 15} Played`, progress: kdRatio > 0 ? Math.max(10, winRate - 6) : 62 }
      ]
    }
  };

  // Cache computed game stats to localStorage whenever they change
  useEffect(() => {
    writeLocalStorage('stagecore_game_stats', {
      selectedGame,
      computedAt: new Date().toISOString(),
      stats: gameStats,
    });
  }, [selectedGame, userStats]);

  // Generate dynamic date labels
  const dateLabels = generateDateLabels(5);

  const activeStats = gameStats[selectedGame] || gameStats.Valorant;

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <BarChart3 className="text-gaming-purple" size={24} />
            Competitive Statistics
          </h1>
          <p className="text-xs text-gray-400 font-semibold tracking-wider mt-1">
            Track performance metrics, weapon headshot rates, and maps statistics by title.
          </p>
        </div>

        {/* Game filter toolbar */}
        <div className="flex bg-[#03050f] border border-white/5 rounded-xl p-1 w-fit font-bold text-[10px] tracking-wider uppercase">
          {['Valorant', 'BGMI', 'CS2'].map(game => (
            <button
              key={game}
              onClick={() => setSelectedGame(game)}
              className={`px-5 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedGame === game ? 'bg-gaming-purple text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              {game}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {activeStats.overview.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glass-panel p-4 rounded-xl border border-white/5 bg-[#03050f]/60 flex items-center justify-between">
              <div>
                <span className="text-[9px] text-gray-500 uppercase font-black block">{stat.label}</span>
                <span className="text-xl font-black text-white mt-1 block">{stat.value}</span>
                <span className="text-[8px] text-gray-400 font-semibold block mt-0.5">{stat.desc}</span>
              </div>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.color}`}>
                <Icon size={16} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom detailed analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Performance Chart Variance Graph (2 columns) */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-white/5 bg-[#03050f]/60 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp size={14} className="text-gaming-purple" />
              Match Performance Curve
            </h3>
            <p className="text-[10px] text-gray-500 font-semibold">{activeStats.graphLabel}</p>
          </div>

          <div className="flex-1 min-h-[220px] flex items-center justify-center mt-6">
            <svg viewBox="0 0 300 150" className="w-full h-full">
              <defs>
                <linearGradient id="statsCurveGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Grid Lines */}
              <line x1="30" y1="20" x2="280" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
              <line x1="30" y1="60" x2="280" y2="60" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
              <line x1="30" y1="100" x2="280" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
              <line x1="30" y1="130" x2="280" y2="130" stroke="rgba(255,255,255,0.1)" />

              {/* Area & Line */}
              <path d={activeStats.graphData.area} fill="url(#statsCurveGrad)" />
              <path d={activeStats.graphData.points} fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" />

              {/* Dots and Tooltips */}
              {activeStats.graphData.dots.map((dot, index) => (
                <g key={index}>
                  <circle cx={dot.cx} cy={dot.cy} r="3.5" fill="#a855f7" stroke="#050816" strokeWidth="1.5" />
                  <text x={dot.cx} y={dot.cy - 7} fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle" className="font-mono bg-black/60 px-1 rounded">
                    {dot.label}
                  </text>
                </g>
              ))}

              {/* Dates */}
              <text x="25" y="142" fill="#6b7280" fontSize="7" fontWeight="bold">{dateLabels[0]}</text>
              <text x="80" y="142" fill="#6b7280" fontSize="7" fontWeight="bold">{dateLabels[1]}</text>
              <text x="115" y="142" fill="#6b7280" fontSize="7" fontWeight="bold">{dateLabels[2]}</text>
              <text x="195" y="142" fill="#6b7280" fontSize="7" fontWeight="bold">{dateLabels[3]}</text>
              <text x="270" y="142" fill="#6b7280" fontSize="7" fontWeight="bold">{dateLabels[4]}</text>
            </svg>
          </div>
        </div>

        {/* Weapon Performance Details (1 column) */}
        <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-[#03050f]/60 space-y-4">
          <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
            <Crosshair size={14} className="text-gaming-purple" />
            Weapon Accuracy
          </h3>
          
          <div className="space-y-3.5">
            {activeStats.weapons.map((w, idx) => (
              <div key={idx} className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-white flex items-center gap-1">
                    <span>{w.icon}</span> {w.name}
                  </span>
                  <span className="text-gray-500 font-bold">{w.hsRate} HS • {w.kills}</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gaming-purple rounded-full" style={{ width: `${w.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Map Stats Section */}
      <div className="space-y-4">
        <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
          <Compass size={14} className="text-gaming-purple" />
          Map Win Rates
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeStats.maps.map((map, idx) => (
            <div key={idx} className="glass-panel p-4 rounded-xl border border-white/5 bg-[#03050f]/30 space-y-3">
              <div className="flex justify-between items-start text-xs">
                <div>
                  <span className="font-extrabold text-white block uppercase tracking-wide">{map.name}</span>
                  <span className="text-[9px] text-gray-500 block font-semibold mt-0.5">{map.matches}</span>
                </div>
                <span className="text-[11px] font-black text-gaming-blue font-mono">{map.winRate} WR</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gaming-blue rounded-full" style={{ width: `${map.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
