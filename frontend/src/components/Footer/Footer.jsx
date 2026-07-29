import React from 'react';
import { Globe, Video, Tv, MessageSquare, Mail, MapPin, Phone, Camera } from 'lucide-react';

import { useSiteContent } from '../../context/SiteContentContext';

export const Footer = ({ setActiveSection }) => {
  const { content } = useSiteContent();
  const { site, footer, social, navLinks } = content;

  const handleNavClick = (id) => {
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

  const socialLinks = [
    { href: social.twitter, icon: Globe, label: 'Twitter', hoverClass: 'hover:bg-gaming-blue/20 hover:text-gaming-blue' },
    { href: social.youtube, icon: Video, label: 'YouTube', hoverClass: 'hover:bg-red-500/20 hover:text-red-500' },
    { href: social.twitch, icon: Tv, label: 'Twitch', hoverClass: 'hover:bg-gaming-purple/20 hover:text-gaming-purple' },
    { href: social.discord, icon: MessageSquare, label: 'Discord', hoverClass: 'hover:bg-indigo-500/20 hover:text-indigo-400' },
    { href: social.instagram, icon: Camera, label: 'Instagram', hoverClass: 'hover:bg-pink-500/20 hover:text-pink-400' },

  ];

  return (
    <footer className="bg-[#03050f] border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-gaming-purple/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand */}
        <div className="flex flex-col items-start text-left md:col-span-1">
          <div className="flex items-center gap-3 cursor-pointer mb-5" onClick={() => handleNavClick('home')}>
            <div className="w-9 h-9 flex items-center justify-center bg-gradient-to-tr from-gaming-purple to-gaming-blue rounded-lg shadow-lg">
              <span className="font-black text-xl text-white tracking-tighter">{site.logoLetter}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg text-white tracking-wider font-gaming">{site.brandName}</span>
              <span className="text-[8px] text-gaming-blue font-bold tracking-widest uppercase">{site.tagline}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed mb-6">{footer.description}</p>
          {/* Socials */}
          <div className="flex items-center gap-3 flex-wrap">
            {socialLinks.map(({ href, icon: Icon, label, hoverClass }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  title={label}
                  className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 transition-all duration-300 border border-white/5 ${hoverClass}`}
                >
                  <Icon size={14} />
                </a>
              ) : null
            )}
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="text-left">
          <h4 className="font-extrabold text-sm text-white uppercase tracking-wider font-gaming mb-5 border-l-2 border-gaming-purple pl-2.5">
            Quick Navigation
          </h4>
          <ul className="flex flex-col gap-3.5 text-xs font-semibold text-gray-400">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className="hover:text-white transition-colors duration-200 capitalize cursor-pointer"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Quick Links */}
        <div className="text-left">
          <h4 className="font-extrabold text-sm text-white uppercase tracking-wider font-gaming mb-5 border-l-2 border-gaming-blue pl-2.5">
            Important Information
          </h4>
          <ul className="flex flex-col gap-3.5 text-xs font-semibold text-gray-400">
            {footer.footerLinks?.map((link, i) => (
              <li key={i}>
                <a href={link.href || '#'} className="hover:text-white transition-colors">{link.name}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="text-left">
          <h4 className="font-extrabold text-sm text-white uppercase tracking-wider font-gaming mb-5 border-l-2 border-gaming-purple pl-2.5">
            Office & Support
          </h4>
          <ul className="flex flex-col gap-3.5 text-xs font-semibold text-gray-400">
            {footer.address && (
              <li className="flex items-center gap-2.5">
                <MapPin size={14} className="text-gaming-purple shrink-0" />
                <span>{footer.address}</span>
              </li>
            )}
            {footer.email && (
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-gaming-blue shrink-0" />
                <a href={`mailto:${footer.email}`} className="hover:text-white transition-colors">{footer.email}</a>
              </li>
            )}
            {footer.phone && (
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-gaming-purple shrink-0" />
                <span>{footer.phone}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <hr className="border-white/5 my-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:flex md:items-center md:justify-between text-xs text-gray-500">
        <span>{footer.copyright}</span>
        <span className="mt-2 md:mt-0 block">Made for Pro Gamers worldwide.</span>
      </div>
    </footer>
  );
};
