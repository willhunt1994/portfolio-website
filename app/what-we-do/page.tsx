import Header from '@/components/shadcn-studio/blocks/hero-section-29/header';
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-navigation-02';
import HeroVideo from '@/components/shadcn-studio/blocks/what-we-do-section/hero-video';
import ProcessSteps from '@/components/shadcn-studio/blocks/what-we-do-section/process-steps';
import Testimonial from '@/components/shadcn-studio/blocks/testimonial-component/testimonial-component';
import CustomizationMethods from '@/components/shadcn-studio/blocks/what-we-do-section/customization-methods';
import ImageTextSection from '@/components/shadcn-studio/blocks/image-text-section/image-text-section';
import RichText from '@/components/shadcn-studio/blocks/rich-text-component/rich-text-component';
import CorporateFranchiseSection from '@/components/shadcn-studio/blocks/what-we-do-section/corporate-franchise-section';
import Link from 'next/link';

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

export default function WhatWeDo() {
  return (
    <div className='flex min-h-screen flex-col relative'>
      <Header navigationData={navigationData} />
      
      <main className='flex flex-1 flex-col pt-20'>
        {/* Breadcrumb */}
        <div className="px-6 pt-0 pb-4 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto">
            <nav className="text-sm text-zinc-600 dark:text-zinc-400">
              <Link href="/" className="hover:text-black dark:hover:text-white">Home</Link>
              {' > '}
              <span className="text-black dark:text-white">What We Do</span>
            </nav>
          </div>
        </div>

        {/* Hero Video Section */}
        <HeroVideo />

        {/* What We Do Process Steps */}
        <ProcessSteps />

        {/* Testimonial Section */}
        <Testimonial 
          testimonials={[
            {
              clientName: 'Client Name',
              clientPosition: 'Position At Company',
              testimonialTitle: 'Testimonial Title',
              testimonialText: 'Full testimonial'
            },
            {
              clientName: 'Client Name 2',
              clientPosition: 'Position At Company 2',
              testimonialTitle: 'Testimonial Title 2',
              testimonialText: 'Full testimonial 2'
            },
            {
              clientName: 'Client Name 3',
              clientPosition: 'Position At Company 3',
              testimonialTitle: 'Testimonial Title 3',
              testimonialText: 'Full testimonial 3'
            }
          ]}
        />

        {/* Customization Methods */}
        <CustomizationMethods 
          methods={[
            { title: 'DTF', explanation: 'Explanation' },
            { title: 'EMBROIDERY', explanation: 'Explanation' },
            { title: 'PATCHES', explanation: 'Explanation' },
            { 
              title: 'PUFF PRINT', 
              explanation: 'Explanation',
              image: '/puff-print-image.png'
            },
            { title: 'TOWELS', explanation: 'Explanation' },
            { title: 'BOTTLES', explanation: 'Explanation' },
            { title: 'HAIR CLIPS', explanation: 'Explanation' },
            { title: 'SOCKS', explanation: 'Explanation' }
          ]}
        />

        {/* Custom Dashboard & App Section */}
        <ImageTextSection
          imageUrl="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-2.png"
          imageAlt="Custom Dashboard and App"
          heading="Your Custom Dashboard & App"
          text="When you sign up, you gain access to our powerful custom dashboard and mobile app. Manage your orders, track production progress, view real-time inventory, and collaborate with our team—all from one intuitive platform. Our technology makes it easy to stay connected and in control of your custom merchandise projects."
          imagePosition="right"
        />

        {/* Ready To Make Some Merch Section */}
        <RichText 
          heading="Ready To Make Some Merch?"
          subheading="Hit the link below to get started."
          buttonText="Get Started"
          buttonHref="https://ethos-b2b.clickoapps.com/login"
        />

        {/* Corporate & Franchise Teams Section */}
        <CorporateFranchiseSection />
      </main>
    </div>
  );
}
