'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface SpringPickItem {
  image: string;
  imageAlt: string;
  productName?: string;
  productDescription?: string;
  link?: string;
}

interface SpringPicksCarouselProps {
  items: SpringPickItem[];
  title?: string;
}

const ITEMS_VISIBLE = 2;

export default function SpringPicksCarousel({
  items,
  title = "Our picks for Spring 2026",
}: SpringPicksCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!items || items.length === 0) return null;

  const maxIndex = Math.max(0, items.length - ITEMS_VISIBLE);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const visibleItems = items.slice(currentIndex, currentIndex + ITEMS_VISIBLE);

  return (
    <div
      ref={sectionRef}
      className="w-full flex justify-center px-[10px] py-6"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
        transition: isVisible
          ? 'opacity 0.7s ease-out 0.1s, transform 0.7s ease-out 0.1s'
          : 'opacity 0.7s ease-out, transform 0.7s ease-out',
      }}
    >
      <div className="w-full max-w-[50vw] min-w-0 relative">
        {title && (
          <h2 className="text-lg md:text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4 text-center">
            {title}
          </h2>
        )}
        <div className="relative">
          {items.length > ITEMS_VISIBLE && (
            <>
              <button
                type="button"
                onClick={goToPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Previous"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-zinc-900 dark:text-zinc-100" aria-hidden>
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Next"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-zinc-900 dark:text-zinc-100" aria-hidden>
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex gap-4 transition-transform duration-500 ease-in-out"
              style={{
                width: `${(items.length / ITEMS_VISIBLE) * 100}%`,
                transform: `translateX(-${currentIndex * (100 / (items.length / ITEMS_VISIBLE))}%)`,
              }}
            >
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 min-w-0"
                  style={{ width: `${100 / ITEMS_VISIBLE}%` }}
                >
                  <div className="group rounded-[2px] overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                    <div className="aspect-[2/3] relative">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    {(item.productName || item.link) && (
                      <div className="p-3">
                        {item.productName && (
                          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                            {item.productName}
                          </p>
                        )}
                        {item.productDescription && (
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                            {item.productDescription}
                          </p>
                        )}
                        {item.link && (
                          <Link
                            href={item.link}
                            className="inline-block mt-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:underline"
                          >
                            View product
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
