import React from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import { useAuth } from '../../context/AuthContext';
import {
  Trophy, Swords, Newspaper, Handshake, Image, PlusCircle,
  RefreshCw, BookOpen, Star, Share2, LayoutDashboard,
  ExternalLink, ArrowRight, TrendingUp, Zap, Users, Eye
} from 'lucide-react';

const statusColors = {
  LIVE: 'bg-red-500/20 text-red-400 border border-red-500/30',
  UPCOMING: 'bg-gaming-blue/20 text-gaming-blue border border-gaming-blue/30',
  COMPLETED: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
};

const StatCard = ({ label, count, icon: Icon, colorClass, glowColor }) => (
  <div className="glass-panel rounded-2xl p-5 flex items-center gap-4 hover:scale-[1.02] transition-all duration-300 group">
    <div
      className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${colorClass} shadow-lg group-hover:scale-110 transition-transform duration-300`}
      style={{ boxShadow: `0 0 20px ${glowColor}` }}
    >
      <Icon size={22} className="text-white" />
    </div>
    <div>
      <div className="text-3xl font-black text-white leading-none">{count}</div>
      <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1">{label}</div>
    </div>
  </div>
);

const quickActions = [
  { id: 'hero',         label: 'Edit Hero',        icon: Image,      color: 'from-gaming-purple to-purple-800' },
  { id: 'tournaments',  label: 'Add Tournament',   icon: PlusCircle, color: 'from-gaming-blue to-cyan-700' },
  { id: 'matches',      label: 'Update Scores',    icon: RefreshCw,  color: 'from-gaming-purple to-indigo-700' },
  { id: 'news',         label: 'Add News',         icon: BookOpen,   color: 'from-gaming-blue to-teal-700' },
  { id: 'sponsors',     label: 'Edit Sponsors',    icon: Star,       color: 'from-gaming-purple to-violet-700' },
  { id: 'social',       label: 'Social Links',     icon: Share2,     color: 'from-gaming-blue to-blue-700' },
];

export const AdminDashboard = ({ setActivePage }) => {
  const { content } = useSiteContent();
  const { user } = useAuth();

  const tournaments = content.tournaments || [];
  const matches     = content.matches     || [];
  const news        = content.news        || [];
  const sponsors    = content.sponsors    || [];

  const recentTournaments = tournaments.slice(0, 4);

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-xl bg-gaming-purple/20 border border-gaming-purple/30 flex items-center justify-center">
              <LayoutDashboard size={16} className="text-gaming-purple" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Admin Dashboard</h1>
          </div>
          <p className="text-gaming-blue font-semibold text-sm pl-11">
            Welcome back,{' '}
            <span className="text-gaming-purple">{user?.username || 'Admin'}</span>
            &nbsp;— manage your StageCore platform below.
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gaming-purple/20 hover:bg-gaming-purple/30 border border-gaming-purple/30 text-gaming-purple font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:shadow-[0_0_16px_rgba(124,58,237,0.3)] group self-start sm:self-auto"
        >
          <ExternalLink size={13} className="group-hover:scale-110 transition-transform" />
          Go to Public Site
        </a>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Total Tournaments"
          count={tournaments.length}
          icon={Trophy}
          colorClass="bg-gradient-to-br from-gaming-purple to-purple-900"
          glowColor="rgba(124,58,237,0.4)"
        />
        <StatCard
          label="Total Matches"
          count={matches.length}
          icon={Swords}
          colorClass="bg-gradient-to-br from-gaming-blue to-cyan-900"
          glowColor="rgba(6,182,212,0.4)"
        />
        <StatCard
          label="News Articles"
          count={news.length}
          icon={Newspaper}
          colorClass="bg-gradient-to-br from-gaming-purple to-indigo-900"
          glowColor="rgba(124,58,237,0.3)"
        />
        <StatCard
          label="Sponsors"
          count={sponsors.length}
          icon={Handshake}
          colorClass="bg-gradient-to-br from-gaming-blue to-teal-900"
          glowColor="rgba(6,182,212,0.3)"
        />
      </div>

      {/* ── Content Body ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ── Quick Actions ── */}
        <div className="xl:col-span-1 glass-panel rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Zap size={16} className="text-gaming-purple" />
            <h2 className="text-sm font-black text-white uppercase tracking-wider">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => setActivePage(id)}
                className="group glass-panel rounded-xl p-4 flex flex-col items-center gap-2 hover:scale-[1.04] hover:border-white/10 transition-all duration-200 cursor-pointer border border-white/5 text-center"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:shadow-gaming-purple/30 transition-shadow duration-300`}
                >
                  <Icon size={18} className="text-white" />
                </div>
                <span className="text-[11px] font-bold text-gray-300 group-hover:text-white uppercase tracking-wide leading-tight transition-colors duration-200">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Recent Tournaments ── */}
        <div className="xl:col-span-2 glass-panel rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-gaming-blue" />
              <h2 className="text-sm font-black text-white uppercase tracking-wider">Recent Tournaments</h2>
            </div>
            <button
              onClick={() => setActivePage('tournaments')}
              className="inline-flex items-center gap-1 text-[11px] text-gaming-blue hover:text-white font-bold uppercase tracking-wider transition-colors duration-200 group cursor-pointer"
            >
              View All
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {recentTournaments.length > 0 ? (
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-sm min-w-[480px]">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold pb-3 pr-4">Tournament</th>
                    <th className="text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold pb-3 pr-4">Game</th>
                    <th className="text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold pb-3 pr-4">Status</th>
                    <th className="text-right text-[10px] uppercase tracking-widest text-gray-500 font-bold pb-3">Prize</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentTournaments.map((t) => (
                    <tr key={t.id} className="group hover:bg-white/3 transition-colors duration-150">
                      <td className="py-3 pr-4">
                        <span className="font-semibold text-white text-xs truncate max-w-[180px] block">{t.name}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-xs text-gray-400 font-medium">{t.game}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${statusColors[t.status] || statusColors.COMPLETED}`}>
                          {t.status === 'LIVE' && (
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 mr-1.5 animate-pulse" />
                          )}
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <span className="text-xs font-black text-gaming-purple">{t.prize}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
              <Trophy size={32} className="text-gray-700 mb-3" />
              <p className="text-gray-500 text-sm font-medium">No tournaments yet.</p>
              <button
                onClick={() => setActivePage('tournaments')}
                className="mt-3 text-xs text-gaming-purple hover:underline font-bold cursor-pointer"
              >
                Add your first tournament →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Platform Snapshot ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gaming-purple/20 border border-gaming-purple/30 flex items-center justify-center flex-shrink-0">
            <TrendingUp size={18} className="text-gaming-purple" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Live Matches</div>
            <div className="text-xl font-black text-white mt-0.5">
              {matches.filter(m => m.status === 'LIVE').length}
              <span className="text-sm text-red-400 font-bold ml-1">● LIVE</span>
            </div>
          </div>
        </div>
        <div className="glass-panel rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gaming-blue/20 border border-gaming-blue/30 flex items-center justify-center flex-shrink-0">
            <Users size={18} className="text-gaming-blue" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Players Reached</div>
            <div className="text-xl font-black text-white mt-0.5">
              {content.stats?.[0]?.value || '—'}
            </div>
          </div>
        </div>
        <div className="glass-panel rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gaming-purple/20 border border-gaming-purple/30 flex items-center justify-center flex-shrink-0">
            <Eye size={18} className="text-gaming-purple" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Views Generated</div>
            <div className="text-xl font-black text-white mt-0.5">
              {content.stats?.[2]?.value || '—'}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
