import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import {
  Trophy, Plus, Pencil, Trash2, X, Check, Image as ImageIcon,
  AlertTriangle, ChevronDown, Calendar, Gamepad2, Layers, DollarSign, Tag
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

const EMPTY_FORM = {
  name: '',
  game: '',
  image: '',
  mode: '',
  format: '',
  prize: '',
  date: '',
  status: 'UPCOMING',
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.UPCOMING;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${cfg.classes}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

const FormField = ({ label, icon: Icon, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
      {Icon && <Icon size={12} className="text-gaming-purple" />}
      {label}
    </label>
    {children}
  </div>
);

const inputClass =
  'w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-gaming-purple/60 focus:bg-white/8 placeholder-gray-600 transition-all duration-200';

const TournamentForm = ({ initial, onSave, onCancel, title }) => {
  const [form, setForm] = useState({ ...EMPTY_FORM, ...initial });

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave(form);
  };

  return (
    <div className="glass-panel border border-gaming-purple/30 rounded-2xl p-6 mb-6 shadow-[0_0_30px_rgba(124,58,237,0.1)]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Trophy size={16} className="text-gaming-purple" />
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
        <FormField label="Tournament Name" icon={Tag}>
          <input
            className={`${inputClass} col-span-full`}
            placeholder="e.g. StageCore Valorant Cup #12"
            value={form.name}
            onChange={e => set('name', e.target.value)}
            required
          />
        </FormField>

        <FormField label="Game" icon={Gamepad2}>
          <input
            className={inputClass}
            placeholder="e.g. Valorant"
            value={form.game}
            onChange={e => set('game', e.target.value)}
          />
        </FormField>

        <FormField label="Mode" icon={Layers}>
          <input
            className={inputClass}
            placeholder="e.g. 5v5 / Squad"
            value={form.mode}
            onChange={e => set('mode', e.target.value)}
          />
        </FormField>

        <FormField label="Format" icon={Layers}>
          <input
            className={inputClass}
            placeholder="e.g. Single Elim"
            value={form.format}
            onChange={e => set('format', e.target.value)}
          />
        </FormField>

        <FormField label="Prize Pool" icon={DollarSign}>
          <input
            className={inputClass}
            placeholder="e.g. ₹ 25,000"
            value={form.prize}
            onChange={e => set('prize', e.target.value)}
          />
        </FormField>

        <FormField label="Date" icon={Calendar}>
          <input
            className={inputClass}
            placeholder="e.g. 25 May - 26 May"
            value={form.date}
            onChange={e => set('date', e.target.value)}
          />
        </FormField>

        <FormField label="Status" icon={Tag}>
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

        <div className="sm:col-span-2 lg:col-span-3">
          <FormField label="Image URL" icon={ImageIcon}>
            <input
              className={inputClass}
              placeholder="https://example.com/image.png"
              value={form.image}
              onChange={e => set('image', e.target.value)}
            />
          </FormField>
        </div>

        {form.image && (
          <div className="sm:col-span-2 lg:col-span-3 flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
            <img
              src={form.image}
              alt="preview"
              className="w-16 h-10 object-cover rounded-lg border border-white/10"
              onError={e => { e.target.style.display = 'none'; }}
            />
            <span className="text-xs text-gray-400">Image preview</span>
          </div>
        )}

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
            className="flex items-center gap-2 px-5 py-2 bg-gaming-purple hover:bg-gaming-purple/80 text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-[0_0_15px_rgba(124,58,237,0.3)] cursor-pointer"
          >
            <Check size={14} />
            Save Tournament
          </button>
        </div>
      </form>
    </div>
  );
};

const DeleteConfirmModal = ({ tournament, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
    <div className="relative glass-panel border border-red-500/30 rounded-2xl p-6 max-w-sm w-full shadow-[0_0_40px_rgba(239,68,68,0.15)]">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
          <AlertTriangle size={24} className="text-red-400" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white mb-1">Delete Tournament?</h3>
          <p className="text-sm text-gray-400">
            Are you sure you want to delete{' '}
            <span className="text-white font-semibold">"{tournament.name}"</span>?
            This action cannot be undone.
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

export const AdminTournamentsEditor = () => {
  const { content, updateSection } = useSiteContent();
  const tournaments = content.tournaments || [];

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleAdd = (form) => {
    const newTournament = { ...form, id: Date.now() };
    updateSection('tournaments', [...tournaments, newTournament]);
    setShowAddForm(false);
  };

  const handleEdit = (form) => {
    const updated = tournaments.map(t => t.id === editingId ? { ...t, ...form } : t);
    updateSection('tournaments', updated);
    setEditingId(null);
  };

  const handleDelete = () => {
    const updated = tournaments.filter(t => t.id !== deleteTarget.id);
    updateSection('tournaments', updated);
    setDeleteTarget(null);
  };

  const editingTournament = tournaments.find(t => t.id === editingId);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gaming-purple/20 border border-gaming-purple/30 flex items-center justify-center">
              <Trophy size={18} className="text-gaming-purple" />
            </div>
            Tournaments Manager
          </h1>
          <p className="text-sm text-gray-500 mt-1 ml-12">
            {tournaments.length} tournament{tournaments.length !== 1 ? 's' : ''} total
          </p>
        </div>
        {!showAddForm && !editingId && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gaming-purple hover:bg-gaming-purple/80 text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(124,58,237,0.3)] cursor-pointer whitespace-nowrap"
          >
            <Plus size={16} />
            Add New Tournament
          </button>
        )}
      </div>

      {/* Add Form */}
      {showAddForm && (
        <TournamentForm
          title="Add New Tournament"
          initial={EMPTY_FORM}
          onSave={handleAdd}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Edit Form */}
      {editingId && editingTournament && (
        <TournamentForm
          title="Edit Tournament"
          initial={editingTournament}
          onSave={handleEdit}
          onCancel={() => setEditingId(null)}
        />
      )}

      {/* Tournaments Table */}
      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        {tournaments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gaming-purple/10 border border-gaming-purple/20 flex items-center justify-center mb-4">
              <Trophy size={28} className="text-gaming-purple/50" />
            </div>
            <h3 className="text-base font-bold text-white/50 mb-1">No Tournaments Yet</h3>
            <p className="text-sm text-gray-600">Click "Add New Tournament" to create the first one.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Image</th>
                  <th className="text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Name</th>
                  <th className="text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Game</th>
                  <th className="text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Mode</th>
                  <th className="text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Format</th>
                  <th className="text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Prize</th>
                  <th className="text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Date</th>
                  <th className="text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Status</th>
                  <th className="text-right text-[11px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {tournaments.map((t) => (
                  <tr
                    key={t.id}
                    className="hover:bg-white/3 transition-colors duration-150 group"
                  >
                    {/* Image */}
                    <td className="px-5 py-3">
                      {t.image ? (
                        <img
                          src={t.image}
                          alt={t.name}
                          className="w-14 h-9 object-cover rounded-lg border border-white/10"
                          onError={e => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div
                        className="w-14 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center"
                        style={{ display: t.image ? 'none' : 'flex' }}
                      >
                        <ImageIcon size={14} className="text-gray-600" />
                      </div>
                    </td>

                    {/* Name */}
                    <td className="px-5 py-3">
                      <span className="text-sm font-semibold text-white group-hover:text-gaming-blue transition-colors line-clamp-1 max-w-[200px] block">
                        {t.name}
                      </span>
                    </td>

                    {/* Game */}
                    <td className="px-5 py-3">
                      <span className="text-sm text-gray-300">{t.game || '—'}</span>
                    </td>

                    {/* Mode */}
                    <td className="px-5 py-3">
                      <span className="text-sm text-gray-400">{t.mode || '—'}</span>
                    </td>

                    {/* Format */}
                    <td className="px-5 py-3">
                      <span className="text-sm text-gray-400">{t.format || '—'}</span>
                    </td>

                    {/* Prize */}
                    <td className="px-5 py-3">
                      <span className="text-sm font-semibold text-gaming-blue">{t.prize || '—'}</span>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-3">
                      <span className="text-xs text-gray-400 whitespace-nowrap">{t.date || '—'}</span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3">
                      <StatusBadge status={t.status} />
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setShowAddForm(false);
                            setEditingId(t.id);
                          }}
                          title="Edit"
                          className="p-1.5 text-gray-500 hover:text-gaming-blue hover:bg-gaming-blue/10 rounded-lg transition-all cursor-pointer"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(t)}
                          title="Delete"
                          className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                        >
                          <Trash2 size={14} />
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

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <DeleteConfirmModal
          tournament={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};
