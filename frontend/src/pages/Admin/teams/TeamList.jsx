import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Check, 
  AlertOctagon, 
  Trash2, 
  Pencil, 
  X, 
  AlertTriangle,
  UserCheck,
  Ban,
  Filter
} from 'lucide-react';

const INITIAL_TEAMS = [
  { id: 1, name: 'Velocity Gaming', captain: 'SentinelX', game: 'Valorant', playersCount: 5, status: 'APPROVED', logoColor: 'from-purple-600 to-indigo-600' },
  { id: 2, name: 'GodLike Esports', captain: 'Jonathan_Jr', game: 'BGMI', playersCount: 6, status: 'APPROVED', logoColor: 'from-amber-500 to-red-600' },
  { id: 3, name: 'Team Alpha', captain: 'ShadowX', game: 'Valorant', playersCount: 5, status: 'PENDING', logoColor: 'from-cyan-500 to-blue-500' },
  { id: 4, name: 'Reckoning Esports', captain: 'Hellranger', game: 'CS2', playersCount: 5, status: 'APPROVED', logoColor: 'from-emerald-500 to-teal-500' },
  { id: 5, name: 'Team Bravo', captain: 'CaptainDead', game: 'BGMI', playersCount: 4, status: 'PENDING', logoColor: 'from-pink-500 to-rose-500' },
  { id: 6, name: 'Entity Gaming', captain: 'ViperCS', game: 'CS2', playersCount: 5, status: 'SUSPENDED', logoColor: 'from-orange-500 to-yellow-500' },
  { id: 7, name: 'Team Delta', captain: 'KillerFF', game: 'Free Fire', playersCount: 4, status: 'APPROVED', logoColor: 'from-fuchsia-500 to-purple-500' },
  { id: 8, name: 'Team Echo', captain: 'Coldzera_In', game: 'CS2', playersCount: 5, status: 'PENDING', logoColor: 'from-blue-600 to-cyan-500' }
];

export default function TeamList({ defaultOpenCreate = false }) {
  const [teams, setTeams] = useState(() => {
    const saved = localStorage.getItem('stagecore_admin_teams');
    return saved ? JSON.parse(saved) : INITIAL_TEAMS;
  });

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('stagecore_admin_teams', JSON.stringify(teams));
  }, [teams]);

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [gameFilter, setGameFilter] = useState('ALL');

  // Modals state
  const [showFormModal, setShowFormModal] = useState(defaultOpenCreate);
  const [editingTeam, setEditingTeam] = useState(null); // null = Create, {...} = Edit
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Form Fields State
  const [formName, setFormName] = useState('');
  const [formCaptain, setFormCaptain] = useState('');
  const [formGame, setFormGame] = useState('Valorant');
  const [formPlayers, setFormPlayers] = useState(5);
  const [formStatus, setFormStatus] = useState('PENDING');

  // Open create modal
  const handleOpenCreate = () => {
    setFormName('');
    setFormCaptain('');
    setFormGame('Valorant');
    setFormPlayers(5);
    setFormStatus('PENDING');
    setEditingTeam(null);
    setShowFormModal(true);
  };

  // Open edit modal
  const handleOpenEdit = (team) => {
    setFormName(team.name);
    setFormCaptain(team.captain);
    setFormGame(team.game);
    setFormPlayers(team.playersCount);
    setFormStatus(team.status);
    setEditingTeam(team);
    setShowFormModal(true);
  };

  // Save team (Create / Update)
  const handleSaveTeam = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formCaptain.trim()) return;

    if (editingTeam) {
      // Update
      const updated = teams.map(t => 
        t.id === editingTeam.id 
          ? { 
              ...t, 
              name: formName, 
              captain: formCaptain, 
              game: formGame, 
              playersCount: Number(formPlayers), 
              status: formStatus 
            } 
          : t
      );
      setTeams(updated);
    } else {
      // Create
      const gradients = [
        'from-purple-600 to-indigo-600',
        'from-amber-500 to-red-600',
        'from-cyan-500 to-blue-500',
        'from-emerald-500 to-teal-500',
        'from-pink-500 to-rose-500'
      ];
      const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
      const newTeam = {
        id: Date.now(),
        name: formName,
        captain: formCaptain,
        game: formGame,
        playersCount: Number(formPlayers),
        status: formStatus,
        logoColor: randomGradient
      };
      setTeams([...teams, newTeam]);
    }
    setShowFormModal(false);
  };

  // Approve a pending team
  const handleApproveTeam = (id) => {
    const updated = teams.map(t => t.id === id ? { ...t, status: 'APPROVED' } : t);
    setTeams(updated);
  };

  // Suspend a team
  const handleSuspendTeam = (id) => {
    const updated = teams.map(t => t.id === id ? { ...t, status: 'SUSPENDED' } : t);
    setTeams(updated);
  };

  // Delete team
  const handleDeleteTeam = () => {
    if (!deleteTarget) return;
    const updated = teams.filter(t => t.id !== deleteTarget.id);
    setTeams(updated);
    setDeleteTarget(null);
  };

  // Approve all pending teams at once
  const handleApproveAllPending = () => {
    const updated = teams.map(t => t.status === 'PENDING' ? { ...t, status: 'APPROVED' } : t);
    setTeams(updated);
  };

  // Filter logic
  const filteredTeams = teams.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.captain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    const matchesGame = gameFilter === 'ALL' || t.game === gameFilter;
    return matchesSearch && matchesStatus && matchesGame;
  });

  const pendingCount = teams.filter(t => t.status === 'PENDING').length;

  return (
    <div className="space-y-6 text-gray-200 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <Users className="text-gaming-purple" size={24} />
            Team Management
          </h1>
          <p className="text-xs text-gray-400 font-semibold tracking-wider mt-1">
            Approve registrations, manage team lists, suspension logs, and team structures.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {pendingCount > 0 && (
            <button
              onClick={handleApproveAllPending}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-xl transition-all cursor-pointer uppercase tracking-wider"
            >
              <UserCheck size={14} />
              Approve Pending ({pendingCount})
            </button>
          )}
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-5 py-2.5 bg-gaming-purple hover:bg-gaming-purple/80 text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-[0_0_15px_rgba(124,58,237,0.3)] cursor-pointer uppercase tracking-wider whitespace-nowrap"
          >
            <Plus size={14} />
            Create Team
          </button>
        </div>
      </div>

      {/* Toolbar / Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {/* Search */}
        <div className="relative md:col-span-2">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by team name or captain..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-gaming-purple/60 placeholder-gray-600 transition-all duration-200"
          />
        </div>

        {/* Status Filter */}
        <div className="relative flex items-center">
          <Filter size={12} className="absolute left-3 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl pl-8 pr-3 py-2.5 outline-none cursor-pointer focus:border-gaming-purple/60 transition-colors appearance-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="APPROVED">APPROVED</option>
            <option value="PENDING">PENDING</option>
            <option value="SUSPENDED">SUSPENDED</option>
          </select>
        </div>

        {/* Game Filter */}
        <div className="relative flex items-center">
          <Filter size={12} className="absolute left-3 text-gray-500" />
          <select
            value={gameFilter}
            onChange={(e) => setGameFilter(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl pl-8 pr-3 py-2.5 outline-none cursor-pointer focus:border-gaming-purple/60 transition-colors appearance-none"
          >
            <option value="ALL">All Games</option>
            <option value="Valorant">Valorant</option>
            <option value="BGMI">BGMI</option>
            <option value="CS2">CS2</option>
            <option value="Free Fire">Free Fire</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        {filteredTeams.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Users size={48} className="text-gray-700 mb-3" />
            <h3 className="text-sm font-bold text-white mb-1">No teams found</h3>
            <p className="text-xs text-gray-500 max-w-xs">Try clearing search parameters or status filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[850px]">
              <thead>
                <tr className="border-b border-white/5 text-gray-400 font-extrabold uppercase tracking-widest text-[9px] bg-white/[0.01]">
                  <th className="px-5 py-4 w-24">Logo</th>
                  <th className="px-5 py-4">Team Name</th>
                  <th className="px-5 py-4">Captain</th>
                  <th className="px-5 py-4">Game</th>
                  <th className="px-5 py-4 text-center">Players Count</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium text-gray-300">
                {filteredTeams.map((team) => (
                  <tr key={team.id} className="group hover:bg-white/[0.02] transition-colors duration-150">
                    
                    {/* Logo Avatar initials */}
                    <td className="px-5 py-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${team.logoColor || 'from-gray-700 to-gray-800'} flex items-center justify-center font-black text-xs text-white shadow-lg`}>
                        {team.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                    </td>

                    {/* Team Name */}
                    <td className="px-5 py-4 font-bold text-white group-hover:text-gaming-purple transition-colors">
                      {team.name}
                    </td>

                    {/* Captain */}
                    <td className="px-5 py-4 text-gray-200 font-semibold">{team.captain}</td>

                    {/* Game */}
                    <td className="px-5 py-4">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-gray-400 font-bold uppercase">
                        {team.game}
                      </span>
                    </td>

                    {/* Players Count */}
                    <td className="px-5 py-4 text-center font-mono font-bold text-gray-400">
                      {team.playersCount} / 6
                    </td>

                    {/* Status Badge */}
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                        team.status === 'APPROVED' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : team.status === 'PENDING'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse'
                          : 'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}>
                        {team.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {team.status === 'PENDING' && (
                          <button
                            onClick={() => handleApproveTeam(team.id)}
                            title="Approve Team"
                            className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all cursor-pointer"
                          >
                            <Check size={13} />
                          </button>
                        )}

                        {team.status === 'APPROVED' && (
                          <button
                            onClick={() => handleSuspendTeam(team.id)}
                            title="Suspend Team"
                            className="p-2 text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all cursor-pointer"
                          >
                            <Ban size={13} />
                          </button>
                        )}

                        {team.status === 'SUSPENDED' && (
                          <button
                            onClick={() => handleApproveTeam(team.id)}
                            title="Re-Approve Team"
                            className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all cursor-pointer"
                          >
                            <Check size={13} />
                          </button>
                        )}

                        <button
                          onClick={() => handleOpenEdit(team)}
                          title="Edit Details"
                          className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer"
                        >
                          <Pencil size={13} />
                        </button>

                        <button
                          onClick={() => setDeleteTarget(team)}
                          title="Delete Team"
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

      {/* CREATE & EDIT MODAL */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowFormModal(false)} />
          <div className="relative glass-panel border border-gaming-purple/30 rounded-2xl p-6 max-w-md w-full shadow-[0_0_35px_rgba(124,58,237,0.15)]">
            <div className="flex items-center justify-between mb-5 border-b border-white/5 pb-3">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Users size={16} className="text-gaming-purple" />
                {editingTeam ? 'Edit Team Details' : 'Create New Team'}
              </h3>
              <button
                onClick={() => setShowFormModal(false)}
                className="p-1 text-gray-500 hover:text-white rounded-lg cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveTeam} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Team Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Velocity Gaming"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 transition-all placeholder-gray-600"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Captain Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SentinelX"
                  value={formCaptain}
                  onChange={(e) => setFormCaptain(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 transition-all placeholder-gray-600"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Select Game</label>
                  <select
                    value={formGame}
                    onChange={(e) => setFormGame(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 cursor-pointer"
                  >
                    <option value="Valorant">Valorant</option>
                    <option value="BGMI">BGMI</option>
                    <option value="CS2">CS2</option>
                    <option value="Free Fire">Free Fire</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Players Count</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={formPlayers}
                    onChange={(e) => setFormPlayers(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Initial Status</label>
                <select
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 cursor-pointer"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="SUSPENDED">SUSPENDED</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/5 pt-4 mt-5">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white transition-all cursor-pointer uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gaming-purple hover:bg-gaming-purple/80 text-white text-xs font-bold rounded-xl transition-all shadow-[0_0_12px_rgba(124,58,237,0.35)] cursor-pointer uppercase tracking-wider"
                >
                  {editingTeam ? 'Save Changes' : 'Create Team'}
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
                <h3 className="text-sm font-black text-white uppercase tracking-wider mb-1">Delete Team?</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Are you sure you want to delete <span className="text-white font-bold">"{deleteTarget.name}"</span>? All roster records associated will be detached.
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
                  onClick={handleDeleteTeam}
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
