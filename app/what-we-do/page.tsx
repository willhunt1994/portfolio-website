import Link from 'next/link';
import Image from 'next/image';
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
                <p className="mt-2 text-base text-gray-900 font-medium">Work one to one with our team to confirm your designs</p>
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

            {/* What we can customize + 5-column grid – background #f4f4f4 */}
            <div className="col-span-full -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 pt-8 pb-6 bg-[#fefefe]">
              <div className="pt-0 pb-4">
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

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 lg:gap-2">
              <Link href="/what-we-do/socks" className="min-w-0">
                <PulseBorderCard
                  className="aspect-[4/5] min-h-0 w-full cursor-pointer"
                  videoSrc="/what-we-do/socks/Dec-2-2025-1764736121_1695151.MOV"
                >
                  <p className="text-base font-medium text-black">Socks</p>
                </PulseBorderCard>
              </Link>
              <PulseBorderCard
                className="aspect-[4/5] min-h-0 w-full"
                imageSrc="/what-we-do/Stages/DSC04186_copy.webp"
              >
                <p className="text-base font-medium text-black">Apparel</p>
              </PulseBorderCard>
              <Link href="/what-we-do/embroidery" className="min-w-0">
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
              <Link href="/what-we-do/bottles" className="min-w-0">
                <PulseBorderCard
                  className="aspect-[4/5] min-h-0 w-full cursor-pointer"
                  imageSrc="/what-we-do/Stages/8D2A9420.webp"
                >
                  <p className="text-base font-medium text-black">Bottles</p>
                </PulseBorderCard>
              </Link>
              </div>
            </div>

            {/* Corporate Teams – image extends to viewport left edge, text right */}
            <div className="col-span-full pt-8 flex flex-col md:flex-row md:items-stretch min-h-[320px] -mx-4 md:-mx-6 lg:-mx-8">
              <div className="w-full md:w-1/2 pl-0 pr-1 md:pr-2 flex-shrink-0 md:pl-0">
                <div className="relative aspect-[4/3] md:aspect-[5/4] w-full rounded-none md:rounded-r-[2px] overflow-hidden bg-gray-100">
                  <Image
                    src="https://cdn.shopify.com/s/files/1/0609/4752/9901/files/BF5A9955.jpg?v=1767384638"
                    alt="Corporate and franchise teams"
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center py-8 md:py-12 px-4 md:pl-10 md:pr-6 lg:pr-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Corporate Teams</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  We partner with corporate teams to standardize approved retail offerings to employees or franchisees.
                </p>
                <Link
                  href="/what-we-do/corporate-teams"
                  className="relative inline-block text-gray-900 font-medium w-fit group"
                >
                  <span className="relative">
                    See how we can help
                    <span className="absolute left-0 bottom-0 h-px w-full bg-current scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" aria-hidden />
                  </span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}