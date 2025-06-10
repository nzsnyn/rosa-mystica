'use client';

import React, { useState, useEffect } from 'react';

interface Comment {
  id: string;
  name: string;
  message: string;
  adminReply?: string;
  repliedAt?: string;
  createdAt: string;
}

interface CommentsListProps {
  contentId: string;
  refreshTrigger: number;
}

const CommentsList: React.FC<CommentsListProps> = ({ contentId, refreshTrigger }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [contentId, refreshTrigger]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/comments?contentId=${contentId}`);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div className="h-4 bg-gray-300 rounded w-24"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 text-lg mb-2">Belum ada komentar</div>
        <p className="text-gray-400 text-sm">Jadilah yang pertama berkomentar pada artikel ini</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Komentar ({comments.length})
      </h3>
      
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* User Comment */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {comment.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="text-sm font-semibold text-gray-900">{comment.name}</h4>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{comment.message}</p>
            </div>
          </div>

          {/* Admin Reply */}
          {comment.adminReply && (
            <div className="mt-4 ml-13 pl-4 border-l-2 border-blue-200 bg-blue-50 rounded-r-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                    A
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className="text-sm font-semibold text-green-700">Admin</h5>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">
                      {comment.repliedAt ? formatDate(comment.repliedAt) : ''}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{comment.adminReply}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
