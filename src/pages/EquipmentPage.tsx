// @ts-nocheck
import React, { useState } from 'react';
import { Zap, Radio, Plane, Target } from 'lucide-react';

export function EquipmentPage() {
  const [activeTab, setActiveTab] = useState<'combat' | 'support'>('combat');

  const combatAircraft = [
    {
      aircraft: 'F-35 Lightning II',
      origin: 'USA',
      type: 'Multirole fighter',
      variant: 'F-35K',
      inService: 52,
      role: 'Air superiority and precision strike across all theaters',
      capabilities: ['Supersonic', 'Stealth', 'VTOL', 'Network-enabled'],
    },
    {
      aircraft: 'P-8 Poseidon',
      origin: 'USA',
      type: 'Maritime patrol',
      variant: 'P-8K',
      inService: 5,
      role: 'Maritime reconnaissance and anti-submarine warfare in Arctic / North Atlantic',
      capabilities: ['Long-range', 'Advanced radar', 'Sonobuoy capable', 'Harpoon-ready'],
    },
    {
      aircraft: 'GlobalEye',
      origin: 'Sweden',
      type: 'Airborne Early Warning & Control',
      variant: 'GlobalEye-K',
      inService: 3,
      role: 'Integrated air defence and surveillance across Kalmar airspace',
      capabilities: ['360° coverage', 'Multi-target tracking', 'Command & control relay'],
    },
    {
      aircraft: 'MQ-9 Reaper',
      origin: 'USA',
      type: 'Unmanned Combat Aerial Vehicle',
      variant: 'MQ-9K Arctic',
      inService: 16,
      role: 'Persistent surveillance and precision strike in remote regions',
      capabilities: ['Autonomous', 'Long endurance', 'Hellfire-capable', 'Real-time intel'],
    },
  ];

  const supportAircraft = [
    {
      aircraft: 'C-17 Globemaster III',
      origin: 'USA',
      type: 'Strategic airlift',
      variant: 'C-17K',
      inService: 4,
      role: 'Strategic transport of personnel and equipment across continental distances',
      capabilities: ['Heavy lift', 'Global range', 'Rapid deployment', 'Self-sustaining'],
    },
    {
      aircraft: 'C-130J Super Hercules',
      origin: 'USA',
      type: 'Tactical airlift',
      variant: 'C-130J-30',
      inService: 8,
      role: 'Tactical transport, supply drops, and forward base resupply',
      capabilities: ['Rugged airfield capable', 'Cargo/troop flexible', 'Arctic operations'],
    },
    {
      aircraft: 'KC-46 Pegasus',
      origin: 'USA',
      type: 'Aerial refueling',
      variant: 'KC-46K',
      inService: 6,
      role: 'Aerial refueling tanker for extended-range operations',
      capabilities: ['Boom refueling', 'Probe-and-drogue', 'Self-escorting capability'],
    },
    {
      aircraft: 'CV-22 Osprey',
      origin: 'USA',
      type: 'Multi-mission tiltrotor',
      variant: 'CV-22K',
      inService: 12,
      role: 'Special operations transport and rapid deployment',
      capabilities: ['VTOL', 'High speed', 'Special ops capable', 'Hover/dash'],
    },
  ];

  const renderTable = (data: any[]) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#BFA15A]/30">
            <th className="text-left py-3 px-4 font-mono text-xs tracking-widest text-[#BFA15A] uppercase">Aircraft</th>
            <th className="text-left py-3 px-4 font-mono text-xs tracking-widest text-[#BFA15A] uppercase">Type</th>
            <th className="text-left py-3 px-4 font-mono text-xs tracking-widest text-[#BFA15A] uppercase">Variant</th>
            <th className="text-center py-3 px-4 font-mono text-xs tracking-widest text-[#BFA15A] uppercase">In Service</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b border-[#BFA15A]/10 hover:bg-[#BFA15A]/5">
              <td className="py-3 px-4 font-mono text-sm text-[#F4F6FA]">{row.aircraft}</td>
              <td className="py-3 px-4 font-mono text-sm text-[#A9B3C2]">{row.type}</td>
              <td className="py-3 px-4 font-mono text-sm text-[#A9B3C2]">{row.variant}</td>
              <td className="py-3 px-4 text-center font-mono text-sm text-[#BFA15A] font-bold">{row.inService}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#F4F6FA] mb-4">
            RKAF EQUIPMENT & AIRCRAFT
          </h1>
          <p className="font-mono text-sm text-[#A9B3C2] max-w-2xl">
            Complete inventory of combat and support aircraft operated by the Royal Kalmar Air Force.
          </p>
          <div className="w-32 h-1 bg-[#BFA15A] mt-6" />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-[#BFA15A]/20 pb-4">
          <button
            onClick={() => setActiveTab('combat')}
            className={`flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wider uppercase transition-all ${
              activeTab === 'combat'
                ? 'text-[#BFA15A] border-b-2 border-[#BFA15A]'
                : 'text-[#A9B3C2] hover:text-[#F4F6FA]'
            }`}
          >
            <Zap className="w-4 h-4" />
            Combat Aircraft
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wider uppercase transition-all ${
              activeTab === 'support'
                ? 'text-[#BFA15A] border-b-2 border-[#BFA15A]'
                : 'text-[#A9B3C2] hover:text-[#F4F6FA]'
            }`}
          >
            <Radio className="w-4 h-4" />
            Support Aircraft
          </button>
        </div>

        {/* Combat Aircraft */}
        {activeTab === 'combat' && (
          <div className="space-y-8">
            <div className="p-6 border border-[#BFA15A]/20 bg-[#111827]/30 rounded overflow-hidden">
              {renderTable(combatAircraft)}
            </div>

            {/* Detailed Cards */}
            <div className="space-y-6">
              {combatAircraft.map((aircraft, idx) => (
                <div key={idx} className="p-6 border border-[#BFA15A]/20 bg-[#111827]/30">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 pt-1">
                      <Zap className="w-6 h-6 text-[#BFA15A]" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-display text-xl font-bold text-[#F4F6FA]">{aircraft.aircraft}</h3>
                      <p className="font-mono text-sm text-[#A9B3C2] mt-1">{aircraft.role}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-2xl font-bold text-[#BFA15A]">{aircraft.inService}</div>
                      <div className="font-mono text-xs text-[#6B7280]">IN SERVICE</div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="font-mono text-xs text-[#6B7280] mb-2">SPECIFICATIONS</div>
                      <div className="space-y-2 font-mono text-sm text-[#A9B3C2]">
                        <div><span className="text-[#BFA15A]">Origin:</span> {aircraft.origin}</div>
                        <div><span className="text-[#BFA15A]">Type:</span> {aircraft.type}</div>
                        <div><span className="text-[#BFA15A]">Variant:</span> {aircraft.variant}</div>
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-xs text-[#6B7280] mb-2">CAPABILITIES</div>
                      <div className="flex flex-wrap gap-2">
                        {aircraft.capabilities.map((cap, i) => (
                          <span key={i} className="px-2 py-1 bg-[#BFA15A]/10 border border-[#BFA15A]/30 rounded font-mono text-xs text-[#BFA15A]">
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Support Aircraft */}
        {activeTab === 'support' && (
          <div className="space-y-8">
            <div className="p-6 border border-[#BFA15A]/20 bg-[#111827]/30 rounded overflow-hidden">
              {renderTable(supportAircraft)}
            </div>

            {/* Detailed Cards */}
            <div className="space-y-6">
              {supportAircraft.map((aircraft, idx) => (
                <div key={idx} className="p-6 border border-[#BFA15A]/20 bg-[#111827]/30">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 pt-1">
                      <Radio className="w-6 h-6 text-[#BFA15A]" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-display text-xl font-bold text-[#F4F6FA]">{aircraft.aircraft}</h3>
                      <p className="font-mono text-sm text-[#A9B3C2] mt-1">{aircraft.role}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-2xl font-bold text-[#BFA15A]">{aircraft.inService}</div>
                      <div className="font-mono text-xs text-[#6B7280]">IN SERVICE</div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="font-mono text-xs text-[#6B7280] mb-2">SPECIFICATIONS</div>
                      <div className="space-y-2 font-mono text-sm text-[#A9B3C2]">
                        <div><span className="text-[#BFA15A]">Origin:</span> {aircraft.origin}</div>
                        <div><span className="text-[#BFA15A]">Type:</span> {aircraft.type}</div>
                        <div><span className="text-[#BFA15A]">Variant:</span> {aircraft.variant}</div>
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-xs text-[#6B7280] mb-2">CAPABILITIES</div>
                      <div className="flex flex-wrap gap-2">
                        {aircraft.capabilities.map((cap, i) => (
                          <span key={i} className="px-2 py-1 bg-[#BFA15A]/10 border border-[#BFA15A]/30 rounded font-mono text-xs text-[#BFA15A]">
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        <section className="mt-12 p-6 border border-[#BFA15A]/20 bg-[#111827]/30">
          <h2 className="font-display text-xl font-bold text-[#F4F6FA] mb-4">Fleet Summary</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-3xl font-bold text-[#BFA15A] mb-2">78</div>
              <div className="font-mono text-sm text-[#A9B3C2]">Combat & multi-mission aircraft</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#BFA15A] mb-2">30</div>
              <div className="font-mono text-sm text-[#A9B3C2]">Support and transport aircraft</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
