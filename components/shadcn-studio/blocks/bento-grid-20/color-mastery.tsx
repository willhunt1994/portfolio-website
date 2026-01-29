'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Logo from '@/assets/svg/logo';
import { cn } from '@/lib/utils';

const colors = ['destructive', 'amber'];

const textColors = {
  destructive: 'text-destructive',
  amber: 'text-amber-600 dark:text-amber-400',
};

const LEFT_INDEX = 0; // left arrow – Concept spin
const RIGHT_INDEX = 1; // right arrow – wheel rotate 90°

const ColorMastery = () => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [spinKey, setSpinKey] = useState(0);
  const [wheelRotation, setWheelRotation] = useState(0);

  const handleClick = (index: number) => {
    setSelectedColorIndex(index);
    if (index === LEFT_INDEX) {
      setWheelRotation((r) => (r - 90 + 360) % 360);
    }
    if (index === RIGHT_INDEX) {
      setWheelRotation((r) => (r + 90) % 360);
    }
  };

  const selectedColor = colors[selectedColorIndex];

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-1.5 rounded-md border px-3 py-1 shadow-sm">
        <span>Our Process</span>
        <button
          type="button"
          aria-label="Previous / Concept spin"
          className={cn(
            'flex size-8 items-center justify-center rounded-md cursor-pointer transition-colors hover:bg-muted',
            selectedColorIndex === LEFT_INDEX && 'bg-muted ring-2 ring-primary/20'
          )}
          onClick={() => handleClick(LEFT_INDEX)}
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next / Rotate wheel"
          className={cn(
            'flex size-8 items-center justify-center rounded-md cursor-pointer transition-colors hover:bg-muted',
            selectedColorIndex === RIGHT_INDEX && 'bg-muted ring-2 ring-primary/20'
          )}
          onClick={() => handleClick(RIGHT_INDEX)}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="flex h-[13.75rem] items-start justify-center">
        <div className="relative size-[22.5rem]">
          <div className="absolute inset-2 rounded-full border" />
          <div className="absolute inset-11 rounded-full border" />
          <div className="absolute inset-[5.25rem] rounded-full border" />
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center',
              textColors[selectedColor as keyof typeof textColors]
            )}
          >
            <Logo className="size-[5.75rem] [&>rect:first-child]:fill-current" />
          </div>
          {/* Wheel of labels: rotates 90° right when orange clicked; inner counter-rotate keeps text horizontal */}
          <div
            className="absolute inset-0 pointer-events-none origin-center transition-transform duration-500 ease-in-out"
            style={{ transform: `rotate(${wheelRotation}deg)` }}
          >
            {/* Outer ring – Concept at 12 o'clock, moves to top + rolls when red clicked */}
            <div
              className="absolute inset-0 flex items-start justify-center pt-2 origin-center"
              style={
                spinKey > 0
                  ? { animation: 'typo-move-to-top 1.2s ease-in-out' }
                  : undefined
              }
              onAnimationEnd={() => setSpinKey(0)}
            >
              <div
                className="transition-transform duration-500 ease-in-out origin-center"
                style={{ transform: `rotate(-${wheelRotation}deg)` }}
              >
                <div
                  className={cn(
                    'bg-background rounded-md border px-2 py-0.5 shadow-sm origin-center -translate-y-1.5 whitespace-nowrap',
                    textColors[selectedColor as keyof typeof textColors]
                  )}
                  style={
                    spinKey > 0
                      ? { animation: 'typo-roll 1.2s ease-in-out' }
                      : undefined
                  }
                >
                  Concept
                </div>
              </div>
            </div>
            {/* Middle ring – Delivered Customized at 9 o'clock (left) */}
            <div className="absolute inset-0 flex items-center justify-start pl-11 origin-center">
              <div
                className="transition-transform duration-500 ease-in-out origin-center"
                style={{ transform: `rotate(-${wheelRotation}deg)` }}
              >
                <div
                  className={cn(
                    'bg-background rounded-md border px-2 py-0.5 shadow-sm -translate-x-1.5 whitespace-nowrap',
                    textColors[selectedColor as keyof typeof textColors]
                  )}
                >
                  Delivered Customized
                </div>
              </div>
            </div>
            {/* Inner ring – Product Launch at 6 o'clock (bottom) */}
            <div className="absolute inset-0 flex items-end justify-center pb-[5.25rem] origin-center">
              <div
                className="transition-transform duration-500 ease-in-out origin-center"
                style={{ transform: `rotate(-${wheelRotation}deg)` }}
              >
                <div
                  className={cn(
                    'bg-background rounded-md border px-2 py-0.5 shadow-sm translate-y-1.5 whitespace-nowrap',
                    textColors[selectedColor as keyof typeof textColors]
                  )}
                >
                  Product Launch
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorMastery;
