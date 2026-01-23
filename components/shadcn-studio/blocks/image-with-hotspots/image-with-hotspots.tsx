'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Hotspot {
  id: string;
  x: number; // Percentage from left (0-100)
  y: number; // Percentage from top (0-100)
  title: string;
  description: string;
}

interface ImageData {
  url: string;
  alt: string;
  hotspots?: Hotspot[];
}

interface ImageWithHotspotsProps {
  imageUrl?: string;
  imageAlt?: string;
  hotspots?: Hotspot[];
  images?: ImageData[]; // For two-column layout
}

export default function ImageWithHotspots({
  imageUrl,
  imageAlt,
  hotspots = [],
  images
}: ImageWithHotspotsProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // If images array is provided, use two-column layout
  const useTwoColumn = images && images.length > 0;

  // Render a single image with hotspots
  const renderImageWithHotspots = (
    imageData: ImageData,
    imageIndex: number
  ) => {
    const imageHotspots = imageData.hotspots || [];
    const hotspotPrefix = `image-${imageIndex}-`;

    return (
      <div
        key={imageIndex}
        className="relative w-full aspect-[16/9] overflow-hidden rounded-[2px]"
      >
        <Image
          src={imageData.url}
          alt={imageData.alt}
          fill
          className="object-cover"
        />

        {/* Hotspots */}
        {imageHotspots.map((hotspot) => {
          const uniqueId = `${hotspotPrefix}${hotspot.id}`;
          return (
            <div
              key={uniqueId}
              className="absolute cursor-pointer group"
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onMouseEnter={() => setActiveHotspot(uniqueId)}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              {/* Hotspot dot */}
              <div className="w-4 h-4 bg-white rounded-full border-2 border-black shadow-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>

              {/* Tooltip */}
              {activeHotspot === uniqueId && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg p-4 z-10">
                  <h3 className="font-bold text-black dark:text-white mb-1 text-sm">
                    {hotspot.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    {hotspot.description}
                  </p>
                  {/* Arrow pointing down */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <div className="w-2 h-2 bg-white dark:bg-zinc-900 border-r border-b border-zinc-200 dark:border-zinc-800 transform rotate-45"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section className="py-1 px-[10px] bg-white dark:bg-black">
      <div className="w-full max-w-none mx-auto relative">
        {useTwoColumn ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {images!.map((imageData, index) =>
              renderImageWithHotspots(imageData, index)
            )}
          </div>
        ) : (
          // Single image layout (backward compatible)
          imageUrl &&
          renderImageWithHotspots(
            { url: imageUrl, alt: imageAlt || '', hotspots },
            0
          )
        )}
      </div>
    </section>
  );
}
