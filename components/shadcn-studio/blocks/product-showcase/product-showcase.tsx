'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  image: string;
  imageAlt: string;
  name: string;
  description?: string;
  link?: string;
}

interface ProductShowcaseProps {
  products?: Product[];
  title?: string;
  /** Optional background color (e.g. '#fcfced' for Spring 2026 page only). */
  backgroundColor?: string;
}

export default function ProductShowcase({ 
  products = [],
  title = 'Products We Used',
  backgroundColor,
}: ProductShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  if (!products || products.length === 0) {
    return null;
  }

  const itemsVisible = 4;
  const maxIndex = Math.max(0, products.length - itemsVisible);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goToProduct = (productIndex: number) => {
    const clampedIndex = Math.min(productIndex, maxIndex);
    setCurrentIndex(clampedIndex);
  };

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsVisible);

  return (
    <section 
      ref={sectionRef}
      className={`py-8 px-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ 
        backgroundColor: backgroundColor ?? '#f4f4f4',
        animation: isVisible ? 'fade-in-up 0.8s ease-out forwards' : 'none'
      }}
    >
      <div className="max-w-7xl mx-auto">
        {title && (
          <h2 className="text-[22px] md:text-[26px] font-bold text-black dark:text-white mb-6 text-center">
            {title}
          </h2>
        )}
        
        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {products.length > itemsVisible && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Previous products"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-black dark:text-white"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Next products"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-black dark:text-white"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Products Carousel Container */}
          <div className="overflow-hidden">
            <div 
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(calc(-${currentIndex} * (100% / ${itemsVisible})))`
              }}
            >
              {products.map((product, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-[2px] bg-zinc-50 dark:bg-zinc-900 transition-all flex-shrink-0 border border-black/2 dark:border-white/2"
                  style={{
                    width: `calc((100% - ${(itemsVisible - 1) * 1.5}rem) / ${itemsVisible})`,
                    minWidth: `calc((100% - ${(itemsVisible - 1) * 1.5}rem) / ${itemsVisible})`
                  }}
                >
                  <div className="aspect-[2/3] relative">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col">
                    <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                        {product.description}
                      </p>
                    )}
                    <Link
                      href={`/catalog?q=${encodeURIComponent([product.name, product.description].filter(Boolean).join(' '))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-auto text-xs text-black dark:text-white opacity-70 hover:opacity-100 transition-all group/view-link relative"
                    >
                      <span className="relative">
                        View Product
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-300 group-hover/view-link:w-full"></span>
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          {products.length > itemsVisible && (
            <div className="flex justify-center gap-2 mt-6">
              {products.map((_, index) => {
                // Show dot for each possible starting position
                const canStartHere = index <= maxIndex;
                if (!canStartHere) return null;
                
                const isActive = index === currentIndex;
                return (
                  <button
                    key={index}
                    onClick={() => goToProduct(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      isActive
                        ? 'bg-black dark:bg-white w-6'
                        : 'bg-zinc-400 dark:bg-zinc-600 hover:bg-zinc-500 dark:hover:bg-zinc-500'
                    }`}
                    aria-label={`Go to product ${index + 1}`}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
