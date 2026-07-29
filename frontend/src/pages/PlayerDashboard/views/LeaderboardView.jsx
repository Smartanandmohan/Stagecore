import React, { useState, useEffect } from 'react';
import { BarChart3, Trophy, Users, Award, Shield, Check } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const LEADERBOARD_STORAGE_KEY = 'stagecore_leaderboard_data';

const DEFAULT_PLAYERS = [
  { rank: 1, ign: 'Mortal_Pro', team: 'Soul Esports', kd: '2.45', winRate: '78%', score: '3,850 RP', badge: '👑', isMe: false },
  { rank: 2, ign: 'JONATHAN', team: 'GodLike Esports', kd: '2.32', winRate: '74%', score: '3,720 RP', badge: '🥈', isMe: false },
  { rank: 3, ign: 'AnandYT', team: 'Team Alpha', kd: '1.85', winRate: '68%', score: '3,450 RP', badge: '🥉', isMe: true },
  { rank: 4, ign: 'SentinelX', team: 'Team Alpha', kd: '1.92', winRate: '71%', score: '3,380 RP', isMe: false },
  { rank: 5, ign: 'Xeno_Rider', team: 'Sentinels Pro', kd: '1.81', winRate: '66%', score: '3,210 RP', isMe: false },
  { rank: 6, ign: 'Slayer_99', team: 'Fnatic Rising', kd: '1.78', winRate: '64%', score: '3,100 RP', isMe: false },
  { rank: 7, ign: 'KillerFF', team: 'Team Alpha', kd: '1.72', winRate: '63%', score: '2,980 RP', isMe: false },
  { rank: 8, ign: 'Viper_Ace', team: 'Global Esports', kd: '1.68', winRate: '60%', score: '2,890 RP', isMe: false }
];

const DEFAULT_TEAMS = [
  { rank: 1, name: 'Soul Esports', matches: 150, wins: 112, winRate: '75%', points: '4,500 PTS', isMyTeam: false },
  { rank: 2, name: 'GodLike Esports', matches: 142, wins: 102, winRate: '72%', points: '4,280 PTS', isMyTeam: false },
  { rank: 3, name: 'Team Alpha', matches: 125, wins: 85, winRate: '68%', points: '3,920 PTS', isMyTeam: true },
  { rank: 4, name: 'Sentinels Pro', matches: 130, wins: 82, winRate: '63%', points: '3,650 PTS', isMyTeam: false },
  { rank: 5, name: 'Global Esports', matches: 118, wins: 70, winRate: '59%', points: '3,200 PTS', isMyTeam: false }
];

const DEFAULT_MVPS = [
  { rank: 1, ign: 'JONATHAN', team: 'GodLike Esports', mvpCount: 28, tournament: 'BGMI Masters Pro Series', isMe: false },
  { rank: 2, ign: 'Mortal_Pro', team: 'Soul Esports', mvpCount: 24, tournament: 'StageCore Valorant Showdown 2026', isMe: false },
  { rank: 3, ign: 'AnandYT', team: 'Team Alpha', mvpCount: 19, tournament: 'CS2 Invitational Cup', isMe: true },
  { rank: 4, ign: 'Xeno_Rider', team: 'Sentinels Pro', mvpCount: 16, tournament: 'Apex Legends Championship', isMe: false }
];

const loadFromStorage = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save leaderboard data:', e);
  }
};

export const LeaderboardView = () => {
  const { user: authUser } = useAuth();
  const [activeTab, setActiveTab] = useState('players'); // players, teams, mvps
  const [regionFilter, setRegionFilter] = useState('GLOBAL'); // GLOBAL, REGIONAL

  // Load leaderboard data from localStorage or use defaults
  const [leaderboardData, setLeaderboardData] = useState(() => {
    const saved = loadFromStorage(LEADERBOARD_STORAGE_KEY, null);
    if (saved) return saved;
    const initial = {
      players: DEFAULT_PLAYERS,
      teams: DEFAULT_TEAMS,
      mvps: DEFAULT_MVPS,
    };
    saveToStorage(LEADERBOARD_STORAGE_KEY, initial);
    return initial;
  });

  // Read dynamic data from localStorage and build display lists
  const buildDisplayData = () => {
    const userStats = loadFromStorage('user_stats', null);
    const userTeamData = loadFromStorage('stagecore_user_team', null);
    const storedUser = loadFromStorage('user', null);

    const currentUsername = authUser?.username || storedUser?.username || 'AnandYT';
    const currentTeamName = userTeamData?.name || userTeamData?.teamName || null;

    // Build players list with dynamic user row
    let players = leaderboardData.players.map(p => {
      if (p.ign === 'AnandYT' || p.ign === currentUsername) {
        return {
          ...p,
          ign: currentUsername,
          team: currentTeamName || p.team,
          kd: userStats?.kd || userStats?.kdRatio || p.kd,
          winRate: userStats?.winRate ? (typeof userStats.winRate === 'number' ? `${userStats.winRate}%` : userStats.winRate) : p.winRate,
          score: userStats?.score || userStats?.ratingPoints ? `${userStats.ratingPoints || userStats.score} RP` : p.score,
          isMe: true,
        };
      }
      return { ...p, isMe: false };
    });

    // Build teams list with dynamic user team
    let teams = leaderboardData.teams.map(t => {
      const isMyTeam = currentTeamName && t.name === currentTeamName;
      return { ...t, isMyTeam: isMyTeam || false };
    });
    // If user has a team and it's not in the list, mark Team Alpha as theirs (fallback)
    if (!teams.some(t => t.isMyTeam)) {
      teams = teams.map(t => {
        if (t.name === 'Team Alpha') {
          return { ...t, isMyTeam: true, name: currentTeamName || t.name };
        }
        return t;
      });
    }

    // Build MVP list with dynamic user row
    let mvps = leaderboardData.mvps.map(m => {
      if (m.ign === 'AnandYT' || m.ign === currentUsername) {
        return { ...m, ign: currentUsername, isMe: true };
      }
      return { ...m, isMe: false };
    });

    return { players, teams, mvps };
  };

  const [displayData, setDisplayData] = useState(() => buildDisplayData());

  // Re-derive display data when leaderboard or auth changes
  useEffect(() => {
    setDisplayData(buildDisplayData());
  }, [leaderboardData, authUser]);

  // Persist leaderboard data whenever it changes
  useEffect(() => {
    saveToStorage(LEADERBOARD_STORAGE_KEY, leaderboardData);
  }, [leaderboardData]);

  // Listen for storage events (changes from other tabs or other components)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === LEADERBOARD_STORAGE_KEY) {
        const newData = loadFromStorage(LEADERBOARD_STORAGE_KEY, null);
        if (newData) setLeaderboardData(newData);
      }
      // Re-derive display data if dependent keys change
      if (e.key === 'user_stats' || e.key === 'stagecore_user_team' || e.key === 'user') {
        setDisplayData(buildDisplayData());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [leaderboardData]);

  // Apply region filter and re-rank
  const applyRegionFilter = (list) => {
    let filtered = list;
    if (regionFilter === 'REGIONAL') {
      filtered = list.filter(item => item.region === 'IN');
    }
    return filtered.map((item, idx) => ({ ...item, rank: idx + 1 }));
  };

  const topPlayers = applyRegionFilter(displayData.players);
  const topTeams = applyRegionFilter(displayData.teams);
  const mvpStandings = applyRegionFilter(displayData.mvps);

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <BarChart3 className="text-gaming-purple" size={24} />
            Leaderboard Standings
          </h1>
          <p className="text-xs text-gray-400 font-semibold tracking-wider mt-1">
            Global ranking system of elite players, teams, and MVP MVP awards.
          </p>
        </div>
        
        {/* Region filter toggle */}
        <div className="flex bg-[#03050f] border border-white/5 rounded-xl p-1 w-fit font-bold text-[10px] tracking-wider uppercase">
          <button
            onClick={() => setRegionFilter('GLOBAL')}
            className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
              regionFilter === 'GLOBAL' ? 'bg-gaming-purple text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Global Ranking
          </button>
          <button
            onClick={() => setRegionFilter('REGIONAL')}
            className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
              regionFilter === 'REGIONAL' ? 'bg-gaming-purple text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Regional Ranking
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5">
        {[
          { id: 'players', label: 'Top Players', icon: Trophy },
          { id: 'teams', label: 'Top Teams', icon: Users },
          { id: 'mvps', label: 'MVP Players', icon: Award }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 text-xs uppercase tracking-wider font-extrabold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === tab.id ? 'border-gaming-purple text-white bg-gaming-purple/5' : 'border-transparent text-gray-500 hover:text-white'
            }`}
          >
            <tab.icon size={13} className={activeTab === tab.id ? 'text-gaming-purple' : 'text-gray-500'} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* RENDER ACTIVE STANDINGS */}
      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        {activeTab === 'players' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5 text-gray-400 font-extrabold uppercase tracking-widest text-[9px] bg-white/[0.01]">
                  <th className="px-5 py-4 w-20">Rank</th>
                  <th className="px-5 py-4">Player IGN</th>
                  <th className="px-5 py-4">Linked Team</th>
                  <th className="px-5 py-4">Game</th>
                  <th className="px-5 py-4 text-center">Score Rating</th>
                  <th className="px-5 py-4 text-center">Win Rate</th>
                  <th className="px-5 py-4 text-right">K/D</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300 font-medium">
                {topPlayers.map((p, idx) => (
                  <tr key={idx} className={`hover:bg-white/2 transition-colors ${p.isMe ? 'bg-gaming-purple/[0.03]' : ''}`}>
                    <td className="px-5 py-4 font-black">
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] ${
                        p.rank === 1 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : p.rank === 2 ? 'bg-gray-300/10 text-gray-300' : p.rank === 3 ? 'bg-orange-500/10 text-orange-400' : 'text-gray-500'
                      }`}>
                        {p.rank}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-extrabold text-white">
                        {p.ign} {p.isMe && <span className="text-[8px] px-1 bg-gaming-purple/20 text-gaming-purple border border-gaming-purple/35 rounded font-black uppercase">Me</span>}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-400">{p.team}</td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-bold text-gray-500 uppercase">{p.game}</span>
                    </td>
                    <td className="px-5 py-4 text-center font-mono font-bold text-gaming-blue">{p.score}</td>
                    <td className="px-5 py-4 text-center font-mono font-bold text-gray-400">{p.winRate}</td>
                    <td className="px-5 py-4 text-right font-mono font-bold text-gray-400">{p.kd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'teams' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5 text-gray-400 font-extrabold uppercase tracking-widest text-[9px] bg-white/[0.01]">
                  <th className="px-5 py-4 w-20">Rank</th>
                  <th className="px-5 py-4">Team Name</th>
                  <th className="px-5 py-4">Linked Game</th>
                  <th className="px-5 py-4 text-center">Roster Size</th>
                  <th className="px-5 py-4 text-center">Win Rate</th>
                  <th className="px-5 py-4 text-right">Total Earnings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300 font-medium">
                {topTeams.map((t, idx) => (
                  <tr key={idx} className={`hover:bg-white/2 transition-colors ${t.isMyTeam ? 'bg-gaming-purple/[0.03]' : ''}`}>
                    <td className="px-5 py-4 font-black">
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] ${
                        t.rank === 1 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : t.rank === 2 ? 'bg-gray-300/10 text-gray-300' : t.rank === 3 ? 'bg-orange-500/10 text-orange-400' : 'text-gray-500'
                      }`}>
                        {t.rank}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-extrabold text-white">
                      {t.name} {t.isMyTeam && <span className="text-[8px] px-1 bg-gaming-purple/20 text-gaming-purple border border-gaming-purple/35 rounded font-black uppercase">My Team</span>}
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-bold text-gray-500 uppercase">{t.game}</span>
                    </td>
                    <td className="px-5 py-4 text-center font-mono font-bold text-gray-400">{t.rosterSize} Members</td>
                    <td className="px-5 py-4 text-center font-mono font-bold text-gray-400">{t.winRate}</td>
                    <td className="px-5 py-4 text-right font-mono font-bold text-emerald-400">{t.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'mvps' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5 text-gray-400 font-extrabold uppercase tracking-widest text-[9px] bg-white/[0.01]">
                  <th className="px-5 py-4 w-20">Rank</th>
                  <th className="px-5 py-4">Player Name</th>
                  <th className="px-5 py-4">Game</th>
                  <th className="px-5 py-4 text-center">MVP Awards Won</th>
                  <th className="px-5 py-4 text-right">Performance Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300 font-medium">
                {mvpStandings.map((m, idx) => (
                  <tr key={idx} className={`hover:bg-white/2 transition-colors ${m.isMe ? 'bg-gaming-purple/[0.03]' : ''}`}>
                    <td className="px-5 py-4 font-black">
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] ${
                        m.rank === 1 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : m.rank === 2 ? 'bg-gray-300/10 text-gray-300' : m.rank === 3 ? 'bg-orange-500/10 text-orange-400' : 'text-gray-500'
                      }`}>
                        {m.rank}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-extrabold text-white">
                      {m.ign} {m.isMe && <span className="text-[8px] px-1 bg-gaming-purple/20 text-gaming-purple border border-gaming-purple/35 rounded font-black uppercase">Me</span>}
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-bold text-gray-500 uppercase">{m.game}</span>
                    </td>
                    <td className="px-5 py-4 text-center font-mono font-bold text-white">{m.mvpCount} matches</td>
                    <td className="px-5 py-4 text-right font-mono font-bold text-gaming-purple">{m.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
