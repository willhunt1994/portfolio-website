'use client';

import { useState } from 'react';
import { Marquee } from '@/components/ui/marquee';
import { MotionPreset } from '@/components/ui/motion-preset';
import { cn } from '@/lib/utils';

type ThemeItem = { name: string; img: string; bgImg: string };

const RealTimeCustomizationCard = ({
  themes,
  className,
}: {
  themes: ThemeItem[];
  className?: string;
}) => {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  return (
    <MotionPreset
      fade
      blur
      slide={{ direction: 'down', offset: 75 }}
      transition={{ duration: 0.45 }}
      className={cn('bg-card relative flex min-h-[26rem] flex-col gap-6 overflow-hidden rounded-[2px] pt-6', className)}
    >
      <div className="space-y-3.5 px-6">
        <h3 className="text-[21px] font-semibold">Custom Dashboard</h3>
        <p className="text-muted-foreground">
          Login to your custom dashboard to design new items, purchase your custom products, and track your orders.
        </p>
        <p className="text-sm font-medium text-muted-foreground">Trusted By:</p>
      </div>

      <Marquee pauseOnHover duration={20} delay={2} gap={1.25} className="py-0">
        {themes.map((theme) => (
          <div
            key={theme.name}
            className="flex cursor-pointer items-center justify-center rounded-xl px-4 py-3 transition-colors hover:opacity-80"
            onClick={() => setSelectedTheme(theme)}
          >
            <img
              src={theme.img}
              alt={theme.name}
              className="h-12 w-auto max-w-[120px] object-contain"
            />
          </div>
        ))}
      </Marquee>

      {/* Spacer: grows the card so the absolute dashboard sits below the logos */}
      <div className="min-h-[10rem] shrink-0" aria-hidden />

      <div className="absolute -bottom-1 left-2.5 right-2.5 mx-0 max-h-48 overflow-hidden rounded-md border bg-background">
        <img
          src="/home-page/custom-dashboard/Screenshot 2026-01-31 at 08.25.28.png"
          alt="Custom dashboard"
          className="h-full w-full object-contain object-bottom p-2"
        />
      </div>
    </MotionPreset>
  );
};

export default RealTimeCustomizationCard;
