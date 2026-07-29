import React, { useState } from 'react';
import { useSiteContent } from '../../../context/SiteContentContext';
import {
  Newspaper, Plus, Pencil, Trash2, Globe, FileText, Tag,
  ImageIcon, Eye, BookOpen, AlertTriangle, ArrowLeft, Check, X,
  Bold, Italic, Underline, Link as LinkIcon, Code, EyeOff, Save
} from 'lucide-react';

const EMPTY_ARTICLE = {
  title: '',
  tags: '',
  thumbnail: '',
  content: '',
  metaTitle: '',
  metaDescription: '',
  status: 'Draft', // Draft or Published
};

export const NewsList = ({ defaultOpenCreate = false }) => {
  const { content: siteContent, updateSection } = useSiteContent();
  const news = siteContent.news || [];

  // Editor states
  const [showEditor, setShowEditor] = useState(defaultOpenCreate);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_ARTICLE);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  // Tab filter: 'All', 'Published', 'Draft'
  const [filterStatus, setFilterStatus] = useState('All');

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateNew = () => {
    setForm(EMPTY_ARTICLE);
    setEditingId(null);
    setShowEditor(true);
  };

  const handleEdit = (article) => {
    setForm({
      title: article.title || '',
      tags: Array.isArray(article.tags) ? article.tags.join(', ') : (article.category || ''),
      thumbnail: article.thumbnail || article.image || '',
      content: article.content || article.desc || '',
      metaTitle: article.metaTitle || article.title || '',
      metaDescription: article.metaDescription || article.desc || '',
      status: article.status || 'Published',
    });
    setEditingId(article.id);
    setShowEditor(true);
  };

  const handleTogglePublish = (id) => {
    const updated = news.map(art => {
      if (art.id === id) {
        const nextStatus = art.status === 'Published' ? 'Draft' : 'Published';
        showToast(`Article set to ${nextStatus}.`);
        return { ...art, status: nextStatus };
      }
      return art;
    });
    updateSection('news', updated);
  };

  const handleDelete = () => {
    const updated = news.filter(art => art.id !== deleteTarget.id);
    updateSection('news', updated);
    setDeleteTarget(null);
    showToast('Article deleted successfully.', 'error');
  };

  const handleSave = (status) => {
    if (!form.title.trim()) {
      showToast('Please enter a title', 'error');
      return;
    }

    const updatedTags = form.tags.split(',').map(t => t.trim()).filter(Boolean);
    const readTimeCalc = `${Math.max(1, Math.ceil(form.content.split(/\s+/).length / 200))} min read`;
    
    const articlePayload = {
      title: form.title,
      tags: updatedTags,
      category: updatedTags[0] || 'Uncategorized',
      thumbnail: form.thumbnail,
      image: form.thumbnail, // for backward compatibility
      content: form.content,
      desc: form.content.slice(0, 150) + (form.content.length > 150 ? '...' : ''),
      metaTitle: form.metaTitle || form.title,
      metaDescription: form.metaDescription || form.content.slice(0, 150),
      status: status || form.status,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), // e.g. 31 May 2026
      readTime: readTimeCalc,
    };

    if (editingId) {
      // Edit existing
      const updated = news.map(art => 
        art.id === editingId ? { ...art, ...articlePayload } : art
      );
      updateSection('news', updated);
      showToast('Article updated successfully.');
    } else {
      // Create new
      const newArticle = {
        ...articlePayload,
        id: Date.now(),
      };
      updateSection('news', [newArticle, ...news]);
      showToast('Article created successfully.');
    }

    setShowEditor(false);
  };

  // Insert mock formatting at cursor
  const handleFormatText = (prefix, suffix) => {
    const textarea = document.getElementById('article-content-area');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = form.content;
    const selected = text.substring(start, end);
    const replacement = prefix + (selected || 'text') + suffix;

    setForm(prev => ({
      ...prev,
      content: text.substring(0, start) + replacement + text.substring(end)
    }));

    // Reset selection focus
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected || 'text').length);
    }, 50);
  };

  const filteredNews = news.filter(art => {
    const status = art.status || 'Published'; // default legacy articles to published
    if (filterStatus === 'All') return true;
    return status.toLowerCase() === filterStatus.toLowerCase();
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-md transition-all duration-300 ${
          toast.type === 'success'
            ? 'bg-gaming-purple/20 border-gaming-purple/40 text-white'
            : 'bg-red-500/20 border-red-500/40 text-white'
        }`}>
          {toast.type === 'success' ? (
            <Check size={16} className="text-gaming-purple flex-shrink-0" />
          ) : (
            <AlertTriangle size={16} className="text-red-400 flex-shrink-0" />
          )}
          <span className="text-sm font-semibold">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 text-gray-400 hover:text-white text-lg leading-none cursor-pointer">×</button>
        </div>
      )}

      {/* Editor View */}
      {showEditor ? (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowEditor(false)}
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <h1 className="text-xl font-black text-white flex items-center gap-2">
                {editingId ? 'Edit Article' : 'Create New Article'}
              </h1>
              <p className="text-xs text-gray-500">Draft, format, and optimize content for SEO.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Main Form Fields (2 cols) */}
            <div className="lg:col-span-2 space-y-5">
              <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Article Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter a catchy title..."
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gaming-purple/60 transition-all"
                  />
                </div>

                {/* Tags and Thumbnail Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                      <Tag size={12} className="text-gaming-purple" />
                      Tags
                    </label>
                    <input
                      type="text"
                      value={form.tags}
                      onChange={e => setForm(prev => ({ ...prev, tags: e.target.value }))}
                      placeholder="e.g. Announcement, Guide, Update"
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gaming-purple/60 transition-all"
                    />
                    <p className="text-[10px] text-gray-600">Separate multiple tags with commas.</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                      <ImageIcon size={12} className="text-gaming-purple" />
                      Thumbnail URL
                    </label>
                    <input
                      type="text"
                      value={form.thumbnail}
                      onChange={e => setForm(prev => ({ ...prev, thumbnail: e.target.value }))}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gaming-purple/60 transition-all"
                    />
                  </div>
                </div>

                {/* Thumbnail Preview */}
                {form.thumbnail && (
                  <div className="p-3 bg-black/30 rounded-xl border border-white/5 flex items-center gap-3">
                    <img
                      src={form.thumbnail}
                      alt="Thumbnail Preview"
                      className="w-16 h-10 object-cover rounded-lg border border-white/10"
                      onError={e => e.target.style.display = 'none'}
                    />
                    <span className="text-xs text-gray-500">Thumbnail Preview Link Loaded</span>
                  </div>
                )}

                {/* Content Textarea with Format Bar */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Article Content</span>
                    <span className="text-[10px] text-gray-600 font-mono">{form.content.length} characters</span>
                  </label>

                  {/* Format Bar */}
                  <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 bg-black/50 border border-white/10 border-b-0 rounded-t-xl">
                    <button
                      type="button"
                      onClick={() => handleFormatText('**', '**')}
                      title="Bold"
                      className="p-1.5 hover:bg-white/5 hover:text-white text-gray-400 rounded transition-all cursor-pointer"
                    >
                      <Bold size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFormatText('*', '*')}
                      title="Italic"
                      className="p-1.5 hover:bg-white/5 hover:text-white text-gray-400 rounded transition-all cursor-pointer"
                    >
                      <Italic size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFormatText('<u>', '</u>')}
                      title="Underline"
                      className="p-1.5 hover:bg-white/5 hover:text-white text-gray-400 rounded transition-all cursor-pointer"
                    >
                      <Underline size={13} />
                    </button>
                    <div className="w-px h-4 bg-white/10 mx-1" />
                    <button
                      type="button"
                      onClick={() => handleFormatText('[', '](url)')}
                      title="Insert Link"
                      className="p-1.5 hover:bg-white/5 hover:text-white text-gray-400 rounded transition-all cursor-pointer"
                    >
                      <LinkIcon size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFormatText('`', '`')}
                      title="Code Block"
                      className="p-1.5 hover:bg-white/5 hover:text-white text-gray-400 rounded transition-all cursor-pointer"
                    >
                      <Code size={13} />
                    </button>
                  </div>

                  <textarea
                    id="article-content-area"
                    value={form.content}
                    onChange={e => setForm(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Write your article here (markdown styling supported)..."
                    rows={12}
                    className="w-full bg-black/30 border border-white/10 rounded-b-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gaming-purple/60 transition-all resize-y min-h-[200px]"
                  />
                </div>
              </div>
            </div>

            {/* Right: SEO and Meta settings (1 col) */}
            <div className="space-y-6">
              <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
                <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-white/5 pb-3">
                  <Globe size={14} className="text-gaming-purple" />
                  SEO & Search Settings
                </h3>

                {/* Meta Title */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Meta Title</label>
                  <input
                    type="text"
                    value={form.metaTitle}
                    onChange={e => setForm(prev => ({ ...prev, metaTitle: e.target.value }))}
                    placeholder={form.title || "Custom search title..."}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gaming-purple/60 transition-all"
                  />
                  <p className="text-[9px] text-gray-600">Recommends 50-60 characters.</p>
                </div>

                {/* Meta Description */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Meta Description</label>
                  <textarea
                    value={form.metaDescription}
                    onChange={e => setForm(prev => ({ ...prev, metaDescription: e.target.value }))}
                    placeholder={form.content.slice(0, 100) || "Search preview snippet..."}
                    rows={4}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gaming-purple/60 transition-all resize-none"
                  />
                  <p className="text-[9px] text-gray-600">Max 160 characters suggested.</p>
                </div>
              </div>

              {/* Publish Controls */}
              <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-3">
                <h3 className="text-xs font-black text-white uppercase tracking-wider border-b border-white/5 pb-3">
                  Publish Actions
                </h3>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleSave('Published')}
                    className="w-full py-2.5 bg-gaming-purple hover:bg-gaming-purple/85 text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-gaming-purple/15"
                  >
                    <Globe size={13} />
                    <span>Publish Immediately</span>
                  </button>
                  <button
                    onClick={() => handleSave('Draft')}
                    className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Save size={13} />
                    <span>Save as Draft</span>
                  </button>
                  <button
                    onClick={() => setShowEditor(false)}
                    className="w-full py-2.5 text-center text-xs font-bold text-gray-500 hover:text-white transition-all cursor-pointer"
                  >
                    Cancel Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* News List View */
        <div className="space-y-6">
          {/* Top Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-white flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gaming-purple/20 border border-gaming-purple/30 flex items-center justify-center">
                  <Newspaper size={18} className="text-gaming-purple" />
                </div>
                News & Blog Content CMS
              </h1>
              <p className="text-xs text-gray-500 mt-1 ml-12">
                Manage, schedule, and publish esports news articles.
              </p>
            </div>
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 px-5 py-2.5 bg-gaming-purple hover:bg-gaming-purple/80 text-white text-xs font-extrabold rounded-xl transition-all duration-200 shadow-lg shadow-gaming-purple/20 cursor-pointer whitespace-nowrap"
            >
              <Plus size={15} />
              <span>Create Article</span>
            </button>
          </div>

          {/* Sub Filters */}
          <div className="flex border-b border-white/5 gap-1">
            {['All', 'Published', 'Draft'].map(status => {
              const count = status === 'All' 
                ? news.length 
                : news.filter(art => (art.status || 'Published').toLowerCase() === status.toLowerCase()).length;
              const isActive = filterStatus === status;
              return (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-5 py-3 text-xs uppercase tracking-wider font-extrabold border-b-2 transition-all duration-150 cursor-pointer ${
                    isActive 
                      ? 'border-gaming-purple text-white bg-gaming-purple/5'
                      : 'border-transparent text-gray-500 hover:text-white hover:bg-white/3'
                  }`}
                >
                  {status}s ({count})
                </button>
              );
            })}
          </div>

          {/* Articles Grid */}
          {filteredNews.length === 0 ? (
            <div className="glass-panel py-20 text-center rounded-2xl border border-white/5">
              <div className="w-16 h-16 rounded-2xl bg-gaming-purple/10 border border-gaming-purple/20 flex items-center justify-center mx-auto mb-4">
                <Newspaper size={28} className="text-gaming-purple/40" />
              </div>
              <h3 className="text-base font-bold text-white/50 mb-1">No Articles Found</h3>
              <p className="text-xs text-gray-600">Select "Create Article" to write your first content block.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredNews.map(article => {
                const status = article.status || 'Published';
                const tagList = Array.isArray(article.tags) 
                  ? article.tags 
                  : (article.category ? [article.category] : []);
                
                return (
                  <div
                    key={article.id}
                    className="glass-panel border border-white/5 rounded-2xl overflow-hidden hover:border-gaming-purple/35 transition-all duration-300 flex flex-col justify-between group shadow-lg bg-[#03050f]/30"
                  >
                    {/* Header Image and badges */}
                    <div className="relative aspect-video w-full bg-black/60 overflow-hidden border-b border-white/5">
                      {article.thumbnail || article.image ? (
                        <img
                          src={article.thumbnail || article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-700">
                          <ImageIcon size={30} />
                        </div>
                      )}

                      {/* Status pill overlay */}
                      <span className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${
                        status === 'Published'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {status}
                      </span>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {tagList.map((tag, i) => (
                            <span key={i} className="text-[9px] text-gaming-blue font-bold uppercase tracking-wider bg-gaming-blue/10 px-1.5 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Title */}
                        <h3 className="text-sm font-extrabold text-white group-hover:text-gaming-purple transition-all line-clamp-2">
                          {article.title}
                        </h3>

                        {/* Snippet */}
                        <p className="text-[11px] text-gray-500 line-clamp-3 leading-relaxed">
                          {article.content || article.desc}
                        </p>
                      </div>

                      {/* Meta Footer */}
                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5 text-[10px] font-semibold text-gray-600">
                        <span className="flex items-center gap-1">
                          <BookOpen size={11} />
                          {article.readTime || '3 min read'}
                        </span>
                        <span>{article.date}</span>
                      </div>
                    </div>

                    {/* Actions Panel */}
                    <div className="bg-[#03050f]/80 px-4 py-2 border-t border-white/5 flex items-center justify-between">
                      <button
                        onClick={() => handleTogglePublish(article.id)}
                        className={`text-[10px] font-bold uppercase flex items-center gap-1.5 transition-all cursor-pointer ${
                          status === 'Published'
                            ? 'text-gray-500 hover:text-amber-400'
                            : 'text-gaming-blue hover:text-emerald-400'
                        }`}
                        title={status === 'Published' ? 'De-publish and draft' : 'Go live'}
                      >
                        {status === 'Published' ? (
                          <>
                            <EyeOff size={12} />
                            <span>Draft</span>
                          </>
                        ) : (
                          <>
                            <Globe size={12} />
                            <span>Publish</span>
                          </>
                        )}
                      </button>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(article)}
                          className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer"
                          title="Edit"
                        >
                          <Pencil size={12} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(article)}
                          className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
          <div className="relative glass-panel border border-red-500/30 rounded-2xl p-6 max-w-sm w-full shadow-2xl bg-[#050816]">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">Delete Article?</h3>
                <p className="text-xs text-gray-400">
                  Are you sure you want to delete <span className="text-white font-semibold">"{deleteTarget.title}"</span>? This will permanently delete it from the website newsfeed.
                </p>
              </div>
              <div className="flex gap-2 w-full">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-2 text-xs font-bold text-gray-500 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-2 text-xs font-black text-white bg-red-500 hover:bg-red-600 rounded-xl transition-all cursor-pointer"
                >
                  Delete Permanent
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
