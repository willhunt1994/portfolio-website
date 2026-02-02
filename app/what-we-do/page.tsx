import Link from 'next/link';
import { ArrowConnector } from '@/components/ui/arrow-connector';
import { PulseBorderCard } from '@/components/ui/pulse-border-card';

export default function WhatWeDo() {
  return (
    <div className="flex min-h-screen flex-col relative">
      <main className="flex flex-1 flex-col">
        <div className="w-full px-4 pt-24 pb-8 md:px-6 md:pt-28 md:pb-12 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What We Do</h1>
          <p className="text-lg text-gray-600 mb-12">In short, we create custom goods to elevate retail spaces</p>
        </div>

        {/* Grid: 1 col mobile, 2 sm, 3 cols on desktop (lg+) */}
        <div className="w-full px-4 pb-12 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {/* Steps 1–3: flow with pulse connectors */}
            <div className="col-span-full sm:col-span-2 lg:col-span-3 flex flex-col sm:flex-row items-stretch gap-0 min-h-0">
              <PulseBorderCard className="min-h-[280px] flex-1 sm:flex-[2]">
                <span className="text-sm font-medium uppercase tracking-wider text-gray-400">Step 1</span>
                <p className="mt-2 text-base text-gray-900 font-medium">You have an idea about your custom merch</p>
              </PulseBorderCard>
              <ArrowConnector />
              <PulseBorderCard id="what-we-do-card-2" className="min-h-[360px] flex-1 sm:flex-[2]">
                <span className="text-sm font-medium uppercase tracking-wider text-gray-400">Step 2</span>
                <p className="mt-2 text-base text-gray-900 font-medium">Work with our team to confirm your designs</p>
              </PulseBorderCard>
              <ArrowConnector />
              <PulseBorderCard id="what-we-do-card-3" className="min-h-[320px] flex-1 sm:flex-[2]">
                <span className="text-sm font-medium uppercase tracking-wider text-gray-400">Step 3</span>
                <p className="mt-2 text-base text-gray-900 font-medium">Upload your design to a dashboard</p>
              </PulseBorderCard>
            </div>

            {/* Step 4: full-width */}
            <PulseBorderCard className="col-span-full sm:col-span-2 lg:col-span-3 min-h-[320px]">
              <span className="text-sm font-medium uppercase tracking-wider text-gray-400">Step 4</span>
              <p className="mt-2 text-base text-gray-900 font-medium md:text-lg">Delivered custom</p>
            </PulseBorderCard>

            {/* Title section: What we can customize */}
            <div className="col-span-full pt-8 pb-4">
              <h2 className="text-xl font-semibold text-gray-900 md:text-2xl">What we can customize</h2>
              <p className="mt-2 text-gray-600">
                <Link
                  href="/catalog"
                  className="relative inline-block text-primary group"
                >
                  Check out the full catalog here
                  <span
                    className="absolute left-0 bottom-0 h-px w-full bg-current scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                    aria-hidden
                  />
                </Link>
              </p>
            </div>

            {/* Socks – full-width video card */}
            <Link href="/what-we-do/socks" className="col-span-full">
              <PulseBorderCard 
                className="aspect-video min-h-0 w-full cursor-pointer"
                videoSrc="/what-we-do/socks/Dec-2-2025-1764736121_1695151.MOV"
              >
                <p className="text-base font-medium text-black">Socks</p>
              </PulseBorderCard>
            </Link>

            {/* Apparel, Headwear, Towels, Bottles – 4-column grid */}
            <div className="col-span-full grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              <PulseBorderCard
                className="aspect-[4/5] min-h-0 w-full"
                imageSrc="/what-we-do/Stages/DSC04186_copy.webp"
              >
                <p className="text-base font-medium text-black">Apparel</p>
              </PulseBorderCard>
              <Link href="/what-we-do/embroidery">
                <PulseBorderCard
                  className="aspect-[4/5] min-h-0 w-full cursor-pointer"
                  imageSrc="/what-we-do/embroidery/Hat%20FlatlaysArtboard%203.JPG"
                >
                  <p className="text-base font-medium text-black">Headwear</p>
                </PulseBorderCard>
              </Link>
              <PulseBorderCard
                className="aspect-[4/5] min-h-0 w-full"
                imageSrc="/what-we-do/Stages/towels_0000_Layer_2.webp"
              >
                <p className="text-base font-medium text-black">Towels</p>
              </PulseBorderCard>
              <Link href="/what-we-do/bottles">
                <PulseBorderCard
                  className="aspect-[4/5] min-h-0 w-full cursor-pointer"
                  imageSrc="/what-we-do/Stages/8D2A9420.webp"
                >
                  <p className="text-base font-medium text-black">Bottles</p>
                </PulseBorderCard>
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}