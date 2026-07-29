import React, { useState } from 'react';
import { Settings, User, Share2, Palette, ShieldCheck, Check, Info } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export const SettingsView = () => {
  const { user } = useAuth();
  const [activeSubTab, setActiveSubTab] = useState('profile');
  const [toastMessage, setToastMessage] = useState(null);

  // States
  const [ign, setIgn] = useState(user?.username || 'AnandYT');
  const [email, setEmail] = useState(user?.email || 'anandyt@stagecore.gg');
  const [bio, setBio] = useState(localStorage.getItem('user_bio') || 'Semi-pro esports player competing in Valorant and BGMI tournaments. Vying for the MVP crown!');
  
  const [twitter, setTwitter] = useState(localStorage.getItem('user_social_twitter') || 'AnandYT_Esports');
  const [discord, setDiscord] = useState(localStorage.getItem('user_social_discord') || 'AnandYT#9999');
  const [twitch, setTwitch] = useState(localStorage.getItem('user_social_twitch') || 'anandyt_live');
  const [youtube, setYoutube] = useState(localStorage.getItem('user_social_youtube') || 'AnandYTGaming');

  const [selectedAvatar, setSelectedAvatar] = useState(localStorage.getItem('user_avatar') || '🎮');
  const [selectedBanner, setSelectedBanner] = useState(localStorage.getItem('user_banner') || 'cyberpunk');

  const [toggled2FA, setToggled2FA] = useState(localStorage.getItem('user_2fa') === 'true');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const avatarPresets = ['🎮', '💎', '🛡️', '👾', '🔥', '⚡', '🤖', '💀'];
  const bannerPresets = [
    { id: 'cyberpunk', name: 'Cyberpunk Glow', colors: 'from-[#7C3AED] via-[#FF007F] to-[#050816]' },
    { id: 'frostbite', name: 'Frostbite Ice', colors: 'from-[#00F0FF] via-[#3B82F6] to-[#050816]' },
    { id: 'toxic', name: 'Toxic Waste', colors: 'from-[#10B981] via-[#059669] to-[#050816]' },
    { id: 'abyss', name: 'Nether Abyss', colors: 'from-[#EF4444] via-[#7C3AED] to-[#050816]' }
  ];

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('user_bio', bio);
    
    // Save to user object in localStorage if needed
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    storedUser.username = ign;
    storedUser.email = email;
    localStorage.setItem('user', JSON.stringify(storedUser));
    
    triggerToast('Profile information saved successfully!');
    window.dispatchEvent(new Event('storage'));
  };

  const handleSaveSocials = (e) => {
    e.preventDefault();
    localStorage.setItem('user_social_twitter', twitter);
    localStorage.setItem('user_social_discord', discord);
    localStorage.setItem('user_social_twitch', twitch);
    localStorage.setItem('user_social_youtube', youtube);
    triggerToast('Social links linked successfully!');
  };

  const handleSaveAppearance = () => {
    localStorage.setItem('user_avatar', selectedAvatar);
    localStorage.setItem('user_banner', selectedBanner);
    triggerToast('Appearance settings customized!');
    window.dispatchEvent(new Event('storage'));
  };

  const handleToggle2FA = () => {
    const nextState = !toggled2FA;
    setToggled2FA(nextState);
    localStorage.setItem('user_2fa', nextState.toString());
    triggerToast(nextState ? '2FA enabled successfully!' : '2FA disabled.');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      triggerToast('Please fill all fields.');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    triggerToast('Password updated securely!');
  };

  return (
    <div className="space-y-6 text-left animate-fadeIn relative">
      
      {/* Toast Alert Popup Banner */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-emerald-500 text-white font-extrabold text-[10px] uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-500/20 border border-emerald-400 animate-slideRight">
          <Check size={14} />
          {toastMessage}
        </div>
      )}

      {/* Title Header */}
      <div>
        <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
          <Settings size={18} className="text-gaming-purple" />
          Account Settings
        </h2>
        <span className="text-[10px] text-gray-400 font-bold font-mono block mt-1">
          Customize your player cards, social feeds, and security controls.
        </span>
      </div>

      {/* Main Settings Outer Box */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Sub-nav panel */}
        <div className="glass-panel border border-white/5 bg-[#03050f]/60 rounded-2xl p-3 flex flex-col gap-1.5 h-fit">
          <button
            onClick={() => setActiveSubTab('profile')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider text-left transition-colors cursor-pointer ${
              activeSubTab === 'profile' ? 'bg-gaming-purple text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <User size={13} />
            Edit Profile
          </button>
          <button
            onClick={() => setActiveSubTab('socials')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider text-left transition-colors cursor-pointer ${
              activeSubTab === 'socials' ? 'bg-gaming-purple text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Share2 size={13} />
            Social Accounts
          </button>
          <button
            onClick={() => setActiveSubTab('appearance')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider text-left transition-colors cursor-pointer ${
              activeSubTab === 'appearance' ? 'bg-gaming-purple text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Palette size={13} />
            Appearance presets
          </button>
          <button
            onClick={() => setActiveSubTab('security')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider text-left transition-colors cursor-pointer ${
              activeSubTab === 'security' ? 'bg-gaming-purple text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck size={13} />
            Privacy & Security
          </button>
        </div>

        {/* Right sub-content pages */}
        <div className="lg:col-span-3">
          
          {/* PROFILE SUB-TAB */}
          {activeSubTab === 'profile' && (
            <div className="glass-panel border border-white/5 rounded-2xl p-5 sm:p-6 bg-[#03050f]/30 space-y-6">
              <h3 className="text-xs font-black text-white uppercase tracking-wider">Profile Information</h3>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">In-Game Name (IGN)</label>
                    <input
                      type="text"
                      value={ign}
                      onChange={(e) => setIgn(e.target.value)}
                      className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-2.5 text-[11px] text-white focus:outline-none focus:border-gaming-purple/40 placeholder-gray-600 font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Registered Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-2.5 text-[11px] text-white focus:outline-none focus:border-gaming-purple/40 placeholder-gray-600 font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Player Bio / Summary</label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-2.5 text-[11px] text-white focus:outline-none focus:border-gaming-purple/40 placeholder-gray-600 font-semibold leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gaming-purple hover:bg-gaming-purple/90 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md shadow-gaming-purple/20"
                  >
                    Save Profile Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SOCIAL ACCOUNTS SUB-TAB */}
          {activeSubTab === 'socials' && (
            <div className="glass-panel border border-white/5 rounded-2xl p-5 sm:p-6 bg-[#03050f]/30 space-y-6">
              <h3 className="text-xs font-black text-white uppercase tracking-wider">Social Integrations</h3>
              <form onSubmit={handleSaveSocials} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Twitter / X Handle</label>
                    <input
                      type="text"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                      placeholder="e.g. AnandYT"
                      className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-2.5 text-[11px] text-white focus:outline-none focus:border-gaming-purple/40 placeholder-gray-600 font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Discord Tag</label>
                    <input
                      type="text"
                      value={discord}
                      onChange={(e) => setDiscord(e.target.value)}
                      placeholder="e.g. anandyt#0000"
                      className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-2.5 text-[11px] text-white focus:outline-none focus:border-gaming-purple/40 placeholder-gray-600 font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Twitch Channel</label>
                    <input
                      type="text"
                      value={twitch}
                      onChange={(e) => setTwitch(e.target.value)}
                      placeholder="e.g. anandyt"
                      className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-2.5 text-[11px] text-white focus:outline-none focus:border-gaming-purple/40 placeholder-gray-600 font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">YouTube Custom URL</label>
                    <input
                      type="text"
                      value={youtube}
                      onChange={(e) => setYoutube(e.target.value)}
                      placeholder="e.g. AnandYT"
                      className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-2.5 text-[11px] text-white focus:outline-none focus:border-gaming-purple/40 placeholder-gray-600 font-semibold"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gaming-purple hover:bg-gaming-purple/90 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md shadow-gaming-purple/20"
                  >
                    Link Social Channels
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* APPEARANCE PRESETS TAB */}
          {activeSubTab === 'appearance' && (
            <div className="glass-panel border border-white/5 rounded-2xl p-5 sm:p-6 bg-[#03050f]/30 space-y-6">
              <h3 className="text-xs font-black text-white uppercase tracking-wider">Dashboard Customization</h3>
              
              {/* Avatar Preset Grid */}
              <div className="space-y-3">
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Select Avatar Preset</span>
                <div className="flex flex-wrap gap-3">
                  {avatarPresets.map((av, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedAvatar(av)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all cursor-pointer border ${
                        selectedAvatar === av 
                          ? 'border-gaming-purple bg-gaming-purple/25 shadow-md shadow-gaming-purple/20 scale-105' 
                          : 'border-white/10 hover:border-white/30 bg-[#050816]/60'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              {/* Banner Preset Grid */}
              <div className="space-y-3 pt-2">
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Select Theme Banner Gradient</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {bannerPresets.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => setSelectedBanner(preset.id)}
                      className={`h-16 rounded-xl relative overflow-hidden transition-all text-left p-4 cursor-pointer border flex flex-col justify-end ${
                        selectedBanner === preset.id 
                          ? 'border-gaming-purple ring-2 ring-gaming-purple/40 scale-[1.02]' 
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-tr ${preset.colors} opacity-50`} />
                      <span className="relative z-10 text-[10px] font-black text-white uppercase tracking-wider">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <button
                  onClick={handleSaveAppearance}
                  className="px-5 py-2.5 bg-gaming-purple hover:bg-gaming-purple/90 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md shadow-gaming-purple/20"
                >
                  Apply Custom Styling
                </button>
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeSubTab === 'security' && (
            <div className="space-y-6">
              
              {/* 2FA Toggle Info */}
              <div className="glass-panel border border-white/5 rounded-2xl p-5 bg-[#03050f]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">Two-Factor Authentication (2FA)</h4>
                  <p className="text-[10px] text-gray-400 font-medium leading-relaxed max-w-md">
                    Secure your account payouts and rosters with Google Authenticator verification codes.
                  </p>
                </div>
                
                <button
                  onClick={handleToggle2FA}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer shrink-0 border ${
                    toggled2FA 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                      : 'bg-white/3 border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  {toggled2FA ? '2FA Enabled' : 'Enable 2FA'}
                </button>
              </div>

              {/* 2FA Mock QR Code detail panel */}
              {toggled2FA && (
                <div className="glass-panel border border-white/5 rounded-2xl p-5 bg-[#03050f]/40 flex flex-col sm:flex-row items-center gap-6 animate-fadeIn">
                  <div className="w-24 h-24 bg-white p-2 rounded-xl flex items-center justify-center shadow-lg">
                    {/* Mock QR SVG */}
                    <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                      <rect x="10" y="10" width="20" height="20" fill="currentColor"/>
                      <rect x="70" y="10" width="20" height="20" fill="currentColor"/>
                      <rect x="10" y="70" width="20" height="20" fill="currentColor"/>
                      <rect x="35" y="35" width="30" height="30" fill="currentColor"/>
                      <rect x="15" y="45" width="10" height="10" fill="currentColor"/>
                      <rect x="45" y="15" width="10" height="10" fill="currentColor"/>
                      <rect x="75" y="45" width="10" height="10" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="space-y-2 text-center sm:text-left flex-1">
                    <span className="text-[9px] bg-gaming-purple/20 text-gaming-purple px-2 py-0.5 rounded font-black uppercase">Authenticator Configuration</span>
                    <p className="text-[10px] text-gray-300 font-bold">Secret Key: <span className="font-mono text-gaming-blue">STAGE CORE ANAND YT 2FA KEY</span></p>
                    <div className="flex items-start gap-1 text-[9px] text-gray-500 leading-normal max-w-sm">
                      <Info size={11} className="shrink-0 mt-0.5" />
                      <span>Scan this QR code in Google Authenticator or Authy to configure security backup codes.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Password resetting */}
              <div className="glass-panel border border-white/5 rounded-2xl p-5 sm:p-6 bg-[#03050f]/30 space-y-6">
                <h3 className="text-xs font-black text-white uppercase tracking-wider">Change Password</h3>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Current Password</label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-2.5 text-[11px] text-white focus:outline-none focus:border-gaming-purple/40 placeholder-gray-600 font-semibold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">New Secure Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-2.5 text-[11px] text-white focus:outline-none focus:border-gaming-purple/40 placeholder-gray-600 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-gaming-purple hover:bg-gaming-purple/90 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md shadow-gaming-purple/20"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
