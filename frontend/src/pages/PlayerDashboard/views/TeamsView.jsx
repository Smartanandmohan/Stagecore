import React, { useState } from 'react';
import { Users, Plus, ShieldCheck, Mail, ToggleLeft, ToggleRight, X, AlertTriangle, CheckCircle, BarChart3, Award, Trash2, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export const TeamsView = () => {
  const { user } = useAuth();
  
  // Custom states for Team management
  const [userTeam, setUserTeam] = useState(() => {
    try {
      const saved = localStorage.getItem('stagecore_user_team');
      if (saved) {
        if (saved === 'null') return null;
        return JSON.parse(saved);
      }
    } catch (e) {}

    // Default starting team details
    const defaultTeam = {
      name: 'Team Alpha',
      id: 'T_ALPHA_8271',
      game: 'Valorant',
      recruitmentOpen: true,
      roster: [
        { name: 'SentinelX', role: 'Captain / IGL', game: 'Valorant', rank: 'Conqueror', isMe: false },
        { name: user?.username || 'AnandYT', role: 'Player / Duelist', game: 'Valorant', rank: 'Diamond IV', isMe: true },
        { name: 'Jonathan_Jr', role: 'Player / Sentinel', game: 'Valorant', rank: 'Conqueror', isMe: false },
        { name: 'KillerFF', role: 'Player / Initiator', game: 'Valorant', rank: 'Ace', isMe: false },
        { name: 'RDX_Gamer', role: 'Player / Smoker', game: 'Valorant', rank: 'Conqueror', isMe: false }
      ]
    };
    localStorage.setItem('stagecore_user_team', JSON.stringify(defaultTeam));
    return defaultTeam;
  });

  const [inviteEmail, setInviteEmail] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [toast, setToast] = useState(null);

  // Create team inputs
  const [createName, setCreateName] = useState('');
  const [createGame, setCreateGame] = useState('Valorant');

  // Disband confirmation states
  const [showDisbandModal, setShowDisbandModal] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disbandError, setDisbandError] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggleRecruitment = () => {
    if (!userTeam) return;
    const newState = !userTeam.recruitmentOpen;
    const updatedTeam = {
      ...userTeam,
      recruitmentOpen: newState
    };
    setUserTeam(updatedTeam);
    localStorage.setItem('stagecore_user_team', JSON.stringify(updatedTeam));
    localStorage.setItem('team_recruitment_open', newState.toString());
    showToast(`Recruitment status set to ${newState ? 'OPEN' : 'CLOSED'}`);
    window.dispatchEvent(new Event('storage'));
  };

  // Add dynamic player invite
  const handleSendInvite = (e) => {
    e.preventDefault();
    if (!inviteEmail.trim() || !userTeam) return;

    const nickname = inviteEmail.trim().includes('@') 
      ? inviteEmail.trim().split('@')[0] 
      : inviteEmail.trim();

    const newPlayer = {
      name: nickname,
      role: 'Player',
      game: userTeam.game,
      rank: 'Ace',
      isMe: false
    };

    const updatedTeam = {
      ...userTeam,
      roster: [...userTeam.roster, newPlayer]
    };
    setUserTeam(updatedTeam);
    localStorage.setItem('stagecore_user_team', JSON.stringify(updatedTeam));

    // Log recent activity
    try {
      const savedActivities = localStorage.getItem('recent_activities');
      const activities = savedActivities ? JSON.parse(savedActivities) : [];
      const newActivity = {
        id: Date.now(),
        text: `You invited and added player "${nickname}" to your roster`,
        time: 'Just now',
        type: 'team'
      };
      localStorage.setItem('recent_activities', JSON.stringify([newActivity, ...activities]));
    } catch (err) {
      console.error(err);
    }

    setInviteEmail('');
    setShowInviteModal(false);
    showToast(`Roster invitation sent! Added ${nickname} to team.`);
    window.dispatchEvent(new Event('storage'));
  };

  // Kick member from roster
  const handleKickMember = (playerName) => {
    if (!userTeam) return;
    const updatedRoster = userTeam.roster.filter(m => m.name !== playerName);
    const updatedTeam = {
      ...userTeam,
      roster: updatedRoster
    };
    setUserTeam(updatedTeam);
    localStorage.setItem('stagecore_user_team', JSON.stringify(updatedTeam));

    // Log activity
    try {
      const saved = localStorage.getItem('recent_activities');
      const activities = saved ? JSON.parse(saved) : [];
      const newActivity = {
        id: Date.now(),
        text: `You removed player "${playerName}" from your team roster`,
        time: 'Just now',
        type: 'team'
      };
      localStorage.setItem('recent_activities', JSON.stringify([newActivity, ...activities]));
    } catch(e) {}

    showToast(`Player "${playerName}" removed from roster.`);
    window.dispatchEvent(new Event('storage'));
  };

  // Open password modal instead of direct disband
  const handleDisbandTeamClick = () => {
    setConfirmPassword('');
    setDisbandError(null);
    setShowDisbandModal(true);
  };

  // Disband current team with password check
  const handleDisbandTeamConfirm = (e) => {
    e.preventDefault();
    if (!confirmPassword.trim()) return;

    let isValid = false;
    const currentUsername = user?.username || 'AnandYT';
    const currentUsernameLower = currentUsername.toLowerCase();

    // 1. Check default admin/slayer accounts
    if (currentUsernameLower === 'admin' && confirmPassword === 'admin') {
      isValid = true;
    } else if (currentUsernameLower === 'slayer' && confirmPassword === 'slayer') {
      isValid = true;
    } else {
      // 2. Check mock registered users list
      try {
        const mockUsers = JSON.parse(localStorage.getItem('mock_users') || '[]');
        const found = mockUsers.find(u => u.username.toLowerCase() === currentUsernameLower);
        if (found && found.password === confirmPassword) {
          isValid = true;
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (!isValid) {
      setDisbandError('Incorrect password! Verification failed.');
      return;
    }

    const teamName = userTeam?.name;
    setUserTeam(null);
    localStorage.setItem('stagecore_user_team', 'null');
    localStorage.setItem('team_recruitment_open', 'false');

    // Log activity
    try {
      const saved = localStorage.getItem('recent_activities');
      const activities = saved ? JSON.parse(saved) : [];
      const newActivity = {
        id: Date.now(),
        text: `You disbanded your esports team: "${teamName}"`,
        time: 'Just now',
        type: 'team'
      };
      localStorage.setItem('recent_activities', JSON.stringify([newActivity, ...activities]));
    } catch(err) {}

    setShowDisbandModal(false);
    showToast(`Team disbanded successfully.`);
    window.dispatchEvent(new Event('storage'));
  };

  // Create new team submit
  const handleCreateTeamSubmit = (e) => {
    e.preventDefault();
    if (!createName.trim()) return;

    const newTeam = {
      name: createName.trim(),
      id: 'T_' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      game: createGame,
      recruitmentOpen: true,
      roster: [
        { name: user?.username || 'AnandYT', role: 'Captain / IGL', game: createGame, rank: 'Diamond IV', isMe: true }
      ]
    };
    
    setUserTeam(newTeam);
    localStorage.setItem('stagecore_user_team', JSON.stringify(newTeam));
    localStorage.setItem('team_recruitment_open', 'true');

    // Log activity
    try {
      const saved = localStorage.getItem('recent_activities');
      const activities = saved ? JSON.parse(saved) : [];
      const newActivity = {
        id: Date.now(),
        text: `You created a new esports team: "${createName.trim()}"`,
        time: 'Just now',
        type: 'team'
      };
      localStorage.setItem('recent_activities', JSON.stringify([newActivity, ...activities]));
    } catch(e) {}

    setCreateName('');
    showToast(`Team "${createName.trim()}" created successfully!`);
    window.dispatchEvent(new Event('storage'));
  };

  const teamAchievements = [
    { title: 'Cup Finalist', desc: 'Placed runner-up in BGMI Masters Cup', date: 'April 2026', icon: '🏆' },
    { title: 'Clean Sweep', desc: 'Won 5 bracket matches with 2-0 scores', date: 'May 2026', icon: '🔥' }
  ];

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border border-gaming-purple/40 bg-[#090d22] text-white transition-all duration-300">
          <CheckCircle size={16} className="text-gaming-purple flex-shrink-0" />
          <span className="text-sm font-semibold">{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <Users className="text-gaming-purple" size={24} />
            {userTeam ? `My Team: ${userTeam.name}` : 'Roster Management'}
          </h1>
          <p className="text-xs text-gray-400 font-semibold tracking-wider mt-1">
            Manage roster positions, toggle recruitment flags, and view championship history.
          </p>
        </div>
        {userTeam && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gaming-purple hover:bg-gaming-purple/80 text-white text-xs font-bold rounded-xl transition-all shadow-[0_0_12px_rgba(124,58,237,0.3)] cursor-pointer uppercase tracking-wider whitespace-nowrap"
            >
              <Plus size={14} />
              Invite Players
            </button>
            <button
              onClick={handleDisbandTeamClick}
              className="px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-bold rounded-xl transition-all cursor-pointer uppercase tracking-wider whitespace-nowrap"
            >
              Disband Team
            </button>
          </div>
        )}
      </div>

      {/* NO ACTIVE TEAM VIEW: CREATE TEAM WIZARD */}
      {!userTeam ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          <div className="lg:col-span-2 glass-panel border border-white/5 rounded-2xl p-6 bg-[#03050f]/30 flex flex-col items-center justify-center text-center py-20 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/3 border border-white/5 flex items-center justify-center text-gray-500">
              <Users size={32} />
            </div>
            <div>
              <h2 className="text-lg font-black text-white uppercase tracking-wider">No Active Esports Team</h2>
              <p className="text-xs text-gray-500 leading-normal max-w-sm mt-1 mx-auto">
                You are currently a free agent. Create your own competitive roster team now to register for upcoming StageCore cups!
              </p>
            </div>
          </div>

          <div className="glass-panel border border-white/5 rounded-2xl p-5 bg-[#03050f]/60 space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-wider">Create Roster Team</h3>
            
            <form onSubmit={handleCreateTeamSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Team Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Velocity Gaming / True Rippers"
                  value={createName}
                  onChange={(e) => setCreateName(e.target.value)}
                  className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-2.5 text-[11px] text-white focus:outline-none focus:border-gaming-purple/40 placeholder-gray-600 font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Primary Game Title</label>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  {['Valorant', 'BGMI', 'Free Fire', 'CS2'].map(game => (
                    <button
                      key={game}
                      type="button"
                      onClick={() => setCreateGame(game)}
                      className={`p-2 rounded-xl text-left border font-bold truncate transition-all cursor-pointer ${
                        createGame === game
                          ? 'bg-gaming-purple/20 border-gaming-purple text-white'
                          : 'bg-white/3 border-white/5 text-gray-400 hover:text-white'
                      }`}
                    >
                      {game}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gaming-purple hover:bg-gaming-purple/90 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md shadow-gaming-purple/20"
              >
                Create new team
              </button>
            </form>
          </div>

        </div>
      ) : (
        /* MANAGE ACTIVE TEAM VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: Roster List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <Users size={14} className="text-gaming-purple" />
                Roster Members ({userTeam.roster.length} / 6)
              </h3>
              <span className="text-[10px] text-gray-500 font-bold uppercase">Team ID: {userTeam.id}</span>
            </div>

            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-400 font-extrabold uppercase tracking-widest text-[9px] bg-white/[0.01]">
                      <th className="px-5 py-3">Player Name</th>
                      <th className="px-5 py-3">Roster Role</th>
                      <th className="px-5 py-3">Primary Game</th>
                      <th className="px-5 py-3">Game Rank</th>
                      <th className="px-5 py-3 text-right">Roster Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300 font-medium">
                    {userTeam.roster.map((player, idx) => (
                      <tr key={idx} className="hover:bg-white/2 transition-colors duration-150">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${player.isMe ? 'from-gaming-purple to-gaming-blue' : 'from-gray-700 to-gray-800'} flex items-center justify-center font-black text-xs text-white`}>
                              {player.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <span className="font-bold text-white block">
                                {player.name} {player.isMe && <span className="text-[8px] px-1.5 py-0.5 rounded bg-gaming-purple/20 text-gaming-purple border border-gaming-purple/35 font-black uppercase ml-1">ME</span>}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-gray-400">{player.role}</td>
                        <td className="px-5 py-3.5">
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-bold text-gray-500 uppercase">{player.game}</span>
                        </td>
                        <td className="px-5 py-3.5 font-mono text-gaming-blue font-bold">{player.rank}</td>
                        <td className="px-5 py-3.5 text-right">
                          {!player.isMe ? (
                            <button
                              onClick={() => handleKickMember(player.name)}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors cursor-pointer"
                              title="Kick member from roster"
                            >
                              <Trash2 size={13} />
                            </button>
                          ) : (
                            <span className="text-[8px] text-gray-600 font-mono font-bold uppercase">IGL Owner</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right: Team Statistics & Recruitment */}
          <div className="space-y-6">
            {/* Recruitment open toggle */}
            <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-[#03050f]/60 space-y-4">
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <ToggleLeft size={16} className="text-gaming-purple shrink-0" />
                Recruitment Status
              </h3>
              
              <div className="flex items-center justify-between p-3 bg-white/3 border border-white/5 rounded-xl">
                <div>
                  <span className="text-[10px] text-white font-bold block">Recruitment Status</span>
                  <span className="text-[9px] text-gray-500 font-medium">Allow other players to apply</span>
                </div>
                <button
                  onClick={handleToggleRecruitment}
                  className="cursor-pointer transition-transform hover:scale-105"
                >
                  {userTeam.recruitmentOpen ? (
                    <ToggleRight size={28} className="text-gaming-purple" />
                  ) : (
                    <ToggleLeft size={28} className="text-gray-600" />
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                <div className="bg-white/3 border border-white/5 rounded-xl p-3">
                  <span className="text-[9px] text-gray-500 font-extrabold uppercase">Win Rate</span>
                  <span className="text-gaming-purple font-black text-sm block mt-0.5">68% Win Rate</span>
                </div>
                <div className="bg-white/3 border border-white/5 rounded-xl p-3">
                  <span className="text-[9px] text-gray-500 font-extrabold uppercase">Ranking</span>
                  <span className="text-gaming-blue font-black text-sm block mt-0.5">Rank #14</span>
                </div>
              </div>
            </div>

            {/* Team achievements */}
            <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-[#03050f]/60 space-y-4">
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <Award size={14} className="text-gaming-purple" />
                Team Accomplishments
              </h3>

              <div className="space-y-3">
                {teamAchievements.map((ach, idx) => (
                  <div key={idx} className="flex gap-3 p-3 bg-white/3 border border-white/5 rounded-xl text-xs">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-black text-sm shrink-0">
                      {ach.icon}
                    </div>
                    <div>
                      <span className="font-bold text-white block">{ach.title}</span>
                      <p className="text-[9px] text-gray-500 leading-normal font-medium mt-0.5">{ach.desc} • {ach.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* INVITE ROSTER MODAL */}
      {showInviteModal && userTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowInviteModal(false)} />
          <div className="relative glass-panel border border-gaming-purple/30 rounded-2xl p-6 max-w-sm w-full bg-[#050816] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Mail size={16} className="text-gaming-purple" />
                Invite Player to Roster
              </h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-1 text-gray-500 hover:text-white rounded-lg cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSendInvite} className="space-y-4">
              <p className="text-xs text-gray-400 leading-relaxed text-left">
                Enter the player's username or email address to dispatch an official {userTeam.name} roster invite request.
              </p>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Player Username / Email</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SlayerX / player@gmail.com"
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 transition-all placeholder-gray-600 font-semibold"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 py-2.5 text-xs font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-bold text-white bg-gaming-purple hover:bg-gaming-purple/85 rounded-xl transition-all cursor-pointer uppercase tracking-wider shadow-md shadow-gaming-purple/20"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DISBAND CONFIRM PASSWORD MODAL */}
      {showDisbandModal && userTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowDisbandModal(false)} />
          <div className="relative glass-panel border border-red-500/30 rounded-2xl p-6 max-w-sm w-full bg-[#050816] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert size={16} className="text-red-400" />
                Disband Team
              </h3>
              <button
                onClick={() => setShowDisbandModal(false)}
                className="p-1 text-gray-500 hover:text-white rounded-lg cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleDisbandTeamConfirm} className="space-y-4">
              <p className="text-xs text-gray-400 leading-relaxed text-left">
                Disbanding <strong>{userTeam.name}</strong> will remove all members from the roster permanently. Please type your login password to authorize this action.
              </p>

              {disbandError && (
                <div className="text-[10px] text-red-400 font-extrabold uppercase bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-xl text-left animate-fadeIn">
                  {disbandError}
                </div>
              )}

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Login Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter your login password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-red-500/40 transition-all font-semibold"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowDisbandModal(false)}
                  className="flex-1 py-2.5 text-xs font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-all cursor-pointer uppercase tracking-wider shadow-md shadow-red-500/20"
                >
                  Confirm Disband
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
