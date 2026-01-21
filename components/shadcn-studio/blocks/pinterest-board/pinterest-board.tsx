'use client';

import { useEffect, useRef } from 'react';

interface PinterestBoardProps {
  boardUrl: string;
  boardName: string;
}

export default function PinterestBoard({ boardUrl, boardName }: PinterestBoardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if Pinterest script is already loaded
    if (window.PinUtils) {
      window.PinUtils.build();
      return;
    }

    // Load Pinterest embed script
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = 'https://assets.pinterest.com/js/pinit.js';
    script.setAttribute('data-pin-build', 'parsePinBtns');
    
    script.onload = () => {
      // Rebuild pins after script loads
      if (window.PinUtils) {
        window.PinUtils.build();
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="py-20 px-[10px] bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4 text-center">
            {boardName}
          </h2>
        </div>
        <div ref={containerRef} className="flex justify-center">
          <a
            data-pin-do="embedBoard"
            data-pin-board-width="900"
            data-pin-scale-height="600"
            data-pin-scale-width="115"
            href={boardUrl}
            className="block"
          >
            View on Pinterest
          </a>
        </div>
      </div>
    </section>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    PinUtils?: {
      build: () => void;
    };
  }
}
