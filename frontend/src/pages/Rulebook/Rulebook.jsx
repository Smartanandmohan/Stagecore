import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Book, Award, AlertTriangle, Scale, Target, Globe } from 'lucide-react';

export const Rulebook = () => {
  const [activeCategory, setActiveCategory] = useState('general');

  const ruleSections = {
    general: {
      title: 'General Guidelines',
      icon: Book,
      color: 'text-gaming-purple',
      content: [
        {
          title: 'Account Eligibility',
          text: 'Every competitor must hold a valid, registered StageCore account in good standing. The account must be linked to the player\'s verified in-game identifier (e.g. Riot ID, Steam Hex ID, Krafton Character ID). Accounts under suspension or investigated for fraud are barred from all active brackets.'
        },
        {
          title: 'Age Requirements',
          text: 'All players competing in cash-prize events must be at least 16 years of age at the time of tournament registration. Competitors under the age of 18 are required to obtain written parental/guardian consent in order to withdraw earnings from the StageCore Wallet.'
        },
        {
          title: 'Roster Lock Policy',
          text: 'Roster compositions are frozen exactly 24 hours prior to the scheduled start of a tournament. No substitution players, coaching swaps, or user tag updates are allowed after the lock deadline. Teams attempting to play with unlisted players will face immediate disqualification.'
        }
      ]
    },
    gameplay: {
      title: 'Match & Game Formats',
      icon: Target,
      color: 'text-gaming-blue',
      content: [
        {
          title: 'Check-In Window',
          text: 'Teams must check in on the official Match Portal 60 minutes before the matches start. A 10-minute grace period is allowed after the scheduled lobby launch. Teams failing to check in or display 100% of their roster will forfeit the match.'
        },
        {
          title: 'Pause Allocations',
          text: 'Each team is granted a maximum of 5 minutes of technical pause time per game map/round to resolve hardware or network connectivity drops. Pauses must be declared in-game. Tactical pauses are limited by the standard in-game configuration.'
        },
        {
          title: 'Match Settings & Version',
          text: 'All matches are played on the most recent public game client patch unless specified by administrators. Standard tournament server locations are selected by regional proximity (e.g., Mumbai for South Asia, Singapore for Southeast Asia) to keep ping fair.'
        }
      ]
    },
    conduct: {
      title: 'Code of Conduct',
      icon: Award,
      color: 'text-gaming-neon',
      content: [
        {
          title: 'Harassment & Toxicity',
          text: 'Toxicity, hate speech, threats, and discrimination based on race, gender, nationality, or sexual orientation will not be tolerated. This applies to in-game chat, discord servers, social media posts, and physical venues.'
        },
        {
          title: 'Smurfing & Ringing',
          text: 'Playing under another player\'s account (ringing) or registerting low-level alternate accounts to enter lower tier divisions (smurfing) is strictly forbidden. Smurf accounts are instantly banned, and main accounts receive a 6-month ban.'
        },
        {
          title: 'Match-Fixing & Collusion',
          text: 'Any agreement between teams or players to alter match outcomes, split prize pools beforehand, or intentionally throw rounds is a severe breach of sportsmanship. Involved parties will be permanently banned from StageCore and reported to game publishers.'
        }
      ]
    },
    disputes: {
      title: 'Disputes & Appeals',
      icon: Scale,
      color: 'text-yellow-500',
      content: [
        {
          title: 'Filing a Dispute',
          text: 'Disputes must be raised by the team captain on the Match Portal within 15 minutes of the match concluding. Clear video evidence (recordings, screenshots, log outputs) must be attached. Disputes raised after this timeframe will not be evaluated.'
        },
        {
          title: 'Anti-Cheat Violations',
          text: 'If the StageCore Desktop Anti-Cheat flags a player during a tournament, the match is suspended immediately. The flagged player faces an automatic 2-year tournament suspension, and the team forfeits all accrued points in the active season.'
        },
        {
          title: 'Referees Authority',
          text: 'Decisions rendered by StageCore Tournament Admins and head referees are final. Standard appeal protocols are handled through our support desk within 7 days of the ruling. Rulings cannot be appealed once the subsequent bracket round commences.'
        }
      ]
    }
  };

  return (
    <div className="relative min-h-screen bg-gaming-bg text-gray-200 py-20 px-4 overflow-hidden font-gaming animate-fadeIn">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gaming-purple/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gaming-blue/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gaming-purple text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Shield size={12} className="text-gaming-purple animate-pulse" />
            <span>Fair Play Enforcement</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
            OFFICIAL <span className="bg-gradient-to-r from-gaming-purple via-gaming-neon to-gaming-blue bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(124,58,237,0.35)]">RULEBOOK</span>
          </h1>
          <p className="max-w-xl mx-auto text-gray-400 text-xs md:text-sm leading-relaxed">
            All players, managers, and organizations registering for StageCore tournaments are legally bound to the rules set below. Ignorance of the rules is not an excuse.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Object.entries(ruleSections).map(([key, value]) => {
            const Icon = value.icon;
            const isActive = activeCategory === key;

            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? 'bg-gradient-to-r from-gaming-purple to-gaming-blue border-transparent text-white shadow-lg'
                    : 'bg-white/5 border-white/5 hover:border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-white' : value.color} />
                <span>{value.title}</span>
              </button>
            );
          })}
        </div>

        {/* Content Panel */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-panel p-8 md:p-10 rounded-3xl border-white/5 relative overflow-hidden text-left"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gaming-purple/10 to-transparent pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-8">
            {React.createElement(ruleSections[activeCategory].icon, {
              className: `w-7 h-7 ${ruleSections[activeCategory].color}`,
              size: 24
            })}
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white">
              {ruleSections[activeCategory].title}
            </h2>
          </div>

          <div className="space-y-8">
            {ruleSections[activeCategory].content.map((item, index) => (
              <div key={index} className="group relative">
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 mt-1">
                    <span className="text-[10px] text-gray-400 font-bold font-mono">0{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-2 group-hover:text-gaming-blue transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-medium">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Warning disclaimer */}
          <div className="mt-12 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex gap-3.5 items-start">
            <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={16} />
            <p className="text-[11px] text-amber-300/80 leading-relaxed font-medium">
              Important: Game-specific brackets might feature additional custom clauses regarding map pools, operator/hero bans, and score thresholds. Ensure you review the tournament description page rule override documents.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Rulebook;
