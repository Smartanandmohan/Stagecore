import React, { useState, useEffect, useRef } from 'react';
import { Menu, Search, Bell, Mail, ChevronDown, User, Settings, Terminal, LogOut } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export const AdminNavbar = ({ collapsed, setCollapsed, onSearchChange }) => {
  const { user, logout } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const notificationsRef = useRef(null);
  const messagesRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target)) {
        setMessagesOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, text: 'Team Alpha registered for Alpha Series', time: '5m ago', unread: true },
    { id: 2, text: 'Player "ShroudX" reported for suspicious activities', time: '15m ago', unread: true },
    { id: 3, text: 'Tournament "Apex Legends Pro" registration is pending approval', time: '1h ago', unread: false },
    { id: 4, text: 'New sponsor request received from ASUS ROG', time: '3h ago', unread: false },
    { id: 5, text: 'Match #4928 dispute submitted by Team Liquid', time: '5h ago', unread: false },
    { id: 6, text: 'Anti-cheat flag raised in Match #4912', time: '1d ago', unread: false },
  ];

  const messages = [
    { id: 1, sender: 'Support Ticket #1024', snippet: 'Issue with tournament bracket placement...', time: '10m ago' },
    { id: 2, sender: 'ASUS Sponsor Rep', snippet: 'Updated contract details uploaded...', time: '1h ago' },
    { id: 3, sender: 'System Alert', snippet: 'Anti-cheat system latency warning...', time: '3h ago' },
    { id: 4, sender: 'Player Xero', snippet: 'Dispute request regarding match rule 4.2...', time: '5h ago' },
    { id: 5, sender: 'Finance Team', snippet: 'Withdrawal verification batch completed...', time: '1d ago' },
  ];

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchVal(val);
    if (onSearchChange) {
      onSearchChange(val);
    }
  };

  return (
    <nav className={`fixed top-0 right-0 z-30 h-16 backdrop-blur-md bg-[#050816]/90 border-b border-white/5 flex items-center justify-between px-6 transition-all duration-300 left-0 ${
      collapsed ? 'lg:left-16' : 'lg:left-60'
    } select-none`}>
      {/* Left side: Hamburger Toggle & Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white transition-colors cursor-pointer p-1.5 hover:bg-white/5 rounded-lg"
          title="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="relative w-full max-w-xs md:max-w-sm hidden sm:block">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search anything..."
            value={searchVal}
            onChange={handleSearch}
            className="w-full bg-[#0d1127]/60 border border-white/10 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gaming-purple focus:ring-1 focus:ring-gaming-purple transition-all duration-200"
          />
        </div>
      </div>

      {/* Right side: Notifications, Messages, Profile */}
      <div className="flex items-center gap-4">
        
        {/* Notification Bell */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setMessagesOpen(false);
              setProfileOpen(false);
            }}
            className={`relative p-2 rounded-xl border transition-all duration-200 cursor-pointer ${
              notificationsOpen 
                ? 'bg-gaming-purple/20 border-gaming-purple/40 text-white' 
                : 'bg-[#0d1127]/60 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            <Bell size={16} />
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gaming-purple text-[10px] font-black text-white rounded-full flex items-center justify-center border-2 border-[#050816] shadow-lg shadow-gaming-purple/40">
              12
            </span>
          </button>

          {/* Notifications Dropdown Panel */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 glass-panel rounded-2xl border border-white/10 shadow-2xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                <span className="text-xs font-black text-white uppercase tracking-wider">Recent Activity</span>
                <span className="text-[9px] text-gaming-blue font-bold cursor-pointer hover:underline uppercase">Mark all read</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-white/5 no-scrollbar">
                {notifications.map((n) => (
                  <div 
                    key={n.id} 
                    className={`p-3 text-left hover:bg-white/[0.03] transition-colors cursor-pointer flex flex-col gap-1 ${
                      n.unread ? 'bg-gaming-purple/[0.03]' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[11px] font-semibold text-gray-200 leading-normal">{n.text}</span>
                      {n.unread && <span className="w-1.5 h-1.5 bg-gaming-purple rounded-full flex-shrink-0 mt-1" />}
                    </div>
                    <span className="text-[9px] text-gray-500 font-medium">{n.time}</span>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 bg-white/[0.02] border-t border-white/5 text-center">
                <button className="text-[10px] text-gaming-purple hover:text-gaming-neon font-bold uppercase tracking-wider w-full py-1 cursor-pointer">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Message Mail */}
        <div className="relative" ref={messagesRef}>
          <button
            onClick={() => {
              setMessagesOpen(!messagesOpen);
              setNotificationsOpen(false);
              setProfileOpen(false);
            }}
            className={`relative p-2 rounded-xl border transition-all duration-200 cursor-pointer ${
              messagesOpen 
                ? 'bg-gaming-purple/20 border-gaming-purple/40 text-white' 
                : 'bg-[#0d1127]/60 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            <Mail size={16} />
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gaming-blue text-[10px] font-black text-white rounded-full flex items-center justify-center border-2 border-[#050816] shadow-lg shadow-gaming-blue/40">
              5
            </span>
          </button>

          {/* Messages Dropdown Panel */}
          {messagesOpen && (
            <div className="absolute right-0 mt-2 w-80 glass-panel rounded-2xl border border-white/10 shadow-2xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                <span className="text-xs font-black text-white uppercase tracking-wider">Inbox Messages</span>
                <span className="text-[9px] text-gaming-blue font-bold cursor-pointer hover:underline uppercase">New message</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-white/5 no-scrollbar">
                {messages.map((m) => (
                  <div key={m.id} className="p-3 text-left hover:bg-white/[0.03] transition-colors cursor-pointer flex flex-col">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="text-[11px] font-bold text-white truncate max-w-[150px]">{m.sender}</span>
                      <span className="text-[9px] text-gray-500 font-medium">{m.time}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 truncate leading-relaxed">{m.snippet}</span>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 bg-white/[0.02] border-t border-white/5 text-center">
                <button className="text-[10px] text-gaming-blue hover:text-cyan-400 font-bold uppercase tracking-wider w-full py-1 cursor-pointer">
                  Go to Messages
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationsOpen(false);
              setMessagesOpen(false);
            }}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-white/10 bg-[#0d1127]/60 hover:border-white/20 transition-all duration-200 cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-gaming-purple/20 border border-gaming-purple/40 flex items-center justify-center text-white text-xs font-black">
              A
            </div>
            <div className="text-left hidden md:block">
              <div className="text-[11px] font-bold text-white leading-none">{user?.username || 'Admin User'}</div>
              <div className="text-[8px] text-gaming-blue font-black uppercase tracking-wider mt-0.5">Super Admin</div>
            </div>
            <ChevronDown size={12} className="text-gray-400" />
          </button>

          {/* Profile Dropdown Panel */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-52 glass-panel rounded-2xl border border-white/10 shadow-2xl z-50 overflow-hidden divide-y divide-white/5">
              <div className="px-4 py-3 bg-white/[0.02] text-left">
                <span className="text-xs font-bold text-white block truncate">{user?.username || 'Admin User'}</span>
                <span className="text-[9px] text-gaming-blue font-bold uppercase tracking-wider block">Super Admin</span>
              </div>
              <div className="py-1">
                <button className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
                  <User size={14} className="text-gaming-purple" />
                  Account Settings
                </button>
                <button className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
                  <Terminal size={14} className="text-gaming-blue" />
                  System Console
                </button>
              </div>
              <div className="py-1">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};
