import Blog from '@/components/shadcn-studio/blocks/blog-component-01/blog-component-01';
import BentoGrid20 from '@/components/shadcn-studio/blocks/bento-grid-20/bento-grid-20';
import Gallery from '@/components/shadcn-studio/blocks/gallery-component-09/gallery-component-09';
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-25/hero-section-25';
import { getBlogCards } from '@/lib/blog-cards';

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
        {/* Hero Section 25 - main hero on load */}
        <HeroSection />

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
