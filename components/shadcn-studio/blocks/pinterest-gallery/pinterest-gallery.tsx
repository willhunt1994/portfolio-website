'use client';

import Image from 'next/image';

interface PinterestGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }>;
}

export default function PinterestGallery({ images }: PinterestGalleryProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-[10px] bg-white dark:bg-black w-full">
      <div className="w-full max-w-none">
        <div 
          className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4"
          style={{ columnGap: '1rem' }}
        >
          {images.map((image, index) => {
            // Use fill mode with a wrapper that maintains natural aspect ratio
            // This allows images to be truly responsive to their natural dimensions
            return (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg mb-4 break-inside-avoid group cursor-pointer w-full"
              >
                <div className="relative w-full" style={{ aspectRatio: 'auto' }}>
                  <img
                    src={image.src}
                    alt={image.alt || `Spring 2026 Inspo ${index + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
