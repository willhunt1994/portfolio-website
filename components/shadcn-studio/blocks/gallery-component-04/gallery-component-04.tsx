'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Hotspot {
  x: number; // Percentage from left (0-100)
  y: number; // Percentage from top (0-100)
  title: string;
  description: string;
  image?: string; // Optional image URL for the popup
  imageAlt?: string; // Optional alt text for the image
  link?: string; // Optional link for "view details" button
}

interface GalleryImage {
  src: string;
  alt: string;
  className?: string;
  hotspots?: Hotspot[];
}

interface GalleryProps {
  galleryImage: GalleryImage[];
}

export default function Gallery({ galleryImage }: GalleryProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  return (
    <section className="py-1 px-[10px] bg-white dark:bg-black">
      <div className="w-full max-w-none mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {galleryImage.map((image, index) => {
            const isWide = image.className?.includes('col-span-2');
            const isFullWidth = image.className?.includes('col-span-4');
            const imageHotspots = image.hotspots || [];
            
            return (
              <div
                key={index}
                className={`relative overflow-visible rounded-[2px] ${isFullWidth ? 'aspect-[16/9]' : isWide ? 'aspect-[16/9]' : 'aspect-[2/3]'} ${image.className || ''}`}
              >
                <div className="relative w-full h-full overflow-hidden rounded-[2px]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    style={{ zIndex: 1 }}
                  />
                </div>
                
                {/* Hotspots */}
                {imageHotspots.map((hotspot, hotspotIndex) => {
                  const hotspotId = `image-${index}-hotspot-${hotspotIndex}`;
                  return (
                    <div
                      key={hotspotId}
                      className="absolute cursor-pointer"
                      style={{
                        left: `${hotspot.x}%`,
                        top: `${hotspot.y}%`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 100,
                        pointerEvents: 'auto'
                      }}
                      onMouseEnter={() => {
                        setActiveHotspot(hotspotId);
                      }}
                    >
                      {/* Hotspot dot */}
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ 
                          background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 40%, rgba(255, 255, 255, 0.4) 70%, rgba(255, 255, 255, 0) 100%)',
                          boxShadow: '0 0 8px rgba(255, 255, 255, 0.9), 0 0 16px rgba(255, 255, 255, 0.6), 0 0 24px rgba(255, 255, 255, 0.3)',
                          animation: 'pulse-glow 2s ease-in-out infinite',
                          transformOrigin: 'center center'
                        }}
                      />
                      
                      {/* Tooltip/Popup */}
                      {activeHotspot === hotspotId && (
                        <div 
                          data-popup={hotspotId}
                          className="absolute bottom-full left-1/2 mb-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl p-4"
                          style={{ 
                            zIndex: 200,
                            animation: 'popup-fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                            width: '320px'
                          }}
                        >
                          {/* Close button */}
                          <button
                            onClick={() => setActiveHotspot(null)}
                            className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                            aria-label="Close popup"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 1L11 11M11 1L1 11"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          <div className="flex gap-3">
                            {hotspot.image && (
                              <div className="relative flex-shrink-0 w-20 aspect-[4/5] rounded overflow-hidden">
                                <Image
                                  src={hotspot.image}
                                  alt={hotspot.imageAlt || hotspot.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-black dark:text-white mb-1 text-sm">
                                {hotspot.title}
                              </h3>
                              <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2">
                                {hotspot.description}
                              </p>
                              {hotspot.link && (
                                <a
                                  href={hotspot.link}
                                  className="inline-block text-xs font-medium text-black dark:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 px-3 py-1.5 rounded transition-colors"
                                >
                                  View Details
                                </a>
                              )}
                            </div>
                          </div>
                          {/* Arrow pointing down - aligned with hotspot */}
                          <div className="absolute top-full left-1/2 -mt-1 transform -translate-x-1/2">
                            <div className="w-2 h-2 bg-white dark:bg-zinc-900 border-r border-b border-zinc-200 dark:border-zinc-800 transform rotate-45"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

