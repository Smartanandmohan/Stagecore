import React, { useState, useEffect } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import {
  Link2,
  Plus,
  Trash2,
  Save,
  CheckCircle,
  Globe,
  Video,
  Tv,
  MessageSquare,
  Camera,
  Navigation,
  Info,
  Share2,
  AlertTriangle,
  ExternalLink,
  FileText,
  Mail,
  Phone,
  MapPin,
  Copyright,
} from 'lucide-react';


// ─── Toast notification ────────────────────────────────────────────────────────
const Toast = ({ message, visible, color = 'green' }) => {
  const colors = {
    green: 'bg-green-500/20 border-green-500/40 text-green-400',
    purple: 'bg-gaming-purple/20 border-gaming-purple/40 text-gaming-purple',
  };
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl border font-bold text-sm shadow-2xl transition-all duration-500 ${colors[color]} ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <CheckCircle size={18} />
      {message}
    </div>
  );
};

// ─── Section header ────────────────────────────────────────────────────────────
const SectionHeader = ({ icon: Icon, title, iconColor = 'text-gaming-purple', children }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-2">
      <Icon size={15} className={iconColor} />
      <h2 className="text-sm font-black text-white uppercase tracking-wider">{title}</h2>
    </div>
    {children}
  </div>
);

// ─── Text input row ────────────────────────────────────────────────────────────
const InputRow = ({ label, icon: Icon, value, onChange, placeholder, type = 'text', iconColor = 'text-gaming-purple' }) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
        {Icon && <Icon size={11} className={iconColor} />}
        {label}
      </label>
    )}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gaming-purple/60 focus:bg-white/8 transition-all duration-200"
    />
  </div>
);

// ─── Add / Delete row button strip ────────────────────────────────────────────
const AddRowBtn = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gaming-purple/20 hover:bg-gaming-purple/30 border border-gaming-purple/30 hover:border-gaming-purple/50 text-gaming-purple font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:scale-[1.03]"
  >
    <Plus size={13} />
    {label}
  </button>
);

// ═══════════════════════════════════════════════════════════════════════════════
// Export 1 — AdminLinksEditor
// ═══════════════════════════════════════════════════════════════════════════════
export const AdminLinksEditor = () => {
  const { content, updateSection } = useSiteContent();

  // ── Local state ─────────────────────────────────────────────────────────────
  const [navLinks, setNavLinks] = useState([]);
  const [footerLinks, setFooterLinks] = useState([]);
  const [footerInfo, setFooterInfo] = useState({
    description: '',
    address: '',
    email: '',
    phone: '',
    copyright: '',
  });

  // Toast states per section
  const [navToast, setNavToast] = useState(false);
  const [footerLinksToast, setFooterLinksToast] = useState(false);
  const [footerInfoToast, setFooterInfoToast] = useState(false);

  // ── Sync from context ────────────────────────────────────────────────────────
  useEffect(() => {
    setNavLinks(
      (content.navLinks || []).map((l, i) => ({ ...l, _key: i + '_' + l.id }))
    );
    const fl = content.footer?.footerLinks || [];
    setFooterLinks(fl.map((l, i) => ({ ...l, _key: i + '_' + l.name })));
    setFooterInfo({
      description: content.footer?.description || '',
      address:     content.footer?.address     || '',
      email:       content.footer?.email       || '',
      phone:       content.footer?.phone       || '',
      copyright:   content.footer?.copyright   || '',
    });
  }, [content.navLinks, content.footer]);

  // ── Nav links helpers ────────────────────────────────────────────────────────
  const addNavLink = () =>
    setNavLinks((prev) => [
      ...prev,
      { _key: Date.now() + Math.random(), name: '', id: '' },
    ]);

  const updateNavLink = (key, field, value) =>
    setNavLinks((prev) =>
      prev.map((l) => (l._key === key ? { ...l, [field]: value } : l))
    );

  const deleteNavLink = (key) =>
    setNavLinks((prev) => prev.filter((l) => l._key !== key));

  const saveNavLinks = () => {
    const cleaned = navLinks.map(({ _key, ...rest }) => rest);
    updateSection('navLinks', cleaned);
    setNavToast(true);
    setTimeout(() => setNavToast(false), 3000);
  };

  // ── Footer links helpers ─────────────────────────────────────────────────────
  const addFooterLink = () =>
    setFooterLinks((prev) => [
      ...prev,
      { _key: Date.now() + Math.random(), name: '', href: '' },
    ]);

  const updateFooterLink = (key, field, value) =>
    setFooterLinks((prev) =>
      prev.map((l) => (l._key === key ? { ...l, [field]: value } : l))
    );

  const deleteFooterLink = (key) =>
    setFooterLinks((prev) => prev.filter((l) => l._key !== key));

  const saveFooterLinks = () => {
    const cleaned = footerLinks.map(({ _key, ...rest }) => rest);
    updateSection('footer', { ...content.footer, footerLinks: cleaned });
    setFooterLinksToast(true);
    setTimeout(() => setFooterLinksToast(false), 3000);
  };

  // ── Footer info helpers ──────────────────────────────────────────────────────
  const handleInfoChange = (field) => (e) =>
    setFooterInfo((prev) => ({ ...prev, [field]: e.target.value }));

  const saveFooterInfo = () => {
    updateSection('footer', { ...content.footer, ...footerInfo });
    setFooterInfoToast(true);
    setTimeout(() => setFooterInfoToast(false), 3000);
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8 animate-fadeIn">
      <Toast message="Navbar links saved!" visible={navToast} />
      <Toast message="Footer links saved!" visible={footerLinksToast} color="purple" />
      <Toast message="Footer info saved!" visible={footerInfoToast} />

      {/* ── Page header ── */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-xl bg-gaming-purple/20 border border-gaming-purple/30 flex items-center justify-center">
            <Link2 size={16} className="text-gaming-purple" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Links & Navigation Editor</h1>
        </div>
        <p className="text-gray-400 text-sm pl-11">
          Manage navbar links, footer quick links, and footer contact info.
        </p>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 1 — Navbar Links
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="glass-panel rounded-2xl p-6">
        <SectionHeader icon={Navigation} title="Navbar Links" iconColor="text-gaming-purple">
          <AddRowBtn onClick={addNavLink} label="Add Link" />
        </SectionHeader>

        {navLinks.length === 0 ? (
          <EmptyState icon={Navigation} message="No navbar links." onAdd={addNavLink} addLabel="Add first link →" />
        ) : (
          <div className="space-y-3">
            {/* Column headers */}
            <div className="grid grid-cols-[1fr_1fr_auto] gap-3 px-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Display Name</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Scroll-Target ID</span>
              <span className="w-8" />
            </div>

            {navLinks.map((link) => (
              <div
                key={link._key}
                className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center group"
              >
                {/* Name */}
                <input
                  type="text"
                  value={link.name}
                  onChange={(e) => updateNavLink(link._key, 'name', e.target.value)}
                  placeholder="e.g. Tournaments"
                  className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gaming-purple/60 transition-all duration-200"
                />
                {/* ID / anchor */}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-xs font-mono">#</span>
                  <input
                    type="text"
                    value={link.id}
                    onChange={(e) => updateNavLink(link._key, 'id', e.target.value)}
                    placeholder="tournaments"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-7 pr-3 py-2 text-sm text-gray-300 placeholder-gray-600 font-mono focus:outline-none focus:border-gaming-blue/60 transition-all duration-200"
                  />
                </div>
                {/* Delete */}
                <button
                  onClick={() => deleteNavLink(link._key)}
                  className="w-8 h-9 flex items-center justify-center rounded-xl text-gray-600 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Save */}
        <div className="flex justify-end mt-6 pt-4 border-t border-white/5">
          <button
            onClick={saveNavLinks}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-gaming-purple to-purple-700 hover:from-purple-600 hover:to-gaming-purple text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-gaming-purple/40 transition-all duration-200 hover:scale-[1.03]"
          >
            <Save size={14} />
            Save Navbar Links
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 2 — Footer Quick Links
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="glass-panel rounded-2xl p-6">
        <SectionHeader icon={Link2} title="Footer Quick Links" iconColor="text-gaming-blue">
          <AddRowBtn onClick={addFooterLink} label="Add Link" />
        </SectionHeader>

        {footerLinks.length === 0 ? (
          <EmptyState icon={Link2} message="No footer links." onAdd={addFooterLink} addLabel="Add first footer link →" />
        ) : (
          <div className="space-y-3">
            {/* Column headers */}
            <div className="grid grid-cols-[1fr_1fr_auto] gap-3 px-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Display Name</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Href / URL</span>
              <span className="w-8" />
            </div>

            {footerLinks.map((link) => (
              <div
                key={link._key}
                className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center group"
              >
                {/* Name */}
                <input
                  type="text"
                  value={link.name}
                  onChange={(e) => updateFooterLink(link._key, 'name', e.target.value)}
                  placeholder="e.g. Privacy Policy"
                  className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gaming-blue/60 transition-all duration-200"
                />
                {/* Href */}
                <input
                  type="text"
                  value={link.href}
                  onChange={(e) => updateFooterLink(link._key, 'href', e.target.value)}
                  placeholder="https:// or #anchor"
                  className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-gaming-blue/60 transition-all duration-200"
                />
                {/* Delete */}
                <button
                  onClick={() => deleteFooterLink(link._key)}
                  className="w-8 h-9 flex items-center justify-center rounded-xl text-gray-600 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Save */}
        <div className="flex justify-end mt-6 pt-4 border-t border-white/5">
          <button
            onClick={saveFooterLinks}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-gaming-blue to-cyan-700 hover:from-cyan-600 hover:to-gaming-blue text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-gaming-blue/30 transition-all duration-200 hover:scale-[1.03]"
          >
            <Save size={14} />
            Save Footer Links
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          SECTION 3 — Footer Info
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="glass-panel rounded-2xl p-6">
        <SectionHeader icon={Info} title="Footer Info" iconColor="text-gaming-purple" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Description — full-width */}
          <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
              <FileText size={11} className="text-gaming-purple" />
              Description
            </label>
            <textarea
              value={footerInfo.description}
              onChange={handleInfoChange('description')}
              rows={3}
              placeholder="Short blurb about StageCore shown in the footer…"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gaming-purple/60 focus:bg-white/8 transition-all duration-200 resize-none"
            />
          </div>

          <InputRow
            label="Address"
            icon={MapPin}
            value={footerInfo.address}
            onChange={handleInfoChange('address')}
            placeholder="e.g. Cyber City, Bangalore, India"
          />

          <InputRow
            label="Email"
            icon={Mail}
            value={footerInfo.email}
            onChange={handleInfoChange('email')}
            placeholder="support@stagecore.com"
            type="email"
          />

          <InputRow
            label="Phone"
            icon={Phone}
            value={footerInfo.phone}
            onChange={handleInfoChange('phone')}
            placeholder="+91 98765 43210"
            type="tel"
          />

          <InputRow
            label="Copyright Text"
            icon={Copyright}
            value={footerInfo.copyright}
            onChange={handleInfoChange('copyright')}
            placeholder="© 2026 StageCore Esports. All rights reserved."
          />
        </div>

        {/* Save */}
        <div className="flex justify-end mt-6 pt-4 border-t border-white/5">
          <button
            onClick={saveFooterInfo}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-gaming-purple to-purple-700 hover:from-purple-600 hover:to-gaming-purple text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-gaming-purple/40 transition-all duration-200 hover:scale-[1.03]"
          >
            <Save size={14} />
            Save Footer Info
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Empty state helper ────────────────────────────────────────────────────────
const EmptyState = ({ icon: Icon, message, onAdd, addLabel }) => (
  <div className="flex flex-col items-center justify-center py-10 text-center">
    <Icon size={30} className="text-gray-700 mb-3" />
    <p className="text-gray-500 text-sm font-medium mb-2">{message}</p>
    <button
      onClick={onAdd}
      className="text-xs text-gaming-purple hover:underline font-bold"
    >
      {addLabel}
    </button>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// Export 2 — AdminSocialEditor
// ═══════════════════════════════════════════════════════════════════════════════
export const AdminSocialEditor = () => {
  const { content, updateSection } = useSiteContent();

  const [formData, setFormData] = useState({
    twitter:   '',
    youtube:   '',
    twitch:    '',
    discord:   '',
    instagram: '',
  });

  const [toast, setToast] = useState(false);

  // Sync from context
  useEffect(() => {
    setFormData({
      twitter:   content.social?.twitter   || '',
      youtube:   content.social?.youtube   || '',
      twitch:    content.social?.twitch    || '',
      discord:   content.social?.discord   || '',
      instagram: content.social?.instagram || '',
    });
  }, [content.social]);

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = () => {
    updateSection('social', formData);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const platforms = [
    {
      key:         'twitter',
      label:       'Twitter / X',
      icon:        Globe,
      iconColor:   'text-sky-400',
      borderFocus: 'focus:border-sky-400/60',
      placeholder: 'https://twitter.com/stagecore',
    },
    {
      key:         'youtube',
      label:       'YouTube',
      icon:        Video,
      iconColor:   'text-red-400',
      borderFocus: 'focus:border-red-400/60',
      placeholder: 'https://youtube.com/@stagecore',
    },
    {
      key:         'twitch',
      label:       'Twitch',
      icon:        Tv,
      iconColor:   'text-purple-400',
      borderFocus: 'focus:border-purple-400/60',
      placeholder: 'https://twitch.tv/stagecore',
    },
    {
      key:         'discord',
      label:       'Discord',
      icon:        MessageSquare,
      iconColor:   'text-indigo-400',
      borderFocus: 'focus:border-indigo-400/60',
      placeholder: 'https://discord.gg/stagecore',
    },
    {
      key:         'instagram',
      label:       'Instagram',
      icon:        Camera,
      iconColor:   'text-pink-400',
      borderFocus: 'focus:border-pink-400/60',
      placeholder: 'https://instagram.com/stagecore',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <Toast message="Social links saved successfully!" visible={toast} />

      {/* ── Page header ── */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-xl bg-gaming-blue/20 border border-gaming-blue/30 flex items-center justify-center">
            <Share2 size={16} className="text-gaming-blue" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Social Links Editor</h1>
        </div>
        <p className="text-gray-400 text-sm pl-11">
          Update your official social media URLs that appear in the footer and throughout the site.
        </p>
      </div>

      {/* ── Warning note ── */}
      <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25">
        <AlertTriangle size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
        <p className="text-amber-300/90 text-xs font-semibold leading-relaxed">
          <span className="font-black text-amber-400">Note:</span>{' '}
          Changes to social links appear in the footer immediately after saving.
        </p>
      </div>

      {/* ── Social inputs ── */}
      <div className="glass-panel rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Share2 size={15} className="text-gaming-blue" />
          <h2 className="text-sm font-black text-white uppercase tracking-wider">Platform URLs</h2>
        </div>

        <div className="space-y-5">
          {platforms.map(({ key, label, icon: Icon, iconColor, borderFocus, placeholder }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                <Icon size={12} className={iconColor} />
                {label}
              </label>
              <div className="relative group">
                {/* Left icon strip */}
                <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center rounded-l-xl bg-white/5 border-r border-white/10 group-focus-within:border-white/20 transition-colors duration-200">
                  <Icon size={14} className={`${iconColor} opacity-70`} />
                </div>
                <input
                  type="url"
                  value={formData[key]}
                  onChange={handleChange(key)}
                  placeholder={placeholder}
                  className={`w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-10 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none ${borderFocus} focus:bg-white/8 transition-all duration-200`}
                />
                {/* Live preview link */}
                {formData[key] && (
                  <a
                    href={formData[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gaming-blue transition-colors duration-200"
                    title={`Open ${label}`}
                  >
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Save button ── */}
        <div className="flex justify-end mt-8 pt-5 border-t border-white/5">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-green-500/30 transition-all duration-200 hover:scale-[1.03]"
          >
            <Save size={15} />
            Save Social Links
          </button>
        </div>
      </div>

      {/* ── Preview strip ── */}
      <div className="glass-panel rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <ExternalLink size={13} className="text-gray-500" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Quick Preview</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {platforms.map(({ key, label, icon: Icon, iconColor }) =>
            formData[key] ? (
              <a
                key={key}
                href={formData[key]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-xs text-gray-300 hover:text-white font-medium transition-all duration-200 hover:scale-[1.03]"
              >
                <Icon size={12} className={iconColor} />
                {label}
                <ExternalLink size={10} className="text-gray-600" />
              </a>
            ) : (
              <span
                key={key}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/3 border border-white/5 text-xs text-gray-600 font-medium"
              >
                <Icon size={12} className="opacity-40" />
                {label}
                <span className="text-gray-700">— not set</span>
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};
