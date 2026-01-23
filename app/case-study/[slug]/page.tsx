import Header from '@/components/shadcn-studio/blocks/hero-section-29/header';
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-navigation-02';
import Gallery from '@/components/shadcn-studio/blocks/gallery-component-04/gallery-component-04';
import RichText from '@/components/shadcn-studio/blocks/rich-text-component/rich-text-component';
import ProductShowcase from '@/components/shadcn-studio/blocks/product-showcase/product-showcase';
import CollectionHero from '@/components/shadcn-studio/blocks/collection-hero/collection-hero';
import ImageWithHotspots from '@/components/shadcn-studio/blocks/image-with-hotspots/image-with-hotspots';

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
    src: 'https://drive.google.com/uc?export=view&id=18oI1mAZ116w7w4Vme5CTca5Cmwg6qS7r',
    alt: 'Script Collection Image 1'
  },
  {
    src: 'https://drive.google.com/uc?export=view&id=1CmfXVqCCskuGbt0kNoR8928w0C9rp167',
    alt: 'Script Collection Image 2'
  },
  {
    src: 'https://drive.google.com/uc?export=view&id=1ouOk_b65-wn-S2eZiTnQNNBfzpFKLNyh',
    alt: 'Script Collection Image 3'
  },
  {
    src: 'https://drive.google.com/uc?export=view&id=16oqAzQGo_StXYvU7ysh41naQ5V2ae9qr',
    alt: 'Script Collection Image 4'
  },
  {
    src: 'https://drive.google.com/uc?export=view&id=1ZxrglzNla1JzAQUWHS3ZkAPp4EAXEYzp',
    alt: 'Script Collection Image 5'
  },
  {
    src: 'https://drive.google.com/uc?export=view&id=17RrOyfML7aR6CS0JOBKgCc-DpvB7bIFU',
    alt: 'Script Collection Image 6'
  },
  {
    src: 'https://drive.google.com/uc?export=view&id=17UA5hxsk1PTUacwUGsmTaqaDL8y5ZYru',
    alt: 'Script Collection Image 7'
  },
  {
    src: 'https://drive.google.com/uc?export=view&id=1qKd3HFoc6j6NrnX1LwvVZ-n_dQltRlm3',
    alt: 'Script Collection Image 8'
  },
  {
    src: 'https://drive.google.com/uc?export=view&id=1A1t3xScXoBMpwPEfHxKdnNbNHTUb94e2',
    alt: 'Script Collection Image 9'
  },
  {
    src: 'https://drive.google.com/uc?export=view&id=1Uv70Mgps4z1zOF7OYq_qjwOw6cLcfW06',
    alt: 'Script Collection Image 10'
  },
  {
    src: 'https://drive.google.com/uc?export=view&id=1Ls7MCUSYgIgE6ekdN3XoI3G1h-PPbf3C',
    alt: 'Script Collection Image 11'
  },
  {
    src: 'https://drive.google.com/uc?export=view&id=18yYJz3OiUlEZPsfwLcORCcnKfRrozYox',
    alt: 'Script Collection Image 12'
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

// Two-column images with hotspots for the script case study
const scriptHotspotImages = [
  {
    url: 'https://drive.google.com/uc?export=view&id=1A1t3xScXoBMpwPEfHxKdnNbNHTUb94e2',
    alt: 'Script Collection Customization Details - Image 1',
    hotspots: [
      // Add hotspots for first image here
      // Example:
      // {
      //   id: 'hotspot-1',
      //   x: 25, // 25% from left
      //   y: 30, // 30% from top
      //   title: 'Product Name',
      //   description: 'Customization details and style information'
      // }
    ]
  },
  {
    url: 'https://drive.google.com/uc?export=view&id=1ouOk_b65-wn-S2eZiTnQNNBfzpFKLNyh',
    alt: 'Script Collection Customization Details - Image 2',
    hotspots: [
      // Add hotspots for second image here
      // Example:
      // {
      //   id: 'hotspot-1',
      //   x: 25, // 25% from left
      //   y: 30, // 30% from top
      //   title: 'Product Name',
      //   description: 'Customization details and style information'
      // }
    ]
  }
];

const GalleryImageRow5 = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/gallery/image-21.png',
    alt: 'Full width landscape',
    className: 'md:col-span-4'
  }
];

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Products used in this shoot - customize for each case study
const scriptProducts = [
  {
    image: 'https://drive.google.com/uc?export=view&id=13s38B_ewu9fEG_AMnOIq_cvMrkaMMHtP',
    imageAlt: 'The Womens Crewneck - Bone',
    name: 'The Womens Crewneck',
    description: 'Bone'
  },
  {
    image: 'https://drive.google.com/uc?export=view&id=1FkR1Q_qfTJ0uytNfckT2NAAR56jDi5QA',
    imageAlt: 'The Womens Sweat Shorts - Bone',
    name: 'The Womens Sweat Shorts',
    description: 'Bone'
  },
  {
    image: 'https://drive.google.com/uc?export=view&id=1HqOpSpZv5edt_2vXzYc5IcUQkv8qDHwN',
    imageAlt: 'The Womens Hoodie - Clay',
    name: 'The Womens Hoodie',
    description: 'Clay'
  },
  {
    image: 'https://drive.google.com/uc?export=view&id=1WouoXB5yK7eJ3Uy9Y74v0N7qev-T8XlT',
    imageAlt: 'The Womens Sweatpants - Clay',
    name: 'The Womens Sweatpants',
    description: 'Clay'
  }
];

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  
  // Get products for this specific case study
  const products = slug === 'script' ? scriptProducts : [];
  
  return (
    <div className='flex min-h-screen flex-col relative'>
      <Header navigationData={navigationData} />
      
      <main className='flex flex-1 flex-col'>
        {slug === 'script' ? (
          <CollectionHero
            backgroundImage="https://drive.google.com/uc?export=view&id=16oqAzQGo_StXYvU7ysh41naQ5V2ae9qr"
            backgroundImageAlt="Script Collection Hero"
            heading="SCRIPT COLLECTION"
            subtext="Designed as a uniform for slower days, studio mornings, and everything in between."
            viewButtonText="VIEW"
            galleryId="gallery-start"
          />
        ) : (
          <div className="pt-32">
            <RichText />
          </div>
        )}
        <div id="gallery-start" className="scroll-mt-16">
          <Gallery galleryImage={GalleryImageRow1And2} />
        </div>
        <Gallery galleryImage={GalleryImageRow3And4} />
        {slug === 'script' ? (
          <ImageWithHotspots
            images={scriptHotspotImages}
          />
        ) : (
          <Gallery galleryImage={GalleryImageRowBetween4And5} />
        )}
        <Gallery galleryImage={GalleryImageRow5} />
        {/* Product Showcase - only shows if products are provided */}
        {products.length > 0 && (
          <ProductShowcase 
            products={products}
            title="Products We Used"
          />
        )}
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
