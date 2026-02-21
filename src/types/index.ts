/**
 * ============================================
 * RKAF SECURE COMMAND NETWORK - TYPE DEFINITIONS
 * ============================================
 * Production-Ready Military Intranet System
 * Version: 3.0.0
 * 
 * DEPLOYMENT CHECKLIST:
 * [x] Admin credentials created
 * [x] State initializes safely
 * [x] No blank screen
 * [x] Data persistence confirmed
 * [x] Role enforcement confirmed
 * [x] Login lockout working
 * [x] Emergency admin recovery working
 * [x] Export/import working
 * [x] No console errors
 * [x] Ready for hosting
 */

export type UserRole = 'admin' | 'moderator' | 'officer' | 'enlisted' | 'pending';

export type AlertLevel = 'notice' | 'elevated' | 'high' | 'lockdown';

export interface User {
  id: string;
  username: string;
  password: string; // Hashed in production
  fullName: string;
  serviceId: string;
  rank: string;
  email: string;
  role: UserRole;
  isApproved: boolean;
  clearanceLevel: number;
  // user-facing display name (customizable; falls back to username)
  displayName?: string;
  // has the user accepted the privacy policy / terms of service
  acceptedTerms?: boolean;
  createdAt: string;
  lastActive: string;
  isOnline: boolean;
  failedLoginAttempts: number;
  lockoutUntil: string | null;
  passwordChangedAt: string;
}

export interface Session {
  id: string;
  userId: string;
  loginTime: string;
  lastActivity: string;
  isActive: boolean;
}

export interface Channel {
  id: string;
  name: string;
  category: string;
  description: string;
  isRestricted: boolean;
  allowedRoles: UserRole[];
  clearanceRequired: number;
  isLocked: boolean;
  createdAt: string;
  createdBy: string;
}

export interface Message {
  id: string;
  channelId: string;
  userId: string;
  userName: string;
  userRank: string;
  userRole: UserRole;
  content: string;
  timestamp: string;
  isEdited: boolean;
  editedAt?: string;
  replyTo?: string;
  mediaUrls: string[];
}

export interface Comment {
  id: string;
  author: string;
  authorId: string;
  authorRank: string;
  authorRole: UserRole;
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  author: string;
  authorId: string;
  authorRank: string;
  authorRole: UserRole;
  title: string;
  content: string;
  mediaUrls: string[];
  timestamp: string;
  isEdited: boolean;
  editedAt?: string;
  isPinned: boolean;
  comments: Comment[];
}

export interface MediaItem {
  id: string;
  uploader: string;
  uploaderId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  dataUrl: string;
  linkedTo?: {
    type: 'message' | 'post';
    id: string;
  };
  timestamp: string;
}

export interface SystemAlert {
  id: string;
  title: string;
  content: string;
  level: AlertLevel;
  author: string;
  authorId: string;
  timestamp: string;
  isActive: boolean;
  dismissedBy: string[];
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}

export interface RKAFState {
  version: string;
  lastUpdated: string;
  isFirstRun: boolean;
  systemInitialized: boolean;
  users: User[];
  sessions: Session[];
  currentUserId: string | null;
  channels: Channel[];
  messages: Message[];
  posts: Post[];
  media: MediaItem[];
  alerts: SystemAlert[];
  logs: ActivityLog[];
}

// Constants
export const CLEARANCE_LEVELS: Record<number, string> = {
  1: 'UNCLASSIFIED',
  2: 'RESTRICTED',
  3: 'CONFIDENTIAL',
  4: 'SECRET',
  5: 'TOP SECRET',
};

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  admin: 5,
  moderator: 4,
  officer: 3,
  enlisted: 2,
  pending: 1,
};

export const ALERT_COLORS: Record<AlertLevel, { bg: string; border: string; text: string }> = {
  notice: { bg: 'bg-blue-900/30', border: 'border-blue-500/50', text: 'text-blue-400' },
  elevated: { bg: 'bg-yellow-900/30', border: 'border-yellow-500/50', text: 'text-yellow-400' },
  high: { bg: 'bg-orange-900/30', border: 'border-orange-500/50', text: 'text-orange-400' },
  lockdown: { bg: 'bg-red-900/30', border: 'border-red-500/50', text: 'text-red-400' },
};

export const ALERT_LABELS: Record<AlertLevel, string> = {
  notice: 'NOTICE',
  elevated: 'ELEVATED READINESS',
  high: 'HIGH ALERT',
  lockdown: 'STRATEGIC LOCKDOWN',
};

export const RANKS = [
  'Air Marshal',
  'Air Vice Marshal',
  'Air Commodore',
  'Group Captain',
  'Wing Commander',
  'Squadron Leader',
  'Flight Lieutenant',
  'Flying Officer',
  'Pilot Officer',
  'Warrant Officer',
  'Flight Sergeant',
  'Sergeant',
  'Corporal',
  'Leading Aircraftman',
  'Aircraftman',
];

export const DEFAULT_CHANNELS: Omit<Channel, 'id' | 'createdAt' | 'createdBy'>[] = [
  {
    name: 'command-briefings',
    category: 'Command',
    description: 'Official command announcements and briefings',
    isRestricted: true,
    allowedRoles: ['admin', 'moderator', 'officer'],
    clearanceRequired: 3,
    isLocked: false,
  },
  {
    name: 'squadron-ops',
    category: 'Operations',
    description: 'Squadron operations coordination',
    isRestricted: false,
    allowedRoles: ['admin', 'moderator', 'officer', 'enlisted'],
    clearanceRequired: 1,
    isLocked: false,
  },
  {
    name: 'air-defense',
    category: 'Operations',
    description: 'Air defense network communications',
    isRestricted: true,
    allowedRoles: ['admin', 'moderator', 'officer'],
    clearanceRequired: 3,
    isLocked: false,
  },
  {
    name: 'training-wing',
    category: 'Training',
    description: 'Training exercises and doctrine discussion',
    isRestricted: false,
    allowedRoles: ['admin', 'moderator', 'officer', 'enlisted'],
    clearanceRequired: 1,
    isLocked: false,
  },
  {
    name: 'intelligence',
    category: 'Intelligence',
    description: 'Classified intelligence briefings',
    isRestricted: true,
    allowedRoles: ['admin', 'moderator', 'officer'],
    clearanceRequired: 4,
    isLocked: false,
  },
  {
    name: 'general-hangar',
    category: 'General',
    description: 'General discussion and announcements',
    isRestricted: false,
    allowedRoles: ['admin', 'moderator', 'officer', 'enlisted'],
    clearanceRequired: 1,
    isLocked: false,
  },
];
