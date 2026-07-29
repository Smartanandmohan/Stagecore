import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import {
  Award, Plus, Trash2, ChevronUp, ChevronDown, Save,
  Users, User, Star
} from 'lucide-react';

const TABS = [
  { id: 'teams', label: 'Team Rankings', icon: Users },
  { id: 'players', label: 'Player Rankings', icon: User },
];

const RANK_STYLES = {
  1: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 shadow-[0_0_8px_rgba(234,179,8,0.2)]',
  2: 'bg-gray-400/20 text-gray-300 border border-gray-400/30',
  3: 'bg-amber-600/20 text-amber-500 border border-amber-600/30',
};

const RankBadge = ({ rank }) => {
  const style = RANK_STYLES[rank] || 'bg-white/5 text-gray-500 border border-white/10';
  return (
    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-black ${style}`}>
      {rank}
    </span>
  );
};

const inputClass =
  'w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-gaming-purple/60 placeholder-gray-600 transition-all duration-200';

const EMPTY_TEAM = { name: '', score: '' };
const EMPTY_PLAYER = { name: '', team: '', score: '' };

export const AdminRankingsEditor = () => {
  const { content, updateSection } = useSiteContent();

  const [activeTab, setActiveTab] = useState('teams');
  const [teamRankings, setTeamRankings] = useState(content.teamRankings || []);
  const [playerRankings, setPlayerRankings] = useState(content.playerRankings || []);

  const [newTeam, setNewTeam] = useState({ ...EMPTY_TEAM });
  const [newPlayer, setNewPlayer] = useState({ ...EMPTY_PLAYER });
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [savedTeams, setSavedTeams] = useState(false);
  const [savedPlayers, setSavedPlayers] = useState(false);

  // ── Helpers ──────────────────────────────────────────────────────

  const rerank = (list) => list.map((item, i) => ({ ...item, rank: i + 1 }));

  // ── Team Rankings ─────────────────────────────────────────────────

  const updateTeamField = (index, field, value) => {
    setTeamRankings(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const moveTeam = (index, dir) => {
    setTeamRankings(prev => {
      const copy = [...prev];
      const swapIdx = index + dir;
      if (swapIdx < 0 || swapIdx >= copy.length) return prev;
      [copy[index], copy[swapIdx]] = [copy[swapIdx], copy[index]];
      return rerank(copy);
    });
  };

  const deleteTeam = (index) => {
    setTeamRankings(prev => rerank(prev.filter((_, i) => i !== index)));
  };

  const addTeam = () => {
    if (!newTeam.name.trim()) return;
    const entry = {
      id: Date.now(),
      rank: teamRankings.length + 1,
      name: newTeam.name.trim(),
      score: newTeam.score.trim(),
    };
    setTeamRankings(prev => rerank([...prev, entry]));
    setNewTeam({ ...EMPTY_TEAM });
    setShowAddTeam(false);
  };

  const saveTeams = () => {
    updateSection('teamRankings', rerank(teamRankings));
    setSavedTeams(true);
    setTimeout(() => setSavedTeams(false), 2000);
  };

  // ── Player Rankings ───────────────────────────────────────────────

  const updatePlayerField = (index, field, value) => {
    setPlayerRankings(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const movePlayer = (index, dir) => {
    setPlayerRankings(prev => {
      const copy = [...prev];
      const swapIdx = index + dir;
      if (swapIdx < 0 || swapIdx >= copy.length) return prev;
      [copy[index], copy[swapIdx]] = [copy[swapIdx], copy[index]];
      return rerank(copy);
    });
  };

  const deletePlayer = (index) => {
    setPlayerRankings(prev => rerank(prev.filter((_, i) => i !== index)));
  };

  const addPlayer = () => {
    if (!newPlayer.name.trim()) return;
    const entry = {
      id: Date.now(),
      rank: playerRankings.length + 1,
      name: newPlayer.name.trim(),
      team: newPlayer.team.trim(),
      score: newPlayer.score.trim(),
    };
    setPlayerRankings(prev => rerank([...prev, entry]));
    setNewPlayer({ ...EMPTY_PLAYER });
    setShowAddPlayer(false);
  };

  const savePlayers = () => {
    updateSection('playerRankings', rerank(playerRankings));
    setSavedPlayers(true);
    setTimeout(() => setSavedPlayers(false), 2000);
  };

  // ── Render ────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gaming-purple/20 border border-gaming-purple/30 flex items-center justify-center">
          <Award size={18} className="text-gaming-purple" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">Rankings Editor</h1>
          <p className="text-sm text-gray-500">Manage team and player leaderboards</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/5 w-fit">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              activeTab === id
                ? 'bg-gaming-purple text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* ── Team Rankings Tab ── */}
      {activeTab === 'teams' && (
        <div className="space-y-4">
          <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[2.5rem_1fr_1fr_7rem] gap-3 px-5 py-3 border-b border-white/5">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Rank</span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Team Name</span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Score (Points)</span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</span>
            </div>

            {/* Rows */}
            {teamRankings.length === 0 ? (
              <div className="py-12 text-center text-gray-600 text-sm">No team rankings yet.</div>
            ) : (
              <div className="divide-y divide-white/5">
                {teamRankings.map((team, index) => (
                  <div
                    key={team.id || index}
                    className="grid grid-cols-[2.5rem_1fr_1fr_7rem] gap-3 px-5 py-3 items-center hover:bg-white/3 transition-colors group"
                  >
                    {/* Rank */}
                    <div>
                      <RankBadge rank={team.rank} />
                    </div>

                    {/* Team Name */}
                    <input
                      className={inputClass}
                      value={team.name}
                      onChange={e => updateTeamField(index, 'name', e.target.value)}
                      placeholder="Team name"
                    />

                    {/* Score */}
                    <input
                      className={inputClass}
                      value={team.score}
                      onChange={e => updateTeamField(index, 'score', e.target.value)}
                      placeholder="e.g. 1,450"
                    />

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => moveTeam(index, -1)}
                        disabled={index === 0}
                        title="Move Up"
                        className="p-1.5 text-gray-500 hover:text-gaming-purple hover:bg-gaming-purple/10 rounded-lg transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronUp size={14} />
                      </button>
                      <button
                        onClick={() => moveTeam(index, 1)}
                        disabled={index === teamRankings.length - 1}
                        title="Move Down"
                        className="p-1.5 text-gray-500 hover:text-gaming-purple hover:bg-gaming-purple/10 rounded-lg transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronDown size={14} />
                      </button>
                      <button
                        onClick={() => deleteTeam(index)}
                        title="Delete"
                        className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Row */}
            {showAddTeam && (
              <div className="px-5 py-3 border-t border-gaming-purple/20 bg-gaming-purple/5">
                <div className="grid grid-cols-[2.5rem_1fr_1fr_7rem] gap-3 items-center">
                  <div className="flex items-center justify-center">
                    <span className="text-xs text-gray-500 font-bold">#{teamRankings.length + 1}</span>
                  </div>
                  <input
                    className={inputClass}
                    value={newTeam.name}
                    onChange={e => setNewTeam(p => ({ ...p, name: e.target.value }))}
                    placeholder="Team name"
                    autoFocus
                    onKeyDown={e => e.key === 'Enter' && addTeam()}
                  />
                  <input
                    className={inputClass}
                    value={newTeam.score}
                    onChange={e => setNewTeam(p => ({ ...p, score: e.target.value }))}
                    placeholder="Score"
                    onKeyDown={e => e.key === 'Enter' && addTeam()}
                  />
                  <div className="flex items-center gap-1 justify-end">
                    <button
                      onClick={addTeam}
                      className="p-1.5 text-gaming-purple hover:bg-gaming-purple/20 rounded-lg transition-all cursor-pointer"
                      title="Add"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={() => { setShowAddTeam(false); setNewTeam({ ...EMPTY_TEAM }); }}
                      className="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"
                      title="Cancel"
                    >
                      <span className="text-xs font-bold">✕</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between gap-3">
            {!showAddTeam && (
              <button
                onClick={() => setShowAddTeam(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gaming-purple hover:text-white border border-gaming-purple/30 hover:bg-gaming-purple/10 rounded-xl transition-all cursor-pointer"
              >
                <Plus size={15} />
                Add Team
              </button>
            )}
            <div className="flex-1" />
            <button
              onClick={saveTeams}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                savedTeams
                  ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                  : 'bg-gaming-purple hover:bg-gaming-purple/80 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]'
              }`}
            >
              <Save size={14} />
              {savedTeams ? 'Saved!' : 'Save Team Rankings'}
            </button>
          </div>
        </div>
      )}

      {/* ── Player Rankings Tab ── */}
      {activeTab === 'players' && (
        <div className="space-y-4">
          <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[2.5rem_1fr_1fr_1fr_7rem] gap-3 px-5 py-3 border-b border-white/5">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Rank</span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Player Name</span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Team</span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">MVP Rating</span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</span>
            </div>

            {/* Rows */}
            {playerRankings.length === 0 ? (
              <div className="py-12 text-center text-gray-600 text-sm">No player rankings yet.</div>
            ) : (
              <div className="divide-y divide-white/5">
                {playerRankings.map((player, index) => (
                  <div
                    key={player.id || index}
                    className="grid grid-cols-[2.5rem_1fr_1fr_1fr_7rem] gap-3 px-5 py-3 items-center hover:bg-white/3 transition-colors group"
                  >
                    {/* Rank */}
                    <div>
                      <RankBadge rank={player.rank} />
                    </div>

                    {/* Player Name */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gaming-purple/10 border border-gaming-purple/20 flex items-center justify-center flex-shrink-0">
                        <User size={10} className="text-gaming-purple" />
                      </div>
                      <input
                        className={inputClass}
                        value={player.name}
                        onChange={e => updatePlayerField(index, 'name', e.target.value)}
                        placeholder="Player name"
                      />
                    </div>

                    {/* Team */}
                    <input
                      className={inputClass}
                      value={player.team}
                      onChange={e => updatePlayerField(index, 'team', e.target.value)}
                      placeholder="Team name"
                    />

                    {/* Score */}
                    <div className="flex items-center gap-2">
                      <Star size={12} className="text-yellow-400 flex-shrink-0" />
                      <input
                        className={inputClass}
                        value={player.score}
                        onChange={e => updatePlayerField(index, 'score', e.target.value)}
                        placeholder="e.g. 9.8"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => movePlayer(index, -1)}
                        disabled={index === 0}
                        title="Move Up"
                        className="p-1.5 text-gray-500 hover:text-gaming-purple hover:bg-gaming-purple/10 rounded-lg transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronUp size={14} />
                      </button>
                      <button
                        onClick={() => movePlayer(index, 1)}
                        disabled={index === playerRankings.length - 1}
                        title="Move Down"
                        className="p-1.5 text-gray-500 hover:text-gaming-purple hover:bg-gaming-purple/10 rounded-lg transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronDown size={14} />
                      </button>
                      <button
                        onClick={() => deletePlayer(index)}
                        title="Delete"
                        className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Player Row */}
            {showAddPlayer && (
              <div className="px-5 py-3 border-t border-gaming-purple/20 bg-gaming-purple/5">
                <div className="grid grid-cols-[2.5rem_1fr_1fr_1fr_7rem] gap-3 items-center">
                  <div className="flex items-center justify-center">
                    <span className="text-xs text-gray-500 font-bold">#{playerRankings.length + 1}</span>
                  </div>
                  <input
                    className={inputClass}
                    value={newPlayer.name}
                    onChange={e => setNewPlayer(p => ({ ...p, name: e.target.value }))}
                    placeholder="Player name"
                    autoFocus
                    onKeyDown={e => e.key === 'Enter' && addPlayer()}
                  />
                  <input
                    className={inputClass}
                    value={newPlayer.team}
                    onChange={e => setNewPlayer(p => ({ ...p, team: e.target.value }))}
                    placeholder="Team"
                    onKeyDown={e => e.key === 'Enter' && addPlayer()}
                  />
                  <input
                    className={inputClass}
                    value={newPlayer.score}
                    onChange={e => setNewPlayer(p => ({ ...p, score: e.target.value }))}
                    placeholder="Rating"
                    onKeyDown={e => e.key === 'Enter' && addPlayer()}
                  />
                  <div className="flex items-center gap-1 justify-end">
                    <button
                      onClick={addPlayer}
                      className="p-1.5 text-gaming-purple hover:bg-gaming-purple/20 rounded-lg transition-all cursor-pointer"
                      title="Add"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={() => { setShowAddPlayer(false); setNewPlayer({ ...EMPTY_PLAYER }); }}
                      className="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"
                      title="Cancel"
                    >
                      <span className="text-xs font-bold">✕</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between gap-3">
            {!showAddPlayer && (
              <button
                onClick={() => setShowAddPlayer(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gaming-purple hover:text-white border border-gaming-purple/30 hover:bg-gaming-purple/10 rounded-xl transition-all cursor-pointer"
              >
                <Plus size={15} />
                Add Player
              </button>
            )}
            <div className="flex-1" />
            <button
              onClick={savePlayers}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                savedPlayers
                  ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                  : 'bg-gaming-purple hover:bg-gaming-purple/80 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]'
              }`}
            >
              <Save size={14} />
              {savedPlayers ? 'Saved!' : 'Save Player Rankings'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
