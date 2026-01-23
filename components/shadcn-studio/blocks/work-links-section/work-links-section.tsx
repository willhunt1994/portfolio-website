import Image from 'next/image';
import Link from 'next/link';

interface WorkLink {
  title: string;
  image: string;
  imageAlt: string;
  href: string;
}

interface WorkLinksSectionProps {
  workLinks: WorkLink[];
}

export default function WorkLinksSection({ workLinks }: WorkLinksSectionProps) {
  if (!workLinks || workLinks.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-[10px] bg-white dark:bg-black w-full">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workLinks.map((work, index) => (
            <Link
              key={index}
              href={work.href}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all hover:border-zinc-400 dark:hover:border-zinc-600">
                <div className="aspect-[4/5] relative">
                  <Image
                    src={work.image}
                    alt={work.imageAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
                    {work.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
