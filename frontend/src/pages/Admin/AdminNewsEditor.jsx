import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import {
  Newspaper, Plus, Pencil, Trash2, X, Check,
  AlertTriangle, Calendar, Clock, Tag, FileText, ChevronDown
} from 'lucide-react';

const EMPTY_ARTICLE = {
  title: '',
  category: '',
  date: '',
  readTime: '',
  desc: '',
};

const inputClass =
  'w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-gaming-purple/60 placeholder-gray-600 transition-all duration-200';

const CATEGORY_COLORS = {
  'Announcement': 'bg-gaming-purple/20 text-gaming-purple border border-gaming-purple/30',
  'Event Update': 'bg-gaming-blue/20 text-gaming-blue border border-gaming-blue/30',
  'Behind the Scenes': 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  'Interview': 'bg-green-500/20 text-green-400 border border-green-500/30',
  'News': 'bg-blue-400/20 text-blue-300 border border-blue-400/30',
};

const getCategoryStyle = (category) =>
  CATEGORY_COLORS[category] || 'bg-white/10 text-gray-300 border border-white/15';

const FormField = ({ label, icon: Icon, children, className = '' }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
      {Icon && <Icon size={12} className="text-gaming-purple" />}
      {label}
    </label>
    {children}
  </div>
);

const ArticleForm = ({ initial, onSave, onCancel, title: formTitle }) => {
  const [form, setForm] = useState({ ...EMPTY_ARTICLE, ...initial });

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave(form);
  };

  return (
    <div className="glass-panel border border-gaming-purple/30 rounded-2xl p-6 mb-6 shadow-[0_0_30px_rgba(124,58,237,0.1)]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Newspaper size={16} className="text-gaming-purple" />
          {formTitle}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <FormField label="Article Title" icon={FileText}>
          <input
            className={inputClass}
            placeholder="e.g. StageCore Announces Valorant Pro Series Season 3"
            value={form.title}
            onChange={e => set('title', e.target.value)}
            required
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Category */}
          <FormField label="Category" icon={Tag}>
            <input
              className={inputClass}
              placeholder="e.g. Announcement"
              value={form.category}
              onChange={e => set('category', e.target.value)}
              list="category-suggestions"
            />
            <datalist id="category-suggestions">
              <option value="Announcement" />
              <option value="Event Update" />
              <option value="Behind the Scenes" />
              <option value="Interview" />
              <option value="News" />
            </datalist>
          </FormField>

          {/* Date */}
          <FormField label="Date" icon={Calendar}>
            <input
              type="date"
              className={inputClass}
              value={form.date}
              onChange={e => {
                // Store as formatted display string
                const raw = e.target.value; // yyyy-mm-dd
                if (raw) {
                  const d = new Date(raw);
                  const formatted = d.toLocaleDateString('en-GB', {
                    day: '2-digit', month: 'short', year: 'numeric'
                  });
                  set('date', formatted);
                } else {
                  set('date', '');
                }
              }}
            />
            {form.date && (
              <span className="text-xs text-gray-500 -mt-1">Stored as: {form.date}</span>
            )}
          </FormField>

          {/* Read Time */}
          <FormField label="Read Time" icon={Clock}>
            <input
              className={inputClass}
              placeholder="e.g. 5 min read"
              value={form.readTime}
              onChange={e => set('readTime', e.target.value)}
            />
          </FormField>
        </div>

        {/* Description */}
        <FormField label="Description / Excerpt" icon={FileText}>
          <textarea
            className={`${inputClass} resize-none`}
            rows={4}
            placeholder="Write a brief description or excerpt for the article..."
            value={form.desc}
            onChange={e => set('desc', e.target.value)}
          />
        </FormField>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/5">
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
            Save Article
          </button>
        </div>
      </form>
    </div>
  );
};

const DeleteConfirmModal = ({ article, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
    <div className="relative glass-panel border border-red-500/30 rounded-2xl p-6 max-w-sm w-full shadow-[0_0_40px_rgba(239,68,68,0.15)]">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
          <AlertTriangle size={24} className="text-red-400" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white mb-1">Delete Article?</h3>
          <p className="text-sm text-gray-400">
            Permanently delete{' '}
            <span className="text-white font-semibold line-clamp-1">"{article.title}"</span>?
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

const ArticleCard = ({ article, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-panel rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-200 overflow-hidden group">
      {/* Card Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            {/* Category + Date */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {article.category && (
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getCategoryStyle(article.category)}`}>
                  {article.category}
                </span>
              )}
              {article.date && (
                <span className="flex items-center gap-1 text-[11px] text-gray-500">
                  <Calendar size={10} />
                  {article.date}
                </span>
              )}
              {article.readTime && (
                <span className="flex items-center gap-1 text-[11px] text-gray-500">
                  <Clock size={10} />
                  {article.readTime}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-sm font-bold text-white group-hover:text-gaming-blue transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h3>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 flex-shrink-0 mt-0.5">
            <button
              onClick={() => onEdit(article)}
              title="Edit"
              className="p-1.5 text-gray-500 hover:text-gaming-blue hover:bg-gaming-blue/10 rounded-lg transition-all cursor-pointer"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(article)}
              title="Delete"
              className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* Description Preview */}
        {article.desc && (
          <div>
            <p className={`text-xs text-gray-400 leading-relaxed transition-all ${expanded ? '' : 'line-clamp-2'}`}>
              {article.desc}
            </p>
            {article.desc.length > 120 && (
              <button
                onClick={() => setExpanded(p => !p)}
                className="flex items-center gap-1 text-[11px] text-gaming-purple hover:text-gaming-blue mt-1 transition-colors cursor-pointer"
              >
                {expanded ? 'Show less' : 'Read more'}
                <ChevronDown
                  size={11}
                  className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const AdminNewsEditor = () => {
  const { content, updateSection } = useSiteContent();
  const news = content.news || [];

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleAdd = (form) => {
    const article = { ...form, id: Date.now() };
    updateSection('news', [article, ...news]);
    setShowAddForm(false);
  };

  const handleEdit = (form) => {
    const updated = news.map(a => a.id === editingArticle.id ? { ...a, ...form } : a);
    updateSection('news', updated);
    setEditingArticle(null);
  };

  const handleDelete = () => {
    updateSection('news', news.filter(a => a.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gaming-purple/20 border border-gaming-purple/30 flex items-center justify-center">
              <Newspaper size={18} className="text-gaming-purple" />
            </div>
            News &amp; Articles Manager
          </h1>
          <p className="text-sm text-gray-500 mt-1 ml-12">
            {news.length} article{news.length !== 1 ? 's' : ''} published
          </p>
        </div>
        {!showAddForm && !editingArticle && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gaming-purple hover:bg-gaming-purple/80 text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(124,58,237,0.3)] cursor-pointer whitespace-nowrap"
          >
            <Plus size={16} />
            Add New Article
          </button>
        )}
      </div>

      {/* Add Form */}
      {showAddForm && (
        <ArticleForm
          title="Add New Article"
          initial={EMPTY_ARTICLE}
          onSave={handleAdd}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Edit Form */}
      {editingArticle && (
        <ArticleForm
          title="Edit Article"
          initial={editingArticle}
          onSave={handleEdit}
          onCancel={() => setEditingArticle(null)}
        />
      )}

      {/* Articles Grid */}
      {news.length === 0 ? (
        <div className="glass-panel rounded-2xl border border-white/5 flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gaming-purple/10 border border-gaming-purple/20 flex items-center justify-center mb-4">
            <Newspaper size={28} className="text-gaming-purple/50" />
          </div>
          <h3 className="text-base font-bold text-white/50 mb-1">No Articles Yet</h3>
          <p className="text-sm text-gray-600">Click "Add New Article" to publish the first piece.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {news.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onEdit={(a) => {
                setShowAddForm(false);
                setEditingArticle(a);
              }}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <DeleteConfirmModal
          article={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};
