/**
 * ============================================
 * RKAF SECURE COMMAND NETWORK - MEDIA PAGE
 * ============================================
 * Media gallery and press materials
 */

import { useState, useRef } from 'react';
import { Film, Download, Upload, X, Camera, FileImage, AlertTriangle } from 'lucide-react';
import { useRKAFStore } from '@/store/RKAFStore';

interface MediaGalleryItem {
  id: string;
  title: string;
  description: string;
  type: 'image' | 'video';
  date: string;
  category: string;
  url: string;
}

const galleryItems: MediaGalleryItem[] = [
  {
    id: 'MEDIA-001',
    title: 'F-35A Lightning II Formation',
    description: '101st Fighter Squadron during routine patrol',
    type: 'image',
    date: '2026-02-15',
    category: 'Aircraft',
    url: '/api/placeholder/800/600',
  },
  {
    id: 'MEDIA-002',
    title: 'Air Base Alpha Hangar',
    description: 'Maintenance operations at Alpha Air Base',
    type: 'image',
    date: '2026-01-28',
    category: 'Facilities',
    url: '/api/placeholder/800/600',
  },
  {
    id: 'MEDIA-003',
    title: 'Pilot Training Exercise',
    description: 'Cadets from 601st Training Squadron',
    type: 'image',
    date: '2026-01-20',
    category: 'Training',
    url: '/api/placeholder/800/600',
  },
  {
    id: 'MEDIA-004',
    title: 'JAS 39E Gripen Takeoff',
    description: '201st Strike Squadron departure',
    type: 'image',
    date: '2025-12-10',
    category: 'Aircraft',
    url: '/api/placeholder/800/600',
  },
  {
    id: 'MEDIA-005',
    title: 'Command Briefing',
    description: 'Senior officers during strategic planning session',
    type: 'image',
    date: '2025-11-15',
    category: 'Personnel',
    url: '/api/placeholder/800/600',
  },
  {
    id: 'MEDIA-006',
    title: 'Aircraft Maintenance',
    description: 'Technicians performing routine inspection',
    type: 'image',
    date: '2025-10-22',
    category: 'Operations',
    url: '/api/placeholder/800/600',
  },
];

const categories = ['All', 'Aircraft', 'Facilities', 'Training', 'Personnel', 'Operations'];

export function MediaPage() {
  const { isAuthenticated, currentUser, uploadMedia, state: _state } = useRKAFStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<MediaGalleryItem | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser) return;

    setUploading(true);
    await uploadMedia(file, currentUser.id);
    setUploading(false);
    setShowUpload(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Camera className="w-8 h-8 text-[#BFA15A]" />
            <span className="font-mono text-sm text-[#BFA15A] tracking-wider">MEDIA GALLERY</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-[#F4F6FA] mb-4">
                RKAF MEDIA
              </h1>
              <div className="w-32 h-1 bg-[#BFA15A]" />
            </div>
            {isAuthenticated && (
              <button
                onClick={() => setShowUpload(true)}
                className="flex items-center gap-2 px-4 py-2 border border-[#BFA15A]/50 text-[#BFA15A] font-mono text-xs tracking-wider uppercase hover:bg-[#BFA15A]/10 transition-colors"
              >
                <Upload className="w-4 h-4" />
                Upload Media
              </button>
            )}
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

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer"
            >
              <div className="aspect-video border border-[#BFA15A]/20 bg-[#111827]/50 overflow-hidden relative">
                {/* Placeholder for actual image */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#1F2937]">
                  {item.type === 'image' ? (
                    <FileImage className="w-16 h-16 text-[#4B5563]" />
                  ) : (
                    <Film className="w-16 h-16 text-[#4B5563]" />
                  )}
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#BFA15A]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 border-2 border-[#BFA15A] flex items-center justify-center">
                    <Camera className="w-6 h-6 text-[#BFA15A]" />
                  </div>
                </div>
                {/* Category badge */}
                <div className="absolute top-2 left-2 px-2 py-1 bg-[#0a0f1a]/80 font-mono text-xs text-[#BFA15A]">
                  {item.category}
                </div>
              </div>
              <div className="p-4 border border-t-0 border-[#BFA15A]/20 bg-[#111827]/30">
                <h3 className="font-display text-sm font-bold text-[#F4F6FA] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#6B7280] line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-mono text-xs text-[#6B7280]">{item.date}</span>
                  <span className="font-mono text-xs text-[#BFA15A]">{item.type.toUpperCase()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 border border-[#BFA15A]/20 bg-[#111827]/30">
            <AlertTriangle className="w-12 h-12 text-[#6B7280] mx-auto mb-4" />
            <p className="font-mono text-sm text-[#6B7280]">No media items in this category</p>
          </div>
        )}

        {/* Image Viewer Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0f1a]/95 backdrop-blur-sm p-4">
            <div className="w-full max-w-4xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#F4F6FA]">{selectedItem.title}</h3>
                  <p className="text-sm text-[#6B7280]">{selectedItem.description}</p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 text-[#6B7280] hover:text-[#F4F6FA]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Image */}
              <div className="aspect-video border border-[#BFA15A]/30 bg-[#111827] flex items-center justify-center">
                <FileImage className="w-32 h-32 text-[#4B5563]" />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-[#6B7280]">{selectedItem.date}</span>
                  <span className="px-2 py-1 bg-[#BFA15A]/20 font-mono text-xs text-[#BFA15A]">
                    {selectedItem.category}
                  </span>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-[#BFA15A]/50 text-[#BFA15A] font-mono text-xs tracking-wider uppercase hover:bg-[#BFA15A]/10 transition-colors">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {showUpload && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0f1a]/95 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-[#111827] border border-[#BFA15A]/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-lg font-bold text-[#F4F6FA]">Upload Media</h3>
                <button
                  onClick={() => setShowUpload(false)}
                  className="p-2 text-[#6B7280] hover:text-[#F4F6FA]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-video border-2 border-dashed border-[#BFA15A]/30 flex flex-col items-center justify-center cursor-pointer hover:border-[#BFA15A] transition-colors"
              >
                <Upload className="w-12 h-12 text-[#BFA15A] mb-4" />
                <p className="font-mono text-sm text-[#A9B3C2]">Click to select file</p>
                <p className="font-mono text-xs text-[#6B7280] mt-2">Images and videos supported</p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {uploading && (
                <div className="mt-4 text-center">
                  <div className="inline-block w-6 h-6 border-2 border-[#BFA15A] border-t-transparent rounded-full animate-spin" />
                  <p className="font-mono text-xs text-[#6B7280] mt-2">Uploading...</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
