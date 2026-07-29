import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import valorantCard from '../assets/images/valorant_card.png';
import bgmiCard from '../assets/images/bgmi_card.png';
import freeFireCard from '../assets/images/free_fire_card.png';
import cs2Card from '../assets/images/cs2_card.png';
import arenaBackground from '../assets/images/arena_background.png';

const STORAGE_KEY = 'stagecore_site_content';

export const getDefaultContent = (images) => ({
  // ── Site Settings ──────────────────────────────────────────────
  site: {
    brandName: 'STAGECORE',
    tagline: 'ESPORTS TOURNAMENTS',
    logoLetter: 'S',
    favicon: '',
    pageTitle: 'StageCore | Premium Esports Tournament & Media Brand',
    metaDescription: 'StageCore is a premium esports tournament platform and media brand.',
  },
  // ── Hero Section ───────────────────────────────────────────────
  hero: {
    line1: 'We Organize.',
    line2: 'We Produce.',
    line3: 'We Inspire.',
    subtext: 'StageCore is an esports tournament organizer and media brand. We host official competitive events, produce high-quality broadcasts, and build the esports community.',
    ctaPrimary: 'View Tournaments',
    ctaSecondary: 'Explore Matches',
    backgroundImage: images?.arenaBackground || '',
    highlightCard: {
      badge: 'Upcoming Tournament',
      title: 'StageCore Valorant Cup #12',
      format: '5v5',
      mode: 'Online',
      prize: '₹ 25,000 Prize Pool',
      schedule: '25 May - 26 May 2024',
      registerBtnText: 'Register Now',
    },
  },
  // ── Statistics Counters ────────────────────────────────────────
  stats: [
    { value: '150K+', label: 'Players Reached' },
    { value: '250+', label: 'Tournaments Hosted' },
    { value: '1M+', label: 'Views Generated' },
    { value: '50K+', label: 'Community Members' },
  ],
  // ── Features Section ───────────────────────────────────────────
  features: [
    { title: 'Official Organizer', desc: 'We organize and manage our own official esports events with fair rule systems.' },
    { title: 'Live Broadcasts', desc: 'High-quality production and live streaming on multiple platforms.' },
    { title: 'Fair Play', desc: 'Strict anti-cheat, fair competition, and professional management.' },
    { title: 'Community Driven', desc: 'Building a strong community of gamers, fans, and esports enthusiasts.' },
    { title: 'Trusted Brand', desc: 'Partnered with leading sponsors and technology partners.' },
  ],
  // ── Tournaments Section ────────────────────────────────────────
  tournamentsHeading: 'Official. Competitive. Trusted.',
  tournamentsSubtext: 'We run our own tournaments across top esports titles with professional production and fair play.',
  tournaments: [
    { id: 1, name: 'StageCore Valorant Cup #12', game: 'Valorant', image: images?.valorantCard || '', mode: '5v5', format: 'Single Elim', prize: '₹ 25,000', date: '25 May - 26 May', status: 'UPCOMING' },
    { id: 2, name: 'StageCore BGMI Masters', game: 'BGMI', image: images?.bgmiCard || '', mode: 'Squad', format: 'Points Table', prize: '₹ 50,000', date: 'Live Now', status: 'LIVE' },
    { id: 3, name: 'StageCore Free Fire Clash', game: 'Free Fire', image: images?.freeFireCard || '', mode: 'Squad', format: 'Double Elim', prize: '₹ 10,000', date: '1 Jun - 2 Jun', status: 'UPCOMING' },
    { id: 4, name: 'StageCore CS2 Cup', game: 'CS2', image: images?.cs2Card || '', mode: '5v5', format: 'Single Elim', prize: '₹ 30,000', date: '8 Jun - 9 Jun', status: 'UPCOMING' },
  ],
  // ── Matches Section ────────────────────────────────────────────
  matches: [
    { id: 1, team1: 'Velocity Gaming', team2: 'Reckoning Esports', score1: 13, score2: 11, status: 'LIVE', game: 'Valorant', stage: 'Grand Finals', time: 'Started 2h ago', streamUrl: 'https://twitch.tv' },
    { id: 2, team1: 'GodLike Esports', team2: 'Team Soul', score1: 0, score2: 0, status: 'UPCOMING', game: 'BGMI', stage: 'Round of 16', time: 'Starts in 1h', streamUrl: '' },
    { id: 3, team1: 'True Rippers', team2: 'Entity Gaming', score1: 2, score2: 0, status: 'COMPLETED', game: 'CS2', stage: 'Semi Finals', time: 'Completed yesterday', streamUrl: '' },
  ],
  // ── Team Rankings ──────────────────────────────────────────────
  teamRankings: [
    { id: 1, rank: 1, name: 'Velocity Gaming', score: '1,450' },
    { id: 2, rank: 2, name: 'GodLike Esports', score: '1,320' },
    { id: 3, rank: 3, name: 'Team Soul', score: '1,280' },
    { id: 4, rank: 4, name: 'Entity Gaming', score: '1,150' },
    { id: 5, rank: 5, name: 'True Rippers', score: '990' },
  ],
  // ── Player Rankings ────────────────────────────────────────────
  playerRankings: [
    { id: 1, rank: 1, name: 'SlayerX', team: 'Velocity Gaming', score: '9.8' },
    { id: 2, rank: 2, name: 'JONATHAN', team: 'GodLike Esports', score: '9.6' },
    { id: 3, rank: 3, name: 'Mortal', team: 'Team Soul', score: '9.4' },
    { id: 4, rank: 4, name: 'Viper', team: 'Entity Gaming', score: '9.1' },
  ],
  // ── News Section ───────────────────────────────────────────────
  news: [
    { id: 1, title: 'StageCore Announces Valorant Pro Series Season 3', category: 'Announcement', date: '30 May 2026', readTime: '5 min read', desc: 'Get ready for our largest tournament yet, featuring a record-breaking prize pool and live arena offline finals.' },
    { id: 2, title: 'Fair Play Policy Updates: Anti-Cheat Anti-Doping Integration', category: 'Event Update', date: '28 May 2026', readTime: '3 min read', desc: 'We are updating our rulebooks to integrate advanced server-side anti-cheat tools to ensure an even playing field.' },
    { id: 3, title: 'Behind the Scenes of StageCore BGMI Masters Production', category: 'Behind the Scenes', date: '26 May 2026', readTime: '8 min read', desc: 'A deep look into how our production and broadcasting teams deliver 4K streaming and high-fidelity player cams.' },
  ],
  // ── Sponsors ───────────────────────────────────────────────────
  sponsors: [
    { id: 1, name: 'NVIDIA G-SYNC', type: 'Technology Partner', url: 'https://nvidia.com' },
    { id: 2, name: 'STEELSERIES', type: 'Gear Sponsor', url: 'https://steelseries.com' },
    { id: 3, name: 'HYPERX', type: 'Audio Partner', url: 'https://hyperx.com' },
    { id: 4, name: 'ROG ASUS', type: 'Hardware Sponsor', url: 'https://asus.com/rog' },
    { id: 5, name: 'MONSTER ENERGY', type: 'Beverage Partner', url: 'https://monsterenergy.com' },
    { id: 6, name: 'INTEL CORE', type: 'Platform Partner', url: 'https://intel.com' },
  ],
  sponsorsHeading: 'Trusted by Industry Leaders',
  sponsorsSubtext: 'We partner with the world\'s leading technology, hardware, and lifestyle brands to deliver next-level gaming tournaments.',
  partnerCtaText: 'Become a Partner',
  partnerCtaDesc: 'Are you looking to connect with the gaming audience? Partner with StageCore to host custom tournaments or sponsor live broadcasts.',
  partnerEmail: 'partnerships@stagecore.com',
  // ── Navigation Links ───────────────────────────────────────────
  navLinks: [
    { name: 'Home', id: 'home' },
    { name: 'Tournaments', id: 'tournaments' },
    { name: 'Matches', id: 'matches' },
    { name: 'Rankings', id: 'rankings' },
    { name: 'News', id: 'news' },
    { name: 'Sponsors', id: 'sponsors' },
  ],
  // ── Footer Info ────────────────────────────────────────────────
  footer: {
    description: 'StageCore is a premium tournament organizer and media brand. We host events, produce high-quality broadcasts, and build communities.',
    address: 'Cyber City, Bangalore, India',
    email: 'support@stagecore.com',
    phone: '+91 98765 43210',
    footerLinks: [
      { name: 'Rulebook & Fair Play Guidelines', href: '/rulebook' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'Anti-Cheat Enforcement', href: '/anti-cheat' },
      { name: 'Community Moderator Panel', href: '/community' },
    ],
    copyright: `© ${new Date().getFullYear()} StageCore Esports. All rights reserved.`,
  },
  // ── Social Media Links ─────────────────────────────────────────
  social: {
    twitter: 'https://twitter.com',
    youtube: 'https://youtube.com',
    twitch: 'https://twitch.tv',
    discord: 'https://discord.gg',
    instagram: 'https://instagram.com',
  },
});

const SiteContentContext = createContext(null);

export const SiteContentProvider = ({ children }) => {
  // Load from localStorage or use defaults
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with defaults to handle new fields added later
        const defaults = getDefaultContent({
          valorantCard, bgmiCard, freeFireCard, cs2Card, arenaBackground
        });
        return deepMerge(defaults, parsed);
      }
    } catch (e) {
      console.warn('Could not load saved content from localStorage', e);
    }
    return getDefaultContent({ valorantCard, bgmiCard, freeFireCard, cs2Card, arenaBackground });
  });

  // Auto-save to localStorage whenever content changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.warn('Could not save content to localStorage', e);
    }
  }, [content]);

  // Update a top-level section
  const updateSection = useCallback((section, data) => {
    setContent(prev => ({
      ...prev,
      [section]: typeof data === 'function' ? data(prev[section]) : data,
    }));
  }, []);

  // Reset everything to factory defaults
  const resetToDefaults = useCallback(() => {
    const defaults = getDefaultContent({ valorantCard, bgmiCard, freeFireCard, cs2Card, arenaBackground });
    setContent(defaults);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <SiteContentContext.Provider value={{ content, updateSection, resetToDefaults }}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error('useSiteContent must be used within SiteContentProvider');
  return ctx;
};

// Deep merge helper: merges source into target (target values win for scalars)
function deepMerge(target, source) {
  if (!source) return target;
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] !== null &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}
