import Gallery from '@/components/shadcn-studio/blocks/gallery-component-04/gallery-component-04';
import RichText from '@/components/shadcn-studio/blocks/rich-text-component/rich-text-component';
import Link from 'next/link';

const navigationData: Navigation[] = [
  {
    title: 'What We Do',
    href: '/what-we-do'
  },
  {
    title: 'Our Work',
    href: '/our-work'
  },
  {
    title: 'Catalog',
    href: '/catalog'
  }
];

// Sample gallery images - you can replace these with actual images for each method
const getGalleryImages = (method: string) => {
  const baseImages = [
    {
      src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-21.png',
      alt: `${method} example 1`,
    },
    {
      src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-20.png',
      alt: `${method} example 2`,
    },
    {
      src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-19.png',
      alt: `${method} example 3`,
    },
    {
      src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-18.png',
      alt: `${method} example 4`,
    },
    {
      src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-21.png',
      alt: `${method} example 5`,
    },
    {
      src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-20.png',
      alt: `${method} example 6`,
    },
    {
      src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-19.png',
      alt: `${method} example 7`,
    },
    {
      src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-18.png',
      alt: `${method} example 8`,
    },
  ];
  return baseImages;
};

const formatMethodName = (method: string) => {
  if (!method) return '';
  return method
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toUpperCase())
    .join(' ');
};

interface PageProps {
  params: Promise<{
    method: string;
  }>;
}

export default async function CustomizationMethodPage({ params }: PageProps) {
  const { method } = await params;
  const methodName = formatMethodName(method || '');
  const galleryImages = getGalleryImages(methodName);

  return (
    <div className='flex min-h-screen flex-col relative'>
      <main className='flex flex-1 flex-col pt-20'>
        {/* Breadcrumb */}
        <div className="px-6 pt-0 pb-4 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto">
            <nav className="text-sm text-zinc-600 dark:text-zinc-400">
              <Link href="/" className="hover:text-black dark:hover:text-white">Home</Link>
              {' > '}
              <Link href="/what-we-do" className="hover:text-black dark:hover:text-white">What We Do</Link>
              {' > '}
              <span className="text-black dark:text-white">{methodName}</span>
            </nav>
          </div>
        </div>

        <RichText 
          heading={methodName}
          subheading="Explore our portfolio of work"
          buttonText=""
        />

        <Gallery galleryImage={galleryImages} />
      </main>
    </div>
  );
}
