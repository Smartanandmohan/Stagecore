import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, Palette, Image, BarChart3, Trophy, Swords,
  Award, Newspaper, Handshake, Link2, Share2, LogOut,
  ChevronLeft, ChevronRight, Settings, Menu, X, User
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'site-settings', label: 'Site Settings', icon: Settings },
  { id: 'hero', label: 'Hero Section', icon: Image },
  { id: 'stats', label: 'Statistics', icon: BarChart3 },
  { id: 'features', label: 'Features', icon: Palette },
  { id: 'tournaments', label: 'Tournaments', icon: Trophy },
  { id: 'matches', label: 'Matches', icon: Swords },
  { id: 'rankings', label: 'Rankings', icon: Award },
  { id: 'news', label: 'News Articles', icon: Newspaper },
  { id: 'sponsors', label: 'Sponsors', icon: Handshake },
  { id: 'nav-links', label: 'Navigation Links', icon: Link2 },
  { id: 'social', label: 'Social Media', icon: Share2 },
];

export const AdminLayout = ({ activePage, setActivePage, collapsed, setCollapsed }) => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/5 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-gradient-to-tr from-gaming-purple to-gaming-blue rounded-xl shadow-lg">
          <span className="font-black text-lg text-white">S</span>
        </div>
        {!collapsed && (
          <div>
            <div className="font-black text-sm text-white tracking-wider font-gaming">STAGECORE</div>
            <div className="text-[8px] text-gaming-blue font-bold tracking-widest uppercase">Admin Panel</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activePage === id;
          return (
            <button
              key={id}
              onClick={() => {
                setActivePage(id);
                setMobileOpen(false);
              }}
              title={collapsed ? label : ''}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wide transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gaming-purple/20 text-gaming-purple border border-gaming-purple/30 shadow-[0_0_12px_rgba(124,58,237,0.15)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <Icon size={16} className="flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
            </button>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className={`border-t border-white/5 p-4 ${collapsed ? 'flex justify-center' : ''}`}>
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gaming-purple/20 border border-gaming-purple/30 flex items-center justify-center flex-shrink-0">
              <User size={14} className="text-gaming-purple" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">{user?.username || 'Admin'}</div>
              <div className="text-[10px] text-gaming-blue font-bold uppercase tracking-wider">Administrator</div>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all duration-200 cursor-pointer"
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
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed top-0 left-0 h-screen bg-[#03050f] border-r border-white/5 transition-all duration-300 z-40 ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-gaming-purple border border-gaming-purple/50 flex items-center justify-center text-white shadow-lg cursor-pointer z-50"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-60 bg-[#03050f] border-r border-white/5 flex flex-col">
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-[#03050f] border-b border-white/5 flex items-center justify-between px-4">
        <button onClick={() => setMobileOpen(true)} className="text-gray-400 hover:text-white cursor-pointer">
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 flex items-center justify-center bg-gradient-to-tr from-gaming-purple to-gaming-blue rounded-lg">
            <span className="font-black text-sm text-white">S</span>
          </div>
          <span className="font-black text-sm text-white font-gaming">ADMIN</span>
        </div>
        <button onClick={logout} className="text-gray-400 hover:text-red-400 cursor-pointer">
          <LogOut size={18} />
        </button>
      </div>
    </>
  );
};
