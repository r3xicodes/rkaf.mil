/**
 * ============================================
 * RKAF SECURE COMMAND NETWORK - COMMAND PAGE
 * ============================================
 * Command structure and leadership overview
 */

import { Shield, User, ChevronRight, Star, Award, MapPin } from 'lucide-react';

interface CommandOfficer {
  rank: string;
  name: string;
  position: string;
  serviceId: string;
  location: string;
  responsibilities: string[];
}

const commandStructure: CommandOfficer[] = [
  {
    rank: 'Air Marshal',
    name: 'Commander RKAF',
    position: 'Chief of Air Staff',
    serviceId: 'RKAF-CAS-001',
    location: 'Air Force Headquarters, Kalmar City',
    responsibilities: [
      'Overall command of RKAF operations',
      'Strategic planning and policy',
      'Liaison with government and allied forces',
    ],
  },
  {
    rank: 'Air Vice Marshal',
    name: 'Deputy Commander',
    position: 'Deputy Chief of Air Staff',
    serviceId: 'RKAF-DCAS-001',
    location: 'Air Force Headquarters, Kalmar City',
    responsibilities: [
      'Assists Chief of Air Staff',
      'Operations coordination',
      'Resource allocation',
    ],
  },
  {
    rank: 'Air Commodore',
    name: 'Operations Director',
    position: 'Director of Operations',
    serviceId: 'RKAF-DOPS-001',
    location: 'Operations Command Center',
    responsibilities: [
      'Tactical operations planning',
      'Mission coordination',
      'Combat readiness assessment',
    ],
  },
  {
    rank: 'Air Commodore',
    name: 'Intelligence Director',
    position: 'Director of Intelligence',
    serviceId: 'RKAF-DINT-001',
    location: 'Intelligence Division HQ',
    responsibilities: [
      'Intelligence gathering and analysis',
      'Threat assessment',
      'Counter-intelligence operations',
    ],
  },
  {
    rank: 'Group Captain',
    name: 'Wing Commander Alpha',
    position: 'Commander, 1st Fighter Wing',
    serviceId: 'RKAF-1FW-001',
    location: 'Alpha Air Base',
    responsibilities: [
      'Fighter squadron command',
      'Air defense operations',
      'Pilot training oversight',
    ],
  },
  {
    rank: 'Group Captain',
    name: 'Wing Commander Beta',
    position: 'Commander, 2nd Tactical Wing',
    serviceId: 'RKAF-2TW-001',
    location: 'Beta Air Base',
    responsibilities: [
      'Tactical strike operations',
      'Ground attack coordination',
      'Close air support missions',
    ],
  },
];

const chainOfCommand = [
  { level: 1, title: 'Air Marshal', role: 'Chief of Air Staff', clearance: 'TOP SECRET' },
  { level: 2, title: 'Air Vice Marshal', role: 'Deputy Chief / Air Officers', clearance: 'TOP SECRET' },
  { level: 3, title: 'Air Commodore', role: 'Directors / Wing Commanders', clearance: 'SECRET' },
  { level: 4, title: 'Group Captain', role: 'Base Commanders', clearance: 'SECRET' },
  { level: 5, title: 'Wing Commander', role: 'Squadron Leaders', clearance: 'CONFIDENTIAL' },
  { level: 6, title: 'Squadron Leader', role: 'Flight Commanders', clearance: 'CONFIDENTIAL' },
  { level: 7, title: 'Flight Lieutenant', role: 'Section Leaders', clearance: 'RESTRICTED' },
  { level: 8, title: 'Flying Officer', role: 'Junior Officers', clearance: 'RESTRICTED' },
];

export function CommandPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-[#BFA15A]" />
            <span className="font-mono text-sm text-[#BFA15A] tracking-wider">COMMAND STRUCTURE</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#F4F6FA] mb-4">
            RKAF COMMAND
          </h1>
          <div className="w-32 h-1 bg-[#BFA15A]" />
        </div>

        {/* Command Overview */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <div className="p-8 border border-[#BFA15A]/30 bg-[#111827]/50">
              <h2 className="font-display text-2xl font-bold text-[#F4F6FA] mb-6">
                COMMAND AUTHORITY
              </h2>
              <p className="text-[#A9B3C2] leading-relaxed mb-6">
                The Royal Kalmar Air Force operates under a clear chain of command that ensures 
                efficient decision-making and operational effectiveness. The Chief of Air Staff, 
                holding the rank of Air Marshal, exercises overall command authority over all 
                RKAF personnel, installations, and operations.
              </p>
              <p className="text-[#A9B3C2] leading-relaxed mb-6">
                Command authority flows through established channels from headquarters to operational 
                units, with each level of command responsible for specific operational areas and 
                administrative functions. This structure enables rapid response to emerging threats 
                while maintaining strict operational security.
              </p>
              <div className="flex items-center gap-4 p-4 bg-[#0a0f1a] border border-[#BFA15A]/20">
                <Award className="w-6 h-6 text-[#BFA15A]" />
                <span className="font-mono text-sm text-[#A9B3C2]">
                  All command decisions are subject to review by the Defense Council
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 border border-[#BFA15A]/20 bg-[#111827]/30">
            <h3 className="font-display text-lg font-bold text-[#F4F6FA] mb-4">
              COMMAND STATISTICS
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-[#0a0f1a]">
                <span className="font-mono text-sm text-[#6B7280]">Total Personnel</span>
                <span className="font-mono text-lg font-bold text-[#BFA15A]">3,247</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#0a0f1a]">
                <span className="font-mono text-sm text-[#6B7280]">Active Aircraft</span>
                <span className="font-mono text-lg font-bold text-[#BFA15A]">87</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#0a0f1a]">
                <span className="font-mono text-sm text-[#6B7280]">Air Bases</span>
                <span className="font-mono text-lg font-bold text-[#BFA15A]">4</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#0a0f1a]">
                <span className="font-mono text-sm text-[#6B7280]">Active Squadrons</span>
                <span className="font-mono text-lg font-bold text-[#BFA15A]">12</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chain of Command */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-bold text-[#F4F6FA] mb-8">
            CHAIN OF COMMAND
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#BFA15A]/30">
                  <th className="text-left p-4 font-mono text-xs text-[#6B7280] tracking-wider">LEVEL</th>
                  <th className="text-left p-4 font-mono text-xs text-[#6B7280] tracking-wider">RANK</th>
                  <th className="text-left p-4 font-mono text-xs text-[#6B7280] tracking-wider">ROLE</th>
                  <th className="text-left p-4 font-mono text-xs text-[#6B7280] tracking-wider">CLEARANCE</th>
                </tr>
              </thead>
              <tbody>
                {chainOfCommand.map((item, index) => (
                  <tr 
                    key={index}
                    className="border-b border-[#BFA15A]/10 hover:bg-[#111827]/50 transition-colors"
                  >
                    <td className="p-4">
                      <span className="font-mono text-lg font-bold text-[#BFA15A]">
                        {item.level.toString().padStart(2, '0')}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-sm text-[#F4F6FA]">{item.title}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-[#A9B3C2]">{item.role}</span>
                    </td>
                    <td className="p-4">
                      <span className={`font-mono text-xs px-2 py-1 ${
                        item.clearance === 'TOP SECRET' ? 'bg-red-500/20 text-red-400' :
                        item.clearance === 'SECRET' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {item.clearance}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Senior Command */}
        <div>
          <h2 className="font-display text-2xl font-bold text-[#F4F6FA] mb-8">
            SENIOR COMMAND STAFF
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commandStructure.map((officer, index) => (
              <div 
                key={index}
                className="group p-6 border border-[#BFA15A]/20 bg-[#111827]/30 hover:border-[#BFA15A]/50 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 border border-[#BFA15A]/30 flex items-center justify-center">
                    <User className="w-7 h-7 text-[#BFA15A]" />
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs text-[#6B7280]">ID</span>
                    <p className="font-mono text-xs text-[#BFA15A]">{officer.serviceId}</p>
                  </div>
                </div>

                {/* Info */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-[#BFA15A]" />
                    <span className="font-mono text-sm text-[#BFA15A]">{officer.rank}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#F4F6FA] mb-1">
                    {officer.name}
                  </h3>
                  <p className="text-[#A9B3C2] text-sm">{officer.position}</p>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 mb-4 p-2 bg-[#0a0f1a]">
                  <MapPin className="w-4 h-4 text-[#6B7280]" />
                  <span className="font-mono text-xs text-[#6B7280]">{officer.location}</span>
                </div>

                {/* Responsibilities */}
                <div>
                  <span className="font-mono text-xs text-[#6B7280] mb-2 block">RESPONSIBILITIES</span>
                  <ul className="space-y-1">
                    {officer.responsibilities.map((resp, rIndex) => (
                      <li key={rIndex} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-[#BFA15A] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[#A9B3C2]">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="mt-16 p-8 border border-[#BFA15A]/30 bg-[#111827]/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl font-bold text-[#F4F6FA] mb-2">
                COMMAND INQUIRIES
              </h3>
              <p className="text-[#A9B3C2]">
                For official communications with RKAF Command, use the secure communications channel.
              </p>
            </div>
            <button className="px-6 py-3 bg-[#BFA15A] text-[#0a0f1a] font-mono text-sm tracking-wider uppercase font-bold hover:bg-[#d4b76a] transition-colors">
              Access Communications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
