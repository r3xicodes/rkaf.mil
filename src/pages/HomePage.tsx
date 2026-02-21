/**
 * ============================================
 * RKAF SECURE COMMAND NETWORK - HOME PAGE
 * ============================================
 * Main landing page with mission overview
 */

import { useState, useEffect } from 'react';
import { Shield, Plane, Radio, Users, Target, ChevronRight, AlertTriangle, CheckCircle } from 'lucide-react';
import { useRKAFStore } from '@/store/RKAFStore';

export function HomePage() {
  const { state, isAuthenticated } = useRKAFStore();
  const [_currentAnnouncement, setCurrentAnnouncement] = useState(0);

  // Rotate announcements
  useEffect(() => {
    if (state.posts.length === 0) return;
    const timer = setInterval(() => {
      setCurrentAnnouncement(prev => (prev + 1) % Math.min(state.posts.length, 3));
    }, 8000);
    return () => clearInterval(timer);
  }, [state.posts.length]);

  const pinnedPosts = state.posts.filter(p => p.isPinned).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 80%, rgba(191, 161, 90, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(191, 161, 90, 0.1) 0%, transparent 50%)
              `,
            }}
          />
          {/* Grid overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(191, 161, 90, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(191, 161, 90, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          {/* Emblem */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-40 h-40 md:w-56 md:h-56 border-2 border-[#BFA15A]/50 flex items-center justify-center relative">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#BFA15A]" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#BFA15A]" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#BFA15A]" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#BFA15A]" />
                
                {/* Inner design */}
                <div className="absolute inset-4 border border-[#BFA15A]/30" />
                
                {/* Center shield */}
                <Shield className="w-20 h-20 md:w-28 md:h-28 text-[#BFA15A]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl md:text-2xl font-bold text-[#0a0f1a]">RK</span>
                </div>
              </div>
              
              {/* Orbiting elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#BFA15A] rounded-full animate-pulse" />
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#BFA15A]/60 rounded-full" />
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-[#F4F6FA] tracking-wider mb-4">
            ROYAL KALMAR
          </h1>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-[#BFA15A] tracking-[0.3em] mb-8">
            AIR FORCE
          </h2>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#BFA15A]" />
            <p className="font-mono text-sm md:text-base text-[#A9B3C2] tracking-[0.2em]">
              SECURE COMMAND NETWORK
            </p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#BFA15A]" />
          </div>

          <p className="max-w-2xl mx-auto text-[#A9B3C2] text-lg mb-12 leading-relaxed">
            Defending the skies of Kalmar with honor, precision, and unwavering commitment. 
            Our forces stand ready to protect our nation and allies around the clock.
          </p>

          {/* Status indicators */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-mono text-sm text-[#A9B3C2]">SYSTEM OPERATIONAL</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-[#BFA15A]" />
              <span className="font-mono text-sm text-[#A9B3C2]">
                {state.users.filter(u => u.isOnline).length} PERSONNEL ONLINE
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Radio className="w-4 h-4 text-[#BFA15A]" />
              <span className="font-mono text-sm text-[#A9B3C2]">SECURE CONNECTION</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-xs text-[#6B7280]">SCROLL TO EXPLORE</span>
            <div className="w-px h-8 bg-gradient-to-b from-[#BFA15A] to-transparent" />
          </div>
        </div>
      </section>

      {/* Mission Overview */}
      <section className="py-20 px-4 lg:px-8 border-t border-[#BFA15A]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F4F6FA] mb-4">
              MISSION OVERVIEW
            </h2>
            <div className="w-24 h-1 bg-[#BFA15A] mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Plane, title: 'Air Superiority', desc: 'Maintaining dominance in Kalmar airspace through advanced fighter operations and strategic positioning.' },
              { icon: Shield, title: 'National Defense', desc: 'Protecting our borders and citizens with 24/7 surveillance and rapid response capabilities.' },
              { icon: Target, title: 'Strategic Strike', desc: 'Precision strike capabilities to neutralize threats before they reach our homeland.' },
              { icon: Users, title: 'Joint Operations', desc: 'Coordinated efforts with allied forces for regional stability and mutual defense.' },
            ].map((item, index) => (
              <div 
                key={index}
                className="group p-6 border border-[#BFA15A]/20 bg-[#111827]/50 hover:border-[#BFA15A]/50 hover:bg-[#111827] transition-all duration-300"
              >
                <div className="w-14 h-14 border border-[#BFA15A]/30 flex items-center justify-center mb-4 group-hover:border-[#BFA15A] transition-colors">
                  <item.icon className="w-7 h-7 text-[#BFA15A]" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#F4F6FA] mb-3">
                  {item.title}
                </h3>
                <p className="text-[#A9B3C2] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Readiness Status */}
      <section className="py-20 px-4 lg:px-8 bg-[#111827]/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F4F6FA] mb-4">
                READINESS STATUS
              </h2>
              <div className="w-24 h-1 bg-[#BFA15A] mb-8" />
              
              <div className="space-y-6">
                {[
                  { label: 'Air Defense Network', status: 'OPERATIONAL', level: 100, color: 'bg-green-500' },
                  { label: 'Fighter Squadron Alpha', status: 'COMBAT READY', level: 95, color: 'bg-green-500' },
                  { label: 'Strategic Command', status: 'ACTIVE', level: 100, color: 'bg-green-500' },
                  { label: 'Intelligence Division', status: 'MONITORING', level: 90, color: 'bg-[#BFA15A]' },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-sm text-[#A9B3C2]">{item.label}</span>
                      <span className={`font-mono text-xs px-2 py-1 ${item.color} text-[#0a0f1a] font-bold`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="h-2 bg-[#1F2937] overflow-hidden">
                      <div 
                        className={`h-full ${item.color} transition-all duration-1000`}
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square border border-[#BFA15A]/30 p-8 relative">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#BFA15A]" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#BFA15A]" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#BFA15A]" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#BFA15A]" />

                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 border-2 border-[#BFA15A] rounded-full flex items-center justify-center mb-6">
                    <Target className="w-12 h-12 text-[#BFA15A]" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#F4F6FA] mb-2">
                    DEFCON 5
                  </h3>
                  <p className="font-mono text-sm text-[#6B7280] mb-6">
                    NORMAL READINESS
                  </p>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="p-4 bg-[#0a0f1a] border border-[#BFA15A]/20">
                      <div className="font-mono text-2xl font-bold text-[#BFA15A]">24/7</div>
                      <div className="font-mono text-xs text-[#6B7280]">OPERATIONS</div>
                    </div>
                    <div className="p-4 bg-[#0a0f1a] border border-[#BFA15A]/20">
                      <div className="font-mono text-2xl font-bold text-[#BFA15A]">100%</div>
                      <div className="font-mono text-xs text-[#6B7280]">NETWORK UPTIME</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="py-20 px-4 lg:px-8 border-t border-[#BFA15A]/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F4F6FA] mb-2">
                COMMAND ANNOUNCEMENTS
              </h2>
              <div className="w-24 h-1 bg-[#BFA15A]" />
            </div>
            {isAuthenticated && (
              <button className="flex items-center gap-2 px-4 py-2 border border-[#BFA15A]/50 text-[#BFA15A] font-mono text-xs tracking-wider uppercase hover:bg-[#BFA15A]/10 transition-colors">
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {pinnedPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pinnedPosts.map((post) => (
                <div 
                  key={post.id}
                  className="p-6 border border-[#BFA15A]/30 bg-[#111827]/50 relative"
                >
                  <div className="absolute top-0 right-0 px-3 py-1 bg-[#BFA15A] text-[#0a0f1a] font-mono text-xs font-bold">
                    PINNED
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 border border-[#BFA15A]/30 flex items-center justify-center">
                      <span className="font-mono text-xs text-[#BFA15A]">{post.authorRank?.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-mono text-sm text-[#F4F6FA]">{post.author}</p>
                      <p className="font-mono text-xs text-[#6B7280]">{post.authorRank}</p>
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#F4F6FA] mb-2">
                    {post.title}
                  </h3>
                  <p className="text-[#A9B3C2] text-sm line-clamp-3 mb-4">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#6B7280]">
                      {new Date(post.timestamp).toLocaleDateString('en-GB')}
                    </span>
                    <span className="font-mono text-xs text-[#BFA15A]">
                      {post.comments.length} Comments
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-[#BFA15A]/20 bg-[#111827]/30">
              <AlertTriangle className="w-12 h-12 text-[#6B7280] mx-auto mb-4" />
              <p className="font-mono text-sm text-[#6B7280]">No announcements available</p>
            </div>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 px-4 lg:px-8 bg-[#111827]/30 border-t border-[#BFA15A]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F4F6FA] mb-4">
              QUICK ACCESS
            </h2>
            <div className="w-24 h-1 bg-[#BFA15A] mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Command Structure', path: 'command', icon: Shield },
              { label: 'Active Units', path: 'units', icon: Users },
              { label: 'Operations', path: 'operations', icon: Target, auth: true },
              { label: 'Join RKAF', path: 'recruitment', icon: Plane },
              { label: 'Media Gallery', path: 'media', icon: Radio },
              { label: 'Archives', path: 'archives', icon: CheckCircle },
              { label: 'Bulletin Board', path: 'bulletin', icon: AlertTriangle, auth: true },
              { label: 'Communications', path: 'communications', icon: Radio, auth: true },
            ].map((item, index) => (
              <button
                key={index}
                disabled={item.auth && !isAuthenticated}
                className={`group p-6 border border-[#BFA15A]/20 text-left transition-all duration-300 ${
                  item.auth && !isAuthenticated 
                    ? 'opacity-50 cursor-not-allowed bg-[#111827]/30' 
                    : 'hover:border-[#BFA15A]/50 hover:bg-[#111827] cursor-pointer'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <item.icon className="w-6 h-6 text-[#BFA15A]" />
                  <ChevronRight className="w-5 h-5 text-[#6B7280] group-hover:text-[#BFA15A] group-hover:translate-x-1 transition-all" />
                </div>
                <span className="font-mono text-sm text-[#F4F6FA] group-hover:text-[#BFA15A] transition-colors">
                  {item.label}
                </span>
                {item.auth && !isAuthenticated && (
                  <span className="block font-mono text-xs text-[#6B7280] mt-1">
                    Login Required
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 lg:px-8 border-t border-[#BFA15A]/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Shield className="w-8 h-8 text-[#BFA15A]" />
              <div>
                <p className="font-mono text-xs text-[#BFA15A] tracking-wider">ROYAL KALMAR AIR FORCE</p>
                <p className="font-mono text-xs text-[#6B7280]">SECURE COMMAND NETWORK v3.0.0</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <span className="font-mono text-xs text-[#6B7280]">
                {state.users.length} REGISTERED PERSONNEL
              </span>
              <span className="font-mono text-xs text-[#6B7280]">
                {state.channels.length} ACTIVE CHANNELS
              </span>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#BFA15A]/10 text-center">
            <p className="font-mono text-xs text-[#4B5563]">
              © 2026 Royal Kalmar Air Force. All communications are monitored and subject to operational security protocols.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
