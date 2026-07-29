import React from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, Radio, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';

export const Hero = ({ onOpenAuth, onRegisterTournament }) => {
  const { content } = useSiteContent();
  const { hero, stats } = content;

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-8 pb-16 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 opacity-45"
        style={{ backgroundImage: hero.backgroundImage ? `url(${hero.backgroundImage})` : 'none' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gaming-bg via-gaming-bg/80 to-transparent z-0" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gaming-purple/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-gaming-blue/15 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-6 rounded-full bg-gaming-purple/10 border border-gaming-purple/30 text-gaming-neon font-bold text-[10px] sm:text-xs tracking-widest uppercase">
            <ShieldCheck size={14} />
            <span>Official Tournament Organizer & Media Brand</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight font-gaming mb-6 uppercase">
            {hero.line1} <br />
            {hero.line2} <br />
            <span className="bg-gradient-to-r from-gaming-purple to-gaming-blue bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(124,58,237,0.3)]">
              {hero.line3}
            </span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mb-8 font-light leading-relaxed">
            {hero.subtext}
          </p>

          <div className="flex flex-wrap gap-4 mb-10 w-full sm:w-auto">
            <button
              onClick={() => document.getElementById('tournaments')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gaming-purple to-gaming-neon hover:brightness-110 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all duration-300 shadow-[0_4px_25px_rgba(124,58,237,0.4)] cursor-pointer"
            >
              <Trophy size={16} />
              <span>{hero.ctaPrimary}</span>
            </button>
            <button
              onClick={() => document.getElementById('matches')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-8 py-4 border border-white/10 hover:border-gaming-blue/50 rounded-xl font-bold text-sm text-gray-300 hover:text-white transition-all duration-300 glass-panel cursor-pointer"
            >
              <Radio size={16} className="text-gaming-blue" />
              <span>{hero.ctaSecondary}</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full glass-panel p-5 rounded-2xl border border-white/5 shadow-2xl">
            {stats.map((stat, i) => (
              <div key={i} className={`flex flex-col ${i < stats.length - 1 ? 'border-r border-white/5' : ''}`}>
                <span className="flex items-center gap-1.5 text-lg sm:text-xl font-extrabold text-white">
                  {i % 2 === 0 ? <Users size={16} className="text-gaming-purple" /> : <Trophy size={16} className="text-gaming-blue" />}
                  {stat.value}
                </span>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Highlight Card */}
        <motion.div
          className="lg:col-span-5 flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="w-full max-w-sm glass-panel p-5 rounded-3xl border border-white/10 shadow-2xl relative group overflow-hidden">
            <span className="absolute top-4 left-4 bg-gaming-purple/20 text-gaming-neon border border-gaming-purple/30 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase">
              {hero.highlightCard.badge}
            </span>

            <div className="h-48 w-full rounded-2xl overflow-hidden mt-6 relative bg-gaming-purple/10">
              {hero.backgroundImage && (
                <img
                  src={hero.backgroundImage}
                  alt="Tournament"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1127] to-transparent opacity-60" />
            </div>

            <div className="mt-4 text-left">
              <h3 className="text-xl font-bold font-gaming text-white">{hero.highlightCard.title}</h3>
              <div className="flex items-center gap-4 mt-2.5 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Users size={12} className="text-gaming-purple" />
                  <span>{hero.highlightCard.format}</span>
                </div>
                <span>•</span>
                <span>{hero.highlightCard.mode}</span>
                <span>•</span>
                <span className="text-gaming-blue font-bold">{hero.highlightCard.prize}</span>
              </div>
              <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-gray-300 bg-white/5 py-2 px-3 rounded-lg border border-white/5">
                <span className="w-2 h-2 rounded-full bg-gaming-blue animate-ping" />
                <span>Schedule: {hero.highlightCard.schedule}</span>
              </div>
              <button
                onClick={() => onRegisterTournament({ id: 1, name: hero.highlightCard.title, game: 'Valorant' })}
                className="w-full mt-6 py-4 flex items-center justify-center gap-2 bg-gaming-purple hover:bg-gaming-purple/95 text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl transition-all duration-300 shadow-[0_4px_20px_rgba(124,58,237,0.3)] cursor-pointer"
              >
                <span>{hero.highlightCard.registerBtnText}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
