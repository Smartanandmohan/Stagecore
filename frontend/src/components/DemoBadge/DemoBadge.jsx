import React from 'react';

export const DemoBadge = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#050816]/90 backdrop-blur-md border border-gaming-purple/40 shadow-[0_0_20px_rgba(124,58,237,0.3)] text-white text-[11px] font-bold tracking-wide pointer-events-auto select-none transition-transform hover:scale-105">
      <span className="w-2 h-2 rounded-full bg-gaming-purple animate-ping" />
      <span className="text-gaming-neon font-black font-gaming tracking-wider uppercase">StageCore Demo</span>
      <span className="text-gray-600">•</span>
      <span className="text-gray-300 font-medium text-[10px]">Using Simulated Data</span>
    </div>
  );
};
