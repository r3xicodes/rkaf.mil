// @ts-nocheck
import React from 'react';
import { Shield, Users, Radio, Zap, Anchor } from 'lucide-react';

export function OrganizationPage() {
  const commandStructure = [
    {
      level: 'Head of State',
      authority: 'Monarch of Kalmar',
      location: 'Oslo',
    },
    {
      level: 'Civilian Oversight',
      authority: 'Ministry of Defence',
      location: 'Oslo',
    },
    {
      level: 'Operational Command',
      authority: 'Joint Defence Command',
      location: 'Oslo',
    },
    {
      level: 'Service Command',
      authority: 'RKAF Headquarters',
      location: 'Oslo Air Station',
    },
  ];

  const wings = [
    {
      number: '1st',
      name: 'Valkyr Wing',
      base: 'Ørland',
      primaryRole: 'Air superiority, precision strike',
      icon: Zap,
      description: 'Elite fighter squadrons equipped with F-35 Lightning II aircraft. Primary responsibility for maintaining air dominance over Kalmar airspace.',
    },
    {
      number: '2nd',
      name: 'Aegir Wing',
      base: 'Evenes',
      primaryRole: 'Arctic maritime operations',
      icon: Anchor,
      description: 'Maritime patrol and reconnaissance units focusing on Arctic operations. Equipped with P-8 Poseidon maritime patrol aircraft.',
    },
    {
      number: '3rd',
      name: 'Sisu Wing',
      base: 'Rovaniemi',
      primaryRole: 'Northern air defence',
      icon: Shield,
      description: 'Air defence and territorial protection for northern regions. Operates GlobalEye AEW&C systems for integrated air defence.',
    },
    {
      number: '4th',
      name: 'Aurora Wing',
      base: 'Gardermoen',
      primaryRole: 'Strategic airlift, tanking',
      icon: Radio,
      description: 'Strategic transport and aerial refueling operations. Provides logistical backbone for entire service with C-17 and KC-46 aircraft.',
    },
    {
      number: '5th',
      name: 'Raven Wing',
      base: 'Classified',
      primaryRole: 'Special operations aviation',
      icon: Users,
      description: 'Specialized units supporting special operations command. Operates MQ-9 Reaper UAVs and specialized transport platforms.',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#F4F6FA] mb-4">
            RKAF ORGANIZATION
          </h1>
          <p className="font-mono text-sm text-[#A9B3C2] max-w-2xl">
            Command structure, wing organization, and operational framework of the Royal Kalmar Air Force.
          </p>
          <div className="w-32 h-1 bg-[#BFA15A] mt-6" />
        </div>

        {/* Command Structure */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-[#F4F6FA] mb-6">Command Structure</h2>
          <div className="space-y-4">
            {commandStructure.map((level, index) => (
              <div key={index} className="p-4 border border-[#BFA15A]/20 bg-[#111827]/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-mono text-xs tracking-widest text-[#BFA15A] uppercase">
                    Level {index + 1}
                  </div>
                  <div className="font-mono text-xs text-[#6B7280]">{level.location}</div>
                </div>
                <div className="font-display text-lg font-bold text-[#F4F6FA]">{level.level}</div>
                <div className="font-mono text-sm text-[#A9B3C2] mt-1">{level.authority}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Wing Structure */}
        <section>
          <h2 className="font-display text-2xl font-bold text-[#F4F6FA] mb-6">Wing Structure</h2>
          <p className="font-mono text-sm text-[#A9B3C2] mb-8">
            The RKAF is organized into five operational wings, each with distinct roles and responsibilities:
          </p>
          <div className="space-y-6">
            {wings.map((wing, index) => {
              const IconComponent = wing.icon;
              return (
                <div key={index} className="border border-[#BFA15A]/20 bg-[#111827]/30 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-16 h-16 rounded border border-[#BFA15A]/30 bg-[#BFA15A]/10">
                          <IconComponent className="w-8 h-8 text-[#BFA15A]" />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-baseline gap-3 mb-2">
                          <div className="font-display text-xl font-bold text-[#F4F6FA]">
                            {wing.number} {wing.name}
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <div className="font-mono text-xs text-[#6B7280] mb-1">BASE</div>
                            <div className="font-mono text-sm text-[#F4F6FA]">{wing.base}</div>
                          </div>
                          <div>
                            <div className="font-mono text-xs text-[#6B7280] mb-1">PRIMARY ROLE</div>
                            <div className="font-mono text-sm text-[#F4F6FA]">{wing.primaryRole}</div>
                          </div>
                        </div>
                        <p className="font-mono text-sm text-[#A9B3C2]">{wing.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
