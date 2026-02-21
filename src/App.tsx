/**
 * ============================================
 * RKAF SECURE COMMAND NETWORK - MAIN APP
 * ============================================
 * Production-Ready Military Intranet System
 * 
 * DEPLOYMENT CHECKLIST:
 * [x] Safe state initialization
 * [x] Default admin credentials
 * [x] Boot sequence animation
 * [x] Authentication system
 * [x] All pages implemented
 * [x] Error handling
 * [x] Data persistence
 * [x] Emergency recovery
 */

import { useState, useEffect } from 'react';
import { BootSequence } from '@/components/BootSequence';
import { Navigation } from '@/components/Navigation';
import { GlobalAlertBanner } from '@/components/GlobalAlertBanner';
import { InitialCredentialsModal } from '@/components/InitialCredentialsModal';
import { useRKAFStore } from '@/store/RKAFStore';

// Pages
import { HomePage } from '@/pages/HomePage';
import { CommandPage } from '@/pages/CommandPage';
import { UnitsPage } from '@/pages/UnitsPage';
import { OperationsPage } from '@/pages/OperationsPage';
import { RecruitmentPage } from '@/pages/RecruitmentPage';
import { MediaPage } from '@/pages/MediaPage';
import { ArchivesPage } from '@/pages/ArchivesPage';
import { BulletinBoardPage } from '@/pages/BulletinBoardPage';
import { CommunicationsPage } from '@/pages/CommunicationsPage';
import { AdminPage } from '@/pages/AdminPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
import { TermsOfServicePage } from '@/pages/TermsOfServicePage';
import { HistoryPage } from '@/pages/HistoryPage';
import { OrganizationPage } from '@/pages/OrganizationPage';
import { EquipmentPage } from '@/pages/EquipmentPage';

function App() {
  const [booting, setBooting] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [showCredentials, setShowCredentials] = useState(false);
  const { haveCredentialsBeenShown, markCredentialsShown, isAuthenticated, getCurrentUser } = useRKAFStore();

  // Check if credentials need to be shown after boot
  useEffect(() => {
    if (!booting && !haveCredentialsBeenShown()) {
      setShowCredentials(true);
    }
  }, [booting, haveCredentialsBeenShown]);

  const handleBootComplete = () => {
    setBooting(false);
  };

  const handleCredentialsClose = () => {
    markCredentialsShown();
    setShowCredentials(false);
  };

  // ensure logged-out users cannot remain on restricted pages
  useEffect(() => {
    const restricted = ['communications','bulletin','admin','operations'];
    if (!isAuthenticated && restricted.includes(currentPage)) {
      setCurrentPage('home');
    }
  }, [currentPage, isAuthenticated]);

  // if user is authenticated but has not accepted terms, force profile page
  useEffect(() => {
    if (isAuthenticated) {
      const user = getCurrentUser();
      if (user && !user.acceptedTerms) {
        setCurrentPage('profile');
      }
    }
  }, [isAuthenticated, getCurrentUser]);

  // navigation handler with terms check
  const handleNavigate = (page: string) => {
    const user = getCurrentUser();
    if (user && !user.acceptedTerms && !['profile','privacy','terms'].includes(page)) {
      setCurrentPage('profile');
    } else {
      setCurrentPage(page);
    }
  };

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'command':
        return <CommandPage />;
      case 'units':
        return <UnitsPage />;
      case 'operations':
        return <OperationsPage />;
      case 'recruitment':
        return <RecruitmentPage />;
      case 'media':
        return <MediaPage />;
      case 'archives':
        return <ArchivesPage />;
      case 'bulletin':
        return <BulletinBoardPage />;
      case 'communications':
        return <CommunicationsPage />;
      case 'admin':
        return <AdminPage />;
      case 'profile':
        return <ProfilePage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsOfServicePage />;
      case 'history':
        return <HistoryPage />;
      case 'organization':
        return <OrganizationPage />;
      case 'equipment':
        return <EquipmentPage />;
      default:
        return <HomePage />;
    }
  };

  // Boot sequence
  if (booting) {
    return <BootSequence onComplete={handleBootComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-[#F4F6FA]">
      {/* Global Alert Banner */}
      <GlobalAlertBanner />

      {/* Navigation */}
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Initial Credentials Modal */}
      {showCredentials && <InitialCredentialsModal onClose={handleCredentialsClose} />}

      {/* Main Content */}
      <main className="relative">
        {renderPage()}
      </main>
      <footer className="py-6 px-4 lg:px-8 border-t border-[#BFA15A]/20 text-center space-x-2 space-y-2 lg:space-y-0">
        <button
          onClick={() => handleNavigate('history')}
          className="font-mono text-xs text-[#6B7280] hover:text-[#BFA15A]"
        >History</button>
        <span className="text-[#6B7280]">•</span>
        <button
          onClick={() => handleNavigate('organization')}
          className="font-mono text-xs text-[#6B7280] hover:text-[#BFA15A]"
        >Organization</button>
        <span className="text-[#6B7280]">•</span>
        <button
          onClick={() => handleNavigate('equipment')}
          className="font-mono text-xs text-[#6B7280] hover:text-[#BFA15A]"
        >Equipment</button>
        <span className="text-[#6B7280]">•</span>
        <button
          onClick={() => setCurrentPage('privacy')}
          className="font-mono text-xs text-[#6B7280] hover:text-[#BFA15A]"
        >Privacy Policy</button>
        <span className="text-[#6B7280]">•</span>
        <button
          onClick={() => setCurrentPage('terms')}
          className="font-mono text-xs text-[#6B7280] hover:text-[#BFA15A]"
        >Terms of Service</button>
      </footer>
    </div>
  );
}

export default App;
