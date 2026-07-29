import React, { useState, useEffect, useCallback } from 'react';
import { Swords, Tv2, Clock, CheckCircle2, ChevronRight, X, Play, Tv, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const STORAGE_KEY = 'stagecore_matches';
const TEAM_KEY = 'stagecore_user_team';
const TOURNAMENTS_KEY = 'stagecore_registered_tournaments';

const defaultMatches = [
  {
    id: 'M_LIVE_01',
    tournament: 'StageCore Valorant Showdown 2026',
    game: 'Valorant',
    status: 'LIVE',
    time: 'LIVE NOW',
    scheduledTime: 'LIVE NOW',
    opponent: 'Sentinels Pro',
    stage: 'Grand Finals',
    round: 'Grand Finals',
    score1: 1,
    score2: 1,
    team1: { name: 'Team Alpha', tag: 'ALPHA', score: 1, logo: '🛡️' },
    team2: { name: 'Sentinels Pro', tag: 'SEN', score: 1, logo: '⚡' },
    format: 'Best of 3 (BO3)',
    currentMap: 'Haven (Map 3)',
    streamUrl: 'https://twitch.tv/stagecore_official',
    checkedIn: true,
    prizepool: '₹50,000'
  },
  {
    id: 'M_UPCOMING_02',
    tournament: 'BGMI Masters Pro Series',
    game: 'BGMI',
    status: 'UPCOMING',
    time: 'Today at 08:30 PM IST',
    scheduledTime: 'Today at 08:30 PM IST',
    opponent: 'GodLike Esports',
    stage: 'Group Stage - Day 4',
    round: 'Group Stage - Day 4',
    score1: 0,
    score2: 0,
    team1: { name: 'Team Alpha', tag: 'ALPHA', score: 0, logo: '🛡️' },
    team2: { name: 'GodLike Esports', tag: 'GODL', score: 0, logo: '🔥' },
    format: 'Match #12 (Erangel)',
    currentMap: 'Erangel',
    checkedIn: false,
    prizepool: '₹100,000'
  },
  {
    id: 'M_UPCOMING_03',
    tournament: 'Apex Legends Championship',
    game: 'Apex Legends',
    status: 'UPCOMING',
    time: 'Tomorrow at 06:00 PM IST',
    scheduledTime: 'Tomorrow at 06:00 PM IST',
    opponent: 'TSM FTX',
    stage: 'Semifinals',
    round: 'Semifinals',
    score1: 0,
    score2: 0,
    team1: { name: 'Team Alpha', tag: 'ALPHA', score: 0, logo: '🛡️' },
    team2: { name: 'TSM FTX', tag: 'TSM', score: 0, logo: '🦅' },
    format: 'Best of 5 (BO5)',
    currentMap: 'World\'s Edge',
    checkedIn: false,
    prizepool: '₹75,000'
  },
  {
    id: 'M_COMPLETED_04',
    tournament: 'CS2 Invitational Cup',
    game: 'CS2',
    status: 'COMPLETED',
    time: 'Yesterday at 09:00 PM IST',
    scheduledTime: 'Yesterday at 09:00 PM IST',
    opponent: 'Natus Vincere',
    stage: 'Quarter Finals',
    round: 'Quarter Finals',
    score1: 2,
    score2: 1,
    team1: { name: 'Team Alpha', tag: 'ALPHA', score: 2, logo: '🛡️' },
    team2: { name: 'Natus Vincere', tag: 'NAVI', score: 1, logo: '🎯' },
    format: 'Best of 3 (BO3)',
    currentMap: 'Mirage / Inferno / Ancient',
    checkedIn: true,
    result: 'VICTORY',
    mvp: 'AnandYT (28 Kills)',
    prizepool: '₹25,000'
  },
  {
    id: 'M_COMPLETED_05',
    tournament: 'League of Legends Cyber Clash',
    game: 'League of Legends',
    status: 'COMPLETED',
    time: '24 May 2026',
    scheduledTime: '24 May 2026',
    opponent: 'Fnatic Rising',
    stage: 'Group Stage',
    round: 'Group Stage',
    score1: 2,
    score2: 0,
    team1: { name: 'Team Alpha', tag: 'ALPHA', score: 2, logo: '🛡️' },
    team2: { name: 'Fnatic Rising', tag: 'FNC', score: 0, logo: '👑' },
    format: 'Best of 3 (BO3)',
    currentMap: 'Summoner\'s Rift',
    checkedIn: true,
    result: 'VICTORY',
    mvp: 'SentinelX (12/1/14)',
    prizepool: '₹30,000'
  }
];

const normalizeMatch = (m) => {
  return {
    ...m,
    opponent: m.opponent || m.team2?.name || 'Opponent',
    stage: m.stage || m.round || 'Group Stage',
    time: m.time || m.scheduledTime || 'Scheduled',
    score1: m.score1 ?? m.team1?.score ?? 0,
    score2: m.score2 ?? m.team2?.score ?? 0
  };
};

const loadMatches = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizeMatch);
      }
    }
  } catch (e) {
    // fall through to defaults
  }
  return defaultMatches.map(normalizeMatch);
};

const saveMatches = (matches) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
  } catch (e) {
    // silently ignore quota errors
  }
};

const getTeamName = () => {
  try {
    const teamData = localStorage.getItem(TEAM_KEY);
    if (teamData) {
      const parsed = JSON.parse(teamData);
      if (typeof parsed === 'string' && parsed.trim()) return parsed.trim();
      if (parsed && typeof parsed === 'object') {
        return parsed.teamName || parsed.name || parsed.team_name || 'Team Alpha';
      }
    }
  } catch (e) {
    // fall through
  }
  return 'Team Alpha';
};

const getTeamInitials = (name) => {
  if (!name) return 'TA';
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
};

export const MatchesView = () => {
  const { user } = useAuth();
  const [activeFilterTab, setActiveFilterTab] = useState('ALL'); // ALL, LIVE, UPCOMING, COMPLETED
  const [selectedMatch, setSelectedMatch] = useState(null); // Open Details Modal
  const [matches, setMatches] = useState(loadMatches);
  const [teamName, setTeamName] = useState(getTeamName);
  const [showResultModal, setShowResultModal] = useState(null); // match id for result submission
  const [resultScore1, setResultScore1] = useState(2);
  const [resultScore2, setResultScore2] = useState(0);

  // Persist matches to localStorage whenever they change
  useEffect(() => {
    saveMatches(matches);
  }, [matches]);

  // Sync team name and matches from localStorage when storage changes (other tabs)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setMatches(parsed);
        } catch (err) {
          // ignore
        }
      }
      if (e.key === TEAM_KEY || e.key === TOURNAMENTS_KEY) {
        setTeamName(getTeamName());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Also re-read team name on mount in case it was set in same tab
  useEffect(() => {
    setTeamName(getTeamName());
  }, []);

  const teamInitials = getTeamInitials(teamName);

  // Check-in handler for UPCOMING matches
  const handleCheckIn = useCallback((e, matchId) => {
    e.stopPropagation();
    setMatches(prev => {
      const updated = prev.map(m => {
        if (m.id === matchId && m.status === 'UPCOMING') {
          return {
            ...m,
            status: 'LIVE',
            time: 'Live Now',
            score1: 0,
            score2: 0,
            checkedIn: true,
            maps: [{ name: 'Map 1', s1: 0, s2: 0, status: 'LIVE' }]
          };
        }
        return m;
      });
      return updated;
    });
    // Close modal if it was open for this match
    setSelectedMatch(prev => {
      if (prev && prev.id === matchId) {
        const updatedMatch = matches.find(m => m.id === matchId);
        if (updatedMatch) {
          return {
            ...updatedMatch,
            status: 'LIVE',
            time: 'Live Now',
            score1: 0,
            score2: 0,
            checkedIn: true,
            maps: [{ name: 'Map 1', s1: 0, s2: 0, status: 'LIVE' }]
          };
        }
      }
      return prev;
    });
  }, [matches]);

  // Open result submission modal for LIVE matches
  const handleOpenResultModal = useCallback((e, matchId) => {
    e.stopPropagation();
    setShowResultModal(matchId);
    setResultScore1(2);
    setResultScore2(0);
  }, []);

  // Submit result for a LIVE match
  const handleSubmitResult = useCallback((matchId) => {
    const now = new Date();
    const timeStr = `Completed ${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    setMatches(prev => {
      return prev.map(m => {
        if (m.id === matchId && m.status === 'LIVE') {
          const completedMaps = (m.maps || []).map(map => ({
            ...map,
            status: map.status === 'LIVE' ? (map.s1 >= map.s2 ? 'WON' : 'LOST') : map.status
          }));
          return {
            ...m,
            status: 'COMPLETED',
            time: timeStr,
            score1: resultScore1,
            score2: resultScore2,
            maps: completedMaps
          };
        }
        return m;
      });
    });
    // Update selected match if modal is open
    setSelectedMatch(prev => {
      if (prev && prev.id === matchId) {
        return {
          ...prev,
          status: 'COMPLETED',
          time: `Completed ${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
          score1: resultScore1,
          score2: resultScore2
        };
      }
      return prev;
    });
    setShowResultModal(null);
  }, [resultScore1, resultScore2]);

  const filteredMatches = matches.filter(m => {
    if (activeFilterTab === 'ALL') return true;
    return m.status === activeFilterTab;
  });

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <Swords className="text-gaming-purple" size={24} />
            My Competitions
          </h1>
          <p className="text-xs text-gray-400 font-semibold tracking-wider mt-1">
            Track active live matches, schedule check-ins, and inspect post-match replay graphs.
          </p>
        </div>
      </div>

      {/* Tabs Filter toolbar */}
      <div className="flex border-b border-white/5">
        {['ALL', 'LIVE', 'UPCOMING', 'COMPLETED'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveFilterTab(tab)}
            className={`px-5 py-3 text-xs uppercase tracking-wider font-extrabold border-b-2 transition-all cursor-pointer ${
              activeFilterTab === tab ? 'border-gaming-purple text-white bg-gaming-purple/5' : 'border-transparent text-gray-500 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filteredMatches.length === 0 ? (
          <div className="glass-panel py-20 text-center rounded-2xl border border-white/5">
            <Swords size={48} className="text-gray-700 mx-auto mb-3" strokeWidth={1.5} />
            <h3 className="text-sm font-bold text-white mb-1">No matches list matched</h3>
            <p className="text-xs text-gray-500">There are no matches under this category filter.</p>
          </div>
        ) : (
          filteredMatches.map(m => {
            const opponentName = m.opponent || m.team2?.name || 'Opponent';
            const stageName = m.stage || m.round || 'Group Stage';
            const timeDisplay = m.time || m.scheduledTime || 'Scheduled';
            const score1 = m.score1 ?? m.team1?.score ?? 0;
            const score2 = m.score2 ?? m.team2?.score ?? 0;

            return (
              <div
                key={m.id}
                onClick={() => setSelectedMatch(m)}
                className={`glass-panel border rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:border-gaming-purple/35 transition-all duration-300 bg-[#03050f]/30 ${
                  m.status === 'LIVE' ? 'border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.05)]' : 'border-white/5'
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-mono text-[10px] font-black text-gaming-purple shrink-0">
                    #{m.id}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-white uppercase truncate">
                        {teamName} VS {opponentName}
                      </span>
                      {m.game && (
                        <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-gray-400 uppercase shrink-0">
                          {m.game}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-400 block mt-0.5 font-medium truncate">
                      {stageName} • {timeDisplay}
                    </span>
                  </div>
                </div>

                {/* Match Score indicators */}
                <div className="flex items-center gap-4 sm:gap-6 justify-between md:justify-end shrink-0">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    {m.status === 'COMPLETED' || m.status === 'LIVE' ? (
                      <span className="font-mono text-xs sm:text-sm font-black text-white bg-black/40 border border-white/5 px-3 py-1 rounded-xl">
                        {score1} : {score2}
                      </span>
                    ) : (
                      <span className="text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-full font-black uppercase flex items-center gap-1">
                        <Clock size={10} /> Schedule Locked
                      </span>
                    )}

                  {m.status === 'LIVE' && (
                    <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
                      LIVE
                    </span>
                  )}

                  {/* Check-In button for UPCOMING matches */}
                  {m.status === 'UPCOMING' && (
                    <button
                      onClick={(e) => handleCheckIn(e, m.id)}
                      className="px-3 py-1 rounded-xl text-[9px] font-black uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/25 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 size={10} /> Check-In
                    </button>
                  )}

                  {/* Submit Result button for LIVE matches */}
                  {m.status === 'LIVE' && (
                    <button
                      onClick={(e) => handleOpenResultModal(e, m.id)}
                      className="px-3 py-1 rounded-xl text-[9px] font-black uppercase bg-gaming-purple/15 text-purple-400 border border-gaming-purple/25 hover:bg-gaming-purple/25 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Play size={10} /> Submit Result
                    </button>
                  )}
                </div>

                <ChevronRight size={16} className="text-gray-600 hidden md:block" />
              </div>
            </div>
          );
        })
      )}
      </div>

      {/* MATCH DETAILS MODAL */}
      {selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setSelectedMatch(null)} />
          <div className="relative glass-panel border border-white/10 rounded-3xl max-w-lg w-full bg-[#050816] shadow-2xl p-6 space-y-5">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Swords size={16} className="text-gaming-purple" />
                Competition Match details
              </h3>
              <button
                onClick={() => setSelectedMatch(null)}
                className="p-1 text-gray-500 hover:text-white rounded-lg cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scorecard */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-around">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 rounded-xl bg-gaming-purple/10 border border-gaming-purple/25 flex items-center justify-center font-black text-white text-sm shadow">{teamInitials}</div>
                  <span className="text-xs font-black text-white">{teamName}</span>
                </div>
                
                <div className="space-y-1">
                  <span className="text-[9px] text-gray-500 font-extrabold uppercase">{selectedMatch.stage}</span>
                  {selectedMatch.status === 'COMPLETED' || selectedMatch.status === 'LIVE' ? (
                    <div className="text-2xl font-black text-white font-mono tracking-wider bg-black/35 px-4 py-1.5 rounded-2xl border border-white/5 shadow-inner">
                      {selectedMatch.score1} - {selectedMatch.score2}
                    </div>
                  ) : (
                    <div className="text-xs font-bold text-gray-400">TBD</div>
                  )}
                  <span className="text-[8px] text-gray-600 block">Best of 3</span>
                </div>

                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 rounded-xl bg-gaming-blue/10 border border-gaming-blue/25 flex items-center justify-center font-black text-white text-sm shadow">OP</div>
                  <span className="text-xs font-black text-white">{selectedMatch.opponent}</span>
                </div>
              </div>
            </div>

            {/* Map Picks details logs */}
            {selectedMatch.maps ? (
              <div className="space-y-2 text-xs">
                <span className="text-[9px] text-gray-500 font-extrabold uppercase tracking-wide">Map picks & Scores</span>
                <div className="space-y-1.5">
                  {selectedMatch.maps.map((map, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white/3 border border-white/5 rounded-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-mono">0{idx+1}</span>
                        <span className="text-gray-300 font-bold">{map.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-white font-extrabold">{map.s1} - {map.s2}</span>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                          map.status === 'WON' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : map.status === 'LOST'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse'
                        }`}>{map.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white/3 border border-white/5 rounded-2xl p-4 text-center text-xs text-gray-500 italic">
                Match scheduling pending checkout. Veto map bans locked.
              </div>
            )}

            {/* Modal action buttons for Check-In / Submit Result */}
            {selectedMatch.status === 'UPCOMING' && (
              <div className="pt-2">
                <button
                  onClick={(e) => handleCheckIn(e, selectedMatch.id)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-extrabold uppercase tracking-wider transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  <CheckCircle2 size={12} />
                  <span>Check In to Match</span>
                </button>
              </div>
            )}

            {selectedMatch.status === 'LIVE' && (
              <div className="pt-2">
                <button
                  onClick={(e) => handleOpenResultModal(e, selectedMatch.id)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gaming-purple hover:bg-gaming-purple/80 text-white text-[10px] font-extrabold uppercase tracking-wider transition-all shadow-md shadow-gaming-purple/20 cursor-pointer"
                >
                  <Play size={12} />
                  <span>Submit Match Result</span>
                </button>
              </div>
            )}

            {/* Stream replay URL link if exists */}
            {selectedMatch.streamUrl && (
              <div className="pt-2">
                <a
                  href={selectedMatch.streamUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gaming-purple hover:bg-gaming-purple/80 text-white text-[10px] font-extrabold uppercase tracking-wider transition-all shadow-md shadow-gaming-purple/20"
                >
                  <Tv size={12} />
                  <span>Watch Match Stream Replay</span>
                </a>
              </div>
            )}

          </div>
        </div>
      )}

      {/* SUBMIT RESULT MODAL */}
      {showResultModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setShowResultModal(null)} />
          <div className="relative glass-panel border border-white/10 rounded-3xl max-w-sm w-full bg-[#050816] shadow-2xl p-6 space-y-5">
            
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert size={16} className="text-gaming-purple" />
                Submit Result
              </h3>
              <button
                onClick={() => setShowResultModal(null)}
                className="p-1 text-gray-500 hover:text-white rounded-lg cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-around">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[9px] text-gray-500 font-extrabold uppercase">{teamName}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setResultScore1(Math.max(0, resultScore1 - 1))}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white font-black text-sm hover:bg-white/10 transition-all cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-2xl font-black text-white font-mono w-8 text-center">{resultScore1}</span>
                    <button
                      onClick={() => setResultScore1(resultScore1 + 1)}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white font-black text-sm hover:bg-white/10 transition-all cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <span className="text-gray-600 font-black text-xs">VS</span>

                <div className="flex flex-col items-center gap-2">
                  <span className="text-[9px] text-gray-500 font-extrabold uppercase">
                    {matches.find(m => m.id === showResultModal)?.opponent || 'Opponent'}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setResultScore2(Math.max(0, resultScore2 - 1))}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white font-black text-sm hover:bg-white/10 transition-all cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-2xl font-black text-white font-mono w-8 text-center">{resultScore2}</span>
                    <button
                      onClick={() => setResultScore2(resultScore2 + 1)}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white font-black text-sm hover:bg-white/10 transition-all cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleSubmitResult(showResultModal)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gaming-purple hover:bg-gaming-purple/80 text-white text-[10px] font-extrabold uppercase tracking-wider transition-all shadow-md shadow-gaming-purple/20 cursor-pointer"
              >
                <CheckCircle2 size={12} />
                <span>Confirm & Submit Result</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
