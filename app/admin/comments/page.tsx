'use client';

import AdminLayout from '@/components/layouts/AdminLayout';
import CommentsManagement from '@/components/admin/CommentsManagement';

const AdminCommentsPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Comments Management</h1>
          <p className="mt-2 text-gray-600">
            Manage user comments on articles - approve, reply, or delete comments.
          </p>
        </div>
        
        <CommentsManagement />
      </div>
    </AdminLayout>
  );
};

export default AdminCommentsPage;
