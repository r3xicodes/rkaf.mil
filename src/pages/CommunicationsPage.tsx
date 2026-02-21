/**
 * ============================================
 * RKAF SECURE COMMAND NETWORK - COMMUNICATIONS
 * ============================================
 * Secure messaging and chat system
 */

import { useState, useRef, useEffect } from 'react';
import { Radio, Send, Lock, Hash, Users, Paperclip, Edit2, Trash2, X, MessageSquare } from 'lucide-react';
import { useRKAFStore } from '@/store/RKAFStore';
import type { Channel, Message } from '@/types';

export function CommunicationsPage() {
  const { 
    state, 
    currentUser, 
    isAuthenticated, 

    sendMessage,
    editMessage,
    deleteMessage,
    createChannel,
    lockChannel
  } = useRKAFStore();
  
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [showNewChannel, setShowNewChannel] = useState(false);
  const [newChannel, setNewChannel] = useState({ name: '', description: '', category: 'General' });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages, selectedChannel]);

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
              Secure Communications requires authentication. Please log in with your RKAF credentials.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const canAccessChannel = (channel: Channel) => {
    if (!currentUser) return false;
    if (channel.allowedRoles.includes(currentUser.role)) return true;
    if (currentUser.clearanceLevel >= channel.clearanceRequired) return true;
    return false;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChannel || !currentUser || !messageInput.trim()) return;

    if (editingMessage) {
      editMessage(editingMessage.id, messageInput, currentUser.id);
      setEditingMessage(null);
    } else {
      sendMessage(selectedChannel.id, messageInput, currentUser.id);
    }
    setMessageInput('');
  };

  const handleCreateChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !newChannel.name.trim()) return;

    createChannel({
      name: newChannel.name.toLowerCase().replace(/\s+/g, '-'),
      description: newChannel.description,
      category: newChannel.category,
      isRestricted: false,
      allowedRoles: ['admin', 'moderator', 'officer', 'enlisted'],
      clearanceRequired: 1,
      isLocked: false,
    }, currentUser.id);

    setNewChannel({ name: '', description: '', category: 'General' });
    setShowNewChannel(false);
  };

  const channelMessages = selectedChannel 
    ? state.messages.filter(m => m.channelId === selectedChannel.id)
    : [];

  const canEditMessage = (msg: Message) => {
    if (!currentUser) return false;
    if (msg.userId === currentUser.id) return true;
    if (currentUser.role === 'admin' || currentUser.role === 'moderator') return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] pt-16 pb-0">
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Channel List */}
        <div className="w-64 border-r border-[#BFA15A]/20 bg-[#111827]/50 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-[#BFA15A]/20">
            <div className="flex items-center gap-2 mb-2">
              <Radio className="w-5 h-5 text-[#BFA15A]" />
              <span className="font-mono text-xs text-[#BFA15A] tracking-wider">CHANNELS</span>
            </div>
            {currentUser?.role === 'admin' && (
              <button
                onClick={() => setShowNewChannel(true)}
                className="w-full py-2 border border-[#BFA15A]/30 text-[#BFA15A] font-mono text-xs hover:bg-[#BFA15A]/10 transition-colors"
              >
                + New Channel
              </button>
            )}
          </div>

          {/* Channels */}
          <div className="flex-1 overflow-y-auto p-2">
            {state.channels.map((channel) => {
              const hasAccess = canAccessChannel(channel);
              const messageCount = state.messages.filter(m => m.channelId === channel.id).length;
              
              return (
                <button
                  key={channel.id}
                  onClick={() => hasAccess && setSelectedChannel(channel)}
                  disabled={!hasAccess}
                  className={`w-full text-left p-3 mb-1 transition-all ${
                    selectedChannel?.id === channel.id
                      ? 'bg-[#BFA15A]/20 border-l-2 border-[#BFA15A]'
                      : hasAccess
                        ? 'hover:bg-[#BFA15A]/10 border-l-2 border-transparent'
                        : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-[#6B7280]" />
                    <span className={`font-mono text-sm ${
                      selectedChannel?.id === channel.id ? 'text-[#BFA15A]' : 'text-[#A9B3C2]'
                    }`}>
                      {channel.name}
                    </span>
                    {channel.isLocked && <Lock className="w-3 h-3 text-[#EF4444]" />}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono text-xs text-[#6B7280]">{channel.category}</span>
                    <span className="font-mono text-xs text-[#BFA15A]">{messageCount}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* User info */}
          <div className="p-4 border-t border-[#BFA15A]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[#BFA15A]/30 flex items-center justify-center">
                <span className="font-mono text-xs text-[#BFA15A]">{currentUser?.rank?.charAt(0)}</span>
              </div>
              <div>
                <p className="font-mono text-sm text-[#F4F6FA]">{currentUser?.fullName}</p>
                <p className="font-mono text-xs text-[#6B7280]">{currentUser?.rank}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 flex flex-col">
          {selectedChannel ? (
            <>
              {/* Channel Header */}
              <div className="p-4 border-b border-[#BFA15A]/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Hash className="w-5 h-5 text-[#BFA15A]" />
                  <div>
                    <h2 className="font-display text-lg font-bold text-[#F4F6FA]">
                      {selectedChannel.name}
                    </h2>
                    <p className="font-mono text-xs text-[#6B7280]">{selectedChannel.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#6B7280]" />
                    <span className="font-mono text-xs text-[#6B7280]">
                      {state.users.filter(u => u.isOnline).length} online
                    </span>
                  </div>
                  {currentUser?.role === 'admin' && (
                    <button
                      onClick={() => lockChannel(selectedChannel.id, !selectedChannel.isLocked, currentUser.id)}
                      className="p-2 text-[#6B7280] hover:text-[#BFA15A]"
                      title={selectedChannel.isLocked ? 'Unlock channel' : 'Lock channel'}
                    >
                      <Lock className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {channelMessages.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-[#4B5563] mx-auto mb-4" />
                    <p className="font-mono text-sm text-[#6B7280]">No messages yet</p>
                    <p className="font-mono text-xs text-[#4B5563]">Be the first to send a message</p>
                  </div>
                ) : (
                  channelMessages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex gap-4 ${msg.userId === currentUser?.id ? 'flex-row-reverse' : ''}`}
                    >
                      <div className="w-10 h-10 border border-[#BFA15A]/30 flex items-center justify-center flex-shrink-0">
                        <span className="font-mono text-xs text-[#BFA15A]">{msg.userRank?.charAt(0)}</span>
                      </div>
                      <div className={`flex-1 max-w-[70%] ${msg.userId === currentUser?.id ? 'text-right' : ''}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm text-[#BFA15A]">{msg.userName}</span>
                          <span className="font-mono text-xs text-[#6B7280]">
                            {new Date(msg.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {msg.isEdited && <span className="font-mono text-xs text-[#4B5563]">(edited)</span>}
                        </div>
                        <div className={`inline-block p-3 border ${
                          msg.userId === currentUser?.id 
                            ? 'border-[#BFA15A]/30 bg-[#BFA15A]/10' 
                            : 'border-[#BFA15A]/20 bg-[#111827]/50'
                        }`}>
                          <p className="text-[#A9B3C2] text-sm text-left">{msg.content}</p>
                        </div>
                        {canEditMessage(msg) && (
                          <div className="flex gap-2 mt-1 justify-end">
                            <button
                              onClick={() => {
                                setEditingMessage(msg);
                                setMessageInput(msg.content);
                              }}
                              className="p-1 text-[#6B7280] hover:text-[#BFA15A]"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => currentUser && deleteMessage(msg.id, currentUser.id)}
                              className="p-1 text-[#6B7280] hover:text-[#EF4444]"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-[#BFA15A]/20">
                {selectedChannel.isLocked && currentUser?.role !== 'admin' && currentUser?.role !== 'moderator' ? (
                  <div className="p-4 bg-[#EF4444]/10 border border-[#EF4444]/30 text-center">
                    <Lock className="w-5 h-5 text-[#EF4444] mx-auto mb-2" />
                    <p className="font-mono text-sm text-[#EF4444]">This channel is locked</p>
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    {editingMessage && (
                      <div className="absolute -top-8 left-4 right-4 flex items-center gap-2 p-2 bg-[#BFA15A]/10 border border-[#BFA15A]/30">
                        <span className="font-mono text-xs text-[#BFA15A]">Editing message</span>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingMessage(null);
                            setMessageInput('');
                          }}
                          className="ml-auto"
                        >
                          <X className="w-4 h-4 text-[#6B7280]" />
                        </button>
                      </div>
                    )}
                    <button
                      type="button"
                      className="p-3 border border-[#BFA15A]/30 text-[#BFA15A] hover:bg-[#BFA15A]/10"
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder={`Message #${selectedChannel.name}`}
                      className="flex-1 px-4 py-3 bg-[#0a0f1a] border border-[#BFA15A]/30 text-[#F4F6FA] focus:outline-none focus:border-[#BFA15A]"
                    />
                    <button
                      type="submit"
                      disabled={!messageInput.trim()}
                      className="p-3 bg-[#BFA15A] text-[#0a0f1a] disabled:opacity-50"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Radio className="w-16 h-16 text-[#4B5563] mx-auto mb-4" />
                <p className="font-display text-xl text-[#6B7280] mb-2">Select a channel</p>
                <p className="font-mono text-sm text-[#4B5563]">Choose a channel to start communicating</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Channel Modal */}
      {showNewChannel && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0f1a]/95 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#111827] border border-[#BFA15A]/30 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-bold text-[#F4F6FA]">Create Channel</h2>
              <button
                onClick={() => setShowNewChannel(false)}
                className="p-2 text-[#6B7280] hover:text-[#F4F6FA]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateChannel} className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-[#6B7280] mb-2">CHANNEL NAME</label>
                <input
                  type="text"
                  value={newChannel.name}
                  onChange={(e) => setNewChannel({ ...newChannel, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0a0f1a] border border-[#BFA15A]/30 text-[#F4F6FA] focus:outline-none focus:border-[#BFA15A]"
                  placeholder="e.g., Squadron Ops"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-[#6B7280] mb-2">DESCRIPTION</label>
                <input
                  type="text"
                  value={newChannel.description}
                  onChange={(e) => setNewChannel({ ...newChannel, description: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0a0f1a] border border-[#BFA15A]/30 text-[#F4F6FA] focus:outline-none focus:border-[#BFA15A]"
                  placeholder="Channel purpose"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-[#6B7280] mb-2">CATEGORY</label>
                <select
                  value={newChannel.category}
                  onChange={(e) => setNewChannel({ ...newChannel, category: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0a0f1a] border border-[#BFA15A]/30 text-[#F4F6FA] focus:outline-none focus:border-[#BFA15A]"
                >
                  <option>General</option>
                  <option>Command</option>
                  <option>Operations</option>
                  <option>Training</option>
                  <option>Intelligence</option>
                </select>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewChannel(false)}
                  className="px-6 py-2 border border-[#BFA15A]/30 text-[#A9B3C2] font-mono text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#BFA15A] text-[#0a0f1a] font-mono text-sm font-bold"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
