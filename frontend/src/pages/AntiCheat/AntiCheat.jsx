import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Terminal as TermIcon, 
  Activity, 
  ShieldCheck, 
  AlertTriangle, 
  Lock, 
  Server, 
  RefreshCw,
  Cpu
} from 'lucide-react';

export const AntiCheat = () => {
  const [logs, setLogs] = useState([
    'Initializing StageCore Security Driver...',
    'Kernel Link verified: Status OK.',
    'Ready for diagnostic check.'
  ]);
  const [scanStatus, setScanStatus] = useState('idle'); // idle | scanning | safe | alert
  const [activeDriver, setActiveDriver] = useState(true);

  // Print mock console logs during scanning
  const runMockScan = () => {
    setScanStatus('scanning');
    setLogs([
      'Starting game directory checksum scan...',
      'Comparing process memory maps...',
      'Verifying dynamic-link library injection tables...'
    ]);

    const scannerLogs = [
      'Scanning thread count: 12 active modules.',
      'Checking game client hooks (Riot Games, Krafton, Valve)...',
      'Searching memory for active cheat signatures (aimbots, recoil macros)...',
      'Verifying StageCore hardware GUID authentication...',
      'Overlay hook inspection complete: 0 warnings.',
      'All process memory checks: SECURE.',
      'StageCore Security Scan: Completed successfully.'
    ];

    let counter = 0;
    const interval = setInterval(() => {
      if (counter < scannerLogs.length) {
        setLogs(prev => [...prev, scannerLogs[counter]]);
        counter++;
      } else {
        clearInterval(interval);
        setScanStatus('safe');
      }
    }, 600);
  };

  return (
    <div className="relative min-h-screen bg-gaming-bg text-gray-200 py-20 px-4 overflow-hidden font-gaming animate-fadeIn">
      {/* Background glowing graphics */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-gaming-purple/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gaming-blue/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gaming-blue text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Shield size={12} className="text-gaming-blue animate-pulse" />
            <span>Anti-Cheat Enforcement</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
            SECURITY & <span className="bg-gradient-to-r from-gaming-purple via-gaming-neon to-gaming-blue bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(124,58,237,0.35)]">INTEGRITY</span>
          </h1>
          <p className="max-w-xl mx-auto text-gray-400 text-xs md:text-sm leading-relaxed">
            StageCore runs state-of-the-art server-side and client-side anti-cheat integrations to maintain an strictly fair, hack-free playing field.
          </p>
        </div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left mb-16">
          
          {/* Diagnostic scanner & console (Left Column - 7cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full">
            
            {/* Status Panel */}
            <div className="glass-panel p-6 rounded-2xl border-white/5 flex flex-col md:flex-row gap-6 justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gaming-blue/5 to-transparent pointer-events-none" />
              
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border text-white ${
                  scanStatus === 'scanning' ? 'bg-gaming-blue/20 border-gaming-blue/30 animate-spin-slow' :
                  scanStatus === 'safe' ? 'bg-emerald-500/20 border-emerald-500/30' :
                  'bg-gaming-purple/10 border-gaming-purple/20 text-gaming-purple'
                }`}>
                  {scanStatus === 'scanning' ? <RefreshCw size={22} className="animate-spin" /> : <ShieldCheck size={22} className="text-emerald-400" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wide">Client Scan Diagnostic</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    Integrity status: {
                      scanStatus === 'idle' ? 'Ready to Scan' :
                      scanStatus === 'scanning' ? 'Running heuristics...' :
                      scanStatus === 'safe' ? 'System Clean' : 'Threat Flagged'
                    }
                  </p>
                </div>
              </div>

              <div className="flex gap-3 shrink-0">
                <button
                  onClick={runMockScan}
                  disabled={scanStatus === 'scanning'}
                  className="px-5 py-2.5 bg-gradient-to-r from-gaming-purple to-gaming-blue text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md disabled:opacity-50"
                >
                  Run Diagnostics
                </button>
              </div>
            </div>

            {/* Console Log Terminal */}
            <div className="glass-panel p-5 rounded-2xl border-white/5 bg-black/60 font-mono h-[300px] flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-white/5 shrink-0">
                <div className="flex items-center gap-2">
                  <TermIcon size={14} className="text-gaming-blue" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Security Console</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                </div>
              </div>

              {/* Logs display */}
              <div className="flex-1 overflow-y-auto my-3 text-[11px] text-gray-300 space-y-2 no-scrollbar leading-relaxed">
                {logs.map((log, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-gaming-purple select-none">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
                {scanStatus === 'scanning' && (
                  <div className="flex gap-2 text-gaming-blue animate-pulse">
                    <span className="text-gaming-purple select-none">&gt;</span>
                    <span>Analyzing processes...</span>
                  </div>
                )}
              </div>

              {/* Bottom stats bar */}
              <div className="flex justify-between items-center pt-3 border-t border-white/5 text-[9px] text-gray-500 shrink-0 uppercase font-semibold">
                <span>Driver Version: 1.8.4</span>
                <span className="flex items-center gap-1">
                  <Activity size={10} className="text-emerald-400" />
                  <span>Scanner Connected</span>
                </span>
              </div>
            </div>

          </div>

          {/* Security Architecture Points (Right Column - 5cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-panel p-6 rounded-2xl border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gaming-purple/10 to-transparent pointer-events-none" />
              <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-4 border-l-2 border-gaming-purple pl-2.5">
                Security Architecture
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gaming-purple/10 border border-gaming-purple/20 flex items-center justify-center shrink-0 text-gaming-purple">
                    <Cpu size={14} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider">Ring-0 Kernel Integrity</h5>
                    <p className="text-[11px] text-gray-400 leading-relaxed mt-0.5">
                      Monitors kernel memory spaces to prevent high-level driver-based visual wallhacks and aimbots.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gaming-blue/10 border border-gaming-blue/20 flex items-center justify-center shrink-0 text-gaming-blue">
                    <Server size={14} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider">Server-side telemetry</h5>
                    <p className="text-[11px] text-gray-400 leading-relaxed mt-0.5">
                      Analyzes click vectors, recoil patterns, and input timings to identify hardware scripting and macros.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gaming-neon/10 border border-gaming-neon/20 flex items-center justify-center shrink-0 text-gaming-neon">
                    <Shield size={14} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider">Zero Privacy Footprint</h5>
                    <p className="text-[11px] text-gray-400 leading-relaxed mt-0.5">
                      Scans only target game folders and processes. We collect zero data from system documents, photos, or browser caches.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Penalty Ladder */}
        <div className="text-left mb-10">
          <div className="mb-6 flex items-center gap-2">
            <Lock size={18} className="text-gaming-purple" />
            <h3 className="text-lg font-bold text-white uppercase tracking-wide border-l-2 border-gaming-purple pl-2.5">
              Infraction Penalty Ladder
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-xl border-white/5 hover:border-yellow-500/30 transition-all duration-300">
              <span className="text-[10px] text-yellow-500 font-bold uppercase tracking-wider">Tier 01</span>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mt-1 mb-2">Minor Infraction</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Intentional match delays, minor lobby toxic chat logs, or software launch delays.
              </p>
              <div className="text-xs font-bold text-yellow-400 mt-4 uppercase">
                Penalty: Warning / Point Loss
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border-white/5 hover:border-orange-500/30 transition-all duration-300">
              <span className="text-[10px] text-orange-500 font-bold uppercase tracking-wider">Tier 02</span>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mt-1 mb-2">Griefing & AFK</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Intentional feeding, teammate tracking leakage, and consecutive tournament match forfeitures.
              </p>
              <div className="text-xs font-bold text-orange-400 mt-4 uppercase">
                Penalty: 7-Day to 30-Day Platform Ban
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border-white/5 hover:border-red-500/30 transition-all duration-300">
              <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">Tier 03</span>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mt-1 mb-2">System Hacking</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Active memory hacking, visual overlays, smurfing, and account-sharing to win prize money.
              </p>
              <div className="text-xs font-bold text-red-400 mt-4 uppercase">
                Penalty: 2-Year Platform HWID Ban
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AntiCheat;
