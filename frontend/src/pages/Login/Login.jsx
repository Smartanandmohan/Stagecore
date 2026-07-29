import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  X, ShieldCheck, Sparkles, CheckCircle, ArrowRight, Camera, Video, MessageSquare, Globe
} from 'lucide-react';
import arenaBackground from '../../assets/images/arena_background.png';

export const Login = ({ isOpen, onClose }) => {
  const { demoLogin } = useAuth();
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleEnterDemo = (role = 'ROLE_USER') => {
    setLoading(true);
    setShowToast(true);
    demoLogin(role);
    setTimeout(() => {
      onClose();
      if (role === 'ROLE_ADMIN') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/dashboard';
      }
    }, 250);
  };

  const features = [
    { title: 'Own Tournaments', desc: 'We organize and manage our own official esports events.', color: 'text-gaming-purple' },
    { title: 'Media Brand', desc: 'Live streams, highlights, and content directly from StageCore.', color: 'text-gaming-blue' },
    { title: 'Community First', desc: 'Building a strong community of players, teams, and fans.', color: 'text-gaming-purple' },
    { title: 'Trust & Fair Play', desc: 'Professional production, fair competition, and secure environment.', color: 'text-gaming-blue' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gaming-bg font-gaming overflow-hidden">
      
      {/* 2-Column Split Screen Layout */}
      <div className="w-full h-full flex flex-col md:flex-row relative">
        
        {/* CLOSE BUTTON AT TOP RIGHT */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 text-gray-400 hover:text-white rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-200 cursor-pointer shadow-lg"
          title="Close Console"
        >
          <X size={20} />
        </button>

        {/* Toast Alert */}
        {showToast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gaming-purple/95 border border-gaming-purple/50 text-white font-extrabold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(124,58,237,0.6)] animate-bounce">
            <CheckCircle size={18} className="text-gaming-neon shrink-0" />
            <span>Welcome to the StageCore Interactive Demo.</span>
          </div>
        )}

        {/* LEFT SIDE */}
        <div className="hidden md:flex md:w-1/2 flex-col justify-between p-12 relative overflow-hidden text-left select-none">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-105"
            style={{ backgroundImage: `url(${arenaBackground})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#050816]/95 via-[#08021c]/90 to-[#0c051a]/80" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gaming-purple/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center bg-gradient-to-tr from-gaming-purple to-gaming-blue rounded-xl shadow-lg shadow-gaming-purple/20">
              <span className="font-black text-xl text-white tracking-tighter">S</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-base text-white tracking-wider">STAGECORE</span>
              <span className="text-[8px] text-gaming-blue font-bold tracking-widest uppercase">Esports Tournaments</span>
            </div>
          </div>

          <div className="relative z-10 max-w-lg my-auto space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl lg:text-4xl font-black uppercase text-white tracking-tight leading-tight">
                We Organize.<br />
                We Produce.<br />
                We Inspire.<br />
                <span className="bg-gradient-to-r from-gaming-purple via-gaming-neon to-gaming-blue bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(124,58,237,0.3)]">
                  We are StageCore.
                </span>
              </h2>
              <p className="text-xs text-gray-400 font-medium leading-relaxed pt-2">
                StageCore is an esports tournament organizer and media brand.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-4">
              {features.map((feat, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-gaming-purple animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[11px] text-white uppercase tracking-wider mb-0.5">
                      {feat.title}
                    </h4>
                    <p className="text-[10px] text-gray-400 leading-normal font-light">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-4 text-gray-500 text-xs font-semibold">
            <a href="#" className="hover:text-gaming-purple transition-colors cursor-pointer"><Camera size={16} /></a>
            <a href="#" className="hover:text-gaming-purple transition-colors cursor-pointer"><Video size={16} /></a>
            <a href="#" className="hover:text-gaming-purple transition-colors cursor-pointer"><MessageSquare size={16} /></a>
            <a href="#" className="hover:text-gaming-purple transition-colors cursor-pointer"><Globe size={16} /></a>
          </div>
        </div>

        {/* RIGHT SIDE: PREMIUM DEMO CARD */}
        <div className="w-full md:w-1/2 flex flex-col justify-between p-6 sm:p-12 bg-[#050816] relative overflow-y-auto text-left min-h-screen">
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-gaming-blue/5 rounded-full blur-[90px] pointer-events-none" />
          
          <div className="flex justify-end relative z-10">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/3 border border-white/5 text-[10px] font-bold text-gray-400 uppercase tracking-widest backdrop-blur-md">
              <ShieldCheck size={12} className="text-gaming-blue" />
              <span>Official Startup Competition Build</span>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto my-auto py-8 relative z-10">
            <div className="glass-panel border-gaming-purple/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-[0_0_50px_rgba(124,58,237,0.15)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gaming-purple/20 to-transparent pointer-events-none" />

              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 flex items-center justify-center bg-gaming-purple/15 border border-gaming-purple/40 rounded-2xl shadow-lg shadow-gaming-purple/20">
                  <Sparkles size={28} className="text-gaming-neon" />
                </div>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider font-gaming">
                  StageCore Demo Login
                </h3>
                <p className="text-xs text-gray-300 mt-3 font-normal leading-relaxed">
                  This is the official demonstration version of StageCore. Authentication has been intentionally disabled. Click below to access the complete platform using a pre-configured demonstration account.
                </p>
              </div>

              <div className="space-y-3 mt-8">
                <button
                  type="button"
                  onClick={() => handleEnterDemo('ROLE_USER')}
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-gaming-purple to-gaming-neon hover:brightness-110 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-[0_4px_30px_rgba(124,58,237,0.5)] flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  <span>🚀 Enter Demo</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10 text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Demo Notice
                </p>
                <p className="text-[10px] text-gray-500 mt-1 font-light">
                  No personal information is collected. All data displayed is simulated.
                </p>
              </div>

            </div>
          </div>

          <div className="text-center relative z-10 text-[10px] font-bold uppercase tracking-wider text-gray-600">
            <span>© {new Date().getFullYear()} StageCore Demo Build. All rights reserved.</span>
          </div>

        </div>

      </div>

    </div>
  );
};
