/**
 * ============================================
 * RKAF SECURE COMMAND NETWORK - NAVIGATION
 * ============================================
 * Main navigation with integrated authentication
 */

import { useState } from 'react';
import { Shield, Lock, LogOut, Menu, X, Clock, User, Bell } from 'lucide-react';
import { useRKAFStore } from '@/store/RKAFStore';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const { 
    currentUser, 
    isAuthenticated, 
    isAdmin, 
    login, 
    logout, 
    state 
  } = useRKAFStore();
  
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const [showLogin, setShowLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update clock
  useState(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    const result = login(loginData.username, loginData.password);
    
    if (result.success) {
      setShowLogin(false);
      setLoginData({ username: '', password: '' });
      if (result.user && !result.user.acceptedTerms) {
        onNavigate('profile');
      }
    } else {
      setLoginError(result.message);
    }
  };

  const navItems = [
    { label: 'Home', path: 'home' },
    { label: 'Command', path: 'command' },
    { label: 'Units', path: 'units' },
    { label: 'Operations', path: 'operations', requiresAuth: true, clearance: 3 },
    { label: 'Recruitment', path: 'recruitment' },
    { label: 'Media', path: 'media' },
    { label: 'Archives', path: 'archives' },
    { label: 'History', path: 'history' },
    { label: 'Organization', path: 'organization' },
    { label: 'Equipment', path: 'equipment' },
  ];

  const authNavItems = [
    { label: 'Bulletin Board', path: 'bulletin' },
    { label: 'Communications', path: 'communications' },
  ];

  const isActive = (path: string) => currentPage === path;

  const canAccess = (item: typeof navItems[0]) => {
    if (!item.requiresAuth) return true;
    if (!isAuthenticated) return false;
    if (item.clearance && !state.users.find(u => u.id === currentUser?.id)?.clearanceLevel) return false;
    return true;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/95 backdrop-blur-md border-b border-[#BFA15A]/30">
        <div className="w-full px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <div className="relative">
                <Shield className="w-8 h-8 text-[#BFA15A]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-[#0a0f1a]">RK</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="font-mono text-xs tracking-widest text-[#BFA15A]">ROYAL KALMAR</div>
                <div className="font-display text-sm font-bold tracking-wider text-[#F4F6FA]">AIR FORCE</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => canAccess(item) && onNavigate(item.path)}
                  disabled={!canAccess(item)}
                  className={`px-4 py-2 font-mono text-xs tracking-wider uppercase transition-all duration-200 ${
                    isActive(item.path)
                      ? 'text-[#BFA15A] bg-[#BFA15A]/10'
                      : canAccess(item)
                        ? 'text-[#A9B3C2] hover:text-[#F4F6FA] hover:bg-[#BFA15A]/5'
                        : 'text-[#4B5563] cursor-not-allowed'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {isAuthenticated && authNavItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className={`px-4 py-2 font-mono text-xs tracking-wider uppercase transition-all duration-200 ${
                    isActive(item.path)
                      ? 'text-[#BFA15A] bg-[#BFA15A]/10'
                      : 'text-[#A9B3C2] hover:text-[#F4F6FA] hover:bg-[#BFA15A]/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {isAdmin && (
                <button
                  onClick={() => onNavigate('admin')}
                  className={`px-4 py-2 font-mono text-xs tracking-wider uppercase transition-all duration-200 ${
                    isActive('admin')
                      ? 'text-[#BFA15A] bg-[#BFA15A]/10'
                      : 'text-[#A9B3C2] hover:text-[#F4F6FA] hover:bg-[#BFA15A]/5'
                  }`}
                >
                  Admin
                </button>
              )}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Clock */}
              <div className="hidden md:flex items-center gap-2 text-[#6B7280]">
                <Clock className="w-4 h-4" />
                <span className="font-mono text-xs">
                  {currentTime.toLocaleTimeString('en-GB', { hour12: false })}
                </span>
              </div>

              {/* Auth */}
              {isAuthenticated ? (
                <div className="flex items-center gap-3 relative">
                  {/* notifications icon placeholder */}
                  <button className="p-2 text-[#6B7280] hover:text-[#F4F6FA]">
                    <Bell className="w-5 h-5" />
                  </button>

                  {/* profile / dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="flex items-center gap-2 p-2 text-[#6B7280] hover:text-[#F4F6FA]"
                      title="Account"
                    >
                      <User className="w-5 h-5" />
                      <span className="hidden sm:inline font-mono text-xs">
                        {currentUser?.displayName || currentUser?.username}
                      </span>
                    </button>
                    {showProfileMenu && (
                      <div className="absolute right-0 mt-2 w-40 bg-[#111] border border-[#444] rounded shadow-lg z-50">
                        <button
                          onClick={() => {
                            setShowProfileMenu(false);
                            onNavigate('profile');
                          }}
                          className="w-full text-left px-4 py-2 font-mono text-xs text-[#c0c0c0] hover:bg-[#222]"
                        >Profile</button>
                        <button
                          onClick={() => { setShowProfileMenu(false); setShowLogoutConfirm(true); }}
                          className="w-full text-left px-4 py-2 font-mono text-xs text-[#c0c0c0] hover:bg-[#222]"
                        >Sign Out</button>
                      </div>
                    )}
                  </div>

                  {/* logout button also present for quick access */}
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="p-2 text-[#6B7280] hover:text-[#EF4444] transition-colors"
                    title="Secure Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>

                  {/* confirmation modal */}
                  {showLogoutConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                      <div className="bg-[#111] p-6 rounded border border-[#444] w-80">
                        <p className="font-mono text-sm text-[#F4F6FA] mb-4">Confirm Sign Out?</p>
                        <div className="flex justify-end gap-4">
                          <button
                            onClick={() => setShowLogoutConfirm(false)}
                            className="px-3 py-1 font-mono text-xs text-[#c0c0c0] hover:text-[#F4F6FA]"
                          >Cancel</button>
                          <button
                            onClick={() => { setShowLogoutConfirm(false); logout(); onNavigate('home'); }}
                            className="px-3 py-1 font-mono text-xs bg-[#EF4444] text-[#0a0f1a] hover:bg-[#F87171]"
                          >Sign Out</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="flex items-center gap-2 px-4 py-2 border border-[#BFA15A]/50 text-[#BFA15A] font-mono text-xs tracking-wider uppercase hover:bg-[#BFA15A]/10 transition-all"
                >
                  <Lock className="w-4 h-4" />
                  <span className="hidden sm:inline">Secure Login</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#A9B3C2] hover:text-[#F4F6FA]"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#BFA15A]/20 bg-[#0a0f1a]/98">
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    if (canAccess(item)) {
                      onNavigate(item.path);
                      setMobileMenuOpen(false);
                    }
                  }}
                  disabled={!canAccess(item)}
                  className={`block w-full text-left px-4 py-3 font-mono text-sm tracking-wider uppercase transition-all ${
                    isActive(item.path)
                      ? 'text-[#BFA15A] bg-[#BFA15A]/10'
                      : canAccess(item)
                        ? 'text-[#A9B3C2] hover:text-[#F4F6FA] hover:bg-[#BFA15A]/5'
                        : 'text-[#4B5563] cursor-not-allowed'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              {isAuthenticated && authNavItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    onNavigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 font-mono text-sm tracking-wider uppercase transition-all ${
                    isActive(item.path)
                      ? 'text-[#BFA15A] bg-[#BFA15A]/10'
                      : 'text-[#A9B3C2] hover:text-[#F4F6FA] hover:bg-[#BFA15A]/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              {isAdmin && (
                <button
                  onClick={() => {
                    onNavigate('admin');
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 font-mono text-sm tracking-wider uppercase transition-all ${
                    isActive('admin')
                      ? 'text-[#BFA15A] bg-[#BFA15A]/10'
                      : 'text-[#A9B3C2] hover:text-[#F4F6FA] hover:bg-[#BFA15A]/5'
                  }`}
                >
                  Admin Panel
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0f1a]/95 backdrop-blur-sm">
          <div className="relative w-full max-w-md mx-4 bg-[#111827] border border-[#BFA15A]/30 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#BFA15A]/20">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-[#BFA15A]" />
                <div>
                  <h2 className="font-display text-lg font-bold text-[#F4F6FA]">Secure Login</h2>
                  <p className="font-mono text-xs text-[#6B7280]">RKAF Command Network</p>
                </div>
              </div>
              <button
                onClick={() => setShowLogin(false)}
                className="p-2 text-[#6B7280] hover:text-[#F4F6FA]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLogin} className="p-6 space-y-4">
              {loginError && (
                <div className="p-3 bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] font-mono text-xs">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block font-mono text-xs tracking-wider text-[#6B7280] mb-2">
                  USERNAME / SERVICE ID
                </label>
                <input
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0a0f1a] border border-[#BFA15A]/30 text-[#F4F6FA] font-mono text-sm focus:outline-none focus:border-[#BFA15A] transition-colors"
                  placeholder="Enter username or Service ID"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="block font-mono text-xs tracking-wider text-[#6B7280] mb-2">
                  PASSWORD
                </label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0a0f1a] border border-[#BFA15A]/30 text-[#F4F6FA] font-mono text-sm focus:outline-none focus:border-[#BFA15A] transition-colors"
                  placeholder="Enter secure password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#BFA15A] text-[#0a0f1a] font-mono text-sm tracking-wider uppercase font-bold hover:bg-[#d4b76a] transition-colors"
              >
                Access Command Network
              </button>

              <div className="text-center pt-2">
                <p className="font-mono text-xs text-[#4B5563]">
                  Default: admin / RKAF-Command-2026
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
