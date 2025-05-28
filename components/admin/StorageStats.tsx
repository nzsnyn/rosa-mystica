'use client';

import React, { useState, useEffect } from 'react';

interface StorageStats {
  totalImages: number;
  totalSizeBytes: number;
  totalSizeMB: number;
}

export default function StorageStats() {
  const [stats, setStats] = useState<StorageStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/stats/storage');
        if (!response.ok) {
          throw new Error('Failed to fetch storage statistics');
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching storage stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-24 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Storage Statistics</h3>
        <div className="bg-red-50 p-3 rounded-md text-red-600">
          {error}
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Storage Statistics</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border rounded-md p-3 bg-blue-50">
          <div className="text-xl font-bold text-blue-700">{stats.totalImages}</div>
          <div className="text-sm text-blue-600">Total Images</div>
        </div>
        <div className="border rounded-md p-3 bg-green-50">
          <div className="text-xl font-bold text-green-700">{stats.totalSizeMB ? stats.totalSizeMB.toFixed(2) : '0.00'} MB</div>
          <div className="text-sm text-green-600">Total Storage</div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md mt-4">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <div>
            <p className="text-gray-800 font-medium">Local Storage</p>
            <p className="text-xs text-gray-500">All images are stored locally</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Images are stored in the application's public directory for simplicity and direct access.
        </p>
      </div>
    </div>
  );
}
