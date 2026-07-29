import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Trash2, 
  Pencil, 
  Eye, 
  Ban, 
  CheckCircle, 
  X, 
  AlertTriangle,
  Flag,
  Globe,
  Award,
  ShieldAlert,
  Plus
} from 'lucide-react';

const INITIAL_PLAYERS = [
  { id: 1, ign: 'SlayerX', team: 'Velocity Gaming', country: 'India', rank: 'Immortal', status: 'ACTIVE', avatarColor: 'from-purple-600 to-indigo-600', banReason: '' },
  { id: 2, ign: 'JONATHAN', team: 'GodLike Esports', country: 'India', rank: 'Conqueror', status: 'ACTIVE', avatarColor: 'from-red-500 to-amber-600', banReason: '' },
  { id: 3, ign: 'Mortal', team: 'Team Soul', country: 'India', rank: 'Ace', status: 'ACTIVE', avatarColor: 'from-teal-500 to-emerald-600', banReason: '' },
  { id: 4, ign: 'ShadowX', team: 'Team Alpha', country: 'India', rank: 'Diamond III', status: 'ACTIVE', avatarColor: 'from-blue-600 to-cyan-500', banReason: '' },
  { id: 5, ign: 'CheaterXYZ', team: 'None', country: 'United States', rank: 'Platinum I', status: 'BANNED', avatarColor: 'from-gray-700 to-gray-800', banReason: 'Aimbot / ESP hacks flagged by server anti-cheat hook on May 28.' },
  { id: 6, ign: 'Viper', team: 'Entity Gaming', country: 'India', rank: 'Global Elite', status: 'ACTIVE', avatarColor: 'from-pink-500 to-rose-600', banReason: '' },
  { id: 7, ign: 'Coldzera_In', team: 'Team Echo', country: 'Brazil', rank: 'Legendary Eagle', status: 'ACTIVE', avatarColor: 'from-fuchsia-600 to-purple-600', banReason: '' },
  { id: 8, ign: 'ToxicGamer', team: 'None', country: 'Canada', rank: 'Gold Nova', status: 'BANNED', avatarColor: 'from-red-700 to-rose-800', banReason: 'Repeated toxic voice comms and chat abuse reported by 8 match moderators.' }
];

export default function PlayerList({ defaultOpenCreate = false }) {
  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem('stagecore_admin_players');
    return saved ? JSON.parse(saved) : INITIAL_PLAYERS;
  });

  // Local storage persistence
  useEffect(() => {
    localStorage.setItem('stagecore_admin_players', JSON.stringify(players));
  }, [players]);

  // Toolbar state
  const [searchTerm, setSearchTerm] = useState('');
  const [rankFilter, setRankFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals state
  const [viewTarget, setViewTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [banTarget, setBanTarget] = useState(null); // Active player target for Ban modal
  
  // Ban Form Reason State
  const [banReason, setBanReason] = useState('');

  // Form Fields State (for Edit Modal & Create if needed)
  const [showCreateModal, setShowCreateModal] = useState(defaultOpenCreate);
  const [formIgn, setFormIgn] = useState('');
  const [formTeam, setFormTeam] = useState('None');
  const [formCountry, setFormCountry] = useState('India');
  const [formRank, setFormRank] = useState('Diamond');
  const [formStatus, setFormStatus] = useState('ACTIVE');

  // Extract unique ranks for rank filter list
  const uniqueRanks = ['ALL', ...new Set(players.map(p => p.rank.split(' ')[0]))];

  // Open Edit Modal
  const handleOpenEdit = (player) => {
    setFormIgn(player.ign);
    setFormTeam(player.team || 'None');
    setFormCountry(player.country || 'India');
    setFormRank(player.rank || 'Diamond');
    setFormStatus(player.status || 'ACTIVE');
    setEditTarget(player);
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setFormIgn('');
    setFormTeam('None');
    setFormCountry('India');
    setFormRank('Diamond');
    setFormStatus('ACTIVE');
    setShowCreateModal(true);
  };

  // Save Player Changes (Edit)
  const handleSavePlayer = (e) => {
    e.preventDefault();
    if (!formIgn.trim()) return;

    if (editTarget) {
      const updated = players.map(p => 
        p.id === editTarget.id 
          ? { 
              ...p, 
              ign: formIgn, 
              team: formTeam, 
              country: formCountry, 
              rank: formRank, 
              status: formStatus 
            } 
          : p
      );
      setPlayers(updated);
      setEditTarget(null);
    }
  };

  // Create Player
  const handleCreatePlayer = (e) => {
    e.preventDefault();
    if (!formIgn.trim()) return;

    const gradients = [
      'from-purple-600 to-indigo-600',
      'from-amber-500 to-red-600',
      'from-teal-500 to-emerald-600',
      'from-blue-600 to-cyan-500',
      'from-pink-500 to-rose-600'
    ];
    const randomGrad = gradients[Math.floor(Math.random() * gradients.length)];

    const newPlayer = {
      id: Date.now(),
      ign: formIgn,
      team: formTeam,
      country: formCountry,
      rank: formRank,
      status: formStatus,
      avatarColor: randomGrad,
      banReason: ''
    };

    setPlayers([...players, newPlayer]);
    setShowCreateModal(false);
  };

  // Ban Player Action Submit
  const handleBanSubmit = (e) => {
    e.preventDefault();
    if (!banTarget || !banReason.trim()) return;

    const updated = players.map(p => 
      p.id === banTarget.id 
        ? { ...p, status: 'BANNED', banReason: banReason } 
        : p
    );
    setPlayers(updated);
    setBanTarget(null);
    setBanReason('');
  };

  // Unban Player Action
  const handleUnbanPlayer = (id) => {
    const updated = players.map(p => 
      p.id === id ? { ...p, status: 'ACTIVE', banReason: '' } : p
    );
    setPlayers(updated);
  };

  // Delete Player
  const handleDeletePlayer = () => {
    if (!deleteTarget) return;
    const updated = players.filter(p => p.id !== deleteTarget.id);
    setPlayers(updated);
    setDeleteTarget(null);
  };

  // Filter Logic
  const filteredPlayers = players.filter(p => {
    const matchesSearch = p.ign.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.team.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRank = rankFilter === 'ALL' || p.rank.toLowerCase().includes(rankFilter.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesRank && matchesStatus;
  });

  return (
    <div className="space-y-6 text-gray-200 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <Users className="text-gaming-purple" size={24} />
            Player Management
          </h1>
          <p className="text-xs text-gray-400 font-semibold tracking-wider mt-1">
            Browse player credentials, ranks, bans, and linked teams.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-gaming-purple hover:bg-gaming-purple/80 text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-[0_0_15px_rgba(124,58,237,0.3)] cursor-pointer uppercase tracking-wider"
        >
          <Plus size={14} />
          Create Player
        </button>
      </div>

      {/* Toolbar / Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {/* Search */}
        <div className="relative md:col-span-2">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by In-Game Name (IGN) or Team..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-gaming-purple/60 placeholder-gray-600 transition-all duration-200"
          />
        </div>

        {/* Rank Tier Filter */}
        <div className="relative flex items-center">
          <Award size={12} className="absolute left-3 text-gray-500" />
          <select
            value={rankFilter}
            onChange={(e) => setRankFilter(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl pl-8 pr-3 py-2.5 outline-none cursor-pointer focus:border-gaming-purple/60 transition-colors appearance-none"
          >
            <option value="ALL">All Rank Tiers</option>
            {uniqueRanks.filter(r => r !== 'ALL').map((rank) => (
              <option key={rank} value={rank}>{rank}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="relative flex items-center">
          <ShieldAlert size={12} className="absolute left-3 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl pl-8 pr-3 py-2.5 outline-none cursor-pointer focus:border-gaming-purple/60 transition-colors appearance-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="BANNED">BANNED</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        {filteredPlayers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Users size={48} className="text-gray-700 mb-3" />
            <h3 className="text-sm font-bold text-white mb-1">No players matched</h3>
            <p className="text-xs text-gray-500 max-w-xs">Change filters or enter a different IGN search query.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[850px]">
              <thead>
                <tr className="border-b border-white/5 text-gray-400 font-extrabold uppercase tracking-widest text-[9px] bg-white/[0.01]">
                  <th className="px-5 py-4 w-20">Avatar</th>
                  <th className="px-5 py-4">In-Game Name (IGN)</th>
                  <th className="px-5 py-4">Linked Team</th>
                  <th className="px-5 py-4">Country</th>
                  <th className="px-5 py-4">Rank</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium text-gray-300">
                {filteredPlayers.map((player) => (
                  <tr key={player.id} className="group hover:bg-white/[0.02] transition-colors duration-150">
                    
                    {/* Avatar Initials */}
                    <td className="px-5 py-4">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${player.avatarColor || 'from-gray-700 to-gray-800'} flex items-center justify-center font-black text-xs text-white shadow-lg`}>
                        {player.ign.slice(0, 2).toUpperCase()}
                      </div>
                    </td>

                    {/* IGN */}
                    <td className="px-5 py-4">
                      <span className="font-bold text-white group-hover:text-gaming-purple transition-colors block text-xs">
                        {player.ign}
                      </span>
                    </td>

                    {/* Linked Team */}
                    <td className="px-5 py-4">
                      {player.team && player.team !== 'None' ? (
                        <span className="text-gray-200 font-semibold">{player.team}</span>
                      ) : (
                        <span className="text-gray-500 font-semibold italic">Unattached</span>
                      )}
                    </td>

                    {/* Country */}
                    <td className="px-5 py-4 text-gray-400">
                      <div className="flex items-center gap-1">
                        <Globe size={11} className="text-gray-600" />
                        <span>{player.country}</span>
                      </div>
                    </td>

                    {/* Rank */}
                    <td className="px-5 py-4">
                      <span className="text-gaming-blue font-bold font-mono text-[11px]">
                        {player.rank}
                      </span>
                    </td>

                    {/* Status badge */}
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                        player.status === 'ACTIVE' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-red-500/10 text-red-400 border-red-500/20 animate-pulse'
                      }`}>
                        {player.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setViewTarget(player)}
                          title="View Profile History"
                          className="p-2 text-gray-500 hover:text-gaming-blue hover:bg-gaming-blue/10 rounded-lg transition-all cursor-pointer"
                        >
                          <Eye size={13} />
                        </button>
                        
                        <button
                          onClick={() => handleOpenEdit(player)}
                          title="Edit Details"
                          className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer"
                        >
                          <Pencil size={13} />
                        </button>

                        {player.status === 'ACTIVE' ? (
                          <button
                            onClick={() => setBanTarget(player)}
                            title="Ban Player"
                            className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                          >
                            <Ban size={13} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUnbanPlayer(player.id)}
                            title="Unban Player"
                            className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all cursor-pointer"
                          >
                            <CheckCircle size={13} />
                          </button>
                        )}

                        <button
                          onClick={() => setDeleteTarget(player)}
                          title="Delete Player"
                          className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* VIEW PROFILE MODAL */}
      {viewTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setViewTarget(null)} />
          <div className="relative glass-panel border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-[0_0_35px_rgba(255,255,255,0.05)]">
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <Users size={16} className="text-gaming-purple" />
                Player Dossier
              </h3>
              <button onClick={() => setViewTarget(null)} className="p-1 text-gray-500 hover:text-white cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${viewTarget.avatarColor} flex items-center justify-center font-black text-sm text-white`}>
                  {viewTarget.ign.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">{viewTarget.ign}</h4>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                    Rank: {viewTarget.rank}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-white/5 p-3 rounded-xl border border-white/5">
                <div>
                  <span className="text-[9px] text-gray-500 font-extrabold uppercase tracking-widest block">Team</span>
                  <span className="text-gray-300 font-bold">{viewTarget.team || 'Unattached'}</span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-500 font-extrabold uppercase tracking-widest block">Country</span>
                  <span className="text-gray-300 font-bold">{viewTarget.country}</span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-500 font-extrabold uppercase tracking-widest block">K/D Ratio</span>
                  <span className="text-gaming-blue font-bold font-mono">1.42</span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-500 font-extrabold uppercase tracking-widest block">Win Rate</span>
                  <span className="text-gaming-purple font-bold font-mono">68.5%</span>
                </div>
              </div>

              {viewTarget.status === 'BANNED' && (
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-xs space-y-1">
                  <span className="text-red-400 font-black uppercase tracking-wider text-[10px] flex items-center gap-1">
                    <Flag size={12} /> Ban Record Details
                  </span>
                  <p className="text-gray-400 leading-relaxed italic text-[11px]">
                    "{viewTarget.banReason || 'No details provided.'}"
                  </p>
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-white/5 text-right">
              <button
                onClick={() => setViewTarget(null)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-xs font-bold text-white rounded-xl transition-all cursor-pointer uppercase tracking-wider"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE PLAYER MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowCreateModal(false)} />
          <div className="relative glass-panel border border-gaming-purple/30 rounded-2xl p-6 max-w-md w-full shadow-[0_0_35px_rgba(124,58,237,0.15)]">
            <div className="flex items-center justify-between mb-5 border-b border-white/5 pb-3">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Users size={16} className="text-gaming-purple" />
                Create Player Profile
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1 text-gray-500 hover:text-white cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreatePlayer} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">In-Game Name (IGN)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SlayerX"
                  value={formIgn}
                  onChange={(e) => setFormIgn(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 transition-all placeholder-gray-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Linked Team</label>
                  <input
                    type="text"
                    placeholder="e.g. Velocity Gaming / None"
                    value={formTeam}
                    onChange={(e) => setFormTeam(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 transition-all placeholder-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Country</label>
                  <input
                    type="text"
                    placeholder="e.g. India / United States"
                    value={formCountry}
                    onChange={(e) => setFormCountry(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 transition-all placeholder-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Tier Rank</label>
                  <input
                    type="text"
                    placeholder="e.g. Immortal / Conqueror"
                    value={formRank}
                    onChange={(e) => setFormRank(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 transition-all placeholder-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 cursor-pointer"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="BANNED">BANNED</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/5 pt-4 mt-5">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white transition-all cursor-pointer uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gaming-purple hover:bg-gaming-purple/80 text-white text-xs font-bold rounded-xl transition-all shadow-[0_0_12px_rgba(124,58,237,0.35)] cursor-pointer uppercase tracking-wider"
                >
                  Create Player
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setEditTarget(null)} />
          <div className="relative glass-panel border border-gaming-purple/30 rounded-2xl p-6 max-w-md w-full shadow-[0_0_35px_rgba(124,58,237,0.15)]">
            <div className="flex items-center justify-between mb-5 border-b border-white/5 pb-3">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Pencil size={16} className="text-gaming-purple" />
                Edit Player Details
              </h3>
              <button onClick={() => setEditTarget(null)} className="p-1 text-gray-500 hover:text-white cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSavePlayer} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">In-Game Name (IGN)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SlayerX"
                  value={formIgn}
                  onChange={(e) => setFormIgn(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 transition-all placeholder-gray-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Linked Team</label>
                  <input
                    type="text"
                    value={formTeam}
                    onChange={(e) => setFormTeam(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 transition-all placeholder-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Country</label>
                  <input
                    type="text"
                    value={formCountry}
                    onChange={(e) => setFormCountry(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 transition-all placeholder-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Tier Rank</label>
                  <input
                    type="text"
                    value={formRank}
                    onChange={(e) => setFormRank(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 transition-all placeholder-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 cursor-pointer"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="BANNED">BANNED</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/5 pt-4 mt-5">
                <button
                  type="button"
                  onClick={() => setEditTarget(null)}
                  className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white transition-all cursor-pointer uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gaming-purple hover:bg-gaming-purple/80 text-white text-xs font-bold rounded-xl transition-all shadow-[0_0_12px_rgba(124,58,237,0.35)] cursor-pointer uppercase tracking-wider"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BAN CONFIRMATION REASON MODAL */}
      {banTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setBanTarget(null)} />
          <div className="relative glass-panel border border-red-500/30 rounded-2xl p-6 max-w-sm w-full shadow-[0_0_35px_rgba(239,68,68,0.15)]">
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
              <h3 className="text-sm font-black text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <Ban size={16} /> Ban Player: {banTarget.ign}
              </h3>
              <button onClick={() => setBanTarget(null)} className="p-1 text-gray-500 hover:text-white cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleBanSubmit} className="space-y-4">
              <p className="text-xs text-gray-400 leading-relaxed">
                Provide the infraction reason to ban this player. The account's team association will remain frozen during the ban.
              </p>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Reason for Ban</label>
                <textarea
                  required
                  rows="3"
                  placeholder="e.g. Server wallhack hook alert / toxic verbal abuse..."
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2 outline-none focus:border-red-500 transition-all placeholder-gray-600 resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setBanTarget(null)}
                  className="flex-1 py-2 text-xs font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-bold text-white bg-red-500/80 hover:bg-red-500 rounded-xl transition-all cursor-pointer uppercase tracking-wider"
                >
                  Confirm Ban
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
          <div className="relative glass-panel border border-red-500/30 rounded-2xl p-6 max-w-sm w-full shadow-[0_0_35px_rgba(239,68,68,0.15)]">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <AlertTriangle size={22} className="text-red-400 animate-bounce" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider mb-1">Delete Player?</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Are you sure you want to delete profile <span className="text-white font-bold">"{deleteTarget.ign}"</span>? This will wipe their team ranking stats completely.
                </p>
              </div>
              <div className="flex gap-3 w-full mt-2">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-2 text-xs font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeletePlayer}
                  className="flex-1 py-2 text-xs font-bold text-white bg-red-500/80 hover:bg-red-500 rounded-xl transition-all cursor-pointer uppercase tracking-wider"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
