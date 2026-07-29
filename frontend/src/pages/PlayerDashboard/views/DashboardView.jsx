import React, { useState } from 'react';
import {
  Trophy, Users, User, Target, Activity, Bell, ShieldCheck, Swords,
  ArrowUpRight, Play, Calendar, UserPlus, FileText, CheckCircle, CreditCard
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useSiteContent } from '../../../context/SiteContentContext';
import arenaBackground from '../../../assets/images/arena_background.png';

export const DashboardView = ({ setActiveTab }) => {
  const { user } = useAuth();
  const { content } = useSiteContent();
  const tournaments = content.tournaments || [];
  const [activeTourneyTab, setActiveTourneyTab] = useState('registered');

  const avatar = localStorage.getItem('user_avatar') || '🎮';
  const recruitmentOpen = localStorage.getItem('team_recruitment_open') !== 'false';

  const storedUser = (() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : user;
    } catch {
      return user;
    }
  })();
  const ign = storedUser?.username || 'AnandYT';

  const userTeam = (() => {
    try {
      const saved = localStorage.getItem('stagecore_user_team');
      if (saved && saved !== 'null') return JSON.parse(saved);
    } catch (e) {}
    return null;
  })();

  const registeredList = (() => {
    const saved = localStorage.getItem('stagecore_registered_tournaments');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    const defaultRegistered = ['StageCore Valorant Showdown 2026', 'BGMI Masters Pro Series'];
    localStorage.setItem('stagecore_registered_tournaments', JSON.stringify(defaultRegistered));
    return defaultRegistered;
  })();

  const userStats = (() => {
    try {
      const saved = localStorage.getItem('user_stats');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Sync tournaments count dynamically based on the current registrations
        parsed.tournaments = registeredList.length + 9;
        localStorage.setItem('user_stats', JSON.stringify(parsed));
        return parsed;
      }
      
      const defaultStats = {
        matchesPlayed: 125,
        matchesWon: 85,
        winRate: 68,
        kdRatio: 1.85,
        tournaments: registeredList.length + 9
      };
      localStorage.setItem('user_stats', JSON.stringify(defaultStats));
      return defaultStats;
    } catch {
      return { matchesPlayed: 125, matchesWon: 85, winRate: 68, kdRatio: 1.85, tournaments: registeredList.length + 9 };
    }
  })();

  const stats = [
    { title: 'Matches Played', value: userStats.matchesPlayed.toString(), desc: 'Total Matches', trend: 'up', color: 'text-gaming-purple', sparkData: 'M 10 35 Q 25 15 40 25 T 70 5 T 90 20' },
    { title: 'Matches Won', value: userStats.matchesWon.toString(), desc: 'Total Wins', trend: 'up', color: 'text-emerald-400', sparkData: 'M 10 30 Q 25 25 40 10 T 70 15 T 90 5' },
    { title: 'Win Rate', value: `${userStats.winRate}%`, desc: 'Your Win Rate', trend: 'up', color: 'text-gaming-blue', sparkData: 'M 10 20 Q 25 35 40 15 T 70 5 T 90 10' },
    { title: 'K/D Ratio', value: userStats.kdRatio.toFixed(2), desc: 'Average K/D', trend: 'down', color: 'text-pink-500', sparkData: 'M 10 15 Q 25 5 40 30 T 70 20 T 90 25' },
    { title: 'Tournaments', value: userStats.tournaments.toString(), desc: 'Participated', trend: 'up', color: 'text-amber-500', sparkData: 'M 10 35 Q 25 30 40 20 T 70 15 T 90 5' }
  ];

  const recentActivity = (() => {
    try {
      const saved = localStorage.getItem('recent_activities');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      
      const defaultActivities = [
        { id: 1, text: 'Registered for StageCore Valorant Showdown 2026', time: '10 mins ago', type: 'registration' },
        { id: 2, text: 'Earned MVP title in CS2 Invitational Quarter Finals', time: '1 hour ago', type: 'match' },
        { id: 3, text: 'Received ₹1,000 tournament prize payout in Wallet', time: '2 hours ago', type: 'wallet' },
        { id: 4, text: 'Accepted invitation to join Team Alpha roster', time: '1 day ago', type: 'team' }
      ];
      localStorage.setItem('recent_activities', JSON.stringify(defaultActivities));
      return defaultActivities;
    } catch {
      return [
        { id: 1, text: 'Registered for StageCore Valorant Showdown 2026', time: '10 mins ago', type: 'registration' },
        { id: 2, text: 'Earned MVP title in CS2 Invitational Quarter Finals', time: '1 hour ago', type: 'match' },
        { id: 3, text: 'Received ₹1,000 tournament prize payout in Wallet', time: '2 hours ago', type: 'wallet' },
        { id: 4, text: 'Accepted invitation to join Team Alpha roster', time: '1 day ago', type: 'team' }
      ];
    }
  })();

  const upcomingTournaments = tournaments.map((t, idx) => {
    const isRegistered = registeredList.some(r => t.name.toLowerCase().includes(r.toLowerCase().slice(0, 15)));
    
    let tab = 'upcoming';
    let statusText = 'UPCOMING';
    let colorClass = 'text-amber-400 bg-amber-500/10 border-amber-500/25';
    
    if (isRegistered) {
      tab = 'registered';
      statusText = 'REGISTERED';
      colorClass = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25';
    } else if (t.status === 'LIVE') {
      tab = 'upcoming';
      statusText = 'LIVE';
      colorClass = 'text-red-400 bg-red-500/10 border-red-500/25 animate-pulse';
    } else if (t.status === 'COMPLETED') {
      tab = 'completed';
      statusText = 'COMPLETED';
      colorClass = 'text-gray-400 bg-white/5 border-white/10';
    }
    
    return {
      id: t.id || idx,
      name: t.name,
      date: t.date || '25 May - 26 May 2026',
      status: statusText,
      tab: tab,
      color: colorClass
    };
  });

  const filteredTournaments = upcomingTournaments.filter(t => t.tab === activeTourneyTab);

  const bannerPresets = {
    cyberpunk: 'from-[#7C3AED] via-[#FF007F] to-[#050816]',
    frostbite: 'from-[#00F0FF] via-[#3B82F6] to-[#050816]',
    toxic: 'from-[#10B981] via-[#059669] to-[#050816]',
    abyss: 'from-[#EF4444] via-[#7C3AED] to-[#050816]'
  };
  const selectedBanner = localStorage.getItem('user_banner') || 'cyberpunk';
  const bannerGradient = bannerPresets[selectedBanner] || bannerPresets.cyberpunk;

  const notificationsList = (() => {
    try {
      const saved = localStorage.getItem('user_notifications');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  })();

  const iconMap = {
    Trophy,
    Swords,
    CreditCard,
    ShieldCheck,
    Bell,
    CheckCircle
  };

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      
      {/* HERO SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Welcome arena box */}
        <div className="lg:col-span-3 glass-panel rounded-2xl border border-white/5 overflow-hidden relative p-6 sm:p-8 flex flex-col justify-between min-h-[220px]">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none filter brightness-50"
            style={{ backgroundImage: `url(${arenaBackground})` }}
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${bannerGradient} opacity-30 pointer-events-none`} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-[#050816]/80 to-transparent pointer-events-none" />

          {/* Heading */}
          <div className="relative z-10 space-y-1">
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              Welcome back, <span className="bg-gradient-to-r from-gaming-purple to-gaming-blue bg-clip-text text-transparent">{ign}</span> 👋
            </h1>
            <p className="text-xs text-gray-400 font-medium">Ready to conquer the battlefield? Match starts in 1 hour.</p>
          </div>

          {/* User snapshot profiles info */}
          <div className="relative z-10 flex flex-wrap gap-6 items-center mt-6 pt-6 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gaming-purple/20 border border-gaming-purple/35 flex items-center justify-center font-black text-white shadow-lg text-lg">
                {avatar}
              </div>
              <div>
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block">IGN</span>
                <span className="text-xs text-white font-extrabold">{ign}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gaming-blue/20 border border-gaming-blue/35 flex items-center justify-center font-black text-white shadow-lg">
                💎
              </div>
              <div>
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block">Rank</span>
                <span className="text-xs text-white font-extrabold">Diamond IV</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/35 flex items-center justify-center font-black text-white shadow-lg">
                🛡️
              </div>
              <div>
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block">Team</span>
                <span className="text-xs text-white font-extrabold">{userTeam ? userTeam.name : 'Free Agent'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Current rank card */}
        <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-[#03050f]/60 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Current Rank</span>
            <div className="flex items-center gap-4 mt-3">
              {/* SVG Rank Icon Diamond */}
              <div className="w-12 h-12 bg-gaming-purple/10 border border-gaming-purple/30 rounded-xl flex items-center justify-center shadow-lg shadow-gaming-purple/10 text-gaming-purple">
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                  <path d="M12 2L2 12l10 10 10-10L12 2zm0 4.5l6.5 5.5-6.5 5.5-6.5-5.5 6.5-5.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">Diamond IV</h3>
                <span className="text-[10px] text-gray-400 font-bold font-mono">3250 / 3600 RP</span>
              </div>
            </div>
          </div>
          {/* Progress bar */}
          <div className="space-y-1.5 mt-4 pt-3 border-t border-white/5">
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-gaming-purple to-gaming-blue rounded-full" style={{ width: '75%' }} />
            </div>
            <span className="text-[9px] text-gray-500 font-semibold block text-right">Top 15% of players</span>
          </div>
        </div>
      </div>

      {/* STATS STRIP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="glass-panel rounded-2xl p-4 border border-white/5 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">{stat.title}</span>
                <span className="text-xl font-black text-white mt-1 block">{stat.value}</span>
              </div>
              <svg viewBox="0 0 100 40" className="w-14 h-8 text-gaming-purple">
                <path d={stat.sparkData} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-[9px] text-gray-400 font-semibold block mt-3">{stat.desc}</span>
          </div>
        ))}
      </div>

      {/* BOTTOM SECTIONS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Upcoming Match & Team info */}
        <div className="space-y-6">
          {/* Upcoming Match Card */}
          <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <Swords size={13} className="text-gaming-purple" />
                Upcoming Match
              </h3>
              <span className="text-[9px] bg-gaming-purple/10 text-gaming-purple border border-gaming-purple/20 px-2 py-0.5 rounded font-black uppercase">Today</span>
            </div>
            <div className="p-5 space-y-4 text-center">
              <div className="flex items-center justify-around">
                {/* Team Alpha */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gaming-purple/10 border border-gaming-purple/35 flex items-center justify-center font-black text-white shadow-lg">A</div>
                  <span className="text-[11px] font-bold text-white">Team Alpha</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <span className="text-[9px] text-gray-500 font-semibold">Quarter Final</span>
                  <span className="text-lg font-black text-gaming-purple drop-shadow-[0_0_8px_rgba(124,58,237,0.3)]">VS</span>
                  <span className="text-[9px] text-gray-400 font-medium">Best of 3</span>
                </div>

                {/* Team Bravo */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gaming-blue/10 border border-gaming-blue/35 flex items-center justify-center font-black text-white shadow-lg">B</div>
                  <span className="text-[11px] font-bold text-white">Team Bravo</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-white/3 border border-white/5 rounded-xl p-2.5">
                <div className="text-left">
                  <span className="text-[9px] text-gray-500 font-bold block">DATE</span>
                  <span className="text-gray-300 font-semibold">25 May 2026</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-gray-500 font-bold block">TIME</span>
                  <span className="text-gray-300 font-semibold">08:00 PM IST</span>
                </div>
              </div>

              <button
                onClick={() => {
                  localStorage.setItem('stagecore_tournaments_active_view', 'matches');
                  setActiveTab('tournaments');
                }}
                className="w-full py-2.5 rounded-xl bg-gaming-purple hover:bg-gaming-purple/80 text-white text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-gaming-purple/20"
              >
                View Match Details
              </button>
            </div>
          </div>

          {/* My Team Card */}
          <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <Users size={13} className="text-gaming-purple" />
                My Team
              </h3>
              <button
                onClick={() => setActiveTab('teams')}
                className="text-[9px] text-gaming-blue hover:underline font-bold"
              >
                {userTeam ? 'View Team' : 'Create Team'}
              </button>
            </div>
            <div className="p-4 space-y-4">
              {userTeam ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gaming-purple to-gaming-blue flex items-center justify-center font-black text-white shadow-lg">
                      {userTeam.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white">{userTeam.name}</h4>
                      <span className="text-[9px] text-gray-500 font-bold">Roster Size: {userTeam.roster.length} / 6 Members</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                    <div>
                      <span className="text-[9px] text-gray-500 block uppercase">Role</span>
                      <span className="text-gray-300 font-bold">Player</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-500 block uppercase">Recruitment</span>
                      <span className={userTeam.recruitmentOpen ? "text-emerald-400 font-bold" : "text-gray-400 font-bold"}>
                        {userTeam.recruitmentOpen ? 'OPEN' : 'CLOSED'}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1 pt-2 border-t border-white/5">
                    <div className="flex items-center justify-between text-[9px] text-gray-500">
                      <span className="font-bold">Team Level 12</span>
                      <span className="font-mono">2450 / 3000 XP</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gaming-purple rounded-full" style={{ width: '80%' }} />
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <p className="text-[11px] text-gray-500 leading-normal font-semibold">You are currently a free agent. Create your competitive roster to begin playing!</p>
                  <button
                    onClick={() => setActiveTab('teams')}
                    className="w-full py-2 bg-gaming-purple hover:bg-gaming-purple/80 text-white text-[9px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    Create Esports Team
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Column 2: Registered Tournaments & Quick Actions */}
        <div className="space-y-6">
          {/* Registered Tournaments Card */}
          <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <Trophy size={13} className="text-gaming-purple" />
                My Tournaments
              </h3>
              <button
                onClick={() => setActiveTab('tournaments')}
                className="text-[9px] text-gaming-blue hover:underline font-bold"
              >
                View All
              </button>
            </div>
            
            {/* Tabs */}
            <div className="flex border-b border-white/5 px-2">
              {['registered', 'upcoming', 'completed'].map(t => (
                <button
                  key={t}
                  onClick={() => setActiveTourneyTab(t)}
                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors border-b-2 text-center cursor-pointer ${
                    activeTourneyTab === t ? 'border-gaming-purple text-white' : 'border-transparent text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="p-4 divide-y divide-white/5 max-h-[170px] overflow-y-auto no-scrollbar">
              {filteredTournaments.length === 0 ? (
                <div className="text-center py-6 text-xs text-gray-500 italic">No entries for this tab filter.</div>
              ) : (
                filteredTournaments.map(t => (
                  <div key={t.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-extrabold text-white block">{t.name}</span>
                      <span className="text-[9px] text-gray-500">{t.date}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${t.color}`}>
                      {t.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-4 border-b border-white/5">
              <h3 className="text-xs font-black text-white uppercase tracking-wider">Quick Actions</h3>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3 text-center">
              <button
                onClick={() => setActiveTab('tournaments')}
                className="p-3 bg-white/3 border border-white/5 hover:border-gaming-purple/40 hover:bg-gaming-purple/5 rounded-xl text-left transition-all cursor-pointer group flex flex-col gap-1.5"
              >
                <Trophy size={14} className="text-gaming-purple group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider block">Join Tournament</span>
              </button>
              <button
                onClick={() => {
                  localStorage.setItem('stagecore_tournaments_active_view', 'matches');
                  setActiveTab('tournaments');
                }}
                className="p-3 bg-white/3 border border-white/5 hover:border-gaming-purple/40 hover:bg-gaming-purple/5 rounded-xl text-left transition-all cursor-pointer group flex flex-col gap-1.5"
              >
                <Calendar size={14} className="text-gaming-blue group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider block">View Schedule</span>
              </button>
              <button
                onClick={() => setActiveTab('teams')}
                className="p-3 bg-white/3 border border-white/5 hover:border-gaming-purple/40 hover:bg-gaming-purple/5 rounded-xl text-left transition-all cursor-pointer group flex flex-col gap-1.5"
              >
                <Users size={14} className="text-pink-500 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider block">Find Team</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className="p-3 bg-white/3 border border-white/5 hover:border-gaming-purple/40 hover:bg-gaming-purple/5 rounded-xl text-left transition-all cursor-pointer group flex flex-col gap-1.5"
              >
                <User size={14} className="text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider block">Edit Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('teams')}
                className="p-3 bg-white/3 border border-white/5 hover:border-gaming-purple/40 hover:bg-gaming-purple/5 rounded-xl text-left transition-all cursor-pointer group flex flex-col gap-1.5"
              >
                <UserPlus size={14} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider block">Invite Players</span>
              </button>
              <button
                onClick={() => setActiveTab('support')}
                className="p-3 bg-white/3 border border-white/5 hover:border-gaming-purple/40 hover:bg-gaming-purple/5 rounded-xl text-left transition-all cursor-pointer group flex flex-col gap-1.5"
              >
                <FileText size={14} className="text-gray-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider block">Support Ticket</span>
              </button>
            </div>
          </div>
        </div>

        {/* Column 3: Recent Activity & Notifications alerts */}
        <div className="space-y-6">
          {/* Recent Activity Card */}
          <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <Activity size={13} className="text-gaming-purple" />
                Recent Activity
              </h3>
              <button
                onClick={() => setActiveTab('notifications')}
                className="text-[9px] text-gaming-blue hover:underline font-bold"
              >
                View All
              </button>
            </div>
            <div className="p-4 divide-y divide-white/5 max-h-[170px] overflow-y-auto no-scrollbar">
              {recentActivity.map(act => (
                <div key={act.id} className="py-2 flex items-start gap-2.5 text-xs text-left">
                  <div className="w-1.5 h-1.5 rounded-full bg-gaming-purple shrink-0 mt-1.5" />
                  <div className="flex-1">
                    <p className="text-gray-300 leading-normal">{act.text}</p>
                    <span className="text-[9px] text-gray-500 font-mono block mt-0.5">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications Card */}
          <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <Bell size={13} className="text-gaming-purple" />
                Notifications
              </h3>
              <button
                onClick={() => setActiveTab('notifications')}
                className="text-[9px] text-gaming-blue hover:underline font-bold"
              >
                View All
              </button>
            </div>
            <div className="p-4 divide-y divide-white/5 max-h-[170px] overflow-y-auto no-scrollbar">
              {notificationsList.length === 0 ? (
                <div className="py-6 text-center text-xs text-gray-500 italic">No notifications.</div>
              ) : (
                notificationsList.slice(0, 3).map(item => {
                  const IconComponent = iconMap[item.icon] || Bell;
                  return (
                    <div key={item.id} className="py-2.5 flex items-start gap-3">
                      <IconComponent size={14} className={`${item.color ? item.color.split(' ')[0] : 'text-gaming-purple'} shrink-0 mt-0.5`} />
                      <div>
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          {item.title}
                          {item.unread && <span className="w-1 h-1 rounded-full bg-gaming-purple inline-block" />}
                        </span>
                        <p className="text-[10px] text-gray-500 leading-normal font-light">{item.text}</p>
                        <span className="text-[8px] text-gray-600 font-mono block mt-0.5">{item.time}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
