'use client';

import Image from 'next/image';

interface CollectionHeroProps {
  backgroundImage: string;
  backgroundImageAlt: string;
  heading: string;
  subtext: string;
  viewButtonText?: string;
  galleryId?: string;
}

export default function CollectionHero({
  backgroundImage,
  backgroundImageAlt,
  heading,
  subtext,
  viewButtonText = 'VIEW GALLERY',
  galleryId = 'gallery'
}: CollectionHeroProps) {
  const scrollToGallery = () => {
    const galleryElement = document.getElementById(galleryId);
    if (galleryElement) {
      galleryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden pt-16">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={backgroundImageAlt}
          fill
          className="object-cover"
          style={{ objectPosition: 'center 70%' }}
          priority
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>
      
      {/* Content overlay */}
      <div className="relative h-full flex flex-col justify-end pb-16 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            {/* Heading and subtext */}
            <div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-2">
                {heading}
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                {subtext}
              </p>
            </div>
            
            {/* View button */}
            <button
              onClick={scrollToGallery}
              className="px-8 py-3 border border-white/50 bg-transparent text-white uppercase text-sm font-medium hover:bg-white/10 hover:border-white transition-all self-start md:self-auto"
            >
              {viewButtonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
