import React from 'react';
import { Calendar, Trophy, Users, Shield } from 'lucide-react';

export const TournamentCard = ({ tournament, onRegister }) => {
  const { id, name, game, image, mode, format, prize, date, status } = tournament;

  const statusStyles = {
    LIVE: 'bg-red-500/10 text-red-400 border-red-500/30',
    UPCOMING: 'bg-gaming-blue/10 text-gaming-blue border-gaming-blue/30',
    COMPLETED: 'bg-gray-500/10 text-gray-400 border-gray-500/30',
  };

  return (
    <div className="glass-panel p-4 rounded-2xl border border-white/5 shadow-xl hover:border-gaming-purple/40 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] transition-all duration-300 flex flex-col h-full group relative">
      {/* Game Image */}
      <div className="h-44 w-full rounded-xl overflow-hidden relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gaming-bg/90 to-transparent" />
        
        {/* Status Badge */}
        <span className={`absolute top-3 left-3 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md border ${statusStyles[status] || 'bg-white/10 text-white border-white/10'}`}>
          {status}
        </span>
      </div>

      {/* Details */}
      <div className="mt-4 flex-grow flex flex-col text-left">
        <div className="flex items-center gap-1.5 text-xs text-gaming-blue font-bold uppercase tracking-wider">
          <Shield size={12} />
          <span>{game}</span>
        </div>
        <h4 className="text-base font-bold font-gaming text-white mt-1 group-hover:text-gaming-blue transition-colors duration-300 line-clamp-1">
          {name}
        </h4>

        <div className="grid grid-cols-2 gap-y-2 mt-4 text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <Users size={12} className="text-gaming-purple" />
            <span>Format: {format}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield size={12} className="text-gaming-blue" />
            <span>Mode: {mode}</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <Trophy size={12} className="text-gaming-neon" />
            <span className="font-bold text-white">Prize: {prize}</span>
          </div>
        </div>

        <hr className="border-white/5 my-4" />

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1 text-[11px] text-gray-400">
            <Calendar size={12} />
            <span>{date}</span>
          </div>

          {status === 'UPCOMING' && (
            <button
              onClick={() => onRegister(tournament)}
              className="px-4 py-2 bg-gaming-purple hover:bg-gaming-purple/90 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all duration-300 shadow-[0_2px_10px_rgba(124,58,237,0.2)] cursor-pointer"
            >
              Register
            </button>
          )}
          {status === 'LIVE' && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-[10px] font-bold text-red-400">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              Live Now
            </span>
          )}
          {status === 'COMPLETED' && (
            <span className="text-xs font-semibold text-gray-500">Ended</span>
          )}
        </div>
      </div>
    </div>
  );
};
