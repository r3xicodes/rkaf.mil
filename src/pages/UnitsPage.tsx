/**
 * ============================================
 * RKAF SECURE COMMAND NETWORK - UNITS PAGE
 * ============================================
 * Active units and squadron information
 */

import { Plane, Users, Target, MapPin, Radio, Shield, ChevronRight, Star } from 'lucide-react';

interface Squadron {
  id: string;
  name: string;
  callsign: string;
  type: string;
  aircraft: string[];
  base: string;
  commander: string;
  strength: number;
  status: 'operational' | 'training' | 'maintenance' | 'deployed';
  motto: string;
}

const squadrons: Squadron[] = [
  {
    id: 'RKAF-101',
    name: '101st Fighter Squadron',
    callsign: 'GRIFFIN',
    type: 'Air Superiority',
    aircraft: ['F-35A Lightning II', 'F-16C Fighting Falcon'],
    base: 'Alpha Air Base',
    commander: 'Wing Commander J. Andersson',
    strength: 24,
    status: 'operational',
    motto: 'Victory Through Vigilance',
  },
  {
    id: 'RKAF-201',
    name: '201st Strike Squadron',
    callsign: 'HAMMER',
    type: 'Ground Attack',
    aircraft: ['JAS 39E Gripen', 'A-10C Thunderbolt II'],
    base: 'Beta Air Base',
    commander: 'Wing Commander M. Lindqvist',
    strength: 18,
    status: 'operational',
    motto: 'Strike First, Strike Hard',
  },
  {
    id: 'RKAF-301',
    name: '301st Reconnaissance Squadron',
    callsign: 'EYE',
    type: 'Surveillance',
    aircraft: ['GlobalEye AEW&C', 'Gulfstream G550'],
    base: 'Gamma Air Base',
    commander: 'Wing Commander K. Eriksson',
    strength: 12,
    status: 'operational',
    motto: 'Eyes in the Sky',
  },
  {
    id: 'RKAF-401',
    name: '401st Transport Squadron',
    callsign: 'LIFT',
    type: 'Air Transport',
    aircraft: ['C-130J Super Hercules', 'C-17 Globemaster III'],
    base: 'Delta Air Base',
    commander: 'Wing Commander S. Johansson',
    strength: 16,
    status: 'operational',
    motto: 'Anywhere, Anytime',
  },
  {
    id: 'RKAF-501',
    name: '501st Helicopter Squadron',
    callsign: 'BLADE',
    type: 'Rotary Wing',
    aircraft: ['UH-60M Black Hawk', 'AH-64E Apache'],
    base: 'Alpha Air Base',
    commander: 'Wing Commander P. Nilsson',
    strength: 20,
    status: 'training',
    motto: 'Above and Beyond',
  },
  {
    id: 'RKAF-601',
    name: '601st Training Squadron',
    callsign: 'HAWK',
    type: 'Training',
    aircraft: ['T-6A Texan II', 'T-38C Talon'],
    base: 'Gamma Air Base',
    commander: 'Wing Commander A. Svensson',
    strength: 32,
    status: 'operational',
    motto: 'Forge the Future',
  },
];

const airBases = [
  { name: 'Alpha Air Base', location: 'Northern Kalmar', squadrons: 2, runways: 2 },
  { name: 'Beta Air Base', location: 'Eastern Kalmar', squadrons: 1, runways: 1 },
  { name: 'Gamma Air Base', location: 'Western Kalmar', squadrons: 2, runways: 2 },
  { name: 'Delta Air Base', location: 'Southern Kalmar', squadrons: 1, runways: 1 },
];

const getStatusColor = (status: Squadron['status']) => {
  switch (status) {
    case 'operational': return 'bg-green-500';
    case 'training': return 'bg-blue-500';
    case 'maintenance': return 'bg-yellow-500';
    case 'deployed': return 'bg-orange-500';
    default: return 'bg-gray-500';
  }
};

const getStatusText = (status: Squadron['status']) => {
  switch (status) {
    case 'operational': return 'OPERATIONAL';
    case 'training': return 'TRAINING';
    case 'maintenance': return 'MAINTENANCE';
    case 'deployed': return 'DEPLOYED';
    default: return 'UNKNOWN';
  }
};

export function UnitsPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Plane className="w-8 h-8 text-[#BFA15A]" />
            <span className="font-mono text-sm text-[#BFA15A] tracking-wider">ACTIVE UNITS</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#F4F6FA] mb-4">
            RKAF SQUADRONS
          </h1>
          <div className="w-32 h-1 bg-[#BFA15A]" />
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Active Squadrons', value: '12', icon: Plane },
            { label: 'Total Aircraft', value: '87', icon: Target },
            { label: 'Personnel', value: '3,247', icon: Users },
            { label: 'Air Bases', value: '4', icon: MapPin },
          ].map((stat, index) => (
            <div key={index} className="p-6 border border-[#BFA15A]/20 bg-[#111827]/30">
              <stat.icon className="w-6 h-6 text-[#BFA15A] mb-3" />
              <div className="font-mono text-3xl font-bold text-[#F4F6FA] mb-1">{stat.value}</div>
              <div className="font-mono text-xs text-[#6B7280]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Squadron Cards */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-bold text-[#F4F6FA] mb-8">
            ACTIVE SQUADRONS
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {squadrons.map((squadron) => (
              <div 
                key={squadron.id}
                className="group p-6 border border-[#BFA15A]/20 bg-[#111827]/30 hover:border-[#BFA15A]/50 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-[#BFA15A]">{squadron.id}</span>
                      <span className={`w-2 h-2 rounded-full ${getStatusColor(squadron.status)} animate-pulse`} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#F4F6FA]">
                      {squadron.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs text-[#6B7280]">CALLSIGN</span>
                    <p className="font-mono text-sm text-[#BFA15A]">{squadron.callsign}</p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 font-mono text-xs ${getStatusColor(squadron.status)} text-white`}>
                    {getStatusText(squadron.status)}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#6B7280]" />
                    <span className="text-sm text-[#A9B3C2]">{squadron.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#6B7280]" />
                    <span className="text-sm text-[#A9B3C2]">{squadron.base}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#6B7280]" />
                    <span className="text-sm text-[#A9B3C2]">{squadron.strength} personnel</span>
                  </div>
                </div>

                {/* Aircraft */}
                <div className="mb-4">
                  <span className="font-mono text-xs text-[#6B7280] mb-2 block">AIRCRAFT</span>
                  <div className="flex flex-wrap gap-2">
                    {squadron.aircraft.map((ac, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-[#0a0f1a] border border-[#BFA15A]/20 font-mono text-xs text-[#A9B3C2]"
                      >
                        {ac}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Commander */}
                <div className="p-3 bg-[#0a0f1a] border border-[#BFA15A]/10">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#BFA15A]" />
                    <span className="font-mono text-xs text-[#6B7280]">CMDR:</span>
                    <span className="font-mono text-xs text-[#A9B3C2]">{squadron.commander}</span>
                  </div>
                </div>

                {/* Motto */}
                <div className="mt-4 pt-4 border-t border-[#BFA15A]/10">
                  <p className="font-mono text-xs text-[#6B7280] italic">
                    "{squadron.motto}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Air Bases */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-bold text-[#F4F6FA] mb-8">
            AIR BASES
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {airBases.map((base, index) => (
              <div 
                key={index}
                className="p-6 border border-[#BFA15A]/20 bg-[#111827]/30"
              >
                <div className="w-12 h-12 border border-[#BFA15A]/30 flex items-center justify-center mb-4">
                  <Radio className="w-6 h-6 text-[#BFA15A]" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#F4F6FA] mb-2">
                  {base.name}
                </h3>
                <p className="text-sm text-[#6B7280] mb-4">{base.location}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-mono text-xs text-[#6B7280]">Squadrons</span>
                    <span className="font-mono text-xs text-[#BFA15A]">{base.squadrons}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-xs text-[#6B7280]">Runways</span>
                    <span className="font-mono text-xs text-[#BFA15A]">{base.runways}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment Overview */}
        <div className="p-8 border border-[#BFA15A]/30 bg-[#111827]/50">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-[#BFA15A]" />
            <h2 className="font-display text-xl font-bold text-[#F4F6FA]">
              EQUIPMENT OVERVIEW
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-mono text-sm text-[#BFA15A] mb-3">FIGHTER AIRCRAFT</h3>
              <ul className="space-y-2">
                {['F-35A Lightning II (12)', 'JAS 39E Gripen (24)', 'F-16C Fighting Falcon (18)'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[#A9B3C2]">
                    <ChevronRight className="w-4 h-4 text-[#BFA15A]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-sm text-[#BFA15A] mb-3">SUPPORT AIRCRAFT</h3>
              <ul className="space-y-2">
                {['C-130J Super Hercules (6)', 'C-17 Globemaster III (2)', 'GlobalEye AEW&C (2)'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[#A9B3C2]">
                    <ChevronRight className="w-4 h-4 text-[#BFA15A]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-sm text-[#BFA15A] mb-3">ROTARY WING</h3>
              <ul className="space-y-2">
                {['UH-60M Black Hawk (12)', 'AH-64E Apache (8)', 'CH-47F Chinook (3)'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[#A9B3C2]">
                    <ChevronRight className="w-4 h-4 text-[#BFA15A]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
