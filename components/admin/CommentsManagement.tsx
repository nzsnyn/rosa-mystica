'use client';

import React, { useState, useEffect } from 'react';

interface Comment {
  id: string;
  name: string;
  email?: string;
  message: string;
  adminReply?: string;
  repliedAt?: string;
  isApproved: boolean;
  createdAt: string;
  content: {
    id: string;
    title: string;
  };
}

const CommentsManagement: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'replied'>('all');
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [showReplyForm, setShowReplyForm] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/comments/admin');
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminAction = async (action: string, commentId: string, adminReply?: string) => {
    try {
      const response = await fetch('/api/comments/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          commentId,
          adminReply,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        fetchComments(); // Refresh the list
        
        // Reset reply form
        if (action === 'reply') {
          setReplyText(prev => ({ ...prev, [commentId]: '' }));
          setShowReplyForm(prev => ({ ...prev, [commentId]: false }));
        }
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to perform action');
      }
    } catch (error) {
      console.error('Error performing admin action:', error);
      alert('Failed to perform action');
    }
  };

  const filteredComments = comments.filter(comment => {
    switch (filter) {
      case 'pending':
        return !comment.isApproved;
      case 'approved':
        return comment.isApproved && !comment.adminReply;
      case 'replied':
        return comment.adminReply;
      default:
        return true;
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (comment: Comment) => {
    if (comment.adminReply) {
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Replied</span>;
    } else if (comment.isApproved) {
      return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Approved</span>;
    } else {
      return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Pending</span>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Comments Management</h2>
        </div>
        <div className="animate-pulse space-y-4">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold text-gray-900">Comments Management</h2>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All ({comments.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'pending'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Pending ({comments.filter(c => !c.isApproved).length})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'approved'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Approved ({comments.filter(c => c.isApproved && !c.adminReply).length})
          </button>
          <button
            onClick={() => setFilter('replied')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'replied'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Replied ({comments.filter(c => c.adminReply).length})
          </button>
        </div>
      </div>

      {filteredComments.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500 text-lg mb-2">No comments found</div>
          <p className="text-gray-400 text-sm">
            {filter === 'all' ? 'No comments yet' : `No ${filter} comments`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Comment Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-2 sm:space-y-0 mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-semibold text-gray-900">{comment.name}</h4>
                    {comment.email && (
                      <>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{comment.email}</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>{formatDate(comment.createdAt)}</span>
                    <span>•</span>
                    <span>Article: {comment.content.title}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(comment)}
                </div>
              </div>

              {/* Comment Message */}
              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed">{comment.message}</p>
              </div>

              {/* Admin Reply */}
              {comment.adminReply && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-semibold text-green-700">Admin Reply</span>
                    {comment.repliedAt && (
                      <>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{formatDate(comment.repliedAt)}</span>
                      </>
                    )}
                  </div>
                  <p className="text-gray-700">{comment.adminReply}</p>
                </div>
              )}

              {/* Reply Form */}
              {showReplyForm[comment.id] && (
                <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <textarea
                    value={replyText[comment.id] || ''}
                    onChange={(e) => setReplyText(prev => ({ ...prev, [comment.id]: e.target.value }))}
                    placeholder="Write your reply..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAdminAction('reply', comment.id, replyText[comment.id])}
                      disabled={!replyText[comment.id]?.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
                    >
                      Send Reply
                    </button>
                    <button
                      onClick={() => setShowReplyForm(prev => ({ ...prev, [comment.id]: false }))}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                {!comment.isApproved && (
                  <button
                    onClick={() => handleAdminAction('approve', comment.id)}
                    className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                  >
                    Approve
                  </button>
                )}
                
                {comment.isApproved && (
                  <button
                    onClick={() => handleAdminAction('unapprove', comment.id)}
                    className="px-3 py-1 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 text-sm"
                  >
                    Unapprove
                  </button>
                )}

                {!comment.adminReply && (
                  <button
                    onClick={() => setShowReplyForm(prev => ({ ...prev, [comment.id]: true }))}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                  >
                    Reply
                  </button>
                )}

                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this comment?')) {
                      handleAdminAction('delete', comment.id);
                    }
                  }}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsManagement;
