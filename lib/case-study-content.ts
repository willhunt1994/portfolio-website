/**
 * Content config for Case Study detail pages.
 * Same template as merch-we-made/solos-pilates (hero, gallery with testimonial/video/hotspots, products, full-width CTA).
 *
 * When you add a new case study:
 * 1. Add an entry to caseStudyContentBySlug keyed by slug (e.g. 'my-client').
 * 2. Use the same shape as MerchWeMadePageContent: heroBackgroundImage, heroHeading, heroSubtext,
 *    galleryImages (with optional testimonial, video, hotspots), products (optional),
 *    fullWidthImage, ctaTitle, ctaButtonText, ctaButtonHref. Each case study has its own content.
 *
 * Asset folders: Use public/our-work/<slug>/ or public/our-work/Case Study/<Name>/ for images.
 */

import type { MerchWeMadePageContent, MerchWeMadeGalleryImage } from './merch-we-made-content';
import { getMerchWeMadeContent } from './merch-we-made-content';

// Script – full content (same gallery style as merch-we-made)
const scriptGalleryImages: MerchWeMadeGalleryImage[] = [
  { src: 'https://drive.google.com/uc?export=view&id=18oI1mAZ116w7w4Vme5CTca5Cmwg6qS7r', alt: 'Script Collection Image 1' },
  { src: 'https://drive.google.com/uc?export=view&id=1CmfXVqCCskuGbt0kNoR8928w0C9rp167', alt: 'Script Collection Image 2' },
  {
    src: 'https://drive.google.com/uc?export=view&id=1ouOk_b65-wn-S2eZiTnQNNBfzpFKLNyh',
    alt: 'Script Collection Image 3',
    hotspots: [
      {
        x: 50,
        y: 60,
        title: 'Custom Embroidery',
        description: 'Our premium embroidery service allows you to add your brand logo or custom text to any garment.',
        image: '/ethos-hoodie-hotspot.png',
        imageAlt: 'Custom Embroidery Example',
        link: '/what-we-do/embroidery',
      },
    ],
  },
  { src: 'https://drive.google.com/uc?export=view&id=16oqAzQGo_StXYvU7ysh41naQ5V2ae9qr', alt: 'Script Collection Image 4' },
  { src: 'https://drive.google.com/uc?export=view&id=1ZxrglzNla1JzAQUWHS3ZkAPp4EAXEYzp', alt: 'Script Collection Image 5' },
  { src: 'https://drive.google.com/uc?export=view&id=1A1t3xScXoBMpwPEfHxKdnNbNHTUb94e2', alt: 'Script Collection Image 9' },
  { src: 'https://drive.google.com/uc?export=view&id=17UA5hxsk1PTUacwUGsmTaqaDL8y5ZYru', alt: 'Script Collection Image 7' },
  { src: 'https://drive.google.com/uc?export=view&id=1qKd3HFoc6j6NrnX1LwvVZ-n_dQltRlm3', alt: 'Script Collection Image 8' },
  {
    src: 'https://drive.google.com/uc?export=view&id=17RrOyfML7aR6CS0JOBKgCc-DpvB7bIFU',
    alt: 'Script Collection Image 6',
    hotspots: [
      {
        x: 50,
        y: 62,
        title: 'Custom Embroidery',
        description: 'Our premium embroidery service allows you to add your brand logo or custom text to any garment.',
        image: '/ethos-hoodie-hotspot.png',
        imageAlt: 'Custom Embroidery Example',
        link: '/what-we-do/embroidery',
      },
    ],
  },
  { src: 'https://drive.google.com/uc?export=view&id=1Uv70Mgps4z1zOF7OYq_qjwOw6cLcfW06', alt: 'Script Collection Image 10' },
  { src: 'https://drive.google.com/uc?export=view&id=1Ls7MCUSYgIgE6ekdN3XoI3G1h-PPbf3C', alt: 'Script Collection Image 11' },
  { src: 'https://drive.google.com/uc?export=view&id=18yYJz3OiUlEZPsfwLcORCcnKfRrozYox', alt: 'Script Collection Image 12' },
];

const scriptContent: MerchWeMadePageContent = {
  heroBackgroundImage: 'https://drive.google.com/uc?export=view&id=16oqAzQGo_StXYvU7ysh41naQ5V2ae9qr',
  heroBackgroundImageAlt: 'Script Collection Hero',
  heroHeading: 'SCRIPT COLLECTION',
  heroSubtext: 'Designed as a uniform for slower days, studio mornings, and everything in between.',
  galleryImages: scriptGalleryImages,
  products: [
    { image: 'https://drive.google.com/uc?export=view&id=13s38B_ewu9fEG_AMnOIq_cvMrkaMMHtP', imageAlt: 'The Womens Crewneck - Bone', name: 'The Womens Crewneck', description: 'Bone' },
    { image: 'https://drive.google.com/uc?export=view&id=1FkR1Q_qfTJ0uytNfckT2NAAR56jDi5QA', imageAlt: 'The Womens Sweat Shorts - Bone', name: 'The Womens Sweat Shorts', description: 'Bone' },
    { image: 'https://drive.google.com/uc?export=view&id=1HqOpSpZv5edt_2vXzYc5IcUQkv8qDHwN', imageAlt: 'The Womens Hoodie - Clay', name: 'The Womens Hoodie', description: 'Clay' },
    { image: 'https://drive.google.com/uc?export=view&id=1WouoXB5yK7eJ3Uy9Y74v0N7qev-T8XlT', imageAlt: 'The Womens Sweatpants - Clay', name: 'The Womens Sweatpants', description: 'Clay' },
    { image: 'https://drive.google.com/uc?export=view&id=1JiXpbd-fKkFQtudWuNl-V3HtlwDITs9W', imageAlt: 'The Mens Sweat Shorts - Heather', name: 'The Mens Sweat Shorts', description: 'Heather' },
  ],
  fullWidthImage: '/our-work/Script/395A5059.jpg',
  fullWidthImageAlt: 'Script collection',
  ctaTitle: 'Ready to create something?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

// Helios – luxury Pilates studio, Little Italy San Diego (images from public/our-work/Case Study/Helios/)
const heliosBase = '/our-work/Case%20Study/Helios';
const heliosImageFilenames = [
  '8D2A9648.jpg',
  '8D2A9653.jpg',
  '8D2A9670.jpg',
  '8D2A9682.jpg',
  '8D2A9694.jpg',
  '8D2A9707.jpg',
  '8D2A9710.jpg',
  '8D2A9712.jpg',
  '8D2A9720.jpg',
  '8D2A9725.jpg',
  '8D2A9736.jpg',
];
const heliosVideoFilenames = ['IMG_3614.MOV', 'IMG_3615.MOV', 'IMG_3623.MOV', 'IMG_3637.MOV', 'IMG_3643.MOV'];
// Mixed order: images and videos interleaved (IMG_3623, 8D2A9712, 8D2A9720, IMG_3614 removed)
const heliosGalleryOrder: Array<{ type: 'image'; i: number } | { type: 'video'; i: number }> = [
  { type: 'image', i: 0 },
  { type: 'video', i: 4 },
  { type: 'image', i: 1 },
  { type: 'image', i: 2 },
  { type: 'video', i: 1 },
  { type: 'image', i: 3 },
  { type: 'image', i: 4 },
  { type: 'image', i: 5 },
  { type: 'image', i: 6 },
  { type: 'video', i: 3 },
  { type: 'image', i: 9 },
  { type: 'image', i: 10 },
];
const heliosGalleryImages: MerchWeMadeGalleryImage[] = heliosGalleryOrder.map((item, idx) => {
  if (item.type === 'image') {
    const name = heliosImageFilenames[item.i];
    return { src: `${heliosBase}/${name}`, alt: `Helios ${idx + 1}` };
  }
  const name = heliosVideoFilenames[item.i];
  return {
    src: `${heliosBase}/${heliosImageFilenames[0]}`,
    alt: `Helios video ${idx + 1}`,
    video: `${heliosBase}/${name}`,
  };
});

const heliosContent: MerchWeMadePageContent = {
  heroBackgroundImage: `${heliosBase}/8D2A9712.jpg`,
  heroBackgroundImageAlt: 'Helios – luxury Pilates studio Little Italy San Diego',
  heroHeading: 'HELIOS',
  heroSubtext: 'A luxury Pilates studio in the heart of Little Italy, San Diego.',
  galleryImages: heliosGalleryImages,
  productsBreakAfterIndex: 8,
  products: [
    { image: `${heliosBase}/8D2A9653.jpg`, imageAlt: 'Helios product 1', name: 'Product 1', description: 'Edit in case-study-content.ts' },
    { image: `${heliosBase}/8D2A9670.jpg`, imageAlt: 'Helios product 2', name: 'Product 2', description: 'Edit in case-study-content.ts' },
    { image: `${heliosBase}/8D2A9682.jpg`, imageAlt: 'Helios product 3', name: 'Product 3', description: 'Edit in case-study-content.ts' },
  ],
  fullWidthImage: `${heliosBase}/8D2A9720.jpg`,
  fullWidthImageAlt: 'Helios',
  ctaTitle: 'Ready to create something?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

// Cymbiotika – images from public/our-work/Case Study/Cymbiotika/
const cymbiotikaBase = '/our-work/Case%20Study/Cymbiotika';
const cymbiotikaFilenames = [
  '395A8520.jpg', '395A8529.jpg', '395A8535.jpg', '395A8544.jpg', '395A8548.jpg', '395A8555.jpg',
  '395A8563.jpg', '395A8568.jpg', '395A8594.jpg', '395A8644.jpg', '395A8676.jpg', '395A8836.jpg',
];
const cymbiotikaGalleryImages: MerchWeMadeGalleryImage[] = cymbiotikaFilenames.map((name, i) => ({
  src: `${cymbiotikaBase}/${name}`,
  alt: `Cymbiotika ${i + 1}`,
}));
const cymbiotikaContent: MerchWeMadePageContent = {
  heroBackgroundImage: `${cymbiotikaBase}/395A8520.jpg`,
  heroBackgroundImageAlt: 'Cymbiotika',
  heroHeading: 'CYMBIOTIKA',
  heroSubtext: 'Premium supplements and wellness brand – custom merch that fits the brand.',
  galleryImages: cymbiotikaGalleryImages,
  productsBreakAfterIndex: 6,
  products: [
    { image: `${cymbiotikaBase}/395A8535.jpg`, imageAlt: 'Cymbiotika product', name: 'Product', description: 'Edit in case-study-content.ts' },
    { image: `${cymbiotikaBase}/395A8544.jpg`, imageAlt: 'Cymbiotika product', name: 'Product', description: 'Edit in case-study-content.ts' },
    { image: `${cymbiotikaBase}/395A8548.jpg`, imageAlt: 'Cymbiotika product', name: 'Product', description: 'Edit in case-study-content.ts' },
  ],
  fullWidthImage: `${cymbiotikaBase}/395A8836.jpg`,
  fullWidthImageAlt: 'Cymbiotika',
  ctaTitle: 'Ready to create something?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

// Katie Austin Workout Tour – images from public/our-work/Case Study/Katie Austin Workout Tour/
const katieAustinBase = '/our-work/Case%20Study/Katie%20Austin%20Workout%20Tour';
// Order: first 4 in top gallery row, then products, then bottom row (6 + 395A6367, 395A6576 moved to end)
const katieAustinFilenamesOrdered = [
  '395A6334.jpg', '395A6350.jpg', '395A6359.jpg', '395A6361.jpg',
  '395A6666.jpg', '395A6788.jpg', '395A6901.jpg', '395A7440.jpg', '395A7540.jpg', '395A7544.jpg',
  '395A6367.jpg', '395A6576.jpg',
];
const katieAustinGalleryImages: MerchWeMadeGalleryImage[] = katieAustinFilenamesOrdered.map((name, i) => ({
  src: `${katieAustinBase}/${name}`,
  alt: `Katie Austin Workout Tour ${i + 1}`,
}));
const katieAustinContent: MerchWeMadePageContent = {
  heroBackgroundImage: `${katieAustinBase}/395A6334.jpg`,
  heroBackgroundImageAlt: 'Katie Austin Workout Tour',
  heroHeading: 'KATIE AUSTIN WORKOUT TOUR',
  heroSubtext: 'We printed custom tees for the Katie Austin Workout Tour.',
  galleryImages: katieAustinGalleryImages,
  productsBreakAfterIndex: 4,
  productsSectionTitle: 'The Tee We Used',
  products: [
    {
      image: `${katieAustinBase}/395A0327.webp`,
      imageAlt: 'The Mens Tee - White',
      images: [
        { src: `${katieAustinBase}/395A0327.webp`, alt: 'The Mens Tee - White (front)' },
        { src: `${katieAustinBase}/395A0328.webp`, alt: 'The Mens Tee - White (back)' },
      ],
      name: 'The Mens Tee',
      color: 'White',
      description: 'The tee we printed for the Katie Austin Workout Tour.',
    },
  ],
  fullWidthImage: `${katieAustinBase}/bottom%20banner%20-%20ka.jpg`,
  fullWidthImageAlt: 'Katie Austin Workout Tour',
  ctaTitle: 'Ready to create something?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

// The Glow Morning – images from public/our-work/Case Study/The Glow Morning/
const glowMorningBase = '/our-work/Case%20Study/The%20Glow%20Morning';
const glowMorningFilenames = [
  'FB2A0865.jpg', 'FB2A0878.jpg', 'FB2A0879.jpg', 'FB2A0913.jpg', 'FB2A0914.jpg', 'FB2A0974.jpg',
  'FB2A0978.jpg', 'FB2A1015.jpg', 'FB2A1020-Enhanced-NR.jpg', 'FB2A1024-Enhanced-NR.jpg', 'FB2A1029.jpg', 'FB2A1031.jpg',
  'FB2A1034.jpg', 'FB2A1038.jpg', 'FB2A1045.jpg', 'FB2A1054.jpg', 'FB2A1068.jpg', 'FB2A1112.jpg',
  'FB2A1116.jpg', 'FB2A1125.jpg', 'FB2A1192-Enhanced-NR.jpg', 'FB2A1199-Enhanced-NR.jpg', 'FB2A1203.jpg', 'FB2A1276-Enhanced-NR.jpg',
  'FB2A1405-Enhanced-NR.jpg', 'FB2A1454-Enhanced-NR.jpg', 'FB2A1481-Enhanced-NR.jpg', 'FB2A1512-Enhanced-NR.jpg', 'FB2A1529.jpg',
  'FB2A1619-Enhanced-NR.jpg', 'FB2A1627-Enhanced-NR.jpg', 'FB2A1648.jpg',
];
const glowMorningGalleryImages: MerchWeMadeGalleryImage[] = glowMorningFilenames.map((name, i) => ({
  src: `${glowMorningBase}/${encodeURIComponent(name)}`,
  alt: `The Glow Morning ${i + 1}`,
}));
const glowMorningContent: MerchWeMadePageContent = {
  heroBackgroundImage: `${glowMorningBase}/FB2A0865.jpg`,
  heroBackgroundImageAlt: 'The Glow Morning',
  heroHeading: 'THE GLOW MORNING',
  heroSubtext: 'Morning wellness and lifestyle brand – merch that brings the glow.',
  galleryImages: glowMorningGalleryImages,
  productsBreakAfterIndex: 8,
  products: [
    { image: `${glowMorningBase}/FB2A0878.jpg`, imageAlt: 'The Glow Morning product', name: 'Product', description: 'Edit in case-study-content.ts' },
    { image: `${glowMorningBase}/FB2A0879.jpg`, imageAlt: 'The Glow Morning product', name: 'Product', description: 'Edit in case-study-content.ts' },
    { image: `${glowMorningBase}/FB2A0913.jpg`, imageAlt: 'The Glow Morning product', name: 'Product', description: 'Edit in case-study-content.ts' },
  ],
  fullWidthImage: `${glowMorningBase}/FB2A1648.jpg`,
  fullWidthImageAlt: 'The Glow Morning',
  ctaTitle: 'Ready to create something?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

// Activate House – images + videos from public/our-work/Case Study/Activate House/
const activateHouseBase = '/our-work/Case%20Study/Activate%20House';
const activateHouseImageFilenames = [
  'IMG_3749.JPG', 'IMG_3758.JPG', 'IMG_3780.JPG', 'IMG_3784.JPG', 'IMG_3798.JPG', 'IMG_3799.JPG', 'IMG_3801.JPG', 'IMG_3808.JPG',
];
const activateHouseVideoFilenames = ['IMG_3718.MOV', 'IMG_3733.MOV', 'IMG_3766.MOV', 'IMG_3811.MOV'];
const activateHouseGalleryOrder: Array<{ type: 'image'; i: number } | { type: 'video'; i: number }> = [
  { type: 'image', i: 0 },
  { type: 'video', i: 0 },
  { type: 'image', i: 1 },
  { type: 'image', i: 2 },
  { type: 'video', i: 1 },
  { type: 'image', i: 3 },
  { type: 'image', i: 4 },
  { type: 'video', i: 2 },
  { type: 'image', i: 5 },
  { type: 'image', i: 6 },
  { type: 'video', i: 3 },
  { type: 'image', i: 7 },
];
const activateHouseGalleryImages: MerchWeMadeGalleryImage[] = activateHouseGalleryOrder.map((item, idx) => {
  if (item.type === 'image') {
    const name = activateHouseImageFilenames[item.i];
    return { src: `${activateHouseBase}/${name}`, alt: `Activate House ${idx + 1}` };
  }
  const name = activateHouseVideoFilenames[item.i];
  return {
    src: `${activateHouseBase}/${activateHouseImageFilenames[0]}`,
    alt: `Activate House video ${idx + 1}`,
    video: `${activateHouseBase}/${name}`,
  };
});
const activateHouseContent: MerchWeMadePageContent = {
  heroBackgroundImage: `${activateHouseBase}/IMG_3749.JPG`,
  heroBackgroundImageAlt: 'Activate House',
  heroHeading: 'ACTIVATE HOUSE',
  heroSubtext: 'Custom merch to elevate the brand experience for Activate House in San Diego.',
  galleryImages: activateHouseGalleryImages,
  fullWidthImage: `${activateHouseBase}/IMG_3749.JPG`,
  fullWidthImageAlt: 'Activate House',
  fullWidthVideo: `${activateHouseBase}/IMG_3791.MOV`,
  ctaTitle: 'Ready to create something?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

// Pilates Leucadia – images from public/our-work/Case Study/Pilates Leucadia/
const pilatesLeucadiaBase = '/our-work/Case%20Study/Pilates%20Leucadia';
const pilatesLeucadiaFilenames = [
  'DSC04159_copy.webp', 'DSC04165_copy.webp', 'DSC04186_copy.webp',
  'DSC04191_copy.webp',
];
const pilatesLeucadiaImageItems: MerchWeMadeGalleryImage[] = pilatesLeucadiaFilenames.map((name, i) => ({
  src: `${pilatesLeucadiaBase}/${name}`,
  alt: `Pilates Leucadia ${i + 1}`,
}));
const pilatesLeucadiaTestimonialItem: MerchWeMadeGalleryImage = {
  src: '',
  alt: '',
  className: 'md:col-span-4',
  testimonial: {
    author: 'Samantha Holmen',
    role: 'CEO / Janitor',
    avatar: `${pilatesLeucadiaBase}/Screenshot%202026-02-02%20at%2007.46.40.png`,
    avatarAlt: 'Samantha Holmen',
    quote: 'I highly recommend working with Ethos',
    body: 'Collaborating with Ethos has been a delightfully seamless experience (pun intended).\n\nTheir exceptional communication skills and sense of urgency have made our partnership not only productive but also enjoyable.\n\nI highly recommend working with Ethos for their outstanding professionalism and efficiency.',
    image: `${pilatesLeucadiaBase}/IMG_7314.jpeg`,
    imageAlt: 'Pilates Leucadia',
    buttonText: 'Check Out More From Pilates Leucadia Here',
    buttonHref: 'https://pilatesleucadia.com/',
  },
};
const pilatesLeucadiaGalleryImages: MerchWeMadeGalleryImage[] = [
  pilatesLeucadiaTestimonialItem,
  ...pilatesLeucadiaImageItems,
];
const pilatesLeucadiaContent: MerchWeMadePageContent = {
  heroBackgroundImage: `${pilatesLeucadiaBase}/DSC04203_copy.webp`,
  heroBackgroundImageAlt: 'Pilates Leucadia',
  heroHeading: 'PILATES LEUCADIA',
  heroSubtext: 'Boutique pilates studio in Leucadia – custom apparel and merchandise.',
  galleryImages: pilatesLeucadiaGalleryImages,
  fullWidthImage: `${pilatesLeucadiaBase}/DSC04193_copy.webp`,
  fullWidthImageAlt: 'Pilates Leucadia',
  ctaTitle: 'Ready to create something?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

// Bodyrok – images from public/our-work/Case Study/Bodyrok/
const bodyrokBase = '/our-work/Case%20Study/Bodyrok';
const bodyrokFilenames = [
  'DSC04223_copy.webp', 'DSC04228_copy.webp', 'DSC04231_copy.webp', 'DSC04237_copy.webp',
];
const bodyrokImageItems: MerchWeMadeGalleryImage[] = bodyrokFilenames.map((name, i) => ({
  src: `${bodyrokBase}/${name}`,
  alt: `Bodyrok ${i + 1}`,
}));
const bodyrokTestimonialItem: MerchWeMadeGalleryImage = {
  src: '',
  alt: '',
  className: 'md:col-span-4',
  testimonial: {
    author: 'Stephany Erlbeck',
    role: 'Owner, Bodyrok San Diego',
    avatar: `${bodyrokBase}/Screenshot%202026-02-02%20at%2007.58.03.png`,
    avatarAlt: 'Stephany Erlbeck',
    quote: "The customer service and attention to design details are the best I've seen!",
    body: "We used to carry several Athleisure wear lines but after partnering with Ethos, we quickly realized that our clients & instructors couldn't get enough of our collab.\n\nWe now only carry BODYROK branded Ethos merchandise and the quality, fit, and price is SO good.\n\nThe customer service and attention to design details are the best I've seen!",
    image: `${bodyrokBase}/DSC04240_copy.webp`,
    imageAlt: 'Bodyrok',
  },
};
const bodyrokGalleryImages: MerchWeMadeGalleryImage[] = [
  bodyrokTestimonialItem,
  ...bodyrokImageItems,
];
const bodyrokContent: MerchWeMadePageContent = {
  heroBackgroundImage: `${bodyrokBase}/DSC04247_copy.webp`,
  heroBackgroundImageAlt: 'Bodyrok',
  heroHeading: 'BODYROK',
  heroSubtext: 'We supply Bodyrok, at a corporate level, with merch and grip socks for 50+ locations across the US.',
  galleryImages: bodyrokGalleryImages,
  fullWidthImage: `${bodyrokBase}/DSC04245_copy.webp`,
  fullWidthImageAlt: 'Bodyrok',
  fullWidthCtaAlign: 'left',
  fullWidthCtaInvertColors: true,
  ctaTitle: 'Ready to create something?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

/** Content keyed by slug. Add entries here for each Case Study page. */
export const caseStudyContentBySlug: Record<string, MerchWeMadePageContent> = {
  script: scriptContent,
  helios: heliosContent,
  cymbiotika: cymbiotikaContent,
  'katie-austin-workout-tour': katieAustinContent,
  'the-glow-morning': glowMorningContent,
  'activate-house': activateHouseContent,
  'pilates-leucadia': pilatesLeucadiaContent,
  bodyrok: bodyrokContent,
};

const defaultCta = {
  ctaTitle: 'Ready to create something?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

/**
 * Get template content for a case study slug. Same shape as merch-we-made (solos-pilates style).
 * For 'solos-pilates', uses merch-we-made content (including testimonial/shuffle) so both routes match.
 * If no custom content exists, returns fallback built from blog card data.
 */
export function getCaseStudyContent(
  slug: string,
  fallback: { title: string; description: string; img: string; alt?: string } | null
): MerchWeMadePageContent {
  // Use merch-we-made content for solos-pilates so /case-study/solos-pilates matches /merch-we-made/solos-pilates
  if (slug === 'solos-pilates') {
    return getMerchWeMadeContent(slug, fallback);
  }

  const custom = caseStudyContentBySlug[slug];
  if (custom) {
    if (fallback?.img) {
      return { ...custom, heroBackgroundImage: fallback.img, heroBackgroundImageAlt: fallback.alt ?? fallback.title };
    }
    return custom;
  }

  const title = fallback?.title ?? slug;
  const description = fallback?.description ?? '';
  const img = fallback?.img ?? '/our-work/Script/395A5059.jpg';

  return {
    heroBackgroundImage: img,
    heroBackgroundImageAlt: title,
    heroHeading: title.toUpperCase(),
    heroSubtext: description,
    galleryImages: [],
    fullWidthImage: img,
    fullWidthImageAlt: title,
    ...defaultCta,
  };
}
