import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Trophy, Activity, Shield, ShieldCheck, DollarSign, Users, Layers, ArrowRight, 
  CheckCircle2, XCircle, AlertCircle, MessageSquare, Settings, Lock, Tv, Check, 
  Search, Award, Sparkles, Clock, CreditCard, HelpCircle, Briefcase, Target, 
  LineChart, Bell, Terminal, ChevronRight, ChevronDown, UserPlus, Heart, Share2, 
  MoreHorizontal, Image as ImageIcon, ThumbsUp, Camera, Globe, MapPin, Sliders, 
  Cpu, Zap, CheckSquare, Plus, Send, Radio
} from 'lucide-react';

export const Showcase = () => {
  const [selectedMockup, setSelectedMockup] = useState('dashboard');
  const [selectedEcosystemNode, setSelectedEcosystemNode] = useState('tournaments');
  const [activeTab, setActiveTab] = useState('pitch'); // 'pitch' | 'product' | 'business'
  const [timelineStep, setTimelineStep] = useState(0);
  const [copiedText, setCopiedText] = useState(false);

  // Anti-Cheat live log simulator
  const [acLogs, setAcLogs] = useState([
    'Initializing StageCore Security Driver (v2.4.1)...',
    'Kernel Driver link established: Status SECURE',
    'Waiting for matchmaking process start...'
  ]);
  const [acScanStatus, setAcScanStatus] = useState('idle'); // idle | scanning | secure

  const runAcScan = () => {
    setAcScanStatus('scanning');
    setAcLogs([
      'Matchmaking match_154 detected. Verifying client integrity...',
      'Checksum validation: Valorant.exe (Build 2026.07.02) - Match OK',
      'Scanning process memory range 0x00007FF7C0000000 to 0x00007FF7D0000000...',
      'Overlay hook inspection: 0 active hooks detected.',
      'Checking hardware registers for input macros...'
    ]);

    const scannerLogs = [
      'Scanning mouse/keyboard input queue... OK',
      'Searching memory signatures for unauthorized injection...',
      'Active network packet analysis: Latency 12ms, Status SECURE',
      'StageCore Kernel driver active. Competitive integrity: 100%',
      'Diagnostic complete: Anti-Cheat verified (No violations found).'
    ];

    let counter = 0;
    const interval = setInterval(() => {
      if (counter < scannerLogs.length) {
        setAcLogs(prev => [...prev, scannerLogs[counter]]);
        counter++;
      } else {
        clearInterval(interval);
        setAcScanStatus('secure');
      }
    }, 600);
  };

  const copyPitchLink = () => {
    navigator.clipboard.writeText(window.location.origin + '/showcase');
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Mockups Definitions
  const mockups = [
    { id: 'dashboard', name: 'Dashboard view', category: 'Dashboard' },
    { id: 'landing', name: 'Public Landing Page', category: 'Public' },
    { id: 'auth', name: 'Auth Portal', category: 'Public' },
    { id: 'social', name: 'Social Feed Ecosystem', category: 'Social' },
    { id: 'profile', name: 'Esports Resume Profile', category: 'Social' },
    { id: 'tournaments', name: 'Tournaments Arena', category: 'Competitions' },
    { id: 'matches', name: 'Matches & Streams', category: 'Competitions' },
    { id: 'teams', name: 'Team Management Panel', category: 'Competitions' },
    { id: 'leaderboard', name: 'Global Leaderboards', category: 'Statistics' },
    { id: 'stats', name: 'Competitive Statistics', category: 'Statistics' },
    { id: 'wallet', name: 'Wallet & Payouts Console', category: 'Finances' },
    { id: 'messages', name: 'Direct Messages & Support', category: 'System' },
    { id: 'organizer', name: 'Organizer Console (Admin)', category: 'System' }
  ];

  const ecosystemNodes = {
    players: {
      title: 'Players Core',
      description: 'The foundation of the platform. Players build their competitive identity, accumulate Skill Rating (RP), gain verification, and build fans.',
      value: 'Generates user traffic, engagement, and drives organic word-of-mouth growth.'
    },
    teams: {
      title: 'Teams Hub',
      description: 'Allows players to form squads, recruit talent with active tags, and combine stats into a team profile that functions as a single competitive unit.',
      value: 'Fosters team loyalty, reduces individual player churn, and drives group onboarding.'
    },
    tournaments: {
      title: 'Tournaments Engine',
      description: 'The execution layer. Built-in check-in locks, brackets management, and strict tournament flow enforcement managed directly by StageCore.',
      value: 'Secures high registration rates, maintains competitive integrity, and drives entry-fee revenue.'
    },
    matches: {
      title: 'Match Center',
      description: 'Real-time score keeping, round timelines, match media capture, dispute resolving dashboard, and embedded official Twitch stream.',
      value: 'Attracts viewers, expands sponsors exposure, and generates live-stream advertisement revenue.'
    },
    rankings: {
      title: 'Ranking Engine',
      description: 'Dynamic team/player leaderboards using a proprietary rating system. Tracks standings across game titles (Valorant, BGMI, CS2, Free Fire).',
      value: 'Gamifies the platform, encourages constant practice/competition, and feeds into recruiting.'
    },
    statistics: {
      title: 'Statistics Analytics',
      description: 'Deep performance analytics, including weapon accuracy distributions, map win-rates, and performance curves over time.',
      value: 'Highly sought features for serious gamers, providing premium value for pro-memberships.'
    },
    wallet: {
      title: 'Wallet & Escrow',
      description: 'Direct prize payouts, cash withdrawals via UPI/Bank, historical transaction ledgers, and secure payout verification.',
      value: 'Solves the trust problem in amateur esports, ensuring absolute prize pool distribution transparency.'
    },
    community: {
      title: 'Gaming Social Feed',
      description: 'A complete social layer where gamers share victory cards, clips, and post updates, generating feedback loops of likes and comments.',
      value: 'Exponentially boosts user session length, retention, and monthly active users (MAU).'
    }
  };

  const userJourneySteps = [
    { title: 'Player Registration', desc: 'Secure email/auth onboarding takes under 30 seconds.' },
    { title: 'Profile Customization', desc: 'Players set game IGNs, bios, and get verified.' },
    { title: 'Team Formation', desc: 'Recruit players, toggle squad recruitment, and form team rosters.' },
    { title: 'Tournament Discovery', desc: 'Browse active titles and join tournaments with team squads.' },
    { title: 'System Check-In', desc: 'Automated match check-ins locked prior to start to eliminate no-shows.' },
    { title: 'Match Participation', desc: 'Integrated lobby codes, fair matchmaking, and anti-cheat driver protection.' },
    { title: 'Result Submission', desc: 'Submit final scores and upload match screenshot evidence.' },
    { title: 'Ranking Update', desc: 'Elo ranking engine updates RP and leaderboards in real time.' },
    { title: 'Wallet Distribution', desc: 'Winnings are split and credited instantly to team wallets.' },
    { title: 'Instant Withdrawal', desc: 'Withdraw funds directly to UPI or Bank accounts with full transparency.' }
  ];

  return (
    <div className="relative min-h-screen bg-[#050816] text-gray-200 font-gaming overflow-x-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-gaming-purple/10 to-transparent pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-gaming-blue/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-gaming-purple/5 rounded-full blur-[150px] pointer-events-none" />

      {/* STICKY Pitch Header */}
      <header className="sticky top-20 z-40 bg-[#050816]/95 border-b border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-[10px] font-black tracking-wider bg-gaming-purple/20 text-gaming-purple border border-gaming-purple/30 rounded">
              INVESTOR DECK & SHOWCASE
            </span>
            <h1 className="text-lg font-black tracking-widest text-white">STAGECORE SHOWCASE</h1>
          </div>

          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
            <button 
              onClick={() => setActiveTab('pitch')}
              className={`px-4 py-1.5 text-xs font-bold uppercase rounded-lg transition-all ${activeTab === 'pitch' ? 'bg-gaming-purple text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              Pitch Deck
            </button>
            <button 
              onClick={() => setActiveTab('product')}
              className={`px-4 py-1.5 text-xs font-bold uppercase rounded-lg transition-all ${activeTab === 'product' ? 'bg-gaming-purple text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              Interactive Product Showcase
            </button>
            <button 
              onClick={() => setActiveTab('business')}
              className={`px-4 py-1.5 text-xs font-bold uppercase rounded-lg transition-all ${activeTab === 'business' ? 'bg-gaming-purple text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              Business Model
            </button>
          </div>

          <button 
            onClick={copyPitchLink}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 text-xs font-bold transition"
          >
            <Share2 size={14} />
            <span>{copiedText ? 'Link Copied!' : 'Share Pitch'}</span>
          </button>
        </div>
      </header>

      {/* Main Pitch Tab */}
      <AnimatePresence mode="wait">
        {activeTab === 'pitch' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-7xl mx-auto px-4 py-12"
          >
            {/* HERO SECTION */}
            <section className="text-center py-16 md:py-24 relative">
              <div className="max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gaming-blue font-semibold uppercase tracking-wider mb-6">
                  <Sparkles size={12} />
                  <span>The Future of Grassroots Esports</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white uppercase font-gaming">
                  Rise. Compete. <span className="text-transparent bg-clip-text bg-gradient-to-r from-gaming-purple via-gaming-neon to-gaming-blue">Conquer.</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-400 mt-6 max-w-2xl mx-auto leading-relaxed">
                  StageCore is an official esports tournament organizer, media brand, and player social network unified into a single premium platform.
                </p>

                {/* Mission Statement */}
                <div className="mt-8 p-6 glass-panel rounded-2xl max-w-xl mx-auto border border-white/5 bg-gradient-to-r from-gaming-purple/5 to-gaming-blue/5">
                  <span className="text-[10px] font-black text-gaming-purple uppercase tracking-widest block mb-2">Our Mission</span>
                  <p className="text-sm text-gray-300 italic leading-relaxed">
                    "StageCore exists to professionalize grassroots and semi-professional esports by organizing trusted competitive tournaments, building strong communities, and creating career opportunities for players."
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <button 
                    onClick={() => setActiveTab('product')} 
                    className="px-8 py-3.5 bg-gaming-purple hover:bg-gaming-purple/90 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_4px_25px_rgba(124,58,237,0.35)] flex items-center gap-2"
                  >
                    <span>Launch Product Tour</span>
                    <ArrowRight size={14} />
                  </button>
                  <a 
                    href="/dashboard"
                    className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all border border-white/10"
                  >
                    Enter Live Demo
                  </a>
                </div>

                {/* Key KPIs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto">
                  {[
                    { value: '150K+', label: 'Players Reached', icon: Users },
                    { value: '250+', label: 'Tournaments Hosted', icon: Trophy },
                    { value: '1M+', label: 'Media Views Generated', icon: Tv },
                    { value: '50K+', label: 'Community Members', icon: Award }
                  ].map((stat, i) => (
                    <div key={i} className="p-5 glass-panel rounded-2xl border border-white/5 flex flex-col items-center">
                      <div className="p-2.5 bg-gaming-purple/10 text-gaming-purple rounded-xl mb-3">
                        <stat.icon size={18} />
                      </div>
                      <span className="text-3xl font-black text-white font-gaming">{stat.value}</span>
                      <span className="text-xs text-gray-400 mt-1">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 2: THE PROBLEM */}
            <section className="py-20 border-t border-white/5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-left">
                  <span className="text-gaming-purple font-extrabold text-xs uppercase tracking-widest">Industry Pain Points</span>
                  <h3 className="text-3xl sm:text-4xl font-black text-white uppercase mt-1">The Fragmented Grassroots Esports Market</h3>
                  <p className="text-gray-400 mt-4 leading-relaxed text-sm">
                    Amateur and semi-pro gamers face a highly broken competitive path. To organize a single match, check brackets, manage a team, share achievements, and withdraw prize earnings, they are forced to juggle 4-5 disconnected platforms.
                  </p>
                  
                  <div className="mt-8 space-y-4">
                    {[
                      { title: 'Siloed Infrastructure', desc: 'Players must use Discord for team chats, Battlefy for brackets, Twitter for gaming posts, and manual escrow bots for payouts.' },
                      { title: 'Low Tournament Integrity', desc: 'Unofficial moderators lead to tournament disputes, match delays, and no-shows with zero penalty.' },
                      { title: 'Opaque Prize Distribution', desc: 'Players wait weeks or months for payouts from amateur organizers, with high transaction fees and trust deficits.' }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition duration-300">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
                          <XCircle size={16} />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-white">{item.title}</h4>
                          <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Problem Infographic Diagram */}
                <div className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#0c051a] to-[#050816]">
                  <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-red-500/5 rounded-full blur-[80px]" />
                  <h4 className="font-extrabold text-xs text-red-500 uppercase tracking-widest mb-6">Current User Journey Friction</h4>
                  
                  <div className="relative space-y-8 pl-6 border-l-2 border-dashed border-red-500/20">
                    {[
                      { step: '1', title: 'Discord Lobbies', desc: 'Fragmented team search, no permanent player stats or rankings.' },
                      { step: '2', title: 'Tournament Reg', desc: 'Signing up on third-party bracket generators. High friction.' },
                      { step: '3', title: 'Disputes & Cheats', desc: 'Submit match screenshots via forms. No active driver check. Long delays.' },
                      { step: '4', title: 'Payout Escrow', desc: 'Manual money transfers, vulnerable to scams and delayed weeks.' }
                    ].map((node, idx) => (
                      <div key={idx} className="relative">
                        <span className="absolute -left-[35px] top-0.5 w-6 h-6 rounded-full bg-[#050816] border border-red-500/40 text-[10px] font-black text-red-400 flex items-center justify-center">
                          {node.step}
                        </span>
                        <h5 className="font-extrabold text-xs text-white uppercase">{node.title}</h5>
                        <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{node.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3">
                    <AlertCircle className="text-red-400 shrink-0" size={16} />
                    <span className="text-[11px] text-red-300 font-medium">Result: Lost engagement, fragmented reputation, zero monetization.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: THE SOLUTION */}
            <section className="py-20 border-t border-white/5 bg-[#03050f] -mx-4 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-gaming-blue font-extrabold text-xs uppercase tracking-widest">Our Solution</span>
                  <h3 className="text-3xl sm:text-4xl font-black text-white uppercase mt-1">The Unified StageCore Ecosystem</h3>
                  <p className="text-gray-400 mt-4 leading-relaxed text-sm">
                    StageCore completely eliminates third-party fragmentation. We are not just a tournament engine. We are an <strong>Official Esports Tournament Organizer and Media Brand</strong>.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      title: 'Official Operations Only',
                      desc: 'No random third-party setups. Every tournament is created, monitored, casted, and verified by StageCores administrative staff. This establishes absolute trust.',
                      icon: ShieldCheck
                    },
                    {
                      title: 'Esports Social Network',
                      desc: 'A permanent gamer resume profile linked to verified tournaments, team rosters, and a custom community feed to post victories and highlights.',
                      icon: Share2
                    },
                    {
                      title: 'Instant Escrow Payouts',
                      desc: 'Earnings are distributed directly to in-platform player wallets right after match validation, with direct bank and UPI settlement support.',
                      icon: CreditCard
                    }
                  ].map((solution, i) => (
                    <div key={i} className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-gaming-blue/30 transition-all duration-300 group">
                      <div>
                        <div className="w-12 h-12 rounded-2xl bg-gaming-blue/10 border border-gaming-blue/20 text-gaming-blue flex items-center justify-center mb-6">
                          <solution.icon size={22} />
                        </div>
                        <h4 className="font-extrabold text-lg text-white font-gaming uppercase tracking-wider">{solution.title}</h4>
                        <p className="text-xs text-gray-400 mt-3 leading-relaxed">{solution.desc}</p>
                      </div>
                      <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] text-gaming-blue font-black uppercase tracking-wider">Pillar {i+1}</span>
                        <CheckCircle2 className="text-gaming-blue" size={16} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 4: PLATFORM ECOSYSTEM DIAGRAM */}
            <section className="py-20 border-t border-white/5">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-gaming-purple font-extrabold text-xs uppercase tracking-widest">Ecosystem Architecture</span>
                <h3 className="text-3xl font-black text-white uppercase mt-1">Unified Data & Experience Loop</h3>
                <p className="text-gray-400 mt-2 text-sm">Click each node below to see the interactive value chain of the StageCore platform.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
                {/* Visual SVG node connections */}
                <div className="lg:col-span-7 flex flex-wrap gap-4 justify-center">
                  {Object.keys(ecosystemNodes).map((nodeId) => (
                    <button
                      key={nodeId}
                      onClick={() => setSelectedEcosystemNode(nodeId)}
                      className={`px-5 py-3 rounded-2xl border text-xs font-bold uppercase transition-all flex items-center gap-2.5 ${
                        selectedEcosystemNode === nodeId
                          ? 'bg-gaming-purple border-gaming-purple text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] scale-105'
                          : 'bg-white/5 border-white/10 hover:border-white/20 text-gray-300'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-current shrink-0" />
                      <span>{ecosystemNodes[nodeId].title}</span>
                    </button>
                  ))}
                </div>

                {/* Node Detail explanation */}
                <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-white/10 relative overflow-hidden bg-gradient-to-r from-gaming-purple/5 to-gaming-blue/5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-gaming-blue uppercase tracking-widest">Selected Component</span>
                    <Sparkles className="text-gaming-blue" size={14} />
                  </div>
                  
                  <h4 className="text-lg font-black text-white uppercase tracking-wider font-gaming">
                    {ecosystemNodes[selectedEcosystemNode].title}
                  </h4>
                  <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                    {ecosystemNodes[selectedEcosystemNode].description}
                  </p>
                  
                  <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-[10px] text-gaming-purple font-black uppercase tracking-wider block mb-1">Platform / Business Value</span>
                    <p className="text-xs text-gray-400 italic leading-relaxed">
                      "{ecosystemNodes[selectedEcosystemNode].value}"
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: ANIMATED USER JOURNEY */}
            <section className="py-20 border-t border-white/5 bg-[#03050f] -mx-4 px-4 overflow-hidden">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <span className="text-gaming-blue font-extrabold text-xs uppercase tracking-widest">User Journey Map</span>
                  <h3 className="text-3xl font-black text-white uppercase mt-1">From Onboarding to Earnings Withdrawal</h3>
                  <p className="text-gray-400 mt-2 text-sm">Follow the simplified competitive workflow inside StageCore.</p>
                </div>

                <div className="flex flex-col md:flex-row items-stretch gap-4 justify-center max-w-5xl mx-auto">
                  <div className="md:w-1/3 flex flex-col justify-between gap-2.5">
                    {userJourneySteps.map((step, idx) => (
                      <button
                        key={idx}
                        onClick={() => setTimelineStep(idx)}
                        className={`w-full text-left p-4 rounded-xl border transition-all text-xs font-bold uppercase flex items-center justify-between ${
                          timelineStep === idx
                            ? 'bg-gaming-blue border-gaming-blue text-white shadow-lg'
                            : 'bg-white/5 border-white/5 hover:bg-white/10 text-gray-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-black opacity-60">{(idx + 1).toString().padStart(2, '0')}</span>
                          <span>{step.title}</span>
                        </div>
                        <ChevronRight size={14} />
                      </button>
                    ))}
                  </div>

                  <div className="md:w-2/3 glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between bg-gradient-to-br from-[#050816] to-[#0c1230]">
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-[10px] font-black text-gaming-blue uppercase tracking-widest">Step Details</span>
                      <span className="px-2.5 py-1 text-[10px] font-bold bg-gaming-blue/15 text-gaming-blue rounded-full border border-gaming-blue/20">
                        Phase {(timelineStep + 1).toString()} of 10
                      </span>
                    </div>

                    <div>
                      <h4 className="text-2xl font-black text-white uppercase font-gaming mb-4">
                        {userJourneySteps[timelineStep].title}
                      </h4>
                      <p className="text-sm text-gray-300 leading-relaxed max-w-lg">
                        {userJourneySteps[timelineStep].desc}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                      <button
                        disabled={timelineStep === 0}
                        onClick={() => setTimelineStep(prev => prev - 1)}
                        className="px-4 py-2 text-xs font-bold uppercase rounded-lg border border-white/10 hover:bg-white/5 text-gray-300 disabled:opacity-30 disabled:pointer-events-none"
                      >
                        Prev
                      </button>
                      <button
                        disabled={timelineStep === userJourneySteps.length - 1}
                        onClick={() => setTimelineStep(prev => prev + 1)}
                        className="px-4 py-2 text-xs font-bold uppercase rounded-lg bg-gaming-blue hover:bg-gaming-blue/90 text-white shadow-md disabled:opacity-30 disabled:pointer-events-none"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: ANTI-CHEAT INTERACTIVE */}
            <section className="py-20 border-t border-white/5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-left">
                  <span className="text-gaming-purple font-extrabold text-xs uppercase tracking-widest">Fair Play Assurance</span>
                  <h3 className="text-3xl sm:text-4xl font-black text-white uppercase mt-1">Advanced Anti-Cheat Protection</h3>
                  <p className="text-gray-400 mt-4 leading-relaxed text-sm">
                    Esports ecosystems live or die by competitive integrity. StageCore enforces proprietary, multi-layered anti-cheat validations, matching kernel signature driver tracking with manual match evidence reviews.
                  </p>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex gap-3">
                      <div className="shrink-0 w-5 h-5 rounded-full bg-gaming-purple/20 text-gaming-purple flex items-center justify-center text-xs">✓</div>
                      <p className="text-xs text-gray-300"><strong className="text-white">Strict Match Check-ins:</strong> Teams that do not check in 15 minutes before the match start are instantly disqualified, eliminating dead lobbies.</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="shrink-0 w-5 h-5 rounded-full bg-gaming-purple/20 text-gaming-purple flex items-center justify-center text-xs">✓</div>
                      <p className="text-xs text-gray-300"><strong className="text-white">Dispute Moderation Center:</strong> When players report results discrepancies, administrators can view uploaded screenshots, logs, and lobby timelines to resolve disputes in minutes.</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="shrink-0 w-5 h-5 rounded-full bg-gaming-purple/20 text-gaming-purple flex items-center justify-center text-xs">✓</div>
                      <p className="text-xs text-gray-300"><strong className="text-white">Player Verification:</strong> Top-tier profiles are hand-verified by our admins, ensuring smurfing and cheat bans are tied to actual hardware IDs.</p>
                    </div>
                  </div>

                  <button
                    onClick={runAcScan}
                    className="mt-8 px-6 py-3 bg-gaming-purple hover:bg-gaming-purple/90 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_4px_15px_rgba(124,58,237,0.3)]"
                  >
                    Simulate Driver Integrity Scan
                  </button>
                </div>

                {/* Console Simulator Screen */}
                <div className="glass-panel p-6 rounded-3xl border border-white/15 bg-black/60 font-mono text-left relative overflow-hidden">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">stagecore-anti-cheat-driver.sh</span>
                  </div>

                  <div className="space-y-2 h-64 overflow-y-auto text-[11px] text-gaming-blue/90 custom-scrollbar pr-2">
                    {acLogs.map((log, index) => (
                      <div key={index} className="flex gap-2">
                        <span className="text-gray-500 select-none">[{new Date().toLocaleTimeString()}]</span>
                        <span className={log.includes('SECURE') ? 'text-green-400 font-bold' : log.includes('error') ? 'text-red-400' : 'text-gaming-blue'}>
                          {log}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-semibold uppercase">Security Engine status:</span>
                    <div className="flex items-center gap-2">
                      {acScanStatus === 'scanning' && (
                        <>
                          <div className="w-2 h-2 rounded-full bg-yellow-500 animate-ping" />
                          <span className="text-yellow-500 font-bold">Scanning...</span>
                        </>
                      )}
                      {acScanStatus === 'secure' && (
                        <>
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span className="text-green-400 font-bold">VERIFIED SECURE</span>
                        </>
                      )}
                      {acScanStatus === 'idle' && (
                        <>
                          <div className="w-2 h-2 rounded-full bg-gray-500" />
                          <span className="text-gray-500 font-bold">Driver Loaded</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* Interactive Product Showcase Tab */}
        {activeTab === 'product' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-7xl mx-auto px-4 py-8"
          >
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-gaming-blue font-extrabold text-xs uppercase tracking-widest">Handcrafted Simulators</span>
              <h3 className="text-3xl font-black text-white uppercase mt-1">Platform Screen Simulator</h3>
              <p className="text-gray-400 mt-2 text-sm">
                StageCore is built for maximum visual premium. Choose a platform screen below to see a detailed static recreation from the codebase.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Simulator Sidebar Menu */}
              <div className="lg:col-span-3 space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {mockups.map((mockup) => (
                  <button
                    key={mockup.id}
                    onClick={() => setSelectedMockup(mockup.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs font-bold uppercase flex flex-col justify-center gap-1 ${
                      selectedMockup === mockup.id
                        ? 'bg-gaming-purple border-gaming-purple text-white shadow-lg'
                        : 'bg-white/5 border-white/5 hover:bg-white/10 text-gray-400'
                    }`}
                  >
                    <span className="text-[9px] opacity-75 font-semibold text-gaming-blue">{mockup.category}</span>
                    <span>{mockup.name}</span>
                  </button>
                ))}
              </div>

              {/* Handcrafted Screen simulator */}
              <div className="lg:col-span-9 glass-panel rounded-3xl border border-white/10 bg-[#050816] overflow-hidden shadow-2xl relative">
                {/* Simulated Screen browser bar */}
                <div className="bg-[#0b0c16] px-4 py-3 flex items-center justify-between border-b border-white/5 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-4 font-mono select-none opacity-50">localhost:5173/{selectedMockup === 'landing' ? '' : selectedMockup}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 font-black text-[9px]">DEMO PREVIEW</span>
                </div>

                <div className="p-6 min-h-[520px] bg-[#050816] text-left">
                  {/* DYNAMIC SCREEN RENDERS */}
                  {selectedMockup === 'dashboard' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-black text-gaming-purple uppercase tracking-widest">Welcome back</span>
                          <h4 className="text-xl font-black text-white uppercase font-gaming">Anandmohan 👋</h4>
                        </div>
                        <span className="px-3 py-1 text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/20 rounded-full">
                          Lobby Status: Ready
                        </span>
                      </div>

                      {/* Top cards */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { title: 'Matches Played', val: '125', change: 'Total Matches' },
                          { title: 'Matches Won', val: '85', change: 'Total Wins' },
                          { title: 'Win Rate', val: '68%', change: 'Your Win Rate' },
                          { title: 'K/D Ratio', val: '1.85', change: 'Average K/D' }
                        ].map((stat, idx) => (
                          <div key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">{stat.title}</span>
                            <span className="text-2xl font-black text-white mt-1 block">{stat.val}</span>
                            <span className="text-[9px] text-gray-500 mt-0.5 block">{stat.change}</span>
                          </div>
                        ))}
                      </div>

                      {/* Main sections */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Upcoming Match Card */}
                        <div className="p-5 bg-white/5 rounded-2xl border border-white/5 flex flex-col justify-between h-44">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-gaming-blue font-black uppercase tracking-wider">Upcoming Match</span>
                            <span className="text-[9px] px-2 py-0.5 bg-gaming-purple/20 text-gaming-purple rounded border border-gaming-purple/35">TODAY</span>
                          </div>
                          
                          <div className="flex items-center justify-around py-2">
                            <div className="text-center">
                              <span className="w-8 h-8 rounded-full bg-gaming-purple/10 flex items-center justify-center text-xs font-bold text-gaming-purple border border-gaming-purple/20 mx-auto">A</span>
                              <span className="text-[10px] font-bold text-white mt-1 block">Team Alpha</span>
                            </div>
                            <span className="text-xs font-black text-gray-500">VS</span>
                            <div className="text-center">
                              <span className="w-8 h-8 rounded-full bg-gaming-blue/10 flex items-center justify-center text-xs font-bold text-gaming-blue border border-gaming-blue/20 mx-auto">B</span>
                              <span className="text-[10px] font-bold text-white mt-1 block">Team Bravo</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-gray-400 pt-2 border-t border-white/5">
                            <span>25 May 2026 - 08:00 PM IST</span>
                            <button className="px-2.5 py-1 bg-gaming-purple text-white font-extrabold text-[9px] uppercase tracking-wider rounded">VIEW DETAILS</button>
                          </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="p-5 bg-white/5 rounded-2xl border border-white/5 flex flex-col justify-between h-44">
                          <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Recent Activity</span>
                          <div className="space-y-2 overflow-y-auto custom-scrollbar flex-grow mt-3">
                            <div className="text-xs flex justify-between text-gray-300">
                              <span>✓ Initiated UPI withdrawal of ₹1,022</span>
                              <span className="text-[9px] text-gray-500">Just now</span>
                            </div>
                            <div className="text-xs flex justify-between text-gray-300">
                              <span>✓ Created esports team: "alpha team"</span>
                              <span className="text-[9px] text-gray-500">15m ago</span>
                            </div>
                            <div className="text-xs flex justify-between text-gray-300">
                              <span>✓ Tournament registration complete</span>
                              <span className="text-[9px] text-gray-500">2h ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMockup === 'landing' && (
                    <div className="space-y-8">
                      {/* Nav Mock */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/5">
                        <span className="font-extrabold text-sm text-white font-gaming">STAGECORE</span>
                        <div className="flex gap-4 text-[10px] font-extrabold uppercase text-gray-400">
                          <span>Tournaments</span>
                          <span>Matches</span>
                          <span>Rankings</span>
                          <span>News</span>
                        </div>
                        <span className="px-3 py-1 bg-gaming-purple text-white text-[9px] font-black rounded uppercase">Login</span>
                      </div>

                      {/* Hero mock */}
                      <div className="py-8 text-center max-w-md mx-auto space-y-4">
                        <h4 className="text-3xl font-black uppercase leading-tight text-white font-gaming">
                          We Organize. We Produce. We Inspire.
                        </h4>
                        <p className="text-xs text-gray-400">
                          Grassroots and semi-professional tournaments organized with absolute competitive integrity.
                        </p>
                        <div className="flex justify-center gap-2">
                          <span className="px-4 py-2 bg-gaming-purple text-white text-[9px] font-black rounded uppercase">View Tournaments</span>
                          <span className="px-4 py-2 bg-white/5 border border-white/10 text-white text-[9px] font-black rounded uppercase">Explore Matches</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMockup === 'auth' && (
                    <div className="max-w-md mx-auto p-6 bg-white/5 border border-white/10 rounded-2xl space-y-6">
                      <div className="text-center space-y-1">
                        <span className="text-xs text-gaming-purple font-bold">StageCore Sign-in</span>
                        <h4 className="text-lg font-black text-white uppercase font-gaming">Welcome Back</h4>
                        <p className="text-[10px] text-gray-400">Enter authorization credentials to access the console</p>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-gray-400 uppercase">Email Address</label>
                          <input type="text" disabled placeholder="you@example.com" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-gray-400 uppercase">Password</label>
                          <input type="password" disabled placeholder="••••••••" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs outline-none" />
                        </div>
                      </div>

                      <button className="w-full py-2.5 bg-gaming-purple hover:bg-gaming-purple/95 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                        LOG IN
                      </button>
                    </div>
                  )}

                  {selectedMockup === 'social' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      {/* Left feed column */}
                      <div className="md:col-span-8 space-y-4">
                        {/* Feed Creator Input */}
                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                          <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-gaming-purple/20 border border-gaming-purple/35 flex items-center justify-center font-bold text-xs">AM</div>
                            <textarea disabled placeholder="Whats happening on the battlefield?" className="flex-grow bg-transparent text-xs text-white outline-none resize-none h-12" />
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-white/5">
                            <div className="flex gap-2 text-gray-400">
                              <ImageIcon size={14} />
                              <span className="text-[9px] font-bold uppercase">Upload Highlight Clip</span>
                            </div>
                            <button className="px-3 py-1 bg-gaming-blue text-white text-[9px] font-black uppercase rounded">POST</button>
                          </div>
                        </div>

                        {/* Sample post */}
                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gaming-purple/20 border border-gaming-purple/35 flex items-center justify-center font-bold text-xs">SX</div>
                              <div>
                                <span className="font-extrabold text-xs text-white block">SLAYERX</span>
                                <span className="text-[9px] text-gray-500 block">1 hour ago</span>
                              </div>
                            </div>
                            <span className="text-[9px] px-2 py-0.5 bg-gaming-purple/20 text-gaming-purple border border-gaming-purple/35 rounded font-black">MATCH WINNER</span>
                          </div>

                          <p className="text-xs text-gray-300">
                            Just finished warmups. Ready to smash the bracket in the MVP Showdown today! ⚔️ Let's get that trophy!
                          </p>

                          <div className="flex items-center gap-4 text-gray-500 text-[10px] font-semibold">
                            <span className="flex items-center gap-1 hover:text-white cursor-pointer"><ThumbsUp size={12} /> 24 Likes</span>
                            <span className="flex items-center gap-1 hover:text-white cursor-pointer"><MessageSquare size={12} /> 2 Comments</span>
                          </div>
                        </div>
                      </div>

                      {/* Right panel */}
                      <div className="md:col-span-4 space-y-4">
                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3">Who to Follow</span>
                          <div className="space-y-3">
                            {['Mortal', 'JONATHAN', 'Viper'].map((name, i) => (
                              <div key={i} className="flex justify-between items-center">
                                <span className="text-xs font-bold text-white">{name}</span>
                                <button className="px-2 py-0.5 bg-white/10 text-white text-[9px] font-black rounded uppercase">Follow</button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMockup === 'profile' && (
                    <div className="space-y-6">
                      {/* Banner / Cover */}
                      <div className="h-28 w-full bg-gradient-to-r from-gaming-purple/30 to-gaming-blue/30 rounded-2xl relative flex items-end p-4 border border-white/5">
                        <div className="absolute top-3 right-3">
                          <button className="px-2.5 py-1 bg-black/60 text-white text-[9px] font-black uppercase rounded border border-white/10">EDIT COVER</button>
                        </div>

                        <div className="flex items-center gap-4 translate-y-6">
                          <div className="w-16 h-16 rounded-full bg-gaming-purple/80 border-4 border-[#050816] flex items-center justify-center text-xl font-bold text-white">AM</div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-lg font-black text-white uppercase font-gaming">ANANDMOHAN</h4>
                              <span className="px-1.5 py-0.5 text-[8px] bg-gaming-blue/20 text-gaming-blue border border-gaming-blue/35 rounded font-black uppercase">VERIFIED</span>
                            </div>
                            <span className="text-[10px] text-gray-400 block mt-0.5">@anandmohan</span>
                          </div>
                        </div>
                      </div>

                      {/* Bio and Stats */}
                      <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-8 space-y-4">
                          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Player Bio</span>
                            <p className="text-xs text-gray-300 leading-relaxed">
                              Semi-pro esports player competing in Valorant and BGMI tournaments. Vying for the MVP crown! Active Team: Alpha Team.
                            </p>
                          </div>
                        </div>

                        <div className="md:col-span-4 p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Team Recruitment</span>
                            <span className="text-xs text-green-400 font-bold block">● LFG / Open to Offers</span>
                          </div>
                          <div className="flex gap-4 pt-4 border-t border-white/5 mt-4 text-center">
                            <div className="flex-1">
                              <span className="text-xs font-bold text-white block">1,420</span>
                              <span className="text-[9px] text-gray-500 uppercase">Followers</span>
                            </div>
                            <div className="flex-1">
                              <span className="text-xs font-bold text-white block">12</span>
                              <span className="text-[9px] text-gray-500 uppercase">Trophies</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMockup === 'tournaments' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-[10px] font-black text-gaming-purple uppercase tracking-widest">Active Battles</span>
                          <h4 className="text-xl font-black text-white uppercase font-gaming">Tournaments Arena</h4>
                        </div>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-gaming-purple text-white text-[9px] font-black rounded uppercase">ALL</span>
                          <span className="px-3 py-1 bg-white/5 text-gray-400 text-[9px] font-black rounded uppercase">REGISTERED</span>
                          <span className="px-3 py-1 bg-white/5 text-gray-400 text-[9px] font-black rounded uppercase">LIVE</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { name: 'StageCore Valorant Cup #12', game: 'Valorant', prize: '₹ 25,000', status: 'UPCOMING', mode: '5v5' },
                          { name: 'StageCore BGMI Masters', game: 'BGMI', prize: '₹ 50,000', status: 'LIVE', mode: 'Squad' },
                          { name: 'StageCore Free Fire Clash', game: 'Free Fire', prize: '₹ 10,000', status: 'UPCOMING', mode: 'Squad' },
                          { name: 'StageCore CS2 Cup', game: 'CS2', prize: '₹ 30,000', status: 'UPCOMING', mode: '5v5' }
                        ].map((t, idx) => (
                          <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between h-36 hover:border-gaming-purple/40 transition duration-300">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-[9px] font-bold text-gaming-blue uppercase tracking-wider block">{t.game} • {t.mode}</span>
                                <h5 className="font-extrabold text-xs text-white mt-1 leading-snug">{t.name}</h5>
                              </div>
                              <span className={`text-[8px] px-2 py-0.5 rounded font-black border ${
                                t.status === 'LIVE' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-gaming-purple/10 border-gaming-purple/20 text-gaming-purple'
                              }`}>
                                {t.status}
                              </span>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[10px] text-gray-400">
                              <span>Prize: {t.prize}</span>
                              <button className="px-2.5 py-1 bg-gaming-purple text-white font-extrabold text-[9px] uppercase tracking-wider rounded">REGISTER</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedMockup === 'matches' && (
                    <div className="space-y-6">
                      <span className="text-[10px] font-black text-gaming-purple uppercase tracking-widest block">Live scoring feed</span>
                      
                      <div className="space-y-4">
                        {[
                          { t1: 'Velocity Gaming', t2: 'Reckoning Esports', game: 'Valorant', score: '13 : 11', status: 'LIVE', details: 'Grand Finals • Completed' },
                          { t1: 'GodLike Esports', t2: 'Team Soul', game: 'BGMI', score: '0 : 0', status: 'UPCOMING', details: 'Round of 16 • Starts in 1h' },
                          { t1: 'True Rippers', t2: 'Entity Gaming', score: '2 : 0', game: 'CS2', status: 'COMPLETED', details: 'Semi Finals • Completed' }
                        ].map((match, idx) => (
                          <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                            <div className="space-y-1">
                              <span className="text-[9px] text-gaming-blue font-bold uppercase block">{match.game} • {match.status}</span>
                              <div className="flex items-center gap-3">
                                <span className="font-extrabold text-xs text-white">{match.t1}</span>
                                <span className="text-[10px] text-gray-500">vs</span>
                                <span className="font-extrabold text-xs text-white">{match.t2}</span>
                              </div>
                              <span className="text-[9px] text-gray-500 block">{match.details}</span>
                            </div>

                            <div className="text-right flex flex-col justify-center items-end gap-2">
                              <span className="font-black text-sm text-white tracking-widest font-mono bg-black/40 px-3 py-1.5 rounded">{match.score}</span>
                              {match.status === 'LIVE' && (
                                <span className="text-[8px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/25 animate-pulse flex items-center gap-1">
                                  ● STREAM ACTIVE
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedMockup === 'teams' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-[10px] font-black text-gaming-purple uppercase tracking-widest">Clan Roster</span>
                          <h4 className="text-xl font-black text-white uppercase font-gaming">alpha team</h4>
                        </div>
                        <button className="px-3 py-1.5 bg-gaming-purple text-white text-[9px] font-black uppercase rounded">INVITE SQUAD</button>
                      </div>

                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">Roster Members (1 / 6)</span>
                        
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs">
                            <thead>
                              <tr className="border-b border-white/10 text-gray-500 uppercase tracking-wider text-[9px] font-black">
                                <th className="pb-2">Player Name</th>
                                <th className="pb-2">Role</th>
                                <th className="pb-2">Primary Game</th>
                                <th className="pb-2">Rank</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="text-white">
                                <td className="py-3 flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-gaming-purple/20 border border-gaming-purple/35 flex items-center justify-center text-[10px] font-bold text-white">AM</div>
                                  <span>anandmohan</span>
                                  <span className="text-[7px] px-1 bg-gaming-purple/20 text-gaming-purple border border-gaming-purple/35 rounded font-black">OWNER</span>
                                </td>
                                <td>Captain / IGL</td>
                                <td>Free Fire</td>
                                <td className="text-gaming-blue font-bold">Diamond IV</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMockup === 'leaderboard' && (
                    <div className="space-y-6">
                      <div>
                        <span className="text-[10px] font-black text-gaming-purple uppercase tracking-widest">Global Standings</span>
                        <h4 className="text-xl font-black text-white uppercase font-gaming">Leaderboard Rankings</h4>
                      </div>

                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                        {/* Leaderboard Header */}
                        <div className="grid grid-cols-12 text-[9px] font-black text-gray-500 uppercase tracking-wider border-b border-white/5 pb-2">
                          <div className="col-span-2">Rank</div>
                          <div className="col-span-4">Player</div>
                          <div className="col-span-3">Score Rating</div>
                          <div className="col-span-3 text-right">Win Rate</div>
                        </div>

                        {/* Top rows */}
                        {[
                          { rank: '1', name: 'SlayerX', score: '3820 RP', wr: '75%', color: 'text-yellow-400' },
                          { rank: '2', name: 'JONATHAN', score: '3750 RP', wr: '72%', color: 'text-gray-300' },
                          { rank: '3', name: 'Mortal', score: '3690 RP', wr: '69%', color: 'text-amber-600' },
                          { rank: '4', name: 'anandmohan', score: '3250 RP', wr: '68%', color: 'text-white' }
                        ].map((row, idx) => (
                          <div key={idx} className="grid grid-cols-12 text-xs font-semibold py-2 border-b border-white/5 last:border-0 text-white">
                            <div className={`col-span-2 font-black ${row.color}`}>#{row.rank}</div>
                            <div className="col-span-4 font-bold">{row.name}</div>
                            <div className="col-span-3 text-gaming-blue font-bold">{row.score}</div>
                            <div className="col-span-3 text-right text-gray-400">{row.wr}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedMockup === 'stats' && (
                    <div className="space-y-6">
                      <span className="text-[10px] font-black text-gaming-purple uppercase tracking-widest block">Performance analytics</span>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Accuracy bars */}
                        <div className="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Weapon Accuracy</span>
                          
                          <div className="space-y-3">
                            {[
                              { weapon: 'Vandal', acc: '42%', kills: '486 Kills', color: 'bg-gaming-purple' },
                              { weapon: 'Phantom', acc: '35%', kills: '324 Kills', color: 'bg-gaming-blue' },
                              { weapon: 'Operator', acc: '82%', kills: '208 Kills', color: 'bg-gaming-purple' }
                            ].map((w, idx) => (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between text-xs font-semibold">
                                  <span className="text-white">{w.weapon}</span>
                                  <span className="text-gray-400">{w.acc} ({w.kills})</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                  <div className={`h-full ${w.color}`} style={{ width: w.acc }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Map win rates */}
                        <div className="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Map Win Rates</span>
                          
                          <div className="space-y-3">
                            {[
                              { map: 'Ascent', rate: '72%', played: '38 Played', color: 'bg-gaming-blue' },
                              { map: 'Bind', rate: '58%', played: '29 Played', color: 'bg-gaming-blue' },
                              { map: 'Haven', rate: '64%', played: '43 Played', color: 'bg-gaming-blue' }
                            ].map((m, idx) => (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between text-xs font-semibold">
                                  <span className="text-white">{m.map}</span>
                                  <span className="text-gray-400">{m.rate} ({m.played})</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                  <div className={`h-full ${m.color}`} style={{ width: m.rate }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMockup === 'wallet' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-[10px] font-black text-gaming-purple uppercase tracking-widest">Escrow Settlement</span>
                          <h4 className="text-xl font-black text-white uppercase font-gaming">My Wallet</h4>
                        </div>
                        <button className="px-3 py-1.5 bg-gaming-purple text-white text-[9px] font-black uppercase rounded">WITHDRAW FUNDS</button>
                      </div>

                      {/* Balances */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { title: 'AVAILABLE BALANCE', val: '₹ 4,398', color: 'text-white' },
                          { title: 'TOTAL EARNINGS', val: '₹ 12,500', color: 'text-gaming-blue' },
                          { title: 'PENDING APPROVALS', val: '₹ 0', color: 'text-yellow-500' }
                        ].map((bal, idx) => (
                          <div key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                            <span className="text-[9px] text-gray-500 font-bold block">{bal.title}</span>
                            <span className={`text-xl font-black mt-1 block ${bal.color}`}>{bal.val}</span>
                          </div>
                        ))}
                      </div>

                      {/* Ledger History */}
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-3">Transaction Ledger</span>
                        <div className="space-y-2.5">
                          {[
                            { id: '#TXN_693125', event: 'UPI Withdrawal Request', amount: '- ₹ 1,022', status: 'PENDING', date: '12 Jun 2026', color: 'text-yellow-500 bg-yellow-500/10' },
                            { id: '#TXN_948271', event: 'Valorant Cup #12 Payout', amount: '+ ₹ 1,000', status: 'COMPLETED', date: '28 May 2026', color: 'text-green-400 bg-green-500/10' },
                            { id: '#TXN_940293', event: 'Cash Withdrawal Request', amount: '- ₹ 2,500', status: 'COMPLETED', date: '20 May 2026', color: 'text-green-400 bg-green-500/10' }
                          ].map((t, idx) => (
                            <div key={idx} className="flex justify-between items-center text-xs border-b border-white/5 pb-2 last:border-0 last:pb-0">
                              <div>
                                <span className="font-bold text-white block">{t.event}</span>
                                <span className="text-[9px] text-gray-500 block">{t.id} • {t.date}</span>
                              </div>
                              <div className="text-right">
                                <span className="font-extrabold text-white block">{t.amount}</span>
                                <span className={`text-[8px] px-1.5 py-0.5 rounded font-black ${t.color}`}>{t.status}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMockup === 'messages' && (
                    <div className="grid grid-cols-12 gap-4 h-[440px]">
                      {/* Sidebar channels */}
                      <div className="col-span-4 border-r border-white/5 pr-4 space-y-4">
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-wider block">DIRECT MESSAGES</span>
                        
                        <div className="space-y-2">
                          {[
                            { name: 'STAGECORE ADMIN', status: 'ONLINE', bg: 'bg-gaming-purple' },
                            { name: 'SLAYER (TEAMMATE)', status: 'AWAY', bg: 'bg-gaming-blue' },
                            { name: 'COACH_RED', status: 'OFFLINE', bg: 'bg-gray-600' }
                          ].map((ch, idx) => (
                            <div key={idx} className="p-2.5 hover:bg-white/5 rounded-xl cursor-pointer flex items-center gap-3">
                              <div className={`w-3.5 h-3.5 rounded-full ${ch.bg}`} />
                              <div>
                                <span className="text-xs font-bold text-white block leading-none">{ch.name}</span>
                                <span className="text-[8px] text-gray-500 uppercase tracking-wider block mt-1">{ch.status}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Chat messages */}
                      <div className="col-span-8 flex flex-col justify-between">
                        <div className="border-b border-white/5 pb-2 mb-4">
                          <span className="text-xs font-black text-white block">STAGECORE ADMIN (SUPPORT)</span>
                          <span className="text-[8px] text-green-400 block uppercase">ONLINE MODERATOR</span>
                        </div>

                        <div className="flex-grow space-y-3 overflow-y-auto custom-scrollbar pr-2">
                          <div className="p-3 bg-white/5 border border-white/5 rounded-2xl text-xs text-gray-300 max-w-md">
                            Welcome AnandYT! If you have any inquiries regarding the StageCore cups, payment procedures, or anti-cheat policies, please contact us here.
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-white/5">
                          <input type="text" disabled placeholder="Message StageCore Admin (Support)..." className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none" />
                          <button className="p-2.5 bg-gaming-purple text-white rounded-xl shrink-0"><Send size={14} /></button>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMockup === 'organizer' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-[10px] font-black text-gaming-purple uppercase tracking-widest">Admin Panel</span>
                          <h4 className="text-xl font-black text-white uppercase font-gaming">Organizer Console</h4>
                        </div>
                        <span className="px-2.5 py-1 text-[9px] bg-gaming-blue/15 text-gaming-blue rounded font-black border border-gaming-blue/20">ROOT PRIVILEGES</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { title: 'ACTIVE DISPUTES', val: '0', action: 'All Resolved' },
                          { title: 'PENDING CHECK-INS', val: '14 Teams', action: 'Locking in 8m' },
                          { title: 'BROADCAST KEYS', val: 'Active (3)', action: 'View RTMP streams' }
                        ].map((item, idx) => (
                          <div key={idx} className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                            <span className="text-[9px] text-gray-500 font-bold block">{item.title}</span>
                            <span className="text-xl font-black text-white block mt-1">{item.val}</span>
                            <span className="text-[9px] text-gaming-blue font-semibold block mt-0.5">{item.action}</span>
                          </div>
                        ))}
                      </div>

                      {/* Moderation dispute list */}
                      <div className="p-4 bg-white/5 border border-white/15 rounded-2xl space-y-3">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Dispute Moderation Queue</span>
                        
                        <div className="text-xs p-3 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center text-gray-300">
                          <div>
                            <span className="font-bold text-white block">Valorant Cup #12: Team Alpha vs GodLike</span>
                            <span className="text-[9px] text-gray-500 block">Reported reason: Disconnect map reload dispute</span>
                          </div>
                          <span className="px-2.5 py-1 bg-green-500/15 text-green-400 rounded font-black text-[9px] border border-green-500/20">RESOLVED</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Business Model Tab */}
        {activeTab === 'business' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-7xl mx-auto px-4 py-12 space-y-16"
          >
            {/* Revenue breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <span className="text-gaming-purple font-extrabold text-xs uppercase tracking-widest">Financial Engine</span>
                <h3 className="text-3xl sm:text-4xl font-black text-white uppercase mt-1">Multi-Channel Monetization</h3>
                <p className="text-gray-400 mt-4 leading-relaxed text-sm">
                  StageCore generates strong, diversified cashflows across both B2C player fees and B2B corporate partnerships. Because we own the tournaments and broadcast rights directly, we control the entire value chain.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  {[
                    { title: 'Tournament Entry Fees', desc: 'Premium cups require squad buy-in entries with high platform service margin.' },
                    { title: 'Sponsorship Channels', desc: 'Hardware, gears, and media ads embedded directly in live match broadcast streams.' },
                    { title: 'Premium Subscriptions', desc: 'Premium gamer memberships unlock advanced statistics, profile cards, and badges.' },
                    { title: 'Offline Event Ticketing', desc: 'Local LAN tournament tickets, team merchandises, and offline spectator sales.' }
                  ].map((rev, idx) => (
                    <div key={idx} className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                      <span className="font-extrabold text-xs text-white uppercase block">{rev.title}</span>
                      <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">{rev.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Graphic distribution breakdown */}
              <div className="glass-panel p-8 rounded-3xl border border-white/10 text-left bg-gradient-to-br from-[#0c051a] to-[#050816]">
                <span className="text-[10px] font-black text-gaming-blue uppercase tracking-widest block mb-6">Revenue Stream Allocation</span>

                <div className="space-y-4">
                  {[
                    { name: 'B2B Brand Sponsorships & Stream Ads', pct: '40%', color: 'bg-gaming-purple' },
                    { name: 'B2C Tournament Entry Margins', pct: '25%', color: 'bg-gaming-blue' },
                    { name: 'Gamer Premium Memberships', pct: '20%', color: 'bg-gaming-purple' },
                    { name: 'Media Content & Merchandise Licences', pct: '15%', color: 'bg-gaming-blue' }
                  ].map((stream, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold text-gray-300">
                        <span>{stream.name}</span>
                        <span className="text-white font-bold">{stream.pct}</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${stream.color}`} style={{ width: stream.pct }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Competitive Comparison Matrix */}
            <div className="border-t border-white/5 pt-16">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-gaming-blue font-extrabold text-xs uppercase tracking-widest">Market Advantage</span>
                <h3 className="text-3xl font-black text-white uppercase mt-1">Why StageCore Wins</h3>
                <p className="text-gray-400 mt-2 text-sm">A side-by-side matrix showing our feature-loop against current alternatives.</p>
              </div>

              <div className="overflow-x-auto glass-panel rounded-3xl border border-white/10 max-w-5xl mx-auto">
                <table className="w-full text-left text-xs min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/15 bg-white/5 text-gray-400 uppercase tracking-wider text-[9px] font-black">
                      <th className="p-4">Competitor Value Matrix</th>
                      <th className="p-4 text-gaming-purple">STAGECORE</th>
                      <th className="p-4">FACEIT</th>
                      <th className="p-4">Battlefy</th>
                      <th className="p-4">Discord Lobbies</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    {[
                      { item: 'Official Operations Staff', c: '100% Direct', f: 'Crowdsourced', b: 'Third-party only', d: 'Manual / Siloed' },
                      { item: 'Integrated Gaming Social Network', c: 'Included', f: 'Profile-only', b: 'No', d: 'Lobbies-only' },
                      { item: 'Escrow Prize Wallet Ledgers', c: 'Instant (UPI/Bank)', f: 'Store Points', b: 'Manual Paypal', d: 'None' },
                      { item: 'Elo-based Rank Engine', c: 'Dynamic (RP ratings)', f: 'CS2 Only', b: 'Static Brackets', d: 'None' },
                      { item: 'Dispute Moderation Center', c: 'Admin Checked', f: 'Ticket system', b: 'Organizer responsibility', d: 'Manual' }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition">
                        <td className="p-4 font-bold text-white">{row.item}</td>
                        <td className="p-4 text-gaming-purple font-black">{row.c}</td>
                        <td className="p-4">{row.f}</td>
                        <td className="p-4">{row.b}</td>
                        <td className="p-4">{row.d}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Strategic Roadmap */}
            <div className="border-t border-white/5 pt-16">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-gaming-purple font-extrabold text-xs uppercase tracking-widest">Growth Plan</span>
                <h3 className="text-3xl font-black text-white uppercase mt-1">StageCore Strategic Roadmap</h3>
                <p className="text-gray-400 mt-2 text-sm">Our structured milestone roadmap towards scaling the brand internationally.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
                {[
                  { phase: 'Phase 1', title: 'Official Cups', desc: 'Secure regional titles, complete anti-cheat integrity systems, launch beta dashboard.' },
                  { phase: 'Phase 2', title: 'National Circuits', desc: 'Expand to state-level competitive streams with physical merchandise payouts.' },
                  { phase: 'Phase 3', title: 'Offline LAN Events', desc: 'Host live-casted grassroots championship finals in major cyber arenas.' },
                  { phase: 'Phase 4', title: 'Professional Leagues', desc: 'Launch franchise contracts, sponsorships slots, and team licenses.' },
                  { phase: 'Phase 5', title: 'Intl. Expansion', desc: 'Scale the platform to SEA and LATAM markets with localized tournament channels.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-5 glass-panel border border-white/5 rounded-2xl flex flex-col justify-between h-44 hover:border-gaming-blue/30 transition duration-300">
                    <div>
                      <span className="text-[10px] text-gaming-blue font-black uppercase tracking-widest">{item.phase}</span>
                      <h4 className="font-extrabold text-sm text-white uppercase mt-2">{item.title}</h4>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed mt-2">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Closing Pitch Call to Action */}
            <div className="p-8 glass-panel border border-white/10 rounded-3xl bg-gradient-to-r from-gaming-purple/10 to-gaming-blue/10 text-center max-w-4xl mx-auto space-y-6">
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase font-gaming">Let's build the operating system for competitive gaming.</h3>
              <p className="text-xs text-gray-300 max-w-2xl mx-auto leading-relaxed">
                StageCore is uniquely positioned to capture and monetize grassroots esports attention. Contact our partnerships department for investment briefs, accelerator documentation, and media kit inquiries.
              </p>
              <div className="flex justify-center gap-4">
                <a 
                  href="mailto:partnerships@stagecore.com"
                  className="px-6 py-2.5 bg-gaming-purple hover:bg-gaming-purple/95 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition"
                >
                  Contact Investor Desk
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
