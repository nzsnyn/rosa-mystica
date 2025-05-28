"use client";

import AdminLayout from "@/components/layouts/AdminLayout";
import StorageStats from "@/components/admin/StorageStats";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalImages: 0,
    totalArticles: 0,
    totalContent: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [imagesRes, articlesRes, allRes] = await Promise.all([
        fetch("/api/content?type=IMAGE"),
        fetch("/api/content?type=ARTICLE"),
        fetch("/api/content"),
      ]);

      const images = await imagesRes.json();
      const articles = await articlesRes.json();
      const all = await allRes.json();

      setStats({
        totalImages: images.length,
        totalArticles: articles.length,
        totalContent: all.length,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Content Overview Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Content</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalContent}</dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/admin/content"
                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
              >
                Manage All Content →
              </Link>
            </div>
          </div>

          {/* Images Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Images</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalImages}</dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/admin/content?type=IMAGE"
                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
              >
                Manage Images →
              </Link>
            </div>
          </div>

          {/* Articles Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Articles</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalArticles}</dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/admin/content?type=ARTICLE"
                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
              >
                Manage Articles →
              </Link>
            </div>
          </div>
        </div>        {/* Storage Stats Widget */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Storage Overview</h2>
          <StorageStats />
        </div>
          {/* Storage Tools */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Storage Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Test Local Upload</h3>
              <p className="text-gray-600 mb-4">
                Test the local file upload functionality to ensure your storage system is working properly.
              </p>
              <Link
                href="/admin/content/create?type=IMAGE"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Test Upload
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Migrate ImageKit Images</h3>
              <p className="text-gray-600 mb-4">
                Migration functionality has been disabled since ImageKit integration has been removed.
              </p>
              <Link
                href="/admin/image-migration"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-100 cursor-not-allowed"
              >
                Migration Tool (Disabled)
              </Link>
            </div>
          </div>
        </div>{/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/admin/content/create?type=IMAGE"
              className="block bg-blue-600 hover:bg-blue-700 text-white text-center px-6 py-4 rounded-md font-medium transition-colors"
            >
              Upload New Image
            </Link>
            <Link
              href="/admin/content/create?type=ARTICLE"
              className="block bg-green-600 hover:bg-green-700 text-white text-center px-6 py-4 rounded-md font-medium transition-colors"
            >
              Create New Article
            </Link>
            <Link
              href="/admin/image-migration"
              className="block bg-purple-600 hover:bg-purple-700 text-white text-center px-6 py-4 rounded-md font-medium transition-colors"
            >
              Migrate Images
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
