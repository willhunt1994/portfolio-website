import Image from 'next/image';

interface HeroSectionImageProps {
  className?: string;
}

export default function HeroSectionImage({ className = '' }: HeroSectionImageProps) {
  return (
    <section className={`relative min-h-screen pt-32 pb-20 overflow-hidden flex items-start ${className}`}>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="https://cdn.shopify.com/s/files/1/0609/4752/9901/files/BF5A9955.jpg?v=1767384638"
          alt="Background"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>
      <div className="relative z-10 pt-0 pl-4 sm:pl-6 lg:pl-8">
        <div className="text-left max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-6 leading-tight tracking-[-0.05em]">
            Custom Socks
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
            Made from scratch with no Ethos branding, with or without grip
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              Customize
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

