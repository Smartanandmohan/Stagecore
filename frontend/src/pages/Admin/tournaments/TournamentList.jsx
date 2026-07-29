import React, { useState } from 'react';
import { useSiteContent } from '../../../context/SiteContentContext';
import { 
  Trophy, 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  Play, 
  Eye, 
  Shuffle, 
  CheckCircle, 
  ToggleLeft, 
  ToggleRight, 
  X, 
  AlertTriangle, 
  Calendar, 
  Award,
  Gamepad2,
  Users
} from 'lucide-react';

const STATUS_OPTIONS = ['ALL', 'LIVE', 'UPCOMING', 'COMPLETED'];

export default function TournamentList({ defaultOpenCreate = false }) {
  const { content, updateSection } = useSiteContent();
  const tournaments = content.tournaments || [];

  // Local UI States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  
  // Modals
  const [showFormModal, setShowFormModal] = useState(defaultOpenCreate);
  const [currentTournament, setCurrentTournament] = useState(null); // null = Create, {...} = Edit
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [seedingTarget, setSeedingTarget] = useState(null);
  const [publishTarget, setPublishTarget] = useState(null);

  // Form Fields State
  const [formName, setFormName] = useState('');
  const [formGame, setFormGame] = useState('');
  const [formPrize, setFormPrize] = useState('');
  const [formStatus, setFormStatus] = useState('UPCOMING');
  const [formMode, setFormMode] = useState('5v5');
  const [formFormat, setFormFormat] = useState('Single Elimination');
  const [formDate, setFormDate] = useState('');
  const [formRegOpen, setFormRegOpen] = useState(true);

  // Seeding State
  const [seedTeams, setSeedTeams] = useState([
    'Team Alpha', 'Team Bravo', 'Team Delta', 'Team Echo', 
    'Velocity Gaming', 'Reckoning Esports', 'GodLike Esports', 'Team Soul'
  ]);
  const [bracketGenerated, setBracketGenerated] = useState(false);

  // Publish State
  const [winnerTeam, setWinnerTeam] = useState('');

  // Handle open modal for create
  const handleOpenCreate = () => {
    setCurrentTournament(null);
    setFormName('');
    setFormGame('');
    setFormPrize('');
    setFormStatus('UPCOMING');
    setFormMode('5v5');
    setFormFormat('Single Elimination');
    setFormDate('');
    setFormRegOpen(true);
    setShowFormModal(true);
  };

  // Handle open modal for edit
  const handleOpenEdit = (tournament) => {
    setCurrentTournament(tournament);
    setFormName(tournament.name || '');
    setFormGame(tournament.game || '');
    setFormPrize(tournament.prize || '');
    setFormStatus(tournament.status || 'UPCOMING');
    setFormMode(tournament.mode || '5v5');
    setFormFormat(tournament.format || 'Single Elimination');
    setFormDate(tournament.date || '');
    setFormRegOpen(tournament.registrationOpen !== false);
    setShowFormModal(true);
  };

  // Save Tournament (Create or Update)
  const handleSaveTournament = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formGame.trim()) return;

    if (currentTournament) {
      // Update
      const updated = tournaments.map(t => 
        t.id === currentTournament.id 
          ? { 
              ...t, 
              name: formName, 
              game: formGame, 
              prize: formPrize, 
              status: formStatus, 
              mode: formMode, 
              format: formFormat, 
              date: formDate, 
              registrationOpen: formRegOpen 
            } 
          : t
      );
      updateSection('tournaments', updated);
    } else {
      // Create
      const newTourney = {
        id: Date.now(),
        name: formName,
        game: formGame,
        prize: formPrize,
        status: formStatus,
        mode: formMode,
        format: formFormat,
        date: formDate,
        registrationOpen: formRegOpen,
        image: '' // empty/placeholder image handled gracefully
      };
      updateSection('tournaments', [...tournaments, newTourney]);
    }
    setShowFormModal(false);
  };

  // Toggle Registration State (Open/Close)
  const handleToggleRegistration = (id) => {
    const updated = tournaments.map(t => 
      t.id === id ? { ...t, registrationOpen: t.registrationOpen === false ? true : false } : t
    );
    updateSection('tournaments', updated);
  };

  // Delete Tournament
  const handleDeleteTournament = () => {
    if (!deleteTarget) return;
    const updated = tournaments.filter(t => t.id !== deleteTarget.id);
    updateSection('tournaments', updated);
    setDeleteTarget(null);
  };

  // Generate seeds bracket
  const handleGenerateBracket = () => {
    // Shuffle seeds list
    const shuffled = [...seedTeams].sort(() => Math.random() - 0.5);
    setSeedTeams(shuffled);
    setBracketGenerated(true);
  };

  // Publish results
  const handlePublishResults = () => {
    if (!publishTarget || !winnerTeam.trim()) return;
    const updated = tournaments.map(t => 
      t.id === publishTarget.id 
        ? { ...t, status: 'COMPLETED', winner: winnerTeam, registrationOpen: false } 
        : t
    );
    updateSection('tournaments', updated);
    setPublishTarget(null);
    setWinnerTeam('');
  };

  // Filters logic
  const filteredTournaments = tournaments.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.game.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 text-gray-200 animate-fadeIn">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <Trophy className="text-gaming-purple" size={24} />
            Tournament Management
          </h1>
          <p className="text-xs text-gray-400 font-semibold tracking-wider mt-1">
            Configure matches, registrations, seedings, and status updates.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-gaming-purple hover:bg-gaming-purple/80 text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-[0_0_15px_rgba(124,58,237,0.3)] cursor-pointer self-start sm:self-auto uppercase tracking-wider"
        >
          <Plus size={14} />
          Create Tournament
        </button>
      </div>

      {/* Toolbar / Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase border transition-all duration-200 cursor-pointer ${
                statusFilter === status
                  ? 'bg-gaming-purple/20 border-gaming-purple text-white shadow-[0_0_10px_rgba(124,58,237,0.2)]'
                  : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search tournament or game..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-gaming-purple/60 placeholder-gray-600 transition-all duration-200"
          />
        </div>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        {filteredTournaments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Trophy size={48} className="text-gray-700 mb-3" />
            <h3 className="text-sm font-bold text-white mb-1">No matches found</h3>
            <p className="text-xs text-gray-500 max-w-xs">Adjust your status filter or try another search query.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[850px]">
              <thead>
                <tr className="border-b border-white/5 text-gray-400 font-extrabold uppercase tracking-widest text-[9px] bg-white/[0.01]">
                  <th className="px-5 py-4 w-16">ID</th>
                  <th className="px-5 py-4">Tournament</th>
                  <th className="px-5 py-4">Game</th>
                  <th className="px-5 py-4">Prize Pool</th>
                  <th className="px-5 py-4">Registration</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium text-gray-300">
                {filteredTournaments.map((t) => (
                  <tr key={t.id} className="group hover:bg-white/[0.02] transition-colors duration-150">
                    <td className="px-5 py-4 text-gray-500 font-mono">#{t.id.toString().slice(-4)}</td>
                    <td className="px-5 py-4">
                      <div>
                        <span className="font-bold text-white group-hover:text-gaming-purple transition-colors block text-xs">
                          {t.name}
                        </span>
                        {t.winner && (
                          <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1 mt-0.5">
                            <Award size={10} /> Winner: {t.winner}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] font-semibold text-gray-300">
                        {t.game}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-black text-gaming-blue">{t.prize || 'N/A'}</td>
                    
                    {/* Toggle registration Open/Closed */}
                    <td className="px-5 py-4">
                      <button 
                        onClick={() => handleToggleRegistration(t.id)}
                        className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 hover:text-white cursor-pointer transition-colors"
                      >
                        {t.registrationOpen !== false ? (
                          <>
                            <ToggleRight size={18} className="text-emerald-400" />
                            <span className="text-emerald-400 text-[10px]">Open</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft size={18} className="text-gray-500" />
                            <span className="text-gray-500 text-[10px]">Closed</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Status Badge */}
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        t.status === 'LIVE' 
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                          : t.status === 'UPCOMING'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                      }`}>
                        {t.status === 'LIVE' && <span className="inline-block w-1 h-1 rounded-full bg-red-400 mr-1 animate-pulse" />}
                        {t.status}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(t)}
                          title="Edit details"
                          className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer"
                        >
                          <Pencil size={13} />
                        </button>
                        
                        <button
                          onClick={() => setSeedingTarget(t)}
                          title="Generate Bracket Seeding"
                          className="p-2 text-gray-500 hover:text-gaming-purple hover:bg-gaming-purple/10 rounded-lg transition-all cursor-pointer"
                        >
                          <Shuffle size={13} />
                        </button>

                        {t.status !== 'COMPLETED' && (
                          <button
                            onClick={() => setPublishTarget(t)}
                            title="Publish results"
                            className="p-2 text-gray-500 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all cursor-pointer"
                          >
                            <CheckCircle size={13} />
                          </button>
                        )}

                        <button
                          onClick={() => setDeleteTarget(t)}
                          title="Delete tournament"
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
          <div className="relative glass-panel border border-gaming-purple/30 rounded-2xl p-6 max-w-lg w-full shadow-[0_0_35px_rgba(124,58,237,0.15)] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5 border-b border-white/5 pb-3">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Trophy size={16} className="text-gaming-purple" />
                {currentTournament ? 'Edit Tournament Details' : 'Create New Tournament'}
              </h3>
              <button
                onClick={() => setShowFormModal(false)}
                className="p-1 text-gray-500 hover:text-white rounded-lg cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveTournament} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Tournament Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. StageCore Valorant Cup #12"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 transition-all placeholder-gray-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Game Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Valorant / BGMI"
                    value={formGame}
                    onChange={(e) => setFormGame(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 transition-all placeholder-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Prize Pool</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹25,000 / ₹50,000"
                    value={formPrize}
                    onChange={(e) => setFormPrize(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 transition-all placeholder-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Format</label>
                  <input
                    type="text"
                    placeholder="e.g. Single Elim"
                    value={formFormat}
                    onChange={(e) => setFormFormat(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 transition-all placeholder-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Game Mode</label>
                  <input
                    type="text"
                    placeholder="e.g. 5v5 / Squad"
                    value={formMode}
                    onChange={(e) => setFormMode(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 transition-all placeholder-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Tournament Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 transition-all cursor-pointer"
                  >
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="LIVE">LIVE</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Schedule / Date</label>
                  <input
                    type="text"
                    placeholder="e.g. 25 May - 26 May"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-purple/60 transition-all placeholder-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-1 justify-center pt-4">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-300 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formRegOpen}
                      onChange={(e) => setFormRegOpen(e.target.checked)}
                      className="w-4 h-4 accent-gaming-purple rounded bg-white/5 border-white/10" 
                    />
                    Registration Open
                  </label>
                </div>
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
                  {currentTournament ? 'Save Changes' : 'Create Tournament'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SEEDING BRACKET MODAL */}
      {seedingTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={() => { setSeedingTarget(null); setBracketGenerated(false); }} />
          <div className="relative glass-panel border border-gaming-purple/30 rounded-2xl p-6 max-w-2xl w-full shadow-[0_0_35px_rgba(124,58,237,0.15)]">
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Shuffle size={16} className="text-gaming-purple" />
                Bracket Seed Generator
              </h3>
              <button onClick={() => { setSeedingTarget(null); setBracketGenerated(false); }} className="p-1 text-gray-500 hover:text-white cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Generating matches for <span className="text-white font-bold">{seedingTarget.name}</span> based on registered teams. Click 'Generate Seed Tree' to randomly allocate brackets.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest block mb-2">Registered Seeds</span>
                <div className="space-y-1 bg-white/5 border border-white/5 rounded-xl p-3 h-48 overflow-y-auto">
                  {seedTeams.map((team, index) => (
                    <div key={index} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0">
                      <span className="text-gray-300 font-semibold">{team}</span>
                      <span className="text-gray-600 font-mono text-[10px]">Seed #{index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest block mb-2">Bracket Visualizer</span>
                <div className="flex flex-col items-center justify-center h-48 bg-black/40 border border-white/5 rounded-xl p-3 text-center overflow-y-auto">
                  {bracketGenerated ? (
                    <div className="w-full space-y-3 font-mono text-[9px]">
                      <div className="flex items-center justify-between border-b border-white/5 pb-1">
                        <span className="text-gaming-purple">Quarter-Final A</span>
                        <span className="text-gray-500">Match 1</span>
                      </div>
                      <div className="text-left pl-2 space-y-1 text-gray-300">
                        <div className="bg-white/5 p-1 rounded border border-white/5 flex justify-between"><span>{seedTeams[0]}</span><span className="text-gray-600">vs</span></div>
                        <div className="bg-white/5 p-1 rounded border border-white/5 flex justify-between"><span>{seedTeams[7]}</span><span className="text-gray-600">vs</span></div>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/5 pb-1 pt-2">
                        <span className="text-gaming-purple">Quarter-Final B</span>
                        <span className="text-gray-500">Match 2</span>
                      </div>
                      <div className="text-left pl-2 space-y-1 text-gray-300">
                        <div className="bg-white/5 p-1 rounded border border-white/5 flex justify-between"><span>{seedTeams[1]}</span><span className="text-gray-600">vs</span></div>
                        <div className="bg-white/5 p-1 rounded border border-white/5 flex justify-between"><span>{seedTeams[6]}</span><span className="text-gray-600">vs</span></div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Gamepad2 size={24} className="text-gray-600 mb-2 animate-bounce" />
                      <span className="text-[10px] text-gray-500">Bracket not generated yet</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-white/5 pt-4">
              <button
                onClick={() => { setSeedingTarget(null); setBracketGenerated(false); }}
                className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white cursor-pointer uppercase tracking-wider"
              >
                Close
              </button>
              <button
                onClick={handleGenerateBracket}
                className="flex items-center gap-1.5 px-5 py-2 bg-gaming-purple hover:bg-gaming-purple/80 text-white text-xs font-bold rounded-xl transition-all cursor-pointer uppercase tracking-wider"
              >
                <Shuffle size={12} />
                Generate Seed Tree
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PUBLISH RESULTS MODAL */}
      {publishTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setPublishTarget(null)} />
          <div className="relative glass-panel border border-amber-500/30 rounded-2xl p-6 max-w-sm w-full shadow-[0_0_35px_rgba(245,158,11,0.15)]">
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <CheckCircle size={16} className="text-amber-400" />
                Publish Results
              </h3>
              <button onClick={() => setPublishTarget(null)} className="p-1 text-gray-500 hover:text-white cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Complete tournament <span className="text-white font-bold">{publishTarget.name}</span> and publish the final championship details.
            </p>

            <div className="flex flex-col gap-1.5 mb-5">
              <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Winning Team Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Velocity Gaming"
                value={winnerTeam}
                onChange={(e) => setWinnerTeam(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-amber-400 transition-all placeholder-gray-600"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setPublishTarget(null)}
                className="flex-1 py-2 text-xs font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                onClick={handlePublishResults}
                disabled={!winnerTeam.trim()}
                className="flex-1 py-2 text-xs font-bold text-black bg-amber-400 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all cursor-pointer uppercase tracking-wider"
              >
                Publish & Close
              </button>
            </div>
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
                <h3 className="text-sm font-black text-white uppercase tracking-wider mb-1">Delete Tournament?</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Are you sure you want to delete <span className="text-white font-bold">"{deleteTarget.name}"</span>? All records will be permanently removed.
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
                  onClick={handleDeleteTournament}
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
