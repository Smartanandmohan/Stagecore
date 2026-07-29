import React, { useState } from 'react';
import { 
  Trophy, 
  Users, 
  UserPlus, 
  IndianRupee, 
  TrendingUp, 
  ArrowUpRight, 
  Calendar, 
  Activity, 
  Gamepad2, 
  ShieldAlert, 
  UserCheck, 
  Share2, 
  Plus, 
  Clock 
} from 'lucide-react';

export const DashboardPage = ({ setActivePage }) => {
  const [timeRange, setTimeRange] = useState('30d');

  // Stats Data
  const stats = [
    {
      title: 'Total Tournaments',
      value: '256',
      change: '+12%',
      trend: 'up',
      desc: 'vs last month',
      icon: Trophy,
      color: 'from-violet-500 to-fuchsia-600',
      glow: 'rgba(139, 92, 246, 0.4)',
    },
    {
      title: 'Total Teams',
      value: '1,245',
      change: '+8.5%',
      trend: 'up',
      desc: 'vs last month',
      icon: Users,
      color: 'from-cyan-500 to-blue-600',
      glow: 'rgba(6, 182, 212, 0.4)',
    },
    {
      title: 'Total Players',
      value: '18,500',
      change: '+15.3%',
      trend: 'up',
      desc: 'vs last month',
      icon: UserPlus,
      color: 'from-emerald-500 to-teal-600',
      glow: 'rgba(16, 185, 129, 0.4)',
    },
    {
      title: 'Total Revenue',
      value: '₹12,50,000',
      change: '+22.1%',
      trend: 'up',
      desc: 'vs last month',
      icon: IndianRupee,
      color: 'from-amber-500 to-orange-600',
      glow: 'rgba(245, 158, 11, 0.4)',
    },
  ];

  // Upcoming Tournaments Mock Data
  const upcomingTournaments = [
    { id: 1, name: 'Valorant Cup #12', game: 'Valorant', registered: 128, max: 256, date: 'June 05', status: 'Registration Open', prize: '₹25,000' },
    { id: 2, name: 'BGMI Masters S4', game: 'BGMI', registered: 64, max: 128, date: 'June 08', status: 'Registration Open', prize: '₹50,000' },
    { id: 3, name: 'Free Fire Clash Stars', game: 'Free Fire', registered: 120, max: 120, date: 'June 12', status: 'Full / Closed', prize: '₹15,000' },
    { id: 4, name: 'CS2 Showdown Cup', game: 'CS2', registered: 16, max: 32, date: 'June 18', status: 'Registration Open', prize: '₹30,000' },
  ];

  // Recent Registrations Mock Data
  const recentRegistrations = [
    { id: 1, teamName: 'Team Alpha', game: 'Valorant', captain: 'ShadowX', date: 'May 31, 17:40', status: 'Approved' },
    { id: 2, teamName: 'Team Bravo', game: 'BGMI', captain: 'Jonathan_Jr', date: 'May 31, 16:15', status: 'Pending Review' },
    { id: 3, teamName: 'Team Delta', game: 'Free Fire', captain: 'KillerFF', date: 'May 31, 15:30', status: 'Approved' },
    { id: 4, teamName: 'Team Echo', game: 'CS2', captain: 'Coldzera_In', date: 'May 31, 14:02', status: 'Pending Review' },
  ];

  // Recent Activity Log
  const activityLog = [
    { id: 1, text: 'Team Alpha registered for Valorant Cup #12', time: '2 min ago', type: 'registration' },
    { id: 2, text: 'Tournament BGMI Masters created', time: '15 min ago', type: 'tournament' },
    { id: 3, text: 'Match #1523 completed (Velocity 13 - 11 Reckoning)', time: '1 hour ago', type: 'match' },
    { id: 4, text: 'New sponsor RedBull added', time: '3 hours ago', type: 'sponsor' },
    { id: 5, text: 'Player ShadowX reported for cheating (Anti-Cheat Flag)', time: '5 hours ago', type: 'report' },
  ];

  // Games distribution donut chart data
  const gamesDistribution = [
    { name: 'Valorant', percentage: 45, color: '#ec4899', offset: 0 },
    { name: 'BGMI', percentage: 25, color: '#3b82f6', offset: 45 },
    { name: 'Free Fire', percentage: 15, color: '#10b981', offset: 70 },
    { name: 'CS2', percentage: 10, color: '#f59e0b', offset: 85 },
    { name: 'Others', percentage: 5, color: '#6b7280', offset: 95 },
  ];

  return (
    <div className="space-y-6 text-gray-200">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-wider">Dashboard Overview</h1>
          <p className="text-xs text-gaming-blue font-bold tracking-widest mt-0.5">PLATFORM REAL-TIME ANALYSIS</p>
        </div>
        <div className="flex items-center gap-2">
          {['7d', '30d', 'all'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all duration-200 cursor-pointer ${
                timeRange === range
                  ? 'bg-gaming-purple/20 border-gaming-purple text-white shadow-[0_0_12px_rgba(124,58,237,0.3)]'
                  : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="glass-panel rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300 group flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest block">{stat.title}</span>
                <span className="text-2xl font-black text-white mt-1 block tracking-tight">{stat.value}</span>
              </div>
              <div 
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                style={{ boxShadow: `0 0 15px ${stat.glow}` }}
              >
                <stat.icon className="text-white" size={20} />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-white/5 text-[11px]">
              <span className="text-emerald-400 font-black flex items-center gap-0.5">
                <ArrowUpRight size={12} />
                {stat.change}
              </span>
              <span className="text-gray-500 font-semibold">{stat.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tournament Registrations Line Chart */}
        <div className="glass-panel rounded-2xl p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-1.5">
                <TrendingUp size={14} className="text-gaming-purple" />
                Tournament Registrations
              </h2>
              <p className="text-[10px] text-gray-500 font-semibold">Weekly signup growth</p>
            </div>
            <span className="text-xs font-bold text-gaming-purple">Active</span>
          </div>

          <div className="flex-1 min-h-[200px] flex items-center justify-center">
            {/* Inline SVG Line Chart */}
            <svg viewBox="0 0 300 150" className="w-full h-full">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="30" y1="20" x2="280" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
              <line x1="30" y1="60" x2="280" y2="60" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
              <line x1="30" y1="100" x2="280" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
              <line x1="30" y1="130" x2="280" y2="130" stroke="rgba(255,255,255,0.1)" />

              {/* Shaded Area Under Curve */}
              <path 
                d="M 30 130 Q 80 90 120 100 T 200 40 T 280 20 L 280 130 Z" 
                fill="url(#lineGrad)" 
              />
              
              {/* Curve Line */}
              <path 
                d="M 30 130 Q 80 90 120 100 T 200 40 T 280 20" 
                fill="none" 
                stroke="#7c3aed" 
                strokeWidth="3" 
                strokeLinecap="round" 
              />
              
              {/* Dots */}
              <circle cx="30" cy="130" r="4" fill="#a855f7" stroke="#050816" strokeWidth="2" />
              <circle cx="80" cy="103" r="4" fill="#a855f7" stroke="#050816" strokeWidth="2" />
              <circle cx="120" cy="100" r="4" fill="#a855f7" stroke="#050816" strokeWidth="2" />
              <circle cx="200" cy="50" r="4" fill="#a855f7" stroke="#050816" strokeWidth="2" />
              <circle cx="280" cy="20" r="4" fill="#a855f7" stroke="#050816" strokeWidth="2" />

              {/* Text labels */}
              <text x="25" y="142" fill="#6b7280" fontSize="8" fontWeight="bold">W1</text>
              <text x="75" y="142" fill="#6b7280" fontSize="8" fontWeight="bold">W2</text>
              <text x="115" y="142" fill="#6b7280" fontSize="8" fontWeight="bold">W3</text>
              <text x="195" y="142" fill="#6b7280" fontSize="8" fontWeight="bold">W4</text>
              <text x="275" y="142" fill="#6b7280" fontSize="8" fontWeight="bold">W5</text>

              <text x="10" y="24" fill="#6b7280" fontSize="8" fontWeight="bold">100</text>
              <text x="10" y="64" fill="#6b7280" fontSize="8" fontWeight="bold">50</text>
              <text x="15" y="104" fill="#6b7280" fontSize="8" fontWeight="bold">10</text>
            </svg>
          </div>
        </div>

        {/* Player Growth Bar Chart */}
        <div className="glass-panel rounded-2xl p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-1.5">
                <Users size={14} className="text-gaming-blue" />
                Player Growth
              </h2>
              <p className="text-[10px] text-gray-500 font-semibold">Registered players per tier</p>
            </div>
            <span className="text-[10px] bg-gaming-blue/10 text-gaming-blue px-2 py-0.5 rounded font-bold uppercase">Live</span>
          </div>

          <div className="flex-1 min-h-[200px] flex items-center justify-center">
            {/* Inline SVG Bar Chart Stack */}
            <svg viewBox="0 0 300 150" className="w-full h-full">
              <line x1="30" y1="20" x2="280" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
              <line x1="30" y1="60" x2="280" y2="60" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
              <line x1="30" y1="100" x2="280" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
              <line x1="30" y1="130" x2="280" y2="130" stroke="rgba(255,255,255,0.1)" />

              {/* Bar 1 - Jan */}
              <rect x="50" y="70" width="18" height="60" rx="3" fill="#06b6d4" />
              <rect x="50" y="45" width="18" height="23" rx="3" fill="#0ea5e9" opacity="0.7" />
              
              {/* Bar 2 - Feb */}
              <rect x="95" y="60" width="18" height="70" rx="3" fill="#06b6d4" />
              <rect x="95" y="30" width="18" height="28" rx="3" fill="#0ea5e9" opacity="0.7" />

              {/* Bar 3 - Mar */}
              <rect x="140" y="50" width="18" height="80" rx="3" fill="#06b6d4" />
              <rect x="140" y="15" width="18" height="33" rx="3" fill="#0ea5e9" opacity="0.7" />

              {/* Bar 4 - Apr */}
              <rect x="185" y="40" width="18" height="90" rx="3" fill="#06b6d4" />
              <rect x="185" y="10" width="18" height="28" rx="3" fill="#0ea5e9" opacity="0.7" />

              {/* Bar 5 - May */}
              <rect x="230" y="25" width="18" height="105" rx="3" fill="#06b6d4" />
              <rect x="230" y="5" width="18" height="18" rx="3" fill="#0ea5e9" opacity="0.7" />

              {/* Axis Labels */}
              <text x="50" y="142" fill="#6b7280" fontSize="8" fontWeight="bold">Jan</text>
              <text x="95" y="142" fill="#6b7280" fontSize="8" fontWeight="bold">Feb</text>
              <text x="140" y="142" fill="#6b7280" fontSize="8" fontWeight="bold">Mar</text>
              <text x="185" y="142" fill="#6b7280" fontSize="8" fontWeight="bold">Apr</text>
              <text x="230" y="142" fill="#6b7280" fontSize="8" fontWeight="bold">May</text>

              <text x="12" y="24" fill="#6b7280" fontSize="8" fontWeight="bold">15K</text>
              <text x="12" y="64" fill="#6b7280" fontSize="8" fontWeight="bold">10K</text>
              <text x="16" y="104" fill="#6b7280" fontSize="8" fontWeight="bold">5K</text>
            </svg>
          </div>
        </div>

        {/* Top Games Donut Chart */}
        <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-1.5">
              <Gamepad2 size={14} className="text-pink-500" />
              Top Games Distribution
            </h2>
            <p className="text-[10px] text-gray-500 font-semibold">User base segmentation</p>
          </div>

          <div className="flex flex-row items-center justify-between gap-2 my-2">
            {/* Inline SVG Donut Chart */}
            <div className="w-28 h-28 relative flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 42 42" className="w-full h-full transform -rotate-90">
                {/* Background Ring */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="4.5" />
                
                {/* Valorant: 45% */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#ec4899" strokeWidth="4.5" 
                  strokeDasharray="45 55" strokeDashoffset="0" />
                
                {/* BGMI: 25% */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#3b82f6" strokeWidth="4.5" 
                  strokeDasharray="25 75" strokeDashoffset="-45" />

                {/* Free Fire: 15% */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#10b981" strokeWidth="4.5" 
                  strokeDasharray="15 85" strokeDashoffset="-70" />

                {/* CS2: 10% */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f59e0b" strokeWidth="4.5" 
                  strokeDasharray="10 90" strokeDashoffset="-85" />

                {/* Others: 5% */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#6b7280" strokeWidth="4.5" 
                  strokeDasharray="5 95" strokeDashoffset="-95" />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-xs font-black text-white">18.5K</span>
                <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wide">Players</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex-1 space-y-1.5 pl-2">
              {gamesDistribution.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-semibold text-gray-300">{item.name}</span>
                  </div>
                  <span className="font-black text-white">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Tables & Activity Feed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Columns - Tables (Upcoming & Registrations) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Upcoming Tournaments Table */}
          <div className="glass-panel rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-1.5">
                  <Trophy size={14} className="text-gaming-purple" />
                  Upcoming Tournaments
                </h2>
                <p className="text-[10px] text-gray-500 font-semibold">Active registrations queue</p>
              </div>
              <button 
                onClick={() => setActivePage('tournaments')} 
                className="text-[10px] font-black text-gaming-purple hover:underline uppercase tracking-wider cursor-pointer"
              >
                Manage All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[500px]">
                <thead>
                  <tr className="border-b border-white/5 text-gray-400 font-extrabold uppercase tracking-widest text-[9px]">
                    <th className="pb-3 pr-2">Tournament Name</th>
                    <th className="pb-3 px-2">Game</th>
                    <th className="pb-3 px-2">Slots Filled</th>
                    <th className="pb-3 px-2">Prize Pool</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium text-gray-300">
                  {upcomingTournaments.map((t) => (
                    <tr key={t.id} className="group hover:bg-white/[0.02] transition-colors duration-150">
                      <td className="py-3 pr-2 font-bold text-white group-hover:text-gaming-purple transition-colors">
                        {t.name}
                      </td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] border border-white/5 font-semibold">
                          {t.game}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{t.registered}/{t.max}</span>
                          <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div 
                              className="h-full bg-gaming-purple rounded-full" 
                              style={{ width: `${(t.registered / t.max) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 font-bold text-gaming-blue">{t.prize}</td>
                      <td className="py-3 text-right">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                          t.status.includes('Open') 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Registrations Table */}
          <div className="glass-panel rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-1.5">
                  <UserCheck size={14} className="text-gaming-blue" />
                  Recent Registrations
                </h2>
                <p className="text-[10px] text-gray-500 font-semibold">Latest team applications</p>
              </div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Verification Pending</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[500px]">
                <thead>
                  <tr className="border-b border-white/5 text-gray-400 font-extrabold uppercase tracking-widest text-[9px]">
                    <th className="pb-3 pr-2">Team Name</th>
                    <th className="pb-3 px-2">Game</th>
                    <th className="pb-3 px-2">Captain / Leader</th>
                    <th className="pb-3 px-2">Registered At</th>
                    <th className="pb-3 text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium text-gray-300">
                  {recentRegistrations.map((reg) => (
                    <tr key={reg.id} className="group hover:bg-white/[0.02] transition-colors duration-150">
                      <td className="py-3 pr-2 font-bold text-white group-hover:text-gaming-blue transition-colors">
                        {reg.teamName}
                      </td>
                      <td className="py-3 px-2 text-gray-400">{reg.game}</td>
                      <td className="py-3 px-2 font-bold">{reg.captain}</td>
                      <td className="py-3 px-2 text-gray-500">{reg.date}</td>
                      <td className="py-3 text-right">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          reg.status === 'Approved' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse'
                        }`}>
                          {reg.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column - Recent Activity Log */}
        <div className="glass-panel rounded-2xl p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
            <div>
              <h2 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-1.5">
                <Activity size={14} className="text-gaming-purple animate-pulse" />
                Recent System Activity
              </h2>
              <p className="text-[10px] text-gray-500 font-semibold">Live logging feed</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto pr-1">
            {activityLog.map((log) => {
              let iconColor = 'text-gaming-purple bg-gaming-purple/10 border-gaming-purple/20';
              if (log.type === 'report') iconColor = 'text-red-400 bg-red-500/10 border-red-500/20';
              if (log.type === 'registration') iconColor = 'text-gaming-blue bg-gaming-blue/10 border-gaming-blue/20';
              if (log.type === 'sponsor') iconColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
              if (log.type === 'match') iconColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';

              return (
                <div key={log.id} className="flex gap-3 text-xs leading-relaxed group">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border flex-shrink-0 mt-0.5 ${iconColor}`}>
                    {log.type === 'report' ? <ShieldAlert size={14} /> : <Clock size={14} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300 font-medium group-hover:text-white transition-colors">
                      {log.text}
                    </p>
                    <span className="text-[9px] text-gray-500 font-semibold block mt-0.5 uppercase tracking-wider">
                      {log.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="pt-4 mt-4 border-t border-white/5 text-center">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              StageCore Logs v1.0.4
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
