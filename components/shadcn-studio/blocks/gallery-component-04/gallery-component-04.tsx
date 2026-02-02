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
  /** Optional video (autoplay, loop). When set, rendered instead of image. */
  video?: string;
  /** Optional testimonial card (full-width). When set, rendered instead of image/video. */
  testimonial?: {
    author: string;
    role?: string;
    avatar?: string;
    avatarAlt?: string;
    quote: string;
    body?: string;
    image?: string;
    imageAlt?: string;
  };
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
            const isTestimonial = !!image.testimonial;
            const imageHotspots = image.hotspots || [];
            const spanClass = isTestimonial ? 'md:col-span-4' : (isFullWidth ? '' : isWide ? 'md:col-span-2' : '');

            if (isTestimonial && image.testimonial) {
              const { author, role, avatar, avatarAlt, quote, body, image: testimonialImage, imageAlt, buttonText, buttonHref } = image.testimonial;
              return (
                <div
                  key={index}
                  className={`relative overflow-visible rounded-[2px] md:col-span-4 ${image.className || ''}`}
                >
                  <div className="relative w-full rounded-[2px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col md:flex-row min-h-[280px]">
                    {/* Left column: testimonial text */}
                    <div className="flex-1 flex flex-col justify-center p-6 md:p-8 lg:p-10 text-left">
                      {/* Circular profile picture above author */}
                      <div className="mb-4 flex justify-start">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-700 flex-shrink-0">
                          {avatar ? (
                            <Image
                              src={avatar}
                              alt={avatarAlt || author}
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-zinc-400 dark:text-zinc-500" aria-hidden>
                              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white mb-3">
                        {author}
                        {role && <span className="text-zinc-600 dark:text-zinc-400 font-normal">, {role}</span>}
                      </p>
                      <blockquote className="text-xl md:text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-white uppercase tracking-tight mb-4 md:mb-6">
                        &ldquo;{quote}&rdquo;
                      </blockquote>
                      {body && (
                        <div className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-3">
                          {body.split(/\n\n+/).map((para, i) => (
                            <p key={i}>{para}</p>
                          ))}
                        </div>
                      )}
                      {buttonText && buttonHref && (
                        <a
                          href={buttonHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 inline-flex w-fit items-center justify-center rounded-md bg-zinc-900 dark:bg-white px-4 py-2.5 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                        >
                          {buttonText}
                        </a>
                      )}
                    </div>
                    {/* Right column: optional image */}
                    {testimonialImage && (
                      <div className="relative w-full md:w-[45%] lg:w-[40%] aspect-[4/3] md:aspect-[3/4] flex-shrink-0">
                        <Image
                          src={testimonialImage}
                          alt={imageAlt || author}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 45vw"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={index}
                className={`relative overflow-visible rounded-[2px] ${spanClass} ${isFullWidth ? 'aspect-[16/9]' : isWide ? 'aspect-[16/9]' : 'aspect-[2/3]'} ${image.className || ''}`}
              >
                <div className="relative w-full h-full overflow-hidden rounded-[2px]">
                  {image.video ? (
                    <video
                      src={image.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ zIndex: 1 }}
                      aria-label={image.alt}
                    />
                  ) : (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      style={{ zIndex: 1 }}
                    />
                  )}
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

