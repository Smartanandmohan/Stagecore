import React from 'react';
import {
  Trophy,
  Users,
  Target,
  Sparkles,
  Zap,
  ShieldCheck,
  Star,
  Activity
} from 'lucide-react';

export const About = () => {
  const stats = [
    { label: 'Active Tournaments', value: '150+', icon: Trophy },
    { label: 'Registered Players', value: '25,000+', icon: Users },
    { label: 'Global Servers', value: '24/7', icon: Activity },
    { label: 'Fair Play Rating', value: '100%', icon: ShieldCheck }
  ];

  const values = [
    {
      title: 'Competitive Integrity',
      desc: 'We are committed to providing a secure, hack-free platform with transparent tournament brackets and advanced anti-cheat systems.',
      icon: ShieldCheck,
      color: 'text-gaming-blue bg-gaming-blue/15 border-gaming-blue/20'
    },
    {
      title: 'Community First',
      desc: 'We connect esports competitors, streamers, and enthusiasts, hosting discussions, moderator actions, and player-driven tournaments.',
      icon: Users,
      color: 'text-gaming-purple bg-gaming-purple/15 border-gaming-purple/20'
    },
    {
      title: 'Peak Performance',
      desc: 'We run dedicated gaming servers and update score systems in real-time, letting you focus entirely on your gameplay.',
      icon: Zap,
      color: 'text-gaming-purple bg-gaming-purple/15 border-gaming-purple/20'
    }
  ];

  const team = [
    { name: 'Admin_Vanguard', role: 'Chief Executive Officer', handle: 'vanguard#1111', color: 'from-gaming-purple/20 to-gaming-blue/20' },
    { name: 'Mod_Nexus', role: 'Head of Community', handle: 'nexus#2222', color: 'from-gaming-blue/20 to-gaming-purple/20' },
    { name: 'SlayerMod_K', role: 'Lead Architect & Anti-Cheat Lead', handle: 'slayermod#9000', color: 'from-gaming-purple/25 to-red-500/10' }
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-gray-200 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-gaming-purple/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-gaming-blue/10 rounded-full blur-[120px] -z-10" />

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center mb-16 relative z-10">
        <span className="text-gaming-blue font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 mb-3">
          <Star size={14} className="text-gaming-blue animate-spin-slow" />
          The Ultimate Esports Core
        </span>
        <h1 className="text-4xl sm:text-6xl font-black font-gaming text-white uppercase tracking-tight mb-6">
          Powering the Next Gen of <span className="bg-gradient-to-r from-gaming-purple to-gaming-blue bg-clip-text text-transparent">Competitive Gaming</span>
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          StageCore is a premium tournament management platform designed by players, for players. We provide professional grade bracket structures, live match scoring telemetry, and automatic hardware security verification to make competing in gaming tournaments fair, exciting, and accessible to everyone.
        </p>
      </div>

      {/* Platform Stats */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 relative z-10">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
              <div className="p-3 bg-white/5 text-gaming-blue rounded-xl mb-3 border border-white/10">
                <Icon size={20} />
              </div>
              <span className="text-2xl sm:text-3xl font-black font-gaming text-white tracking-tight">{stat.value}</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">{stat.label}</span>
            </div>
          );
        })}
      </div>

      {/* Core Values */}
      <div className="max-w-5xl mx-auto mb-20 relative z-10">
        <div className="text-center mb-12">
          <span className="text-gaming-purple font-extrabold text-xs uppercase tracking-widest">Our Ideology</span>
          <h2 className="text-3xl font-black font-gaming text-white uppercase mt-1">Core Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, i) => {
            const Icon = val.icon;
            return (
              <div key={i} className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col items-start text-left h-full">
                <div className={`p-3 rounded-xl mb-4 border ${val.color}`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-extrabold text-sm text-white uppercase tracking-wider font-gaming mb-2">{val.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Platform History / Story */}
      <div className="max-w-5xl mx-auto mb-20 relative z-10">
        <div className="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gaming-purple/10 to-gaming-blue/10 rounded-bl-full filter blur-xl opacity-40 pointer-events-none" />
          <div className="max-w-3xl">
            <span className="text-gaming-blue font-extrabold text-xs uppercase tracking-widest flex items-center gap-1 mb-2">
              <Target size={14} /> Our Journey
            </span>
            <h2 className="text-2xl font-black font-gaming text-white uppercase mb-4">How StageCore Began</h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Founded in 2024, StageCore was created to solve the persistent issues in community esports: unverified smurfs, chaotic bracket communications over random Discord channels, and slow match payout disbursements.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              We designed StageCore to unite tournament creation, real-time live telemetry reporting, and automatic anti-cheat logging under a single premium dashboard. Today, StageCore handles thousands of daily competitive matches across Valorant, BGMI, and CS2, maintaining the highest levels of competitive integrity.
            </p>
          </div>
        </div>
      </div>

      {/* Team Showcase */}
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <div className="mb-12">
          <span className="text-gaming-blue font-extrabold text-xs uppercase tracking-widest">The Vanguard</span>
          <h2 className="text-3xl font-black font-gaming text-white uppercase mt-1">Founding Roster</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          {team.map((member, i) => (
            <div key={i} className="glass-panel rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between group hover:border-gaming-blue/35 transition-colors">
              <div className={`h-24 bg-gradient-to-tr ${member.color} relative`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute -bottom-6 left-6 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm text-white shadow-lg backdrop-blur-md">
                  {member.name.charAt(0)}
                </div>
              </div>
              <div className="p-6 pt-8 flex flex-col gap-1">
                <span className="text-xs text-gray-400 font-extrabold uppercase font-gaming">{member.role}</span>
                <h4 className="text-base font-black font-gaming text-white uppercase leading-snug">{member.name}</h4>
                <span className="text-[10px] text-gaming-blue font-mono mt-1 font-semibold">{member.handle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default About;
