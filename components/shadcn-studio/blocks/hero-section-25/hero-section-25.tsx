'use client';

import { useRef } from 'react';

import Image from 'next/image';
import { AnimatedBeam } from '@/components/ui/animated-beam';

const ETHOS_LOGO_URL =
  'https://cdn.shopify.com/s/files/1/0609/4752/9901/files/Ethos_Logo-05.jpg?v=1769654967';

type HeroSectionVariant = 'full' | 'textOnly' | 'diagramOnly';

const HeroSection = ({ variant = 'full' }: { variant?: HeroSectionVariant }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef1 = useRef<HTMLDivElement>(null);
  const iconRef2 = useRef<HTMLDivElement>(null);
  const iconRef3 = useRef<HTMLDivElement>(null);
  const iconRef4 = useRef<HTMLDivElement>(null);
  const iconRef5 = useRef<HTMLDivElement>(null);
  const iconRef6 = useRef<HTMLDivElement>(null);
  const iconRef7 = useRef<HTMLDivElement>(null);
  const spanRef1 = useRef<HTMLSpanElement>(null);
  const spanRef2 = useRef<HTMLSpanElement>(null);
  const spanRef3 = useRef<HTMLSpanElement>(null);
  const spanRef4 = useRef<HTMLSpanElement>(null);
  const spanRef5 = useRef<HTMLSpanElement>(null);
  const spanRef6 = useRef<HTMLSpanElement>(null);
  const spanRef7 = useRef<HTMLSpanElement>(null);
  const spanRef8 = useRef<HTMLSpanElement>(null);

  const textBlock = (
    <div className="flex flex-col items-center gap-4 text-center">
          <p className="max-w-4xl text-xl text-muted-foreground">
            In short, we create custom goods to elevate retail spaces.
          </p>
        </div>
  );

  const diagramBlock = (
        <div ref={containerRef} className="relative flex w-full flex-col items-center">
          <div className="flex w-full max-w-4xl items-center justify-between max-md:hidden">
            <div className="flex items-center gap-[7.5rem]">
              <div
                ref={iconRef1}
                className="flex size-12 items-center justify-center rounded-xl border-[1.5px] bg-background px-1.5 py-1 text-center shadow-md lg:size-[3.75rem] lg:px-2"
              >
                <span className="text-[10px] font-medium leading-tight lg:text-xs">Inspo</span>
              </div>
              <span ref={spanRef1} className="size-0.5 max-md:hidden" />
            </div>
            <div className="flex items-center gap-[7.5rem]">
              <span ref={spanRef2} className="size-0.5 max-md:hidden" />
              <div
                ref={iconRef2}
                className="flex size-12 items-center justify-center rounded-xl border-[1.5px] bg-background px-1.5 py-1 text-center shadow-md lg:size-[3.75rem] lg:px-2"
              >
                <span className="text-[10px] font-medium leading-tight lg:text-xs">Online Sales</span>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-between py-2.5">
            <div
              ref={iconRef3}
              className="flex size-[3.75rem] shrink-0 items-center justify-center rounded-xl border-[1.5px] bg-background px-2 py-1 text-center shadow-xl md:size-[4.5rem] lg:size-[5.75rem] lg:px-3"
            >
              <span className="text-xs font-medium leading-tight md:text-sm lg:text-base">Your Design Ideas</span>
            </div>
            <div className="flex items-center justify-between md:w-full md:max-w-[12rem] lg:max-w-[16rem]">
              <div className="flex w-full max-w-20 justify-between max-md:hidden">
                <span ref={spanRef3} className="size-0.5" />
                <span ref={spanRef4} className="size-0.5" />
              </div>
              <div
                ref={iconRef4}
                className="flex items-center justify-center rounded-xl border bg-background p-2"
              >
                <div className="flex size-16 items-center justify-center rounded-xl border-[1.5px] shadow-xl md:size-[5.75rem]" style={{ backgroundColor: '#ffffff' }}>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-black md:size-16">
                    <Image
                      src={ETHOS_LOGO_URL}
                      alt="Ethos logo"
                      width={64}
                      height={64}
                      className="size-10 object-contain invert md:size-16"
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full max-w-20 justify-between max-md:hidden">
                <span ref={spanRef5} className="size-0.5" />
                <span ref={spanRef6} className="size-0.5" />
              </div>
            </div>
            <div
              ref={iconRef5}
              className="flex size-[3.75rem] shrink-0 items-center justify-center rounded-xl border-[1.5px] bg-background px-2 py-1 text-center shadow-xl md:size-[4.5rem] lg:size-[5.75rem] lg:px-3"
            >
              <span className="text-xs font-medium leading-tight md:text-sm lg:text-base">In Person Sales</span>
            </div>
          </div>

          <div className="flex w-full max-w-4xl items-center justify-between max-md:hidden">
            <div className="flex items-center gap-[7.5rem]">
              <div
                ref={iconRef6}
                className="flex size-12 items-center justify-center rounded-xl border-[1.5px] bg-background px-1.5 py-1 text-center shadow-md lg:size-[3.75rem] lg:px-2"
              >
                <span className="text-[10px] font-medium leading-tight lg:text-xs">Mood Boards</span>
              </div>
              <span ref={spanRef7} className="size-0.5 max-md:hidden" />
            </div>
            <div className="flex items-center gap-[7.5rem]">
              <span ref={spanRef8} className="size-0.5 max-md:hidden" />
              <div
                ref={iconRef7}
                className="flex size-12 items-center justify-center rounded-xl border-[1.5px] bg-background px-1.5 py-1 text-center shadow-md lg:size-[3.75rem] lg:px-2"
              >
                <span className="text-[10px] font-medium leading-tight lg:text-xs">Pre Orders</span>
              </div>
            </div>
          </div>

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={iconRef1}
            toRef={spanRef1}
            gradientStartColor="var(--primary)"
            duration={4.5}
            className="-z-10 max-md:hidden"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={spanRef1}
            toRef={spanRef3}
            gradientStartColor="var(--primary)"
            duration={4.5}
            curvature={-45}
            className="-z-10 max-md:hidden"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={iconRef2}
            toRef={spanRef2}
            gradientStartColor="var(--primary)"
            duration={4.5}
            className="-z-10 max-md:hidden"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={spanRef2}
            toRef={spanRef6}
            gradientStartColor="var(--primary)"
            duration={4.5}
            curvature={-45}
            className="-z-10 max-md:hidden"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={iconRef6}
            toRef={spanRef7}
            gradientStartColor="var(--primary)"
            duration={4.5}
            className="-z-10 max-md:hidden"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={spanRef7}
            toRef={spanRef4}
            gradientStartColor="var(--primary)"
            duration={4.5}
            curvature={40}
            className="-z-10 max-md:hidden"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={iconRef7}
            toRef={spanRef8}
            gradientStartColor="var(--primary)"
            duration={4.5}
            className="-z-10 max-md:hidden"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={spanRef8}
            toRef={spanRef5}
            gradientStartColor="var(--primary)"
            duration={4.5}
            curvature={40}
            className="-z-10 max-md:hidden"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={iconRef3}
            toRef={spanRef3}
            gradientStartColor="var(--primary)"
            duration={4.5}
            className="-z-10 max-md:hidden"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={spanRef3}
            toRef={spanRef4}
            gradientStartColor="var(--primary)"
            duration={4.5}
            className="-z-10 max-md:hidden"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={spanRef4}
            toRef={iconRef4}
            gradientStartColor="var(--primary)"
            duration={4.5}
            className="-z-10 max-md:hidden"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={iconRef4}
            toRef={spanRef5}
            gradientStartColor="var(--primary)"
            duration={4.5}
            className="-z-10 max-md:hidden"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={spanRef5}
            toRef={spanRef6}
            gradientStartColor="var(--primary)"
            duration={4.5}
            className="-z-10 max-md:hidden"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={spanRef6}
            toRef={iconRef5}
            gradientStartColor="var(--primary)"
            duration={4.5}
            className="-z-10 max-md:hidden"
          />

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={iconRef3}
            toRef={iconRef4}
            gradientStartColor="var(--primary)"
            duration={4.5}
            className="-z-10 md:hidden"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={iconRef4}
            toRef={iconRef5}
            gradientStartColor="var(--primary)"
            duration={4.5}
            className="-z-10 md:hidden"
          />
        </div>
  );

  if (variant === 'textOnly') return textBlock;
  if (variant === 'diagramOnly') {
    return (
      <section className="flex-1 overflow-hidden py-8 sm:py-16 lg:py-24">
        <div className="mx-auto flex w-full flex-col items-center gap-8 px-4 sm:gap-16 sm:px-6">
          {diagramBlock}
        </div>
      </section>
    );
  }
  return (
    <section className="flex-1 overflow-hidden py-8 sm:py-16 lg:py-24">
      <div className="mx-auto flex w-full flex-col items-center gap-8 px-4 sm:gap-16 sm:px-6">
        {textBlock}
        {diagramBlock}
      </div>
    </section>
  );
};

export default HeroSection;
