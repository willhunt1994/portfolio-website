'use client';

import { useState } from 'react';
import { Marquee } from '@/components/ui/marquee';
import { MotionPreset } from '@/components/ui/motion-preset';
import ThemeItem, { type ThemeItemProps } from '@/components/shadcn-studio/blocks/bento-grid-20/theme-item';

const RealTimeCustomizationCard = ({
  themes,
}: {
  themes: (ThemeItemProps['theme'] & { bgImg: string })[];
}) => {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  return (
    <MotionPreset
      fade
      blur
      slide={{ direction: 'down', offset: 75 }}
      transition={{ duration: 0.45 }}
      className="bg-card relative flex min-h-[26rem] flex-col gap-6 overflow-hidden rounded-xl pt-6"
    >
      <div className="space-y-3.5 px-6">
        <h3 className="text-xl font-semibold">Custom Dashboard</h3>
        <p className="text-muted-foreground">
          Login to see reports on what your franchisees are purchasing in one central dashboard.
        </p>
        <p className="text-sm font-medium text-muted-foreground">Trusted By:</p>
      </div>

      <Marquee pauseOnHover duration={20} delay={2} gap={1.25} className="py-0">
        {themes.map((theme) => (
          <ThemeItem key={theme.name} theme={theme} onClick={() => setSelectedTheme(theme)} />
        ))}
      </Marquee>

      <div className="absolute -bottom-1 left-2.5 right-2.5 mx-0 max-h-48 overflow-hidden rounded-md border">
        <img
          src={selectedTheme.bgImg}
          alt={selectedTheme.name + '-bg-img'}
          className="h-full w-full object-contain object-bottom dark:hidden"
        />
        <img
          src={selectedTheme.bgImg.replace('light.png', 'dark.png')}
          alt={selectedTheme.name + '-bg-img'}
          className="hidden h-full w-full object-contain object-bottom dark:block"
        />
      </div>
    </MotionPreset>
  );
};

export default RealTimeCustomizationCard;
