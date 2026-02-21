/**
 * ============================================
 * RKAF SECURE COMMAND NETWORK - ADMIN PANEL
 * ============================================
 * System administration and debug panel
 */

import { useState } from 'react';
import { 
  Shield, Users, Radio, AlertTriangle, CheckCircle, X, 
  Download, Upload, RotateCcw, Database, Activity, Lock,
  ChevronRight, Search, UserPlus, Key,
  FileText, MessageSquare, Bell, Settings
} from 'lucide-react';
import { useRKAFStore, DEFAULT_ADMIN, EMERGENCY_ADMIN } from '@/store/RKAFStore';

import type { User, UserRole, AlertLevel } from '@/types';

export function AdminPage() {
  const { 
    state, 
    currentUser, 
    isAuthenticated, 
    isAdmin,
    approveUser,
    rejectUser,
    assignRole,
    createAlert,
    exportState,
    importState,
    resetSystem,
    getStorageUsage
  } = useRKAFStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'logs' | 'system'>('overview');
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [alertForm, setAlertForm] = useState({ title: '', content: '', level: 'notice' as AlertLevel });
  const [importData, setImportData] = useState('');
  const [showImport, setShowImport] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState<UserRole>('enlisted');

  // Access check
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="p-12 border border-[#EF4444]/30 bg-[#EF4444]/5 text-center">
            <Lock className="w-16 h-16 text-[#EF4444] mx-auto mb-6" />
            <h1 className="font-display text-3xl font-bold text-[#F4F6FA] mb-4">ACCESS DENIED</h1>
            <p className="text-[#A9B3C2]">Administration requires authentication.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="p-12 border border-[#EF4444]/30 bg-[#EF4444]/5 text-center">
            <AlertTriangle className="w-16 h-16 text-[#EF4444] mx-auto mb-6" />
            <h1 className="font-display text-3xl font-bold text-[#F4F6FA] mb-4">ADMIN ACCESS REQUIRED</h1>
            <p className="text-[#A9B3C2]">This area is restricted to administrators only.</p>
          </div>
        </div>
      </div>
    );
  }

  const storageUsage = getStorageUsage();
  const pendingUsers = state.users.filter(u => !u.isApproved);
  const onlineUsers = state.users.filter(u => u.isOnline);

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    createAlert(alertForm.title, alertForm.content, alertForm.level, currentUser.id);
    setAlertForm({ title: '', content: '', level: 'notice' });
    setShowCreateAlert(false);
  };

  const handleImport = () => {
    const result = importState(importData);
    if (result.success) {
      setShowImport(false);
      setImportData('');
      alert('State imported successfully');
    } else {
      alert('Import failed: ' + result.message);
    }
  };

  const handleExport = () => {
    const data = exportState();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RKAF_BACKUP_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredUsers = state.users.filter(u => {
    const name = (u.displayName || u.fullName || '').toLowerCase();
    return (
      name.includes(searchQuery.toLowerCase()) ||
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.serviceId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'logs', label: 'System Logs', icon: FileText },
    { id: 'system', label: 'System Tools', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1a] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-[#BFA15A]" />
            <span className="font-mono text-sm text-[#BFA15A] tracking-wider">ADMINISTRATION</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#F4F6FA] mb-4">
            ADMIN PANEL
          </h1>
          <div className="w-32 h-1 bg-[#BFA15A]" />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-[#BFA15A]/20 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wider uppercase transition-all ${
                activeTab === tab.id
                  ? 'bg-[#BFA15A] text-[#0a0f1a]'
                  : 'border border-[#BFA15A]/30 text-[#A9B3C2] hover:border-[#BFA15A]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Users', value: state.users.length, icon: Users },
                { label: 'Online Now', value: onlineUsers.length, icon: Activity, color: 'text-green-400' },
                { label: 'Pending Approval', value: pendingUsers.length, icon: UserPlus, color: 'text-yellow-400' },
                { label: 'Active Channels', value: state.channels.length, icon: Radio },
              ].map((stat, index) => (
                <div key={index} className="p-6 border border-[#BFA15A]/20 bg-[#111827]/30">
                  <stat.icon className="w-6 h-6 text-[#BFA15A] mb-3" />
                  <div className={`font-mono text-3xl font-bold ${stat.color || 'text-[#F4F6FA]'} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="font-mono text-xs text-[#6B7280]">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Storage & Messages */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-[#BFA15A]/20 bg-[#111827]/30">
                <h3 className="font-display text-lg font-bold text-[#F4F6FA] mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5 text-[#BFA15A]" />
                  Storage Usage
                </h3>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-sm text-[#6B7280]">Used</span>
                    <span className="font-mono text-sm text-[#BFA15A]">
                      {Math.round(storageUsage.used / 1024)} KB / {Math.round(storageUsage.total / 1024 / 1024)} MB
                    </span>
                  </div>
                  <div className="h-2 bg-[#1F2937] overflow-hidden">
                    <div 
                      className="h-full bg-[#BFA15A] transition-all"
                      style={{ width: `${Math.min(storageUsage.percentage, 100)}%` }}
                    />
                  </div>
                </div>
                <p className="font-mono text-xs text-[#6B7280]">
                  {storageUsage.percentage}% of available storage used
                </p>
              </div>

              <div className="p-6 border border-[#BFA15A]/20 bg-[#111827]/30">
                <h3 className="font-display text-lg font-bold text-[#F4F6FA] mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#BFA15A]" />
                  Communications
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-mono text-sm text-[#6B7280]">Total Messages</span>
                    <span className="font-mono text-sm text-[#BFA15A]">{state.messages.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-sm text-[#6B7280]">Bulletin Posts</span>
                    <span className="font-mono text-sm text-[#BFA15A]">{state.posts.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-sm text-[#6B7280]">Media Files</span>
                    <span className="font-mono text-sm text-[#BFA15A]">{state.media.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-6 border border-[#BFA15A]/30 bg-[#111827]/50">
              <h3 className="font-display text-lg font-bold text-[#F4F6FA] mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowCreateAlert(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#BFA15A] text-[#0a0f1a] font-mono text-xs tracking-wider uppercase font-bold hover:bg-[#d4b76a]"
                >
                  <Bell className="w-4 h-4" />
                  Create Alert
                </button>
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 border border-[#BFA15A]/50 text-[#BFA15A] font-mono text-xs tracking-wider uppercase hover:bg-[#BFA15A]/10"
                >
                  <Download className="w-4 h-4" />
                  Export State
                </button>
                <button
                  onClick={() => setShowImport(true)}
                  className="flex items-center gap-2 px-4 py-2 border border-[#BFA15A]/50 text-[#BFA15A] font-mono text-xs tracking-wider uppercase hover:bg-[#BFA15A]/10"
                >
                  <Upload className="w-4 h-4" />
                  Import State
                </button>
              </div>
            </div>

            {/* Default Credentials */}
            <div className="p-6 border border-yellow-500/30 bg-yellow-500/5">
              <h3 className="font-display text-lg font-bold text-[#F4F6FA] mb-4 flex items-center gap-2">
                <Key className="w-5 h-5 text-yellow-500" />
                Default Credentials
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#0a0f1a] border border-[#BFA15A]/20">
                  <p className="font-mono text-xs text-[#6B7280] mb-2">DEFAULT ADMIN</p>
                  <p className="font-mono text-sm text-[#F4F6FA]">Username: {DEFAULT_ADMIN.username}</p>
                  <p className="font-mono text-sm text-[#F4F6FA]">Password: {DEFAULT_ADMIN.password}</p>
                </div>
                <div className="p-4 bg-[#0a0f1a] border border-[#EF4444]/20">
                  <p className="font-mono text-xs text-[#6B7280] mb-2">EMERGENCY ACCESS</p>
                  <p className="font-mono text-sm text-[#F4F6FA]">Username: {EMERGENCY_ADMIN.username}</p>
                  <p className="font-mono text-sm text-[#F4F6FA]">Password: {EMERGENCY_ADMIN.password}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Pending Approvals */}
            {pendingUsers.length > 0 && (
              <div className="p-6 border border-yellow-500/30 bg-yellow-500/5">
                <h3 className="font-display text-lg font-bold text-[#F4F6FA] mb-4 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-yellow-500" />
                  Pending Approvals ({pendingUsers.length})
                </h3>
                <div className="space-y-2">
                  {pendingUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-[#0a0f1a] border border-[#BFA15A]/20">
                      <div>
                        <p className="font-mono text-sm text-[#F4F6FA]">{user.fullName}</p>
                        <p className="font-mono text-xs text-[#6B7280]">{user.username} | {user.serviceId}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => approveUser(user.id)}
                          className="p-2 bg-green-500/20 text-green-400 hover:bg-green-500/30"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => rejectUser(user.id)}
                          className="p-2 bg-[#EF4444]/20 text-[#EF4444] hover:bg-[#EF4444]/30"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* User List */}
            <div className="p-6 border border-[#BFA15A]/20 bg-[#111827]/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-bold text-[#F4F6FA]">All Users</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-[#0a0f1a] border border-[#BFA15A]/30 text-[#F4F6FA] font-mono text-sm focus:outline-none focus:border-[#BFA15A]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                {filteredUsers.map((user) => (
                  <div 
                    key={user.id} 
                    onClick={() => { setSelectedUser(user); setNewRole(user.role); }}
                    className="flex items-center justify-between p-4 bg-[#0a0f1a] border border-[#BFA15A]/10 hover:border-[#BFA15A]/30 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-[#4B5563]'}`} />
                      <div>
                        <p className="font-mono text-sm text-[#F4F6FA]">{user.displayName || user.fullName}</p>
                        <p className="font-mono text-xs text-[#6B7280]">{user.rank} | {user.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-2 py-1 font-mono text-xs ${
                        user.isApproved ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {user.isApproved ? 'APPROVED' : 'PENDING'}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#BFA15A]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Logs Tab */}
        {activeTab === 'logs' && (
          <div className="p-6 border border-[#BFA15A]/20 bg-[#111827]/30">
            <h3 className="font-display text-lg font-bold text-[#F4F6FA] mb-4">System Logs</h3>
            <div className="max-h-[600px] overflow-y-auto space-y-1 font-mono text-xs">
              {state.logs.slice(0, 100).map((log) => (
                <div key={log.id} className="flex items-start gap-4 p-2 hover:bg-[#BFA15A]/5">
                  <span className="text-[#6B7280] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString('en-GB')}
                  </span>
                  <span className="text-[#BFA15A] whitespace-nowrap">[{log.action}]</span>
                  <span className="text-[#A9B3C2]">{log.userName}: {log.details}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* System Tab */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="p-6 border border-[#BFA15A]/20 bg-[#111827]/30">
              <h3 className="font-display text-lg font-bold text-[#F4F6FA] mb-4">System Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#0a0f1a] border border-[#BFA15A]/10">
                  <p className="font-mono text-xs text-[#6B7280]">Version</p>
                  <p className="font-mono text-sm text-[#F4F6FA]">{state.version}</p>
                </div>
                <div className="p-4 bg-[#0a0f1a] border border-[#BFA15A]/10">
                  <p className="font-mono text-xs text-[#6B7280]">Last Updated</p>
                  <p className="font-mono text-sm text-[#F4F6FA]">
                    {new Date(state.lastUpdated).toLocaleString('en-GB')}
                  </p>
                </div>
                <div className="p-4 bg-[#0a0f1a] border border-[#BFA15A]/10">
                  <p className="font-mono text-xs text-[#6B7280]">System Initialized</p>
                  <p className="font-mono text-sm text-[#F4F6FA]">
                    {state.systemInitialized ? 'YES' : 'NO'}
                  </p>
                </div>
                <div className="p-4 bg-[#0a0f1a] border border-[#BFA15A]/10">
                  <p className="font-mono text-xs text-[#6B7280]">First Run</p>
                  <p className="font-mono text-sm text-[#F4F6FA]">{state.isFirstRun ? 'YES' : 'NO'}</p>
                </div>
              </div>
            </div>

            <div className="p-6 border border-red-500/30 bg-red-500/5">
              <h3 className="font-display text-lg font-bold text-[#F4F6FA] mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Danger Zone
              </h3>
              <p className="text-[#A9B3C2] mb-4">
                These actions cannot be undone. Use with extreme caution.
              </p>
              <button
                onClick={() => {
                  if (confirm('WARNING: This will reset ALL data. Are you sure?')) {
                    resetSystem();
                    window.location.reload();
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#EF4444] text-white font-mono text-xs tracking-wider uppercase font-bold hover:bg-red-600"
              >
                <RotateCcw className="w-4 h-4" />
                Reset System
              </button>
            </div>
          </div>
        )}

        {/* Create Alert Modal */}
        {showCreateAlert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0f1a]/95 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-[#111827] border border-[#BFA15A]/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-lg font-bold text-[#F4F6FA]">Create System Alert</h2>
                <button onClick={() => setShowCreateAlert(false)} className="p-2 text-[#6B7280] hover:text-[#F4F6FA]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateAlert} className="space-y-4">
                <div>
                  <label className="block font-mono text-xs text-[#6B7280] mb-2">ALERT LEVEL</label>
                  <select
                    value={alertForm.level}
                    onChange={(e) => setAlertForm({ ...alertForm, level: e.target.value as AlertLevel })}
                    className="w-full px-4 py-3 bg-[#0a0f1a] border border-[#BFA15A]/30 text-[#F4F6FA]"
                  >
                    <option value="notice">Notice</option>
                    <option value="elevated">Elevated Readiness</option>
                    <option value="high">High Alert</option>
                    <option value="lockdown">Strategic Lockdown</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#6B7280] mb-2">TITLE</label>
                  <input
                    type="text"
                    value={alertForm.title}
                    onChange={(e) => setAlertForm({ ...alertForm, title: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0a0f1a] border border-[#BFA15A]/30 text-[#F4F6FA]"
                    placeholder="Alert title"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#6B7280] mb-2">CONTENT</label>
                  <textarea
                    value={alertForm.content}
                    onChange={(e) => setAlertForm({ ...alertForm, content: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-[#0a0f1a] border border-[#BFA15A]/30 text-[#F4F6FA] resize-none"
                    placeholder="Alert content"
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateAlert(false)}
                    className="px-6 py-2 border border-[#BFA15A]/30 text-[#A9B3C2]"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2 bg-[#BFA15A] text-[#0a0f1a] font-bold">
                    Create Alert
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Import Modal */}
        {showImport && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0f1a]/95 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-[#111827] border border-[#BFA15A]/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-lg font-bold text-[#F4F6FA]">Import State</h2>
                <button onClick={() => setShowImport(false)} className="p-2 text-[#6B7280] hover:text-[#F4F6FA]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <textarea
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                rows={10}
                className="w-full px-4 py-3 bg-[#0a0f1a] border border-[#BFA15A]/30 text-[#F4F6FA] font-mono text-xs resize-none"
                placeholder="Paste JSON state data here..."
              />

              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => setShowImport(false)}
                  className="px-6 py-2 border border-[#BFA15A]/30 text-[#A9B3C2]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  className="px-6 py-2 bg-[#BFA15A] text-[#0a0f1a] font-bold"
                >
                  Import
                </button>
              </div>
            </div>
          </div>
        )}

        {/* User Detail Modal */}
        {selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0f1a]/95 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-[#111827] border border-[#BFA15A]/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-lg font-bold text-[#F4F6FA]">User Details</h2>
                <button onClick={() => setSelectedUser(null)} className="p-2 text-[#6B7280] hover:text-[#F4F6FA]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-[#0a0f1a] border border-[#BFA15A]/10">
                  <p className="font-mono text-xs text-[#6B7280]">NAME</p>
                  <p className="font-mono text-sm text-[#F4F6FA]">{selectedUser.fullName}</p>
                </div>
                <div className="p-4 bg-[#0a0f1a] border border-[#BFA15A]/10">
                  <p className="font-mono text-xs text-[#6B7280]">USERNAME</p>
                  <p className="font-mono text-sm text-[#F4F6FA]">{selectedUser.username}</p>
                </div>
                <div className="p-4 bg-[#0a0f1a] border border-[#BFA15A]/10">
                  <p className="font-mono text-xs text-[#6B7280]">SERVICE ID</p>
                  <p className="font-mono text-sm text-[#F4F6FA]">{selectedUser.serviceId}</p>
                </div>
                <div className="p-4 bg-[#0a0f1a] border border-[#BFA15A]/10">
                  <p className="font-mono text-xs text-[#6B7280]">CURRENT ROLE</p>
                  <p className="font-mono text-sm text-[#BFA15A]">{selectedUser.role.toUpperCase()}</p>
                </div>
              </div>

              {currentUser && selectedUser.id !== currentUser.id && (
                <div className="border-t border-[#BFA15A]/20 pt-4">
                  <label className="block font-mono text-xs text-[#6B7280] mb-2">ASSIGN NEW ROLE</label>
                  <div className="flex gap-2">
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value as UserRole)}
                      className="flex-1 px-4 py-2 bg-[#0a0f1a] border border-[#BFA15A]/30 text-[#F4F6FA]"
                    >
                      <option value="admin">Admin</option>
                      <option value="moderator">Moderator</option>
                      <option value="officer">Officer</option>
                      <option value="enlisted">Enlisted</option>
                      <option value="pending">Pending</option>
                    </select>
                    <button
                      onClick={() => {
                        if (currentUser) {
                          assignRole(selectedUser.id, newRole, currentUser.id);
                          setSelectedUser(null);
                        }
                      }}
                      className="px-4 py-2 bg-[#BFA15A] text-[#0a0f1a] font-bold"
                    >
                      Assign
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
