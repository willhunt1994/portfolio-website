import Header from '@/components/shadcn-studio/blocks/hero-section-29/header';
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-navigation-02';
import HeroVideo from '@/components/shadcn-studio/blocks/what-we-do-section/hero-video';
import ProcessSteps from '@/components/shadcn-studio/blocks/what-we-do-section/process-steps';
import Testimonial from '@/components/shadcn-studio/blocks/testimonial-component/testimonial-component';
import CustomizationMethods from '@/components/shadcn-studio/blocks/what-we-do-section/customization-methods';
import CustomSocksSection from '@/components/shadcn-studio/blocks/what-we-do-section/custom-socks-section';
import RichText from '@/components/shadcn-studio/blocks/rich-text-component/rich-text-component';
import Link from 'next/link';

const navigationData: Navigation[] = [
  {
    title: 'What We Do',
    href: '/what-we-do'
  },
  {
    title: 'Our Work',
    href: '#'
  }
];

export default function WhatWeDo() {
  return (
    <div className='flex min-h-screen flex-col relative'>
      <Header navigationData={navigationData} />
      
      <main className='flex flex-1 flex-col pt-32'>
        {/* Breadcrumb */}
        <div className="px-6 py-4 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto">
            <nav className="text-sm text-zinc-600 dark:text-zinc-400">
              <Link href="/" className="hover:text-black dark:hover:text-white">Home</Link>
              {' > '}
              <Link href="/our-work" className="hover:text-black dark:hover:text-white">Our Work</Link>
              {' > '}
              <span className="text-black dark:text-white">Solos Photos</span>
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
        <CustomizationMethods />

        {/* Custom Socks Section */}
        <CustomSocksSection />

        {/* Ready To Make Some Merch Section */}
        <RichText 
          heading="Ready To Make Some Merch?"
          subheading="Hit the link below to get started."
          buttonText="Get Started"
        />
      </main>
    </div>
  );
}
