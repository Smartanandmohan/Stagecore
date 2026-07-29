import React, { useState } from 'react';
import { useSiteContent } from '../../../context/SiteContentContext';
import { 
  Swords, 
  Plus, 
  Tv, 
  Trash2, 
  Pencil, 
  X, 
  Check, 
  AlertTriangle,
  Play,
  Save,
  Tv2
} from 'lucide-react';

const GAME_TABS = ['ALL', 'Valorant', 'BGMI', 'CS2', 'Free Fire'];

export default function MatchList({ defaultOpenCreate = false }) {
  const { content, updateSection } = useSiteContent();
  const matches = content.matches || [];

  // Local UI States
  const [activeTab, setActiveTab] = useState('ALL');
  
  // Modals state
  const [showAddModal, setShowAddModal] = useState(defaultOpenCreate);
  const [editingMatch, setEditingMatch] = useState(null); // Full edit modal target
  const [deleteTarget, setDeleteTarget] = useState(null);
  
  // Inline edit state track - keeps trace of rows currently modified
  const [modifiedRows, setModifiedRows] = useState({}); // { matchId: true }

  // Form Fields State (for Add / Edit Modals)
  const [formTeam1, setFormTeam1] = useState('');
  const [formTeam2, setFormTeam2] = useState('');
  const [formScore1, setFormScore1] = useState(0);
  const [formScore2, setFormScore2] = useState(0);
  const [formStatus, setFormStatus] = useState('UPCOMING');
  const [formGame, setFormGame] = useState('Valorant');
  const [formStage, setFormStage] = useState('Semi Finals');
  const [formTime, setFormTime] = useState('Starts in 1h');
  const [formStreamUrl, setFormStreamUrl] = useState('');

  // Handle opening of Add Modal
  const handleOpenAdd = () => {
    setFormTeam1('');
    setFormTeam2('');
    setFormScore1(0);
    setFormScore2(0);
    setFormStatus('UPCOMING');
    setFormGame('Valorant');
    setFormStage('Quarter Finals');
    setFormTime('Starts in 2h');
    setFormStreamUrl('');
    setEditingMatch(null);
    setShowAddModal(true);
  };

  // Handle opening of Edit Modal
  const handleOpenEdit = (match) => {
    setFormTeam1(match.team1);
    setFormTeam2(match.team2);
    setFormScore1(match.score1);
    setFormScore2(match.score2);
    setFormStatus(match.status);
    setFormGame(match.game || 'Valorant');
    setFormStage(match.stage || '');
    setFormTime(match.time || '');
    setFormStreamUrl(match.streamUrl || '');
    setEditingMatch(match);
    setShowAddModal(true);
  };

  // Handle saving match (from Add or Edit modals)
  const handleSaveMatch = (e) => {
    e.preventDefault();
    if (!formTeam1.trim() || !formTeam2.trim()) return;

    if (editingMatch) {
      // Update
      const updated = matches.map(m => 
        m.id === editingMatch.id 
          ? { 
              ...m, 
              team1: formTeam1, 
              team2: formTeam2, 
              score1: Number(formScore1), 
              score2: Number(formScore2), 
              status: formStatus, 
              game: formGame, 
              stage: formStage, 
              time: formTime, 
              streamUrl: formStreamUrl 
            } 
          : m
      );
      updateSection('matches', updated);
    } else {
      // Create
      const newMatch = {
        id: Date.now(),
        team1: formTeam1,
        team2: formTeam2,
        score1: Number(formScore1),
        score2: Number(formScore2),
        status: formStatus,
        game: formGame,
        stage: formStage,
        time: formTime,
        streamUrl: formStreamUrl
      };
      updateSection('matches', [...matches, newMatch]);
    }
    setShowAddModal(false);
  };

  // Inline updates with change tracking
  const markRowAsModified = (id) => {
    setModifiedRows(prev => ({ ...prev, [id]: true }));
  };

  const handleInlineScoreChange = (id, teamKey, delta) => {
    const updated = matches.map(m => {
      if (m.id === id) {
        const currentVal = Number(m[teamKey]) || 0;
        const newVal = Math.max(0, currentVal + delta);
        return { ...m, [teamKey]: newVal };
      }
      return m;
    });
    updateSection('matches', updated);
    markRowAsModified(id);
  };

  const handleInlineScoreInput = (id, teamKey, val) => {
    const num = Math.max(0, parseInt(val, 10) || 0);
    const updated = matches.map(m => m.id === id ? { ...m, [teamKey]: num } : m);
    updateSection('matches', updated);
    markRowAsModified(id);
  };

  const handleInlineStatusChange = (id, newStatus) => {
    const updated = matches.map(m => m.id === id ? { ...m, status: newStatus } : m);
    updateSection('matches', updated);
    markRowAsModified(id);
  };

  const handleInlineStreamChange = (id, newUrl) => {
    const updated = matches.map(m => m.id === id ? { ...m, streamUrl: newUrl } : m);
    updateSection('matches', updated);
    markRowAsModified(id);
  };

  const handleSaveInlineRow = (id) => {
    setModifiedRows(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    // Visual cue - saved notification/alert could go here
  };

  // Delete Match
  const handleDeleteMatch = () => {
    if (!deleteTarget) return;
    const updated = matches.filter(m => m.id !== deleteTarget.id);
    updateSection('matches', updated);
    setDeleteTarget(null);
  };

  // Filtering matches
  const filteredMatches = matches.filter(m => {
    if (activeTab === 'ALL') return true;
    return (m.game || '').toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="space-y-6 text-gray-200 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <Swords className="text-gaming-blue" size={24} />
            Match Management
          </h1>
          <p className="text-xs text-gray-400 font-semibold tracking-wider mt-1">
            Real-time score keeping, livestream sync, and stage configurations.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-gaming-blue hover:bg-gaming-blue/80 text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer self-start sm:self-auto uppercase tracking-wider"
        >
          <Plus size={14} />
          Add Match
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 border-b border-white/5 pb-3 overflow-x-auto">
        {GAME_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase border transition-all duration-200 cursor-pointer whitespace-nowrap ${
              activeTab === tab
                ? 'bg-gaming-blue/20 border-gaming-blue text-white shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        {filteredMatches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Swords size={48} className="text-gray-700 mb-3" />
            <h3 className="text-sm font-bold text-white mb-1">No matches listed</h3>
            <p className="text-xs text-gray-500 max-w-xs">Create a new match or check another game tab filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[950px]">
              <thead>
                <tr className="border-b border-white/5 text-gray-400 font-extrabold uppercase tracking-widest text-[9px] bg-white/[0.01]">
                  <th className="px-5 py-4 w-20">ID</th>
                  <th className="px-5 py-4 w-60">Match Detail</th>
                  <th className="px-5 py-4 text-center w-56">Score (Team 1 vs Team 2)</th>
                  <th className="px-5 py-4 w-40">Status</th>
                  <th className="px-5 py-4 w-60">Livestream Link</th>
                  <th className="px-5 py-4 text-right w-36">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium text-gray-300">
                {filteredMatches.map((m) => {
                  const hasModifications = modifiedRows[m.id];
                  return (
                    <tr 
                      key={m.id} 
                      className={`group transition-all duration-150 ${
                        m.status === 'LIVE' 
                          ? 'bg-red-500/[0.02] hover:bg-red-500/[0.04]' 
                          : 'hover:bg-white/[0.02]'
                      }`}
                    >
                      {/* ID */}
                      <td className="px-5 py-4 text-gray-500 font-mono">#{m.id.toString().slice(-4)}</td>

                      {/* Detail */}
                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-white font-bold text-xs">
                            <span className="truncate max-w-[90px]">{m.team1}</span>
                            <span className="text-gray-500 font-normal">vs</span>
                            <span className="truncate max-w-[90px]">{m.team2}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded font-bold border border-white/5">{m.game}</span>
                            {m.stage && <span className="text-[10px] text-gray-500 font-semibold">{m.stage}</span>}
                          </div>
                        </div>
                      </td>

                      {/* Score Updater */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-1 bg-white/5 border border-white/5 p-1 rounded-xl w-fit mx-auto shadow-inner">
                          {/* Team 1 score controls */}
                          <button
                            onClick={() => handleInlineScoreChange(m.id, 'score1', -1)}
                            className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white font-bold flex items-center justify-center cursor-pointer transition-all"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={m.score1}
                            onChange={(e) => handleInlineScoreInput(m.id, 'score1', e.target.value)}
                            className="w-8 text-center bg-transparent border-0 text-white text-xs font-black outline-none font-mono"
                          />
                          <button
                            onClick={() => handleInlineScoreChange(m.id, 'score1', 1)}
                            className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white font-bold flex items-center justify-center cursor-pointer transition-all"
                          >
                            +
                          </button>

                          <span className="text-gray-600 font-bold mx-1">:</span>

                          {/* Team 2 score controls */}
                          <button
                            onClick={() => handleInlineScoreChange(m.id, 'score2', -1)}
                            className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white font-bold flex items-center justify-center cursor-pointer transition-all"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={m.score2}
                            onChange={(e) => handleInlineScoreInput(m.id, 'score2', e.target.value)}
                            className="w-8 text-center bg-transparent border-0 text-white text-xs font-black outline-none font-mono"
                          />
                          <button
                            onClick={() => handleInlineScoreChange(m.id, 'score2', 1)}
                            className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white font-bold flex items-center justify-center cursor-pointer transition-all"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="px-5 py-4">
                        <div className="relative">
                          <select
                            value={m.status}
                            onChange={(e) => handleInlineStatusChange(m.id, e.target.value)}
                            className={`w-full bg-white/5 border border-white/10 rounded-xl px-2.5 py-1.5 text-[10px] font-bold tracking-wider outline-none cursor-pointer transition-colors ${
                              m.status === 'LIVE' 
                                ? 'text-red-400 border-red-500/30' 
                                : m.status === 'UPCOMING'
                                ? 'text-blue-400 border-blue-500/30'
                                : 'text-gray-400 border-white/10'
                            }`}
                          >
                            <option value="UPCOMING">UPCOMING</option>
                            <option value="LIVE">LIVE</option>
                            <option value="COMPLETED">COMPLETED</option>
                          </select>
                        </div>
                      </td>

                      {/* Livestream link input */}
                      <td className="px-5 py-4">
                        <div className="relative flex items-center">
                          <Tv2 size={12} className="absolute left-2.5 text-gray-500" />
                          <input
                            type="text"
                            value={m.streamUrl || ''}
                            onChange={(e) => handleInlineStreamChange(m.id, e.target.value)}
                            placeholder="Twitch / YouTube Link..."
                            className="w-full bg-white/5 border border-white/10 text-[11px] text-gray-300 rounded-xl pl-8 pr-3 py-1.5 outline-none focus:border-gaming-blue/50 placeholder-gray-700 transition-colors"
                          />
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {hasModifications && (
                            <button
                              onClick={() => handleSaveInlineRow(m.id)}
                              title="Save inline changes"
                              className="p-2 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-all cursor-pointer animate-pulse"
                            >
                              <Save size={13} />
                            </button>
                          )}
                          
                          <button
                            onClick={() => handleOpenEdit(m)}
                            title="Edit details"
                            className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer"
                          >
                            <Pencil size={13} />
                          </button>
                          
                          <button
                            onClick={() => setDeleteTarget(m)}
                            title="Delete match"
                            className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD & EDIT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative glass-panel border border-gaming-blue/30 rounded-2xl p-6 max-w-lg w-full shadow-[0_0_35px_rgba(6,182,212,0.15)] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5 border-b border-white/5 pb-3">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Swords size={16} className="text-gaming-blue" />
                {editingMatch ? 'Edit Match Details' : 'Add New Match'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-gray-500 hover:text-white rounded-lg cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveMatch} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Team 1 Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Velocity Gaming"
                    value={formTeam1}
                    onChange={(e) => setFormTeam1(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-blue/60 transition-all placeholder-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Team 2 Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Reckoning Esports"
                    value={formTeam2}
                    onChange={(e) => setFormTeam2(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-blue/60 transition-all placeholder-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Score Team 1</label>
                  <input
                    type="number"
                    min="0"
                    value={formScore1}
                    onChange={(e) => setFormScore1(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-blue/60 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Score Team 2</label>
                  <input
                    type="number"
                    min="0"
                    value={formScore2}
                    onChange={(e) => setFormScore2(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-blue/60 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Select Game</label>
                  <select
                    value={formGame}
                    onChange={(e) => setFormGame(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-blue/60 cursor-pointer"
                  >
                    <option value="Valorant">Valorant</option>
                    <option value="BGMI">BGMI</option>
                    <option value="CS2">CS2</option>
                    <option value="Free Fire">Free Fire</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Tournament Stage</label>
                  <input
                    type="text"
                    placeholder="e.g. Grand Finals / Ro16"
                    value={formStage}
                    onChange={(e) => setFormStage(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-blue/60 transition-all placeholder-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Match Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-blue/60 cursor-pointer"
                  >
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="LIVE">LIVE</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Time / Schedule Info</label>
                  <input
                    type="text"
                    placeholder="e.g. Starts in 1h / Completed yesterday"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-blue/60 transition-all placeholder-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Livestream Stream URL</label>
                  <input
                    type="text"
                    placeholder="https://twitch.tv/channel"
                    value={formStreamUrl}
                    onChange={(e) => setFormStreamUrl(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-gaming-blue/60 transition-all placeholder-gray-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/5 pt-4 mt-5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white transition-all cursor-pointer uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gaming-blue hover:bg-gaming-blue/80 text-white text-xs font-bold rounded-xl transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)] cursor-pointer uppercase tracking-wider"
                >
                  {editingMatch ? 'Save Changes' : 'Create Match'}
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
                <h3 className="text-sm font-black text-white uppercase tracking-wider mb-1">Delete Match?</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Are you sure you want to delete match <span className="text-white font-bold">"{deleteTarget.team1} vs {deleteTarget.team2}"</span>? This will wipe the match from records.
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
                  onClick={handleDeleteMatch}
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
