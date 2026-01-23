import Header from '@/components/shadcn-studio/blocks/hero-section-29/header';
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-29/hero-section-29';
import HeroSectionImage from '@/components/shadcn-studio/blocks/hero-section-29/hero-section-image';
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-navigation-02';
import Features from '@/components/shadcn-studio/blocks/features-section-06/features-section-06';
import ImageTextSection from '@/components/shadcn-studio/blocks/image-text-section/image-text-section';

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
        <ImageTextSection
          imageUrl="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-2.png"
          imageAlt="Custom Dashboard and App"
          heading="Your Custom Dashboard & App"
          text="When you sign up, you gain access to our powerful custom dashboard and mobile app. Manage your orders, track production progress, view real-time inventory, and collaborate with our team—all from one intuitive platform. Our technology makes it easy to stay connected and in control of your custom merchandise projects."
          imagePosition="right"
        />
        <Features featuresData={featuresData} />
        <HeroSectionImage />
      </main>
    </div>
  );
}
