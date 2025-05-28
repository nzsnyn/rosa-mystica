'use client';

import React, { useState, useRef } from 'react';
import ErrorBoundaryImage from './ErrorBoundaryImage';

interface LocalImageUploaderProps {
  onUploadComplete?: (contentId: string, path: string, filename: string) => void;
  className?: string;
}

const LocalImageUploader: React.FC<LocalImageUploaderProps> = ({ 
  onUploadComplete,
  className = '' 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (1MB = 1024 * 1024 bytes)
    const maxSize = 1 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(`File size must be less than 1MB. Selected file is ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      e.target.value = '';
      return;
    }

    setSelectedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Handle upload
  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setProgress(0);
    setError(null);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('title', selectedFile.name);
      formData.append('description', `Uploaded image: ${selectedFile.name}`);

      // Simulate progress (since we don't have real progress tracking for fetch)
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 5;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 100);

      // Upload to server
      const response = await fetch('/api/content', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      const data = await response.json();
      
      // Reset form
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      // Notify parent component
      onUploadComplete?.(data.id, data.path, data.filename);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Upload failed'));
      console.error('Upload failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <h3 className="text-lg font-medium mb-4">Upload Image</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Image (Max 1MB)
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
      
      {previewUrl && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Preview:</p>
          <div className="relative w-full h-48 bg-gray-100 rounded overflow-hidden">
            <ErrorBoundaryImage 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-full object-contain"
              fallbackSrc="/placeholders/image-unavailable.svg"
            />
          </div>
        </div>
      )}
      
      {isLoading && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">Uploading: {progress}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-2 bg-red-50 text-red-500 rounded text-sm">
          {error.message}
        </div>
      )}
      
      <div className="flex justify-end">
        <button
          onClick={handleUpload}
          disabled={!selectedFile || isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>
    </div>
  );
};

export default LocalImageUploader;
