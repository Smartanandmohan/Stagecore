import React, { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  MapPin,
  Phone,
  MessageSquare,
  Globe,
  Camera,
  Video,
  Sparkles
} from 'lucide-react';

export const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setToastMessage('Your message was successfully routed to support agents!');
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
      
      setTimeout(() => setToastMessage(''), 4500);
    }, 1200);
  };

  const contactCards = [
    {
      title: 'Active Support Desk',
      desc: 'Got a bug to report or ticket status query?',
      info: 'support@stagecore.gg',
      icon: MessageSquare,
      color: 'text-gaming-blue bg-gaming-blue/15 border-gaming-blue/20'
    },
    {
      title: 'Business & Partnerships',
      desc: 'Interested in sponsorship opportunities?',
      info: 'sponsors@stagecore.gg',
      icon: Sparkles,
      color: 'text-gaming-purple bg-gaming-purple/15 border-gaming-purple/20'
    },
    {
      title: 'Press & Media Relations',
      desc: 'Request official logos or event coverage credentials.',
      info: 'press@stagecore.gg',
      icon: Globe,
      color: 'text-gaming-purple bg-gaming-purple/15 border-gaming-purple/20'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-gray-200 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gaming-blue/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gaming-purple/10 rounded-full blur-3xl -z-10" />

      {/* Page Header */}
      <div className="max-w-6xl mx-auto text-center mb-16 relative z-10">
        <span className="text-gaming-purple font-extrabold text-xs uppercase tracking-widest">Connect with Us</span>
        <h1 className="text-4xl sm:text-5xl font-black font-gaming text-white uppercase mt-1 tracking-tight">
          Get in Touch
        </h1>
        <p className="text-gray-400 mt-2 text-sm max-w-xl mx-auto leading-relaxed">
          Have an ongoing issue, sponsorship proposal, or question? Send a message to our support staff and we will respond within 24 hours.
        </p>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Left Side: Contact Cards & Office Info */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {contactCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className="glass-panel p-5 rounded-2xl border border-white/5 flex gap-4 items-start">
                <div className={`p-3 rounded-xl border shrink-0 ${card.color}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-white uppercase tracking-wider font-gaming mb-1">
                    {card.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-2">{card.desc}</p>
                  <a href={`mailto:${card.info}`} className="text-xs text-gaming-blue font-mono font-bold hover:underline">
                    {card.info}
                  </a>
                </div>
              </div>
            );
          })}

          {/* Social Handles */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 text-sm text-gray-400">
            <h4 className="font-extrabold text-xs text-white uppercase tracking-wider font-gaming mb-4">
              Official Channels
            </h4>
            <div className="flex items-center gap-4">
              <a href="#" className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-gaming-purple/35 hover:text-white transition-all text-gray-400 cursor-pointer">
                <Globe size={16} />
              </a>
              <a href="#" className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-gaming-purple/35 hover:text-white transition-all text-gray-400 cursor-pointer">
                <Camera size={16} />
              </a>
              <a href="#" className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-gaming-purple/35 hover:text-white transition-all text-gray-400 cursor-pointer">
                <Video size={16} />
              </a>
            </div>
          </div>
          
          {/* Office Location */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 text-xs text-gray-400 flex flex-col gap-3">
            <h4 className="font-extrabold text-xs text-white uppercase tracking-wider font-gaming">
              Corporate Headquarters
            </h4>
            <div className="flex items-start gap-2.5">
              <MapPin size={14} className="text-gaming-blue shrink-0 mt-0.5" />
              <span>404 Cyber City, Level 5, Esports Tower, Bangalore, India</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Phone size={14} className="text-gaming-purple shrink-0 mt-0.5" />
              <span>+91 80 4921-2281</span>
            </div>
          </div>

        </div>

        {/* Right Side: Interactive Contact Form */}
        <div className="lg:col-span-2">
          <div className="glass-panel p-8 rounded-2xl border border-white/5 relative overflow-hidden h-full">
            
            {/* Form Success Toast */}
            {toastMessage && (
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-4 py-3 rounded-xl bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-extrabold uppercase tracking-wide shadow-[0_0_20px_rgba(34,197,94,0.2)] animate-bounce">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>{toastMessage}</span>
              </div>
            )}

            <h3 className="text-lg font-bold font-gaming text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <Mail size={18} className="text-gaming-purple" />
              <span>Direct Messaging Desk</span>
            </h3>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              Use this portal to contact our operational crew. For in-game behavior issues, please submit report forms on the Community panel.
            </p>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Slayer Gamer"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-gaming-purple/50 text-white text-xs outline-none transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. slayer@gmail.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-gaming-purple/50 text-white text-xs outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Subject Department</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-gaming-purple/50 text-white text-xs outline-none transition-all duration-300"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Sponsorship">Sponsorship & Brand Relations</option>
                  <option value="Referees / Brackets">Referees & Bracket Issues</option>
                  <option value="Account Support">Account Security / Verification</option>
                  <option value="Legal Matters">Legal / Privacy Center</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Message Body</label>
                <textarea
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Draft your query with order IDs or match screenshots links if applicable..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-gaming-purple/50 text-white text-xs outline-none transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3.5 bg-gaming-purple hover:bg-gaming-purple/90 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(124,58,237,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isSubmitting ? 'Submitting Form...' : 'Send Message'}</span>
                <Send size={12} />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
