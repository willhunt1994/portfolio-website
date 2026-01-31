'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

// Pulse runs left → right (horizontal) / top → bottom (vertical)
const gradientCoordsHorizontal = {
  x1: ['0%', '120%'],
  x2: ['-20%', '100%'],
  y1: ['0%', '0%'],
  y2: ['0%', '0%'],
};
const gradientCoordsVertical = {
  x1: ['0%', '0%'],
  x2: ['0%', '0%'],
  y1: ['0%', '120%'],
  y2: ['-20%', '100%'],
};

/** Connector line between cards: draw-on-load + enhanced pulse (no arrow head). Pulse runs left→right. */
export function ArrowConnector({ className }: { className?: string }) {
  const gradientIdV = React.useId();
  const gradientIdH = React.useId();

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center bg-transparent w-full sm:w-8 lg:w-12 h-8 sm:h-full sm:min-h-[280px] py-2 sm:py-0 relative',
        className
      )}
    >
      {/* Vertical line (mobile) — pulse top → bottom */}
      <svg
        className="w-6 h-8 sm:hidden text-gray-300 relative"
        viewBox="0 0 24 40"
        fill="none"
        aria-hidden
      >
        <defs>
          <motion.linearGradient
            id={gradientIdV}
            className="transform-gpu"
            gradientUnits="userSpaceOnUse"
            initial={{ x1: '0%', x2: '0%', y1: '0%', y2: '0%' }}
            animate={gradientCoordsVertical}
            transition={{
              delay: 0.5,
              duration: 3,
              ease: 'linear',
              repeat: Infinity,
              repeatDelay: 0,
            }}
          >
            <stop stopColor="currentColor" stopOpacity="0" />
            <stop offset="15%" stopColor="currentColor" stopOpacity="0.4" />
            <stop offset="35%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="65%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="85%" stopColor="currentColor" stopOpacity="0.4" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </motion.linearGradient>
        </defs>
        <line
          x1="12"
          y1="2"
          x2="12"
          y2="38"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.25"
        />
        <motion.line
          x1="12"
          y1="2"
          x2="12"
          y2="38"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={1}
          initial={{ strokeDasharray: '1', strokeDashoffset: '1' }}
          animate={{ strokeDashoffset: '0' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        <motion.line
          x1="12"
          y1="2"
          x2="12"
          y2="38"
          stroke={`url(#${gradientIdV})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength={1}
          initial={{ strokeDasharray: '1', strokeDashoffset: '1' }}
          animate={{ strokeDashoffset: '0' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </svg>

      {/* Horizontal line (sm+) — pulse left → right */}
      <svg
        className="hidden sm:block w-full h-6 lg:h-8 text-gray-300 relative"
        viewBox="0 0 48 24"
        fill="none"
        aria-hidden
      >
        <defs>
          <motion.linearGradient
            id={gradientIdH}
            className="transform-gpu"
            gradientUnits="userSpaceOnUse"
            initial={{ x1: '0%', x2: '0%', y1: '0%', y2: '0%' }}
            animate={gradientCoordsHorizontal}
            transition={{
              delay: 0.5,
              duration: 3,
              ease: 'linear',
              repeat: Infinity,
              repeatDelay: 0,
            }}
          >
            <stop stopColor="currentColor" stopOpacity="0" />
            <stop offset="15%" stopColor="currentColor" stopOpacity="0.4" />
            <stop offset="35%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="65%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="85%" stopColor="currentColor" stopOpacity="0.4" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </motion.linearGradient>
        </defs>
        <line
          x1="2"
          y1="12"
          x2="46"
          y2="12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.25"
        />
        <motion.line
          x1="2"
          y1="12"
          x2="46"
          y2="12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={1}
          initial={{ strokeDasharray: '1', strokeDashoffset: '1' }}
          animate={{ strokeDashoffset: '0' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        <motion.line
          x1="2"
          y1="12"
          x2="46"
          y2="12"
          stroke={`url(#${gradientIdH})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength={1}
          initial={{ strokeDasharray: '1', strokeDashoffset: '1' }}
          animate={{ strokeDashoffset: '0' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </svg>
    </div>
  );
}
