'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { getFullSizeUrl, getThumbnailUrl } from '@/lib/image-utils';
import ErrorBoundaryImage from './ErrorBoundaryImage';

interface ImageContent {
  id: string;
  title: string;
  description?: string;
  path: string;
  imagekitPath?: string | null;
}

interface ImageGalleryProps {
  images: ImageContent[];
  isOpen: boolean;
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  isOpen,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    onNavigate(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    onNavigate(newIndex);
  };

  // Touch handlers for swipe functionality
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      onClick={handleBackdropClick}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white hover:text-gray-300 transition-colors"
        aria-label="Close gallery"
      >
        <XMarkIcon className="w-8 h-8" />
      </button>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 text-white hover:text-gray-300 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="w-8 h-8" />
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 text-white hover:text-gray-300 transition-colors"
          aria-label="Next image"
        >
          <ChevronRightIcon className="w-8 h-8" />
        </button>
      )}

      {/* Image container */}
      <div
        className="relative max-w-4xl max-h-full mx-4 my-8"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}      >
        <ErrorBoundaryImage
          src={getFullSizeUrl(currentImage.path, currentImage.imagekitPath)}
          alt={currentImage.title}
          className="max-w-full max-h-full object-contain"
          fallbackSrc="/placeholders/image-unavailable.svg"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Image info overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
          <h3 className="font-cormorant font-bold text-xl mb-2">
            {currentImage.title}
          </h3>
          {currentImage.description && (
            <p className="font-lora text-sm opacity-90">
              {currentImage.description}
            </p>
          )}
          {images.length > 1 && (
            <p className="text-xs mt-2 opacity-70">
              {currentIndex + 1} of {images.length}
            </p>
          )}
        </div>
      </div>

      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto px-4">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => onNavigate(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-white opacity-100'
                  : 'border-transparent opacity-60 hover:opacity-80'              }`}
            >
              <ErrorBoundaryImage
                src={getThumbnailUrl(image.path, image.imagekitPath)}
                alt={image.title}
                className="w-full h-full object-cover"
                fallbackSrc="/placeholders/image-unavailable.svg"
                width={64}
                height={64}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
