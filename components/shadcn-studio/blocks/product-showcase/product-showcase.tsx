'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type ProductImage = { src: string; alt: string };

interface Product {
  image: string;
  imageAlt: string;
  /** Optional multiple images (e.g. front/back). When length > 1, shown as carousel. */
  images?: ProductImage[];
  name: string;
  /** Optional color/variant label (e.g. "White", "Beige"). Shown on single-product layout. */
  color?: string;
  description?: string;
  link?: string;
}

interface ProductShowcaseProps {
  products?: Product[];
  title?: string;
  /** Optional background color (e.g. '#fcfced' for Spring 2026 page only). */
  backgroundColor?: string;
}

function ProductImageCarousel({
  displayImages,
  currentImageIndex,
  setImageIndex,
  sizes,
}: {
  displayImages: ProductImage[];
  currentImageIndex: number;
  setImageIndex: (index: number) => void;
  sizes?: string;
}) {
  const hasMultiple = displayImages.length > 1;
  const clampedIndex = Math.min(currentImageIndex, displayImages.length - 1);
  const current = displayImages[clampedIndex]!;

  const goPrev = () => setImageIndex((clampedIndex - 1 + displayImages.length) % displayImages.length);
  const goNext = () => setImageIndex((clampedIndex + 1) % displayImages.length);

  return (
    <>
      <Image
        key={current.src}
        src={current.src}
        alt={current.alt}
        fill
        className="object-cover"
        sizes={sizes}
      />
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
            aria-label="Previous image"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
            aria-label="Next image"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {displayImages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => { e.stopPropagation(); setImageIndex(i); }}
                className={`w-2 h-2 rounded-full transition-colors ${i === clampedIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'}`}
                aria-label={`Image ${i + 1} of ${displayImages.length}`}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default function ProductShowcase({ 
  products = [],
  title = 'Products We Used',
  backgroundColor,
}: ProductShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productImageIndices, setProductImageIndices] = useState<Record<number, number>>({});
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const setProductImageIndex = (productIndex: number, imageIndex: number) => {
    setProductImageIndices((prev) => ({ ...prev, [productIndex]: imageIndex }));
  };
  
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

  const isSingleProduct = products.length === 1;
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

  /** Resolve display images for a product (single image or array for carousel). */
  const getDisplayImages = (p: Product): ProductImage[] =>
    p.images && p.images.length > 0 ? p.images : [{ src: p.image, alt: p.imageAlt }];

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
        {title && !isSingleProduct && (
          <h2 className="text-[22px] md:text-[26px] font-bold text-black dark:text-white mb-6 text-center">
            {title}
          </h2>
        )}

        {/* Single product: image(s) left, section title + product title + color + View Product right */}
        {isSingleProduct ? (
          (() => {
            const displayImages = getDisplayImages(products[0]);
            const hasMultipleImages = displayImages.length >= 2;
            return (
          <div className="flex flex-col md:flex-row md:items-stretch gap-8 md:gap-12 max-w-6xl mx-auto">
            <div className={`flex-shrink-0 w-full mx-auto md:mx-0 ${hasMultipleImages ? 'md:w-[58%]' : 'md:w-1/2 max-w-md'}`}>
              {hasMultipleImages ? (
                <div className="flex gap-3 md:gap-4">
                  {displayImages.map((img, i) => (
                    <div key={i} className="relative flex-1 min-w-0 overflow-hidden rounded-[2px] bg-zinc-50 dark:bg-zinc-900 border border-black/5 dark:border-white/5 aspect-[3/4]">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes={displayImages.length === 2 ? '(max-width: 768px) 50vw, 29vw' : '(max-width: 768px) 33vw, 19vw'}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-[2px] bg-zinc-50 dark:bg-zinc-900 border border-black/5 dark:border-white/5 aspect-[3/4]">
                  <ProductImageCarousel
                    displayImages={displayImages}
                    currentImageIndex={productImageIndices[0] ?? 0}
                    setImageIndex={(idx) => setProductImageIndex(0, idx)}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center md:py-4 text-center md:text-left">
              {title && (
                <p className="text-sm italic text-zinc-600 dark:text-zinc-400 mb-2 md:mb-3">
                  {title}
                </p>
              )}
              <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-2 md:mb-3 tracking-tight">
                {products[0].name}
              </h3>
              {products[0].color && (
                <p className="text-xl md:text-2xl font-normal text-black dark:text-white mb-3 md:mb-4 normal-case">
                  {products[0].color}
                </p>
              )}
              {products[0].description && !products[0].color && (
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  {products[0].description}
                </p>
              )}
              <Link
                href={products[0].link ?? `/catalog?q=${encodeURIComponent([products[0].name, products[0].color, products[0].description].filter(Boolean).join(' '))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-medium text-black dark:text-white opacity-80 hover:opacity-100 transition-opacity relative group/view-link w-fit mx-auto md:mx-0"
              >
                <span className="relative">
                  View Product
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-300 group-hover/view-link:w-full" />
                </span>
              </Link>
            </div>
          </div>
            );
          })()
        ) : (
        /* Carousel Container */
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
                    <ProductImageCarousel
                      displayImages={getDisplayImages(product)}
                      currentImageIndex={productImageIndices[index] ?? 0}
                      setImageIndex={(idx) => setProductImageIndex(index, idx)}
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
        )}
      </div>
    </section>
  );
}
