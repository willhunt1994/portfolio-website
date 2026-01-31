'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Hotspot {
  x: number; // Percentage from left (0-100)
  y: number; // Percentage from top (0-100)
  title: string;
  description: string;
}

interface ImageTextSectionProps {
  imageUrl: string;
  imageAlt: string;
  heading?: string;
  text?: string;
  imagePosition?: 'left' | 'right';
  hotspots?: Hotspot[];
  /** Image extends outside content with small padding; use for shoot story sections. */
  extendImage?: boolean;
  /** Reduce vertical padding and match gallery spacing (py-2, px-[10px], gap-2). */
  compactPadding?: boolean;
  /** Animate heading and text in on scroll (typewriter style). */
  animateTextOnScroll?: boolean;
}

const TYPEWRITER_MS_PER_CHAR = 38;

export default function ImageTextSection({
  imageUrl,
  imageAlt,
  heading,
  text,
  imagePosition = 'left',
  hotspots = [],
  extendImage = false,
  compactPadding = false,
  animateTextOnScroll = false,
}: ImageTextSectionProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [textInView, setTextInView] = useState(!animateTextOnScroll);
  const [headingLen, setHeadingLen] = useState(0);
  const [bodyLen, setBodyLen] = useState(0);
  const headingDone = !heading || headingLen >= (heading?.length ?? 0);

  useEffect(() => {
    if (!animateTextOnScroll || !textRef.current) return;
    const el = textRef.current;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTextInView(true);
      },
      { threshold: 0.25, rootMargin: '0px 0px -80px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [animateTextOnScroll]);

  useEffect(() => {
    if (!textInView || !animateTextOnScroll) return;
    const hLen = heading?.length ?? 0;
    const bLen = text?.length ?? 0;
    if (headingLen < hLen) {
      const t = setTimeout(() => setHeadingLen((n) => Math.min(n + 1, hLen)), TYPEWRITER_MS_PER_CHAR);
      return () => clearTimeout(t);
    }
    if (bodyLen < bLen) {
      const t = setTimeout(() => setBodyLen((n) => Math.min(n + 1, bLen)), TYPEWRITER_MS_PER_CHAR);
      return () => clearTimeout(t);
    }
  }, [textInView, animateTextOnScroll, heading, text, headingLen, bodyLen]);

  const displayHeading = heading != null ? heading.slice(0, headingLen) : '';
  const displayBody = text != null ? text.slice(0, bodyLen) : '';

  return (
    <section
      className={`w-full bg-white dark:bg-black ${compactPadding ? 'py-2' : 'pt-8 pb-20'} ${extendImage && compactPadding ? 'px-[10px]' : extendImage ? 'px-3 sm:px-4' : 'px-[10px]'}`}
    >
      <div className={extendImage && compactPadding ? 'w-full max-w-none mx-auto' : 'max-w-7xl mx-auto'}>
        <div className={`grid md:grid-cols-2 ${compactPadding ? 'gap-y-2 gap-x-6 md:gap-x-8' : 'gap-8 md:gap-12'} items-center ${imagePosition === 'right' ? 'md:flex-row-reverse' : ''}`}>
          {/* Image – same padding as gallery when extendImage + compactPadding */}
          <div
            className={`relative aspect-[4/3] md:aspect-[5/4] ${imagePosition === 'right' ? 'md:order-2' : ''} ${extendImage && !compactPadding ? (imagePosition === 'right' ? 'md:-mr-4' : 'md:-ml-4') : ''}`}
          >
            <div
              className={`relative w-full h-full overflow-hidden ${extendImage ? 'rounded-[2px]' : 'rounded-lg'}`}
            >
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Text Content – typewriter on scroll when animateTextOnScroll (no cursor) */}
          <div ref={textRef} className={imagePosition === 'right' ? 'md:order-1' : ''}>
            {heading != null && heading.length > 0 && (
              <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
                {animateTextOnScroll ? displayHeading : heading}
              </h2>
            )}
            {text != null && text.length > 0 && (
              <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {animateTextOnScroll ? displayBody : text}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
