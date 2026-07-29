import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { SiteContentProvider } from './context/SiteContentContext';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home/Home';
import { Footer } from './components/Footer/Footer';
import { Login } from './pages/Login/Login';
import { AdminPage } from './pages/Admin/AdminPage';
import { PlayerDashboardPage } from './pages/PlayerDashboard/PlayerDashboardPage';
import { DemoBadge } from './components/DemoBadge/DemoBadge';

// Import newly created pages
import { Rulebook } from './pages/Rulebook/Rulebook';
import { PrivacyPolicy } from './pages/PrivacyPolicy/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService/TermsOfService';
import { AntiCheat } from './pages/AntiCheat/AntiCheat';
import { Community } from './pages/Community/Community';
import { About } from './pages/About/About';
import { Contact } from './pages/Contact/Contact';
import { FAQ } from './pages/FAQ/FAQ';
import { Support } from './pages/Support/Support';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

function AppContent() {
  const [activeSection, setActiveSection] = useState('home');
  const [authModal, setAuthModal] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // Auth redirect modal trigger
    if (params.get('auth') === 'login') {
      setAuthModal('login');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    // Smooth scrolling redirect parameter from subpages
    const sec = params.get('sec');
    if (sec) {
      setTimeout(() => {
        const element = document.getElementById(sec);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const path = window.location.pathname.toLowerCase();

  // Route: Admin Dashboard Panel
  const isAdminRoute = path === '/admin' || path.startsWith('/admin/');
  if (isAdminRoute) {
    return (
      <>
        <AdminPage onOpenAuth={(mode) => setAuthModal(mode)} />
        <DemoBadge />
      </>
    );
  }

  // Route: Player Dashboard Panel
  const isDashboardRoute = path === '/dashboard' || path.startsWith('/dashboard/');
  if (isDashboardRoute) {
    return (
      <ErrorBoundary>
        <PlayerDashboardPage onOpenAuth={(mode) => setAuthModal(mode)} />
        <DemoBadge />
      </ErrorBoundary>
    );
  }

  // Render main page content based on URL path
  const renderMainContent = () => {
    switch (path) {
      case '/':
      case '/home':
        return <Home onOpenAuth={(mode) => setAuthModal(mode)} />;
      case '/rulebook':
        return <Rulebook />;
      case '/privacy-policy':
        return <PrivacyPolicy />;
      case '/terms-of-service':
        return <TermsOfService />;
      case '/anti-cheat':
        return <AntiCheat />;
      case '/community':
        return <Community />;
      case '/about':
        return <About />;
      case '/contact':
        return <Contact />;
      case '/faq':
        return <FAQ />;
      case '/support':
        return <Support />;
      default:
        return <Home onOpenAuth={(mode) => setAuthModal(mode)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gaming-bg text-gray-200 flex flex-col font-gaming">
      <Navbar
        onOpenAuth={(mode) => setAuthModal(mode)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="flex-grow">
        {renderMainContent()}
      </main>
      <Footer setActiveSection={setActiveSection} />

      <Login
        isOpen={authModal === 'login' || authModal === 'register'}
        initialTab={authModal === 'register' ? 'signup' : 'login'}
        onClose={() => setAuthModal(null)}
      />
      <DemoBadge />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <SiteContentProvider>
        <AppContent />
      </SiteContentProvider>
    </AuthProvider>
  );
}

export default App;
