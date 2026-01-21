import Header from '@/components/shadcn-studio/blocks/hero-section-29/header';
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-29/hero-section-29';
import HeroSectionImage from '@/components/shadcn-studio/blocks/hero-section-29/hero-section-image';
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-navigation-02';
import Features from '@/components/shadcn-studio/blocks/features-section-06/features-section-06';

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

const featuresData = [
  {
    title: 'Laws of Transfer of Immovable Property',
    subtitle: 'Experience the charm of this lovely and cozy apartment, featuring warm decor and inviting spaces, perfect for relaxation and comfort, ideal for your next getaway.',
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-1.png',
    imageAlt: 'Modern house',
    cursorText: 'Case Study 1',
    href: '/case-study-1',
    description: 'Experience the charm of this lovely and cozy apartment, featuring warm decor and inviting spaces, perfect for relaxation and comfort, ideal for your next getaway.'
  },
  {
    title: 'Thane Development Plan 2026 & Master Plan',
    subtitle: 'Discover a unique nook in the heart of the city, offering convenience and access to attractions. Stylishly designed, it provides a comfortable retreat.',
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-2.png',
    imageAlt: 'Traditional house',
    cursorText: 'Case Study 2',
    href: '/case-study-2',
    description: 'Discover a unique nook in the heart of the city, offering convenience and access to attractions. Stylishly designed, it provides a comfortable retreat.'
  },
  {
    title: 'What is a Property Sale Agreement?',
    subtitle: 'Welcome to this charming independent house bedroom, featuring a spacious layout and cozy furnishings. Enjoy abundant natural light and peaceful.',
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-3.png',
    imageAlt: 'Modern house with pool',
    cursorText: 'Case Study 3',
    href: '/case-study-3',
    description: 'Welcome to this charming independent house bedroom, featuring a spacious layout and cozy furnishings. Enjoy abundant natural light and peaceful.'
  },
  {
    title: 'Laws of Transfer of Immovable Property',
    subtitle: 'Experience the charm of this lovely and cozy apartment, featuring warm decor and inviting spaces, perfect for relaxation and comfort, ideal for your next getaway.',
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-1.png',
    imageAlt: 'Modern house',
    cursorText: 'Case Study 4',
    href: '/case-study-4',
    description: 'Experience the charm of this lovely and cozy apartment, featuring warm decor and inviting spaces, perfect for relaxation and comfort, ideal for your next getaway.'
  }
];

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col relative'>
      {/* Header Section */}
      <Header navigationData={navigationData} />

      {/* Main Content */}
      <main className='flex flex-1 flex-col'>
        <HeroSection />
        <Features featuresData={featuresData} />
        <HeroSectionImage />
      </main>
    </div>
  );
}
