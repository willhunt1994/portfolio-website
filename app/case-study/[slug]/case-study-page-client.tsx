'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Gallery from '@/components/shadcn-studio/blocks/gallery-component-04/gallery-component-04';
import PinterestGallery from '@/components/shadcn-studio/blocks/pinterest-gallery/pinterest-gallery';
import ProductShowcase from '@/components/shadcn-studio/blocks/product-showcase/product-showcase';
import RichText from '@/components/shadcn-studio/blocks/rich-text-component/rich-text-component';
import CollectionHero from '@/components/shadcn-studio/blocks/collection-hero/collection-hero';
import ImageTextSection from '@/components/shadcn-studio/blocks/image-text-section/image-text-section';
import { getBlogCardBySlug } from '@/lib/blog-cards';
import { getCaseStudyContent } from '@/lib/case-study-content';

interface CaseStudyPageClientProps {
  slug: string;
}

export function CaseStudyPageClient({ slug }: CaseStudyPageClientProps) {
  const fallbackCard = getBlogCardBySlug(slug);
  const content = getCaseStudyContent(slug, fallbackCard);
  const minimal = content.minimalLayout === true;

  const springBarRef = useRef<HTMLDivElement>(null);
  const [springBarInView, setSpringBarInView] = useState(false);
  useEffect(() => {
    const el = springBarRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setSpringBarInView(e.isIntersecting),
      { threshold: 0.2, rootMargin: '0px 0px -20px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="flex min-h-screen flex-col relative">
      <main className={`flex flex-1 flex-col ${minimal ? 'pt-24' : ''}`}>
        {/* Hero (hidden for minimal layout) */}
        {!minimal && (
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

        {/* Optional fluid scrolling text bar */}
        {content.scrollingText && (
          <div
            ref={springBarRef}
            className={`relative w-full overflow-hidden min-h-[100px] ${springBarInView ? 'spring-bar-in-view' : ''}`}
            style={{ ['--duration' as string]: '80s' }}
          >
            <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
              <defs>
                <clipPath id="case-study-scrolling-text-wave-clip" clipPathUnits="objectBoundingBox">
                  <path d="M 0,0.2 Q 0.2,0.05 0.4,0.2 T 0.8,0.2 T 1,0.2 L 1,0.8 Q 0.8,0.95 0.6,0.8 T 0.2,0.8 T 0,0.8 Z" />
                </clipPath>
              </defs>
            </svg>
            <div
              className="relative w-full overflow-hidden py-5"
              style={{
                clipPath: 'url(#case-study-scrolling-text-wave-clip)',
                WebkitClipPath: 'url(#case-study-scrolling-text-wave-clip)',
                background: 'linear-gradient(90deg, #fce4ec 0%, #f8bbd9 18%, #e1bee7 38%, #d1c4e9 55%, #c5cae9 72%, #b3e5fc 88%, #b2dfdb 100%)',
              }}
            >
              <div className="flex w-max animate-marquee-seamless gap-6 whitespace-nowrap">
                {[...Array(2)].map((_, copy) =>
                  Array.from({ length: 12 }).map((_, i) => (
                    <span
                      key={`${copy}-${i}`}
                      className="text-lg md:text-xl font-semibold tracking-widest uppercase shrink-0"
                      style={{ color: '#5d4037' }}
                    >
                      {content.scrollingText}
                    </span>
                  ))
                )}
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-4 md:px-8" aria-hidden>
              {[
                { left: '5%', top: '-4px', size: 20, fill: '#ec407a' },
                { left: '22%', top: '50%', size: 16, fill: '#ab47bc', transform: 'translateY(-50%)' },
                { left: '38%', top: '-2px', size: 18, fill: '#7e57c2' },
                { left: '55%', top: '50%', size: 14, fill: '#5c6bc0', transform: 'translateY(-50%)' },
                { left: '72%', top: '-6px', size: 22, fill: '#42a5f5' },
                { left: '88%', top: '50%', size: 16, fill: '#26a69a', transform: 'translateY(-50%)' },
                { left: '12%', bottom: '-4px', top: 'auto', size: 14, fill: '#66bb6a' },
                { left: '48%', bottom: '-2px', top: 'auto', size: 18, fill: '#ffb74d' },
                { left: '85%', bottom: '-4px', top: 'auto', size: 16, fill: '#f48fb1' },
              ].map((pos, i) => (
                <div
                  key={i}
                  className="spring-flower absolute"
                  style={{
                    left: pos.left,
                    top: pos.top,
                    bottom: pos.bottom,
                    width: pos.size,
                    height: pos.size,
                    transform: pos.transform,
                  }}
                >
                  <svg viewBox="0 0 24 24" fill={pos.fill} className="w-full h-full drop-shadow-sm">
                    <circle cx="12" cy="12" r="2.5" fill="#fff8e1" opacity="0.95" />
                    <ellipse cx="12" cy="7" rx="3" ry="4" fill={pos.fill} opacity="0.95" />
                    <ellipse cx="12" cy="17" rx="3" ry="4" fill={pos.fill} opacity="0.95" />
                    <ellipse cx="7" cy="12" rx="4" ry="3" fill={pos.fill} opacity="0.95" />
                    <ellipse cx="17" cy="12" rx="4" ry="3" fill={pos.fill} opacity="0.95" />
                    <ellipse cx="9.2" cy="9.2" rx="3" ry="4" fill={pos.fill} opacity="0.9" transform="rotate(-45 9.2 9.2)" />
                    <ellipse cx="14.8" cy="14.8" rx="3" ry="4" fill={pos.fill} opacity="0.9" transform="rotate(-45 14.8 14.8)" />
                    <ellipse cx="14.8" cy="9.2" rx="3" ry="4" fill={pos.fill} opacity="0.9" transform="rotate(45 14.8 9.2)" />
                    <ellipse cx="9.2" cy="14.8" rx="3" ry="4" fill={pos.fill} opacity="0.9" transform="rotate(45 9.2 14.8)" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery: masonry or grid; optional shoot story (image+text) and/or "Products We Used" between rows */}
        <div id="gallery-start" className="scroll-mt-16">
          {content.galleryImages.length > 0 ? (
            content.layout === 'masonry' ? (
              <PinterestGallery
                images={content.galleryImages
                  .filter((item) => !item.testimonial && item.src)
                  .map((item) => ({ src: item.src, alt: item.alt }))}
              />
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
            <div
              className={`absolute top-0 p-6 md:p-10 flex flex-col gap-3 ${
                content.fullWidthCtaAlign === 'left' ? 'left-0 items-start' : 'right-0 items-end'
              }`}
            >
              <h4
                className={`text-xl md:text-2xl font-semibold uppercase ${
                  content.fullWidthCtaInvertColors ? 'text-gray-900' : 'text-white'
                }`}
              >
                {content.ctaTitle}
              </h4>
              <Link
                href={content.ctaButtonHref}
                className={`inline-flex w-fit items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-colors ${
                  content.fullWidthCtaInvertColors
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                }`}
              >
                {content.ctaButtonText}
              </Link>
            </div>
          </section>
        )}

        {/* Rich text CTA (only for minimal layout) */}
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
