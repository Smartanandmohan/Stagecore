import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, User, Trophy, Swords, Users, BarChart3, TrendingUp,
  Wallet, MessageSquare, Bell, Settings, HelpCircle, Search, Menu, X, LogOut, ChevronLeft, ChevronRight, Share2
} from 'lucide-react';

// Views
import { DashboardView } from './views/DashboardView';
import { ProfileView } from './views/ProfileView';
import { TournamentsView } from './views/TournamentsView';
import { TeamsView } from './views/TeamsView';
import { LeaderboardView } from './views/LeaderboardView';
import { WalletView } from './views/WalletView';
import { NotificationsView } from './views/NotificationsView';
import { MessagesView } from './views/MessagesView';
import { SettingsView } from './views/SettingsView';
import { SupportView } from './views/SupportView';
import { StatisticsView } from './views/StatisticsView';
import { SocialFeedView } from './views/SocialFeedView';

export const PlayerDashboardPage = () => {
  const { user, logout, demoLogin } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [username, setUsername] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      if (saved) {
        return JSON.parse(saved).username;
      }
    } catch (e) {}
    return user?.username || 'DemoPlayer';
  });

  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(3);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(1);

  // Auto-authenticate as demo user if visiting /dashboard directly
  useEffect(() => {
    if (!user && demoLogin) {
      demoLogin('ROLE_USER');
    }
  }, [user, demoLogin]);

  useEffect(() => {
    const updateCounts = () => {
      try {
        const savedNotifs = localStorage.getItem('user_notifications');
        if (savedNotifs) {
          const list = JSON.parse(savedNotifs);
          setUnreadNotificationsCount(list.filter(n => n.unread).length);
        }
      } catch (e) {}

      try {
        const savedChats = localStorage.getItem('esports_chats_v2');
        if (savedChats) {
          const list = JSON.parse(savedChats);
          setUnreadMessagesCount(list.reduce((acc, chat) => acc + (chat.unread || 0), 0));
        }
      } catch (e) {}

      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUsername(JSON.parse(savedUser).username);
        }
      } catch (e) {}
    };

    updateCounts();
    window.addEventListener('notifications_changed', updateCounts);
    window.addEventListener('messages_changed', updateCounts);
    window.addEventListener('storage', updateCounts);
    return () => {
      window.removeEventListener('notifications_changed', updateCounts);
      window.removeEventListener('messages_changed', updateCounts);
      window.removeEventListener('storage', updateCounts);
    };
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-gaming-purple border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-400 text-xs font-semibold">Redirecting to login...</span>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'feed', label: 'Social Feed', icon: Share2 },
    { id: 'tournaments', label: 'Tournaments', icon: Trophy },
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'leaderboard', label: 'Leaderboard', icon: BarChart3 },
    { id: 'stats', label: 'Statistics', icon: TrendingUp },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ];

  const handleSearchKeyDown = (e) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      document.getElementById('global-dashboard-search')?.focus();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleSearchKeyDown);
    return () => window.removeEventListener('keydown', handleSearchKeyDown);
  }, []);

  // Reset scroll position of main content container when switching dashboard tabs
  useEffect(() => {
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.scrollTop = 0;
    }
  }, [activeTab]);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView setActiveTab={setActiveTab} />;
      case 'profile':
        return <ProfileView />;
      case 'feed':
        return <SocialFeedView />;
      case 'tournaments':
        return <TournamentsView />;
      case 'teams':
        return <TeamsView />;
      case 'leaderboard':
        return <LeaderboardView />;
      case 'stats':
        return <StatisticsView />;
      case 'wallet':
        return <WalletView />;
      case 'messages':
        return <MessagesView setMobileMenuOpen={setMobileMenuOpen} />;
      case 'notifications':
        return <NotificationsView setActiveTab={setActiveTab} />;
      case 'settings':
        return <SettingsView />;
      case 'support':
        return <SupportView />;
      default:
        return <DashboardView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="h-screen bg-[#050816] text-gray-100 font-gaming flex relative overflow-hidden">
      
      {/* Glow overlays */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#7C3AED]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00F0FF]/3 rounded-full blur-[150px] pointer-events-none" />



      {/* SIDEBAR - DESKTOP */}
      <aside
        className={`fixed top-0 left-0 h-screen z-30 bg-[#050816] border-r border-white/5 transition-all duration-300 flex flex-col justify-between hidden lg:flex ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar">
          {/* Logo */}
          <div className={`flex items-center gap-3 px-5 py-6 border-b border-white/5 h-20 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-gradient-to-tr from-gaming-purple to-gaming-blue rounded-xl shadow-lg shadow-gaming-purple/20">
              <span className="font-black text-lg text-white">S</span>
            </div>
            {!collapsed && (
              <div className="flex flex-col text-left">
                <span className="font-black text-sm text-white tracking-wider">STAGECORE</span>
                <span className="text-[7px] text-gaming-blue font-bold tracking-widest uppercase -mt-0.5">RISE. COMPETE. CONQUER.</span>
              </div>
            )}
          </div>

          {/* Nav Items */}
          <nav className="flex-1 py-4 px-2 space-y-1">
            {menuItems.map(({ id, label, icon: Icon, badge }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => {
                    setActiveTab(id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-gaming-purple/15 to-transparent text-white border-l-4 border-gaming-purple shadow-[0_0_15px_rgba(124,58,237,0.1)] font-bold'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                  } ${collapsed ? 'justify-center px-0' : ''}`}
                >
                  <Icon size={16} className={`flex-shrink-0 ${isActive ? 'text-gaming-purple' : ''}`} />
                  {!collapsed && (
                    <div className="flex-1 flex items-center justify-between">
                      <span>{label}</span>
                      {badge && (
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-gaming-purple text-white shadow-sm">
                          {badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Discord & Logout Bottom Section */}
        <div className="p-4 border-t border-white/5 bg-[#03050f]/60 space-y-3 shrink-0">
          {!collapsed && (
            <div className="glass-panel p-4 rounded-2xl border border-white/5 flex flex-col gap-2 bg-gradient-to-br from-gaming-purple/5 to-transparent text-left relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-[#5865F2]/10 rounded-full blur-md" />
              <h5 className="font-extrabold text-[10px] text-white uppercase tracking-wider">Join Our Discord</h5>
              <p className="text-[9px] text-gray-400 leading-normal">Connect with players, get match support & find squads.</p>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="mt-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-[#5865F2]/25"
              >
                <span>Join Now</span>
              </a>
            </div>
          )}

          <button
            onClick={logout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-wider text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all cursor-pointer ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut size={16} className="shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>

        {/* Collapse floating toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-gaming-purple border border-gaming-purple/30 flex items-center justify-center text-white shadow-md hover:bg-[#9055ff] transition-all cursor-pointer z-50"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>

      {/* MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <aside className="relative w-64 bg-[#050816] h-full flex flex-col justify-between p-4 border-r border-white/5 animate-slideRight">
            <div className="space-y-6 overflow-y-auto no-scrollbar">
              <div className="flex items-center gap-2 px-2 py-4 border-b border-white/5">
                <div className="w-8 h-8 bg-gradient-to-tr from-gaming-purple to-gaming-blue rounded-lg flex items-center justify-center">
                  <span className="font-black text-white text-sm">S</span>
                </div>
                <span className="font-extrabold text-sm tracking-wider">STAGECORE</span>
              </div>
              <nav className="space-y-1">
                {menuItems.map(({ id, label, icon: Icon, badge }) => {
                  const isActive = activeTab === id;
                  return (
                    <button
                      key={id}
                      onClick={() => {
                        setActiveTab(id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-[11px] uppercase tracking-wider transition-all duration-200 ${
                        isActive
                          ? 'bg-gaming-purple/15 text-white border-l-4 border-gaming-purple'
                          : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                      }`}
                    >
                      <Icon size={16} className="shrink-0" />
                      <div className="flex-1 flex items-center justify-between">
                        <span>{label}</span>
                        {badge && (
                          <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-gaming-purple text-white">
                            {badge}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/5">
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#5865F2] text-white text-xs font-bold uppercase cursor-pointer"
              >
                <span>Join Discord</span>
              </a>
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 py-2 text-gray-500 hover:text-red-400 text-xs font-bold uppercase"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* MAIN CONTAINER CONTENT */}
      <div
        className={`flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300 ${
          collapsed ? 'lg:pl-16' : 'lg:pl-60'
        }`}
      >
        {activeTab !== 'messages' && (
          <header className="h-16 bg-[#050816] border-b border-white/5 flex items-center justify-between px-6 shrink-0 z-20">
            <div className="flex items-center gap-2">
              {/* Unified Sidebar Toggle Hamburger Button */}
              <button
                onClick={() => {
                  if (window.innerWidth >= 1024) {
                    setCollapsed(!collapsed);
                  } else {
                    setMobileMenuOpen(true);
                  }
                }}
                className="p-2 -ml-2 text-gray-400 hover:text-white mr-2 cursor-pointer transition-colors"
                title="Toggle Sidebar"
              >
                <Menu size={18} />
              </button>

              {/* Dashboard Search */}
              <div className="relative w-72 hidden md:block">
                <input
                  id="global-dashboard-search"
                  type="text"
                  placeholder={activeTab === 'messages' ? "Search channels or players..." : "Search tournaments, teams, players..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#03050f] border border-white/10 rounded-xl pl-9 pr-14 py-2 text-[11px] text-white focus:outline-none focus:border-gaming-purple/60 placeholder-gray-600 transition-colors"
                />
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[9px] text-gray-500 font-mono pointer-events-none">
                  Ctrl + K
                </kbd>
              </div>
            </div>
            <div className="md:hidden" />

            {/* Quick profile actions */}
            <div className="flex items-center gap-5">
              {/* Notifications Shortcut */}
              <button
                onClick={() => setActiveTab('notifications')}
                className="relative p-2 text-gray-400 hover:text-white bg-white/3 border border-white/5 rounded-xl transition-all cursor-pointer"
              >
                <Bell size={15} />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gaming-purple border border-[#050816] text-white text-[8px] font-black flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>



              {/* Messages Shortcut */}
              <button
                onClick={() => setActiveTab('messages')}
                className="relative p-2 text-gray-400 hover:text-white bg-white/3 border border-white/5 rounded-xl transition-all cursor-pointer"
              >
                <MessageSquare size={15} />
                {unreadMessagesCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00f0ff] border border-[#050816] text-[#050816] text-[8px] font-black flex items-center justify-center">
                    {unreadMessagesCount}
                  </span>
                )}
              </button>

              {/* User Dropdown */}
              <div className="flex items-center gap-3 pl-3 border-l border-white/5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gaming-purple to-gaming-blue border border-gaming-purple/30 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <span className="text-xs font-black text-white">{username.slice(0,2).toUpperCase()}</span>
                </div>
                <div className="text-left hidden sm:block">
                  <span className="text-[11px] font-black text-white block uppercase tracking-wider">{username}</span>
                  <span className="text-[8px] text-gaming-blue font-bold uppercase tracking-wider block -mt-0.5">Player</span>
                </div>
              </div>
            </div>
          </header>
        )}

        {/* CONTAINER FOR VIEWS */}
        <main className={`flex-1 min-h-0 w-full select-none ${
          activeTab === 'messages' || activeTab === 'support' ? 'p-0 overflow-hidden' : 'p-4 sm:p-6 overflow-y-auto'
        }`}>
          <div className={activeTab === 'messages' || activeTab === 'support' ? 'w-full h-full' : 'max-w-7xl mx-auto space-y-6'}>
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  );
};
