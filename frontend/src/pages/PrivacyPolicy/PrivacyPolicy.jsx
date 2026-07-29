import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Globe, Info, Database } from 'lucide-react';

export const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('collect');

  const sections = {
    collect: {
      title: '1. Information We Collect',
      icon: Info,
      text: `StageCore collects specific identifiers to deliver our tournament matchmaking and gaming profiles:

- Personal Profiles: Username, email address, password hash, regional location, and date of birth.
- Game Identifiers: Game usernames, developer IDs (e.g. Riot ID, Krafton Character ID, Steam ID, Discord handles).
- Payout Verification: Direct bank numbers, IFSC codes, government-issued photo IDs (collected exclusively during KYC verification for cash prize transactions).
- System Specifications: IP address, operating system version, browser user-agent, hardware GUIDs (collected by the desktop anti-cheat client to ensure matches run on legitimate hardware).`
    },
    use: {
      title: '2. How We Use Data',
      icon: Database,
      text: `We use the telemetry and profile details gathered to run competitive leagues:

- Tournament Administration: Creating seedings, checking rosters, issuing server invites, and verifying team configurations.
- Profile Stats: Tracking user performance history, leaderboards, K/D ratios, match participation records, and tournament standings.
- Fraud & Anti-Cheat: Reviewing driver scan outcomes, system checksums, and game logs to detect aimbots, wallhacks, or macro injections.
- Wallet Management: Dispensing cash prizes, checking identity compliance with financial regulators, and routing direct bank wires.`
    },
    security: {
      title: '3. Security Safeguards',
      icon: Lock,
      text: `StageCore deploys advanced database security tools to keep information safe:

- Cryptographic Security: All transaction databases, passwords, and government IDs are encrypted at-rest using AES-256 standard and in-transit using TLS 1.3 protocol.
- Anti-Cheat Sandbox: The StageCore Anti-Cheat driver operates within standard security sandboxes. It does not scan personal files, photos, browser histories, or document folders. It monitors only active process signatures related to the target game.
- Limited Retention: Government ID pictures uploaded for KYC are scrubbed from active storage nodes within 30 days of approval.`
    },
    thirdparty: {
      title: '4. Third-Party Access',
      icon: Globe,
      text: `We do not sell player details to advertising platforms. We share data only with integrations required to operate StageCore:

- Game Developer APIs: Exchanging statistics with game APIs (Riot Games, Krafton, Valve) to verify scoreboard metrics.
- Payout Gateways: Routing account numbers to banking systems and UPI interfaces to complete transaction payouts.
- CDN Platforms: Routing profile images and news assets through high-performance Content Delivery Networks for speed.`
    }
  };

  return (
    <div className="relative min-h-screen bg-gaming-bg text-gray-200 py-20 px-4 overflow-hidden font-gaming animate-fadeIn">
      {/* Background neon elements */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-gaming-blue/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-gaming-purple/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gaming-blue text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Shield size={12} className="text-gaming-blue" />
            <span>GDPR & Data Compliance</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
            PRIVACY <span className="bg-gradient-to-r from-gaming-purple via-gaming-neon to-gaming-blue bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(124,58,237,0.35)]">POLICY</span>
          </h1>
          <p className="max-w-xl mx-auto text-gray-400 text-xs md:text-sm leading-relaxed">
            Learn how StageCore handles your gaming data, game statistics, payment gateways, and player cookie tracking securely.
          </p>
        </div>

        {/* Layout: Sidebar nav + Content Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Nav */}
          <div className="md:col-span-4 flex flex-col gap-2.5 text-left">
            {Object.entries(sections).map(([key, value]) => {
              const Icon = value.icon;
              const isActive = activeSection === key;

              return (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-gaming-purple to-gaming-blue border-transparent text-white shadow-lg'
                      : 'bg-white/5 border-white/5 hover:border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-white' : 'text-gaming-blue'} />
                  <span>{value.title.split('. ')[1]}</span>
                </button>
              );
            })}
          </div>

          {/* Content Card */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-8 glass-panel p-8 md:p-10 rounded-3xl border-white/5 relative overflow-hidden text-left min-h-[360px]"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gaming-blue/10 to-transparent pointer-events-none" />
            
            <h3 className="text-xl font-extrabold text-white uppercase tracking-wide mb-6 border-b border-white/5 pb-4">
              {sections[activeSection].title}
            </h3>
            
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed whitespace-pre-line font-medium">
              {sections[activeSection].text}
            </p>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
