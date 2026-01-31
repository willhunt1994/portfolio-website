'use client';

import Autoplay from 'embla-carousel-autoplay';
import { SparklesIcon, WandSparklesIcon } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

const data = [
  { text: 'Limited Edition Retail', textClassName: 'text-3xl font-semibold' },
  { text: 'Milestone Rewards', textClassName: 'text-2xl font-medium' },
  { text: 'Core Collection', textClassName: 'text-3xl font-semibold' },
  { text: 'Instructor or Team Garments', textClassName: 'text-2xl font-medium' },
  { text: 'Location Specific', textClassName: 'text-3xl font-semibold' },
  { text: 'Challenge Winners', textClassName: 'text-2xl font-medium' },
  { text: 'Sock Pre Orders', textClassName: 'text-3xl font-semibold' },
  { text: 'Conference Gear', textClassName: 'text-2xl font-medium' },
];

const TypographyFineTuning = () => {
  return (
    <Carousel
      opts={{ loop: true, align: 'center' }}
      plugins={[Autoplay({ delay: 1500, stopOnInteraction: false })]}
      orientation="vertical"
      className="w-full"
    >
      <CarouselContent className="h-[17.5rem] gap-4">
        {[...data, ...data].map((item, index) => (
          <CarouselItem
            key={index}
            className={cn(
              'flex basis-1/6 items-center justify-center pt-0 text-center',
              item.textClassName,
              { 'pt-4': index === 0 }
            )}
          >
            {item.text}
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="from-card pointer-events-none absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b to-transparent" />
      <div className="from-card pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t to-transparent" />
      <WandSparklesIcon className="text-primary/40 absolute bottom-20 left-8 rotate-180" />
      <SparklesIcon className="text-primary/40 absolute right-8 top-20 rotate-90" />
    </Carousel>
  );
};

export default TypographyFineTuning;
