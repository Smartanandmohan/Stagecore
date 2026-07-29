import React, { useState, useEffect } from 'react';
import { useSiteContent } from '../../../context/SiteContentContext';
import {
  Settings, Save, Globe, Trophy, Shield, Key, HelpCircle, CheckCircle,
  Paintbrush, UploadCloud, ShieldAlert, Laptop, Eye, HelpCircle as HelpIcon
} from 'lucide-react';

const PRESET_COLORS = [
  { name: 'Neon Purple', hex: '#7C3AED', class: 'bg-[#7C3AED]' },
  { name: 'Cyber Blue', hex: '#00F0FF', class: 'bg-[#00F0FF]' },
  { name: 'Crimson Red', hex: '#FF0055', class: 'bg-[#FF0055]' },
  { name: 'Acid Green', hex: '#CCFF00', class: 'bg-[#CCFF00]' }
];

export const SettingsPage = () => {
  const { content, updateSection } = useSiteContent();

  // Active settings tab: 'website', 'rules', 'security'
  const [activeSection, setActiveSection] = useState('website');

  // Website Settings Form State
  const [brandName, setBrandName] = useState(content.site?.brandName || 'STAGECORE');
  const [tagline, setTagline] = useState(content.site?.tagline || 'ESPORTS TOURNAMENTS');
  const [logoLetter, setLogoLetter] = useState(content.site?.logoLetter || 'S');
  const [pageTitle, setPageTitle] = useState(content.site?.pageTitle || 'StageCore | Premium Esports');
  const [metaDescription, setMetaDescription] = useState(content.site?.metaDescription || '');
  const [selectedColor, setSelectedColor] = useState('#7C3AED');
  const [logoMockUrl, setLogoMockUrl] = useState('');

  // Tournament Rules Form State
  const [defaultPrizePool, setDefaultPrizePool] = useState(content.rules?.defaultPrizePool || '₹ 25,000');
  const [lockRules, setLockRules] = useState(content.rules?.lockRules || '2 Hours Before Match');
  const [matchRules, setMatchRules] = useState(content.rules?.matchRules || '1. All players must use their registered IGNs.\n2. Third-party visual overlays or aim scripts are strictly prohibited.\n3. A 10-minute grace period is provided before forfeit.');

  // Security & Access Form State
  const [adminRole, setAdminRole] = useState(content.security?.adminRole || 'Super Admin');
  const [permissions, setPermissions] = useState(content.security?.permissions || {
    editNews: true,
    generateBrackets: true,
    banPlayers: true,
    publishMatches: true
  });
  const [twoFactor, setTwoFactor] = useState(content.security?.twoFactor || false);

  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveAll = () => {
    // 1. Save Website Settings
    updateSection('site', {
      ...content.site,
      brandName,
      tagline,
      logoLetter,
      pageTitle,
      metaDescription,
      themeColor: selectedColor
    });

    // 2. Save Rules Settings
    updateSection('rules', {
      defaultPrizePool,
      lockRules,
      matchRules
    });

    // 3. Save Security Settings
    updateSection('security', {
      adminRole,
      permissions,
      twoFactor
    });

    showToast('System configuration saved successfully!');
  };

  const togglePermission = (key) => {
    setPermissions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border border-gaming-purple/40 bg-gaming-purple/20 backdrop-blur-md text-white transition-all">
          <CheckCircle size={16} className="text-gaming-purple flex-shrink-0" />
          <span className="text-sm font-semibold">{toast}</span>
          <button onClick={() => setToast(null)} className="ml-2 text-gray-400 hover:text-white text-lg leading-none cursor-pointer">×</button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gaming-purple/20 border border-gaming-purple/30 flex items-center justify-center">
              <Settings size={18} className="text-gaming-purple" />
            </div>
            System & Console Settings
          </h1>
          <p className="text-xs text-gray-500 mt-1 ml-12">
            Configure metadata, rulebooks, security policies, and permission levels.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="flex items-center gap-2 px-5 py-2.5 bg-gaming-purple hover:bg-gaming-purple/80 text-white text-xs font-extrabold rounded-xl transition-all duration-200 shadow-lg shadow-gaming-purple/20 cursor-pointer whitespace-nowrap"
        >
          <Save size={15} />
          <span>Save Settings</span>
        </button>
      </div>

      {/* Settings Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Tab Menu */}
        <div className="glass-panel rounded-2xl p-4 border border-white/5 space-y-1.5 h-fit bg-[#03050f]/40">
          <button
            onClick={() => setActiveSection('website')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeSection === 'website'
                ? 'bg-gaming-purple/25 text-white border border-gaming-purple/40 shadow-sm shadow-gaming-purple/10'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Globe size={14} className="flex-shrink-0" />
            <span>Website Settings</span>
          </button>

          <button
            onClick={() => setActiveSection('rules')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeSection === 'rules'
                ? 'bg-gaming-purple/25 text-white border border-gaming-purple/40 shadow-sm shadow-gaming-purple/10'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Trophy size={14} className="flex-shrink-0" />
            <span>Tournament Rules</span>
          </button>

          <button
            onClick={() => setActiveSection('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeSection === 'security'
                ? 'bg-gaming-purple/25 text-white border border-gaming-purple/40 shadow-sm shadow-gaming-purple/10'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Shield size={14} className="flex-shrink-0" />
            <span>Security & Access</span>
          </button>
        </div>

        {/* Right: Tab Content Panels */}
        <div className="lg:col-span-3 space-y-6">
          {/* TAB 1: WEBSITE SETTINGS */}
          {activeSection === 'website' && (
            <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-6 bg-[#03050f]/30">
              <div className="border-b border-white/5 pb-3">
                <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">Website Settings & SEO</h2>
                <p className="text-[11px] text-gray-500 mt-1">Configure user-facing identity details and search crawler configuration.</p>
              </div>

              {/* Site Name and Tagline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Site Brand Name</label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={e => setBrandName(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gaming-purple/60 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Site Tagline</label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={e => setTagline(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gaming-purple/60 transition-all"
                  />
                </div>
              </div>

              {/* Logo Mock Upload segment */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Logo letter & image</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      value={logoLetter}
                      maxLength={1}
                      onChange={e => setLogoLetter(e.target.value.toUpperCase())}
                      placeholder="e.g. S"
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gaming-purple/60 text-center font-bold"
                    />
                    <p className="text-[9px] text-gray-600 text-center">Single Logo Character</p>
                  </div>

                  <div className="md:col-span-2 p-4 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-gaming-purple to-gaming-blue flex items-center justify-center font-black text-white text-base">
                        {logoLetter || 'S'}
                      </div>
                      <div className="text-left">
                        <span className="text-xs text-white font-bold block">{brandName}</span>
                        <span className="text-[9px] text-gaming-blue font-bold uppercase tracking-wider block">{tagline}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:text-white text-gray-400 text-[10px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <UploadCloud size={12} />
                      <span>Mock Logo Upload</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Color Scheme Picker */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                  <Paintbrush size={12} className="text-gaming-purple" />
                  Primary Theme Accent Color
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {PRESET_COLORS.map(color => (
                    <button
                      key={color.hex}
                      type="button"
                      onClick={() => setSelectedColor(color.hex)}
                      className={`flex items-center gap-2 px-3 py-2 border rounded-xl transition-all cursor-pointer text-xs ${
                        selectedColor === color.hex
                          ? 'border-white text-white font-bold bg-white/5'
                          : 'border-white/5 text-gray-400 hover:text-white hover:bg-white/3'
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full ${color.class}`} />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SEO Settings Segment */}
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    <Laptop size={12} className="text-gaming-purple" />
                    SEO Meta Title
                  </label>
                  <input
                    type="text"
                    value={pageTitle}
                    onChange={e => setPageTitle(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gaming-purple/60 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">SEO Meta Description</label>
                  <textarea
                    value={metaDescription}
                    onChange={e => setMetaDescription(e.target.value)}
                    placeholder="Provide a search snippet summarizing the tournament platform..."
                    rows={3}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gaming-purple/60 transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TOURNAMENT RULES */}
          {activeSection === 'rules' && (
            <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-6 bg-[#03050f]/30">
              <div className="border-b border-white/5 pb-3">
                <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">Tournament & Game Rules</h2>
                <p className="text-[11px] text-gray-500 mt-1">Define system values and default competition guidelines.</p>
              </div>

              {/* Default prize pool and lock time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Default Prize Pool</label>
                  <input
                    type="text"
                    value={defaultPrizePool}
                    onChange={e => setDefaultPrizePool(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gaming-purple/60 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Registration Lock Rules</label>
                  <select
                    value={lockRules}
                    onChange={e => setLockRules(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gaming-purple/60 transition-all appearance-none"
                  >
                    <option value="1 Hour Before Match" className="bg-[#050816]">1 Hour Before Match</option>
                    <option value="2 Hours Before Match" className="bg-[#050816]">2 Hours Before Match</option>
                    <option value="12 Hours Before Match" className="bg-[#050816]">12 Hours Before Match</option>
                    <option value="24 Hours Before Match" className="bg-[#050816]">24 Hours Before Match</option>
                  </select>
                </div>
              </div>

              {/* Default Rulebook match rules */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Match Rules & Guidelines</span>
                  <span className="text-[9px] text-gray-500">Appears on registration rules tab</span>
                </label>
                <textarea
                  value={matchRules}
                  onChange={e => setMatchRules(e.target.value)}
                  rows={6}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-gaming-purple/60 transition-all resize-y min-h-[120px] font-mono leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 3: SECURITY & ACCESS */}
          {activeSection === 'security' && (
            <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-6 bg-[#03050f]/30">
              <div className="border-b border-white/5 pb-3">
                <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">Security & Access Policy</h2>
                <p className="text-[11px] text-gray-500 mt-1">Configure administrator login standards and feature permission toggles.</p>
              </div>

              {/* Admin role selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Console Access Role</label>
                <select
                  value={adminRole}
                  onChange={e => setAdminRole(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gaming-purple/60 transition-all appearance-none"
                >
                  <option value="Super Admin" className="bg-[#050816]">Super Admin (Full Access)</option>
                  <option value="Moderator" className="bg-[#050816]">Community Moderator</option>
                  <option value="Content Editor" className="bg-[#050816]">Content CMS Editor</option>
                  <option value="Tournament Director" className="bg-[#050816]">Tournament Director</option>
                </select>
              </div>

              {/* Permissions switches */}
              <div className="space-y-3.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Role Feature Permissions</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Switch 1: Edit News */}
                  <div
                    onClick={() => togglePermission('editNews')}
                    className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between cursor-pointer hover:border-white/10 transition-all"
                  >
                    <div>
                      <span className="text-xs text-white font-bold block">Edit News & Sponsors</span>
                      <span className="text-[9px] text-gray-600">Access news CMS and add sponsors</span>
                    </div>
                    <div className={`w-8 h-5 rounded-full p-0.5 transition-all duration-200 flex items-center ${
                      permissions.editNews ? 'bg-gaming-purple justify-end' : 'bg-gray-700 justify-start'
                    }`}>
                      <span className="w-4 h-4 bg-white rounded-full shadow-md" />
                    </div>
                  </div>

                  {/* Switch 2: Generate Brackets */}
                  <div
                    onClick={() => togglePermission('generateBrackets')}
                    className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between cursor-pointer hover:border-white/10 transition-all"
                  >
                    <div>
                      <span className="text-xs text-white font-bold block">Generate Brackets</span>
                      <span className="text-[9px] text-gray-600">Run matchmaking bracket code</span>
                    </div>
                    <div className={`w-8 h-5 rounded-full p-0.5 transition-all duration-200 flex items-center ${
                      permissions.generateBrackets ? 'bg-gaming-purple justify-end' : 'bg-gray-700 justify-start'
                    }`}>
                      <span className="w-4 h-4 bg-white rounded-full shadow-md" />
                    </div>
                  </div>

                  {/* Switch 3: Ban Players */}
                  <div
                    onClick={() => togglePermission('banPlayers')}
                    className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between cursor-pointer hover:border-white/10 transition-all"
                  >
                    <div>
                      <span className="text-xs text-white font-bold block">Ban Players & Teams</span>
                      <span className="text-[9px] text-gray-600">Blacklist users from system</span>
                    </div>
                    <div className={`w-8 h-5 rounded-full p-0.5 transition-all duration-200 flex items-center ${
                      permissions.banPlayers ? 'bg-gaming-purple justify-end' : 'bg-gray-700 justify-start'
                    }`}>
                      <span className="w-4 h-4 bg-white rounded-full shadow-md" />
                    </div>
                  </div>

                  {/* Switch 4: Publish Matches */}
                  <div
                    onClick={() => togglePermission('publishMatches')}
                    className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between cursor-pointer hover:border-white/10 transition-all"
                  >
                    <div>
                      <span className="text-xs text-white font-bold block">Publish Matches</span>
                      <span className="text-[9px] text-gray-600">Toggle live stream match flags</span>
                    </div>
                    <div className={`w-8 h-5 rounded-full p-0.5 transition-all duration-200 flex items-center ${
                      permissions.publishMatches ? 'bg-gaming-purple justify-end' : 'bg-gray-700 justify-start'
                    }`}>
                      <span className="w-4 h-4 bg-white rounded-full shadow-md" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2FA switcher */}
              <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/15 border border-red-500/25 flex items-center justify-center text-red-400 mt-0.5 flex-shrink-0">
                    <Key size={14} />
                  </div>
                  <div>
                    <span className="text-xs text-white font-bold block uppercase tracking-wide">Require Multi-Factor (2FA)</span>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">
                      Force all administrator accounts to verify login attempts with a synchronized mobile authenticator app.
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => setTwoFactor(!twoFactor)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-all duration-200 flex items-center cursor-pointer flex-shrink-0 ${
                    twoFactor ? 'bg-emerald-500 justify-end' : 'bg-gray-700 justify-start'
                  }`}
                >
                  <span className="w-5 h-5 bg-white rounded-full shadow-md" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
