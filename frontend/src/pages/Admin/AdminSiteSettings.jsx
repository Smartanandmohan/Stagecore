import React, { useState, useEffect } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import {
  Settings, Save, RotateCcw, CheckCircle, AlertTriangle,
  Globe, Type, FileText, Mail, Megaphone, AlignLeft, Hash
} from 'lucide-react';

/* ─── Reusable field components ─── */
const FieldWrapper = ({ label, icon: Icon, children, hint }) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-wider">
      {Icon && <Icon size={13} className="text-gaming-purple" />}
      {label}
    </label>
    {children}
    {hint && <p className="text-[11px] text-gray-600">{hint}</p>}
  </div>
);

const TextInput = ({ value, onChange, placeholder, maxLength }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    maxLength={maxLength}
    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gaming-purple/60 focus:ring-1 focus:ring-gaming-purple/30 transition-all duration-200"
  />
);

const TextArea = ({ value, onChange, placeholder, rows = 3 }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gaming-purple/60 focus:ring-1 focus:ring-gaming-purple/30 transition-all duration-200 resize-none"
  />
);

/* ─── Toast ─── */
const Toast = ({ message, type, onClose }) => (
  <div
    className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-md transition-all duration-300 ${
      type === 'success'
        ? 'bg-gaming-purple/20 border-gaming-purple/40 text-white'
        : 'bg-red-500/20 border-red-500/40 text-white'
    }`}
  >
    {type === 'success' ? (
      <CheckCircle size={16} className="text-gaming-purple flex-shrink-0" />
    ) : (
      <AlertTriangle size={16} className="text-red-400 flex-shrink-0" />
    )}
    <span className="text-sm font-semibold">{message}</span>
    <button onClick={onClose} className="ml-2 text-gray-400 hover:text-white text-lg leading-none cursor-pointer">×</button>
  </div>
);

/* ─── Confirm Dialog ─── */
const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <div className="glass-panel rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-red-500/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
          <AlertTriangle size={18} className="text-red-400" />
        </div>
        <h3 className="text-lg font-black text-white">Confirm Reset</h3>
      </div>
      <p className="text-gray-400 text-sm mb-6 leading-relaxed">{message}</p>
      <div className="flex gap-3 justify-end">
        <button
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-sm font-semibold transition-all duration-200 cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-5 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-sm font-bold transition-all duration-200 cursor-pointer"
        >
          Yes, Reset Everything
        </button>
      </div>
    </div>
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

/* ══════════════════════════════════════════════════════════════ */

export const AdminSiteSettings = () => {
  const { content, updateSection, resetToDefaults } = useSiteContent();

  /* ── Form state ── */
  const [siteForm, setSiteForm] = useState({
    brandName:       content.site?.brandName       || '',
    logoLetter:      content.site?.logoLetter       || '',
    tagline:         content.site?.tagline          || '',
    pageTitle:       content.site?.pageTitle        || '',
    metaDescription: content.site?.metaDescription || '',
  });

  const [partnerForm, setPartnerForm] = useState({
    partnerEmail:   content.partnerEmail   || '',
    partnerCtaText: content.partnerCtaText || '',
    partnerCtaDesc: content.partnerCtaDesc || '',
  });

  /* ── Sync if content changes externally ── */
  useEffect(() => {
    setSiteForm({
      brandName:       content.site?.brandName       || '',
      logoLetter:      content.site?.logoLetter       || '',
      tagline:         content.site?.tagline          || '',
      pageTitle:       content.site?.pageTitle        || '',
      metaDescription: content.site?.metaDescription || '',
    });
    setPartnerForm({
      partnerEmail:   content.partnerEmail   || '',
      partnerCtaText: content.partnerCtaText || '',
      partnerCtaDesc: content.partnerCtaDesc || '',
    });
  }, [content]);

  /* ── Toast ── */
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  /* ── Confirm dialog ── */
  const [showConfirm, setShowConfirm] = useState(false);

  /* ── Handlers ── */
  const handleSiteSave = () => {
    updateSection('site', { ...content.site, ...siteForm });
    showToast('Site settings saved!');
  };

  const handlePartnerSave = () => {
    updateSection('partnerEmail',   partnerForm.partnerEmail);
    updateSection('partnerCtaText', partnerForm.partnerCtaText);
    updateSection('partnerCtaDesc', partnerForm.partnerCtaDesc);
    showToast('Partner settings saved!');
  };

  const handleReset = () => {
    resetToDefaults();
    setShowConfirm(false);
    showToast('All settings reset to defaults.');
  };

  const siteField = (key) => ({
    value: siteForm[key],
    onChange: (e) => setSiteForm(prev => ({ ...prev, [key]: e.target.value })),
  });

  const partnerField = (key) => ({
    value: partnerForm[key],
    onChange: (e) => setPartnerForm(prev => ({ ...prev, [key]: e.target.value })),
  });

  /* ── Render ── */
  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Page Title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gaming-purple/20 border border-gaming-purple/30 flex items-center justify-center">
          <Settings size={16} className="text-gaming-purple" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Site Settings</h1>
          <p className="text-xs text-gray-500">Configure global brand identity and metadata.</p>
        </div>
      </div>

      {/* ── Brand & SEO Form ── */}
      <div className="glass-panel rounded-2xl p-6 md:p-8">
        <SectionHeader
          icon={Globe}
          title="Brand Identity & SEO"
          subtitle="Controls the site name, favicon letter, page title, and meta description seen by search engines."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FieldWrapper label="Brand Name" icon={Type}>
            <TextInput
              {...siteField('brandName')}
              placeholder="e.g. STAGECORE"
            />
          </FieldWrapper>

          <FieldWrapper
            label="Logo Letter"
            icon={Hash}
            hint="Single character displayed in the logo mark (e.g. S)"
          >
            <TextInput
              value={siteForm.logoLetter}
              onChange={(e) =>
                setSiteForm(prev => ({ ...prev, logoLetter: e.target.value.slice(0, 1).toUpperCase() }))
              }
              placeholder="S"
              maxLength={1}
            />
          </FieldWrapper>

          <FieldWrapper label="Tagline" icon={Type} hint="Shown below the brand name in the navbar (e.g. ESPORTS TOURNAMENTS)">
            <TextInput
              {...siteField('tagline')}
              placeholder="e.g. ESPORTS TOURNAMENTS"
            />
          </FieldWrapper>

          <FieldWrapper label="Page Title" icon={FileText} hint="Appears in the browser tab and search engine results">
            <TextInput
              {...siteField('pageTitle')}
              placeholder="e.g. StageCore | Premium Esports"
            />
          </FieldWrapper>

          <div className="md:col-span-2">
            <FieldWrapper label="Meta Description" icon={AlignLeft} hint="160 chars recommended for SEO">
              <TextArea
                {...siteField('metaDescription')}
                placeholder="A short description of the site for search engines..."
                rows={3}
              />
            </FieldWrapper>
          </div>
        </div>

        {/* Live Logo Preview */}
        <div className="mt-6 p-4 bg-black/30 rounded-xl border border-white/5">
          <p className="text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-3">Logo Preview</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-gaming-purple to-gaming-blue rounded-xl shadow-lg">
              <span className="font-black text-lg text-white">{siteForm.logoLetter || 'S'}</span>
            </div>
            <div>
              <div className="font-black text-sm text-white tracking-wider">
                {siteForm.brandName || 'STAGECORE'}
              </div>
              <div className="text-[9px] text-gaming-blue font-bold tracking-widest uppercase">
                {siteForm.tagline || 'ESPORTS TOURNAMENTS'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6 pt-5 border-t border-white/5">
          <button
            onClick={handleSiteSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gaming-purple hover:bg-gaming-purple/80 text-white font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-gaming-purple/30 cursor-pointer"
          >
            <Save size={15} />
            Save Changes
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-gray-400 hover:text-red-400 font-bold text-sm transition-all duration-200 cursor-pointer"
          >
            <RotateCcw size={15} />
            Reset to Defaults
          </button>
        </div>
      </div>

      {/* ── Partner Contact Section ── */}
      <div className="glass-panel rounded-2xl p-6 md:p-8">
        <SectionHeader
          icon={Megaphone}
          title="Partner Contact"
          subtitle="Controls the sponsorship CTA heading, description, and contact email shown in the Sponsors section."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FieldWrapper label="Partner Email" icon={Mail} hint="Displayed on the partner CTA card">
            <TextInput
              {...partnerField('partnerEmail')}
              placeholder="partnerships@stagecore.com"
            />
          </FieldWrapper>

          <FieldWrapper label="Partner CTA Heading" icon={Type}>
            <TextInput
              {...partnerField('partnerCtaText')}
              placeholder="e.g. Become a Partner"
            />
          </FieldWrapper>

          <div className="md:col-span-2">
            <FieldWrapper label="Partner CTA Description" icon={AlignLeft}>
              <TextArea
                {...partnerField('partnerCtaDesc')}
                placeholder="Description of the partnership offer shown to potential sponsors..."
                rows={3}
              />
            </FieldWrapper>
          </div>
        </div>

        {/* Partner CTA Preview */}
        <div className="mt-6 p-4 bg-black/30 rounded-xl border border-white/5">
          <p className="text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-3">CTA Preview</p>
          <div className="p-4 bg-gaming-purple/10 border border-gaming-purple/20 rounded-xl">
            <p className="text-gaming-blue text-[10px] font-black uppercase tracking-widest mb-1">Partnership</p>
            <h3 className="text-white font-black text-base mb-2">{partnerForm.partnerCtaText || 'Become a Partner'}</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">{partnerForm.partnerCtaDesc || 'CTA description will appear here.'}</p>
            <div className="flex items-center gap-2">
              <Mail size={12} className="text-gaming-purple" />
              <span className="text-gaming-purple text-xs font-bold">{partnerForm.partnerEmail || 'partnerships@stagecore.com'}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6 pt-5 border-t border-white/5">
          <button
            onClick={handlePartnerSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gaming-purple hover:bg-gaming-purple/80 text-white font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-gaming-purple/30 cursor-pointer"
          >
            <Save size={15} />
            Save Changes
          </button>
        </div>
      </div>

      {/* Toast & Confirm */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
      {showConfirm && (
        <ConfirmDialog
          message="This will reset ALL site content — including tournaments, matches, news, and settings — to the factory defaults. This action cannot be undone."
          onConfirm={handleReset}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};
