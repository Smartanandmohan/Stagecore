import React, { useState, useEffect } from 'react';
import { Bell, Trophy, Swords, CreditCard, ShieldCheck, CheckSquare, Trash2, Calendar } from 'lucide-react';

const iconMap = {
  Trophy,
  Swords,
  CreditCard,
  ShieldCheck,
  Bell
};

export const NotificationsView = ({ setActiveTab }) => {
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('user_notifications');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }

    const defaultNotifications = [
      {
        id: 1,
        title: 'Tournament check-in open!',
        text: 'StageCore Valorant Cup #12 check-in is now open. Match starts in 1 hour.',
        time: '15 mins ago',
        category: 'tournaments',
        unread: true,
        icon: 'Trophy',
        color: 'text-gaming-purple bg-gaming-purple/10 border-gaming-purple/20',
        actionText: 'Check-In Now',
        actionTab: 'tournaments'
      },
      {
        id: 2,
        title: 'Match scheduled',
        text: 'Your round 1 match against Team Delta has been scheduled. Map veto starts soon.',
        time: '1 hour ago',
        category: 'matches',
        unread: true,
        icon: 'Swords',
        color: 'text-gaming-blue bg-gaming-blue/10 border-gaming-blue/20',
        actionText: 'Go to Match Veto',
        actionTab: 'matches'
      },
      {
        id: 3,
        title: 'UPI payout processed',
        text: 'Your withdrawal request of ₹1,000 to UPI ID anandyt@upi has been successfully processed.',
        time: '2 hours ago',
        category: 'wallet',
        unread: true,
        icon: 'CreditCard',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        actionText: 'View Wallet Balance',
        actionTab: 'wallet'
      },
      {
        id: 4,
        title: 'Team roster approved',
        text: 'Team Alpha registration for BGMI Masters Series has been approved by the administrators.',
        time: '5 hours ago',
        category: 'tournaments',
        unread: false,
        icon: 'Trophy',
        color: 'text-gaming-purple bg-gaming-purple/10 border-gaming-purple/20'
      },
      {
        id: 5,
        title: 'Weekly reward unlocked',
        text: 'You have been awarded 10 RP for maintaining a 65%+ win rate this week.',
        time: '1 day ago',
        category: 'system',
        unread: false,
        icon: 'ShieldCheck',
        color: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
      },
      {
        id: 6,
        title: 'New login detected',
        text: 'Your account was logged in from macOS (Chrome) at 2026-05-31 18:05 IST.',
        time: '2 days ago',
        category: 'system',
        unread: false,
        icon: 'ShieldCheck',
        color: 'text-gray-400 bg-white/5 border-white/10'
      }
    ];

    localStorage.setItem('user_notifications', JSON.stringify(defaultNotifications));
    return defaultNotifications;
  });

  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    setNotifications(prev => {
      const hasUnread = prev.some(n => n.unread);
      if (hasUnread) {
        return prev.map(n => ({ ...n, unread: false }));
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('user_notifications', JSON.stringify(notifications));
    window.dispatchEvent(new Event('notifications_changed'));
  }, [notifications]);

  const filteredNotifications = notifications.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const toggleRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: !n.unread } : n));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getUnreadCount = () => {
    return notifications.filter(n => n.unread).length;
  };

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      
      {/* Title Header */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Bell size={18} className="text-gaming-purple" />
            Notification Center
          </h2>
          <span className="text-[10px] text-gray-400 font-bold font-mono block mt-1">
            You have {getUnreadCount()} unread notifications
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 px-3 py-2 bg-white/3 hover:bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase text-gray-300 transition-colors cursor-pointer"
          >
            <CheckSquare size={13} />
            Mark All Read
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5 max-w-md">
        {['all', 'tournaments', 'matches', 'wallet', 'system'].map(cat => {
          const count = cat === 'all' 
            ? notifications.filter(n => n.unread).length
            : notifications.filter(n => n.category === cat && n.unread).length;

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-wider border-b-2 transition-colors cursor-pointer relative ${
                activeCategory === cat 
                  ? 'border-gaming-purple text-white font-bold' 
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              {cat}
              {count > 0 && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-gaming-purple shadow-[0_0_6px_rgba(124,58,237,0.8)]" />
              )}
            </button>
          );
        })}
      </div>

      {/* List content */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="glass-panel border border-white/5 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 bg-white/3 border border-white/5 rounded-xl flex items-center justify-center text-gray-500">
              <Bell size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">No notifications found</h4>
              <p className="text-[10px] text-gray-500 leading-normal mt-1 max-w-xs mx-auto">There are no updates or alerts matching the selected tab filter at this moment.</p>
            </div>
          </div>
        ) : (
          filteredNotifications.map(item => {
            const IconComponent = iconMap[item.icon] || Bell;
            return (
              <div
                key={item.id}
                className={`glass-panel border rounded-2xl p-4 flex items-start gap-4 transition-all duration-200 ${
                  item.unread 
                    ? 'border-gaming-purple/20 bg-gradient-to-r from-gaming-purple/5 via-transparent to-transparent' 
                    : 'border-white/5 bg-[#03050f]/30'
                }`}
              >
                {/* Icon box */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${item.color}`}>
                  <IconComponent size={15} />
                </div>

                {/* Content info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-extrabold text-white flex items-center gap-2">
                        {item.title}
                        {item.unread && (
                          <span className="w-1.5 h-1.5 rounded-full bg-gaming-purple inline-block" />
                        )}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-medium leading-normal mt-1">
                        {item.text}
                      </p>
                    </div>
                    <span className="text-[9px] text-gray-500 font-mono shrink-0">
                      {item.time}
                    </span>
                  </div>

                  {/* Actions buttons */}
                  {(item.actionText || item.unread) && (
                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/5">
                      {item.actionText && (
                        <button onClick={() => { if (item.actionTab && setActiveTab) setActiveTab(item.actionTab); }} className="px-3 py-1.5 bg-gaming-purple hover:bg-gaming-purple/90 border border-gaming-purple/10 text-white rounded-lg text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer">
                          {item.actionText}
                        </button>
                      )}
                      
                      <button
                        onClick={() => toggleRead(item.id)}
                        className="text-[9px] text-gray-500 hover:text-gray-300 font-bold transition-colors cursor-pointer"
                      >
                        {item.unread ? 'Mark as Read' : 'Mark as Unread'}
                      </button>

                      <button
                        onClick={() => deleteNotification(item.id)}
                        className="text-[9px] text-gray-500 hover:text-red-400 font-bold transition-colors cursor-pointer flex items-center gap-1 ml-auto"
                      >
                        <Trash2 size={10} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
