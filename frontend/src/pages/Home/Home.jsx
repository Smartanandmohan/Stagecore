import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useSiteContent } from '../../context/SiteContentContext';
import { Hero } from '../../components/Hero/Hero';
import { TournamentCard } from '../../components/TournamentCard/TournamentCard';
import { MatchCard } from '../../components/MatchCard/MatchCard';
import { RankingCard } from '../../components/RankingCard/RankingCard';
import { SponsorSection } from '../../components/SponsorSection/SponsorSection';
import {
  ShieldAlert, Radio, Scale, Users, Award, AlertCircle, CheckCircle, ChevronRight, Sparkles
} from 'lucide-react';

const FEATURE_ICONS = [ShieldAlert, Radio, Scale, Users, Award];
const FEATURE_COLORS = ['gaming-purple', 'gaming-blue', 'gaming-purple', 'gaming-blue', 'gaming-purple'];

export const Home = ({ onOpenAuth }) => {
  const { user, token, API_BASE_URL } = useAuth();
  const { content } = useSiteContent();
  const {
    tournaments, matches, teamRankings, playerRankings, news,
    features, tournamentsHeading, tournamentsSubtext
  } = content;

  const [tournamentFilter, setTournamentFilter] = useState('ALL');
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [playerInGameIds, setPlayerInGameIds] = useState('');
  const [regSuccess, setRegSuccess] = useState('');
  const [regError, setRegError] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  const handleRegisterClick = (tournament) => {
    if (!user) { onOpenAuth('login'); return; }
    setSelectedTournament(tournament);
    setRegSuccess('');
    setRegError('');
    setTeamName('');
    setPlayerInGameIds('');
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegLoading(true);
    setRegSuccess('');
    setRegError('');
    try {
      await axios.post(
        `${API_BASE_URL}/tournaments/${selectedTournament.id}/register`,
        { teamName, playerInGameIds: playerInGameIds.split(',').map(s => s.trim()) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRegSuccess(`Successfully registered team "${teamName}" for ${selectedTournament.name}!`);
    } catch {
      setRegSuccess(`Successfully registered team "${teamName}" for ${selectedTournament.name}! (Mock confirmation)`);
    } finally {
      setRegLoading(false);
      setTimeout(() => setSelectedTournament(null), 2000);
    }
  };

  const filteredTournaments = tournaments.filter(t =>
    tournamentFilter === 'ALL' || t.game.toLowerCase() === tournamentFilter.toLowerCase()
  );

  // Unique game filters from current tournament list
  const gameFilters = ['ALL', ...Array.from(new Set(tournaments.map(t => t.game)))];

  return (
    <div>
      {/* Small Premium StageCore Demo Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 text-left">
        <div className="glass-panel border-gaming-purple/40 bg-gradient-to-r from-gaming-purple/15 via-[#03050f]/80 to-gaming-blue/15 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_0_30px_rgba(124,58,237,0.15)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gaming-purple/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-start gap-3.5 relative z-10">
            <div className="p-2.5 bg-gaming-purple/20 text-gaming-neon rounded-xl border border-gaming-purple/30 shrink-0 mt-0.5 sm:mt-0 shadow-md">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-white uppercase tracking-wider flex items-center gap-2 font-gaming">
                🚀 StageCore Demo
              </h3>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed max-w-4xl font-light">
                You are viewing the official demonstration version of StageCore. This build has been prepared exclusively for startup competitions, investors, mentors and product evaluation. Some features use realistic simulated data.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <Hero onOpenAuth={onOpenAuth} onRegisterTournament={handleRegisterClick} />

      {/* Features */}
      <section className="py-16 bg-[#03050f] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, i) => {
            const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
            const color = FEATURE_COLORS[i % FEATURE_COLORS.length];
            return (
              <div key={i} className="flex flex-col items-start text-left p-5 glass-panel rounded-2xl border border-white/5">
                <div className={`p-3 bg-${color}/15 text-${color} rounded-xl mb-4 border border-${color}/20`}>
                  <Icon size={20} />
                </div>
                <h4 className="font-extrabold text-sm text-white uppercase tracking-wider font-gaming">{feature.title}</h4>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tournaments */}
      <section id="tournaments" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="text-left">
            <span className="text-gaming-purple font-extrabold text-xs uppercase tracking-widest">Our Tournaments</span>
            <h2 className="text-3xl sm:text-4xl font-black font-gaming text-white uppercase mt-1">{tournamentsHeading}</h2>
            <p className="text-gray-400 mt-2 text-sm max-w-xl">{tournamentsSubtext}</p>
          </div>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto">
            {gameFilters.map(game => (
              <button
                key={game}
                onClick={() => setTournamentFilter(game)}
                className={`px-4 py-2 text-xs font-bold uppercase rounded-lg border transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  tournamentFilter === game
                    ? 'bg-gaming-purple border-gaming-purple text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                    : 'border-white/5 hover:border-white/15 text-gray-400 hover:text-white'
                }`}
              >
                {game}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTournaments.map(t => (
            <TournamentCard key={t.id} tournament={t} onRegister={handleRegisterClick} />
          ))}
        </div>
      </section>

      {/* Live Matches */}
      <section id="matches" className="py-20 bg-[#03050f] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-10">
            <span className="text-red-500 font-extrabold text-xs uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
              Broadcasting Now
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-gaming text-white uppercase mt-1">Live Matches & Streams</h2>
            <p className="text-gray-400 mt-2 text-sm max-w-xl">Follow active scores, rounds details, and tune in to official shoutcasted streams.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      </section>

      {/* Rankings */}
      <section id="rankings" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RankingCard items={teamRankings} type="team" />
        <RankingCard items={playerRankings} type="player" />
      </section>

      {/* News */}
      <section id="news" className="py-20 bg-[#03050f] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gaming-purple font-extrabold text-xs uppercase tracking-widest">News & Media</span>
            <h2 className="text-3xl sm:text-4xl font-black font-gaming text-white uppercase mt-1">Latest Updates</h2>
            <p className="text-gray-400 mt-2 text-sm">Keep up with StageCore event announcements, policy updates, and articles.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {news.map(article => (
              <div
                key={article.id}
                className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col justify-between h-full group hover:border-gaming-purple/35 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold text-gaming-blue uppercase tracking-wider mb-4">
                    <span>{article.category}</span>
                    <span className="text-gray-500">{article.date}</span>
                  </div>
                  <h4 className="text-base font-bold font-gaming text-white group-hover:text-gaming-purple transition-colors duration-300 mb-2 leading-snug line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-light mt-2 line-clamp-3">{article.desc}</p>
                </div>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5 text-[10px] text-gray-400">
                  <span>{article.readTime}</span>
                  <a href="#" className="flex items-center gap-0.5 text-gaming-blue font-bold cursor-pointer">
                    <span>Read Article</span>
                    <ChevronRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <SponsorSection />

      {/* Registration Modal */}
      {selectedTournament && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl text-left">
            <button
              onClick={() => setSelectedTournament(null)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white rounded-lg bg-white/5 border border-white/5 cursor-pointer"
            >
              <ChevronRight size={18} className="rotate-45" />
            </button>
            <h3 className="text-xl font-bold font-gaming text-white uppercase mb-1">Tournament Registration</h3>
            <p className="text-xs text-gaming-blue font-bold uppercase mb-6">{selectedTournament.name}</p>
            {regError && (
              <div className="mb-4 flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-semibold">
                <AlertCircle size={14} /><span>{regError}</span>
              </div>
            )}
            {regSuccess && (
              <div className="mb-4 flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/25 text-green-400 text-xs font-semibold">
                <CheckCircle size={14} /><span>{regSuccess}</span>
              </div>
            )}
            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Team Name</label>
                <input
                  type="text" required value={teamName}
                  onChange={e => setTeamName(e.target.value)}
                  placeholder="Enter your team/squad name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-gaming-blue/50 text-white text-sm outline-none transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Player In-Game IDs (Comma Separated)</label>
                <textarea
                  required value={playerInGameIds}
                  onChange={e => setPlayerInGameIds(e.target.value)}
                  placeholder="e.g. Slayer#1234, Hunter#4521, ..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-gaming-blue/50 text-white text-sm outline-none transition-all duration-300 resize-none"
                />
              </div>
              <button
                type="submit" disabled={regLoading}
                className="w-full mt-4 py-3.5 bg-gaming-purple hover:bg-gaming-purple/90 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(124,58,237,0.3)] cursor-pointer"
              >
                {regLoading ? 'Registering Squad...' : 'Confirm Registration'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
