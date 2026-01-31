'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface PinterestGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
    video?: string;
  }>;
}

export default function PinterestGallery({ images }: PinterestGalleryProps) {
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [visibleItems, setVisibleItems] = useState<Map<number, number>>(new Map());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const observerCallback = useCallback<IntersectionObserverCallback>((entries) => {
    setVisibleItems((prev) => {
      const next = new Map(prev);
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const index = Number((entry.target as HTMLElement).dataset.index);
        if (Number.isNaN(index) || next.has(index)) continue;
        const left = entry.boundingClientRect.left;
        const delay = Math.min(0.25, (left / (typeof window !== 'undefined' ? window.innerWidth : 1200)) * 0.25);
        next.set(index, delay);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1,
    });
    for (let i = 0; i < images.length; i++) {
      const el = itemRefs.current[i];
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [images.length, observerCallback]);

  if (!images || images.length === 0) {
    return null;
  }

  const handleImageError = (index: number, src: string) => {
    console.error(`Failed to load image ${index + 1}:`, src);
    setImageErrors(prev => new Set(prev).add(index));
  };

  return (
    <section className="pt-4 pb-4 px-[10px] bg-white dark:bg-black w-full">
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
            const delay = visibleItems.get(index) ?? -1;
            const isVisible = delay >= 0;
            return (
              <div
                key={index}
                ref={(el) => { itemRefs.current[index] = el; }}
                data-index={index}
                className="relative overflow-hidden rounded-lg mb-4 break-inside-avoid group cursor-pointer w-full"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
                  transition: isVisible
                    ? `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`
                    : 'opacity 0.7s ease-out, transform 0.7s ease-out',
                }}
              >
                <div className="relative w-full" style={{ aspectRatio: 'auto' }}>
                  {imageErrors.has(index) ? (
                    <div className="w-full h-48 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <span className="text-zinc-400 text-sm">Image failed to load</span>
                    </div>
                  ) : image.video ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                      poster={image.src}
                    >
                      <source src={image.video} type="video/mp4" />
                    </video>
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
