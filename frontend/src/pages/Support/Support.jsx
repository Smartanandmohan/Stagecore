import React, { useState } from 'react';
import {
  MessageSquare,
  HelpCircle,
  Trophy,
  ArrowRight,
  Send,
  CheckCircle2,
  Clock,
  ShieldAlert,
  AlertTriangle
} from 'lucide-react';

export const Support = () => {
  const [ticketCategory, setTicketCategory] = useState('Account Issue');
  const [ticketUrgency, setTicketUrgency] = useState('Medium');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDetails, setTicketDetails] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketSubject || !ticketDetails) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ticketNum = Math.floor(10000 + Math.random() * 90000);
      setToastMessage(`Ticket submitted successfully under ID #ST-${ticketNum}`);
      setTicketSubject('');
      setTicketDetails('');
      setIsSubmitting(false);

      setTimeout(() => setToastMessage(''), 4500);
    }, 1200);
  };

  const supportLinks = [
    {
      title: 'Official Rulebook',
      desc: 'Check tournament formats, rules, and player eligibility details.',
      url: '/rulebook',
      icon: Trophy,
      color: 'text-gaming-purple'
    },
    {
      title: 'Knowledge Base & FAQ',
      desc: 'Search pre-answered questions about payouts and accounts.',
      url: '/faq',
      icon: HelpCircle,
      color: 'text-gaming-blue'
    },
    {
      title: 'Anti-Cheat Center',
      desc: 'Review forbidden tool sheets or submit a ban appeal.',
      url: '/anti-cheat',
      icon: ShieldAlert,
      color: 'text-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-gray-200 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gaming-purple/5 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gaming-blue/5 rounded-full blur-3xl -z-10" />

      {/* Page Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gaming-purple/20 to-gaming-blue/20 rounded-bl-full filter blur-xl opacity-50 pointer-events-none" />
          <div className="relative z-10">
            <span className="text-gaming-blue font-extrabold text-xs uppercase tracking-widest flex items-center gap-1.5 mb-2">
              <MessageSquare size={14} className="text-gaming-blue" />
              StageCore Support Center
            </span>
            <h1 className="text-4xl font-black font-gaming text-white uppercase tracking-tight">
              Support Desk
            </h1>
            <p className="text-gray-400 mt-2 text-sm max-w-2xl">
              File troubleshooting tickets, review rules, or check common questions. Our staff is online 24/7 to resolve technical anomalies.
            </p>
          </div>
          <div className="flex items-center gap-4 relative z-10 bg-white/5 border border-white/10 p-4 rounded-2xl">
            <div className="p-3 bg-gaming-purple/20 text-gaming-purple rounded-xl border border-gaming-purple/35 shadow-[0_0_15px_rgba(124,58,237,0.25)] animate-pulse">
              <Clock size={28} />
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase font-bold">Response Speed</div>
              <div className="text-sm text-white font-extrabold font-gaming">under 4 hours</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Quick Links & Alerts */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Quick Help Portals */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-2">Self-Service Portals</span>
            {supportLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <a
                  key={i}
                  href={link.url}
                  className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-white/15 transition-all flex items-start justify-between group cursor-pointer"
                >
                  <div className="flex gap-4 items-start">
                    <div className={`p-2.5 bg-white/5 rounded-xl border border-white/10 shrink-0 ${link.color}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-white uppercase tracking-wider font-gaming mb-1 group-hover:text-gaming-purple transition-colors">
                        {link.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 leading-relaxed font-light">{link.desc}</p>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-gray-500 group-hover:text-white mt-1 transition-transform group-hover:translate-x-1 shrink-0" />
                </a>
              );
            })}
          </div>

          {/* Operational Status alert */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 text-xs text-gray-400 flex flex-col gap-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gaming-blue/5 rounded-bl-full pointer-events-none" />
            <h4 className="font-extrabold text-xs text-white uppercase tracking-wider font-gaming mb-1">
              Operational Notice
            </h4>
            <p className="leading-relaxed">
              Before submitting a ticket regarding bracket delays or score errors, please check with your match lobby's assigned referee inside the tournament chat. Referees can solve live lobby disputes faster.
            </p>
            <div className="flex items-center gap-1.5 text-gaming-blue font-bold mt-2">
              <AlertTriangle size={12} />
              <span>Direct dashboard disputes take up to 2 hours to audit.</span>
            </div>
          </div>

        </div>

        {/* Right Column: Submit Ticket Form */}
        <div className="lg:col-span-2">
          <div className="glass-panel p-8 rounded-2xl border border-white/5 relative overflow-hidden">
            
            {/* Form Success Toast */}
            {toastMessage && (
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-4 py-3 rounded-xl bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-extrabold uppercase tracking-wide shadow-[0_0_20px_rgba(34,197,94,0.2)] animate-bounce">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>{toastMessage}</span>
              </div>
            )}

            <h3 className="text-lg font-bold font-gaming text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <MessageSquare size={18} className="text-gaming-purple" />
              <span>Submit Support Ticket</span>
            </h3>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              Fill out this ticket details form to open a direct issue ticket. Our security/referee staff will begin troubleshooting shortly.
            </p>

            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Issue Category</label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-gaming-purple/50 text-white text-xs outline-none transition-all duration-300"
                  >
                    <option value="Account Issue">Account Issue / Verification</option>
                    <option value="Billing / Store">Payment & Store Entry</option>
                    <option value="Tournament Bug">Tournament Bracket Bug</option>
                    <option value="Anti-Cheat False positive">Anti-Cheat Alert / HWID</option>
                    <option value="Report Player Abuse">Player Conduct Abuse</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Urgency Severity</label>
                  <select
                    value={ticketUrgency}
                    onChange={(e) => setTicketUrgency(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-gaming-purple/50 text-white text-xs outline-none transition-all duration-300"
                  >
                    <option value="Low">Low - Suggestion / General query</option>
                    <option value="Medium">Medium - Standard account bug</option>
                    <option value="High">High - Match block / Tournament lobby crash</option>
                    <option value="Critical">Critical - Security exploit / Account compromised</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Ticket Subject Title</label>
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="e.g. Verification email not received"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-gaming-purple/50 text-white text-xs outline-none transition-all duration-300"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Problem Description & Logs</label>
                <textarea
                  required
                  rows={5}
                  value={ticketDetails}
                  onChange={(e) => setTicketDetails(e.target.value)}
                  placeholder="Provide step-by-step actions that trigger the issue, console error logs, or relevant match URLs..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-gaming-purple/50 text-white text-xs outline-none transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3.5 bg-gaming-purple hover:bg-gaming-purple/90 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(124,58,237,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isSubmitting ? 'Filing Support Ticket...' : 'File Support Ticket'}</span>
                <Send size={12} />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Support;
