import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import Blog from '@/components/shadcn-studio/blocks/blog-component-01/blog-component-01';
import BentoGrid20 from '@/components/shadcn-studio/blocks/bento-grid-20/bento-grid-20';
import Gallery from '@/components/shadcn-studio/blocks/gallery-component-09/gallery-component-09';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getBlogCards } from '@/lib/blog-cards';

const topBannerImage = 'https://cdn.shopify.com/s/files/1/0609/4752/9901/files/BF5A8725.jpg?v=1769622587';

// Gallery images for the carousel
const galleryImages = [
  'https://cdn.shopify.com/s/files/1/0609/4752/9901/files/BF5A8725.jpg?v=1769622587',
  'https://cdn.shopify.com/s/files/1/0609/4752/9901/files/Hat_FlatlaysArtboard_1.jpg?v=1769623556',
  'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-42.png',
  'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-41.png',
  'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-40.png',
  'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-39.png',
  'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-38.png',
  'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-74.png',
  'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-75.png',
  'https://cdn.shopify.com/s/files/1/0609/4752/9901/files/BF5A8725.jpg?v=1769622587',
  'https://cdn.shopify.com/s/files/1/0609/4752/9901/files/Hat_FlatlaysArtboard_1.jpg?v=1769623556',
  'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-42.png',
];

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col relative'>
      {/* Main Content */}
      <main className="flex flex-1 flex-col">
        {/* Full-width 16:9 hero image with title, subtitle and buttons overlay */}
        <section className="w-full relative aspect-[16/9] min-h-[320px] bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={topBannerImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center bg-black/30 dark:bg-black/40">
            <Badge variant="secondary" className="text-sm font-normal border-white/30 text-white bg-white/10 backdrop-blur-sm">
              What We Do
            </Badge>
            <h1 className="text-2xl font-semibold text-white drop-shadow-md sm:text-3xl lg:text-5xl lg:font-bold">
              We Make Custom Goods
            </h1>
            <p className="max-w-xl text-lg text-white/95 drop-shadow-sm sm:text-xl">
              In short, we create custom goods to elevate retail spaces.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="group rounded-lg text-base has-[>svg]:px-6 bg-white text-black hover:bg-white/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                asChild
              >
                <Link href="#">
                  Get Started <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" className="rounded-lg text-base border-white/30 bg-white/10 text-white hover:bg-white/20" asChild>
                <Link href="/catalog">Catalog</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Gallery Component */}
        <Gallery gallery={galleryImages} />

        {/* Bento Grid 20 block */}
        <BentoGrid20 />

        {/* First row of blog posts */}
        <Blog blogCards={getBlogCards().slice(0, 4)} itemsPerPage={4} fullWidth />
      </main>
    </div>
  );
}
