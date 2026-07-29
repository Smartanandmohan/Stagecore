import React from 'react';
import { Tv, Swords, Calendar } from 'lucide-react';

export const MatchCard = ({ match }) => {
  const { id, team1, team2, score1, score2, status, game, stage, time, streamUrl } = match;

  return (
    <div className="glass-panel p-5 rounded-2xl border border-white/5 shadow-xl hover:border-gaming-blue/30 transition-all duration-300 relative group overflow-hidden">
      {/* Glow highlight for Live matches */}
      {status === 'LIVE' && (
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-red-500 to-gaming-purple" />
      )}

      {/* Top Section: Game Name & Stage */}
      <div className="flex items-center justify-between text-xs mb-4">
        <span className="font-extrabold text-gaming-blue tracking-wide uppercase">{game}</span>
        <span className="text-gray-400 font-medium">{stage}</span>
      </div>

      {/* Versus Layout */}
      <div className="grid grid-cols-7 items-center justify-center my-6 gap-2">
        {/* Team 1 */}
        <div className="col-span-3 flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
            <span className="font-black text-white text-lg">{team1.substring(0, 2).toUpperCase()}</span>
          </div>
          <span className="font-bold text-sm text-white line-clamp-1 text-center">{team1}</span>
        </div>

        {/* Score / VS */}
        <div className="col-span-1 flex flex-col items-center justify-center">
          {status === 'LIVE' || status === 'COMPLETED' ? (
            <div className="flex items-center gap-1.5 justify-center">
              <span className={`text-xl font-black ${score1 > score2 ? 'text-white' : 'text-gray-400'}`}>{score1}</span>
              <span className="text-gray-500">:</span>
              <span className={`text-xl font-black ${score2 > score1 ? 'text-white' : 'text-gray-400'}`}>{score2}</span>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
              <Swords size={14} className="text-gaming-purple animate-pulse" />
            </div>
          )}
          <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded-md mt-2 ${
            status === 'LIVE' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
            status === 'COMPLETED' ? 'bg-white/5 text-gray-400' : 'bg-gaming-blue/10 text-gaming-blue border border-gaming-blue/20'
          }`}>
            {status}
          </span>
        </div>

        {/* Team 2 */}
        <div className="col-span-3 flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
            <span className="font-black text-white text-lg">{team2.substring(0, 2).toUpperCase()}</span>
          </div>
          <span className="font-bold text-sm text-white line-clamp-1 text-center">{team2}</span>
        </div>
      </div>

      {/* Footer / CTA */}
      <hr className="border-white/5 mb-4" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-[11px] text-gray-400">
          <Calendar size={12} />
          <span>{time}</span>
        </div>

        {status === 'LIVE' ? (
          <a
            href={streamUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all duration-300 shadow-[0_2px_10px_rgba(220,38,38,0.3)]"
          >
            <Tv size={12} />
            <span>Watch Live</span>
          </a>
        ) : status === 'UPCOMING' ? (
          <span className="text-[10px] text-gaming-blue font-bold tracking-wider uppercase">Match Scheduled</span>
        ) : (
          <span className="text-xs text-gray-500 font-semibold">Match Ended</span>
        )}
      </div>
    </div>
  );
};
