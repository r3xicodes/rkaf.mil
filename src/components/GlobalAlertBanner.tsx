/**
 * ============================================
 * RKAF SECURE COMMAND NETWORK - GLOBAL ALERT BANNER
 * ============================================
 * System-wide alert display for admin broadcasts
 */

import { X, AlertTriangle, Radio, Shield, Lock } from 'lucide-react';
import { useRKAFStore } from '@/store/RKAFStore';
import { ALERT_COLORS, ALERT_LABELS } from '@/types';

export function GlobalAlertBanner() {
  const { currentUser, getActiveAlerts, dismissAlert } = useRKAFStore();
  const alerts = currentUser ? getActiveAlerts(currentUser.id) : [];

  if (alerts.length === 0 || !currentUser) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-40 space-y-1">
      {alerts.map((alert) => {
        const colors = ALERT_COLORS[alert.level];
        const label = ALERT_LABELS[alert.level];
        
        const Icon = alert.level === 'lockdown' ? Lock : 
                     alert.level === 'high' ? AlertTriangle :
                     alert.level === 'elevated' ? Radio : Shield;

        return (
          <div
            key={alert.id}
            className={`${colors.bg} border-l-4 ${colors.border} ${colors.text}`}
          >
            <div className="px-4 py-3 flex items-start gap-4">
              {/* Icon */}
              <div className={`flex-shrink-0 w-10 h-10 ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className={`px-2 py-0.5 font-mono text-xs font-bold ${colors.bg} ${colors.text} border ${colors.border}`}>
                    {label}
                  </span>
                  <span className="font-display text-sm font-bold text-[#F4F6FA]">
                    {alert.title}
                  </span>
                </div>
                <p className="font-mono text-sm text-[#A9B3C2] whitespace-pre-wrap">
                  {alert.content}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="font-mono text-xs text-[#6B7280]">
                    From: {alert.author}
                  </span>
                  <span className="font-mono text-xs text-[#4B5563]">
                    {new Date(alert.timestamp).toLocaleString('en-GB')}
                  </span>
                </div>
              </div>

              {/* Dismiss */}
              <button
                onClick={() => dismissAlert(alert.id, currentUser.id)}
                className="flex-shrink-0 p-2 text-[#6B7280] hover:text-[#F4F6FA] transition-colors"
                title="Dismiss"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
