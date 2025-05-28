'use client';

import { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { migrateImageKitToLocal, migrateAllImagesToLocal } from '@/lib/image-migration';
import ErrorBoundaryImage from '@/components/ErrorBoundaryImage';

export default function ImageMigrationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMigrating, setIsMigrating] = useState<Record<string, boolean>>({});
  const [migrationResults, setMigrationResults] = useState<Record<string, any>>({});

  const runMigration = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const migrationResults = await migrateAllImagesToLocal();
      setResults(migrationResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error migrating images:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMigrateSingle = async (contentId: string) => {
    setIsMigrating(prev => ({ ...prev, [contentId]: true }));
    
    try {
      const result = await migrateImageKitToLocal(contentId);
      setMigrationResults(prev => ({ ...prev, [contentId]: result }));
    } catch (err) {
      setMigrationResults(prev => ({ 
        ...prev, 
        [contentId]: { 
          success: false, 
          message: err instanceof Error ? err.message : 'An error occurred' 
        } 
      }));
    } finally {
      setIsMigrating(prev => ({ ...prev, [contentId]: false }));
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">ImageKit to Local Storage Migration</h1>
        
        <div className="mb-6">
          <p className="mb-4">
            This tool helps you migrate images from ImageKit to local storage. It will download each image
            from ImageKit and save it to the local filesystem, then update the database record.
          </p>
          
          <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mb-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Warning</h3>
                <div className="mt-1 text-sm text-yellow-700">
                  <p>
                    This migration will download all images from ImageKit and save them locally. This process may take some time
                    depending on the number and size of images. Make sure you have enough disk space available.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={runMigration}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            {isLoading ? 'Migrating...' : 'Migrate All Images'}
          </button>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}
        
        {results && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Results Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-2xl font-bold">{results.summary.total}</div>
                <div className="text-sm text-gray-500">Total Images</div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-md">
                <div className="text-2xl font-bold text-green-600">{results.summary.success}</div>
                <div className="text-sm text-gray-500">Successfully Migrated</div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-md">
                <div className="text-2xl font-bold text-red-600">{results.summary.failure}</div>
                <div className="text-sm text-gray-500">Failed Migrations</div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md">
                <div className="text-2xl font-bold">{results.summary.successPercentage}%</div>
                <div className="text-sm text-gray-500">Success Rate</div>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mb-4">Detailed Results</h2>
            <div className="bg-white rounded-md shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.results.map((result: any) => (
                    <tr key={result.id} className={result.success ? '' : 'bg-red-50'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{result.title}</div>
                        <div className="text-xs text-gray-500 mt-1">ID: {result.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {result.success ? 'Success' : 'Failed'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{result.message}</div>
                        {result.success && (
                          <div className="text-xs text-gray-500 mt-1">
                            <div>Old path: {result.originalPath}</div>
                            <div>New path: {result.newPath}</div>
                            <div>Size: {(result.size / 1024).toFixed(2)} KB</div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
