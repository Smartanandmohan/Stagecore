import React from 'react';
import { ShieldCheck, Mail } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';

export const SponsorSection = () => {
  const { content } = useSiteContent();
  const { sponsors, sponsorsHeading, sponsorsSubtext, partnerCtaText, partnerCtaDesc, partnerEmail } = content;

  return (
    <section id="sponsors" className="py-20 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gaming-purple/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gaming-blue font-bold text-xs uppercase tracking-widest bg-gaming-blue/10 px-3.5 py-1.5 rounded-full border border-gaming-blue/20">
            Our Collaborators
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-gaming text-white uppercase mt-4">
            {sponsorsHeading}
          </h2>
          <p className="text-gray-400 mt-3 text-sm sm:text-base">
            {sponsorsSubtext}
          </p>
        </div>

        {/* Sponsors Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${Math.min(sponsors.length, 6)} gap-6 items-center justify-center`}>
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.id}
              href={sponsor.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center h-28 group hover:border-gaming-blue/40 transition-all duration-300 relative cursor-pointer"
            >
              <span className="font-black text-sm sm:text-base tracking-widest text-gray-500 group-hover:text-white transition-colors duration-300 font-gaming text-center">
                {sponsor.name}
              </span>
              <span className="text-[9px] text-gaming-purple font-bold tracking-wider uppercase mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {sponsor.type}
              </span>
            </a>
          ))}
        </div>

        {/* Partnership CTA */}
        <div className="mt-16 glass-panel p-8 rounded-3xl border border-white/5 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-lg font-bold font-gaming text-white flex items-center gap-2">
              <ShieldCheck className="text-gaming-blue" size={20} />
              <span>{partnerCtaText}</span>
            </h4>
            <p className="text-xs text-gray-400 mt-1 max-w-md">
              {partnerCtaDesc}
            </p>
          </div>
          <a
            href={`mailto:${partnerEmail}`}
            className="flex items-center gap-2 px-6 py-3 bg-gaming-purple hover:bg-gaming-purple/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 whitespace-nowrap shadow-[0_2px_15px_rgba(124,58,237,0.3)] cursor-pointer"
          >
            <Mail size={14} />
            <span>Contact Us</span>
          </a>
        </div>
      </div>
    </section>
  );
};
