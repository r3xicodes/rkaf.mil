// @ts-nocheck
import React from 'react';
import { ChevronRight, Award, Users, Zap } from 'lucide-react';

export function HistoryPage() {
  const milestones = [
    {
      date: 'March 2024',
      title: 'Formation',
      description: 'Air General Raptor2011 formally establishes the RKAF as a unified air arm headquartered in Oslo.',
      icon: Zap,
    },
    {
      date: '10–24 November 2024',
      title: 'Ukrainian Air Conflict',
      description: 'RKAF enters first major combat operations with multiple air-to-air engagements. DEFCON elevated to level 2.',
      icon: Award,
    },
    {
      date: '1 January 2025',
      title: 'Constitutional Recognition',
      description: 'RKAF officially recognized as royal service branch of the United Kingdom of Kalmar.',
      icon: Users,
    },
    {
      date: '23 February 2025',
      title: 'SR73 Leadership',
      description: 'Air General SR73 assumes command. Period marks structural consolidation and modernization.',
      icon: Award,
    },
    {
      date: '10–12 March 2025',
      title: 'Operation Winter Dusk',
      description: 'Major coordinated operation demonstrating improved operational discipline compared to November conflict.',
      icon: Zap,
    },
    {
      date: '25 August – 1 October 2025',
      title: 'North Atlantic Expansion',
      description: 'RKAF expands operations to Iceland and Denmark. Full Operational Capability declared on 1 October.',
      icon: Award,
    },
    {
      date: '15 November 2025',
      title: 'Death of SR73',
      description: 'Air General SR73 passes away after battle with cancer. Ceremonial formation flight honors her legacy.',
      icon: Users,
    },
    {
      date: '15 Nov 2025 – 11 Jan 2026',
      title: 'The Blackout Period',
      description: 'Leadership vacancy leads to operational pause. Demonstrates importance of consistent executive command.',
      icon: Award,
    },
    {
      date: '11 January 2026 – present',
      title: 'Major General Ari Leadership',
      description: 'Comprehensive institutional reorganization, security modernization, and recruitment doctrine reforms.',
      icon: Zap,
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#F4F6FA] mb-4">
            RKAF HISTORY
          </h1>
          <p className="font-mono text-sm text-[#A9B3C2] max-w-2xl">
            From unified Nordic command to full operational capability. The Royal Kalmar Air Force timeline traces institutional evolution and key operations.
          </p>
          <div className="w-32 h-1 bg-[#BFA15A] mt-6" />
        </div>

        {/* Formation Section */}
        <section className="mb-12 p-6 border border-[#BFA15A]/20 bg-[#111827]/30">
          <h2 className="font-display text-2xl font-bold text-[#F4F6FA] mb-4">Formation (2024–2025)</h2>
          <p className="font-mono text-sm text-[#A9B3C2] leading-relaxed mb-4">
            In March 2024, Air General Raptor2011 formally established the Royal Kalmar Air Force as a unified air arm headquartered in Oslo. His leadership marked the beginning of centralized Nordic air integration under what would later become the United Kingdom of Kalmar.
          </p>
          <p className="font-mono text-sm text-[#A9B3C2] leading-relaxed">
            Between March and June 2024, institutional development was prioritized. Norwegian maritime aviation doctrine and Finnish territorial air defence concepts were consolidated into a unified operational framework. By July 2024, routine patrol flights and structured readiness exercises were underway. From August to October 2024, the RKAF transitioned into a functioning operational force with formally organized wings and squadrons.
          </p>
        </section>

        {/* Timeline */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#F4F6FA] mb-8">Major Milestones</h2>
          <div className="space-y-6">
            {milestones.map((milestone, index) => {
              const IconComponent = milestone.icon;
              return (
                <div key={index} className="flex gap-6 pb-6 border-b border-[#BFA15A]/10 last:border-b-0">
                  <div className="flex-shrink-0 pt-1">
                    <div className="flex items-center justify-center w-12 h-12 rounded border border-[#BFA15A]/30 bg-[#BFA15A]/10">
                      <IconComponent className="w-6 h-6 text-[#BFA15A]" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="font-mono text-xs tracking-widest text-[#BFA15A] uppercase mb-1">
                      {milestone.date}
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#F4F6FA] mb-2">
                      {milestone.title}
                    </h3>
                    <p className="font-mono text-sm text-[#A9B3C2]">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Leadership Section */}
        <section className="p-6 border border-[#BFA15A]/20 bg-[#111827]/30">
          <h2 className="font-display text-2xl font-bold text-[#F4F6FA] mb-6">Leadership</h2>
          <div className="space-y-6">
            <div className="pb-6 border-b border-[#BFA15A]/10">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#F4F6FA]">Air General Raptor2011</h3>
                  <p className="font-mono text-xs text-[#6B7280]">March 2024 – February 2025</p>
                </div>
              </div>
              <p className="font-mono text-sm text-[#A9B3C2]">
                Founder and first commander. Unified Nordic air command and established institutional frameworks.
              </p>
            </div>

            <div className="pb-6 border-b border-[#BFA15A]/10">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#F4F6FA]">Air General SR73</h3>
                  <p className="font-mono text-xs text-[#6B7280]">23 February – 15 November 2025 †</p>
                </div>
              </div>
              <p className="font-mono text-sm text-[#A9B3C2]">
                Led period of structural consolidation and modernization. Declared IOC and FOC. Her tenure marked RKAF's structural maturity. Passed away 15 November 2025.
              </p>
            </div>

            <div className="pb-6 border-b border-[#BFA15A]/10">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#A9B3C2]">Interim Leadership</h3>
                  <p className="font-mono text-xs text-[#6B7280]">15 November 2025 – 11 January 2026</p>
                </div>
              </div>
              <p className="font-mono text-sm text-[#A9B3C2]">
                The Blackout period. Leadership vacancy resulted in operational pause and weakened command authority. Demonstrated importance of consistent executive leadership.
              </p>
            </div>

            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#F4F6FA]">Major General Ari</h3>
                  <p className="font-mono text-xs text-[#6B7280]">11 January 2026 – present</p>
                </div>
              </div>
              <p className="font-mono text-sm text-[#A9B3C2]">
                Current commander. Leading comprehensive institutional reorganization, security modernization, and establishment of new recruitment doctrine and communication infrastructure.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
