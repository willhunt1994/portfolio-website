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

        {/* Full-width Pinterest-style grid: 2 cols sm, 3 cols lg, 4 cols xl */}
        <div className="w-full px-4 pb-12 md:px-6 lg:px-8">
          {/* Each row sums to 2 (sm), 3 (lg), 4 (xl) so every row is full */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8">
            {/* Steps 1–3: flow with pulse connectors */}
            <div className="col-span-full sm:col-span-2 lg:col-span-3 xl:col-span-4 flex flex-col sm:flex-row items-stretch gap-0 min-h-0">
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
            <PulseBorderCard className="col-span-full sm:col-span-2 lg:col-span-3 xl:col-span-4 min-h-[320px]">
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

            {/* Large 2x2 Socks card with video background */}
            <Link href="/what-we-do/socks" className="col-span-full sm:col-span-2 lg:col-span-2 xl:col-span-2">
              <PulseBorderCard 
                className="min-h-[500px] lg:min-h-[600px] cursor-pointer"
                videoSrc="/what-we-do/socks/Dec-2-2025-1764736121_1695151.MOV"
              >
                <span className="text-sm font-medium uppercase tracking-wider text-white">Featured</span>
                <p className="mt-2 text-xl text-white font-bold md:text-2xl">Socks</p>
              </PulseBorderCard>
            </Link>

            {/* Remaining cards: #9, #11–#19 (10 items) */}
            {(() => {
              const numbers = [9, 11, 12, 13, 14, 15, 16, 17, 18, 19];
              const boxes = [
                { colSpanClass: 'col-span-full sm:col-span-1 lg:col-span-1 xl:col-span-1', minHeight: 'min-h-[400px]', title: 'Apparel' },
                { colSpanClass: 'col-span-full sm:col-span-2 lg:col-span-2 xl:col-span-2', minHeight: 'min-h-[260px]', title: 'Embroidery', imageSrc: '/what-we-do/embroidery/Hat%20FlatlaysArtboard%203.JPG', link: '/what-we-do/embroidery' },
                { colSpanClass: 'col-span-full sm:col-span-2 lg:col-span-1 xl:col-span-2', minHeight: 'min-h-[320px]', title: 'Towels' },
                { colSpanClass: 'col-span-full sm:col-span-2 lg:col-span-3 xl:col-span-3', minHeight: 'min-h-[280px]', title: 'Bottles', link: '/what-we-do/bottles' },
                { colSpanClass: 'col-span-full sm:col-span-2 lg:col-span-1 xl:col-span-1', minHeight: 'min-h-[360px]', title: 'Yoga mats' },
                { colSpanClass: 'col-span-full sm:col-span-1 lg:col-span-1 xl:col-span-1', minHeight: 'min-h-[290px]', title: 'Hair clips / headbands' },
                { colSpanClass: 'col-span-full sm:col-span-1 lg:col-span-1 xl:col-span-1', minHeight: 'min-h-[330px]', title: 'Stickers' },
                { colSpanClass: 'col-span-full sm:col-span-1 lg:col-span-1 xl:col-span-1', minHeight: 'min-h-[300px]', title: 'Puff Print', link: '/what-we-do/puff-print' },
                { colSpanClass: 'col-span-full sm:col-span-1 lg:col-span-1 xl:col-span-1', minHeight: 'min-h-[350px]', title: 'Display fixtures' },
                { colSpanClass: 'col-span-full sm:col-span-1 lg:col-span-1 xl:col-span-1', minHeight: 'min-h-[380px]', title: 'Mugs' },
              ];
              return (
                <>
                  {/* #9, #11–#14 (first 5 in main grid) */}
                  {boxes.slice(0, 5).map((box, i) => {
                    const card = (
                      <PulseBorderCard 
                        key={i} 
                        className={`${box.colSpanClass} ${box.minHeight} ${box.link ? 'cursor-pointer' : ''}`}
                        imageSrc={box.imageSrc}
                      >
                        <span className={`text-sm font-medium uppercase tracking-wider ${box.imageSrc ? 'text-white' : 'text-gray-400'}`}>What we do #{numbers[i]}</span>
                        <p className={`mt-2 text-base font-medium ${box.imageSrc ? 'text-white' : 'text-gray-900'}`}>{'title' in box ? box.title : 'Add your content here.'}</p>
                      </PulseBorderCard>
                    );
                    return box.link ? (
                      <Link key={i} href={box.link} className={box.colSpanClass}>
                        {card}
                      </Link>
                    ) : card;
                  })}
                  {/* Row of 5: #15–#19 */}
                  <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
                    {boxes.slice(5, 10).map((box, j) => {
                      const card = (
                        <PulseBorderCard key={5 + j} className={`${box.minHeight} ${box.link ? 'cursor-pointer' : ''}`}>
                          <span className="text-sm font-medium uppercase tracking-wider text-gray-400">What we do #{numbers[5 + j]}</span>
                          <p className="mt-2 text-base text-gray-900 font-medium">{'title' in box ? box.title : 'Add your content here.'}</p>
                        </PulseBorderCard>
                      );
                      return box.link ? (
                        <Link key={5 + j} href={box.link}>
                          {card}
                        </Link>
                      ) : card;
                    })}
                  </div>
                </>
              );
            })()}
          </div>

          {/* Section title and subtext below the grids */}
          <div className="w-full px-4 pt-12 pb-16 md:px-6 lg:px-8">
            <h3 className="text-xl font-semibold text-gray-900 md:text-2xl mb-2">How We Can Help</h3>
            <p className="text-gray-600 mb-8">Add your subtext here.</p>
            {/* 5-column wide grid row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
              {[
                'B2B Sales',
                'DTC Sales',
                'Corporate / franchisee relationship',
                'Design',
                'Graphic creation',
              ].map((title, i) => (
                <PulseBorderCard key={i} className="min-h-[200px]">
                  <span className="text-sm font-medium uppercase tracking-wider text-gray-400">How we can help #{i + 1}</span>
                  <p className="mt-2 text-base text-gray-900 font-medium">{title}</p>
                </PulseBorderCard>
              ))}
            </div>

            {/* Duplicate: Customization methods title + grid */}
            <h3 className="text-xl font-semibold text-gray-900 md:text-2xl mb-2 mt-12">Customization methods</h3>
            <p className="text-gray-600 mb-8">Add your subtext here.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
              {[
                'B2B Sales',
                'DTC Sales',
                'Corporate / franchisee relationship',
                'Design',
                'Graphic creation',
              ].map((title, i) => (
                <PulseBorderCard key={`dup-${i}`} className="min-h-[200px]">
                  <span className="text-sm font-medium uppercase tracking-wider text-gray-400">How we can help #{i + 1}</span>
                  <p className="mt-2 text-base text-gray-900 font-medium">{title}</p>
                </PulseBorderCard>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}