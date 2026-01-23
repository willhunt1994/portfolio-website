import Header from '@/components/shadcn-studio/blocks/hero-section-29/header';
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-navigation-02';
import Blog from '@/components/shadcn-studio/blocks/blog-component-01/blog-component-01';
import TagFilter from '@/components/shadcn-studio/blocks/blog-component-01/tag-filter';
import RichText from '@/components/shadcn-studio/blocks/rich-text-component/rich-text-component';
import Link from 'next/link';
import { Suspense } from 'react';

const navigationData: Navigation[] = [
  {
    title: 'What We Do',
    href: '/what-we-do'
  },
  {
    title: 'Our Work',
    href: '/our-work'
  }
];

// Helper function to generate URL-friendly slugs from titles
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const blogCardsData = [
  {
    img: 'https://drive.google.com/uc?export=view&id=1VnNs7Z0w363VEmfe3pKaC_iUWifQeDN5',
    alt: 'Script Gallery',
    title: 'Script',
    description:
      'Designed as a uniform for slower days, studio mornings, and everything in between.',
    tags: ['Merch We Made']
  },
  {
    img: 'https://drive.google.com/uc?export=view&id=1S5zI7MUI2HpabdoiMgMfgYdQnafSxb6B',
    alt: 'Spring 2026 Inspo',
    title: 'Spring 2026 Inspo',
    description:
      'Soft pastel inspo for the Spring 2026 season.',
    tags: ['Inspo']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-2.png',
    alt: 'Traditional house',
    title: 'Thane Development Plan 2026 & Master Plan',
    description:
      'Discover a unique nook in the heart of the city, offering convenience and access to attractions. Stylishly designed, it provides a comfortable retreat.',
    tags: ['Case Study']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-3.png',
    alt: 'Modern house with pool',
    title: 'What is a Property Sale Agreement?',
    description:
      'Welcome to this charming independent house bedroom, featuring a spacious layout and cozy furnishings. Enjoy abundant natural light and peaceful.',
    tags: ['Case Study']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-1.png',
    alt: 'Modern house',
    title: 'Case Study 4',
    description:
      'Experience the charm of this lovely and cozy apartment, featuring warm decor and inviting spaces, perfect for relaxation and comfort, ideal for your next getaway.',
    tags: ['Case Study']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-2.png',
    alt: 'Traditional house',
    title: 'Case Study 5',
    description:
      'Discover a unique nook in the heart of the city, offering convenience and access to attractions. Stylishly designed, it provides a comfortable retreat.',
    tags: ['Case Study', 'Merch We Made']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-3.png',
    alt: 'Modern house with pool',
    title: 'Case Study 6',
    description:
      'Welcome to this charming independent house bedroom, featuring a spacious layout and cozy furnishings. Enjoy abundant natural light and peaceful.',
    tags: ['Inspo']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-1.png',
    alt: 'Modern house',
    title: 'Case Study 7',
    description:
      'Experience the charm of this lovely and cozy apartment, featuring warm decor and inviting spaces, perfect for relaxation and comfort, ideal for your next getaway.',
    tags: ['Merch We Made']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-2.png',
    alt: 'Traditional house',
    title: 'Case Study 8',
    description:
      'Discover a unique nook in the heart of the city, offering convenience and access to attractions. Stylishly designed, it provides a comfortable retreat.',
    tags: ['Case Study']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-3.png',
    alt: 'Modern house with pool',
    title: 'Case Study 9',
    description:
      'Welcome to this charming independent house bedroom, featuring a spacious layout and cozy furnishings. Enjoy abundant natural light and peaceful.',
    tags: ['Inspo']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-1.png',
    alt: 'Modern house',
    title: 'Case Study 10',
    description:
      'Experience the charm of this lovely and cozy apartment, featuring warm decor and inviting spaces, perfect for relaxation and comfort, ideal for your next getaway.',
    tags: ['Merch We Made']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-2.png',
    alt: 'Traditional house',
    title: 'Case Study 11',
    description:
      'Discover a unique nook in the heart of the city, offering convenience and access to attractions. Stylishly designed, it provides a comfortable retreat.',
    tags: ['Case Study']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-3.png',
    alt: 'Modern house with pool',
    title: 'Case Study 12',
    description:
      'Welcome to this charming independent house bedroom, featuring a spacious layout and cozy furnishings. Enjoy abundant natural light and peaceful.',
    tags: ['Case Study', 'Inspo']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-1.png',
    alt: 'Modern house',
    title: 'Case Study 13',
    description:
      'Experience the charm of this lovely and cozy apartment, featuring warm decor and inviting spaces, perfect for relaxation and comfort, ideal for your next getaway.',
    tags: ['Inspo']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-2.png',
    alt: 'Traditional house',
    title: 'Case Study 14',
    description:
      'Discover a unique nook in the heart of the city, offering convenience and access to attractions. Stylishly designed, it provides a comfortable retreat.',
    tags: ['Merch We Made']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-3.png',
    alt: 'Modern house with pool',
    title: 'Case Study 15',
    description:
      'Welcome to this charming independent house bedroom, featuring a spacious layout and cozy furnishings. Enjoy abundant natural light and peaceful.',
    tags: ['Case Study']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-1.png',
    alt: 'Modern house',
    title: 'Case Study 16',
    description:
      'Experience the charm of this lovely and cozy apartment, featuring warm decor and inviting spaces, perfect for relaxation and comfort, ideal for your next getaway.',
    tags: ['Case Study', 'Merch We Made']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-2.png',
    alt: 'Traditional house',
    title: 'Case Study 17',
    description:
      'Discover a unique nook in the heart of the city, offering convenience and access to attractions. Stylishly designed, it provides a comfortable retreat.',
    tags: ['Inspo']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-3.png',
    alt: 'Modern house with pool',
    title: 'Case Study 18',
    description:
      'Welcome to this charming independent house bedroom, featuring a spacious layout and cozy furnishings. Enjoy abundant natural light and peaceful.',
    tags: ['Merch We Made']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-1.png',
    alt: 'Modern house',
    title: 'Case Study 19',
    description:
      'Experience the charm of this lovely and cozy apartment, featuring warm decor and inviting spaces, perfect for relaxation and comfort, ideal for your next getaway.',
    tags: ['Case Study', 'Inspo']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-2.png',
    alt: 'Traditional house',
    title: 'Case Study 20',
    description:
      'Discover a unique nook in the heart of the city, offering convenience and access to attractions. Stylishly designed, it provides a comfortable retreat.',
    tags: ['Inspo', 'Merch We Made']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-3.png',
    alt: 'Modern house with pool',
    title: 'Case Study 21',
    description:
      'Welcome to this charming independent house bedroom, featuring a spacious layout and cozy furnishings. Enjoy abundant natural light and peaceful.',
    tags: ['Case Study']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-1.png',
    alt: 'Modern house',
    title: 'Case Study 22',
    description:
      'Experience the charm of this lovely and cozy apartment, featuring warm decor and inviting spaces, perfect for relaxation and comfort, ideal for your next getaway.',
    tags: ['Merch We Made']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-2.png',
    alt: 'Traditional house',
    title: 'Case Study 23',
    description:
      'Discover a unique nook in the heart of the city, offering convenience and access to attractions. Stylishly designed, it provides a comfortable retreat.',
    tags: ['Case Study', 'Inspo']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-3.png',
    alt: 'Modern house with pool',
    title: 'Case Study 24',
    description:
      'Welcome to this charming independent house bedroom, featuring a spacious layout and cozy furnishings. Enjoy abundant natural light and peaceful.',
    tags: ['Case Study', 'Merch We Made']
  }
];

// Generate blogCards with slugs and links
const blogCards = blogCardsData.map(card => ({
  ...card,
  slug: generateSlug(card.title),
  blogLink: `/case-study/${generateSlug(card.title)}`
}));

export default function OurWork() {
  // Extract all unique tags from blogCards
  const allTags = Array.from(
    new Set(
      blogCards.flatMap(card => card.tags || [])
    )
  ).sort();

  return (
    <div className='flex min-h-screen flex-col relative'>
      <Header navigationData={navigationData} />
      
      <main className='flex flex-1 flex-col pt-20 relative'>
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
        
        {/* Breadcrumb */}
        <div className="px-[10px] pt-0 pb-4 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto">
            <nav className="text-sm text-zinc-600 dark:text-zinc-400">
              <Link href="/" className="hover:text-black dark:hover:text-white">Home</Link>
              {' > '}
              <span className="text-black dark:text-white">Our Work</span>
            </nav>
          </div>
        </div>

        <RichText 
          heading="Our Work"
          subheading="Explore our portfolio of successful projects and case studies"
          buttonText=""
        />

        <Suspense fallback={<div className="py-20 px-[10px] text-center">Loading...</div>}>
          <TagFilter allTags={allTags} blogCards={blogCards} />
          <Blog blogCards={blogCards} />
        </Suspense>
      </main>
    </div>
  );
}

