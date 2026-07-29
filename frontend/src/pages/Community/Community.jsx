import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  Users, 
  Terminal, 
  MessageSquare, 
  AlertTriangle, 
  Check, 
  X, 
  Eye, 
  Send,
  Flag,
  FileCheck,
  UserX,
  FileText
} from 'lucide-react';

export const Community = () => {
  const [activeTab, setActiveTab] = useState('public'); // public | workspace
  const [toast, setToast] = useState({ show: false, message: '' });

  // Report form states
  const [reportForm, setReportForm] = useState({
    reportedPlayer: '',
    game: 'Valorant',
    matchId: '',
    violationType: 'Cheating',
    description: '',
    evidence: ''
  });

  // Mock workspace reports (active state)
  const [reports, setReports] = useState([
    { id: 'REP-7402', reported: 'AimBotter99', reporter: 'FragKing', game: 'Valorant', type: 'Cheating', status: 'Pending', time: '10m ago' },
    { id: 'REP-7399', reported: 'ToxicSlayer', reporter: 'NoobMax', game: 'BGMI', type: 'Toxicity', status: 'Pending', time: '25m ago' },
    { id: 'REP-7388', reported: 'AFK_Farmer', reporter: 'TeamPlayer', game: 'CS2', type: 'Griefing / AFK', status: 'Pending', time: '1h ago' }
  ]);

  // Mock workspace chat logs
  const [chatLogs, setChatLogs] = useState([
    { id: 'LOG-1', player: 'ToxicSlayer', game: 'BGMI', message: 'Uninstall the game u trash scrub, hope u die', flagged: true, timestamp: '13:12' },
    { id: 'LOG-2', player: 'AimBotter99', game: 'Valorant', message: 'lol look at my 360 hs cursor speed', flagged: true, timestamp: '13:08' },
    { id: 'LOG-3', player: 'LegitPlayer', game: 'CS2', message: 'Nice flash, let\'s push A site', flagged: false, timestamp: '13:05' }
  ]);

  // Mock workspace appeals
  const [appeals, setAppeals] = useState([
    { id: 'APP-501', player: 'LaggyGamer', reason: 'I disconnected because my power cut out, I was not rage quitting.', status: 'Pending' },
    { id: 'APP-499', player: 'NoRecoilPro', reason: 'My mouse macro is just for double clicks, not anti-recoil scripts. Please unban.', status: 'Pending' }
  ]);

  // Report submit handler
  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!reportForm.reportedPlayer || !reportForm.description) return;

    // Trigger success toast
    setToast({
      show: true,
      message: `Report for player '${reportForm.reportedPlayer}' submitted! Moderator review pending.`
    });

    // Reset report form
    setReportForm({
      reportedPlayer: '',
      game: 'Valorant',
      matchId: '',
      violationType: 'Cheating',
      description: '',
      evidence: ''
    });
  };

  // Moderator actions on reports
  const handleReportAction = (reportId, action) => {
    setReports(prev => prev.map(rep => {
      if (rep.id === reportId) {
        return { ...rep, status: action === 'ban' ? 'Banned' : action === 'warn' ? 'Warned' : 'Dismissed' };
      }
      return rep;
    }));
  };

  // Moderator actions on appeals
  const handleAppealAction = (appealId, status) => {
    setAppeals(prev => prev.map(app => {
      if (app.id === appealId) {
        return { ...app, status: status === 'accept' ? 'Approved' : 'Denied' };
      }
      return app;
    }));
  };

  // Hide toast after 5s
  React.useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  return (
    <div className="relative min-h-screen bg-gaming-bg text-gray-200 py-20 px-4 overflow-hidden font-gaming animate-fadeIn">
      {/* Background visual neon glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-gaming-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-gaming-blue/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Custom Toast feedback */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 glass-panel border-l-4 border-l-gaming-purple border-white/10 p-4 rounded-xl shadow-2xl flex items-center gap-3.5 max-w-sm"
          >
            <div className="p-1.5 rounded-lg bg-gaming-purple/10 border border-gaming-purple/30 text-gaming-purple">
              <Check size={18} />
            </div>
            <div className="flex-1 text-left">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Report Received</h5>
              <p className="text-[11px] text-gray-300 leading-normal mt-0.5">{toast.message}</p>
            </div>
            <button 
              onClick={() => setToast({ show: false, message: '' })}
              className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/5 transition-colors"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gaming-purple text-xs font-bold uppercase tracking-widest mb-4"
          >
            <ShieldAlert size={12} className="text-gaming-purple" />
            <span>Integrity Division</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
            COMMUNITY & <span className="bg-gradient-to-r from-gaming-purple via-gaming-neon to-gaming-blue bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(124,58,237,0.35)]">MODERATION</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            Report rule violations, check our behavioral code, or log in to the Moderator Workspace to evaluate pending disputes.
          </p>

          {/* Toggle Tab Buttons */}
          <div className="flex gap-4 justify-center mt-10">
            <button
              onClick={() => setActiveTab('public')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                activeTab === 'public'
                  ? 'bg-gradient-to-r from-gaming-purple to-gaming-blue border-transparent text-white shadow-lg'
                  : 'bg-white/5 border-white/5 hover:border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              <Users size={14} />
              <span>Public Guidelines & Reports</span>
            </button>
            <button
              onClick={() => setActiveTab('workspace')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                activeTab === 'workspace'
                  ? 'bg-gradient-to-r from-gaming-purple to-gaming-blue border-transparent text-white shadow-lg border-l-gaming-purple'
                  : 'bg-white/5 border-white/5 hover:border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              <Terminal size={14} />
              <span>Moderator Workspace</span>
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          {activeTab === 'public' ? (
            <motion.div
              key="public-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left"
            >
              
              {/* Guidelines Column */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="glass-panel p-6 rounded-2xl border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gaming-purple/10 to-transparent pointer-events-none" />
                  <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-4 border-l-2 border-gaming-purple pl-2.5">
                    Player Code of Conduct
                  </h3>
                  <div className="space-y-4 text-xs text-gray-300 leading-relaxed">
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-wider mb-1">01. Good Sportsmanship</h4>
                      <p className="text-gray-400">Respect opponents, teammates, and referees. Toxic remarks, slurs, or chat abuse will yield lobby disqualification.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-wider mb-1">02. Cheat Integrity</h4>
                      <p className="text-gray-400">Any active recoil macro, visual overlays, client hacks, or smurfing resets your standings and triggers a 2-year platform hardware ban.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-wider mb-1">03. Match Manipulation</h4>
                      <p className="text-gray-400">Match-fixing, queue-sniping, or intentional feeding to alter outcomes results in permanent account termination.</p>
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gaming-blue/10 to-transparent pointer-events-none" />
                  <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-3 border-l-2 border-gaming-blue pl-2.5">
                    Behavior Penalties
                  </h3>
                  <ul className="space-y-2 text-xs text-gray-400">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0" />
                      <span>Warning: Minor toxic logs or lobby delay.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                      <span>1-Week Ban: AFK patterns or griefing behavior.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                      <span>Permanent Ban: Hacking or tournament fraud.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Player Report Form */}
              <div className="lg:col-span-7">
                <form onSubmit={handleReportSubmit} className="glass-panel p-8 rounded-3xl border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gaming-purple/10 to-transparent pointer-events-none" />
                  <h3 className="text-xl font-extrabold text-white uppercase tracking-wide mb-6">
                    File a Violator Report
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Reported Player Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Offending Player Username / ID
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. AimBotter99"
                        value={reportForm.reportedPlayer}
                        onChange={(e) => setReportForm(prev => ({ ...prev, reportedPlayer: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-[#090D22]/60 border border-white/10 text-white focus:outline-none focus:border-gaming-purple text-sm"
                      />
                    </div>

                    {/* Game Select */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Esports Title
                      </label>
                      <select
                        value={reportForm.game}
                        onChange={(e) => setReportForm(prev => ({ ...prev, game: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-[#090D22]/60 border border-white/10 text-white focus:outline-none focus:border-gaming-purple text-sm text-gray-300"
                      >
                        <option>Valorant</option>
                        <option>BGMI</option>
                        <option>CS2</option>
                        <option>Free Fire</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Match ID */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Match / Lobby ID (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. VAL-20842"
                        value={reportForm.matchId}
                        onChange={(e) => setReportForm(prev => ({ ...prev, matchId: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-[#090D22]/60 border border-white/10 text-white focus:outline-none focus:border-gaming-blue text-sm"
                      />
                    </div>

                    {/* Violation Type */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Violation Category
                      </label>
                      <select
                        value={reportForm.violationType}
                        onChange={(e) => setReportForm(prev => ({ ...prev, violationType: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-[#090D22]/60 border border-white/10 text-white focus:outline-none focus:border-gaming-blue text-sm text-gray-300"
                      >
                        <option>Cheating / Hacking</option>
                        <option>Toxicity / Harassment</option>
                        <option>Griefing / AFK</option>
                        <option>Smurfing / Account Sharing</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-2 mb-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Detailed Incident Description
                    </label>
                    <textarea
                      required
                      rows="3"
                      placeholder="Please note round number, timestamps, or specific behaviors observed."
                      value={reportForm.description}
                      onChange={(e) => setReportForm(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-[#090D22]/60 border border-white/10 text-white focus:outline-none focus:border-gaming-purple text-sm resize-none"
                    />
                  </div>

                  {/* Evidence Link */}
                  <div className="flex flex-col gap-2 mb-6">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Evidence Link (e.g. YouTube Video, Imgur Screenshot)
                    </label>
                    <input
                      type="url"
                      placeholder="https://youtube.com/watch?v=..."
                      value={reportForm.evidence}
                      onChange={(e) => setReportForm(prev => ({ ...prev, evidence: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-[#090D22]/60 border border-white/10 text-white focus:outline-none focus:border-gaming-blue text-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-gaming-purple to-gaming-blue hover:from-gaming-purple/90 hover:to-gaming-blue/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md cursor-pointer"
                  >
                    Submit Player Report
                  </button>
                </form>
              </div>

            </motion.div>
          ) : (
            <motion.div
              key="workspace-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8 text-left"
            >
              {/* Row 1: Player Reports Queue */}
              <div className="glass-panel p-6 rounded-2xl border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gaming-purple/5 to-transparent pointer-events-none" />
                
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Flag size={16} className="text-gaming-purple" />
                    <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                      Active Reports Queue
                    </h3>
                  </div>
                  <span className="text-[10px] bg-gaming-purple/10 text-gaming-purple border border-gaming-purple/20 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                    {reports.filter(r => r.status === 'Pending').length} Pending Review
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-white/5 text-gray-500 font-bold uppercase tracking-wider">
                        <th className="pb-3.5 pl-2">Report ID</th>
                        <th className="pb-3.5">Reported Player</th>
                        <th className="pb-3.5">Category</th>
                        <th className="pb-3.5">Esports Title</th>
                        <th className="pb-3.5">Timestamp</th>
                        <th className="pb-3.5">Status</th>
                        <th className="pb-3.5 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {reports.map((rep) => (
                        <tr key={rep.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-4 pl-2 font-mono text-gaming-blue font-bold">{rep.id}</td>
                          <td className="py-4 font-bold text-white">{rep.reported}</td>
                          <td className="py-4 text-gray-300 font-medium">{rep.type}</td>
                          <td className="py-4 text-gray-400 font-medium">{rep.game}</td>
                          <td className="py-4 text-gray-500 font-medium">{rep.time}</td>
                          <td className="py-4">
                            <span className={`px-2 py-0.5 rounded-md font-bold uppercase text-[9px] ${
                              rep.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                              rep.status === 'Banned' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                              rep.status === 'Warned' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                              'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                            }`}>
                              {rep.status}
                            </span>
                          </td>
                          <td className="py-4 text-center">
                            {rep.status === 'Pending' ? (
                              <div className="flex justify-center gap-1.5">
                                <button
                                  onClick={() => handleReportAction(rep.id, 'ban')}
                                  title="Approve Ban"
                                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 transition-all cursor-pointer"
                                >
                                  <UserX size={13} />
                                </button>
                                <button
                                  onClick={() => handleReportAction(rep.id, 'warn')}
                                  title="Warn Player"
                                  className="p-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500 text-orange-500 hover:text-white border border-orange-500/20 transition-all cursor-pointer"
                                >
                                  <AlertTriangle size={13} />
                                </button>
                                <button
                                  onClick={() => handleReportAction(rep.id, 'dismiss')}
                                  title="Dismiss Case"
                                  className="p-1.5 rounded-lg bg-gray-500/10 hover:bg-gray-500 text-gray-400 hover:text-white border border-gray-500/20 transition-all cursor-pointer"
                                >
                                  <Check size={13} />
                                </button>
                              </div>
                            ) : (
                              <span className="text-[10px] text-gray-500 font-semibold italic">Processed</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Row 2: Chat Logs & Ban Appeals */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Flagged Chat Logs */}
                <div className="glass-panel p-6 rounded-2xl border-white/5">
                  <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/5">
                    <MessageSquare size={16} className="text-gaming-blue" />
                    <h4 className="text-md font-bold text-white uppercase tracking-wide">
                      Flagged In-Game Logs
                    </h4>
                  </div>
                  
                  <div className="space-y-3.5">
                    {chatLogs.map((log) => (
                      <div key={log.id} className="p-3 bg-[#090D22]/60 rounded-xl border border-white/5 flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-white">{log.player}</span>
                          <div className="flex gap-2 font-semibold">
                            <span className="text-gaming-blue">{log.game}</span>
                            <span className="text-gray-500">{log.timestamp}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-300 italic">"{log.message}"</p>
                        {log.flagged && (
                          <span className="text-[9px] text-red-400 font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                            <AlertTriangle size={10} />
                            <span>Toxicity Scanner Flag</span>
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Appeal Reviews */}
                <div className="glass-panel p-6 rounded-2xl border-white/5">
                  <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/5">
                    <FileText size={16} className="text-gaming-purple" />
                    <h4 className="text-md font-bold text-white uppercase tracking-wide">
                      Ban Appeal Submissions
                    </h4>
                  </div>

                  <div className="space-y-4">
                    {appeals.map((app) => (
                      <div key={app.id} className="p-4 bg-[#090D22]/60 rounded-xl border border-white/5">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-white">{app.player}</span>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                            app.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                            app.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 italic mb-3">"{app.reason}"</p>

                        {app.status === 'Pending' ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAppealAction(app.id, 'accept')}
                              className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/20 text-emerald-400 hover:text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                            >
                              Approve Appeal (Unban)
                            </button>
                            <button
                              onClick={() => handleAppealAction(app.id, 'deny')}
                              className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 border border-red-500/20 text-red-500 hover:text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                            >
                              Deny Appeal
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-gray-500 font-semibold italic">Decision Logged</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Community;
