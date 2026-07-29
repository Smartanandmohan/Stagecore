import React, { useState, useEffect } from 'react';
import {
  ShieldAlert, UserX, MessageSquare, AlertTriangle, ShieldCheck, Video,
  Ban, CheckCircle, VolumeX, AlertCircle, Play, MoreVertical, Shield,
  Search, Users, Filter, Check, Clock, Trash2, Eye, X, BarChart2
} from 'lucide-react';

const INITIAL_MOD_REPORTS = [
  {
    id: 'rep_1',
    reported: 'ToxicGamer#999',
    reporter: 'SlayerX',
    violation: 'Toxicity', // Toxicity, Throwing, Stream Sniping, Offensive Name
    type: 'Player', // Player, Team, Chat, Cheating
    status: 'PENDING', // PENDING, RESOLVED
    date: '2026-05-31',
    details: 'Spamming slurs in global chat after losing round 3.'
  },
  {
    id: 'rep_2',
    reported: 'NoobSlayerTeam',
    reporter: 'ViperPro',
    violation: 'Offensive Name',
    type: 'Team',
    status: 'PENDING',
    date: '2026-05-30',
    details: 'Team logo and bio contain inappropriate content.'
  },
  {
    id: 'rep_3',
    reported: 'Lagger101',
    reporter: 'AdminEye',
    violation: 'Throwing',
    type: 'Player',
    status: 'PENDING',
    date: '2026-05-31',
    details: 'Intentionally feeding kills to opposing team in Valorant finals.'
  },
  {
    id: 'rep_4',
    reported: 'ChatSpammer#12',
    reporter: 'ModBot',
    violation: 'Toxicity',
    type: 'Chat',
    status: 'RESOLVED',
    date: '2026-05-29',
    details: 'Flooding tournament chat with links and spam.'
  },
  {
    id: 'rep_5',
    reported: 'TriggerFinger',
    reporter: 'ApexLegend',
    violation: 'Stream Sniping',
    type: 'Player',
    status: 'PENDING',
    date: '2026-05-31',
    details: 'Targeting streamer live; admitted in match chat.'
  },
  {
    id: 'rep_6',
    reported: 'WallBanger',
    reporter: 'EntityGamer',
    violation: 'Toxicity',
    type: 'Cheating',
    status: 'PENDING',
    date: '2026-05-31',
    details: 'Suspected anti-recoil scripting during BGMI match.'
  }
];

const INITIAL_AC_CASES = [
  {
    id: 'ac_1',
    playerIgn: 'AimBotKing#CS',
    reason: 'Aimbot', // Wallhack, Aimbot, Scripting
    evidence: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600',
    status: 'Pending Review', // Pending Review, Investigating, Banned, Dismissed
    reportedAt: '2026-05-31',
    detectionRate: '98.4%'
  },
  {
    id: 'ac_2',
    playerIgn: 'WallLockGod',
    reason: 'Wallhack',
    evidence: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=600',
    status: 'Investigating',
    reportedAt: '2026-05-30',
    detectionRate: '72.1%'
  },
  {
    id: 'ac_3',
    playerIgn: 'FastScripter',
    reason: 'Scripting',
    evidence: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=600',
    status: 'Pending Review',
    reportedAt: '2026-05-28',
    detectionRate: '85.9%'
  },
  {
    id: 'ac_4',
    playerIgn: 'SpinTroll',
    reason: 'Aimbot',
    evidence: 'https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?auto=format&fit=crop&q=80&w=600',
    status: 'Banned',
    reportedAt: '2026-05-25',
    detectionRate: '99.9%'
  }
];

const STORAGE_MOD_KEY = 'stagecore_mod_reports';
const STORAGE_AC_KEY = 'stagecore_ac_cases';
const STORAGE_BAN_KEY = 'stagecore_permanent_bans';

export const ReportsPage = ({ initialTab = 'analytics' }) => {
  // Page Tabs: 'analytics', 'moderation' or 'anticheat'
  const [activeMainTab, setActiveMainTab] = useState(initialTab);

  useEffect(() => {
    setActiveMainTab(initialTab);
  }, [initialTab]);

  // Mod Section Sub-tabs: 'Player', 'Team', 'Chat', 'Cheating' (which maps to types)
  const [activeModSubTab, setActiveModSubTab] = useState('Player');

  // Load state from local storage or defaults
  const [modReports, setModReports] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_MOD_KEY);
      return saved ? JSON.parse(saved) : INITIAL_MOD_REPORTS;
    } catch {
      return INITIAL_MOD_REPORTS;
    }
  });

  const [acCases, setAcCases] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_AC_KEY);
      return saved ? JSON.parse(saved) : INITIAL_AC_CASES;
    } catch {
      return INITIAL_AC_CASES;
    }
  });

  const [permanentBans, setPermanentBans] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_BAN_KEY);
      return saved ? JSON.parse(saved) : ['SpinTroll', 'GlitchAbuser#99', 'RecoilScript_Ind'];
    } catch {
      return ['SpinTroll', 'GlitchAbuser#99', 'RecoilScript_Ind'];
    }
  });

  const [toast, setToast] = useState(null);
  const [selectedReportDetail, setSelectedReportDetail] = useState(null);
  const [muteSelectId, setMuteSelectId] = useState(null); // Report ID for mute dropdown
  const [evidenceViewCase, setEvidenceViewCase] = useState(null); // Case object for evidence mockup

  useEffect(() => {
    localStorage.setItem(STORAGE_MOD_KEY, JSON.stringify(modReports));
  }, [modReports]);

  useEffect(() => {
    localStorage.setItem(STORAGE_AC_KEY, JSON.stringify(acCases));
  }, [acCases]);

  useEffect(() => {
    localStorage.setItem(STORAGE_BAN_KEY, JSON.stringify(permanentBans));
  }, [permanentBans]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  /* ─── Community Moderation Action Handlers ─── */
  const handleWarnPlayer = (id, playerName) => {
    setModReports(prev =>
      prev.map(rep => (rep.id === id ? { ...rep, status: 'RESOLVED' } : rep))
    );
    showToast(`Official warning letter dispatched to ${playerName}.`);
    if (selectedReportDetail?.id === id) setSelectedReportDetail(null);
  };

  const handleMutePlayer = (id, playerName, duration) => {
    setModReports(prev =>
      prev.map(rep => (rep.id === id ? { ...rep, status: 'RESOLVED' } : rep))
    );
    setMuteSelectId(null);
    showToast(`Chat mute applied to ${playerName} for ${duration}.`);
    if (selectedReportDetail?.id === id) setSelectedReportDetail(null);
  };

  const handleSuspendPlayer = (id, playerName) => {
    setModReports(prev =>
      prev.map(rep => (rep.id === id ? { ...rep, status: 'RESOLVED' } : rep))
    );
    showToast(`Suspension protocol (30 days) activated for ${playerName}.`, 'error');
    if (selectedReportDetail?.id === id) setSelectedReportDetail(null);
  };

  const handlePermanentBanPlayer = (id, playerName) => {
    setModReports(prev =>
      prev.map(rep => (rep.id === id ? { ...rep, status: 'RESOLVED' } : rep))
    );
    if (!permanentBans.includes(playerName)) {
      setPermanentBans(prev => [playerName, ...prev]);
    }
    showToast(`Permanent system exclusion applied to ${playerName}.`, 'error');
    if (selectedReportDetail?.id === id) setSelectedReportDetail(null);
  };

  /* ─── Anti-Cheat Action Handlers ─── */
  const handleACBan = (id, playerIgn) => {
    setAcCases(prev =>
      prev.map(c => (c.id === id ? { ...c, status: 'Banned' } : c))
    );
    if (!permanentBans.includes(playerIgn)) {
      setPermanentBans(prev => [playerIgn, ...prev]);
    }
    showToast(`Anti-cheat: Ban code injected for ${playerIgn}!`, 'error');
  };

  const handleACDismiss = (id, playerIgn) => {
    setAcCases(prev =>
      prev.map(c => (c.id === id ? { ...c, status: 'Dismissed' } : c))
    );
    showToast(`Anti-cheat case dismissed for ${playerIgn}.`);
  };

  const handleACInvestigate = (id, playerIgn) => {
    setAcCases(prev =>
      prev.map(c => (c.id === id ? { ...c, status: 'Investigating' } : c))
    );
    showToast(`AC case of ${playerIgn} flagged for manual review.`);
  };

  // Filter Mod reports based on active subtab
  const filteredModReports = modReports.filter(rep => rep.type === activeModSubTab);

  // Statistics calculation for Anti-cheat
  const openCasesCount = acCases.filter(c => c.status === 'Pending Review').length;
  const investigatingCount = acCases.filter(c => c.status === 'Investigating').length;

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gaming-purple/20 border border-gaming-purple/30 flex items-center justify-center">
              <Shield size={18} className="text-gaming-purple" />
            </div>
            Security & Operations Console
          </h1>
          <p className="text-xs text-gray-500 mt-1 ml-12">
            Review community misconduct filings and verify anti-cheat server flags.
          </p>
        </div>

        {/* Console switcher */}
        <div className="flex bg-[#03050f] border border-white/5 rounded-xl p-1 w-fit">
          <button
            onClick={() => setActiveMainTab('analytics')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeMainTab === 'analytics'
                ? 'bg-gaming-purple text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Incident Analytics
          </button>
          <button
            onClick={() => setActiveMainTab('moderation')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeMainTab === 'moderation'
                ? 'bg-gaming-purple text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Community Moderation
          </button>
          <button
            onClick={() => setActiveMainTab('anticheat')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeMainTab === 'anticheat'
                ? 'bg-gaming-purple text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Anti-Cheat Operations
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 0: SECURITY & PLATFORM ANALYTICS
          ───────────────────────────────────────────────────────────── */}
      {activeMainTab === 'analytics' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Total Incidents */}
            <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-[#03050f]/60 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Security Incidents</p>
                <h3 className="text-3xl font-black text-white">{modReports.length + acCases.length}</h3>
                <p className="text-[10px] text-gray-500">Flags & filings combined</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gaming-purple/10 border border-gaming-purple/20 flex items-center justify-center text-gaming-purple">
                <ShieldAlert size={22} />
              </div>
            </div>

            {/* Card 2: Active Bans */}
            <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-[#03050f]/60 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Exclusions</p>
                <h3 className="text-3xl font-black text-red-500">{permanentBans.length}</h3>
                <p className="text-[10px] text-gray-500">Hardware & account level bans</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <Ban size={22} />
              </div>
            </div>

            {/* Card 3: Resolution Rate */}
            <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-[#03050f]/60 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Incident Resolution Rate</p>
                <h3 className="text-3xl font-black text-emerald-400">
                  {(( (modReports.filter(r => r.status === 'RESOLVED').length + acCases.filter(c => c.status === 'Banned' || c.status === 'Dismissed').length) / (modReports.length + acCases.length || 1) ) * 100).toFixed(1)}%
                </h3>
                <p className="text-[10px] text-gray-500">Tickets cleared or actioned</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck size={22} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Toxicity Breakdown Chart */}
            <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between bg-[#03050f]/40">
              <div>
                <h2 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-1.5">
                  <BarChart2 size={14} className="text-gaming-purple" />
                  Breaches by Violation Code
                </h2>
                <p className="text-[10px] text-gray-500 font-semibold">Incident breakdown categorized</p>
              </div>

              <div className="flex-1 min-h-[220px] flex items-center justify-center mt-4">
                <svg viewBox="0 0 300 150" className="w-full h-full">
                  <line x1="45" y1="20" x2="280" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
                  <line x1="45" y1="55" x2="280" y2="55" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
                  <line x1="45" y1="90" x2="280" y2="90" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
                  <line x1="45" y1="120" x2="280" y2="120" stroke="rgba(255,255,255,0.1)" />

                  {/* Toxicity Count Bar */}
                  <rect x="60" y={120 - Math.min(100, (modReports.filter(r => r.violation === 'Toxicity').length) * 20)} width="16" height={Math.min(100, (modReports.filter(r => r.violation === 'Toxicity').length) * 20)} rx="2" fill="#a855f7" />
                  
                  {/* Cheating Bar */}
                  <rect x="110" y={120 - Math.min(100, (acCases.filter(c => c.reason === 'Aimbot' || c.reason === 'Wallhack' || c.reason === 'Scripting').length) * 20)} width="16" height={Math.min(100, (acCases.filter(c => c.reason === 'Aimbot' || c.reason === 'Wallhack' || c.reason === 'Scripting').length) * 20)} rx="2" fill="#ec4899" />

                  {/* Throwing Bar */}
                  <rect x="160" y={120 - Math.min(100, modReports.filter(r => r.violation === 'Throwing').length * 20)} width="16" height={Math.min(100, modReports.filter(r => r.violation === 'Throwing').length * 20)} rx="2" fill="#3b82f6" />

                  {/* Stream Sniping Bar */}
                  <rect x="210" y={120 - Math.min(100, modReports.filter(r => r.violation === 'Stream Sniping').length * 20)} width="16" height={Math.min(100, modReports.filter(r => r.violation === 'Stream Sniping').length * 20)} rx="2" fill="#f59e0b" />

                  {/* Offensive Name Bar */}
                  <rect x="260" y={120 - Math.min(100, modReports.filter(r => r.violation === 'Offensive Name').length * 20)} width="16" height={Math.min(100, modReports.filter(r => r.violation === 'Offensive Name').length * 20)} rx="2" fill="#10b981" />

                  {/* Labels */}
                  <text x="52" y="132" fill="#6b7280" fontSize="7" fontWeight="bold">Tox</text>
                  <text x="103" y="132" fill="#6b7280" fontSize="7" fontWeight="bold">Cheat</text>
                  <text x="153" y="132" fill="#6b7280" fontSize="7" fontWeight="bold">Throw</text>
                  <text x="204" y="132" fill="#6b7280" fontSize="7" fontWeight="bold">Snipe</text>
                  <text x="255" y="132" fill="#6b7280" fontSize="7" fontWeight="bold">Name</text>

                  {/* Y values */}
                  <text x="15" y="24" fill="#6b7280" fontSize="8" fontWeight="bold">5+</text>
                  <text x="15" y="59" fill="#6b7280" fontSize="8" fontWeight="bold">3</text>
                  <text x="15" y="94" fill="#6b7280" fontSize="8" fontWeight="bold">1</text>
                </svg>
              </div>
            </div>

            {/* Right: Anti-Cheat Confidence Log Chart */}
            <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between bg-[#03050f]/40">
              <div>
                <h2 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-1.5">
                  <ShieldAlert size={14} className="text-pink-500" />
                  Anti-Cheat Telemetry Detections
                </h2>
                <p className="text-[10px] text-gray-500 font-semibold">Flag confidence index logs</p>
              </div>

              <div className="flex-1 min-h-[220px] flex items-center justify-center mt-4">
                <svg viewBox="0 0 300 150" className="w-full h-full">
                  <defs>
                    <linearGradient id="acGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ec4899" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line x1="30" y1="20" x2="280" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
                  <line x1="30" y1="60" x2="280" y2="60" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
                  <line x1="30" y1="100" x2="280" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
                  <line x1="30" y1="130" x2="280" y2="130" stroke="rgba(255,255,255,0.1)" />

                  <path 
                    d="M 30 130 Q 80 50 120 70 T 200 30 T 280 20 L 280 130 Z" 
                    fill="url(#acGrad)" 
                  />
                  <path 
                    d="M 30 130 Q 80 50 120 70 T 200 30 T 280 20" 
                    fill="none" 
                    stroke="#ec4899" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                  />

                  {/* Y values */}
                  <text x="10" y="24" fill="#6b7280" fontSize="8" fontWeight="bold">99%</text>
                  <text x="10" y="64" fill="#6b7280" fontSize="8" fontWeight="bold">80%</text>
                  <text x="10" y="104" fill="#6b7280" fontSize="8" fontWeight="bold">50%</text>

                  {/* Dots */}
                  <circle cx="30" cy="130" r="3.5" fill="#f43f5e" stroke="#050816" strokeWidth="1.5" />
                  <circle cx="85" cy="62" r="3.5" fill="#f43f5e" stroke="#050816" strokeWidth="1.5" />
                  <circle cx="120" cy="70" r="3.5" fill="#f43f5e" stroke="#050816" strokeWidth="1.5" />
                  <circle cx="200" cy="30" r="3.5" fill="#f43f5e" stroke="#050816" strokeWidth="1.5" />
                  <circle cx="280" cy="20" r="3.5" fill="#f43f5e" stroke="#050816" strokeWidth="1.5" />

                  {/* Dates */}
                  <text x="25" y="142" fill="#6b7280" fontSize="7" fontWeight="bold">27 May</text>
                  <text x="80" y="142" fill="#6b7280" fontSize="7" fontWeight="bold">28 May</text>
                  <text x="115" y="142" fill="#6b7280" fontSize="7" fontWeight="bold">29 May</text>
                  <text x="195" y="142" fill="#6b7280" fontSize="7" fontWeight="bold">30 May</text>
                  <text x="270" y="142" fill="#6b7280" fontSize="7" fontWeight="bold">31 May</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Audit Log Feed */}
          <div className="glass-panel rounded-2xl p-5 border border-white/5 space-y-4 bg-[#03050f]/30">
            <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle size={14} className="text-emerald-400" />
              Recent Operations & Actions Audit Log
            </h3>
            <div className="divide-y divide-white/5 max-h-[220px] overflow-y-auto pr-2 no-scrollbar">
              {modReports.filter(r => r.status === 'RESOLVED').map((r, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-gray-300">
                      Enforced security code on <span className="text-white font-semibold">{r.reported}</span> for <span className="text-gaming-blue">{r.violation}</span>.
                    </span>
                  </div>
                  <span className="text-gray-500 font-mono text-[10px]">{r.date}</span>
                </div>
              ))}
              {acCases.filter(c => c.status === 'Banned').map((c, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    <span className="text-gray-300">
                      HWID ban injected for client <span className="text-white font-semibold">{c.playerIgn}</span> (AI Flag: {c.reason} - Conf: {c.detectionRate}).
                    </span>
                  </div>
                  <span className="text-gray-500 font-mono text-[10px]">{c.reportedAt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* activeMainTab === 'moderation' */}
      {activeMainTab === 'moderation' && (
        <div className="space-y-6">
          {/* Subtabs selection */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex gap-2">
              {['Player', 'Team', 'Chat', 'Cheating'].map(sub => {
                const count = modReports.filter(rep => rep.type === sub && rep.status === 'PENDING').length;
                const isActive = activeModSubTab === sub;
                return (
                  <button
                    key={sub}
                    onClick={() => setActiveModSubTab(sub)}
                    className={`px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                      isActive
                        ? 'border-gaming-purple text-white bg-gaming-purple/5'
                        : 'border-transparent text-gray-500 hover:text-white'
                    }`}
                  >
                    {sub} Reports ({count} pending)
                  </button>
                );
              })}
            </div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              Moderation Desk Status: <span className="text-emerald-400">ONLINE</span>
            </div>
          </div>

          {/* Table */}
          <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
            {filteredModReports.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gaming-purple/10 border border-gaming-purple/20 flex items-center justify-center mx-auto mb-4 text-gaming-purple/40">
                  <Check size={24} />
                </div>
                <h3 className="text-sm font-bold text-white/50">All Clear!</h3>
                <p className="text-xs text-gray-600 mt-1">No pending community complaints filed for {activeModSubTab} category.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-white/5 bg-black/10">
                      <th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Reported Entity</th>
                      <th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Reporting Player</th>
                      <th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Violation Code</th>
                      <th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Date Filed</th>
                      <th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Status</th>
                      <th className="text-right text-[10px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">Enforcement Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredModReports.map(rep => (
                      <tr key={rep.id} className="hover:bg-white/2 transition-all">
                        {/* Reported Entity */}
                        <td className="px-5 py-3.5">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-white">{rep.reported}</span>
                            <button
                              onClick={() => setSelectedReportDetail(rep)}
                              className="text-[9px] text-gaming-blue hover:underline font-bold mt-1 text-left"
                            >
                              View full complaint log
                            </button>
                          </div>
                        </td>

                        {/* Reporting Player */}
                        <td className="px-5 py-3.5">
                          <span className="text-xs text-gray-300 font-semibold">{rep.reporter}</span>
                        </td>

                        {/* Violation Type */}
                        <td className="px-5 py-3.5">
                          <span className="text-xs text-gray-400 font-medium">{rep.violation}</span>
                        </td>

                        {/* Date */}
                        <td className="px-5 py-3.5">
                          <span className="text-xs text-gray-500">{rep.date}</span>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${
                            rep.status === 'PENDING'
                              ? 'bg-amber-500/15 text-amber-400 border-amber-500/25'
                              : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25'
                          }`}>
                            <span className={`w-1 h-1 rounded-full ${rep.status === 'PENDING' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
                            {rep.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-end gap-1.5 relative">
                            {rep.status === 'PENDING' ? (
                              <>
                                {/* Warn Action */}
                                <button
                                  onClick={() => handleWarnPlayer(rep.id, rep.reported)}
                                  className="px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 text-[10px] font-bold rounded-lg transition-all cursor-pointer"
                                  title="Send Official Warning"
                                >
                                  Warn
                                </button>

                                {/* Mute Dropdown trigger */}
                                <div className="relative">
                                  <button
                                    onClick={() => setMuteSelectId(muteSelectId === rep.id ? null : rep.id)}
                                    className="px-2.5 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 text-[10px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1"
                                    title="Restrict chat"
                                  >
                                    <VolumeX size={10} />
                                    <span>Mute</span>
                                  </button>

                                  {/* Mute Dropdown Options */}
                                  {muteSelectId === rep.id && (
                                    <div className="absolute right-0 top-full mt-1.5 z-40 bg-[#050816] border border-white/10 rounded-xl p-1.5 w-28 shadow-xl flex flex-col gap-1">
                                      {['1 Hour', '24 Hours', '7 Days'].map(duration => (
                                        <button
                                          key={duration}
                                          type="button"
                                          onClick={() => handleMutePlayer(rep.id, rep.reported, duration)}
                                          className="px-2 py-1 text-[10px] text-left font-bold text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                        >
                                          {duration}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                {/* Suspend Action */}
                                <button
                                  onClick={() => handleSuspendPlayer(rep.id, rep.reported)}
                                  className="px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-[10px] font-bold rounded-lg transition-all cursor-pointer"
                                  title="30-day suspension"
                                >
                                  Suspend
                                </button>

                                {/* Ban Action */}
                                <button
                                  onClick={() => handlePermanentBanPlayer(rep.id, rep.reported)}
                                  className="p-1.5 bg-red-500/20 hover:bg-red-500 text-white rounded-lg transition-all cursor-pointer"
                                  title="Permanent Exclusion Ban"
                                >
                                  <Ban size={11} />
                                </button>
                              </>
                            ) : (
                              <span className="text-[10px] text-gray-500 font-bold uppercase flex items-center gap-1">
                                <Check size={12} className="text-emerald-400" />
                                Action Applied
                              </span>
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
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: ANTI-CHEAT CENTER & DASHBOARD
          ───────────────────────────────────────────────────────────── */}
      {activeMainTab === 'anticheat' && (
        <div className="space-y-6">
          {/* Anti-cheat dashboard stats row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Stats: Open Cases */}
            <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-[#03050f]/60 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Open Server Flags</p>
                <h3 className="text-3xl font-black text-amber-400">{openCasesCount}</h3>
                <p className="text-[10px] text-gray-500">Requires manual log review</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <AlertCircle size={22} />
              </div>
            </div>

            {/* Stats: Under Investigation */}
            <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-[#03050f]/60 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Under Investigation</p>
                <h3 className="text-3xl font-black text-gaming-blue">{investigatingCount}</h3>
                <p className="text-[10px] text-gray-500">Video logs & mouse ticks loading</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gaming-blue/10 border border-gaming-blue/20 flex items-center justify-center text-gaming-blue">
                <Clock size={22} />
              </div>
            </div>

            {/* Stats: Permanent Ban Count */}
            <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-[#03050f]/60 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Permanent Ban Pool</p>
                <h3 className="text-3xl font-black text-red-500">{permanentBans.length}</h3>
                <p className="text-[10px] text-gray-500">Hardware & IP level blocks</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <Ban size={22} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Cases Table (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert size={14} className="text-gaming-purple" />
                  Anti-Cheat Detection Logs
                </h3>
                <span className="text-[9px] text-gray-500 font-mono">Server-side AI scan interval: 10s</span>
              </div>

              <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr className="border-b border-white/5 bg-black/10">
                        <th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Player IGN</th>
                        <th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Detection Reason</th>
                        <th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Confidence Rate</th>
                        <th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Evidence</th>
                        <th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                        <th className="text-right text-[10px] font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {acCases.map(c => (
                        <tr key={c.id} className="hover:bg-white/2 transition-all">
                          {/* IGN */}
                          <td className="px-4 py-3">
                            <span className="text-xs font-bold text-white block">{c.playerIgn}</span>
                            <span className="text-[9px] text-gray-500 font-mono">Flagged: {c.reportedAt}</span>
                          </td>

                          {/* Reason */}
                          <td className="px-4 py-3">
                            <span className="text-xs text-gray-300 font-semibold">{c.reason}</span>
                          </td>

                          {/* Confidence */}
                          <td className="px-4 py-3">
                            <span className={`text-xs font-extrabold ${parseFloat(c.detectionRate) > 90 ? 'text-red-400' : 'text-amber-400'}`}>
                              {c.detectionRate}
                            </span>
                          </td>

                          {/* Evidence link */}
                          <td className="px-4 py-3">
                            <button
                              onClick={() => setEvidenceViewCase(c)}
                              className="inline-flex items-center gap-1.5 text-xs text-gaming-blue hover:text-white font-bold transition-all bg-white/5 hover:bg-gaming-blue/20 border border-white/5 rounded-lg px-2.5 py-1.5 cursor-pointer"
                            >
                              <Video size={11} />
                              <span>View Logs</span>
                            </button>
                          </td>

                          {/* Status */}
                          <td className="px-4 py-3">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              c.status === 'Banned'
                                ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                : c.status === 'Dismissed'
                                ? 'bg-gray-500/10 text-gray-400 border border-white/5'
                                : c.status === 'Investigating'
                                ? 'bg-gaming-blue/10 text-gaming-blue border border-gaming-blue/20'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              {c.status}
                            </span>
                          </td>

                          {/* Action pills */}
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-1.5">
                              {c.status !== 'Banned' && c.status !== 'Dismissed' ? (
                                <>
                                  {c.status !== 'Investigating' && (
                                    <button
                                      onClick={() => handleACInvestigate(c.id, c.playerIgn)}
                                      className="px-2 py-1 bg-white/5 hover:bg-white/10 text-gray-300 text-[10px] font-bold rounded-lg border border-white/10 cursor-pointer"
                                    >
                                      Investigate
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleACBan(c.id, c.playerIgn)}
                                    className="px-2 py-1 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 text-[10px] font-bold rounded-lg border border-red-500/20 cursor-pointer"
                                  >
                                    Ban
                                  </button>
                                  <button
                                    onClick={() => handleACDismiss(c.id, c.playerIgn)}
                                    className="px-2 py-1 bg-white/5 hover:bg-white/15 text-gray-400 text-[10px] font-bold rounded-lg cursor-pointer"
                                  >
                                    Dismiss
                                  </button>
                                </>
                              ) : (
                                <span className="text-[10px] text-gray-500 font-bold uppercase">Case Resolved</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right: Permanent Bans Pool (1 col) */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <Ban size={14} className="text-red-400" />
                Permanent Exclusion List
              </h3>

              <div className="glass-panel rounded-2xl p-5 border border-white/5 bg-[#03050f]/60 space-y-4 max-h-[450px] overflow-y-auto">
                <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                  The following accounts are blacklisted from signing up for any official tournament matches.
                </p>

                <div className="space-y-2">
                  {permanentBans.map((bannedUser, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <span className="text-gray-200 font-semibold">{bannedUser}</span>
                      </div>
                      <button
                        onClick={() => {
                          setPermanentBans(prev => prev.filter(user => user !== bannedUser));
                          showToast(`Exclusion list updated: Removed ${bannedUser}`);
                        }}
                        className="text-[10px] text-gray-500 hover:text-white font-bold cursor-pointer"
                        title="Remove Ban"
                      >
                        Unban
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Community Report Detail Modal */}
      {selectedReportDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedReportDetail(null)} />
          <div className="relative glass-panel border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl bg-[#050816] space-y-5">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-400" />
                Complaint Details
              </h3>
              <button
                onClick={() => setSelectedReportDetail(null)}
                className="p-1 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-500 font-bold block uppercase tracking-wide">Reported Entity</span>
                  <span className="text-white font-bold text-sm block mt-0.5">{selectedReportDetail.reported}</span>
                </div>
                <div>
                  <span className="text-gray-500 font-bold block uppercase tracking-wide">Filer User</span>
                  <span className="text-white font-bold text-sm block mt-0.5">{selectedReportDetail.reporter}</span>
                </div>
              </div>

              <div>
                <span className="text-gray-500 font-bold block uppercase tracking-wide">Violation category</span>
                <span className="text-gaming-blue font-bold block mt-0.5">{selectedReportDetail.violation} ({selectedReportDetail.type})</span>
              </div>

              <div>
                <span className="text-gray-500 font-bold block uppercase tracking-wide">Description / logs</span>
                <p className="text-gray-300 bg-black/40 border border-white/5 rounded-xl p-3 mt-1 leading-relaxed">
                  {selectedReportDetail.details}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-500 font-bold block uppercase tracking-wide">Filing date</span>
                  <span className="text-gray-400 block mt-0.5">{selectedReportDetail.date}</span>
                </div>
                <div>
                  <span className="text-gray-500 font-bold block uppercase tracking-wide">Current Status</span>
                  <span className="text-amber-400 font-bold block mt-0.5">{selectedReportDetail.status}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-white/5">
              <button
                onClick={() => handleWarnPlayer(selectedReportDetail.id, selectedReportDetail.reported)}
                className="flex-1 py-2 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 rounded-xl transition-all cursor-pointer"
              >
                Warn Player
              </button>
              <button
                onClick={() => handlePermanentBanPlayer(selectedReportDetail.id, selectedReportDetail.reported)}
                className="flex-1 py-2 text-xs font-black text-white bg-red-500 hover:bg-red-600 rounded-xl transition-all cursor-pointer"
              >
                Ban Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Anti-cheat Evidence View Modal */}
      {evidenceViewCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setEvidenceViewCase(null)} />
          <div className="relative glass-panel border border-white/10 rounded-2xl p-6 max-w-xl w-full shadow-2xl bg-[#050816] space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Video size={16} className="text-gaming-purple" />
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Detection Evidence Log: {evidenceViewCase.playerIgn}
                </h3>
              </div>
              <button
                onClick={() => setEvidenceViewCase(null)}
                className="p-1 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Evidence Screen Preview */}
              <div className="aspect-video bg-black/60 rounded-xl border border-white/5 overflow-hidden flex flex-col items-center justify-center relative group">
                <img
                  src={evidenceViewCase.evidence}
                  alt="Telemetry log graph visual"
                  className="w-full h-full object-cover filter brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-gaming-purple/80 border border-gaming-purple flex items-center justify-center cursor-pointer group-hover:scale-110 transition-all text-white shadow-lg">
                    <Play size={16} className="ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[8px] font-mono text-gray-400">
                  CONFIDENCE: {evidenceViewCase.detectionRate}
                </div>
              </div>

              {/* Server Details */}
              <div className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <span className="text-gray-500 font-bold block">TRIGGER REASON</span>
                  <span className="text-red-400 font-extrabold text-sm block">{evidenceViewCase.reason}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500 font-bold block">CLIENT HARDWARE TELEMETRY</span>
                  <span className="text-gray-300 block font-mono bg-black/30 border border-white/5 rounded px-2 py-1 leading-relaxed">
                    Ticks delta: 0.003s<br />
                    Recoil offset: Y: -12.4, X: +0.2<br />
                    Mouse path variance: 0.01% (Bot Pattern)
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500 font-bold block">ACTION CODE BAN TARGET</span>
                  <span className="text-gray-400 block font-mono">{evidenceViewCase.playerIgn}</span>
                </div>
              </div>
            </div>

            {/* Quick resolution triggers */}
            <div className="flex gap-2 pt-3 border-t border-white/5">
              <button
                onClick={() => {
                  handleACDismiss(evidenceViewCase.id, evidenceViewCase.playerIgn);
                  setEvidenceViewCase(null);
                }}
                className="flex-1 py-2 text-xs font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer text-center"
              >
                Dismiss Case
              </button>
              <button
                onClick={() => {
                  handleACBan(evidenceViewCase.id, evidenceViewCase.playerIgn);
                  setEvidenceViewCase(null);
                }}
                className="flex-1 py-2 text-xs font-black text-white bg-red-500 hover:bg-red-600 rounded-xl transition-all cursor-pointer text-center"
              >
                Trigger HWID Ban
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
