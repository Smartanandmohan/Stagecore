import React, { useState, useEffect } from 'react';
import {
  Check, X, Search, Calendar, Users, Eye, AlertTriangle, 
  CheckCircle, ShieldAlert, ArrowUpDown, Filter, CreditCard, Trophy
} from 'lucide-react';

const INITIAL_REGISTRATIONS = [
  {
    id: 'reg_1',
    teamName: 'Immortal Esports',
    tournament: 'StageCore Valorant Cup #12',
    players: ['Viper#VAL', 'Slayer#101', 'Phoenix#IND', 'Sage#999', 'Jett#321'],
    paymentStatus: 'Verified',
    paymentScreenshot: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600',
    amount: '₹ 500',
    txId: 'TXN847291039',
    date: '2026-05-29',
    status: 'Approved'
  },
  {
    id: 'reg_2',
    teamName: 'Gods of War',
    tournament: 'StageCore BGMI Masters',
    players: ['Maximus', 'Ares', 'Hades', 'Zeus'],
    paymentStatus: 'Pending',
    paymentScreenshot: 'https://images.unsplash.com/photo-1579621970795-87faff3f68d8?auto=format&fit=crop&q=80&w=600',
    amount: '₹ 1,000',
    txId: 'TXN194837583',
    date: '2026-05-31',
    status: 'Pending'
  },
  {
    id: 'reg_3',
    teamName: 'Shadow Recruiters',
    tournament: 'StageCore Free Fire Clash',
    players: ['Shadow', 'Ghost', 'Wraith', 'Reaper'],
    paymentStatus: 'Flagged',
    paymentScreenshot: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=600',
    amount: '₹ 250',
    txId: 'TXN493028174',
    date: '2026-05-28',
    status: 'Rejected'
  },
  {
    id: 'reg_4',
    teamName: 'Trigger Happy',
    tournament: 'StageCore CS2 Cup',
    players: ['Karrigan', 'Kennys', 'Zywoo', 'Simple', 'Dev1ce'],
    paymentStatus: 'Pending',
    paymentScreenshot: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&q=80&w=600',
    amount: '₹ 500',
    txId: 'TXN748920193',
    date: '2026-05-31',
    status: 'Pending'
  },
  {
    id: 'reg_5',
    teamName: 'Velocity Juniors',
    tournament: 'StageCore Valorant Cup #12',
    players: ['Vandal#1', 'Phantom#2', 'Operator#3', 'Sheriff#4', 'Spectre#5'],
    paymentStatus: 'Pending',
    paymentScreenshot: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=600',
    amount: '₹ 500',
    txId: 'TXN102938475',
    date: '2026-05-30',
    status: 'Pending'
  }
];

const LOCAL_STORAGE_KEY = 'stagecore_registrations';

export const RegistrationList = () => {
  const [registrations, setRegistrations] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
    } catch {
      return INITIAL_REGISTRATIONS;
    }
  });

  const [activeTab, setActiveTab] = useState('Pending'); // 'Pending', 'Approved', 'Rejected'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTournament, setSelectedTournament] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedScreenshot, setSelectedScreenshot] = useState(null); // Registration object for modal
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(registrations));
  }, [registrations]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleApprove = (id) => {
    setRegistrations(prev =>
      prev.map(reg => {
        if (reg.id === id) {
          showToast(`Approved registration for ${reg.teamName}!`);
          return { ...reg, status: 'Approved', paymentStatus: 'Verified' };
        }
        return reg;
      })
    );
    if (selectedScreenshot?.id === id) {
      setSelectedScreenshot(null);
    }
  };

  const handleReject = (id) => {
    setRegistrations(prev =>
      prev.map(reg => {
        if (reg.id === id) {
          showToast(`Rejected registration for ${reg.teamName}.`, 'error');
          return { ...reg, status: 'Rejected' };
        }
        return reg;
      })
    );
    if (selectedScreenshot?.id === id) {
      setSelectedScreenshot(null);
    }
  };

  const handleVerifyPayment = (id, newStatus = 'Verified') => {
    setRegistrations(prev =>
      prev.map(reg => {
        if (reg.id === id) {
          showToast(`Payment status updated to ${newStatus} for ${reg.teamName}`);
          return { ...reg, paymentStatus: newStatus };
        }
        return reg;
      })
    );
    if (selectedScreenshot?.id === id) {
      setSelectedScreenshot(prev => ({ ...prev, paymentStatus: newStatus }));
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Get unique tournaments for filtering
  const tournamentsList = ['All', ...new Set(registrations.map(r => r.tournament))];

  // Filtering & Sorting logic
  const filteredRegistrations = registrations
    .filter(reg => reg.status === activeTab)
    .filter(reg => {
      const matchSearch =
        reg.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.tournament.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.players.some(ign => ign.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (reg.txId && reg.txId.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchTournament = selectedTournament === 'All' || reg.tournament === selectedTournament;
      
      return matchSearch && matchTournament;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'date') {
        comparison = new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'teamName') {
        comparison = a.teamName.localeCompare(b.teamName);
      } else if (sortBy === 'tournament') {
        comparison = a.tournament.localeCompare(b.tournament);
      }
      return sortOrder === 'desc' ? -comparison : comparison;
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
              <CreditCard size={18} className="text-gaming-purple" />
            </div>
            Registration & Payment Management
          </h1>
          <p className="text-xs text-gray-500 mt-1 ml-12">
            Verify payment slips and manage team participation status.
          </p>
        </div>
      </div>

      {/* Quick Stats Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-white/5 bg-[#03050f]/50 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Pending Approvals</p>
            <p className="text-2xl font-extrabold text-amber-400 mt-1">
              {registrations.filter(r => r.status === 'Pending').length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Calendar size={18} />
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-white/5 bg-[#03050f]/50 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Total Approved Teams</p>
            <p className="text-2xl font-extrabold text-emerald-400 mt-1">
              {registrations.filter(r => r.status === 'Approved').length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Check size={18} />
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-white/5 bg-[#03050f]/50 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Rejected Entries</p>
            <p className="text-2xl font-extrabold text-red-400 mt-1">
              {registrations.filter(r => r.status === 'Rejected').length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
            <X size={18} />
          </div>
        </div>
      </div>

      {/* Tabs and Controls */}
      <div className="flex flex-col gap-4">
        {/* Switch tabs */}
        <div className="flex border-b border-white/5">
          {['Pending', 'Approved', 'Rejected'].map(tab => {
            const count = registrations.filter(r => r.status === tab).length;
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-xs uppercase tracking-wider font-extrabold border-b-2 transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'border-gaming-purple text-white bg-gaming-purple/5'
                    : 'border-transparent text-gray-500 hover:text-white hover:bg-white/3'
                }`}
              >
                <span>{tab}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-gaming-purple text-white' : 'bg-white/10 text-gray-400'
                }`}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Filters and search row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search team, tournament, IGNs..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gaming-purple/60 focus:ring-1 focus:ring-gaming-purple/30 transition-all duration-200"
            />
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          <div className="relative">
            <select
              value={selectedTournament}
              onChange={e => setSelectedTournament(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-xl pl-9 pr-8 py-2.5 text-xs text-white appearance-none focus:outline-none focus:border-gaming-purple/60 focus:ring-1 focus:ring-gaming-purple/30 transition-all duration-200"
            >
              {tournamentsList.map(t => (
                <option key={t} value={t} className="bg-[#050816]">{t === 'All' ? 'All Tournaments' : t}</option>
              ))}
            </select>
            <Trophy size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <Filter size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleSort('date')}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center justify-center gap-2 text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-150"
            >
              <Calendar size={13} />
              <span>Sort by Date</span>
              <ArrowUpDown size={12} className="text-gray-500" />
            </button>
            <button
              onClick={() => handleSort('teamName')}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center justify-center gap-2 text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-150"
            >
              <Users size={13} />
              <span>Sort by Name</span>
              <ArrowUpDown size={12} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Registrations Table */}
      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        {filteredRegistrations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gaming-purple/10 border border-gaming-purple/20 flex items-center justify-center mb-4">
              <Users size={28} className="text-gaming-purple/50" />
            </div>
            <h3 className="text-base font-bold text-white/50 mb-1">No Registrations Found</h3>
            <p className="text-xs text-gray-500">There are no registrations matching your search or filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Team Name</th>
                  <th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Tournament</th>
                  <th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Players IGNs</th>
                  <th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Payment</th>
                  <th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Receipt</th>
                  <th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Date</th>
                  <th className="text-right text-[10px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredRegistrations.map((reg) => (
                  <tr
                    key={reg.id}
                    className="hover:bg-white/2 transition-colors duration-150 group"
                  >
                    {/* Team Name */}
                    <td className="px-5 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white group-hover:text-gaming-blue transition-colors">
                          {reg.teamName}
                        </span>
                        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">ID: {reg.id}</span>
                      </div>
                    </td>

                    {/* Tournament */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Trophy size={12} className="text-gaming-purple" />
                        <span className="text-xs text-gray-300 font-medium">{reg.tournament}</span>
                      </div>
                    </td>

                    {/* Players IGNs */}
                    <td className="px-5 py-4 max-w-[280px]">
                      <div className="flex flex-wrap gap-1">
                        {reg.players.map((ign, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-white/5 border border-white/5 rounded-md px-1.5 py-0.5 text-gray-400 font-medium"
                          >
                            {ign}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Payment Verification Status */}
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide w-fit border ${
                          reg.paymentStatus === 'Verified'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : reg.paymentStatus === 'Flagged'
                            ? 'bg-red-500/10 text-red-400 border-red-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          <span className={`w-1 h-1 rounded-full ${
                            reg.paymentStatus === 'Verified' ? 'bg-emerald-400' : reg.paymentStatus === 'Flagged' ? 'bg-red-400' : 'bg-amber-400 animate-pulse'
                          }`} />
                          {reg.paymentStatus}
                        </span>
                        <span className="text-[10px] text-gray-500 font-medium">{reg.amount} ({reg.txId || 'N/A'})</span>
                      </div>
                    </td>

                    {/* Receipt Link */}
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setSelectedScreenshot(reg)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-gaming-purple/20 hover:text-white border border-white/10 rounded-lg text-xs font-bold text-gray-400 transition-all cursor-pointer"
                      >
                        <Eye size={12} />
                        <span>View Proof</span>
                      </button>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4">
                      <span className="text-xs text-gray-400">{reg.date}</span>
                    </td>

                    {/* Row Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {reg.paymentStatus !== 'Verified' && (
                          <button
                            onClick={() => handleVerifyPayment(reg.id, 'Verified')}
                            title="Verify Payment"
                            className="p-2 text-emerald-400 hover:bg-emerald-500/10 border border-emerald-500/20 rounded-xl transition-all cursor-pointer"
                          >
                            <CheckCircle size={14} />
                          </button>
                        )}
                        {reg.status !== 'Approved' && (
                          <button
                            onClick={() => handleApprove(reg.id)}
                            title="Approve Team"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold rounded-xl transition-all cursor-pointer"
                          >
                            <Check size={12} />
                            <span>Approve</span>
                          </button>
                        )}
                        {reg.status !== 'Rejected' && (
                          <button
                            onClick={() => handleReject(reg.id)}
                            title="Reject Team"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-extrabold rounded-xl transition-all cursor-pointer"
                          >
                            <X size={12} />
                            <span>Reject</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payment Screenshot Modal */}
      {selectedScreenshot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedScreenshot(null)} />
          <div className="relative glass-panel border border-white/10 rounded-2xl p-6 max-w-xl w-full shadow-2xl bg-[#050816] flex flex-col md:flex-row gap-6 max-h-[90vh] overflow-y-auto">
            {/* Left: Screenshot Image */}
            <div className="flex-1 flex flex-col items-center justify-center bg-black/40 border border-white/5 rounded-xl p-2 relative overflow-hidden group min-h-[250px]">
              <img
                src={selectedScreenshot.paymentScreenshot}
                alt="Payment Receipt Mock"
                className="max-h-[350px] object-contain rounded-lg border border-white/10"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="hidden text-center text-xs text-gray-500 p-4">
                Mock screenshot URL failed to load.
              </div>
            </div>

            {/* Right: Info and Quick Verification Panel */}
            <div className="w-full md:w-[220px] flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">Payment Proof</h3>
                  <button
                    onClick={() => setSelectedScreenshot(null)}
                    className="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-3 bg-white/3 border border-white/5 rounded-xl p-3 text-xs">
                  <div>
                    <span className="text-gray-500 font-bold block">TEAM NAME</span>
                    <span className="text-white font-bold text-sm block mt-0.5">{selectedScreenshot.teamName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-bold block">TOURNAMENT</span>
                    <span className="text-gray-300 font-medium block mt-0.5">{selectedScreenshot.tournament}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-bold block">AMOUNT PAID</span>
                    <span className="text-gaming-blue font-bold block mt-0.5">{selectedScreenshot.amount}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-bold block">TRANSACTION ID</span>
                    <span className="font-mono text-white block mt-0.5">{selectedScreenshot.txId}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-bold block">PAYMENT STATUS</span>
                    <span className={`inline-block mt-0.5 px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      selectedScreenshot.paymentStatus === 'Verified'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : selectedScreenshot.paymentStatus === 'Flagged'
                        ? 'bg-red-500/10 text-red-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {selectedScreenshot.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">Verify Slip</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleVerifyPayment(selectedScreenshot.id, 'Verified')}
                    className="flex-1 py-2 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
                  >
                    Verify
                  </button>
                  <button
                    onClick={() => handleVerifyPayment(selectedScreenshot.id, 'Flagged')}
                    className="flex-1 py-2 bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/40 text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
                  >
                    Flag
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(selectedScreenshot.id)}
                    className="w-full py-2.5 bg-gaming-purple text-white text-xs font-extrabold rounded-xl hover:bg-gaming-purple/80 transition-all cursor-pointer"
                  >
                    Approve Entry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
