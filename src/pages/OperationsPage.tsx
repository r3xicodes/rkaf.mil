/**
 * ============================================
 * RKAF SECURE COMMAND NETWORK - OPERATIONS PAGE
 * ============================================
 * Current and past operations (requires authentication)
 */

import { useState } from 'react';
import { Target, MapPin, Shield, AlertTriangle, Radio, Calendar, ChevronRight, Lock } from 'lucide-react';
import { useRKAFStore } from '@/store/RKAFStore';

interface Operation {
  id: string;
  codename: string;
  type: string;
  status: 'active' | 'completed' | 'planned' | 'standby';
  classification: string;
  startDate: string;
  endDate?: string;
  location: string;
  objective: string;
  participatingUnits: string[];
  commander: string;
  briefDescription: string;
}

const operations: Operation[] = [
  {
    id: 'OP-2026-001',
    codename: 'SKY SHIELD',
    type: 'Air Defense Exercise',
    status: 'active',
    classification: 'CONFIDENTIAL',
    startDate: '2026-02-15',
    location: 'Northern Air Defense Sector',
    objective: 'Test integrated air defense response capabilities',
    participatingUnits: ['101st Fighter Squadron', '301st Reconnaissance Squadron'],
    commander: 'Air Commodore K. Eriksson',
    briefDescription: 'Joint air defense exercise testing response protocols and interoperability between fighter and reconnaissance units.',
  },
  {
    id: 'OP-2026-002',
    codename: 'NORTHERN WATCH',
    type: 'Border Surveillance',
    status: 'active',
    classification: 'RESTRICTED',
    startDate: '2026-01-01',
    location: 'Northern Border Region',
    objective: 'Maintain continuous surveillance of northern approaches',
    participatingUnits: ['301st Reconnaissance Squadron'],
    commander: 'Wing Commander K. Eriksson',
    briefDescription: 'Ongoing surveillance operation monitoring airspace along northern borders.',
  },
  {
    id: 'OP-2025-015',
    codename: 'IRON FIST',
    type: 'Combined Arms Exercise',
    status: 'completed',
    classification: 'CONFIDENTIAL',
    startDate: '2025-11-10',
    endDate: '2025-11-24',
    location: 'Eastern Training Range',
    objective: 'Joint operations with ground forces',
    participatingUnits: ['201st Strike Squadron', '501st Helicopter Squadron'],
    commander: 'Air Commodore M. Lindqvist',
    briefDescription: 'Large-scale combined arms exercise with Army units focusing on close air support coordination.',
  },
  {
    id: 'OP-2025-012',
    codename: 'RAPID RESPONSE',
    type: 'Emergency Deployment',
    status: 'completed',
    classification: 'SECRET',
    startDate: '2025-09-03',
    endDate: '2025-09-15',
    location: 'International Waters',
    objective: 'Support allied maritime operations',
    participatingUnits: ['101st Fighter Squadron', '401st Transport Squadron'],
    commander: 'Air Marshal Commander RKAF',
    briefDescription: 'Rapid deployment in support of allied naval operations in international waters.',
  },
  {
    id: 'OP-2026-005',
    codename: 'THUNDER STRIKE',
    type: 'Precision Strike Training',
    status: 'planned',
    classification: 'CONFIDENTIAL',
    startDate: '2026-03-15',
    location: 'Western Training Range',
    objective: 'Advanced precision strike capability demonstration',
    participatingUnits: ['201st Strike Squadron'],
    commander: 'Wing Commander M. Lindqvist',
    briefDescription: 'Planned training exercise focusing on precision strike capabilities and targeting systems.',
  },
];

const getStatusColor = (status: Operation['status']) => {
  switch (status) {
    case 'active': return { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/50' };
    case 'completed': return { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/50' };
    case 'planned': return { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/50' };
    case 'standby': return { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/50' };
  }
};

const getStatusLabel = (status: Operation['status']) => {
  switch (status) {
    case 'active': return 'ACTIVE';
    case 'completed': return 'COMPLETED';
    case 'planned': return 'PLANNED';
    case 'standby': return 'STANDBY';
  }
};

export function OperationsPage() {
  const { isAuthenticated } = useRKAFStore();
  const [filter, setFilter] = useState<Operation['status'] | 'all'>('all');
  const [selectedOp, setSelectedOp] = useState<Operation | null>(null);

  // Show access denied if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="p-12 border border-[#EF4444]/30 bg-[#EF4444]/5 text-center">
            <Lock className="w-16 h-16 text-[#EF4444] mx-auto mb-6" />
            <h1 className="font-display text-3xl font-bold text-[#F4F6FA] mb-4">
              ACCESS DENIED
            </h1>
            <p className="text-[#A9B3C2] mb-8">
              Operations information requires authentication. Please log in with your RKAF credentials.
            </p>
            <div className="p-4 bg-[#0a0f1a] border border-[#BFA15A]/20 inline-block">
              <p className="font-mono text-xs text-[#6B7280]">
                CLEARANCE REQUIRED: CONFIDENTIAL
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredOps = filter === 'all' 
    ? operations 
    : operations.filter(op => op.status === filter);

  return (
    <div className="min-h-screen bg-[#0a0f1a] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-[#BFA15A]" />
            <span className="font-mono text-sm text-[#BFA15A] tracking-wider">OPERATIONS CENTER</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#F4F6FA] mb-4">
            OPERATIONS
          </h1>
          <div className="w-32 h-1 bg-[#BFA15A]" />
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Active Operations', value: operations.filter(o => o.status === 'active').length.toString(), color: 'text-green-400' },
            { label: 'Planned', value: operations.filter(o => o.status === 'planned').length.toString(), color: 'text-yellow-400' },
            { label: 'Completed (YTD)', value: operations.filter(o => o.status === 'completed').length.toString(), color: 'text-blue-400' },
            { label: 'Standby', value: operations.filter(o => o.status === 'standby').length.toString(), color: 'text-orange-400' },
          ].map((stat, index) => (
            <div key={index} className="p-6 border border-[#BFA15A]/20 bg-[#111827]/30">
              <div className={`font-mono text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="font-mono text-xs text-[#6B7280]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(['all', 'active', 'planned', 'completed', 'standby'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 font-mono text-xs tracking-wider uppercase transition-all ${
                filter === f
                  ? 'bg-[#BFA15A] text-[#0a0f1a]'
                  : 'border border-[#BFA15A]/30 text-[#A9B3C2] hover:border-[#BFA15A]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Operations List */}
        <div className="space-y-4">
          {filteredOps.map((op) => {
            const statusStyle = getStatusColor(op.status);
            return (
              <div 
                key={op.id}
                onClick={() => setSelectedOp(op)}
                className="p-6 border border-[#BFA15A]/20 bg-[#111827]/30 hover:border-[#BFA15A]/50 cursor-pointer transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 font-mono text-xs ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}>
                        {getStatusLabel(op.status)}
                      </span>
                      <span className="font-mono text-xs text-[#6B7280]">{op.id}</span>
                      <span className="px-2 py-0.5 bg-red-500/20 text-red-400 font-mono text-xs">
                        {op.classification}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#F4F6FA] mb-1">
                      OPERATION {op.codename}
                    </h3>
                    <p className="text-[#A9B3C2] text-sm mb-3">{op.type}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#6B7280]" />
                        <span className="text-[#A9B3C2]">{op.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#6B7280]" />
                        <span className="text-[#A9B3C2]">{op.startDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-[#6B7280]" />
                        <span className="text-[#A9B3C2]">{op.commander}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-[#BFA15A]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Operation Detail Modal */}
        {selectedOp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0f1a]/95 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-auto bg-[#111827] border border-[#BFA15A]/30">
              {/* Header */}
              <div className="p-6 border-b border-[#BFA15A]/20">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 font-mono text-xs ${getStatusColor(selectedOp.status).bg} ${getStatusColor(selectedOp.status).text}`}>
                        {getStatusLabel(selectedOp.status)}
                      </span>
                      <span className="px-2 py-0.5 bg-red-500/20 text-red-400 font-mono text-xs">
                        {selectedOp.classification}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl font-bold text-[#F4F6FA]">
                      OPERATION {selectedOp.codename}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedOp(null)}
                    className="p-2 text-[#6B7280] hover:text-[#F4F6FA]"
                  >
                    <AlertTriangle className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-mono text-xs text-[#6B7280] mb-2">OBJECTIVE</h3>
                  <p className="text-[#A9B3C2]">{selectedOp.objective}</p>
                </div>

                <div>
                  <h3 className="font-mono text-xs text-[#6B7280] mb-2">DESCRIPTION</h3>
                  <p className="text-[#A9B3C2]">{selectedOp.briefDescription}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#0a0f1a] border border-[#BFA15A]/10">
                    <h3 className="font-mono text-xs text-[#6B7280] mb-2">LOCATION</h3>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#BFA15A]" />
                      <span className="text-[#F4F6FA]">{selectedOp.location}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-[#0a0f1a] border border-[#BFA15A]/10">
                    <h3 className="font-mono text-xs text-[#6B7280] mb-2">COMMANDER</h3>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#BFA15A]" />
                      <span className="text-[#F4F6FA]">{selectedOp.commander}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-mono text-xs text-[#6B7280] mb-2">PARTICIPATING UNITS</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedOp.participatingUnits.map((unit, i) => (
                      <span key={i} className="px-3 py-1 bg-[#0a0f1a] border border-[#BFA15A]/20 font-mono text-xs text-[#A9B3C2]">
                        {unit}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-[#BFA15A]/10 border border-[#BFA15A]/20">
                  <Radio className="w-5 h-5 text-[#BFA15A]" />
                  <span className="font-mono text-sm text-[#A9B3C2]">
                    Operation details updated in real-time via secure channels
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-[#BFA15A]/20">
                <button
                  onClick={() => setSelectedOp(null)}
                  className="w-full py-3 bg-[#BFA15A] text-[#0a0f1a] font-mono text-sm tracking-wider uppercase font-bold hover:bg-[#d4b76a] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
