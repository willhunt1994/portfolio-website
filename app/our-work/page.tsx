import Blog from '@/components/shadcn-studio/blocks/blog-component-01/blog-component-01';
import TagFilter from '@/components/shadcn-studio/blocks/blog-component-01/tag-filter';
import { getBlogCards } from '@/lib/blog-cards';
import { Suspense } from 'react';

const blogCards = getBlogCards();

export default function OurWork() {
  // Extract all unique tags from blogCards
  const allTags = Array.from(
    new Set(
      blogCards.flatMap(card => card.tags || [])
    )
  ).sort();

  return (
    <div className='flex min-h-screen flex-col relative'>
      <main className='flex flex-1 flex-col relative'>
        {/* Fade overlay - opaque behind logo, fades out */}
        <div 
          className="fixed top-0 left-0 right-0 h-32 pointer-events-none z-30"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 30%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.4) 70%, rgba(255, 255, 255, 0) 100%)'
          }}
        />
        <div 
          className="fixed top-0 left-0 right-0 h-32 pointer-events-none z-30 dark:block hidden"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.9) 30%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0) 100%)'
          }}
        />
        
        <div className="w-full px-4 sm:px-6 lg:px-8 pt-24 pb-8 md:pt-28 md:pb-12 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-wrap justify-between items-end gap-6">
            <div className="mb-[0.0625rem]">
              <div className="mb-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Our Work</h1>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400">Take a look through some of our work, and get inspired for your next project.</p>
            </div>
            <Suspense fallback={<div className="h-10 w-32 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded" />}>
              <TagFilter allTags={allTags} blogCards={blogCards} />
            </Suspense>
          </div>
        </div>

        <Suspense fallback={<div className="py-20 px-[10px] text-center">Loading...</div>}>
          <Blog blogCards={blogCards} fullWidth />
        </Suspense>
      </main>
    </div>
  );
}