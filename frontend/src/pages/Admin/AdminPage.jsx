import React, { useState, lazy, Suspense } from 'react';
import { AdminLayout } from './layouts/AdminLayout';
import { AdminRoute } from '../../components/AdminRoute/AdminRoute';

// Lazy load new subfolder SaaS admin pages
const DashboardPage = lazy(() => import('./dashboard/DashboardPage').then(m => ({ default: m.DashboardPage })));
const TournamentList = lazy(() => import('./tournaments/TournamentList'));
const MatchList = lazy(() => import('./matches/MatchList'));
const TeamList = lazy(() => import('./teams/TeamList'));
const PlayerList = lazy(() => import('./players/PlayerList'));
const RegistrationList = lazy(() => import('./registrations/RegistrationList').then(m => ({ default: m.RegistrationList })));
const NewsList = lazy(() => import('./news/NewsList').then(m => ({ default: m.NewsList })));
const SponsorManagement = lazy(() => import('./sponsors/SponsorManagement').then(m => ({ default: m.SponsorManagement })));
const ReportsPage = lazy(() => import('./reports/ReportsPage').then(m => ({ default: m.ReportsPage })));
const SettingsPage = lazy(() => import('./settings/SettingsPage').then(m => ({ default: m.SettingsPage })));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-2 border-gaming-purple border-t-transparent rounded-full animate-spin" />
      <span className="text-gray-400 text-xs font-semibold">Loading console panel...</span>
    </div>
  </div>
);

export const AdminPage = ({ onOpenAuth }) => {
  const [activePage, setActivePage] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [quickActionTrigger, setQuickActionTrigger] = useState(null);

  const handleQuickAction = (actionId) => {
    setQuickActionTrigger({ actionId, timestamp: Date.now() });
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage setActivePage={setActivePage} />;
      case 'tournaments':
        return (
          <TournamentList 
            key={quickActionTrigger?.actionId === 'create-tournament' ? quickActionTrigger.timestamp : 'tournaments'} 
            defaultOpenCreate={quickActionTrigger?.actionId === 'create-tournament'} 
          />
        );
      case 'matches':
        return (
          <MatchList 
            key={quickActionTrigger?.actionId === 'create-match' ? quickActionTrigger.timestamp : 'matches'} 
            defaultOpenCreate={quickActionTrigger?.actionId === 'create-match'} 
          />
        );
      case 'teams':
        return (
          <TeamList 
            key={quickActionTrigger?.actionId === 'add-team' ? quickActionTrigger.timestamp : 'teams'} 
            defaultOpenCreate={quickActionTrigger?.actionId === 'add-team'} 
          />
        );
      case 'players':
        return (
          <PlayerList 
            key={quickActionTrigger?.actionId === 'add-player' ? quickActionTrigger.timestamp : 'players'} 
            defaultOpenCreate={quickActionTrigger?.actionId === 'add-player'} 
          />
        );
      case 'registrations':
        return <RegistrationList />;
      case 'news':
        return (
          <NewsList 
            key={quickActionTrigger?.actionId === 'add-news' ? quickActionTrigger.timestamp : 'news'} 
            defaultOpenCreate={quickActionTrigger?.actionId === 'add-news'} 
          />
        );
      case 'sponsors':
        return <SponsorManagement />;
      case 'reports':
        return <ReportsPage initialTab="analytics" />;
      case 'moderation':
        return <ReportsPage initialTab="moderation" />;
      case 'anticheat':
        return <ReportsPage initialTab="anticheat" />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage setActivePage={setActivePage} />;
    }
  };

  return (
    <AdminRoute onOpenAuth={onOpenAuth}>
      <AdminLayout
        activePage={activePage}
        setActivePage={setActivePage}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onQuickAction={handleQuickAction}
      >
        <Suspense fallback={<LoadingSpinner />}>
          {renderPage()}
        </Suspense>
      </AdminLayout>
    </AdminRoute>
  );
};

