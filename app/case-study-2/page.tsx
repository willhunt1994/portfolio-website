import Header from '@/components/shadcn-studio/blocks/hero-section-29/header';
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-navigation-02';
import Gallery from '@/components/shadcn-studio/blocks/gallery-component-04/gallery-component-04';
import Testimonial from '@/components/shadcn-studio/blocks/testimonial-component/testimonial-component';
import RichText from '@/components/shadcn-studio/blocks/rich-text-component/rich-text-component';

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

const GalleryImageRow1And2 = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-21.png',
    alt: 'Mountain lake reflection'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-20.png',
    alt: 'Coastal mountain'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-19.png',
    alt: 'Forest path'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-18.png',
    alt: 'Mountain range'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-21.png',
    alt: 'Mountain lake reflection',
    className: 'md:col-span-2'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-20.png',
    alt: 'Coastal mountain',
    className: 'md:col-span-2'
  }
];

const GalleryImageRow3And4 = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-21.png',
    alt: 'Mountain lake reflection'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-20.png',
    alt: 'Coastal mountain'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-19.png',
    alt: 'Forest path'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-18.png',
    alt: 'Mountain range'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-21.png',
    alt: 'Mountain lake reflection'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-20.png',
    alt: 'Coastal mountain'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-19.png',
    alt: 'Forest path'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-18.png',
    alt: 'Mountain range'
  }
];

const GalleryImageRowBetween4And5 = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-21.png',
    alt: 'Mountain lake reflection',
    className: 'md:col-span-2'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-20.png',
    alt: 'Coastal mountain',
    className: 'md:col-span-2'
  }
];

const GalleryImageRow5 = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-21.png',
    alt: 'Full width landscape',
    className: 'md:col-span-4'
  }
];


export default function CaseStudy2() {
  return (
    <div className='flex min-h-screen flex-col relative'>
      <Header navigationData={navigationData} />
      
      <main className='flex flex-1 flex-col pt-32'>
        <RichText />
        <Gallery galleryImage={GalleryImageRow1And2} />
        <Testimonial />
        <Gallery galleryImage={GalleryImageRow3And4} />
        <Gallery galleryImage={GalleryImageRowBetween4And5} />
        <Gallery galleryImage={GalleryImageRow5} />
        <RichText 
          heading="Ready To Get Started?"
          subheading=""
          buttonText="Get Started"
          buttonHref="https://ethos-b2b.clickoapps.com/login"
        />
      </main>
    </div>
  );
}

