import CustomizationMethods from '@/components/shadcn-studio/blocks/what-we-do-section/customization-methods';
import ImageTextSection from '@/components/shadcn-studio/blocks/image-text-section/image-text-section';
import RichText from '@/components/shadcn-studio/blocks/rich-text-component/rich-text-component';
import CorporateFranchiseSection from '@/components/shadcn-studio/blocks/what-we-do-section/corporate-franchise-section';
import BentoGrid, { type BentoItem } from '@/components/shadcn-studio/blocks/bento-grid-19/bento-grid-19';

// Customize your bento grid items here - combined into one grid
const bentoItems: BentoItem[] = [
  // First row - 2 wide boxes with 4:5 aspect ratio
  {
    id: 'row1-col1',
    title: 'Be Right Back',
    description: 'Get some inspo from our latest collection',
    span: { col: 2, row: 1 },
    image: 'https://cdn.shopify.com/s/files/1/0609/4752/9901/files/BF5A8725.jpg?v=1769622587',
    imageAlt: 'Bento grid image 1',
    className: 'aspect-[4/5]',
    textPosition: 'bottom-left',
    buttonText: 'View More',
    buttonHref: '/our-work',
  },
  {
    id: 'row1-col2',
    title: 'Catalog',
    description: 'All the things we can customize',
    span: { col: 2, row: 1 },
    image: 'https://cdn.shopify.com/s/files/1/0609/4752/9901/files/Hat_FlatlaysArtboard_1.jpg?v=1769623556',
    imageAlt: 'Bento grid image 2',
    className: 'aspect-[4/5]',
    textColor: 'black',
    textPosition: 'top-left',
    buttonText: 'View Catalog',
    buttonHref: '/catalog',
  },
];

export default function WhatWeDo() {
  return (
    <div className='flex min-h-screen flex-col relative'>
      <main className='flex flex-1 flex-col'>
        <div className="container mx-auto px-4 pt-24 pb-8 md:pt-28 md:pb-12">
          <div className="mb-2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What We Do</h1>
            <p className="text-lg text-gray-600">In short, we create custom goods to elevate retail spaces</p>
          </div>
        </div>
        {/* Bento Grid - First row only */}
        <BentoGrid items={bentoItems} className="pt-4" />

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
