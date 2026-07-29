import React, { useState, useEffect } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import {
  Image, Save, CheckCircle, Type, AlignLeft, MousePointerClick,
  Layers, Trophy, Calendar, Wifi, DollarSign, Tag, ArrowRight
} from 'lucide-react';

/* ─── Toast ─── */
const Toast = ({ message, onClose }) => (
  <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border border-gaming-purple/40 bg-gaming-purple/20 text-white backdrop-blur-md">
    <CheckCircle size={16} className="text-gaming-purple flex-shrink-0" />
    <span className="text-sm font-semibold">{message}</span>
    <button onClick={onClose} className="ml-2 text-gray-400 hover:text-white text-lg leading-none cursor-pointer">×</button>
  </div>
);

/* ─── Field helpers ─── */
const Label = ({ icon: Icon, children }) => (
  <label className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
    {Icon && <Icon size={12} className="text-gaming-purple" />}
    {children}
  </label>
);

const TextInput = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gaming-purple/60 focus:ring-1 focus:ring-gaming-purple/30 transition-all duration-200"
  />
);

const TextArea = ({ value, onChange, placeholder, rows = 4 }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gaming-purple/60 focus:ring-1 focus:ring-gaming-purple/30 transition-all duration-200 resize-none"
  />
);

/* ─── Section divider ─── */
const SectionTitle = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-start gap-3 mb-5">
    <div className="w-8 h-8 rounded-lg bg-gaming-purple/20 border border-gaming-purple/30 flex items-center justify-center flex-shrink-0">
      <Icon size={14} className="text-gaming-purple" />
    </div>
    <div>
      <h3 className="text-sm font-black text-white tracking-tight">{title}</h3>
      {subtitle && <p className="text-[11px] text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════ */

export const AdminHeroEditor = () => {
  const { content, updateSection } = useSiteContent();

  const hero = content.hero || {};
  const card = hero.highlightCard || {};

  /* ── Form state ── */
  const [heroForm, setHeroForm] = useState({
    line1:        hero.line1        || '',
    line2:        hero.line2        || '',
    line3:        hero.line3        || '',
    subtext:      hero.subtext      || '',
    ctaPrimary:   hero.ctaPrimary   || '',
    ctaSecondary: hero.ctaSecondary || '',
  });

  const [cardForm, setCardForm] = useState({
    badge:           card.badge           || '',
    title:           card.title           || '',
    format:          card.format          || '',
    mode:            card.mode            || '',
    prize:           card.prize           || '',
    schedule:        card.schedule        || '',
    registerBtnText: card.registerBtnText || '',
  });

  /* ── Sync if content changes externally ── */
  useEffect(() => {
    const h = content.hero || {};
    const c = h.highlightCard || {};
    setHeroForm({
      line1:        h.line1        || '',
      line2:        h.line2        || '',
      line3:        h.line3        || '',
      subtext:      h.subtext      || '',
      ctaPrimary:   h.ctaPrimary   || '',
      ctaSecondary: h.ctaSecondary || '',
    });
    setCardForm({
      badge:           c.badge           || '',
      title:           c.title           || '',
      format:          c.format          || '',
      mode:            c.mode            || '',
      prize:           c.prize           || '',
      schedule:        c.schedule        || '',
      registerBtnText: c.registerBtnText || '',
    });
  }, [content]);

  /* ── Toast ── */
  const [toast, setToast] = useState(null);
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  /* ── Save ── */
  const handleSave = () => {
    updateSection('hero', {
      ...content.hero,
      ...heroForm,
      highlightCard: { ...content.hero?.highlightCard, ...cardForm },
    });
    showToast('Hero section saved!');
  };

  const hf = (key) => ({
    value: heroForm[key],
    onChange: (e) => setHeroForm(prev => ({ ...prev, [key]: e.target.value })),
  });

  const cf = (key) => ({
    value: cardForm[key],
    onChange: (e) => setCardForm(prev => ({ ...prev, [key]: e.target.value })),
  });

  /* ── Render ── */
  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Page Title */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gaming-purple/20 border border-gaming-purple/30 flex items-center justify-center">
            <Image size={16} className="text-gaming-purple" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Hero Section Editor</h1>
            <p className="text-xs text-gray-500">Edit the main heading, subtext, CTA buttons, and the tournament card.</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gaming-purple hover:bg-gaming-purple/80 text-white font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-gaming-purple/30 cursor-pointer"
        >
          <Save size={15} />
          Save Changes
        </button>
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* LEFT: Form */}
        <div className="space-y-6">

          {/* Heading Lines */}
          <div className="glass-panel rounded-2xl p-6">
            <SectionTitle icon={Type} title="Hero Heading" subtitle="Three animated lines shown at the top of the homepage." />
            <div className="space-y-4">
              <div>
                <Label icon={Type}>Line 1</Label>
                <TextInput {...hf('line1')} placeholder="e.g. We Organize." />
              </div>
              <div>
                <Label icon={Type}>Line 2</Label>
                <TextInput {...hf('line2')} placeholder="e.g. We Produce." />
              </div>
              <div>
                <Label icon={Type}>Line 3 (gradient colour)</Label>
                <TextInput {...hf('line3')} placeholder="e.g. We Inspire." />
              </div>
            </div>
          </div>

          {/* Subtext + CTAs */}
          <div className="glass-panel rounded-2xl p-6">
            <SectionTitle icon={AlignLeft} title="Subtext & CTA Buttons" />
            <div className="space-y-4">
              <div>
                <Label icon={AlignLeft}>Subtext Paragraph</Label>
                <TextArea {...hf('subtext')} placeholder="Describe StageCore in 2–3 sentences..." rows={4} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label icon={MousePointerClick}>Primary CTA Label</Label>
                  <TextInput {...hf('ctaPrimary')} placeholder="e.g. View Tournaments" />
                </div>
                <div>
                  <Label icon={MousePointerClick}>Secondary CTA Label</Label>
                  <TextInput {...hf('ctaSecondary')} placeholder="e.g. Explore Matches" />
                </div>
              </div>
            </div>
          </div>

          {/* Highlight Card */}
          <div className="glass-panel rounded-2xl p-6">
            <SectionTitle
              icon={Trophy}
              title="Tournament Highlight Card"
              subtitle="The floating card shown over the hero background image."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label icon={Tag}>Badge Text</Label>
                <TextInput {...cf('badge')} placeholder="e.g. Upcoming Tournament" />
              </div>
              <div>
                <Label icon={Type}>Card Title</Label>
                <TextInput {...cf('title')} placeholder="e.g. StageCore Valorant Cup #12" />
              </div>
              <div>
                <Label icon={Layers}>Format</Label>
                <TextInput {...cf('format')} placeholder="e.g. 5v5" />
              </div>
              <div>
                <Label icon={Wifi}>Mode</Label>
                <TextInput {...cf('mode')} placeholder="e.g. Online" />
              </div>
              <div>
                <Label icon={DollarSign}>Prize Pool</Label>
                <TextInput {...cf('prize')} placeholder="e.g. ₹ 25,000 Prize Pool" />
              </div>
              <div>
                <Label icon={Calendar}>Schedule</Label>
                <TextInput {...cf('schedule')} placeholder="e.g. 25 May - 26 May 2024" />
              </div>
              <div className="sm:col-span-2">
                <Label icon={MousePointerClick}>Register Button Text</Label>
                <TextInput {...cf('registerBtnText')} placeholder="e.g. Register Now" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Live Preview */}
        <div className="xl:sticky xl:top-6 space-y-4 self-start">

          {/* Heading Preview */}
          <div className="glass-panel rounded-2xl p-6">
            <p className="text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-4">Heading Preview</p>
            <div className="space-y-1 font-gaming">
              <div className="text-2xl md:text-3xl font-black text-white leading-tight">
                {heroForm.line1 || <span className="text-gray-700">Line 1…</span>}
              </div>
              <div className="text-2xl md:text-3xl font-black text-white leading-tight">
                {heroForm.line2 || <span className="text-gray-700">Line 2…</span>}
              </div>
              <div
                className="text-2xl md:text-3xl font-black leading-tight bg-gradient-to-r from-gaming-purple to-gaming-blue bg-clip-text text-transparent"
              >
                {heroForm.line3 || <span className="text-gray-700">Line 3 (gradient)…</span>}
              </div>
            </div>
            {heroForm.subtext && (
              <p className="mt-4 text-gray-400 text-xs leading-relaxed border-t border-white/5 pt-4">
                {heroForm.subtext}
              </p>
            )}
            {(heroForm.ctaPrimary || heroForm.ctaSecondary) && (
              <div className="flex flex-wrap gap-2 mt-4">
                {heroForm.ctaPrimary && (
                  <span className="px-4 py-2 rounded-xl bg-gaming-purple text-white text-xs font-black">
                    {heroForm.ctaPrimary}
                  </span>
                )}
                {heroForm.ctaSecondary && (
                  <span className="px-4 py-2 rounded-xl border border-gaming-blue/40 text-gaming-blue text-xs font-black">
                    {heroForm.ctaSecondary}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Highlight Card Preview */}
          <div className="glass-panel rounded-2xl p-6">
            <p className="text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-4">Tournament Card Preview</p>
            <div className="bg-black/50 border border-white/10 rounded-2xl p-5 space-y-3 backdrop-blur-md">
              {cardForm.badge && (
                <span className="inline-block px-3 py-1 rounded-full bg-gaming-purple/20 border border-gaming-purple/30 text-gaming-purple text-[10px] font-black uppercase tracking-wider">
                  {cardForm.badge}
                </span>
              )}
              <div className="font-black text-white text-sm leading-tight">
                {cardForm.title || <span className="text-gray-700">Card title…</span>}
              </div>
              <div className="flex flex-wrap gap-2">
                {cardForm.format && (
                  <span className="px-2.5 py-1 rounded-lg bg-gaming-blue/10 border border-gaming-blue/20 text-gaming-blue text-[10px] font-bold flex items-center gap-1">
                    <Layers size={10} /> {cardForm.format}
                  </span>
                )}
                {cardForm.mode && (
                  <span className="px-2.5 py-1 rounded-lg bg-gaming-purple/10 border border-gaming-purple/20 text-gaming-purple text-[10px] font-bold flex items-center gap-1">
                    <Wifi size={10} /> {cardForm.mode}
                  </span>
                )}
              </div>
              {cardForm.prize && (
                <div className="text-gaming-purple font-black text-xs">{cardForm.prize}</div>
              )}
              {cardForm.schedule && (
                <div className="flex items-center gap-2 text-gray-400 text-[11px]">
                  <Calendar size={11} />
                  {cardForm.schedule}
                </div>
              )}
              {cardForm.registerBtnText && (
                <button className="w-full mt-1 py-2.5 rounded-xl bg-gaming-purple text-white text-xs font-black flex items-center justify-center gap-2 cursor-default">
                  {cardForm.registerBtnText}
                  <ArrowRight size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Sticky Save */}
          <button
            onClick={handleSave}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gaming-purple hover:bg-gaming-purple/80 text-white font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-gaming-purple/30 cursor-pointer"
          >
            <Save size={15} />
            Save Hero Section
          </button>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};
