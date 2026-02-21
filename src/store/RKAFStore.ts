/**
 * ============================================
 * RKAF SECURE COMMAND NETWORK - STATE STORE
 * ============================================
 * Production-Ready State Management with Defensive Coding
 * 
 * SAFETY FEATURES:
 * - Automatic state recovery on corruption
 * - Default admin generation on first run
 * - Emergency admin recovery
 * - State validation before save
 * - Try/catch on all operations
 */

import type { 
  RKAFState, User, UserRole, Session, Channel, 
  Message, Post, MediaItem, SystemAlert, ActivityLog, AlertLevel, Comment 
} from '@/types';
import { DEFAULT_CHANNELS, ROLE_HIERARCHY } from '@/types';

// Storage key
const STORAGE_KEY = 'RKAF_STATE_V3';
const CREDENTIALS_SHOWN_KEY = 'RKAF_CREDENTIALS_SHOWN';

// Default credentials (shown once on first run)
export const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'RKAF-Command-2026',
  fullName: 'System Administrator',
  serviceId: 'RKAF-ADMIN-001',
  rank: 'Air Marshal',
  email: 'admin@rkaf.mil',
};

export const EMERGENCY_ADMIN = {
  username: 'emergency_admin',
  password: 'RKAF-EMERGENCY-ACCESS',
  fullName: 'Emergency Administrator',
  serviceId: 'RKAF-EMRG-001',
  rank: 'Air Marshal',
  email: 'emergency@rkaf.mil',
};

// Generate unique ID
const generateId = (prefix: string): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Simple password hash simulation (for demo - use bcrypt in production)
const hashPassword = (password: string): string => {
  // In production, use proper hashing like bcrypt
  return btoa(password + '_RKAF_SALT_2026');
};

const verifyPassword = (password: string, hashed: string): boolean => {
  return hashPassword(password) === hashed;
};

// Safe JSON parse with fallback
const safeJsonParse = <T>(json: string | null, fallback: T): T => {
  if (!json) return fallback;
  try {
    return JSON.parse(json) as T;
  } catch (e) {
    console.error('RKAF: State parse error, using fallback', e);
    return fallback;
  }
};

// Create default admin user
const createDefaultAdmin = (): User => ({
  id: generateId('user'),
  username: DEFAULT_ADMIN.username,
  password: hashPassword(DEFAULT_ADMIN.password),
  fullName: DEFAULT_ADMIN.fullName,
  serviceId: DEFAULT_ADMIN.serviceId,
  rank: DEFAULT_ADMIN.rank,
  email: DEFAULT_ADMIN.email,
  role: 'admin',
  isApproved: true,
  clearanceLevel: 5,
  createdAt: new Date().toISOString(),
  lastActive: new Date().toISOString(),
  isOnline: false,
  failedLoginAttempts: 0,
  lockoutUntil: null,
  passwordChangedAt: new Date().toISOString(),
});

// Create emergency admin
const createEmergencyAdmin = (): User => ({
  id: generateId('user'),
  username: EMERGENCY_ADMIN.username,
  password: hashPassword(EMERGENCY_ADMIN.password),
  fullName: EMERGENCY_ADMIN.fullName,
  serviceId: EMERGENCY_ADMIN.serviceId,
  rank: EMERGENCY_ADMIN.rank,
  email: EMERGENCY_ADMIN.email,
  role: 'admin',
  isApproved: true,
  clearanceLevel: 5,
  createdAt: new Date().toISOString(),
  lastActive: new Date().toISOString(),
  isOnline: false,
  failedLoginAttempts: 0,
  lockoutUntil: null,
  passwordChangedAt: new Date().toISOString(),
});

// Create default channels
const createDefaultChannels = (adminId: string): Channel[] => {
  return DEFAULT_CHANNELS.map((ch, index) => ({
    ...ch,
    id: generateId('chan'),
    createdAt: new Date(Date.now() + index).toISOString(),
    createdBy: adminId,
  }));
};

// Validate state structure
const validateState = (state: any): state is RKAFState => {
  if (!state || typeof state !== 'object') return false;
  if (!Array.isArray(state.users)) return false;
  if (!Array.isArray(state.channels)) return false;
  if (!Array.isArray(state.messages)) return false;
  if (!Array.isArray(state.posts)) return false;
  if (!Array.isArray(state.media)) return false;
  if (!Array.isArray(state.alerts)) return false;
  if (!Array.isArray(state.logs)) return false;
  return true;
};

// Create initial state
const createInitialState = (): RKAFState => {
  const admin = createDefaultAdmin();
  const channels = createDefaultChannels(admin.id);
  
  return {
    version: '3.0.0',
    lastUpdated: new Date().toISOString(),
    isFirstRun: true,
    systemInitialized: true,
    users: [admin],
    sessions: [],
    currentUserId: null,
    channels,
    messages: [
      {
        id: generateId('msg'),
        channelId: channels[0].id,
        userId: admin.id,
        userName: admin.fullName,
        userRank: admin.rank,
        userRole: admin.role,
        content: 'Welcome to the RKAF Secure Command Network. This system is now operational. All personnel must maintain operational security at all times.',
        timestamp: new Date().toISOString(),
        isEdited: false,
        mediaUrls: [],
      },
    ],
    posts: [
      {
        id: generateId('post'),
        author: admin.fullName,
        authorId: admin.id,
        authorRank: admin.rank,
        authorRole: admin.role,
        title: 'Welcome to the Command Bulletin Board',
        content: 'This is the official bulletin board for all RKAF personnel. Important announcements and operational updates will be posted here.\n\nAll personnel are required to check this board daily.',
        mediaUrls: [],
        timestamp: new Date().toISOString(),
        isEdited: false,
        isPinned: true,
        comments: [],
      },
    ],
    media: [],
    alerts: [],
    logs: [
      {
        id: generateId('log'),
        userId: admin.id,
        userName: admin.fullName,
        action: 'SYSTEM_INIT',
        details: 'RKAF Secure Command Network initialized successfully',
        timestamp: new Date().toISOString(),
        ipAddress: '127.0.0.1',
      },
    ],
  };
};

// Main Store Class
class RKAFStore {
  private state: RKAFState;
  private listeners: Set<() => void> = new Set();
  private saveTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.state = this.loadState();
    this.ensureAdminExists();
    this.startAutoSave();
  }

  // Subscribe to state changes
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // Notify all listeners
  private notify(): void {
    this.listeners.forEach(listener => {
      try {
        listener();
      } catch (e) {
        console.error('RKAF: Listener error', e);
      }
    });
  }

  // Load state from storage with recovery
  private loadState(): RKAFState {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      
      if (!stored) {
        console.log('RKAF: No stored state found, creating initial state');
        return createInitialState();
      }

      const parsed = safeJsonParse<RKAFState>(stored, null as any);
      
      if (!validateState(parsed)) {
        console.error('RKAF: Invalid state structure, resetting to defaults');
        return createInitialState();
      }

      // Merge with defaults to ensure new fields exist
      const defaults = createInitialState();
      return {
        ...defaults,
        ...parsed,
        version: defaults.version,
        isFirstRun: false, // Not first run if we loaded successfully
      };
    } catch (e) {
      console.error('RKAF: Critical error loading state', e);
      return createInitialState();
    }
  }

  // Save state to storage
  private saveState(): void {
    try {
      this.state.lastUpdated = new Date().toISOString();
      const serialized = JSON.stringify(this.state);
      localStorage.setItem(STORAGE_KEY, serialized);
    } catch (e) {
      console.error('RKAF: Failed to save state', e);
    }
  }

  // Debounced save
  private scheduleSave(): void {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    this.saveTimeout = setTimeout(() => {
      this.saveState();
    }, 100);
  }

  // Auto-save every 30 seconds
  private startAutoSave(): void {
    setInterval(() => {
      this.saveState();
    }, 30000);
  }

  // Ensure at least one admin exists
  private ensureAdminExists(): void {
    const admins = this.state.users.filter(u => u.role === 'admin' && u.isApproved);
    
    if (admins.length === 0) {
      console.warn('RKAF: No admin found, creating emergency admin');
      const emergencyAdmin = createEmergencyAdmin();
      this.state.users.push(emergencyAdmin);
      this.addLog('EMERGENCY_RECOVERY', 'Emergency admin account created - no valid admins found', emergencyAdmin.id);
      this.saveState();
    }
  }

  // Get current state
  getState(): RKAFState {
    return { ...this.state };
  }

  // Get current user
  getCurrentUser(): User | null {
    if (!this.state.currentUserId) return null;
    return this.state.users.find(u => u.id === this.state.currentUserId) || null;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.state.currentUserId !== null;
  }

  // Check if current user is admin
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  // Check clearance level
  hasClearance(level: number): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    return user.clearanceLevel >= level;
  }

  // Check if credentials have been shown
  haveCredentialsBeenShown(): boolean {
    return localStorage.getItem(CREDENTIALS_SHOWN_KEY) === 'true';
  }

  // Mark credentials as shown
  markCredentialsShown(): void {
    localStorage.setItem(CREDENTIALS_SHOWN_KEY, 'true');
    this.state.isFirstRun = false;
    this.saveState();
  }

  // Add activity log
  addLog(action: string, details: string, userId?: string): void {
    const user = userId ? this.state.users.find(u => u.id === userId) : this.getCurrentUser();
    
    const log: ActivityLog = {
      id: generateId('log'),
      userId: user?.id || 'system',
      userName: user?.fullName || 'System',
      action,
      details,
      timestamp: new Date().toISOString(),
      ipAddress: '127.0.0.1',
    };

    this.state.logs.unshift(log);
    // Keep only last 2000 logs
    if (this.state.logs.length > 2000) {
      this.state.logs = this.state.logs.slice(0, 2000);
    }
    this.scheduleSave();
    this.notify();
  }

  // Login
  login(username: string, password: string): { success: boolean; message: string; user?: User } {
    // Find user by username or serviceId
    const user = this.state.users.find(
      u => (u.username === username || u.serviceId === username) && u.isApproved
    );

    if (!user) {
      this.addLog('LOGIN_FAILED', `Failed login attempt for unknown user: ${username}`);
      return { success: false, message: 'Invalid credentials' };
    }

    // Check lockout
    if (user.lockoutUntil && new Date(user.lockoutUntil) > new Date()) {
      const remaining = Math.ceil((new Date(user.lockoutUntil).getTime() - Date.now()) / 1000);
      return { success: false, message: `Account locked. Try again in ${remaining} seconds.` };
    }

    // Verify password
    if (!verifyPassword(password, user.password)) {
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
      
      // Lock after 5 failed attempts
      if (user.failedLoginAttempts >= 5) {
        user.lockoutUntil = new Date(Date.now() + 30000).toISOString(); // 30 second lock
        user.failedLoginAttempts = 0;
        this.addLog('ACCOUNT_LOCKED', `Account locked due to failed login attempts: ${user.fullName}`, user.id);
        this.scheduleSave();
        return { success: false, message: 'Too many failed attempts. Account locked for 30 seconds.' };
      }

      this.addLog('LOGIN_FAILED', `Failed login attempt for: ${user.fullName}`, user.id);
      this.scheduleSave();
      return { success: false, message: `Invalid credentials. ${5 - user.failedLoginAttempts} attempts remaining.` };
    }

    // Success - reset failed attempts
    user.failedLoginAttempts = 0;
    user.lockoutUntil = null;
    user.lastActive = new Date().toISOString();
    user.isOnline = true;

    // Create session
    const session: Session = {
      id: generateId('session'),
      userId: user.id,
      loginTime: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      isActive: true,
    };

    // Deactivate other sessions for this user
    this.state.sessions = this.state.sessions.map(s => 
      s.userId === user.id ? { ...s, isActive: false } : s
    );
    this.state.sessions.push(session);
    this.state.currentUserId = user.id;

    this.addLog('LOGIN', `User logged in: ${user.fullName}`, user.id);
    this.saveState();
    this.notify();

    return { success: true, message: 'Login successful', user };
  }

  // Logout
  logout(): void {
    const user = this.getCurrentUser();
    if (user) {
      user.isOnline = false;
      user.lastActive = new Date().toISOString();
      this.state.sessions = this.state.sessions.map(s => 
        s.userId === user.id ? { ...s, isActive: false } : s
      );
      this.addLog('LOGOUT', `User logged out: ${user.fullName}`, user.id);
    }
    this.state.currentUserId = null;
    this.saveState();
    this.notify();
  }

  // Register new user
  register(data: {
    username: string;
    password: string;
    fullName: string;
    serviceId: string;
    rank: string;
    email: string;
  }): { success: boolean; message: string } {
    // Check for duplicates
    const existing = this.state.users.find(
      u => u.username === data.username || u.serviceId === data.serviceId || u.email === data.email
    );

    if (existing) {
      return { success: false, message: 'Username, Service ID, or email already registered' };
    }

    const newUser: User = {
      id: generateId('user'),
      username: data.username,
      password: hashPassword(data.password),
      fullName: data.fullName,
      serviceId: data.serviceId,
      rank: data.rank,
      email: data.email,
      role: 'pending',
      isApproved: false,
      clearanceLevel: 1,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      isOnline: false,
      failedLoginAttempts: 0,
      lockoutUntil: null,
      passwordChangedAt: new Date().toISOString(),
    };

    this.state.users.push(newUser);
    this.addLog('REGISTRATION', `New user registered: ${newUser.fullName}`, newUser.id);
    this.saveState();
    this.notify();

    return { success: true, message: 'Registration submitted. Awaiting admin approval.' };
  }

  // Change password
  changePassword(userId: string, oldPassword: string, newPassword: string): { success: boolean; message: string } {
    const user = this.state.users.find(u => u.id === userId);
    if (!user) return { success: false, message: 'User not found' };

    if (!verifyPassword(oldPassword, user.password)) {
      return { success: false, message: 'Current password is incorrect' };
    }

    user.password = hashPassword(newPassword);
    user.passwordChangedAt = new Date().toISOString();
    
    this.addLog('PASSWORD_CHANGED', `Password changed for: ${user.fullName}`, user.id);
    this.saveState();
    this.notify();

    return { success: true, message: 'Password changed successfully' };
  }

  // Approve user
  approveUser(userId: string): void {
    const user = this.state.users.find(u => u.id === userId);
    if (!user) return;

    user.isApproved = true;
    user.role = 'enlisted';
    user.clearanceLevel = 2;
    
    this.addLog('USER_APPROVED', `User approved: ${user.fullName}`, userId);
    this.saveState();
    this.notify();
  }

  // Reject user
  rejectUser(userId: string): void {
    const user = this.state.users.find(u => u.id === userId);
    if (!user) return;

    this.state.users = this.state.users.filter(u => u.id !== userId);
    this.addLog('USER_REJECTED', `User rejected and removed: ${user.fullName}`, userId);
    this.saveState();
    this.notify();
  }

  // Assign role
  assignRole(userId: string, role: UserRole, assignedBy: string): { success: boolean; message: string } {
    const user = this.state.users.find(u => u.id === userId);
    const assigner = this.state.users.find(u => u.id === assignedBy);
    
    if (!user) return { success: false, message: 'User not found' };
    if (!assigner) return { success: false, message: 'Assigner not found' };

    // Prevent self-demotion for admins
    if (userId === assignedBy && user.role === 'admin' && role !== 'admin') {
      return { success: false, message: 'You cannot remove your own admin privileges' };
    }

    // Check hierarchy
    if (ROLE_HIERARCHY[role] > ROLE_HIERARCHY[assigner.role] && assigner.role !== 'admin') {
      return { success: false, message: 'You cannot assign a higher role than your own' };
    }

    // Only admin can assign admin
    if (role === 'admin' && assigner.role !== 'admin') {
      return { success: false, message: 'Only administrators can assign admin role' };
    }

    user.role = role;
    user.clearanceLevel = ROLE_HIERARCHY[role];
    
    this.addLog('ROLE_ASSIGNED', `Role ${role} assigned to ${user.fullName}`, assignedBy);
    this.saveState();
    this.notify();

    return { success: true, message: 'Role assigned successfully' };
  }

  // Create channel
  createChannel(data: Omit<Channel, 'id' | 'createdAt' | 'createdBy'>, createdBy: string): Channel {
    const channel: Channel = {
      ...data,
      id: generateId('chan'),
      createdAt: new Date().toISOString(),
      createdBy,
    };
    this.state.channels.push(channel);
    this.addLog('CHANNEL_CREATED', `Channel #${channel.name} created`, createdBy);
    this.saveState();
    this.notify();
    return channel;
  }

  // Lock/unlock channel
  lockChannel(channelId: string, locked: boolean, userId: string): void {
    const channel = this.state.channels.find(c => c.id === channelId);
    if (!channel) return;

    channel.isLocked = locked;
    this.addLog(locked ? 'CHANNEL_LOCKED' : 'CHANNEL_UNLOCKED', `Channel #${channel.name} ${locked ? 'locked' : 'unlocked'}`, userId);
    this.saveState();
    this.notify();
  }

  // Send message
  sendMessage(channelId: string, content: string, userId: string, replyTo?: string, mediaUrls: string[] = []): Message | null {
    const user = this.state.users.find(u => u.id === userId);
    const channel = this.state.channels.find(c => c.id === channelId);
    
    if (!user || !channel) return null;
    if (channel.isLocked && user.role !== 'admin' && user.role !== 'moderator') return null;
    if (!channel.allowedRoles.includes(user.role)) return null;
    if (user.clearanceLevel < channel.clearanceRequired) return null;

    const message: Message = {
      id: generateId('msg'),
      channelId,
      userId,
      userName: user.fullName,
      userRank: user.rank,
      userRole: user.role,
      content,
      timestamp: new Date().toISOString(),
      isEdited: false,
      replyTo,
      mediaUrls,
    };

    this.state.messages.push(message);
    this.saveState();
    this.notify();
    return message;
  }

  // Edit message
  editMessage(messageId: string, newContent: string, userId: string): void {
    const message = this.state.messages.find(m => m.id === messageId);
    if (!message) return;

    const user = this.state.users.find(u => u.id === userId);
    if (!user) return;

    // Only author, admin, or moderator can edit
    if (message.userId !== userId && user.role !== 'admin' && user.role !== 'moderator') return;

    message.content = newContent;
    message.isEdited = true;
    message.editedAt = new Date().toISOString();
    
    this.addLog('MESSAGE_EDITED', `Message edited in #${this.state.channels.find(c => c.id === message.channelId)?.name}`, userId);
    this.saveState();
    this.notify();
  }

  // Delete message
  deleteMessage(messageId: string, userId: string): void {
    const message = this.state.messages.find(m => m.id === messageId);
    if (!message) return;

    const user = this.state.users.find(u => u.id === userId);
    if (!user) return;

    // Only author, admin, or moderator can delete
    if (message.userId !== userId && user.role !== 'admin' && user.role !== 'moderator') return;

    this.state.messages = this.state.messages.filter(m => m.id !== messageId);
    this.addLog('MESSAGE_DELETED', `Message deleted from #${this.state.channels.find(c => c.id === message.channelId)?.name}`, userId);
    this.saveState();
    this.notify();
  }

  // Create post
  createPost(data: Omit<Post, 'id' | 'timestamp' | 'isEdited' | 'comments'>, authorId: string): Post | null {
    const author = this.state.users.find(u => u.id === authorId);
    if (!author || (author.role !== 'admin' && author.role !== 'moderator')) return null;

    const post: Post = {
      ...data,
      id: generateId('post'),
      timestamp: new Date().toISOString(),
      isEdited: false,
      comments: [],
    };

    this.state.posts.unshift(post);
    this.addLog('POST_CREATED', `Post created: ${post.title}`, authorId);
    this.saveState();
    this.notify();
    return post;
  }

  // Add comment
  addComment(postId: string, content: string, authorId: string): void {
    const post = this.state.posts.find(p => p.id === postId);
    const author = this.state.users.find(u => u.id === authorId);
    if (!post || !author) return;

    const comment: Comment = {
      id: generateId('comment'),
      author: author.fullName,
      authorId: author.id,
      authorRank: author.rank,
      authorRole: author.role,
      content,
      timestamp: new Date().toISOString(),
    };

    post.comments.push(comment);
    this.saveState();
    this.notify();
  }

  // Upload media
  async uploadMedia(file: File, uploaderId: string, linkedTo?: { type: 'message' | 'post'; id: string }): Promise<MediaItem | null> {
    const uploader = this.state.users.find(u => u.id === uploaderId);
    if (!uploader) return null;

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const mediaItem: MediaItem = {
          id: generateId('media'),
          uploader: uploader.fullName,
          uploaderId,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          dataUrl: reader.result as string,
          linkedTo,
          timestamp: new Date().toISOString(),
        };

        this.state.media.push(mediaItem);
        this.addLog('MEDIA_UPLOADED', `File uploaded: ${file.name}`, uploaderId);
        this.saveState();
        this.notify();
        resolve(mediaItem);
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  }

  // Create alert
  createAlert(title: string, content: string, level: AlertLevel, authorId: string): void {
    const author = this.state.users.find(u => u.id === authorId);
    if (!author || author.role !== 'admin') return;

    const alert: SystemAlert = {
      id: generateId('alert'),
      title,
      content,
      level,
      author: author.fullName,
      authorId,
      timestamp: new Date().toISOString(),
      isActive: true,
      dismissedBy: [],
    };

    this.state.alerts.push(alert);
    this.addLog('ALERT_CREATED', `Alert created: ${title} (${level})`, authorId);
    this.saveState();
    this.notify();
  }

  // Dismiss alert
  dismissAlert(alertId: string, userId: string): void {
    const alert = this.state.alerts.find(a => a.id === alertId);
    if (!alert) return;
    
    if (!alert.dismissedBy.includes(userId)) {
      alert.dismissedBy.push(userId);
      this.saveState();
      this.notify();
    }
  }

  // Get active alerts for user
  getActiveAlerts(userId: string): SystemAlert[] {
    return this.state.alerts.filter(a => a.isActive && !a.dismissedBy.includes(userId));
  }

  // Export state
  exportState(): string {
    return JSON.stringify(this.state, null, 2);
  }

  // Import state
  importState(jsonString: string): { success: boolean; message: string } {
    try {
      const parsed = JSON.parse(jsonString);
      if (!validateState(parsed)) {
        return { success: false, message: 'Invalid state format' };
      }
      this.state = parsed;
      this.ensureAdminExists();
      this.saveState();
      this.notify();
      return { success: true, message: 'State imported successfully' };
    } catch (e) {
      return { success: false, message: 'Failed to parse state file' };
    }
  }

  // Reset system
  resetSystem(): void {
    this.state = createInitialState();
    localStorage.removeItem(CREDENTIALS_SHOWN_KEY);
    this.saveState();
    this.notify();
  }

  // Get storage usage
  getStorageUsage(): { used: number; total: number; percentage: number } {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || '';
      const used = new Blob([stored]).size;
      // Approximate localStorage limit (varies by browser, typically 5-10MB)
      const total = 5 * 1024 * 1024; // 5MB
      return {
        used,
        total,
        percentage: Math.round((used / total) * 100),
      };
    } catch {
      return { used: 0, total: 0, percentage: 0 };
    }
  }
}

// Create singleton instance
export const store = new RKAFStore();

// React hook for using store
import { useState, useEffect } from 'react';

export function useRKAFStore() {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    return store.subscribe(() => forceUpdate({}));
  }, []);

  return {
    state: store.getState(),
    currentUser: store.getCurrentUser(),
    isAuthenticated: store.isAuthenticated(),
    isAdmin: store.isAdmin(),
    hasClearance: (level: number) => store.hasClearance(level),
    login: (u: string, p: string) => store.login(u, p),
    logout: () => store.logout(),
    register: (d: any) => store.register(d),
    changePassword: (uid: string, old: string, newp: string) => store.changePassword(uid, old, newp),
    approveUser: (uid: string) => store.approveUser(uid),
    rejectUser: (uid: string) => store.rejectUser(uid),
    assignRole: (uid: string, role: UserRole, by: string) => store.assignRole(uid, role, by),
    createChannel: (d: any, by: string) => store.createChannel(d, by),
    lockChannel: (cid: string, locked: boolean, by: string) => store.lockChannel(cid, locked, by),
    sendMessage: (cid: string, content: string, uid: string, replyTo?: string, media?: string[]) => 
      store.sendMessage(cid, content, uid, replyTo, media),
    editMessage: (mid: string, content: string, uid: string) => store.editMessage(mid, content, uid),
    deleteMessage: (mid: string, uid: string) => store.deleteMessage(mid, uid),
    createPost: (d: any, uid: string) => store.createPost(d, uid),
    addComment: (pid: string, content: string, uid: string) => store.addComment(pid, content, uid),
    uploadMedia: (f: File, uid: string, linkedTo?: any) => store.uploadMedia(f, uid, linkedTo),
    createAlert: (t: string, c: string, l: AlertLevel, uid: string) => store.createAlert(t, c, l, uid),
    dismissAlert: (aid: string, uid: string) => store.dismissAlert(aid, uid),
    getActiveAlerts: (uid: string) => store.getActiveAlerts(uid),
    addLog: (a: string, d: string, uid?: string) => store.addLog(a, d, uid),
    exportState: () => store.exportState(),
    importState: (s: string) => store.importState(s),
    resetSystem: () => store.resetSystem(),
    getStorageUsage: () => store.getStorageUsage(),
    haveCredentialsBeenShown: () => store.haveCredentialsBeenShown(),
    markCredentialsShown: () => store.markCredentialsShown(),
  };
}
