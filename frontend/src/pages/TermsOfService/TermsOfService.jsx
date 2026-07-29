import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, ShieldAlert, Award, FileText, Globe, Key } from 'lucide-react';

export const TermsOfService = () => {
  const [activeTab, setActiveTab] = useState('accounts');

  const terms = {
    accounts: {
      title: '1. User Account Terms',
      icon: Key,
      text: `When registering for StageCore, you agree to the following account terms:

- Accurate Details: You must register with an active email address and provide truthful game IDs. Mock credentials will yield immediate team bracket drops.
- Credential Security: You are solely responsible for securing your password and token integrations. StageCore admins will never ask you for passwords.
- Single Account Policy: Players are forbidden from registering multiple accounts to participate in the same tournament division. Any duplicate accounts will be banned permanently.`
    },
    prizes: {
      title: '2. Wallet & Prize Transactions',
      icon: Award,
      text: `Payouts from tournament matches are subject to regulatory checking:

- KYC Auditing: Winning withdrawals require a verified photo identification matching the wallet claimant\'s real name. KYC checks are evaluated within 24 hours.
- Payout Timelines: Approved payouts are routed within 48 to 72 business hours. Bank charges, transaction taxes, and regional levies are deducted during wire initialization.
- Forfeiture Policy: Prize wallets unclaimed for 365 calendar days are forfeited and reassigned to seasonal charity leagues or future tournament cash pool additions.`
    },
    infractions: {
      title: '3. Cheating & System Penalties',
      icon: ShieldAlert,
      text: `StageCore preserves competitive integrity. System violations are penalized under strict guidelines:

- Anti-Cheat Installation: Standard competitive tournaments require running our kernel driver. Circumventing or disabling the client prevents match server connection.
- Code Violations: Software hacks, active recoil macros, wallhacks, smurfing, and DDoS attacks trigger a 2-year platform suspension and permanent forfeiture of all accumulated wallet prizes.
- Match disputes: Referees hold absolute authority over lobby remakes, scores, and disqualifications.`
    },
    liability: {
      title: '4. Limitation of Liability',
      icon: Scale,
      text: `StageCore is a platform to run competitive tournaments. Our liability is limited as follows:

- Client Lag & Disconnections: StageCore is not liable for server latency, ISP drops, power failures, or client software updates preventing matches from starting.
- Platform Uptime: We do not guarantee continuous, uninterrupted website availability. Maintenance breaks are declared in Discord.
- Third-Party Services: We are not responsible for game publisher API shutdowns or banking system transmission delays.`
    }
  };

  return (
    <div className="relative min-h-screen bg-gaming-bg text-gray-200 py-20 px-4 overflow-hidden font-gaming animate-fadeIn">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gaming-purple/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-gaming-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gaming-purple text-xs font-bold uppercase tracking-widest mb-4"
          >
            <FileText size={12} className="text-gaming-purple" />
            <span>Legal Framework</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
            TERMS OF <span className="bg-gradient-to-r from-gaming-purple via-gaming-neon to-gaming-blue bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(124,58,237,0.35)]">SERVICE</span>
          </h1>
          <p className="max-w-xl mx-auto text-gray-400 text-xs md:text-sm leading-relaxed">
            Please read these terms carefully before participating. Creating an account or joining brackets signifies your agreement to these clauses.
          </p>
        </div>

        {/* Layout: Sidebar + Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Tabs */}
          <div className="md:col-span-4 flex flex-col gap-2.5 text-left">
            {Object.entries(terms).map(([key, value]) => {
              const Icon = value.icon;
              const isActive = activeTab === key;

              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-gaming-purple to-gaming-blue border-transparent text-white shadow-lg'
                      : 'bg-white/5 border-white/5 hover:border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-white' : 'text-gaming-purple'} />
                  <span>{value.title.split('. ')[1]}</span>
                </button>
              );
            })}
          </div>

          {/* Content Card */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-8 glass-panel p-8 md:p-10 rounded-3xl border-white/5 relative overflow-hidden text-left min-h-[360px]"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gaming-purple/10 to-transparent pointer-events-none" />
            
            <h3 className="text-xl font-extrabold text-white uppercase tracking-wide mb-6 border-b border-white/5 pb-4">
              {terms[activeTab].title}
            </h3>
            
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed whitespace-pre-line font-medium">
              {terms[activeTab].text}
            </p>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default TermsOfService;
