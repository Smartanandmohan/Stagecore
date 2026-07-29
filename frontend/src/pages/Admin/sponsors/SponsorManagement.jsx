import React, { useState } from 'react';
import { useSiteContent } from '../../../context/SiteContentContext';
import {
  Handshake, Plus, Pencil, Trash2, Link as LinkIcon, Calendar, Check, X,
  AlertTriangle, CheckCircle, ShieldAlert, ShieldCheck, Globe, ImageIcon
} from 'lucide-react';

const EMPTY_SPONSOR = {
  name: '',
  type: '',
  url: '',
  logo: '',
  startDate: '',
  endDate: '',
  status: 'ACTIVE' // 'ACTIVE', 'EXPIRED'
};

// Fallback/mock logos for default list if logos are empty
const DEFAULT_LOGOS = {
  'NVIDIA G-SYNC': 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=300',
  'STEELSERIES': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=300',
  'HYPERX': 'https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?auto=format&fit=crop&q=80&w=300',
  'ROG ASUS': 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=300',
  'MONSTER ENERGY': 'https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&q=80&w=300',
  'INTEL CORE': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=300'
};

export const SponsorManagement = () => {
  const { content: siteContent, updateSection } = useSiteContent();
  const rawSponsors = siteContent.sponsors || [];

  // Map sponsors to have full fields if missing
  const sponsors = rawSponsors.map(sp => {
    // Generate dates based on name or ID if missing
    let startDate = sp.startDate || '2025-01-01';
    let endDate = sp.endDate || '2026-12-31';
    let logo = sp.logo || DEFAULT_LOGOS[sp.name] || 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=300';
    
    // Default HYPERX and INTEL CORE as expired
    let status = sp.status;
    if (!status) {
      if (sp.name === 'HYPERX' || sp.name === 'INTEL CORE') {
        status = 'EXPIRED';
        endDate = '2025-12-31';
      } else {
        status = 'ACTIVE';
      }
    }

    return {
      ...sp,
      logo,
      startDate,
      endDate,
      status
    };
  });

  const [activeFilter, setActiveFilter] = useState('ALL'); // 'ALL', 'ACTIVE', 'EXPIRED'
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_SPONSOR);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenAdd = () => {
    setForm(EMPTY_SPONSOR);
    setEditingId(null);
    setShowModal(true);
  };

  const handleOpenEdit = (sponsor) => {
    setForm({
      name: sponsor.name || '',
      type: sponsor.type || '',
      url: sponsor.url || '',
      logo: sponsor.logo || '',
      startDate: sponsor.startDate || '',
      endDate: sponsor.endDate || '',
      status: sponsor.status || 'ACTIVE'
    });
    setEditingId(sponsor.id);
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      showToast('Please enter a sponsor name', 'error');
      return;
    }

    const payload = {
      name: form.name,
      type: form.type || 'Sponsor',
      url: form.url || '#',
      logo: form.logo || 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=300',
      startDate: form.startDate || '2026-01-01',
      endDate: form.endDate || '2026-12-31',
      status: form.status
    };

    if (editingId) {
      // Update existing
      const updated = rawSponsors.map(sp => 
        sp.id === editingId ? { ...sp, ...payload } : sp
      );
      updateSection('sponsors', updated);
      showToast('Sponsor details updated.');
    } else {
      // Add new
      const newSponsor = {
        ...payload,
        id: Date.now()
      };
      updateSection('sponsors', [...rawSponsors, newSponsor]);
      showToast('New sponsor added successfully.');
    }

    setShowModal(false);
  };

  const handleDelete = () => {
    const updated = rawSponsors.filter(sp => sp.id !== deleteTarget.id);
    updateSection('sponsors', updated);
    setDeleteTarget(null);
    showToast('Sponsor removed from brand partner pool.', 'error');
  };

  const handleToggleStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === 'ACTIVE' ? 'EXPIRED' : 'ACTIVE';
    const updated = rawSponsors.map(sp => {
      if (sp.id === id) {
        return { ...sp, status: nextStatus };
      }
      return sp;
    });
    updateSection('sponsors', updated);
    showToast(`Status updated to ${nextStatus}.`);
  };

  const filteredSponsors = sponsors.filter(sp => {
    if (activeFilter === 'ALL') return true;
    return sp.status === activeFilter;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-md transition-all duration-300 ${
          toast.type === 'success'
            ? 'bg-gaming-purple/20 border-gaming-purple/40 text-white'
            : 'bg-red-500/20 border-red-500/40 text-white'
        }`}>
          {toast.type === 'success' ? (
            <CheckCircle size={16} className="text-gaming-purple flex-shrink-0" />
          ) : (
            <ShieldAlert size={16} className="text-red-400 flex-shrink-0" />
          )}
          <span className="text-sm font-semibold">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 text-gray-400 hover:text-white text-lg leading-none cursor-pointer">×</button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gaming-purple/20 border border-gaming-purple/30 flex items-center justify-center">
              <Handshake size={18} className="text-gaming-purple" />
            </div>
            Sponsor & Brand Partner Management
          </h1>
          <p className="text-xs text-gray-500 mt-1 ml-12">
            Configure partner banners, logos, website redirects, and contracts.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-gaming-purple hover:bg-gaming-purple/80 text-white text-xs font-extrabold rounded-xl transition-all duration-200 shadow-lg shadow-gaming-purple/20 cursor-pointer whitespace-nowrap"
        >
          <Plus size={15} />
          <span>Add Sponsor</span>
        </button>
      </div>

      {/* Filter and Overview */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="flex gap-1.5">
          {['ALL', 'ACTIVE', 'EXPIRED'].map(filter => {
            const count = filter === 'ALL' 
              ? sponsors.length 
              : sponsors.filter(sp => sp.status === filter).length;
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs uppercase font-extrabold transition-all duration-150 border cursor-pointer ${
                  isActive 
                    ? 'bg-gaming-purple/20 border-gaming-purple/35 text-white shadow-md'
                    : 'bg-white/3 border-white/5 text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {filter} ({count})
              </button>
            );
          })}
        </div>

        <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">
          Total Sponsorship Pool: <span className="text-gaming-blue">{sponsors.length} Partners</span>
        </div>
      </div>

      {/* Grid List of Sponsors */}
      {filteredSponsors.length === 0 ? (
        <div className="glass-panel py-20 text-center rounded-2xl border border-white/5">
          <div className="w-16 h-16 rounded-2xl bg-gaming-purple/10 border border-gaming-purple/20 flex items-center justify-center mx-auto mb-4">
            <Handshake size={28} className="text-gaming-purple/40" />
          </div>
          <h3 className="text-base font-bold text-white/50 mb-1">No Brand Partners Found</h3>
          <p className="text-xs text-gray-600">No sponsors matched this filter category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSponsors.map(sponsor => (
            <div
              key={sponsor.id}
              className="glass-panel border border-white/5 rounded-2xl overflow-hidden hover:border-gaming-purple/30 transition-all duration-300 flex flex-col justify-between bg-[#03050f]/30 group shadow-lg"
            >
              {/* Logo block */}
              <div className="relative h-28 w-full bg-black/40 border-b border-white/5 flex items-center justify-center p-4">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-all duration-300"
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="hidden text-center text-xs font-bold text-gray-600">
                  {sponsor.name} Logo
                </div>

                {/* Status indicator on image */}
                <button
                  onClick={() => handleToggleStatus(sponsor.id, sponsor.status)}
                  className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase border cursor-pointer transition-all ${
                    sponsor.status === 'ACTIVE'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                      : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                  }`}
                  title="Click to toggle status"
                >
                  {sponsor.status}
                </button>
              </div>

              {/* Detail block */}
              <div className="p-4 space-y-4 flex-1">
                <div className="space-y-1">
                  <span className="text-[9px] bg-gaming-purple/10 text-gaming-purple font-black uppercase tracking-wider px-2 py-0.5 rounded border border-gaming-purple/20 w-fit block">
                    {sponsor.type}
                  </span>
                  <h3 className="text-sm font-extrabold text-white group-hover:text-gaming-blue transition-all">
                    {sponsor.name}
                  </h3>
                </div>

                {/* Web & Contract Info */}
                <div className="space-y-2 text-xs">
                  {/* Website link */}
                  <a
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-white font-semibold transition-all w-fit"
                  >
                    <LinkIcon size={12} className="text-gaming-blue" />
                    <span className="truncate max-w-[200px]">{sponsor.url}</span>
                  </a>

                  {/* Contract Period */}
                  <div className="flex items-center gap-2 text-gray-500 font-medium">
                    <Calendar size={12} className="text-gray-600" />
                    <span>
                      {sponsor.startDate ? new Date(sponsor.startDate).toLocaleDateString('en-US', {month: 'short', year: 'numeric'}) : 'N/A'}
                      {' → '}
                      {sponsor.endDate ? new Date(sponsor.endDate).toLocaleDateString('en-US', {month: 'short', year: 'numeric'}) : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="bg-[#03050f]/80 px-4 py-2.5 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-gray-600 font-semibold uppercase tracking-wider">
                  Contract:{' '}
                  <span className={sponsor.status === 'ACTIVE' ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                    {sponsor.status === 'ACTIVE' ? 'Active' : 'Expired'}
                  </span>
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenEdit(sponsor)}
                    className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer"
                    title="Edit Partner"
                  >
                    <Pencil size={12} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(sponsor)}
                    className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                    title="Delete Partner"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Sponsor Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <form
            onSubmit={handleSave}
            className="relative glass-panel border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl bg-[#050816] space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Handshake size={16} className="text-gaming-purple" />
                {editingId ? 'Edit Brand Partner' : 'Add Brand Partner'}
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3.5">
              {/* Sponsor Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Sponsor Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. NVIDIA India"
                  required
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gaming-purple/60 transition-all"
                />
              </div>

              {/* Partner Type */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Partner Category</label>
                <input
                  type="text"
                  value={form.type}
                  onChange={e => setForm(prev => ({ ...prev, type: e.target.value }))}
                  placeholder="e.g. Technology Partner, Title Sponsor"
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gaming-purple/60 transition-all"
                />
              </div>

              {/* Logo URL */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                  <ImageIcon size={10} className="text-gaming-purple" />
                  Logo URL
                </label>
                <input
                  type="text"
                  value={form.logo}
                  onChange={e => setForm(prev => ({ ...prev, logo: e.target.value }))}
                  placeholder="https://..."
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gaming-purple/60 transition-all"
                />
              </div>

              {/* Website URL */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                  <Globe size={10} className="text-gaming-purple" />
                  Website URL
                </label>
                <input
                  type="text"
                  value={form.url}
                  onChange={e => setForm(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="e.g. https://nvidia.com"
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gaming-purple/60 transition-all"
                />
              </div>

              {/* Dates Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Start Date</label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={e => setForm(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gaming-purple/60 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">End Date</label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={e => setForm(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gaming-purple/60 transition-all"
                  />
                </div>
              </div>

              {/* Status Select */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Contract Status</label>
                <select
                  value={form.status}
                  onChange={e => setForm(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gaming-purple/60 transition-all"
                >
                  <option value="ACTIVE" className="bg-[#050816]">ACTIVE</option>
                  <option value="EXPIRED" className="bg-[#050816]">EXPIRED</option>
                </select>
              </div>
            </div>

            {/* Modal actions */}
            <div className="flex gap-2 pt-3 border-t border-white/5">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 text-xs font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-gaming-purple hover:bg-gaming-purple/80 text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer"
              >
                Save Partner
              </button>
            </div>
          </form>
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
                <h3 className="text-base font-bold text-white mb-1">Remove Sponsor?</h3>
                <p className="text-xs text-gray-400">
                  Are you sure you want to delete <span className="text-white font-semibold">"{deleteTarget.name}"</span>? This will hide their brand logo from the homepage partner section.
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
                  Remove Partner
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
