/**
 * ============================================
 * RKAF SECURE COMMAND NETWORK - ARCHIVES PAGE
 * ============================================
 * Historical documents and records
 */

import { useState } from 'react';
import { Archive, FileText, Search, Download, Lock, ChevronRight, AlertTriangle } from 'lucide-react';
import { useRKAFStore } from '@/store/RKAFStore';
import { CLEARANCE_LEVELS } from '@/types';

interface ArchiveDocument {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  classification: number;
  fileType: string;
  fileSize: string;
}

const archiveDocuments: ArchiveDocument[] = [
  {
    id: 'DOC-2026-001',
    title: 'Annual Operations Report 2025',
    description: 'Comprehensive review of all RKAF operations conducted in 2025',
    category: 'Reports',
    date: '2026-01-15',
    classification: 3,
    fileType: 'PDF',
    fileSize: '4.2 MB',
  },
  {
    id: 'DOC-2025-089',
    title: 'Air Defense Doctrine v4.2',
    description: 'Updated tactical doctrine for air defense operations',
    category: 'Doctrine',
    date: '2025-11-20',
    classification: 3,
    fileType: 'PDF',
    fileSize: '2.8 MB',
  },
  {
    id: 'DOC-2025-076',
    title: 'F-35 Integration Manual',
    description: 'Technical manual for F-35A operations within RKAF',
    category: 'Technical',
    date: '2025-09-10',
    classification: 2,
    fileType: 'PDF',
    fileSize: '12.5 MB',
  },
  {
    id: 'DOC-2025-045',
    title: 'Strategic Defense Review',
    description: 'Five-year strategic planning document',
    category: 'Strategic',
    date: '2025-06-01',
    classification: 4,
    fileType: 'PDF',
    fileSize: '8.1 MB',
  },
  {
    id: 'DOC-2025-032',
    title: 'Pilot Training Curriculum 2025',
    description: 'Complete training program for pilot candidates',
    category: 'Training',
    date: '2025-04-15',
    classification: 1,
    fileType: 'PDF',
    fileSize: '6.3 MB',
  },
  {
    id: 'DOC-2025-018',
    title: 'Base Security Protocols',
    description: 'Security procedures for all RKAF installations',
    category: 'Security',
    date: '2025-03-01',
    classification: 3,
    fileType: 'PDF',
    fileSize: '3.7 MB',
  },
  {
    id: 'DOC-2024-156',
    title: 'Equipment Procurement Plan',
    description: '2024-2030 equipment acquisition strategy',
    category: 'Logistics',
    date: '2024-12-10',
    classification: 3,
    fileType: 'PDF',
    fileSize: '5.4 MB',
  },
  {
    id: 'DOC-2024-098',
    title: 'RKAF Historical Records 1926-2024',
    description: 'Complete historical documentation of RKAF history',
    category: 'Historical',
    date: '2024-08-01',
    classification: 1,
    fileType: 'PDF',
    fileSize: '25.6 MB',
  },
];

const categories = ['All', 'Reports', 'Doctrine', 'Technical', 'Strategic', 'Training', 'Security', 'Logistics', 'Historical'];

export function ArchivesPage() {
  const { isAuthenticated, currentUser } = useRKAFStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<ArchiveDocument | null>(null);

  const userClearance = currentUser?.clearanceLevel || 0;

  const filteredDocs = archiveDocuments.filter(doc => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const hasAccess = doc.classification <= userClearance;
    return matchesCategory && matchesSearch && hasAccess;
  });

  const getClassificationColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-green-500/20 text-green-400';
      case 2: return 'bg-blue-500/20 text-blue-400';
      case 3: return 'bg-yellow-500/20 text-yellow-400';
      case 4: return 'bg-orange-500/20 text-orange-400';
      case 5: return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Archive className="w-8 h-8 text-[#BFA15A]" />
            <span className="font-mono text-sm text-[#BFA15A] tracking-wider">DOCUMENT ARCHIVE</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#F4F6FA] mb-4">
            RKAF ARCHIVES
          </h1>
          <div className="w-32 h-1 bg-[#BFA15A]" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 border border-[#BFA15A]/20 bg-[#111827]/30">
            <div className="font-mono text-2xl font-bold text-[#BFA15A]">{archiveDocuments.length}</div>
            <div className="font-mono text-xs text-[#6B7280]">Total Documents</div>
          </div>
          <div className="p-4 border border-[#BFA15A]/20 bg-[#111827]/30">
            <div className="font-mono text-2xl font-bold text-[#BFA15A]">
              {archiveDocuments.filter(d => d.classification <= userClearance).length}
            </div>
            <div className="font-mono text-xs text-[#6B7280]">Accessible</div>
          </div>
          <div className="p-4 border border-[#BFA15A]/20 bg-[#111827]/30">
            <div className="font-mono text-2xl font-bold text-[#BFA15A]">
              {Math.round(archiveDocuments.reduce((acc, d) => acc + parseFloat(d.fileSize), 0))} MB
            </div>
            <div className="font-mono text-xs text-[#6B7280]">Total Size</div>
          </div>
          <div className="p-4 border border-[#BFA15A]/20 bg-[#111827]/30">
            <div className="font-mono text-2xl font-bold text-[#BFA15A]">
              {CLEARANCE_LEVELS[userClearance] || 'UNCLASSIFIED'}
            </div>
            <div className="font-mono text-xs text-[#6B7280]">Your Clearance</div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#111827] border border-[#BFA15A]/30 text-[#F4F6FA] font-mono text-sm focus:outline-none focus:border-[#BFA15A]"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 font-mono text-xs tracking-wider uppercase transition-all ${
                selectedCategory === cat
                  ? 'bg-[#BFA15A] text-[#0a0f1a]'
                  : 'border border-[#BFA15A]/30 text-[#A9B3C2] hover:border-[#BFA15A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Documents List */}
        <div className="space-y-2">
          {filteredDocs.map((doc) => (
            <div 
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className="flex items-center gap-4 p-4 border border-[#BFA15A]/20 bg-[#111827]/30 hover:border-[#BFA15A]/50 cursor-pointer transition-all"
            >
              <div className="w-12 h-12 border border-[#BFA15A]/30 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-[#BFA15A]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-display text-sm font-bold text-[#F4F6FA] truncate">
                    {doc.title}
                  </h3>
                  <span className={`px-2 py-0.5 font-mono text-xs ${getClassificationColor(doc.classification)}`}>
                    {CLEARANCE_LEVELS[doc.classification]}
                  </span>
                </div>
                <p className="text-sm text-[#6B7280] truncate">{doc.description}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="font-mono text-xs text-[#6B7280]">{doc.id}</span>
                  <span className="font-mono text-xs text-[#6B7280]">{doc.date}</span>
                  <span className="font-mono text-xs text-[#BFA15A]">{doc.fileType}</span>
                  <span className="font-mono text-xs text-[#6B7280]">{doc.fileSize}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#BFA15A] flex-shrink-0" />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredDocs.length === 0 && (
          <div className="text-center py-16 border border-[#BFA15A]/20 bg-[#111827]/30">
            <AlertTriangle className="w-12 h-12 text-[#6B7280] mx-auto mb-4" />
            <p className="font-mono text-sm text-[#6B7280]">No documents found</p>
            {!isAuthenticated && (
              <p className="font-mono text-xs text-[#4B5563] mt-2">
                Some documents require authentication to access
              </p>
            )}
          </div>
        )}

        {/* Document Detail Modal */}
        {selectedDoc && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0f1a]/95 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-[#111827] border border-[#BFA15A]/30">
              <div className="p-6 border-b border-[#BFA15A]/20">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 border border-[#BFA15A]/30 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-[#BFA15A]" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#F4F6FA]">{selectedDoc.title}</h3>
                      <span className="font-mono text-xs text-[#6B7280]">{selectedDoc.id}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedDoc(null)}
                    className="p-2 text-[#6B7280] hover:text-[#F4F6FA]"
                  >
                    <Lock className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <span className="font-mono text-xs text-[#6B7280]">DESCRIPTION</span>
                  <p className="text-[#A9B3C2] mt-1">{selectedDoc.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-[#0a0f1a] border border-[#BFA15A]/10">
                    <span className="font-mono text-xs text-[#6B7280]">CATEGORY</span>
                    <p className="text-[#F4F6FA] mt-1">{selectedDoc.category}</p>
                  </div>
                  <div className="p-3 bg-[#0a0f1a] border border-[#BFA15A]/10">
                    <span className="font-mono text-xs text-[#6B7280]">CLASSIFICATION</span>
                    <p className={`mt-1 ${getClassificationColor(selectedDoc.classification).split(' ')[1]}`}>
                      {CLEARANCE_LEVELS[selectedDoc.classification]}
                    </p>
                  </div>
                  <div className="p-3 bg-[#0a0f1a] border border-[#BFA15A]/10">
                    <span className="font-mono text-xs text-[#6B7280]">DATE</span>
                    <p className="text-[#F4F6FA] mt-1">{selectedDoc.date}</p>
                  </div>
                  <div className="p-3 bg-[#0a0f1a] border border-[#BFA15A]/10">
                    <span className="font-mono text-xs text-[#6B7280]">FILE SIZE</span>
                    <p className="text-[#F4F6FA] mt-1">{selectedDoc.fileSize}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-[#BFA15A]/20">
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#BFA15A] text-[#0a0f1a] font-mono text-sm tracking-wider uppercase font-bold hover:bg-[#d4b76a] transition-colors">
                  <Download className="w-4 h-4" />
                  Download Document
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
