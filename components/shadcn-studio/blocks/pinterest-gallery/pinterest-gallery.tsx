'use client';

import { useState } from 'react';

interface PinterestGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }>;
}

export default function PinterestGallery({ images }: PinterestGalleryProps) {
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  if (!images || images.length === 0) {
    return null;
  }

  const handleImageError = (index: number, src: string) => {
    console.error(`Failed to load image ${index + 1}:`, src);
    setImageErrors(prev => new Set(prev).add(index));
  };

  return (
    <section className="py-20 px-[10px] bg-white dark:bg-black w-full">
      <div className="w-full max-w-none">
        {imageErrors.size > 0 && (
          <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ {imageErrors.size} image(s) failed to load. Make sure Google Drive files are shared publicly.
            </p>
          </div>
        )}
        <div 
          className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4"
          style={{ columnGap: '1rem' }}
        >
          {images.map((image, index) => {
            return (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg mb-4 break-inside-avoid group cursor-pointer w-full"
              >
                <div className="relative w-full" style={{ aspectRatio: 'auto' }}>
                  {imageErrors.has(index) ? (
                    <div className="w-full h-48 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <span className="text-zinc-400 text-sm">Image failed to load</span>
                    </div>
                  ) : (
                    <img
                      src={image.src}
                      alt={image.alt || `Gallery Image ${index + 1}`}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      onError={() => handleImageError(index, image.src)}
                      crossOrigin="anonymous"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
