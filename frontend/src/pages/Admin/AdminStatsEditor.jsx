import React, { useState, useEffect } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import {
  BarChart3, Save, CheckCircle, PlusCircle, Trash2,
  Type, AlignLeft, Hash, Zap, Layers, GripVertical
} from 'lucide-react';

/* ─── Toast ─── */
const Toast = ({ message, onClose }) => (
  <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border border-gaming-purple/40 bg-gaming-purple/20 text-white backdrop-blur-md">
    <CheckCircle size={16} className="text-gaming-purple flex-shrink-0" />
    <span className="text-sm font-semibold">{message}</span>
    <button onClick={onClose} className="ml-2 text-gray-400 hover:text-white text-lg leading-none cursor-pointer">×</button>
  </div>
);

/* ─── Section Header ─── */
const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-start gap-3 mb-6">
    <div className="w-9 h-9 rounded-xl bg-gaming-purple/20 border border-gaming-purple/30 flex items-center justify-center flex-shrink-0 mt-0.5">
      <Icon size={16} className="text-gaming-purple" />
    </div>
    <div>
      <h2 className="text-base font-black text-white tracking-tight">{title}</h2>
      {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

/* ─── Stat Card Editor ─── */
const StatCardEditor = ({ stat, index, onChange }) => {
  // Derive a display colour for the preview gradient based on index
  const gradients = [
    'from-gaming-purple to-purple-900',
    'from-gaming-blue to-cyan-900',
    'from-gaming-purple to-indigo-900',
    'from-gaming-blue to-teal-900',
  ];
  const glows = [
    'rgba(124,58,237,0.35)',
    'rgba(6,182,212,0.35)',
    'rgba(124,58,237,0.25)',
    'rgba(6,182,212,0.25)',
  ];
  const gradient = gradients[index % gradients.length];
  const glow     = glows[index % glows.length];

  return (
    <div className="glass-panel rounded-2xl p-5 space-y-4 hover:border-white/10 transition-all duration-200">
      {/* Preview */}
      <div
        className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br ${gradient} bg-opacity-10 border border-white/5`}
        style={{ boxShadow: `inset 0 0 20px ${glow}` }}
      >
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient} flex-shrink-0`}
          style={{ boxShadow: `0 0 16px ${glow}` }}
        >
          <BarChart3 size={20} className="text-white" />
        </div>
        <div>
          <div className="text-2xl font-black text-white leading-none">
            {stat.value || <span className="text-gray-600">—</span>}
          </div>
          <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mt-1">
            {stat.label || <span className="text-gray-700">Label</span>}
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            <Hash size={11} className="text-gaming-purple" /> Value
          </label>
          <input
            type="text"
            value={stat.value}
            onChange={(e) => onChange(index, 'value', e.target.value)}
            placeholder="e.g. 150K+"
            className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2.5 text-sm font-black text-white placeholder-gray-700 focus:outline-none focus:border-gaming-purple/60 focus:ring-1 focus:ring-gaming-purple/30 transition-all duration-200"
          />
        </div>
        <div>
          <label className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            <Type size={11} className="text-gaming-purple" /> Label
          </label>
          <input
            type="text"
            value={stat.label}
            onChange={(e) => onChange(index, 'label', e.target.value)}
            placeholder="e.g. Players Reached"
            className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-gaming-purple/60 focus:ring-1 focus:ring-gaming-purple/30 transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
};

/* ─── Feature Row Editor ─── */
const FeatureRow = ({ feature, index, onChange, onRemove, isOnly }) => (
  <div className="glass-panel rounded-xl p-4 flex items-start gap-3 group hover:border-white/10 transition-all duration-200">
    <div className="flex-shrink-0 mt-1 text-gray-700 group-hover:text-gray-500 transition-colors">
      <GripVertical size={16} />
    </div>
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <label className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
          <Type size={10} className="text-gaming-blue" /> Title
        </label>
        <input
          type="text"
          value={feature.title}
          onChange={(e) => onChange(index, 'title', e.target.value)}
          placeholder="e.g. Fair Play"
          className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm font-bold text-white placeholder-gray-700 focus:outline-none focus:border-gaming-blue/60 focus:ring-1 focus:ring-gaming-blue/30 transition-all duration-200"
        />
      </div>
      <div>
        <label className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
          <AlignLeft size={10} className="text-gaming-blue" /> Description
        </label>
        <input
          type="text"
          value={feature.desc}
          onChange={(e) => onChange(index, 'desc', e.target.value)}
          placeholder="Short feature description…"
          className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-gaming-blue/60 focus:ring-1 focus:ring-gaming-blue/30 transition-all duration-200"
        />
      </div>
    </div>
    <button
      onClick={() => onRemove(index)}
      disabled={isOnly}
      className={`flex-shrink-0 p-2 rounded-lg transition-all duration-200 ${
        isOnly
          ? 'text-gray-700 cursor-not-allowed'
          : 'text-gray-600 hover:text-red-400 hover:bg-red-500/10 cursor-pointer'
      }`}
      title={isOnly ? 'Cannot remove the last feature' : 'Remove feature'}
    >
      <Trash2 size={14} />
    </button>
  </div>
);

/* ══════════════════════════════════════════════════════════════ */

export const AdminStatsEditor = () => {
  const { content, updateSection } = useSiteContent();

  /* ── Local state ── */
  const [stats, setStats] = useState(
    (content.stats || []).map(s => ({ ...s }))
  );
  const [features, setFeatures] = useState(
    (content.features || []).map(f => ({ ...f }))
  );

  /* ── Sync if content changes externally ── */
  useEffect(() => {
    setStats((content.stats || []).map(s => ({ ...s })));
    setFeatures((content.features || []).map(f => ({ ...f })));
  }, [content]);

  /* ── Toast ── */
  const [toast, setToast] = useState(null);
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  /* ── Stat handlers ── */
  const handleStatChange = (index, field, value) => {
    setStats(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s));
  };

  const handleSaveStats = () => {
    updateSection('stats', stats);
    showToast('Statistics saved successfully!');
  };

  /* ── Feature handlers ── */
  const handleFeatureChange = (index, field, value) => {
    setFeatures(prev => prev.map((f, i) => i === index ? { ...f, [field]: value } : f));
  };

  const handleAddFeature = () => {
    setFeatures(prev => [...prev, { title: '', desc: '' }]);
  };

  const handleRemoveFeature = (index) => {
    if (features.length <= 1) return;
    setFeatures(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveFeatures = () => {
    updateSection('features', features);
    showToast('Features saved successfully!');
  };

  /* ── Render ── */
  return (
    <div className="space-y-10 animate-fadeIn">

      {/* Page Title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gaming-purple/20 border border-gaming-purple/30 flex items-center justify-center">
          <BarChart3 size={16} className="text-gaming-purple" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Statistics & Features Editor</h1>
          <p className="text-xs text-gray-500">Edit the counters and feature highlights shown on the homepage.</p>
        </div>
      </div>

      {/* ── Stats Section ── */}
      <div className="glass-panel rounded-2xl p-6 md:p-8">
        <SectionHeader
          icon={Hash}
          title="Platform Statistics"
          subtitle="The 4 counter cards displayed on the homepage stats section."
        />

        {stats.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <StatCardEditor
                key={i}
                stat={stat}
                index={i}
                onChange={handleStatChange}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-600 text-sm">No stats configured.</div>
        )}

        {/* Stats summary preview strip */}
        {stats.length > 0 && (
          <div className="mt-6 p-4 bg-black/30 rounded-xl border border-white/5">
            <p className="text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-3">Section Preview Strip</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stats.map((s, i) => (
                <div key={i} className="text-center py-3">
                  <div className="text-xl font-black text-white">{s.value || '—'}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mt-1">{s.label || 'Label'}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 pt-5 border-t border-white/5">
          <button
            onClick={handleSaveStats}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gaming-purple hover:bg-gaming-purple/80 text-white font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-gaming-purple/30 cursor-pointer"
          >
            <Save size={15} />
            Save All Stats
          </button>
        </div>
      </div>

      {/* ── Features Section ── */}
      <div className="glass-panel rounded-2xl p-6 md:p-8">
        <SectionHeader
          icon={Layers}
          title="Platform Features"
          subtitle="The feature cards shown below the stats section. Add, edit, or remove feature items."
        />

        {/* Feature preview strip */}
        <div className="mb-5 p-4 bg-black/30 rounded-xl border border-white/5">
          <p className="text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-3">Live Preview</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {features.map((f, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-gaming-purple/5 border border-gaming-purple/10 hover:border-gaming-purple/20 transition-all"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Zap size={12} className="text-gaming-purple flex-shrink-0" />
                  <span className="text-xs font-black text-white truncate">{f.title || 'Feature Title'}</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">
                  {f.desc || 'Feature description…'}
                </p>
              </div>
            ))}
            {/* Add placeholder */}
            <button
              onClick={handleAddFeature}
              className="p-3 rounded-xl border border-dashed border-white/10 hover:border-gaming-blue/30 text-gray-700 hover:text-gaming-blue transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 text-xs font-bold"
            >
              <PlusCircle size={14} />
              Add Feature
            </button>
          </div>
        </div>

        {/* Feature rows editor */}
        <div className="space-y-3">
          {features.map((feature, i) => (
            <FeatureRow
              key={i}
              feature={feature}
              index={i}
              onChange={handleFeatureChange}
              onRemove={handleRemoveFeature}
              isOnly={features.length === 1}
            />
          ))}
        </div>

        {/* Add Feature Button */}
        <button
          onClick={handleAddFeature}
          className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/10 hover:border-gaming-blue/40 text-gray-500 hover:text-gaming-blue font-bold text-sm transition-all duration-200 cursor-pointer hover:bg-gaming-blue/5"
        >
          <PlusCircle size={16} />
          Add New Feature
        </button>

        <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap gap-3">
          <button
            onClick={handleSaveFeatures}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gaming-blue hover:bg-gaming-blue/80 text-white font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-gaming-blue/30 cursor-pointer"
          >
            <Save size={15} />
            Save Features
          </button>
          <span className="self-center text-[11px] text-gray-600 font-medium">
            {features.length} feature{features.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};
