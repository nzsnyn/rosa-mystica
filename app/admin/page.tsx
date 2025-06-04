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
    totalDonations: 0,
    pendingDonations: 0,
    verifiedDonations: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [imagesRes, articlesRes, allRes, donationsRes] = await Promise.all([
        fetch("/api/content?type=IMAGE"),
        fetch("/api/content?type=ARTICLE"),
        fetch("/api/content"),
        fetch("/api/donations"),
      ]);

      const images = await imagesRes.json();
      const articles = await articlesRes.json();
      const all = await allRes.json();
      const donationsData = await donationsRes.json();

      const donations = donationsData.donations || [];
      const pendingCount = donations.filter((d: any) => d.status === 'PENDING').length;
      const verifiedCount = donations.filter((d: any) => d.status === 'VERIFIED').length;

      setStats({
        totalImages: images.length,
        totalArticles: articles.length,
        totalContent: all.length,
        totalDonations: donations.length,
        pendingDonations: pendingCount,
        verifiedDonations: verifiedCount,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Panel Utama</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Content Overview Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Konten
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalContent}
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/admin/content"
                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
              >
                Kelola Semua Konten →
              </Link>
            </div>
          </div>

          {/* Images Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Gambar
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalImages}
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/admin/content?type=IMAGE"
                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
              >
                Kelola Gambar →
              </Link>
            </div>
          </div>

          {/* Articles Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Artikel
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalArticles}
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/admin/content?type=ARTICLE"
                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
              >
                Kelola Artikel →
              </Link>
            </div>
          </div>

          {/* Donations Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Donasi
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalDonations}
                  </dd>
                </dl>
                <div className="mt-2 text-sm text-gray-600">
                  <span className="text-orange-600">Pending: {stats.pendingDonations}</span>
                  {" • "}
                  <span className="text-green-600">Verified: {stats.verifiedDonations}</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/admin/donations"
                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
              >
                Kelola Donasi →
              </Link>
            </div>
          </div>
        </div>{" "}
        {/* Storage Stats Widget */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Ringkasan Penyimpanan
          </h2>
          <StorageStats />
        </div>
        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/admin/content/create?type=IMAGE"
              className="block bg-blue-600 hover:bg-blue-700 text-white text-center px-6 py-4 rounded-md font-medium transition-colors"
            >
              Unggah Gambar Baru
            </Link>
            <Link
              href="/admin/content/create?type=ARTICLE"
              className="block bg-green-600 hover:bg-green-700 text-white text-center px-6 py-4 rounded-md font-medium transition-colors"
            >
              Buat Artikel Baru
            </Link>
            <Link
              href="/admin/image-migration"
              className="block bg-purple-600 hover:bg-purple-700 text-white text-center px-6 py-4 rounded-md font-medium transition-colors"
            >
              Migrasi Gambar
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
