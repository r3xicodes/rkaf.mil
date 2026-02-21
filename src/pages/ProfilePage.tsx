// @ts-nocheck
/// <reference types="react" />
import React, { useState, useEffect } from 'react';
import { useRKAFStore } from '@/store/RKAFStore';

export function ProfilePage() {
  const { currentUser, changePassword, updateDisplayName, updateEmail, acceptTerms } = useRKAFStore();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [rank, setRank] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [pw, setPw] = useState({ old: '', new: '', confirm: '' });
  const [needTerms, setNeedTerms] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
      setRank(currentUser.rank);
      setDisplayName(currentUser.displayName || '');
      setEmail(currentUser.email);
      setNeedTerms(!currentUser.acceptedTerms);
    }
  }, [currentUser]);

  const handleSave = () => {
    if (!currentUser) return;
    setMessage('');
    if (displayName !== (currentUser.displayName || '')) {
      const r = updateDisplayName(currentUser.id, displayName);
      if (!r.success) { setMessage(r.message); return; }
    }
    if (email !== currentUser.email) {
      const r = updateEmail(currentUser.id, email);
      if (!r.success) { setMessage(r.message); return; }
    }
    setMessage('Profile updated');
  };

  const handleChangePassword = () => {
    if (!currentUser) return;
    if (pw.new !== pw.confirm) { setMessage('New passwords do not match'); return; }
    const r = changePassword(currentUser.id, pw.old, pw.new);
    setMessage(r.message);
  };

  const handleAcceptTerms = () => {
    if (!currentUser) return;
    const r = acceptTerms(currentUser.id);
    if (r.success) setNeedTerms(false);
  };

  if (!currentUser) {
    return <div className="min-h-screen flex items-center justify-center">Not logged in.</div>;
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 lg:px-8">
      <h1 className="text-2xl font-display mb-6">User Profile</h1>
      {needTerms && (
        <div className="mb-4 p-4 bg-red-900 border border-red-600">
          <p className="font-mono text-sm">You must agree to the Privacy Policy and Terms of Service before using the system.</p>
          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={!needTerms ? true : false}
              onChange={e => { if (e.target.checked) handleAcceptTerms(); }}
            />
            <span className="font-mono text-sm">I agree to the Privacy Policy and Terms of Service</span>
          </label>
        </div>
      )}
      <div className="space-y-4 max-w-md">
        <div>
          <label className="block font-mono text-xs mb-1">Username</label>
          <input value={username} disabled className="w-full p-2 bg-[#111] border border-[#444] text-[#c0c0c0]" />
        </div>
        <div>
          <label className="block font-mono text-xs mb-1">Display Name</label>
          <input
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            className="w-full p-2 bg-[#111] border border-[#444] text-[#c0c0c0]"
          />
        </div>
        <div>
          <label className="block font-mono text-xs mb-1">Rank</label>
          <input value={rank} disabled className="w-full p-2 bg-[#111] border border-[#444] text-[#c0c0c0]" />
        </div>
        <div>
          <label className="block font-mono text-xs mb-1">Email</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={currentUser.role !== 'admin'}
            className="w-full p-2 bg-[#111] border border-[#444] text-[#c0c0c0]"
          />
        </div>
        <div className="pt-4 border-t border-[#444] space-y-2">
          <label className="block font-mono text-xs">Change Password</label>
          <input
            type="password"
            placeholder="Current password"
            value={pw.old}
            onChange={e => setPw({ ...pw, old: e.target.value })}
            className="w-full p-2 bg-[#111] border border-[#444] text-[#c0c0c0]"
          />
          <input
            type="password"
            placeholder="New password"
            value={pw.new}
            onChange={e => setPw({ ...pw, new: e.target.value })}
            className="w-full p-2 bg-[#111] border border-[#444] text-[#c0c0c0]"
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={pw.confirm}
            onChange={e => setPw({ ...pw, confirm: e.target.value })}
            className="w-full p-2 bg-[#111] border border-[#444] text-[#c0c0c0]"
          />
        </div>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-[#BFA15A] text-[#0a0f1a] font-mono text-xs"
        >Save Changes</button>
        <button
          onClick={handleChangePassword}
          className="px-4 py-2 bg-[#6B7280] text-[#F4F6FA] font-mono text-xs"
        >Update Password</button>
        {message && <p className="font-mono text-xs text-[#F4F6FA] mt-2">{message}</p>}
      </div>
    </div>
  );
}
