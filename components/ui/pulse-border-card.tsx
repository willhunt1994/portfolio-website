'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

/** Length of the pulse band along the path (fraction of perimeter). */
const PULSE_BAND = 0.12;
/** Duration for one full lap of the pulse (slowed down). */
const PULSE_DURATION = 12;
/** Opacity of the pulse band. */
const PULSE_OPACITY = 0.3;

/**
 * Wraps card content with a border. A single traveling pulse band appears
 * only on hover, runs slowly along the border at 30% opacity.
 */
export function PulseBorderCard({
  children,
  className,
  innerClassName,
  videoSrc,
  imageSrc,
  ...props
}: React.ComponentProps<'div'> & { innerClassName?: string; videoSrc?: string; imageSrc?: string }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className={cn(
        'relative rounded-[2px] p-[2px] overflow-visible',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* SVG: pulse band only on hover (no static border) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none rounded-[2px]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {/* Single pulse band: only visible and animating on hover, 30% opacity, slow */}
        <motion.rect
          x="1"
          y="1"
          width="98"
          height="98"
          rx="2"
          ry="2"
          fill="none"
          stroke="rgb(156 163 175)"
          strokeWidth="2"
          strokeOpacity={PULSE_OPACITY}
          pathLength={1}
          strokeDasharray={`${PULSE_BAND} ${1 - PULSE_BAND}`}
          initial={{ strokeDashoffset: 1, opacity: 0 }}
          animate={{
            strokeDashoffset: isHovered ? 0 : 1,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{
            duration: isHovered ? PULSE_DURATION : 0.3,
            repeat: isHovered ? Infinity : 0,
            ease: 'linear',
          }}
        />
      </svg>
      <div
        className={cn(
          'relative z-10 min-h-full rounded-[2px] bg-gray-50/80 p-6 flex flex-col transition-colors hover:bg-gray-100/80 border border-[#f4f4f4] overflow-hidden',
          innerClassName
        )}
      >
        {videoSrc && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
        {imageSrc && !videoSrc && (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
            style={{ backgroundImage: `url(${imageSrc})` }}
          />
        )}
        <div className={cn('relative z-10', (videoSrc || imageSrc) && 'text-white drop-shadow-lg')}>
          {children}
        </div>
      </div>
    </div>
  );
}
