/**
 * ============================================
 * RKAF SECURE COMMAND NETWORK - BULLETIN BOARD
 * ============================================
 * Command announcements and discussions
 */

import { useState } from 'react';
import { Pin, MessageSquare, Lock, Plus, X, Send, User, AlertTriangle } from 'lucide-react';
import { useRKAFStore } from '@/store/RKAFStore';
import type { Post } from '@/types';

export function BulletinBoardPage() {
  const { state, currentUser, isAuthenticated, createPost, addComment } = useRKAFStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

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
              The Bulletin Board requires authentication. Please log in with your RKAF credentials.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const canCreatePost = currentUser?.role === 'admin' || currentUser?.role === 'moderator';

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newPost.title.trim() || !newPost.content.trim()) {
      setError('Title and content are required');
      return;
    }

    if (!currentUser) return;

    createPost({
      title: newPost.title,
      content: newPost.content,
      mediaUrls: [],
      isPinned: false,
    }, currentUser.id);

    setNewPost({ title: '', content: '' });
    setShowCreateModal(false);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost || !currentUser || !newComment.trim()) return;

    addComment(selectedPost.id, newComment, currentUser.id);
    setNewComment('');
    // Refresh selected post
    const updated = state.posts.find(p => p.id === selectedPost.id);
    if (updated) setSelectedPost(updated);
  };

  const pinnedPosts = state.posts.filter(p => p.isPinned);
  const regularPosts = state.posts.filter(p => !p.isPinned);

  return (
    <div className="min-h-screen bg-[#0a0f1a] pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Pin className="w-8 h-8 text-[#BFA15A]" />
            <span className="font-mono text-sm text-[#BFA15A] tracking-wider">COMMAND BULLETIN</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-[#F4F6FA] mb-4">
                BULLETIN BOARD
              </h1>
              <div className="w-32 h-1 bg-[#BFA15A]" />
            </div>
            {canCreatePost && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#BFA15A] text-[#0a0f1a] font-mono text-xs tracking-wider uppercase font-bold hover:bg-[#d4b76a] transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Post
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 border border-[#BFA15A]/20 bg-[#111827]/30">
            <div className="font-mono text-2xl font-bold text-[#BFA15A]">{state.posts.length}</div>
            <div className="font-mono text-xs text-[#6B7280]">Total Posts</div>
          </div>
          <div className="p-4 border border-[#BFA15A]/20 bg-[#111827]/30">
            <div className="font-mono text-2xl font-bold text-[#BFA15A]">{pinnedPosts.length}</div>
            <div className="font-mono text-xs text-[#6B7280]">Pinned</div>
          </div>
          <div className="p-4 border border-[#BFA15A]/20 bg-[#111827]/30">
            <div className="font-mono text-2xl font-bold text-[#BFA15A]">
              {state.posts.reduce((acc, p) => acc + p.comments.length, 0)}
            </div>
            <div className="font-mono text-xs text-[#6B7280]">Comments</div>
          </div>
        </div>

        {/* Pinned Posts */}
        {pinnedPosts.length > 0 && (
          <div className="mb-8">
            <h2 className="font-mono text-xs text-[#BFA15A] tracking-wider mb-4 flex items-center gap-2">
              <Pin className="w-4 h-4" />
              PINNED ANNOUNCEMENTS
            </h2>
            <div className="space-y-4">
              {pinnedPosts.map((post) => (
                <div 
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="p-6 border-2 border-[#BFA15A]/50 bg-[#111827]/50 cursor-pointer hover:border-[#BFA15A] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 border border-[#BFA15A] flex items-center justify-center flex-shrink-0">
                      <Pin className="w-6 h-6 text-[#BFA15A]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-bold text-[#F4F6FA] mb-2">
                        {post.title}
                      </h3>
                      <p className="text-[#A9B3C2] text-sm line-clamp-2 mb-3">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-[#6B7280]" />
                          <span className="font-mono text-xs text-[#6B7280]">{post.author}</span>
                        </div>
                        <span className="font-mono text-xs text-[#6B7280]">
                          {new Date(post.timestamp).toLocaleDateString('en-GB')}
                        </span>
                        <span className="font-mono text-xs text-[#BFA15A]">
                          {post.comments.length} comments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        <div>
          <h2 className="font-mono text-xs text-[#6B7280] tracking-wider mb-4">
            RECENT POSTS
          </h2>
          <div className="space-y-4">
            {regularPosts.map((post) => (
              <div 
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="p-6 border border-[#BFA15A]/20 bg-[#111827]/30 cursor-pointer hover:border-[#BFA15A]/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-[#BFA15A]/30 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-[#BFA15A]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold text-[#F4F6FA] mb-2">
                      {post.title}
                    </h3>
                    <p className="text-[#A9B3C2] text-sm line-clamp-2 mb-3">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#6B7280]" />
                        <span className="font-mono text-xs text-[#6B7280]">{post.author}</span>
                      </div>
                      <span className="font-mono text-xs text-[#6B7280]">
                        {new Date(post.timestamp).toLocaleDateString('en-GB')}
                      </span>
                      <span className="font-mono text-xs text-[#BFA15A]">
                        {post.comments.length} comments
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {state.posts.length === 0 && (
          <div className="text-center py-16 border border-[#BFA15A]/20 bg-[#111827]/30">
            <AlertTriangle className="w-12 h-12 text-[#6B7280] mx-auto mb-4" />
            <p className="font-mono text-sm text-[#6B7280]">No posts available</p>
          </div>
        )}

        {/* Create Post Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0f1a]/95 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl bg-[#111827] border border-[#BFA15A]/30">
              <div className="p-6 border-b border-[#BFA15A]/20">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-bold text-[#F4F6FA]">New Announcement</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="p-2 text-[#6B7280] hover:text-[#F4F6FA]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleCreatePost} className="p-6 space-y-4">
                {error && (
                  <div className="p-3 bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] font-mono text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block font-mono text-xs text-[#6B7280] mb-2">TITLE</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0a0f1a] border border-[#BFA15A]/30 text-[#F4F6FA] focus:outline-none focus:border-[#BFA15A]"
                    placeholder="Enter post title"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#6B7280] mb-2">CONTENT</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 bg-[#0a0f1a] border border-[#BFA15A]/30 text-[#F4F6FA] focus:outline-none focus:border-[#BFA15A] resize-none"
                    placeholder="Enter post content"
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-3 border border-[#BFA15A]/30 text-[#A9B3C2] font-mono text-sm tracking-wider uppercase hover:border-[#BFA15A] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#BFA15A] text-[#0a0f1a] font-mono text-sm tracking-wider uppercase font-bold hover:bg-[#d4b76a] transition-colors"
                  >
                    Post Announcement
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Post Detail Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0f1a]/95 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-auto bg-[#111827] border border-[#BFA15A]/30">
              {/* Header */}
              <div className="p-6 border-b border-[#BFA15A]/20">
                <div className="flex items-start justify-between">
                  <div>
                    {selectedPost.isPinned && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#BFA15A]/20 text-[#BFA15A] font-mono text-xs mb-2">
                        <Pin className="w-3 h-3" />
                        PINNED
                      </span>
                    )}
                    <h2 className="font-display text-2xl font-bold text-[#F4F6FA]">
                      {selectedPost.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="p-2 text-[#6B7280] hover:text-[#F4F6FA]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#6B7280]" />
                    <span className="font-mono text-sm text-[#A9B3C2]">{selectedPost.author}</span>
                    <span className="font-mono text-xs text-[#6B7280]">({selectedPost.authorRank})</span>
                  </div>
                  <span className="font-mono text-xs text-[#6B7280]">
                    {new Date(selectedPost.timestamp).toLocaleString('en-GB')}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-[#A9B3C2] whitespace-pre-wrap">{selectedPost.content}</p>
              </div>

              {/* Comments */}
              <div className="p-6 border-t border-[#BFA15A]/20">
                <h3 className="font-mono text-sm text-[#BFA15A] mb-4">
                  COMMENTS ({selectedPost.comments.length})
                </h3>

                {/* Comment list */}
                <div className="space-y-4 mb-6">
                  {selectedPost.comments.map((comment) => (
                    <div key={comment.id} className="p-4 bg-[#0a0f1a] border border-[#BFA15A]/10">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-[#6B7280]" />
                        <span className="font-mono text-sm text-[#F4F6FA]">{comment.author}</span>
                        <span className="font-mono text-xs text-[#6B7280]">({comment.authorRank})</span>
                      </div>
                      <p className="text-[#A9B3C2] text-sm">{comment.content}</p>
                      <span className="font-mono text-xs text-[#6B7280] mt-2 block">
                        {new Date(comment.timestamp).toLocaleString('en-GB')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Add comment */}
                <form onSubmit={handleAddComment} className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-3 bg-[#0a0f1a] border border-[#BFA15A]/30 text-[#F4F6FA] focus:outline-none focus:border-[#BFA15A]"
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="px-4 py-3 bg-[#BFA15A] text-[#0a0f1a] disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
