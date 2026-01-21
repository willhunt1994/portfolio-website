'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface BlogCard {
  img: string;
  alt: string;
  title: string;
  description: string;
  blogLink: string;
  tags?: string[];
}

interface BlogProps {
  blogCards: BlogCard[];
  itemsPerPage?: number;
}

export default function Blog({ blogCards, itemsPerPage = 12 }: BlogProps) {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const selectedTags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
  
  // Filter cards based on selected tags
  const filteredCards = selectedTags.length > 0
    ? blogCards.filter(card => 
        card.tags && card.tags.some(tag => selectedTags.includes(tag))
      )
    : blogCards;
  
  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCards = filteredCards.slice(startIndex, endIndex);

  // Helper function to build pagination URLs with tags preserved
  const buildPaginationUrl = (page: number) => {
    const params = new URLSearchParams();
    if (selectedTags.length > 0) {
      params.set('tags', selectedTags.join(','));
    }
    params.set('page', page.toString());
    return `/our-work?${params.toString()}`;
  };

  return (
    <section className="py-20 px-[10px] bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentCards.map((card, index) => (
            <Link
              key={startIndex + index}
              href={card.blogLink}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all hover:border-zinc-400 dark:hover:border-zinc-600">
                <div className="aspect-[4/5] relative">
                  <Image
                    src={card.img}
                    alt={card.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredCards.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">
              No posts found matching the selected tags.
            </p>
          </div>
        ) : (
          totalPages > 1 && (
            <div className="flex flex-col justify-center items-center gap-4 mt-12">
              <span className="px-4 py-2 text-zinc-600 dark:text-zinc-400">
                Page {currentPage} of {totalPages} {selectedTags.length > 0 && `(${filteredCards.length} results)`}
              </span>
              <div className="flex justify-center items-center gap-2">
                {currentPage > 1 && (
                  <Link
                    href={buildPaginationUrl(currentPage - 1)}
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-zinc-800 transition-colors"
                  >
                    Previous
                  </Link>
                )}
                {currentPage < totalPages && (
                  <Link
                    href={buildPaginationUrl(currentPage + 1)}
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-zinc-800 transition-colors"
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

