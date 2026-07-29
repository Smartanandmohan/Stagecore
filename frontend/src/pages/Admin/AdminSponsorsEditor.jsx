import React, { useState, useEffect } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import {
  Handshake,
  Plus,
  Trash2,
  Save,
  CheckCircle,
  Globe,
  Link,
  Tag,
  Building2,
  Sparkles,
} from 'lucide-react';

// ─── Reusable labelled input ───────────────────────────────────────────────────
const Field = ({ label, icon: Icon, value, onChange, placeholder, type = 'text' }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
      {Icon && <Icon size={11} className="text-gaming-purple" />}
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gaming-purple/60 focus:bg-white/8 transition-all duration-200"
    />
  </div>
);

// ─── Toast notification ────────────────────────────────────────────────────────
const Toast = ({ message, visible }) => (
  <div
    className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-green-500/20 border border-green-500/40 text-green-400 font-bold text-sm shadow-2xl transition-all duration-500 ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
    }`}
  >
    <CheckCircle size={18} />
    {message}
  </div>
);

// ─── AdminSponsorsEditor ───────────────────────────────────────────────────────
export const AdminSponsorsEditor = () => {
  const { content, updateSection } = useSiteContent();

  // Local state mirrors
  const [sponsors, setSponsors] = useState([]);
  const [heading, setHeading] = useState('');
  const [subtext, setSubtext] = useState('');
  const [toast, setToast] = useState(false);
  const [nextId, setNextId] = useState(100);

  // Sync from context on mount / content change
  useEffect(() => {
    setSponsors(
      (content.sponsors || []).map((s) => ({ ...s, _key: s.id ?? Math.random() }))
    );
    setHeading(content.sponsorsHeading || '');
    setSubtext(content.sponsorsSubtext || '');
  }, [content.sponsors, content.sponsorsHeading, content.sponsorsSubtext]);

  // ── Sponsor CRUD helpers ────────────────────────────────────────────────────
  const addSponsor = () => {
    const newId = nextId;
    setNextId((n) => n + 1);
    setSponsors((prev) => [
      ...prev,
      { id: newId, _key: newId, name: '', type: '', url: '' },
    ]);
  };

  const updateSponsor = (key, field, value) => {
    setSponsors((prev) =>
      prev.map((s) => (s._key === key ? { ...s, [field]: value } : s))
    );
  };

  const deleteSponsor = (key) => {
    setSponsors((prev) => prev.filter((s) => s._key !== key));
  };

  // ── Save all ────────────────────────────────────────────────────────────────
  const handleSave = () => {
    const cleaned = sponsors.map(({ _key, ...rest }) => rest);
    updateSection('sponsors', cleaned);
    updateSection('sponsorsHeading', heading);
    updateSection('sponsorsSubtext', subtext);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <Toast message="Sponsors saved successfully!" visible={toast} />

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-xl bg-gaming-purple/20 border border-gaming-purple/30 flex items-center justify-center">
              <Handshake size={16} className="text-gaming-purple" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Sponsors Editor</h1>
          </div>
          <p className="text-gray-400 text-sm pl-11">
            Manage sponsor cards, section heading, and subtext displayed on the public site.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-gaming-purple to-purple-700 hover:from-purple-600 hover:to-gaming-purple text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-gaming-purple/40 transition-all duration-200 hover:scale-[1.03] self-start sm:self-auto"
        >
          <Save size={15} />
          Save All
        </button>
      </div>

      {/* ── Section heading & subtext ── */}
      <div className="glass-panel rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={15} className="text-gaming-purple" />
          <h2 className="text-sm font-black text-white uppercase tracking-wider">Section Copy</h2>
        </div>

        <Field
          label="Sponsors Section Heading"
          icon={Tag}
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          placeholder="e.g. Trusted by Industry Leaders"
        />
        <Field
          label="Sponsors Section Subtext"
          icon={Tag}
          value={subtext}
          onChange={(e) => setSubtext(e.target.value)}
          placeholder="e.g. We partner with world-leading brands…"
        />
      </div>

      {/* ── Sponsor cards grid ── */}
      <div className="glass-panel rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Handshake size={15} className="text-gaming-blue" />
            <h2 className="text-sm font-black text-white uppercase tracking-wider">
              Sponsors
              <span className="ml-2 text-[11px] text-gray-500 normal-case font-semibold tracking-normal">
                ({sponsors.length} total)
              </span>
            </h2>
          </div>

          <button
            onClick={addSponsor}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gaming-purple/20 hover:bg-gaming-purple/30 border border-gaming-purple/30 hover:border-gaming-purple/50 text-gaming-purple font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:scale-[1.03]"
          >
            <Plus size={14} />
            Add Sponsor
          </button>
        </div>

        {sponsors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Handshake size={36} className="text-gray-700 mb-3" />
            <p className="text-gray-500 text-sm font-medium mb-2">No sponsors yet.</p>
            <button
              onClick={addSponsor}
              className="text-xs text-gaming-purple hover:underline font-bold"
            >
              Add your first sponsor →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {sponsors.map((sponsor, index) => (
              <SponsorCard
                key={sponsor._key}
                sponsor={sponsor}
                index={index}
                onUpdate={updateSponsor}
                onDelete={deleteSponsor}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Bottom save ── */}
      <div className="flex justify-end pt-2 pb-6">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gaming-purple to-purple-700 hover:from-purple-600 hover:to-gaming-purple text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-gaming-purple/40 transition-all duration-200 hover:scale-[1.03]"
        >
          <Save size={15} />
          Save All Changes
        </button>
      </div>
    </div>
  );
};

// ─── Individual sponsor card ───────────────────────────────────────────────────
const SponsorCard = ({ sponsor, index, onUpdate, onDelete }) => {
  const key = sponsor._key;

  return (
    <div className="group relative glass-panel rounded-2xl p-5 border border-white/5 hover:border-gaming-purple/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.12)] space-y-4">
      {/* Card number badge */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-black uppercase tracking-widest text-gaming-purple/70 bg-gaming-purple/10 px-2.5 py-1 rounded-full border border-gaming-purple/20">
          Sponsor #{index + 1}
        </span>
        <button
          onClick={() => onDelete(key)}
          title="Delete sponsor"
          className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-600 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
          <Building2 size={11} className="text-gaming-purple" />
          Sponsor Name
        </label>
        <input
          type="text"
          value={sponsor.name}
          onChange={(e) => onUpdate(key, 'name', e.target.value)}
          placeholder="e.g. NVIDIA G-SYNC"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gaming-purple/60 focus:bg-white/8 transition-all duration-200 font-semibold"
        />
      </div>

      {/* Partnership type */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
          <Tag size={11} className="text-gaming-blue" />
          Partnership Type
        </label>
        <input
          type="text"
          value={sponsor.type}
          onChange={(e) => onUpdate(key, 'type', e.target.value)}
          placeholder="e.g. Technology Partner"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gaming-blue/60 focus:bg-white/8 transition-all duration-200"
        />
      </div>

      {/* Website URL */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
          <Globe size={11} className="text-gray-400" />
          Website URL
        </label>
        <div className="relative">
          <input
            type="url"
            value={sponsor.url}
            onChange={(e) => onUpdate(key, 'url', e.target.value)}
            placeholder="https://sponsor.com"
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-3 pr-8 py-2 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-gaming-purple/60 focus:bg-white/8 transition-all duration-200"
          />
          {sponsor.url && (
            <a
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gaming-blue transition-colors duration-200"
              title="Open link"
            >
              <Link size={12} />
            </a>
          )}
        </div>
      </div>

      {/* Delete button (full-width, visible on mobile) */}
      <button
        onClick={() => onDelete(key)}
        className="sm:hidden w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider hover:bg-red-500/10 transition-all duration-200"
      >
        <Trash2 size={13} />
        Remove Sponsor
      </button>
    </div>
  );
};
