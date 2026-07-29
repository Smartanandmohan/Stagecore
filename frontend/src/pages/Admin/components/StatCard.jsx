import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  gradientClass = 'from-gaming-purple to-gaming-neon',
  indicatorColor = 'bg-gaming-purple'
}) => {
  // Parse trend if it's a string, or check isPositive flag
  const parsedIsPositive = typeof change === 'string' 
    ? !change.startsWith('-') 
    : isPositive;

  const changeText = typeof change === 'number' 
    ? `${parsedIsPositive ? '+' : ''}${change}%`
    : change;

  return (
    <div className="relative glass-panel rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
      {/* Dynamic bottom indicator line */}
      <div className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gaming-purple to-transparent opacity-80`} />

      <div className="flex items-center justify-between gap-4">
        {/* Stat Info */}
        <div className="space-y-1.5 flex-1 min-w-0">
          <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block truncate">
            {title}
          </span>
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight truncate">
            {value}
          </h3>
          
          {/* Trend Change Indicator */}
          {change !== undefined && (
            <div className="flex items-center gap-1">
              <span className={`inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold ${
                parsedIsPositive 
                  ? 'bg-emerald-500/10 text-emerald-400' 
                  : 'bg-rose-500/10 text-rose-400'
              }`}>
                {parsedIsPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {changeText}
              </span>
              <span className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider">vs last month</span>
            </div>
          )}
        </div>

        {/* Icon Container with Gradient */}
        {Icon && (
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${gradientClass} p-0.5 flex-shrink-0 shadow-lg shadow-black/20`}>
            <div className="w-full h-full rounded-[10px] bg-[#050816]/90 flex items-center justify-center">
              <Icon size={18} className="text-white" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
