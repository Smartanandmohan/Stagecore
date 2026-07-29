import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Trophy,
  CreditCard,
  Lock,
  Settings,
  BookOpen
} from 'lucide-react';

export const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [openIndexes, setOpenIndexes] = useState([]);

  const faqData = [
    {
      category: 'GENERAL',
      question: 'What is StageCore?',
      answer: 'StageCore is an esports tournament hub where players can join public scrims, register for competitive leagues, track detailed gameplay statistics, and earn cash prize pools under active moderator inspection.'
    },
    {
      category: 'TOURNAMENTS',
      question: 'How do I register my squad for a tournament?',
      answer: 'Create a StageCore account, navigate to the Tournaments section on our homepage, select your game (Valorant, BGMI, CS2), and click Register. Enter your team name and all players Riot IDs or character codes.'
    },
    {
      category: 'SECURITY',
      question: 'Does StageCore use an anti-cheat?',
      answer: 'Yes. StageCore implements custom server-side checks, memory inspections, and client-side hardware signatures to detect aimbots, wallhacks, scripts, and other prohibited tools. For details, read our Anti-Cheat page.'
    },
    {
      category: 'PAYOUTS',
      question: 'How long do prize pool distributions take?',
      answer: 'Payouts are cleared within 14-30 business days following the tournament finals. All players undergo anti-cheat audits and identity checks before funds are distributed via Stripe, PayPal, or wire transfer.'
    },
    {
      category: 'TOURNAMENTS',
      question: 'Can we change roster players after registration lock?',
      answer: 'No. Roster entries lock exactly 2 hours prior to bracket seeding. Post-lock substitutions are only permitted under absolute emergencies (e.g. server failure or sickness) and require senior admin authorization.'
    },
    {
      category: 'SECURITY',
      question: 'What happens if I get falsely banned?',
      answer: 'If you suspect you were banned due to background software or overlay compatibility errors, submit your hardware logs via the Ban Appeal form on our Anti-Cheat page. Our engineers will audit the case.'
    },
    {
      category: 'PAYOUTS',
      question: 'Are there registration entry fees?',
      answer: 'Most grassroots StageCore events are completely free to enter. However, certain elite professional tournaments might require entry fees, which directly contribute to expanding the final prize pools.'
    },
    {
      category: 'GENERAL',
      question: 'How can I apply to become a moderator?',
      answer: 'We periodically recruit community moderators. Keep an eye on our official Discord server channels for application links, or reach out to us through our Contact form.'
    }
  ];

  const categories = ['ALL', 'GENERAL', 'TOURNAMENTS', 'SECURITY', 'PAYOUTS'];

  const toggleAccordion = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(prev => prev.filter(i => i !== index));
    } else {
      setOpenIndexes(prev => [...prev, index]);
    }
  };

  const filteredFaq = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'ALL' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'GENERAL': return <HelpCircle size={14} />;
      case 'TOURNAMENTS': return <Trophy size={14} />;
      case 'SECURITY': return <Lock size={14} />;
      case 'PAYOUTS': return <CreditCard size={14} />;
      default: return <Settings size={14} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-gray-200 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gaming-purple/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gaming-blue/5 rounded-full blur-3xl -z-10" />

      {/* Page Header */}
      <div className="max-w-4xl mx-auto text-center mb-12 relative z-10">
        <span className="text-gaming-blue font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2">
          <BookOpen size={14} /> Knowledge Center
        </span>
        <h1 className="text-4xl sm:text-5xl font-black font-gaming text-white uppercase tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-400 mt-2 text-sm max-w-xl mx-auto leading-relaxed">
          Search our knowledge base for answers to common questions about brackets, payments, security, and game rules.
        </p>
      </div>

      {/* Search and Filters Section */}
      <div className="max-w-3xl mx-auto mb-10 relative z-10 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or keywords..."
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-gaming-purple/50 text-white text-xs outline-none transition-all duration-300"
          />
          <Search size={14} className="absolute left-3.5 top-4 text-gray-500" />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-[10px] font-extrabold uppercase rounded-lg border transition-all duration-300 cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-gaming-purple border-gaming-purple text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                  : 'border-white/5 hover:border-white/15 text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Accordion Questions List */}
      <div className="max-w-3xl mx-auto relative z-10 flex flex-col gap-4">
        {filteredFaq.length === 0 ? (
          <div className="glass-panel p-10 rounded-2xl border border-white/5 text-center text-gray-500 text-xs">
            No results match your search queries. Try search terms like "cheat", "bracket", or "payout".
          </div>
        ) : (
          filteredFaq.map((faq, index) => {
            const isOpen = openIndexes.includes(index);
            return (
              <div
                key={index}
                className="glass-panel rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-white/5 text-gaming-blue border border-white/5 rounded-lg">
                      {getCategoryIcon(faq.category)}
                    </div>
                    <span className="text-xs sm:text-sm font-extrabold text-white font-gaming tracking-wide">
                      {faq.question}
                    </span>
                  </div>
                  <div className="text-gray-400">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>
                
                {/* Collapsible Answer Pane */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-56 border-t border-white/5 p-6 bg-white/2' : 'max-h-0 overflow-hidden'
                  }`}
                >
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
                    {faq.answer}
                  </p>
                  <span className="inline-block mt-4 text-[9px] font-extrabold text-gaming-purple tracking-widest bg-gaming-purple/10 border border-gaming-purple/20 px-2 py-0.5 rounded-full uppercase">
                    Category: {faq.category}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

export default FAQ;
