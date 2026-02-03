'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Gallery from '@/components/shadcn-studio/blocks/gallery-component-04/gallery-component-04';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import PinterestGallery from '@/components/shadcn-studio/blocks/pinterest-gallery/pinterest-gallery';
import CollectionHero from '@/components/shadcn-studio/blocks/collection-hero/collection-hero';
import { getWhatWeDoContent } from '@/lib/what-we-do-content';
import type { WhatWeDoGalleryHotspot, WhatWeDoAboveGalleryColumn } from '@/lib/what-we-do-content';

function ColumnMedia({ col }: { col: WhatWeDoAboveGalleryColumn }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    if (col.video && videoRef.current && !videoFailed) {
      videoRef.current.play().catch(() => setVideoFailed(true));
    }
  }, [col.video, videoFailed]);

  return (
    <div className="flex flex-col min-w-0">
      <div className="relative aspect-[4/5] w-full rounded-[2px] overflow-hidden bg-gray-100 dark:bg-gray-900 mb-4">
        {col.video && !videoFailed ? (
          <video
            ref={videoRef}
            src={col.video}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={col.image}
            className="absolute inset-0 w-full h-full object-cover"
            aria-label={col.imageAlt}
            onError={() => setVideoFailed(true)}
          />
        ) : (
          <Image
            src={col.image}
            alt={col.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
        {col.heading}
      </h3>
      {col.subheading && (
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {col.subheading}
        </p>
      )}
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {col.description}
      </p>
    </div>
  );
}

interface WhatWeDoPageClientProps {
  slug: string;
}

export function WhatWeDoPageClient({ slug }: WhatWeDoPageClientProps) {
  const content = getWhatWeDoContent(slug);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    franchiseLocations: '',
    hearAboutUs: '',
    startTimeline: '',
  });
  const [inquiryStatus, setInquiryStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [inquiryError, setInquiryError] = useState<string | null>(null);
  const handleInquiryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setInquiryForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setInquiryStatus('idle');
    setInquiryError(null);
  };
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryStatus('sending');
    setInquiryError(null);
    try {
      const res = await fetch('/api/corporate-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryForm),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setInquiryError(data.error || 'Something went wrong. Please try again.');
        setInquiryStatus('error');
        return;
      }
      setInquiryStatus('success');
      setInquiryForm({ name: '', companyName: '', email: '', phoneNumber: '', franchiseLocations: '', hearAboutUs: '', startTimeline: '' });
    } catch {
      setInquiryError('Failed to send. Please try again.');
      setInquiryStatus('error');
    }
  };

  // After success: show message briefly then reset form state so form is ready again
  useEffect(() => {
    if (inquiryStatus !== 'success') return;
    const t = setTimeout(() => {
      setInquiryStatus('idle');
      setInquiryError(null);
    }, 2500);
    return () => clearTimeout(t);
  }, [inquiryStatus]);

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
          galleryId={content.aboveGalleryColumns?.length ? 'what-we-can-do' : 'gallery-start'}
        />

        {/* Optional multi-column section above gallery (e.g. corporate-teams) – full width, 3px side padding */}
        {content.aboveGalleryColumns && content.aboveGalleryColumns.length > 0 && (
          <section id="what-we-can-do" className="scroll-mt-16 pt-4 md:pt-6 pb-12 md:pb-16 px-3 bg-white dark:bg-black w-full">
            <div className="w-full">
              {content.aboveGalleryTitle && (
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 md:mb-10 text-center">
                  {content.aboveGalleryTitle}
                </h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-5">
                {content.aboveGalleryColumns.map((col, i) => (
                  <ColumnMedia key={i} col={col} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Gallery: full-width image with hotspots, or masonry/grid */}
        <div id="gallery-start" className="scroll-mt-16">
          {content.galleryFullWidthWithHotspots ? (
            <section className="py-1 px-[10px] bg-white dark:bg-black">
              <div className="w-full max-w-none mx-auto relative">
                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] min-h-[280px] overflow-hidden rounded-[2px] bg-zinc-100 dark:bg-zinc-900">
                  <Image
                    src={content.galleryFullWidthWithHotspots.image}
                    alt={content.galleryFullWidthWithHotspots.imageAlt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                  />
                  {content.galleryFullWidthWithHotspots.hotspots.map((hotspot: WhatWeDoGalleryHotspot, i: number) => {
                    const hotspotId = `fullwidth-hotspot-${i}`;
                    return (
                      <div
                        key={hotspotId}
                        className="absolute cursor-pointer"
                        style={{
                          left: `${hotspot.x}%`,
                          top: `${hotspot.y}%`,
                          transform: 'translate(-50%, -50%)',
                          zIndex: 100,
                          pointerEvents: 'auto',
                        }}
                        onMouseEnter={() => setActiveHotspot(hotspotId)}
                        onMouseLeave={() => setActiveHotspot(null)}
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 40%, rgba(255, 255, 255, 0.4) 70%, rgba(255, 255, 255, 0) 100%)',
                            boxShadow: '0 0 8px rgba(255, 255, 255, 0.9), 0 0 16px rgba(255, 255, 255, 0.6), 0 0 24px rgba(255, 255, 255, 0.3)',
                          }}
                        />
                        {activeHotspot === hotspotId && (
                          <div
                            className="absolute bottom-full left-1/2 mb-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl p-4 -translate-x-1/2 w-72 max-w-[90vw] z-[200]"
                            onMouseEnter={() => setActiveHotspot(hotspotId)}
                            onMouseLeave={() => setActiveHotspot(null)}
                          >
                            <button
                              onClick={() => setActiveHotspot(null)}
                              className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                              aria-label="Close"
                            >
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1L11 11M11 1L1 11" /></svg>
                            </button>
                            <div className="flex gap-3">
                              {hotspot.image && (
                                <div className="relative flex-shrink-0 w-20 aspect-[4/5] rounded overflow-hidden">
                                  <Image src={hotspot.image} alt={hotspot.imageAlt || hotspot.title} fill className="object-cover" sizes="80px" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0 pr-6">
                                <h3 className="font-bold text-black dark:text-white mb-1 text-sm">{hotspot.title}</h3>
                                <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2">{hotspot.description}</p>
                                {hotspot.link && (
                                  <a href={hotspot.link} className="inline-block text-xs font-medium text-black dark:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 px-3 py-1.5 rounded transition-colors">
                                    View Details
                                  </a>
                                )}
                              </div>
                            </div>
                            <div className="absolute top-full left-1/2 -mt-1 -translate-x-1/2 w-2 h-2 bg-white dark:bg-zinc-900 border-r border-b border-zinc-200 dark:border-zinc-800 transform rotate-45" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          ) : content.galleryImages.length > 0 ? (
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

        {/* Optional bottom section: 4:5 image left (full-bleed to viewport), inquiry form right */}
        {content.bottomSection && (
          <section className="w-full pl-0 pr-4 py-12 md:py-16 md:pr-6 lg:pr-8 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
              <div className="relative w-full aspect-[4/5] max-h-[560px] md:max-h-none overflow-hidden rounded-none md:rounded-r-[2px] bg-zinc-100 dark:bg-zinc-900">
                {content.bottomSection.video ? (
                  <video
                    src={content.bottomSection.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    aria-label={content.bottomSection.imageAlt}
                  />
                ) : (
                  <Image
                    src={content.bottomSection.image}
                    alt={content.bottomSection.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>
              <div className="flex flex-col justify-center pl-4 md:pl-10 md:max-w-xl">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Get in touch</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Interested in working with us as a corporate team?</p>
                <form onSubmit={handleInquirySubmit} className="space-y-4 transition-opacity duration-300">
                  <div>
                    <Label htmlFor="inquiry-name" className="text-gray-900 dark:text-white">Name</Label>
                    <Input
                      id="inquiry-name"
                      name="name"
                      type="text"
                      value={inquiryForm.name}
                      onChange={handleInquiryChange}
                      placeholder="Your name"
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="inquiry-company" className="text-gray-900 dark:text-white">Company name</Label>
                    <Input
                      id="inquiry-company"
                      name="companyName"
                      type="text"
                      value={inquiryForm.companyName}
                      onChange={handleInquiryChange}
                      placeholder="Your company"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="inquiry-email" className="text-gray-900 dark:text-white">Email</Label>
                    <Input
                      id="inquiry-email"
                      name="email"
                      type="email"
                      value={inquiryForm.email}
                      onChange={handleInquiryChange}
                      placeholder="you@company.com"
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="inquiry-phone" className="text-gray-900 dark:text-white">Phone Number</Label>
                    <Input
                      id="inquiry-phone"
                      name="phoneNumber"
                      type="tel"
                      value={inquiryForm.phoneNumber}
                      onChange={handleInquiryChange}
                      placeholder="(555) 000-0000"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="inquiry-locations" className="text-gray-900 dark:text-white">Number of franchise locations</Label>
                    <Input
                      id="inquiry-locations"
                      name="franchiseLocations"
                      type="text"
                      inputMode="numeric"
                      value={inquiryForm.franchiseLocations}
                      onChange={handleInquiryChange}
                      placeholder="e.g. 25"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="inquiry-hear" className="text-gray-900 dark:text-white">How did you hear about us?</Label>
                    <select
                      id="inquiry-hear"
                      name="hearAboutUs"
                      value={inquiryForm.hearAboutUs}
                      onChange={handleInquiryChange}
                      className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Select...</option>
                      <option value="Search">Search</option>
                      <option value="Referral">Referral</option>
                      <option value="Social media">Social media</option>
                      <option value="Trade show or event">Trade show or event</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="inquiry-start" className="text-gray-900 dark:text-white">How soon would you like to start?</Label>
                    <select
                      id="inquiry-start"
                      name="startTimeline"
                      value={inquiryForm.startTimeline}
                      onChange={handleInquiryChange}
                      className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Select...</option>
                      <option value="ASAP">ASAP</option>
                      <option value="Within 1–3 months">Within 1–3 months</option>
                      <option value="Within 3–6 months">Within 3–6 months</option>
                      <option value="Just exploring">Just exploring</option>
                    </select>
                  </div>
                  {inquiryStatus === 'success' && (
                    <p className="text-sm text-green-600 dark:text-green-400 animate-in fade-in duration-300">
                      Thank you for your submission — we&apos;ll be in touch soon!
                    </p>
                  )}
                  {inquiryStatus === 'error' && inquiryError && (
                    <p className="text-sm text-red-600 dark:text-red-400 animate-in fade-in duration-200">
                      {inquiryError}
                    </p>
                  )}
                  <Button
                    type="submit"
                    className="w-full md:w-auto transition-all duration-200 disabled:opacity-70 disabled:cursor-wait"
                    disabled={inquiryStatus === 'sending'}
                  >
                    {inquiryStatus === 'sending' ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="size-4 rounded-full border-2 border-current border-t-transparent animate-spin" aria-hidden />
                        Sending…
                      </span>
                    ) : (
                      'Send inquiry'
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </section>
        )}

        {/* Full-width image or video with CTA – at bottom of page */}
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
