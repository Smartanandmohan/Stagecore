import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSiteContent } from '../../context/SiteContentContext';
import { Menu, X, User, LogOut, Terminal } from 'lucide-react';

export const Navbar = ({ onOpenAuth, activeSection, setActiveSection }) => {
  const { user, logout } = useAuth();
  const { content } = useSiteContent();
  const { site, navLinks } = content;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    if (window.location.pathname !== '/' && window.location.pathname !== '/home') {
      window.location.href = `/?sec=${id}`;
      return;
    }
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-gaming-bg/85 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-gaming-purple to-gaming-blue rounded-xl shadow-lg shadow-gaming-purple/20">
              <span className="font-black text-2xl text-white tracking-tighter">{site.logoLetter}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl text-white tracking-wider font-gaming">{site.brandName}</span>
              <span className="text-[9px] text-gaming-blue font-bold tracking-widest uppercase">{site.tagline}</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative font-semibold text-sm tracking-wide uppercase transition-colors duration-300 cursor-pointer ${
                  activeSection === link.id ? 'text-gaming-blue' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-gaming-blue rounded-full shadow-[0_0_8px_#06b6d4]" />
                )}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">

            {user ? (
              <div className="flex items-center gap-4">
                <a
                  href="/dashboard"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white font-semibold px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-gaming-purple/40 transition-all duration-200 cursor-pointer"
                  title="Player Dashboard"
                >
                  <User size={14} className="text-gaming-purple" />
                  <span>{user.username}</span>
                </a>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all duration-300 cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onOpenAuth('login')}
                className="px-6 py-2.5 bg-gradient-to-r from-gaming-purple to-gaming-neon hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(124,58,237,0.4)] cursor-pointer"
              >
                🚀 Demo Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-400 hover:text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/5 py-4 px-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left py-2 font-semibold text-sm tracking-wide uppercase transition-colors duration-300 ${
                  activeSection === link.id ? 'text-gaming-blue' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.name}
              </button>
            ))}
            <hr className="border-white/5 my-2" />

            {user ? (
              <div className="flex items-center justify-between mt-2">
                <a
                  href="/dashboard"
                  className="flex items-center gap-2 text-sm text-gray-300 font-semibold px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 cursor-pointer"
                >
                  <User size={14} className="text-gaming-purple" />
                  <span>{user.username}</span>
                </a>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-red-400 font-semibold text-sm py-1.5 px-3 hover:bg-white/5 rounded-lg transition-all duration-300"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuth('login'); }}
                className="w-full py-3 bg-gradient-to-r from-gaming-purple to-gaming-neon hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-300"
              >
                🚀 Demo Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
