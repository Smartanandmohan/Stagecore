import React from 'react';
import {
  LayoutDashboard,
  Trophy,
  Swords,
  Users,
  User,
  ClipboardList,
  Newspaper,
  Handshake,
  BarChart3,
  ShieldAlert,
  Cpu,
  Settings,
  Plus,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'tournaments', label: 'Tournaments', icon: Trophy },
  { id: 'matches', label: 'Matches', icon: Swords },
  { id: 'teams', label: 'Teams', icon: Users },
  { id: 'players', label: 'Players', icon: User },
  { id: 'registrations', label: 'Registrations', icon: ClipboardList },
  { id: 'news', label: 'News & Blogs', icon: Newspaper },
  { id: 'sponsors', label: 'Sponsors', icon: Handshake },
  { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
  { id: 'moderation', label: 'Community Moderation', icon: ShieldAlert },
  { id: 'anticheat', label: 'Anti-Cheat Center', icon: Cpu },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const quickActions = [
  { id: 'tournaments', actionId: 'create-tournament', label: 'Create Tournament', short: '+ Tourney' },
  { id: 'matches', actionId: 'create-match', label: 'Create Match', short: '+ Match' },
  { id: 'teams', actionId: 'add-team', label: 'Add Team', short: '+ Team' },
  { id: 'players', actionId: 'add-player', label: 'Add Player', short: '+ Player' },
  { id: 'news', actionId: 'add-news', label: 'Add News', short: '+ News' },
];

export const AdminSidebar = ({
  activePage,
  setActivePage,
  collapsed,
  setCollapsed,
  onQuickAction
}) => {
  const { user, logout } = useAuth();

  const handleQuickActionClick = (pageId, actionId) => {
    setActivePage(pageId);
    if (onQuickAction) {
      onQuickAction(actionId);
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-40 bg-[#050816] border-r border-white/5 transition-all duration-300 flex flex-col ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Brand Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/5 h-16 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-gradient-to-tr from-gaming-purple to-gaming-blue rounded-xl shadow-lg shadow-gaming-purple/20">
          <span className="font-black text-lg text-white">S</span>
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-black text-sm text-white tracking-wider font-gaming">STAGECORE</span>
            <span className="text-[8px] text-gaming-blue font-bold tracking-widest uppercase -mt-0.5">Admin Workspace</span>
          </div>
        )}
      </div>

      {/* Collapse / Expand Toggle Button (Floating) */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-gaming-purple border border-gaming-purple/30 flex items-center justify-center text-white shadow-md shadow-gaming-purple/40 hover:bg-gaming-neon hover:scale-110 transition-all duration-200 cursor-pointer z-50"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1 no-scrollbar">
        {menuItems.map(({ id, label, icon: Icon }) => {
          const isActive = activePage === id;
          return (
            <button
              key={id}
              onClick={() => setActivePage(id)}
              title={collapsed ? label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-gaming-purple/20 to-transparent text-white border-l-4 border-gaming-neon shadow-[0_0_15px_rgba(168,85,247,0.15)] font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
              } ${collapsed ? 'justify-center px-0' : ''}`}
            >
              <Icon size={16} className={`flex-shrink-0 ${isActive ? 'text-gaming-neon' : ''}`} />
              {!collapsed && <span>{label}</span>}
            </button>
          );
        })}

        {/* Quick Actions Header */}
        {!collapsed ? (
          <div className="pt-6 pb-2 px-3">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Quick Actions</span>
          </div>
        ) : (
          <div className="h-px bg-white/5 my-4" />
        )}

        {/* Quick Actions Grid / Buttons */}
        <div className={`px-2 space-y-1.5 ${collapsed ? 'flex flex-col items-center' : 'grid grid-cols-1 gap-1.5'}`}>
          {quickActions.map(({ id, actionId, label, short }) => (
            <button
              key={actionId}
              onClick={() => handleQuickActionClick(id, actionId)}
              title={collapsed ? label : undefined}
              className={`flex items-center justify-center gap-2 rounded-lg py-2 border transition-all duration-200 cursor-pointer ${
                collapsed 
                  ? 'w-8 h-8 rounded-full border-gaming-blue/30 bg-gaming-blue/10 text-gaming-blue hover:bg-gaming-blue hover:text-white' 
                  : 'w-full px-3 text-left border-gaming-blue/20 bg-gaming-blue/5 hover:bg-gaming-blue/15 hover:border-gaming-blue/40 text-gaming-blue hover:text-white font-bold text-[10px] uppercase tracking-wider'
              }`}
            >
              <Plus size={collapsed ? 14 : 12} className="flex-shrink-0" />
              {!collapsed && <span>{short}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* User Status / Footer */}
      <div className={`border-t border-white/5 p-4 bg-[#03050f] ${collapsed ? 'flex justify-center' : ''}`}>
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gaming-purple/20 border border-gaming-purple/30 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-gaming-purple">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">{user?.username || 'Admin User'}</div>
              <div className="text-[9px] text-gaming-blue font-bold uppercase tracking-wider">Super Admin</div>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all duration-200 cursor-pointer flex-shrink-0"
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={logout}
            title="Logout"
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all duration-200 cursor-pointer"
          >
            <LogOut size={16} />
          </button>
        )}
      </div>
    </aside>
  );
};
