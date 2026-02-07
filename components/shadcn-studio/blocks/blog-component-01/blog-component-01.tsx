'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface BlogCard {
  img: string;
  alt: string;
  title: string;
  description: string;
  blogLink: string;
  tags?: string[];
}

interface BlogProps {
  blogCards: BlogCard[];
  itemsPerPage?: number;
  /** When true, section uses full desktop page width (no max-width) */
  fullWidth?: boolean;
}

export default function Blog({ blogCards, itemsPerPage = 12, fullWidth = false }: BlogProps) {
  const searchParams = useSearchParams();
  const selectedTags = searchParams.get('tags')?.split(',').filter(Boolean) || [];

  const filteredCards =
    selectedTags.length > 0
      ? blogCards.filter((card) => card.tags && card.tags.some((tag) => selectedTags.includes(tag)))
      : blogCards;

  const [visibleCount, setVisibleCount] = useState(itemsPerPage);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(itemsPerPage);
  }, [selectedTags.join(','), itemsPerPage]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || visibleCount >= filteredCards.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setVisibleCount((n) => Math.min(n + itemsPerPage, filteredCards.length));
        }
      },
      { rootMargin: '200px', threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filteredCards.length, itemsPerPage, visibleCount]);

  const currentCards = filteredCards.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCards.length;

  return (
    <section className="pt-8 pb-20 px-[10px] bg-white dark:bg-black">
      <div className={cn('mx-auto', fullWidth ? 'w-full max-w-none px-4 sm:px-6 lg:px-8' : 'max-w-7xl')}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {currentCards.map((card, index) => (
            <Link key={`${card.blogLink}-${index}`} href={card.blogLink} className="group block h-full">
              <div className="relative overflow-hidden rounded-[2px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all hover:border-zinc-400 dark:hover:border-zinc-600 h-full flex flex-col">
                <div className="aspect-[4/5] relative flex-shrink-0">
                  <Image
                    src={card.img}
                    alt={card.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Pulse-style scrolling strip overlay (Spring 2026 Inspo only) – same image height as other cards */}
                  {card.title === 'Spring 2026 Inspo' && (
                    <div
                      className="absolute left-0 right-0 top-0 z-10 w-full overflow-hidden"
                      style={{ ['--duration' as string]: '20s', backgroundColor: '#dbf4d4' }}
                    >
                      <div className="flex w-max animate-marquee-seamless gap-8 py-2.5 whitespace-nowrap text-sm font-semibold tracking-wider uppercase text-zinc-600 dark:text-zinc-400">
                        {[...Array(2)].map((_, copy) => (
                          <span key={copy} className="inline-flex shrink-0 items-center gap-8">
                            {Array.from({ length: 8 }).map((_, i) => (
                              <span key={`${copy}-${i}`}>Spring 2026 Inspo <span className="opacity-60">*</span></span>
                            ))}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Tags overlay on top right of image */}
                  {card.tags && card.tags.length > 0 && (
                    <div className="absolute top-3 right-3 z-10 flex flex-wrap gap-2 justify-end">
                      {card.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-black/20 dark:bg-white/20 text-white text-[8px] font-medium rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-black dark:text-white mb-1 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-[0.48rem] flex-grow">
                    {card.description}
                  </p>
                  <div className="text-black/50 dark:text-white/50 text-[12px] inline-flex items-center gap-1 group/view-link relative mt-auto">
                    <span className="relative">
                      View
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-300 group-hover/view-link:w-full"></span>
                    </span>
                    <svg 
                      width="10" 
                      height="10" 
                      viewBox="0 0 12 12" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline-block"
                    >
                      <path 
                        d="M1 6H11M11 6L6 1M11 6L6 11" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredCards.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">
              No posts found matching the selected tags.
            </p>
          </div>
        ) : (
          <>
            {hasMore && <div ref={sentinelRef} className="h-4 w-full" aria-hidden />}
            {hasMore && (
              <div className="flex justify-center py-8">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  Showing {currentCards.length} of {filteredCards.length}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

