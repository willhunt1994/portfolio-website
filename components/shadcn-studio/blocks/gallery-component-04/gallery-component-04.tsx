'use client';

import Image from 'next/image';

interface GalleryImage {
  src: string;
  alt: string;
  className?: string;
}

interface GalleryProps {
  galleryImage: GalleryImage[];
}

export default function Gallery({ galleryImage }: GalleryProps) {
  return (
    <section className="py-[11.56px] px-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {galleryImage.map((image, index) => {
            const isWide = image.className?.includes('col-span-2');
            const isFullWidth = image.className?.includes('col-span-4');
            return (
              <div
                key={index}
                className={`relative overflow-hidden rounded-lg ${isFullWidth ? 'aspect-[16/9]' : isWide ? 'aspect-[16/9]' : 'aspect-[4/5]'} ${image.className || ''}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

