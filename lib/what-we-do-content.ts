/**
 * Content config for What We Do gallery pages.
 * Similar structure to Merch We Made pages, but for customization method showcases.
 */

export type WhatWeDoGalleryImage = {
  src: string;
  alt: string;
  className?: string;
  video?: string;
};

/** Optional column for above-gallery section (corporate-teams only). */
export type WhatWeDoAboveGalleryColumn = {
  heading: string;
  /** Optional tagline/subheading below the heading. */
  subheading?: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Optional video (autoplay, loop). When set, shown instead of image. */
  video?: string;
};

/** Hotspot for full-width gallery image (x/y in %, tooltip on hover). */
export type WhatWeDoGalleryHotspot = {
  x: number;
  y: number;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  link?: string;
};

export type WhatWeDoPageContent = {
  heroBackgroundImage: string;
  heroBackgroundImageAlt: string;
  heroVideo?: string;
  heroHeading: string;
  heroSubtext: string;
  /** Optional title for the above-gallery section. */
  aboveGalleryTitle?: string;
  /** Optional multi-column section above the gallery (e.g. corporate-teams). */
  aboveGalleryColumns?: WhatWeDoAboveGalleryColumn[];
  /** Optional full-width gallery image with hotspots (replaces grid gallery when set, e.g. corporate-teams). */
  galleryFullWidthWithHotspots?: {
    image: string;
    imageAlt: string;
    hotspots: WhatWeDoGalleryHotspot[];
  };
  layout?: 'grid' | 'masonry';
  galleryImages: WhatWeDoGalleryImage[];
  fullWidthImage: string;
  fullWidthImageAlt: string;
  fullWidthVideo?: string;
  ctaTitle: string;
  ctaButtonText: string;
  ctaButtonHref: string;
  /** Optional bottom section: 4:5 image left, inquiry form right (e.g. corporate-teams). */
  bottomSection?: {
    image: string;
    imageAlt: string;
  };
};

// Bottles – content from public/what-we-do/bottles/
const bottlesBase = '/what-we-do/bottles';
const bottlesContent: WhatWeDoPageContent = {
  heroBackgroundImage: `${bottlesBase}/IMG_0464.MOV`,
  heroBackgroundImageAlt: 'Custom Bottles',
  heroVideo: `${bottlesBase}/IMG_0464.MOV`,
  heroHeading: 'CUSTOM BOTTLES',
  heroSubtext: 'Personalized water bottles and drinkware for your brand.',
  layout: 'masonry',
  galleryImages: [
    {
      src: `${bottlesBase}/IMG_0464.MOV`,
      alt: 'Custom Bottles Video',
      video: `${bottlesBase}/IMG_0464.MOV`,
    },
  ],
  fullWidthImage: `${bottlesBase}/IMG_0464.MOV`,
  fullWidthImageAlt: 'Custom Bottles',
  fullWidthVideo: `${bottlesBase}/IMG_0464.MOV`,
  ctaTitle: 'Ready to create custom bottles?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

// Embroidery – content from public/what-we-do/embroidery/
const embroideryBase = '/what-we-do/embroidery';
const embroideryFilenames = [
  '_0000s_0000_Layer%208.JPG',
  '_0000s_0001_Layer%207.JPG',
  '_0000s_0002_Layer%209.JPG',
  '_0000s_0003_Layer%206.JPG',
  '_0000s_0004_Layer%205.JPG',
  '_0000s_0005_Layer%204.JPG',
  '_0000s_0006_Layer%203.JPG',
  'Hat%20FlatlaysArtboard%202.JPG',
  'Hat%20FlatlaysArtboard%203.JPG',
];
const embroideryVideos = [
  'IMG_0304%202.MOV',
  'IMG_0717.mov',
  'IMG_1163.MOV',
  'IMG_1193.MOV',
  'IMG_1329.MOV',
];

// Mix videos throughout images for better visual flow
const embroideryGalleryImages: WhatWeDoGalleryImage[] = [
  { src: `${embroideryBase}/${embroideryFilenames[0]}`, alt: 'Embroidery 1' },
  { src: `${embroideryBase}/${embroideryFilenames[1]}`, alt: 'Embroidery 2' },
  { src: `${embroideryBase}/${embroideryFilenames[0]}`, alt: 'Embroidery Video 1', video: `${embroideryBase}/${embroideryVideos[0]}` },
  { src: `${embroideryBase}/${embroideryFilenames[2]}`, alt: 'Embroidery 3' },
  { src: `${embroideryBase}/${embroideryFilenames[3]}`, alt: 'Embroidery 4' },
  { src: `${embroideryBase}/${embroideryFilenames[0]}`, alt: 'Embroidery Video 2', video: `${embroideryBase}/${embroideryVideos[1]}` },
  { src: `${embroideryBase}/${embroideryFilenames[4]}`, alt: 'Embroidery 5' },
  { src: `${embroideryBase}/${embroideryFilenames[5]}`, alt: 'Embroidery 6' },
  { src: `${embroideryBase}/${embroideryFilenames[0]}`, alt: 'Embroidery Video 3', video: `${embroideryBase}/${embroideryVideos[2]}` },
  { src: `${embroideryBase}/${embroideryFilenames[6]}`, alt: 'Embroidery 7' },
  { src: `${embroideryBase}/${embroideryFilenames[7]}`, alt: 'Embroidery 8' },
  { src: `${embroideryBase}/${embroideryFilenames[0]}`, alt: 'Embroidery Video 4', video: `${embroideryBase}/${embroideryVideos[3]}` },
  { src: `${embroideryBase}/${embroideryFilenames[8]}`, alt: 'Embroidery 9' },
  { src: `${embroideryBase}/${embroideryFilenames[0]}`, alt: 'Embroidery Video 5', video: `${embroideryBase}/${embroideryVideos[4]}` },
];

const embroideryContent: WhatWeDoPageContent = {
  heroBackgroundImage: `${embroideryBase}/Hat%20FlatlaysArtboard%203.JPG`,
  heroBackgroundImageAlt: 'Custom Embroidery',
  heroVideo: `${embroideryBase}/IMG_0717.mov`,
  heroHeading: 'CUSTOM EMBROIDERY',
  heroSubtext: 'Premium embroidered apparel and accessories for your brand.',
  layout: 'masonry',
  galleryImages: embroideryGalleryImages,
  fullWidthImage: `${embroideryBase}/Hat%20FlatlaysArtboard%202.JPG`,
  fullWidthImageAlt: 'Custom Embroidery',
  fullWidthVideo: `${embroideryBase}/IMG_1329.MOV`,
  ctaTitle: 'Ready to create custom embroidery?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

// Puff Print – content from public/what-we-do/puff print/
const puffPrintBase = '/what-we-do/puff%20print';
const puffPrintGalleryImages: WhatWeDoGalleryImage[] = [
  {
    src: `${puffPrintBase}/IMG_0300%202.JPG`,
    alt: 'Puff Print 1',
  },
  {
    src: `${puffPrintBase}/IMG_0300%202.JPG`,
    alt: 'Puff Print Video',
    video: `${puffPrintBase}/IMG_0299%202.MOV`,
  },
];

const puffPrintContent: WhatWeDoPageContent = {
  heroBackgroundImage: `${puffPrintBase}/IMG_0300%202.JPG`,
  heroBackgroundImageAlt: 'Puff Print',
  heroVideo: `${puffPrintBase}/IMG_0299%202.MOV`,
  heroHeading: 'PUFF PRINT',
  heroSubtext: '3D puff printing for bold, textured designs.',
  layout: 'masonry',
  galleryImages: puffPrintGalleryImages,
  fullWidthImage: `${puffPrintBase}/IMG_0300%202.JPG`,
  fullWidthImageAlt: 'Puff Print',
  fullWidthVideo: `${puffPrintBase}/IMG_0299%202.MOV`,
  ctaTitle: 'Ready to create puff print designs?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

// Socks – content from public/what-we-do/socks/
const socksBase = '/what-we-do/socks';
const socksVideos = [
  'Dec-2-2025-1764736121_1695151.MOV',
  'IMG_0591.MOV',
  'IMG_0632.MOV',
  'IMG_0642.MOV',
  'IMG_0656.mov',
];

const socksGalleryImages: WhatWeDoGalleryImage[] = socksVideos.map((name, i) => ({
  src: `${socksBase}/${socksVideos[0]}`,
  alt: `Custom Socks Video ${i + 1}`,
  video: `${socksBase}/${name}`,
}));

const socksContent: WhatWeDoPageContent = {
  heroBackgroundImage: `${socksBase}/Dec-2-2025-1764736121_1695151.MOV`,
  heroBackgroundImageAlt: 'Custom Socks',
  heroVideo: `${socksBase}/Dec-2-2025-1764736121_1695151.MOV`,
  heroHeading: 'CUSTOM SOCKS',
  heroSubtext: 'Personalized socks with your unique designs and branding.',
  layout: 'masonry',
  galleryImages: socksGalleryImages,
  fullWidthImage: `${socksBase}/Dec-2-2025-1764736121_1695151.MOV`,
  fullWidthImageAlt: 'Custom Socks',
  fullWidthVideo: `${socksBase}/IMG_0591.MOV`,
  ctaTitle: 'Ready to create custom socks?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

// Corporate Teams – dedicated What We Do page
const corporateTeamsHeroImage = 'https://cdn.shopify.com/s/files/1/0609/4752/9901/files/BF5A9955.jpg?v=1767384638';
const corporateTeamsContent: WhatWeDoPageContent = {
  heroBackgroundImage: corporateTeamsHeroImage,
  heroBackgroundImageAlt: 'Corporate Teams',
  heroHeading: 'CORPORATE TEAMS',
  heroSubtext: 'We partner with corporate teams to standardize approved retail offerings to employees or franchisees.',
  aboveGalleryTitle: 'What we can do for your corporate team',
  aboveGalleryColumns: [
    {
      heading: 'Corporate Approved Retail',
      description: "Work with our design team to build collections you'd like franchisees to purchase. Final say is up to you.",
      video: '/what-we-do/corporate/corporate%20approved%20retail.mov',
      image: corporateTeamsHeroImage,
      imageAlt: 'Corporate Approved Retail',
    },
    {
      heading: 'Work with our design team',
      description: 'Work one to one with our design team to help create custom graphics and build collections',
      image: corporateTeamsHeroImage,
      imageAlt: 'Scalable fulfillment',
    },
    {
      heading: 'Recoup rebates',
      description: 'Corporate teams earn a kickback on each piece sold. All with no inventory pre purchased.',
      image: corporateTeamsHeroImage,
      imageAlt: 'Recoup rebates',
    },
    {
      heading: 'Reporting Accessible',
      description: 'Track exactly what franchisees are purchasing from your own custom dashboard.',
      image: corporateTeamsHeroImage,
      imageAlt: 'Reporting Accessible',
    },
    {
      heading: 'Pre orders',
      description: 'Offer a pre order style launch to franchisees. Works GREAT with custom socks.',
      image: corporateTeamsHeroImage,
      imageAlt: 'Pre orders',
    },
  ],
  galleryFullWidthWithHotspots: {
    image: corporateTeamsHeroImage,
    imageAlt: 'Corporate Teams',
    hotspots: [
      { x: 30, y: 40, title: 'Standardized catalog', description: 'One approved product and design set for all locations.' },
      { x: 60, y: 55, title: 'Scalable fulfillment', description: 'We scale with your program from a few locations to hundreds.' },
      { x: 75, y: 35, title: 'One point of contact', description: 'Single team for ordering, approvals, and delivery.' },
    ],
  },
  layout: 'grid',
  galleryImages: [],
  fullWidthImage: corporateTeamsHeroImage,
  fullWidthImageAlt: 'Corporate Teams',
  ctaTitle: 'Ready to work with us?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: '/corporate-franchise-teams',
  bottomSection: {
    image: corporateTeamsHeroImage,
    imageAlt: 'Corporate Teams',
  },
};

// Map slugs to content
export const whatWeDoContentBySlug: Record<string, WhatWeDoPageContent> = {
  'bottles': bottlesContent,
  'corporate-teams': corporateTeamsContent,
  'embroidery': embroideryContent,
  'puff-print': puffPrintContent,
  'socks': socksContent,
};

/**
 * Get content for a What We Do slug.
 */
export function getWhatWeDoContent(slug: string): WhatWeDoPageContent | null {
  return whatWeDoContentBySlug[slug] || null;
}
