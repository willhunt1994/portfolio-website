'use client';

import Image from 'next/image';
import Link from 'next/link';
import Gallery from '@/components/shadcn-studio/blocks/gallery-component-04/gallery-component-04';
import PinterestGallery from '@/components/shadcn-studio/blocks/pinterest-gallery/pinterest-gallery';
import ProductShowcase from '@/components/shadcn-studio/blocks/product-showcase/product-showcase';
import RichText from '@/components/shadcn-studio/blocks/rich-text-component/rich-text-component';
import CollectionHero from '@/components/shadcn-studio/blocks/collection-hero/collection-hero';
import ImageTextSection from '@/components/shadcn-studio/blocks/image-text-section/image-text-section';
import { getBlogCardBySlug } from '@/lib/blog-cards';
import { getMerchWeMadeContent, inspoPicksBySlug, summerPicks } from '@/lib/merch-we-made-content';

interface MerchWeMadePageClientProps {
  slug: string;
}

export function MerchWeMadePageClient({ slug }: MerchWeMadePageClientProps) {
  const fallbackCard = getBlogCardBySlug(slug);
  const content = getMerchWeMadeContent(slug, fallbackCard);
  const minimal = content.minimalLayout === true;

  const inspoSlugs = [
    'spring-2026-inspo',
    'july-4th-inspo',
    'baseball-season-inspo',
    'collegiate-inspo',
    'fall-2026-inspo',
    'racing-team-inspo',
    'run-club-inspo',
    'summer-2026-inspo',
  ];
  const isInspoPage = inspoSlugs.includes(slug);
  const showCoverHero = !minimal || isInspoPage;

  return (
    <div className="flex min-h-screen flex-col relative">
      <main className={`flex flex-1 flex-col ${minimal && !isInspoPage ? 'pt-24' : ''}`}>
        {/* Title section at top (only for other minimal layout pages, not Spring 2026) */}
        {minimal && !isInspoPage && (
          <section className="w-full py-6 px-[10px] bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {content.heroHeading}
              </h1>
              <p className="mt-1 text-base md:text-lg text-zinc-600 dark:text-zinc-400">
                {content.heroSubtext}
              </p>
            </div>
          </section>
        )}

        {/* Full-width cover hero: image + title overlay + View button (all non-minimal + Spring 2026) */}
        {showCoverHero && (
          <CollectionHero
            backgroundImage={content.heroBackgroundImage}
            backgroundImageAlt={content.heroBackgroundImageAlt}
            backgroundVideo={content.heroVideo}
            heading={content.heroHeading}
            subtext={content.heroSubtext}
            viewButtonText="VIEW"
            galleryId="gallery-start"
          />
        )}

        {/* Gallery: masonry or grid; optional shoot story (image+text) and/or "Products We Used" between rows */}
        <div id="gallery-start" className="scroll-mt-16">
          {content.galleryImages.length > 0 ? (
            content.layout === 'masonry' ? (
              isInspoPage ? (() => {
                const inspoImages = content.galleryImages
                  .filter((item) => !item.testimonial && item.src)
                  .map((item) => ({ src: item.src, alt: item.alt }));
                const mid = Math.floor(inspoImages.length / 2);
                const inspoPicks = inspoPicksBySlug[slug];
                const picks = inspoPicks?.picks ?? summerPicks;
                const picksTitle = inspoPicks?.title ?? "Things we're loving";
                return (
                  <>
                    <PinterestGallery images={inspoImages.slice(0, mid)} />
                    <ProductShowcase
                      products={picks}
                      title={picksTitle}
                      backgroundColor={slug === 'spring-2026-inspo' ? '#fcfced' : undefined}
                    />
                    <PinterestGallery images={inspoImages.slice(mid)} />
                  </>
                );
              })() : (
                <PinterestGallery
                  images={content.galleryImages
                    .filter((item) => !item.testimonial && item.src)
                    .map((item) => ({ src: item.src, alt: item.alt }))}
                />
              )
            ) : content.shootStoryAfterIndex != null && content.shootStory ? (
              <>
                <Gallery galleryImage={content.galleryImages.slice(0, content.shootStoryAfterIndex)} />
                <ImageTextSection
                  imageUrl={content.shootStory.image}
                  imageAlt={content.shootStory.imageAlt}
                  heading={content.shootStory.heading}
                  text={content.shootStory.body}
                  extendImage
                  compactPadding
                  animateTextOnScroll
                />
                {content.productsBreakAfterIndex != null && content.products && content.products.length > 0 ? (
                  <>
                    <Gallery galleryImage={content.galleryImages.slice(content.shootStoryAfterIndex!, content.productsBreakAfterIndex)} />
                    <ProductShowcase products={content.products} title="Products We Used" />
                    <Gallery galleryImage={content.galleryImages.slice(content.productsBreakAfterIndex)} />
                  </>
                ) : (
                  <Gallery galleryImage={content.galleryImages.slice(content.shootStoryAfterIndex!)} />
                )}
              </>
            ) : content.productsBreakAfterIndex != null &&
              content.products &&
              content.products.length > 0 ? (
              <>
                <Gallery galleryImage={content.galleryImages.slice(0, content.productsBreakAfterIndex)} />
                <div className="py-8" />
                <ProductShowcase products={content.products} title="Products We Used" />
                <div className="py-8" />
                <Gallery galleryImage={content.galleryImages.slice(content.productsBreakAfterIndex)} />
              </>
            ) : (
              <Gallery galleryImage={content.galleryImages} />
            )
          ) : (
            <div className="py-12" />
          )}
        </div>

        <div className="pb-8" />

        {/* Products We Used (optional, when not using productsBreakAfterIndex) */}
        {content.productsBreakAfterIndex == null &&
          content.products &&
          content.products.length > 0 && (
            <ProductShowcase
              products={content.products}
              title="Products We Used"
            />
          )}

        {/* Full-width image or video with CTA (hidden for minimal layout) */}
        {!minimal && (
          <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-0">
            {content.fullWidthVideo ? (
              <video
                src={content.fullWidthVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover"
                aria-label={content.fullWidthImageAlt}
              />
            ) : (
              <Image
                src={content.fullWidthImage}
                alt={content.fullWidthImageAlt}
                width={1920}
                height={1080}
                className="w-full h-auto object-cover"
                sizes="100vw"
              />
            )}
            <div className="absolute top-0 right-0 p-6 md:p-10 flex flex-col gap-3 items-end">
              <h4 className="text-xl md:text-2xl font-semibold text-white uppercase">
                {content.ctaTitle}
              </h4>
              <Link
                href={content.ctaButtonHref}
                className="inline-flex w-fit items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors"
              >
                {content.ctaButtonText}
              </Link>
            </div>
          </section>
        )}

        {/* Rich text CTA (only for minimal layout e.g. Spring 2026 Inspo) */}
        {minimal && (
          <RichText
            heading={content.ctaTitle}
            subheading={content.heroSubtext}
            buttonText={content.ctaButtonText}
            buttonHref={content.ctaButtonHref}
          />
        )}
      </main>
    </div>
  );
}
