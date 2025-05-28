'use client';

import React, { useState } from 'react';

interface ErrorBoundaryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc?: string;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
}

/**
 * An image component that handles 404 errors gracefully
 * Falls back to a placeholder when an image fails to load
 */
export default function ErrorBoundaryImage({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  fallbackSrc = '/placeholders/image-unavailable.svg',
  onClick,
}: ErrorBoundaryImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  const handleError = () => {
    console.warn(`Image failed to load: ${src}`);
    setImgSrc(fallbackSrc);
    setError(true);
  };

  return (
    <>
      <img
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${error ? 'opacity-60' : ''}`}
        onError={handleError}
        onClick={onClick}
      />
      {error && (
        <div className="text-xs text-red-500 mt-1">
          Image failed to load
        </div>
      )}
    </>
  );
}
