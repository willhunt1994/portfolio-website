'use client';

import { useState } from 'react';

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

  // Debug logging
  if (useTwoColumn) {
    console.log('ImageWithHotspots: Rendering two-column layout with', images?.length, 'images');
    images?.forEach((img, idx) => {
      console.log(`Image ${idx + 1}:`, img.url);
    });
  }

  // Single image component with error handling
  function SingleImageWithHotspots({ 
    imageData, 
    imageIndex,
    activeHotspot,
    setActiveHotspot 
  }: { 
    imageData: ImageData; 
    imageIndex: number;
    activeHotspot: string | null;
    setActiveHotspot: (id: string | null) => void;
  }) {
    const [imageError, setImageError] = useState(false);
    const imageHotspots = imageData.hotspots || [];
    const hotspotPrefix = `image-${imageIndex}-`;

    return (
      <div className="relative w-full overflow-hidden rounded-[2px] bg-zinc-100 dark:bg-zinc-800 min-h-[200px]">
        {imageError ? (
          <div className="p-4 text-center text-zinc-500">
            <p>Failed to load image</p>
            <p className="text-xs mt-2 break-all">{imageData.url}</p>
          </div>
        ) : (
          <img
            src={imageData.url}
            alt={imageData.alt}
            className="w-full h-auto block"
            onError={() => {
              console.error('Image failed to load:', imageData.url);
              setImageError(true);
            }}
            onLoad={() => {
              console.log('Image loaded successfully:', imageData.url);
            }}
          />
        )}

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
  }

  // Render a single image with hotspots (backward compatible)
  const renderImageWithHotspots = (
    imageData: ImageData,
    imageIndex: number
  ) => {
    return (
      <SingleImageWithHotspots
        key={imageIndex}
        imageData={imageData}
        imageIndex={imageIndex}
        activeHotspot={activeHotspot}
        setActiveHotspot={setActiveHotspot}
      />
    );
  };

  if (!useTwoColumn && !imageUrl) {
    return (
      <section className="py-1 px-[10px] bg-white dark:bg-black">
        <div className="text-red-500 p-4">No images provided to ImageWithHotspots</div>
      </section>
    );
  }

  return (
    <section className="py-1 px-[10px] bg-white dark:bg-black">
      <div className="w-full max-w-none mx-auto relative">
        {useTwoColumn ? (
          <>
            {/* Debug info - remove after testing */}
            <div className="text-xs text-gray-400 mb-2">
              Rendering {images?.length} images in two-column layout
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {images!.map((imageData, index) =>
                renderImageWithHotspots(imageData, index)
              )}
            </div>
          </>
        ) : (
          // Single image layout (backward compatible)
          renderImageWithHotspots(
            { url: imageUrl!, alt: imageAlt || '', hotspots },
            0
          )
        )}
      </div>
    </section>
  );
}
