'use client';

import { useSearchParams, useRouter } from 'next/navigation';

interface BlogCard {
  tags?: string[];
}

interface TagFilterProps {
  allTags: string[];
  blogCards: BlogCard[];
}

export default function TagFilter({ allTags, blogCards }: TagFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedTags = searchParams.get('tags')?.split(',').filter(Boolean) || [];

  // Count posts for each tag
  const getTagCount = (tag: string) => {
    return blogCards.filter(card => card.tags && card.tags.includes(tag)).length;
  };

  const toggleTag = (tag: string) => {
    const isSelected = selectedTags.includes(tag);
    let newTags: string[];
    
    if (isSelected) {
      newTags = selectedTags.filter(t => t !== tag);
    } else {
      newTags = [...selectedTags, tag];
    }

    const params = new URLSearchParams();
    if (newTags.length > 0) {
      params.set('tags', newTags.join(','));
    }
    // Reset to page 1 when filtering
    params.set('page', '1');

    router.push(`/our-work?${params.toString()}`);
  };

  return (
    <div className="sticky top-16 z-40 py-6 px-[10px] bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-1.5">
          {allTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            const count = getTagCount(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`flex items-center gap-2 px-4 py-2 rounded-[2px] transition-colors text-sm font-medium ${
                  isSelected
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                <span>{tag}</span>
                <span className="text-xs opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
