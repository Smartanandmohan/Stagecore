import React, { useState } from 'react';
import { useSiteContent } from '../../../context/SiteContentContext';
import {
  Trophy, Search, Calendar, Swords, Award, ToggleLeft, ShieldAlert,
  Play, FileText, CheckCircle, Clock, X, Users, MapPin
} from 'lucide-react';
import arenaBackground from '../../../assets/images/arena_background.png';
import { MatchesView } from './MatchesView';

export const TournamentsView = () => {
  const { content } = useSiteContent();
  const tournaments = content.tournaments || [];

  const [activeSection, setActiveSection] = useState(() => {
    return localStorage.getItem('stagecore_tournaments_active_view') || 'tournaments';
  });

  const handleSectionChange = (section) => {
    setActiveSection(section);
    localStorage.setItem('stagecore_tournaments_active_view', section);
  };

  const [activeFilterTab, setActiveFilterTab] = useState('ALL'); // ALL, REGISTERED, UPCOMING, COMPLETED
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTourney, setSelectedTourney] = useState(null); // Open Details Modal
  const [activeModalSection, setActiveModalSection] = useState('info'); // info, bracket, teams, rules

  const [myRegisteredList, setMyRegisteredList] = useState(() => {
    const saved = localStorage.getItem('stagecore_registered_tournaments');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleRegistration = (tourneyName) => {
    const isAlreadyReg = myRegisteredList.some(rName => tourneyName.toLowerCase().includes(rName.toLowerCase().slice(0, 15)));
    let updatedList;
    let text;

    if (isAlreadyReg) {
      // Leave tournament
      updatedList = myRegisteredList.filter(rName => !tourneyName.toLowerCase().includes(rName.toLowerCase().slice(0, 15)));
      text = `You have cancelled your registration for ${tourneyName}`;
    } else {
      // Register for tournament
      updatedList = [...myRegisteredList, tourneyName];
      text = `You have successfully registered for ${tourneyName}`;
    }

    setMyRegisteredList(updatedList);
    localStorage.setItem('stagecore_registered_tournaments', JSON.stringify(updatedList));

    // Update tournaments stats count in localStorage
    try {
      const stats = JSON.parse(localStorage.getItem('user_stats') || '{}');
      stats.tournaments = updatedList.length + 9; // Offset for historical ones
      localStorage.setItem('user_stats', JSON.stringify(stats));
    } catch(e) {}

    // Add recent activity
    try {
      const defaultActivities = [];
      const savedActivities = localStorage.getItem('recent_activities');
      const activities = savedActivities ? JSON.parse(savedActivities) : defaultActivities;
      const newActivity = {
        id: Date.now(),
        text,
        time: 'Just now',
        type: 'registration'
      };
      localStorage.setItem('recent_activities', JSON.stringify([newActivity, ...activities]));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTournaments = tournaments.filter(t => {
    const isRegistered = myRegisteredList.some(rName => t.name.toLowerCase().includes(rName.toLowerCase().slice(0, 15)));
    
    // Search
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.game.toLowerCase().includes(searchTerm.toLowerCase());

    // Status mapping
    const status = t.status || 'UPCOMING';
    if (activeFilterTab === 'REGISTERED') {
      return isRegistered && matchesSearch;
    } else if (activeFilterTab !== 'ALL') {
      return status.toLowerCase() === activeFilterTab.toLowerCase() && matchesSearch;
    }
    return matchesSearch;
  });

  const getStatusBadgeColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'LIVE': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'UPCOMING': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'COMPLETED': return 'text-gray-400 bg-white/5 border-white/10';
      default: return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    }
  };

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Top Navigation Switcher */}
      <div className="flex border-b border-white/5 bg-[#03050f]/30 p-1 rounded-xl w-fit font-bold text-[10px] tracking-wider uppercase">
        <button
          onClick={() => handleSectionChange('tournaments')}
          className={`px-5 py-2 rounded-lg transition-all cursor-pointer border-0 ${
            activeSection === 'tournaments' ? 'bg-gaming-purple text-white shadow' : 'text-gray-400 hover:text-white bg-transparent'
          }`}
        >
          Browse Tournaments
        </button>
        <button
          onClick={() => handleSectionChange('matches')}
          className={`px-5 py-2 rounded-lg transition-all cursor-pointer border-0 ${
            activeSection === 'matches' ? 'bg-gaming-purple text-white shadow' : 'text-gray-400 hover:text-white bg-transparent'
          }`}
        >
          My Matches
        </button>
      </div>

      {activeSection === 'tournaments' ? (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
            <div>
              <h1 className="text-2xl font-black text-white flex items-center gap-3">
                <Trophy className="text-gaming-purple" size={24} />
                Tournaments Arena
              </h1>
              <p className="text-xs text-gray-400 font-semibold tracking-wider mt-1">
                Browse global esports tournaments, view matchmaking brackets, and inspect rules.
              </p>
            </div>
          </div>

      {/* Toolbar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Search */}
        <div className="relative md:col-span-2">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search active tournaments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-gaming-purple/60 placeholder-gray-600 transition-colors"
          />
        </div>

        {/* Filter Tabs Grid */}
        <div className="flex bg-[#03050f] border border-white/5 rounded-xl p-1 w-full justify-between text-center font-bold text-[10px] tracking-wider uppercase">
          {['ALL', 'REGISTERED', 'LIVE', 'UPCOMING'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilterTab(tab)}
              className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeFilterTab === tab ? 'bg-gaming-purple text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tournaments list grid */}
      {filteredTournaments.length === 0 ? (
        <div className="glass-panel py-20 text-center rounded-2xl border border-white/5">
          <Trophy size={48} className="text-gray-700 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-white mb-1">No active tournaments matched</h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto">Try clearing search filters or changing active status tabs.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTournaments.map(t => {
            const isReg = myRegisteredList.some(r => t.name.toLowerCase().includes(r.toLowerCase().slice(0, 15)));
            return (
              <div
                key={t.id}
                onClick={() => {
                  setSelectedTourney(t);
                  setActiveModalSection('info');
                }}
                className="glass-panel border border-white/5 rounded-2xl overflow-hidden hover:border-gaming-purple/30 transition-all duration-300 flex flex-col justify-between bg-[#03050f]/30 group cursor-pointer shadow-lg"
              >
                {/* Image header */}
                <div className="h-32 w-full bg-black/40 overflow-hidden border-b border-white/5 relative">
                  <img
                    src={t.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600'}
                    alt={t.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 filter brightness-90"
                    onError={e => {
                      e.target.src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600';
                    }}
                  />
                  {/* Status Overlay */}
                  <span className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-[8px] font-black uppercase border ${getStatusBadgeColor(t.status)}`}>
                    {t.status || 'UPCOMING'}
                  </span>

                  {isReg && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[8px] font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      REGISTERED
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-4 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[9px] bg-gaming-purple/10 text-gaming-purple font-black uppercase tracking-wider px-2 py-0.5 rounded border border-gaming-purple/20 w-fit block">
                      {t.game || 'Valorant'}
                    </span>
                    <h3 className="text-sm font-extrabold text-white group-hover:text-gaming-purple transition-all line-clamp-1">{t.name}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[10px] text-gray-500 font-bold border-t border-white/5 pt-3">
                    <div>
                      <span className="block text-[8px] text-gray-600 uppercase">Prize Pool</span>
                      <span className="text-white font-extrabold">{t.prize || '₹25,000'}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[8px] text-gray-600 uppercase">Starts On</span>
                      <span className="text-gray-300 font-semibold">{t.date || '25 May 2026'}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TOURNAMENT DETAIL MODAL */}
      {selectedTourney && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setSelectedTourney(null)} />
          <div className="relative glass-panel border border-white/10 rounded-3xl max-w-2xl w-full bg-[#050816] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            
            {/* Header info banner */}
            <div className="h-40 w-full relative shrink-0">
              <img
                src={selectedTourney.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600'}
                alt={selectedTourney.name}
                className="w-full h-full object-cover filter brightness-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] to-[#050816]/10" />
              
              <button
                onClick={() => setSelectedTourney(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-xl bg-white/5 border border-white/10"
              >
                <X size={16} />
              </button>

              <div className="absolute bottom-4 left-6 space-y-1">
                <span className="px-2 py-0.5 rounded bg-gaming-purple/20 border border-gaming-purple/35 text-white font-black text-[9px] uppercase">
                  {selectedTourney.game}
                </span>
                <h2 className="text-lg font-black text-white uppercase tracking-wider">{selectedTourney.name}</h2>
              </div>
            </div>

            {/* View navigation Tabs */}
            <div className="flex border-b border-white/5 bg-[#03050f]/60 px-6 shrink-0">
              {['info', 'bracket', 'teams', 'rules'].map(sect => (
                <button
                  key={sect}
                  onClick={() => setActiveModalSection(sect)}
                  className={`py-3.5 px-4 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                    activeModalSection === sect ? 'border-gaming-purple text-white' : 'border-transparent text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {sect === 'info' ? 'General Info' : sect === 'bracket' ? 'Matches Bracket' : sect === 'teams' ? 'Roster Teams' : 'Rules'}
                </button>
              ))}
            </div>

            {/* Modal Body Contents */}
            <div className="flex-1 p-6 overflow-y-auto no-scrollbar text-xs leading-relaxed space-y-4">
              
              {/* TAB 1: General Info */}
              {activeModalSection === 'info' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white/3 border border-white/5 rounded-xl p-3">
                      <span className="text-[9px] text-gray-500 font-extrabold uppercase">Prize Pool</span>
                      <span className="text-white font-black text-sm block mt-0.5">{selectedTourney.prize || '₹25,000'}</span>
                    </div>
                    <div className="bg-white/3 border border-white/5 rounded-xl p-3">
                      <span className="text-[9px] text-gray-500 font-extrabold uppercase">Match Format</span>
                      <span className="text-gray-300 font-bold block mt-0.5">{selectedTourney.format || 'Single Elimination'}</span>
                    </div>
                    <div className="bg-white/3 border border-white/5 rounded-xl p-3">
                      <span className="text-[9px] text-gray-500 font-extrabold uppercase">Game Mode</span>
                      <span className="text-gray-300 font-bold block mt-0.5">{selectedTourney.mode || '5v5 Squad'}</span>
                    </div>
                    <div className="bg-white/3 border border-white/5 rounded-xl p-3">
                      <span className="text-[9px] text-gray-500 font-extrabold uppercase">Starts Date</span>
                      <span className="text-gaming-purple font-bold block mt-0.5">{selectedTourney.date || '25 May 2026'}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h4 className="font-extrabold text-[11px] text-white uppercase tracking-wider">Tournament Description</h4>
                    <p className="text-gray-400">
                      StageCore official competitive series featuring the top tier community teams. Live broadcast coverage starts from semi-finals on YouTube & Twitch handles. Standard rules lock is active.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: Custom SVG Tournament Bracket Tree */}
              {activeModalSection === 'bracket' && (
                <div className="space-y-4 flex flex-col items-center">
                  <h4 className="font-extrabold text-[10px] text-gray-500 uppercase tracking-widest self-start">Matchmaking Tree (Single Elim)</h4>
                  
                  <div className="w-full overflow-x-auto p-4 border border-white/5 rounded-2xl bg-black/30 flex items-center justify-center">
                    <svg viewBox="0 0 400 180" className="w-[450px] h-[200px] text-gray-400">
                      {/* Round 1 (Quarter finals) */}
                      <rect x="10" y="20" width="70" height="24" rx="3" fill="#03050f" stroke="rgba(255,255,255,0.05)" />
                      <text x="15" y="34" fill="#a855f7" fontSize="8" fontWeight="bold">Team Alpha</text>
                      <text x="65" y="34" fill="#10b981" fontSize="7" fontWeight="bold">2</text>
                      
                      <rect x="10" y="50" width="70" height="24" rx="3" fill="#03050f" stroke="rgba(255,255,255,0.05)" />
                      <text x="15" y="64" fill="#6b7280" fontSize="8">Team Bravo</text>
                      <text x="65" y="64" fill="#6b7280" fontSize="7">1</text>

                      {/* Connect Round 1 to Semi-Final */}
                      <path d="M 80 32 L 110 32 L 110 52 L 140 52" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
                      <path d="M 80 62 L 110 62 L 110 52" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

                      {/* Semi Final */}
                      <rect x="140" y="40" width="70" height="24" rx="3" fill="#03050f" stroke="#7c3aed" />
                      <text x="145" y="54" fill="#a855f7" fontSize="8" fontWeight="bold">Team Alpha</text>
                      <text x="195" y="54" fill="#7c3aed" fontSize="7" fontWeight="bold">-</text>

                      <rect x="140" y="100" width="70" height="24" rx="3" fill="#03050f" stroke="rgba(255,255,255,0.05)" />
                      <text x="145" y="114" fill="#00f0ff" fontSize="8" fontWeight="bold">GodLike</text>
                      <text x="195" y="114" fill="#6b7280" fontSize="7">-</text>

                      {/* Connect Semi to Grand Final */}
                      <path d="M 210 52 L 240 52 L 240 77 L 270 77" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                      <path d="M 210 112 L 240 112 L 240 77" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

                      {/* Grand Final */}
                      <rect x="270" y="65" width="80" height="24" rx="3" fill="#03050f" stroke="rgba(255,255,255,0.05)" />
                      <text x="275" y="79" fill="#6b7280" fontSize="8">Grand Finals</text>

                      {/* Round Header Labels */}
                      <text x="10" y="12" fill="#6b7280" fontSize="7" fontWeight="bold" letterSpacing="1">QUARTERS</text>
                      <text x="140" y="12" fill="#6b7280" fontSize="7" fontWeight="bold" letterSpacing="1">SEMIS</text>
                      <text x="270" y="12" fill="#6b7280" fontSize="7" fontWeight="bold" letterSpacing="1">GRAND FINALS</text>
                    </svg>
                  </div>
                </div>
              )}

              {/* TAB 3: Registered Roster Teams */}
              {activeModalSection === 'teams' && (
                <div className="space-y-3">
                  <h4 className="font-extrabold text-[10px] text-gray-500 uppercase tracking-widest">Participating rosters (8 approved)</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {['Team Alpha', 'Team Bravo', 'GodLike Esports', 'Velocity Gaming', 'Reckoning Esports', 'Team Soul', 'Entity Gaming', 'Team Delta'].map((tName, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-white/3 border border-white/5 rounded-xl">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-gaming-purple to-gaming-blue flex items-center justify-center font-black text-white text-xs shrink-0">
                          {tName.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-bold text-white block">{tName}</span>
                          <span className="text-[9px] text-gray-500 block uppercase">Approved Entry</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: Rules match */}
              {activeModalSection === 'rules' && (
                <div className="space-y-4">
                  <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl flex gap-3 text-left">
                    <ShieldAlert size={18} className="text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-extrabold text-[10px] text-white uppercase tracking-wider mb-0.5">Rulebook enforcement</h5>
                      <p className="text-[9px] text-gray-400 leading-normal font-light">
                        Anti-Cheat client hook monitoring is enabled. Map selection and rule lock takes place 2 hours before match starts.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h4 className="font-extrabold text-[10px] text-white uppercase tracking-wider">Compete & Check-in policy</h4>
                    <p className="text-gray-400 font-medium">
                      1. Match check-in window opens 30 minutes prior to scheduled match. Failure to check-in results in an automatic default lose.<br />
                      2. Teams must field exactly 5 registered roster accounts. Any stand-in IGN check failures will trigger bracket forfeit.<br />
                      3. All match dispute appeals must be logged via support console with video file evidence uploads.
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/5 bg-[#03050f]/80 flex items-center justify-between shrink-0">
              {selectedTourney.status !== 'COMPLETED' ? (
                <button
                  onClick={() => {
                    toggleRegistration(selectedTourney.name);
                  }}
                  className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md ${
                    myRegisteredList.some(rName => selectedTourney.name.toLowerCase().includes(rName.toLowerCase().slice(0, 15)))
                      ? 'bg-red-500/25 border border-red-500/30 text-red-400 hover:bg-red-500/35'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20'
                  }`}
                >
                  {myRegisteredList.some(rName => selectedTourney.name.toLowerCase().includes(rName.toLowerCase().slice(0, 15)))
                    ? 'Leave Tournament'
                    : 'Register Now'}
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={() => setSelectedTourney(null)}
                className="px-5 py-2.5 bg-gaming-purple hover:bg-gaming-purple/80 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md shadow-gaming-purple/20"
              >
                Close details
              </button>
            </div>

          </div>
        </div>
      )}
        </>
      ) : (
        <MatchesView />
      )}

    </div>
  );
};
