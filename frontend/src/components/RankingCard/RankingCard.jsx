import React from 'react';
import { Trophy, Award, TrendingUp } from 'lucide-react';

export const RankingCard = ({ items, type }) => {
  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-black font-extrabold text-xs shadow-[0_0_10px_#eab308]">1</div>;
      case 2:
        return <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-black font-extrabold text-xs shadow-[0_0_10px_#d1d5db]">2</div>;
      case 3:
        return <div className="w-6 h-6 rounded-full bg-amber-700 flex items-center justify-center text-white font-extrabold text-xs shadow-[0_0_10px_#b45309]">3</div>;
      default:
        return <span className="font-bold text-gray-500 text-sm ml-2">{rank}</span>;
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/5 shadow-xl w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold font-gaming text-white flex items-center gap-2">
          {type === 'team' ? <Trophy size={18} className="text-gaming-purple" /> : <Award size={18} className="text-gaming-blue" />}
          <span>{type === 'team' ? 'Top Team Rankings' : 'MVP Player Rankings'}</span>
        </h3>
        <span className="text-xs text-gaming-blue font-bold flex items-center gap-1">
          <TrendingUp size={12} />
          <span>Live Updates</span>
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <div 
            key={item.id || index}
            className="flex items-center justify-between p-3.5 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 flex justify-center">
                {getRankBadge(item.rank)}
              </div>
              <div className="flex items-center gap-3">
                {type === 'team' ? (
                  <div className="w-8 h-8 rounded-lg bg-gaming-purple/20 border border-gaming-purple/30 flex items-center justify-center text-white font-bold text-xs">
                    {item.name.substring(0, 2).toUpperCase()}
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gaming-blue/20 border border-gaming-blue/30 flex items-center justify-center text-white font-bold text-xs">
                    {item.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col text-left">
                  <span className="font-bold text-sm text-white">{item.name}</span>
                  {type === 'player' && (
                    <span className="text-[10px] text-gray-400 font-medium">{item.team}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="font-black text-sm text-gaming-blue font-gaming">{item.score}</span>
              <span className="text-[9px] text-gray-500 block uppercase font-bold tracking-wider">
                {type === 'team' ? 'Points' : 'MVP Score'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
