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

function App() {
  const [booting, setBooting] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [showCredentials, setShowCredentials] = useState(false);
  const { haveCredentialsBeenShown, markCredentialsShown } = useRKAFStore();

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
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Initial Credentials Modal */}
      {showCredentials && <InitialCredentialsModal onClose={handleCredentialsClose} />}

      {/* Main Content */}
      <main className="relative">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
