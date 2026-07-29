import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import {
  Swords, Plus, Pencil, Trash2, X, Check, AlertTriangle,
  ChevronDown, Zap, Radio, Clock, Link as LinkIcon
} from 'lucide-react';

const STATUS_CONFIG = {
  LIVE: {
    label: 'LIVE',
    classes: 'bg-red-500/20 text-red-400 border border-red-500/40',
    dot: 'bg-red-500 animate-pulse',
  },
  UPCOMING: {
    label: 'UPCOMING',
    classes: 'bg-blue-500/20 text-blue-400 border border-blue-500/40',
    dot: 'bg-blue-400',
  },
  COMPLETED: {
    label: 'COMPLETED',
    classes: 'bg-gray-500/20 text-gray-400 border border-gray-500/40',
    dot: 'bg-gray-500',
  },
};

const EMPTY_MATCH = {
  team1: '',
  team2: '',
  score1: 0,
  score2: 0,
  status: 'UPCOMING',
  game: '',
  stage: '',
  time: '',
  streamUrl: '',
};

const inputClass =
  'w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-gaming-purple/60 focus:bg-white/8 placeholder-gray-600 transition-all duration-200';

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.UPCOMING;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${cfg.classes}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

const FormField = ({ label, children, className = '' }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</label>
    {children}
  </div>
);

const MatchForm = ({ initial, onSave, onCancel, title }) => {
  const [form, setForm] = useState({ ...EMPTY_MATCH, ...initial });

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.team1.trim() || !form.team2.trim()) return;
    onSave({ ...form, score1: Number(form.score1), score2: Number(form.score2) });
  };

  return (
    <div className="glass-panel border border-gaming-blue/30 rounded-2xl p-6 mb-6 shadow-[0_0_30px_rgba(6,182,212,0.08)]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Swords size={16} className="text-gaming-blue" />
          {title}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Team 1 */}
        <FormField label="Team 1">
          <input
            className={inputClass}
            placeholder="e.g. Velocity Gaming"
            value={form.team1}
            onChange={e => set('team1', e.target.value)}
            required
          />
        </FormField>

        {/* Team 2 */}
        <FormField label="Team 2">
          <input
            className={inputClass}
            placeholder="e.g. Reckoning Esports"
            value={form.team2}
            onChange={e => set('team2', e.target.value)}
            required
          />
        </FormField>

        {/* Game */}
        <FormField label="Game">
          <input
            className={inputClass}
            placeholder="e.g. Valorant"
            value={form.game}
            onChange={e => set('game', e.target.value)}
          />
        </FormField>

        {/* Score 1 */}
        <FormField label="Score — Team 1">
          <input
            type="number"
            min="0"
            className={inputClass}
            value={form.score1}
            onChange={e => set('score1', e.target.value)}
          />
        </FormField>

        {/* Score 2 */}
        <FormField label="Score — Team 2">
          <input
            type="number"
            min="0"
            className={inputClass}
            value={form.score2}
            onChange={e => set('score2', e.target.value)}
          />
        </FormField>

        {/* Status */}
        <FormField label="Status">
          <div className="relative">
            <select
              className={`${inputClass} appearance-none pr-8`}
              value={form.status}
              onChange={e => set('status', e.target.value)}
            >
              <option value="UPCOMING">UPCOMING</option>
              <option value="LIVE">LIVE</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </FormField>

        {/* Stage */}
        <FormField label="Stage">
          <input
            className={inputClass}
            placeholder="e.g. Grand Finals"
            value={form.stage}
            onChange={e => set('stage', e.target.value)}
          />
        </FormField>

        {/* Time */}
        <FormField label="Time Info">
          <input
            className={inputClass}
            placeholder="e.g. Starts in 1h"
            value={form.time}
            onChange={e => set('time', e.target.value)}
          />
        </FormField>

        {/* Stream URL */}
        <FormField label="Stream URL">
          <input
            className={inputClass}
            placeholder="https://twitch.tv/..."
            value={form.streamUrl}
            onChange={e => set('streamUrl', e.target.value)}
          />
        </FormField>

        {/* Actions */}
        <div className="sm:col-span-2 lg:col-span-3 flex items-center justify-end gap-3 pt-2 border-t border-white/5">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2 bg-gaming-blue hover:bg-gaming-blue/80 text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-[0_0_15px_rgba(6,182,212,0.25)] cursor-pointer"
          >
            <Check size={14} />
            Save Match
          </button>
        </div>
      </form>
    </div>
  );
};

const DeleteConfirmModal = ({ match, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
    <div className="relative glass-panel border border-red-500/30 rounded-2xl p-6 max-w-sm w-full shadow-[0_0_40px_rgba(239,68,68,0.15)]">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
          <AlertTriangle size={24} className="text-red-400" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white mb-1">Delete Match?</h3>
          <p className="text-sm text-gray-400">
            Remove{' '}
            <span className="text-white font-semibold">"{match.team1} vs {match.team2}"</span>?
            This cannot be undone.
          </p>
        </div>
        <div className="flex gap-3 w-full">
          <button
            onClick={onCancel}
            className="flex-1 py-2 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 text-sm font-bold text-white bg-red-500/80 hover:bg-red-500 rounded-xl transition-all cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
);

const LiveScoreUpdater = ({ match, onUpdate }) => (
  <div className="flex items-center gap-3 bg-red-500/5 border border-red-500/20 rounded-xl px-3 py-2">
    <Radio size={13} className="text-red-400 animate-pulse flex-shrink-0" />
    <div className="flex items-center gap-2 flex-1 min-w-0">
      <span className="text-xs text-white font-semibold truncate max-w-[80px]">{match.team1}</span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onUpdate(match.id, 'score1', match.score1 + 1)}
          className="w-6 h-6 rounded-lg bg-gaming-purple/20 hover:bg-gaming-purple/40 text-gaming-purple font-bold text-sm flex items-center justify-center transition-all cursor-pointer"
          title={`+1 for ${match.team1}`}
        >
          +
        </button>
        <span className="text-base font-black text-white tabular-nums w-6 text-center">{match.score1}</span>
      </div>
      <span className="text-gray-600 font-bold text-xs">vs</span>
      <div className="flex items-center gap-1">
        <span className="text-base font-black text-white tabular-nums w-6 text-center">{match.score2}</span>
        <button
          onClick={() => onUpdate(match.id, 'score2', match.score2 + 1)}
          className="w-6 h-6 rounded-lg bg-gaming-blue/20 hover:bg-gaming-blue/40 text-gaming-blue font-bold text-sm flex items-center justify-center transition-all cursor-pointer"
          title={`+1 for ${match.team2}`}
        >
          +
        </button>
      </div>
      <span className="text-xs text-white font-semibold truncate max-w-[80px]">{match.team2}</span>
    </div>
  </div>
);

export const AdminMatchesEditor = () => {
  const { content, updateSection } = useSiteContent();
  const matches = content.matches || [];

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleAdd = (form) => {
    updateSection('matches', [...matches, { ...form, id: Date.now() }]);
    setShowAddForm(false);
  };

  const handleEdit = (form) => {
    const updated = matches.map(m => m.id === editingId ? { ...m, ...form } : m);
    updateSection('matches', updated);
    setEditingId(null);
  };

  const handleDelete = () => {
    updateSection('matches', matches.filter(m => m.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const handleScoreUpdate = (id, field, value) => {
    const updated = matches.map(m => m.id === id ? { ...m, [field]: value } : m);
    updateSection('matches', updated);
  };

  const handleInlineField = (id, field, value) => {
    const updated = matches.map(m => m.id === id ? { ...m, [field]: value } : m);
    updateSection('matches', updated);
  };

  const liveMatches = matches.filter(m => m.status === 'LIVE');
  const editingMatch = matches.find(m => m.id === editingId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gaming-blue/20 border border-gaming-blue/30 flex items-center justify-center">
              <Swords size={18} className="text-gaming-blue" />
            </div>
            Matches Manager
          </h1>
          <p className="text-sm text-gray-500 mt-1 ml-12">
            {matches.length} match{matches.length !== 1 ? 'es' : ''} total
            {liveMatches.length > 0 && (
              <span className="ml-2 text-red-400 font-semibold">
                · {liveMatches.length} LIVE
              </span>
            )}
          </p>
        </div>
        {!showAddForm && !editingId && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gaming-blue hover:bg-gaming-blue/80 text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.25)] cursor-pointer whitespace-nowrap"
          >
            <Plus size={16} />
            Add New Match
          </button>
        )}
      </div>

      {/* Live Score Updater Panel */}
      {liveMatches.length > 0 && (
        <div className="glass-panel border border-red-500/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={14} className="text-red-400" />
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
              Live Score Updater
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {liveMatches.map(m => (
              <LiveScoreUpdater key={m.id} match={m} onUpdate={handleScoreUpdate} />
            ))}
          </div>
        </div>
      )}

      {/* Add Form */}
      {showAddForm && (
        <MatchForm
          title="Add New Match"
          initial={EMPTY_MATCH}
          onSave={handleAdd}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Edit Form */}
      {editingId && editingMatch && (
        <MatchForm
          title="Edit Match"
          initial={editingMatch}
          onSave={handleEdit}
          onCancel={() => setEditingId(null)}
        />
      )}

      {/* Matches Table */}
      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        {matches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gaming-blue/10 border border-gaming-blue/20 flex items-center justify-center mb-4">
              <Swords size={28} className="text-gaming-blue/50" />
            </div>
            <h3 className="text-base font-bold text-white/50 mb-1">No Matches Yet</h3>
            <p className="text-sm text-gray-600">Click "Add New Match" to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Team 1</th>
                  <th className="text-center text-[11px] font-bold text-gray-500 uppercase tracking-wider px-2 py-3">vs</th>
                  <th className="text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Team 2</th>
                  <th className="text-center text-[11px] font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Score</th>
                  <th className="text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Game</th>
                  <th className="text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Stage</th>
                  <th className="text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Time</th>
                  <th className="text-right text-[11px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {matches.map((m) => {
                  const isLive = m.status === 'LIVE';
                  return (
                    <tr
                      key={m.id}
                      className={`hover:bg-white/3 transition-colors duration-150 group ${isLive ? 'bg-red-500/5' : ''}`}
                    >
                      {/* Team 1 */}
                      <td className="px-5 py-3">
                        <span className="text-sm font-semibold text-white">{m.team1}</span>
                      </td>

                      {/* vs */}
                      <td className="px-2 py-3 text-center">
                        <span className="text-xs font-bold text-gray-600">vs</span>
                      </td>

                      {/* Team 2 */}
                      <td className="px-5 py-3">
                        <span className="text-sm font-semibold text-white">{m.team2}</span>
                      </td>

                      {/* Score — inline editable inputs */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 justify-center">
                          <input
                            type="number"
                            min="0"
                            value={m.score1}
                            onChange={e => handleInlineField(m.id, 'score1', Number(e.target.value))}
                            className="w-10 text-center bg-white/5 border border-white/10 text-white text-sm font-bold rounded-lg px-1 py-1 outline-none focus:border-gaming-purple/60 transition-all"
                          />
                          <span className="text-gray-600 text-xs font-bold">:</span>
                          <input
                            type="number"
                            min="0"
                            value={m.score2}
                            onChange={e => handleInlineField(m.id, 'score2', Number(e.target.value))}
                            className="w-10 text-center bg-white/5 border border-white/10 text-white text-sm font-bold rounded-lg px-1 py-1 outline-none focus:border-gaming-blue/60 transition-all"
                          />
                        </div>
                      </td>

                      {/* Status — inline dropdown */}
                      <td className="px-4 py-3">
                        <div className="relative w-[110px]">
                          <select
                            value={m.status}
                            onChange={e => handleInlineField(m.id, 'status', e.target.value)}
                            className="w-full appearance-none bg-transparent border-0 text-xs font-bold cursor-pointer outline-none"
                            style={{ color: 'inherit' }}
                          >
                            <option value="LIVE">LIVE</option>
                            <option value="UPCOMING">UPCOMING</option>
                            <option value="COMPLETED">COMPLETED</option>
                          </select>
                          <StatusBadge status={m.status} />
                        </div>
                      </td>

                      {/* Game */}
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-300">{m.game || '—'}</span>
                      </td>

                      {/* Stage */}
                      <td className="px-4 py-3">
                        <span className="text-xs text-gray-400">{m.stage || '—'}</span>
                      </td>

                      {/* Time */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <Clock size={11} className="text-gray-600 flex-shrink-0" />
                          <span className="text-xs text-gray-400 whitespace-nowrap">{m.time || '—'}</span>
                        </div>
                        {m.streamUrl && (
                          <a
                            href={m.streamUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[10px] text-gaming-blue hover:underline mt-0.5"
                          >
                            <LinkIcon size={10} />
                            Stream
                          </a>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => { setShowAddForm(false); setEditingId(m.id); }}
                            title="Edit"
                            className="p-1.5 text-gray-500 hover:text-gaming-blue hover:bg-gaming-blue/10 rounded-lg transition-all cursor-pointer"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(m)}
                            title="Delete"
                            className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                          >
                            <Trash2 size={14} />
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

      {/* Delete Confirmation */}
      {deleteTarget && (
        <DeleteConfirmModal
          match={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};
