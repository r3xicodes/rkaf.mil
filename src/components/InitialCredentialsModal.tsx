/**
 * ============================================
 * RKAF SECURE COMMAND NETWORK - INITIAL CREDENTIALS
 * ============================================
 * Shows default admin credentials ONCE on first run
 */

import { useState } from 'react';
import { Shield, Copy, Check, Lock, AlertTriangle } from 'lucide-react';
import { DEFAULT_ADMIN } from '@/store/RKAFStore';

interface InitialCredentialsModalProps {
  onClose: () => void;
}

export function InitialCredentialsModal({ onClose }: InitialCredentialsModalProps) {
  const [copied, setCopied] = useState<{ field: string; value: string } | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const copyToClipboard = (field: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopied({ field, value });
    setTimeout(() => setCopied(null), 2000);
  };

  const handleClose = () => {
    if (!confirmed) return;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-[#0a0f1a]/95 backdrop-blur-sm">
      <div className="w-full max-w-lg mx-4 bg-[#111827] border-2 border-[#BFA15A] shadow-2xl">
        {/* Header */}
        <div className="bg-[#BFA15A] px-6 py-4">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-[#0a0f1a]" />
            <div>
              <h2 className="font-display text-xl font-bold text-[#0a0f1a]">
                INITIAL ADMINISTRATIVE CREDENTIALS
              </h2>
              <p className="font-mono text-xs text-[#0a0f1a]/70">
                SAVE IMMEDIATELY – WILL NOT BE SHOWN AGAIN
              </p>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="px-6 py-3 bg-[#EF4444]/10 border-b border-[#EF4444]/30">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#EF4444] flex-shrink-0 mt-0.5" />
            <p className="font-mono text-xs text-[#EF4444]">
              This is the only time these credentials will be displayed. 
              Record them securely. If lost, use the emergency recovery system.
            </p>
          </div>
        </div>

        {/* Credentials */}
        <div className="p-6 space-y-4">
          {/* Username */}
          <div>
            <label className="block font-mono text-xs tracking-wider text-[#6B7280] mb-2">
              USERNAME
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-4 py-3 bg-[#0a0f1a] border border-[#BFA15A]/30 font-mono text-lg text-[#F4F6FA] tracking-wider">
                {DEFAULT_ADMIN.username}
              </div>
              <button
                onClick={() => copyToClipboard('username', DEFAULT_ADMIN.username)}
                className="p-3 border border-[#BFA15A]/30 text-[#BFA15A] hover:bg-[#BFA15A]/10 transition-colors"
                title="Copy username"
              >
                {copied?.field === 'username' ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block font-mono text-xs tracking-wider text-[#6B7280] mb-2">
              PASSWORD
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-4 py-3 bg-[#0a0f1a] border border-[#BFA15A]/30 font-mono text-lg text-[#F4F6FA] tracking-wider">
                {DEFAULT_ADMIN.password}
              </div>
              <button
                onClick={() => copyToClipboard('password', DEFAULT_ADMIN.password)}
                className="p-3 border border-[#BFA15A]/30 text-[#BFA15A] hover:bg-[#BFA15A]/10 transition-colors"
                title="Copy password"
              >
                {copied?.field === 'password' ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Additional info */}
          <div className="p-4 bg-[#0a0f1a] border border-[#BFA15A]/20">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-mono text-xs text-[#6B7280]">Service ID:</span>
                <p className="font-mono text-[#A9B3C2]">{DEFAULT_ADMIN.serviceId}</p>
              </div>
              <div>
                <span className="font-mono text-xs text-[#6B7280]">Rank:</span>
                <p className="font-mono text-[#A9B3C2]">{DEFAULT_ADMIN.rank}</p>
              </div>
            </div>
          </div>

          {/* Confirmation checkbox */}
          <label className="flex items-start gap-3 p-3 border border-[#BFA15A]/20 cursor-pointer hover:bg-[#BFA15A]/5 transition-colors">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="w-5 h-5 mt-0.5 accent-[#BFA15A]"
            />
            <span className="font-mono text-sm text-[#A9B3C2]">
              I have securely recorded these credentials and understand they will not be displayed again.
            </span>
          </label>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#BFA15A]/20">
          <button
            onClick={handleClose}
            disabled={!confirmed}
            className="w-full py-3 bg-[#BFA15A] text-[#0a0f1a] font-mono text-sm tracking-wider uppercase font-bold hover:bg-[#d4b76a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            Secure Credentials & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
