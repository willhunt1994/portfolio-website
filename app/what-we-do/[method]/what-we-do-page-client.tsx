'use client';

import Gallery from '@/components/shadcn-studio/blocks/gallery-component-04/gallery-component-04';
import PinterestGallery from '@/components/shadcn-studio/blocks/pinterest-gallery/pinterest-gallery';
import CollectionHero from '@/components/shadcn-studio/blocks/collection-hero/collection-hero';
import { getWhatWeDoContent } from '@/lib/what-we-do-content';

interface WhatWeDoPageClientProps {
  slug: string;
}

export function WhatWeDoPageClient({ slug }: WhatWeDoPageClientProps) {
  const content = getWhatWeDoContent(slug);

  if (!content) {
    return (
      <div className="flex min-h-screen flex-col relative">
        <main className="flex flex-1 flex-col pt-24">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold">Method not found</h1>
            <p className="mt-4 text-gray-600">The customization method you're looking for doesn't exist.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col relative">
      <main className="flex flex-1 flex-col">
        {/* Full-width cover hero: image/video + title overlay */}
        <CollectionHero
          backgroundImage={content.heroBackgroundImage}
          backgroundImageAlt={content.heroBackgroundImageAlt}
          backgroundVideo={content.heroVideo}
          heading={content.heroHeading}
          subtext={content.heroSubtext}
          viewButtonText="VIEW"
          galleryId="gallery-start"
        />

        {/* Gallery: masonry or grid layout */}
        <div id="gallery-start" className="scroll-mt-16">
          {content.galleryImages.length > 0 ? (
            content.layout === 'masonry' ? (
              <PinterestGallery
                images={content.galleryImages.map((item) => ({
                  src: item.src,
                  alt: item.alt,
                  video: item.video,
                }))}
              />
            ) : (
              <Gallery galleryImage={content.galleryImages} />
            )
          ) : (
            <div className="py-12" />
          )}
        </div>

        <div className="pb-8" />

        {/* Full-width image or video with CTA */}
        <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-0">
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
            {content.fullWidthVideo ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={content.fullWidthVideo} type="video/mp4" />
              </video>
            ) : (
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${content.fullWidthImage})` }}
              />
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center px-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  {content.ctaTitle}
                </h2>
                <a
                  href={content.ctaButtonHref}
                  className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {content.ctaButtonText}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
