import React, { useState } from 'react';
import { HelpCircle, Plus, Send, RefreshCw, AlertCircle, FileText, CheckCircle, Clock, ChevronLeft } from 'lucide-react';

export const SupportView = () => {
  const initialTickets = [
    {
      id: 'SC-8492',
      subject: 'Tournament Prize Payout Verification',
      category: 'Wallet & Payouts',
      priority: 'High',
      status: 'RESOLVED',
      date: '28 May 2026',
      description: 'Requesting confirmation for the ₹1,000 payout for StageCore Valorant Cup #12.',
      replies: [
        {
          sender: 'StageCore Support',
          text: 'Hello AnandYT! Your payout has been verified and credited directly to your StageCore wallet. You can withdraw via UPI anytime.',
          time: '02:30 PM',
          isSelf: false
        }
      ]
    },
    {
      id: 'SC-7104',
      subject: 'Lobby Invite Delay for Match #14',
      category: 'Tournament Issue',
      priority: 'Medium',
      status: 'IN PROGRESS',
      date: '27 May 2026',
      description: 'Opposing team room code was delayed by 5 minutes before map veto.',
      replies: [
        {
          sender: 'Marshal_Alex',
          text: 'We have issued a warning to the opposing captain and adjusted the lobby timer accordingly.',
          time: '06:15 PM',
          isSelf: false
        }
      ]
    }
  ];

  const [tickets, setTickets] = useState(() => {
    try {
      const saved = localStorage.getItem('support_tickets');
      return saved ? JSON.parse(saved) : initialTickets;
    } catch (e) {
      console.error('Error parsing support tickets from localStorage:', e);
      return initialTickets;
    }
  });

  const [activeTicketId, setActiveTicketId] = useState(tickets[0]?.id || null);
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileActiveView, setMobileActiveView] = useState('list'); // 'list' | 'detail'

  // Form states
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Tournament Issue');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');

  // Conversation text states
  const [replyText, setReplyText] = useState('');

  const activeTicket = tickets.find(t => t.id === activeTicketId);

  const saveTickets = (updated) => {
    setTickets(updated);
    localStorage.setItem('support_tickets', JSON.stringify(updated));
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    const ticketId = `SC-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket = {
      id: ticketId,
      subject,
      category,
      priority,
      status: 'OPEN',
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      description,
      replies: []
    };

    const updated = [newTicket, ...tickets];
    saveTickets(updated);
    setActiveTicketId(ticketId);
    setMobileActiveView('detail');

    // Reset fields
    setSubject('');
    setDescription('');
    setModalOpen(false);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeTicketId) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userReply = {
      sender: 'AnandYT',
      text: replyText,
      time: timestamp,
      isSelf: true
    };

    const updated = tickets.map(ticket => {
      if (ticket.id === activeTicketId) {
        return {
          ...ticket,
          replies: [...ticket.replies, userReply]
        };
      }
      return ticket;
    });

    saveTickets(updated);
    setReplyText('');

    // Trigger mock administrator auto reply after a small delay
    setTimeout(() => {
      const adminReply = {
        sender: 'Admin_Sarah',
        text: 'Thank you for reaching out. We have logged your response and forwarded it to our active match marshals. Please stand by.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: false
      };

      const finalUpdated = updated.map(t => {
        if (t.id === activeTicketId) {
          return {
            ...t,
            replies: [...t.replies, adminReply]
          };
        }
        return t;
      });
      saveTickets(finalUpdated);
    }, 1500);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'OPEN':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'IN_PROGRESS':
        return 'text-gaming-blue bg-gaming-blue/10 border-gaming-blue/20';
      case 'RESOLVED':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      default:
        return 'text-gray-400 bg-white/5 border-white/10';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'text-red-400 border-red-500/20 bg-red-500/5';
      case 'High':
        return 'text-amber-500 border-amber-500/20 bg-amber-500/5';
      case 'Medium':
        return 'text-gaming-blue border-gaming-blue/20 bg-gaming-blue/5';
      default:
        return 'text-gray-400 border-white/10 bg-white/3';
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 text-left animate-fadeIn relative pb-4">
      
      {/* Title Header */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
            <HelpCircle size={18} className="text-gaming-purple" />
            Support Helpdesk
          </h2>
          <span className="text-[10px] text-gray-400 font-bold font-mono block mt-1">
            Resolve tournament disputes, wallet payouts, and general game queries.
          </span>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-gaming-purple hover:bg-gaming-purple/90 border border-gaming-purple/20 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-gaming-purple/20"
        >
          <Plus size={13} />
          Create Support Ticket
        </button>
      </div>

      {/* Main Ticket Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Left Ticket List Column */}
        <div className={`glass-panel border border-white/5 bg-[#03050f]/60 rounded-2xl flex-col overflow-hidden ${mobileActiveView === 'list' ? 'flex' : 'hidden lg:flex'}`}>
          <div className="p-4 border-b border-white/5 bg-[#03050f]/30">
            <h3 className="text-[10px] font-black text-white uppercase tracking-wider">Your Active Cases</h3>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar p-2 space-y-1.5">
            {tickets.length === 0 ? (
              <div className="text-center py-10 text-xs text-gray-500 italic">No tickets generated yet.</div>
            ) : (
              tickets.map(t => {
                const isActive = t.id === activeTicketId;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveTicketId(t.id);
                      setMobileActiveView('detail');
                    }}
                    className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer relative ${
                      isActive 
                        ? 'border-gaming-purple bg-gaming-purple/10' 
                        : 'border-white/5 hover:bg-white/3 bg-[#050816]/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-gaming-blue font-bold font-mono">{t.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${getStatusBadge(t.status)}`}>
                        {t.status}
                      </span>
                    </div>

                    <h4 className="text-xs font-extrabold text-white mt-1.5 truncate uppercase tracking-wide">
                      {t.subject}
                    </h4>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5 text-[9px] text-gray-500 font-semibold">
                      <span>{t.category}</span>
                      <span>{t.date}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Chat Dialogue Panel */}
        <div className={`lg:col-span-2 glass-panel border border-white/5 rounded-2xl overflow-hidden flex-col bg-[#050816]/20 ${mobileActiveView === 'detail' ? 'flex' : 'hidden lg:flex'}`}>
          
          {activeTicket ? (
            <div className="flex flex-col flex-1">
              
              {/* Header metadata summary */}
              <div className="p-4 border-b border-white/5 bg-[#03050f]/30">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    {/* Back button on mobile */}
                    <button
                      type="button"
                      onClick={() => setMobileActiveView('list')}
                      className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white bg-white/3 border border-white/5 hover:bg-white/5 transition-colors shrink-0 cursor-pointer mr-1"
                      title="Back to Tickets"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <span className="text-[10px] text-gaming-blue font-bold font-mono">{activeTicket.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${getPriorityBadge(activeTicket.priority)}`}>
                      {activeTicket.priority} Priority
                    </span>
                  </div>
                  <span className="text-[9px] text-gray-500 font-bold">{activeTicket.date}</span>
                </div>
                <h3 className="text-xs font-black text-white uppercase tracking-wider">{activeTicket.subject}</h3>
                <p className="text-[10px] text-gray-400 leading-normal mt-2 p-3 bg-[#03050f]/60 rounded-xl border border-white/5">
                  {activeTicket.description}
                </p>
              </div>

              {/* Chat Message dialog container */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 no-scrollbar">
                {activeTicket.replies.length === 0 ? (
                  <div className="text-center py-6 text-[10px] text-gray-500 italic">No messages sent in this case yet. Send a query below to start support help.</div>
                ) : (
                  activeTicket.replies.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex flex-col max-w-[70%] ${msg.isSelf ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                    >
                      <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wider mb-1 block">
                        {msg.sender}
                      </span>
                      <div className={`p-3 rounded-2xl text-[11px] font-semibold leading-relaxed shadow-sm ${
                        msg.isSelf
                          ? 'bg-gaming-purple text-white rounded-tr-none'
                          : 'bg-white/5 border border-white/5 text-gray-200 rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[8px] text-gray-600 font-mono mt-1">{msg.time}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="p-4 border-t border-white/5 bg-[#03050f]/40 flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Enter message to support representative..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 bg-[#050816]/70 border border-white/10 rounded-xl px-4 py-2.5 text-[11px] text-white focus:outline-none focus:border-gaming-purple/40 placeholder-gray-600 font-semibold"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-gaming-purple hover:bg-gaming-purple/90 text-white text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-gaming-purple/20 flex items-center gap-1.5"
                >
                  <Send size={12} />
                  Send
                </button>
              </form>

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 gap-3">
              <div className="w-12 h-12 bg-white/3 border border-white/5 rounded-2xl flex items-center justify-center text-gray-500">
                <FileText size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">No case selected</h4>
                <p className="text-[10px] text-gray-500 leading-normal max-w-xs mx-auto mt-1">Please select an existing case from the left panel, or create a new support ticket to begin.</p>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* CREATE TICKET MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative glass-panel bg-[#050816] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl animate-scaleUp text-left">
            
            <h3 className="text-xs font-black text-white uppercase tracking-wider mb-4 pb-3 border-b border-white/5">Create Support Case</h3>
            
            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Subject / Issue Summary</label>
                <input
                  type="text"
                  placeholder="Summarize your issue..."
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-2.5 text-[11px] text-white focus:outline-none focus:border-gaming-purple/40 placeholder-gray-600 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#050816] border border-white/10 rounded-xl px-3 py-2 text-[11px] text-white focus:outline-none focus:border-gaming-purple/40 font-semibold"
                  >
                    <option value="Tournament Issue">Tournament Issue</option>
                    <option value="Wallet & Payouts">Wallet & Payouts</option>
                    <option value="Account Access">Account Access</option>
                    <option value="Report Bug">Report Bug</option>
                    <option value="General Query">General Query</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-[#050816] border border-white/10 rounded-xl px-3 py-2 text-[11px] text-white focus:outline-none focus:border-gaming-purple/40 font-semibold"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Details / Description</label>
                <textarea
                  rows={4}
                  placeholder="Provide precise details to help resolve your issue quickly..."
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-2.5 text-[11px] text-white focus:outline-none focus:border-gaming-purple/40 placeholder-gray-600 font-semibold leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-white/5 justify-end">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 bg-white/3 hover:bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase text-gray-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-gaming-purple hover:bg-gaming-purple/90 border border-gaming-purple/20 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer shadow-md shadow-gaming-purple/20"
                >
                  Submit Ticket
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
