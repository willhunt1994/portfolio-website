'use client';

import Image from 'next/image';
import Link from 'next/link';

interface FeatureItem {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  cursorText: string;
  href?: string;
  description: string;
}

interface FeaturesProps {
  featuresData: FeatureItem[];
}

export default function Features({ featuresData }: FeaturesProps) {
  return (
    <section className="py-20 px-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <div key={index} className="relative">
              <div className="relative overflow-hidden rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="aspect-[4/5] relative">
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-3 text-sm">
                    {feature.subtitle}
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  {feature.href && (
                    <Link
                      href={feature.href}
                      className="inline-block bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors"
                    >
                      Check It Out
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

