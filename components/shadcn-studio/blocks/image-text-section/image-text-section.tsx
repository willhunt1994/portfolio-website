import Image from 'next/image';

interface ImageTextSectionProps {
  imageUrl: string;
  imageAlt: string;
  heading?: string;
  text?: string;
  imagePosition?: 'left' | 'right';
}

export default function ImageTextSection({
  imageUrl,
  imageAlt,
  heading,
  text,
  imagePosition = 'left',
}: ImageTextSectionProps) {
  return (
    <section className="py-20 px-[10px] bg-white dark:bg-black w-full">
      <div className="max-w-7xl mx-auto">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${imagePosition === 'right' ? 'md:flex-row-reverse' : ''}`}>
          {/* Image */}
          <div className={`relative aspect-[4/3] overflow-hidden rounded-lg ${imagePosition === 'right' ? 'md:order-2' : ''}`}>
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>

          {/* Text Content */}
          <div className={`${imagePosition === 'right' ? 'md:order-1' : ''}`}>
            {heading && (
              <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
                {heading}
              </h2>
            )}
            {text && (
              <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {text}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
