'use client';

import { useRef } from 'react';
import { FileCodeIcon, ImportIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BorderBeam } from '@/components/ui/border-beam';
import { AnimatedBeam } from '@/components/ui/animated-beam';
import LogoVector from '@/assets/svg/logo-vector';

const ImportExport = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const btn4Ref = useRef<HTMLButtonElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);
  const span1Ref = useRef<HTMLSpanElement>(null);
  const span2Ref = useRef<HTMLSpanElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-between gap-12 px-9 max-md:flex-col md:gap-3 lg:gap-8"
    >
      <div className="flex items-center max-md:w-full max-md:flex-col max-md:gap-6">
        <div className="flex max-md:w-full max-md:justify-between md:flex-col md:gap-8">
          <div
            ref={div1Ref}
            className="bg-background flex max-md:w-full max-md:max-w-[8.375rem] items-center justify-center gap-1.25 rounded-lg border px-2 py-1.5"
          >
            <FileCodeIcon className="size-5 shrink-0" />
            <span className="font-medium">Your Design Team</span>
          </div>
          <div
            ref={div2Ref}
            className="bg-background flex max-md:w-full max-md:max-w-[8.375rem] items-center justify-center gap-1.25 rounded-lg border px-2 py-1.5"
          >
            <FileCodeIcon className="size-5 shrink-0" />
            <span className="font-medium">Ethos Design Team</span>
          </div>
        </div>
        <div className="flex items-center max-md:w-full max-md:justify-between md:flex-col md:gap-[3.6875rem]">
          <span ref={span1Ref} className="size-0.5 max-md:ml-[4.125rem]" />
          <div ref={div3Ref} className="bg-background flex items-center gap-1.25 rounded-lg border px-2 py-1.5">
            <ImportIcon className="size-5 shrink-0" />
            <span className="font-medium">Create Collections</span>
          </div>
          <span ref={span2Ref} className="size-0.5 max-md:mr-[4.125rem]" />
        </div>
      </div>

      <Button
        ref={btn4Ref}
        className="bg-primary text-primary-foreground relative flex items-center gap-1.25 rounded-lg px-2 py-1.5 text-base"
      >
        <LogoVector className="size-6" />
        <span className="font-medium [&+div]:inset-px">Our Dashboard</span>
        <BorderBeam colorFrom="var(--primary-foreground)" colorTo="var(--primary-foreground)" size={35} />
      </Button>

      <div className="flex flex-col items-center max-md:w-full max-md:gap-6 md:gap-4">
        <div
          ref={div7Ref}
          className="bg-background flex w-full max-w-[8.375rem] items-center justify-center gap-1.25 rounded-lg border px-2 py-1.5"
        >
          <FileCodeIcon className="size-5 shrink-0" />
          <span className="font-medium">Franchisees</span>
        </div>
        <div ref={div5Ref} className="bg-background flex w-full max-w-[8.375rem] items-center justify-center gap-1.25 rounded-lg border px-2 py-1.5">
          <ImportIcon className="size-5 shrink-0 rotate-180" />
          <span className="font-medium">Direct To Consumer</span>
        </div>
        <div
          ref={div6Ref}
          className="bg-background flex w-full max-w-[8.375rem] items-center justify-center gap-1.25 rounded-lg border px-2 py-1.5"
        >
          <FileCodeIcon className="size-5 shrink-0" />
          <span className="font-medium">Corporate Buying</span>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={span1Ref} className="-z-10 text-primary" duration={4} />
      <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={span2Ref} className="-z-10 max-md:hidden text-primary" duration={4} />
      <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={span2Ref} reverse className="-z-10 md:hidden text-primary" duration={4} />
      <AnimatedBeam containerRef={containerRef} fromRef={span1Ref} toRef={div3Ref} className="-z-10 text-primary" duration={4} />
      <AnimatedBeam containerRef={containerRef} fromRef={span2Ref} toRef={div3Ref} className="-z-10 max-md:hidden text-primary" duration={4} />
      <AnimatedBeam containerRef={containerRef} fromRef={span2Ref} toRef={div3Ref} reverse className="-z-10 md:hidden text-primary" duration={4} />
      <AnimatedBeam containerRef={containerRef} fromRef={div3Ref} toRef={btn4Ref} className="-z-10 text-primary" duration={4} />
      <AnimatedBeam containerRef={containerRef} fromRef={btn4Ref} toRef={div5Ref} className="-z-10 text-primary" duration={4} />
      <AnimatedBeam containerRef={containerRef} fromRef={btn4Ref} toRef={div6Ref} className="-z-10 text-primary" duration={4} />
      <AnimatedBeam containerRef={containerRef} fromRef={btn4Ref} toRef={div7Ref} className="-z-10 text-primary" duration={4} />
    </div>
  );
};

export default ImportExport;
