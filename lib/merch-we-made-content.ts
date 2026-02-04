/**
 * Content config for Merch We Made detail pages.
 * Same template structure for every slug; content varies per slug.
 * Add or edit entries here to customize each merch-we-made page.
 *
 * Asset folders: For each merch-we-made post, use a folder under public/our-work/
 * named after the slug (e.g. public/our-work/script/, public/our-work/case-study-6/).
 * Put that post’s images there and reference them as /our-work/<slug>/filename.jpg
 */

/** Deterministic shuffle using a string seed (same seed => same order; fixes hydration). */
function shuffleWithSeed<T>(arr: T[], seed: string): T[] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i) | 0;
  }
  const random = () => {
    h = (h * 1664525 + 1013904223) >>> 0;
    return h / 2 ** 32;
  };
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export type MerchWeMadeGalleryImage = {
  src: string;
  alt: string;
  className?: string;
  /** Optional video (autoplay, loop). When set, rendered instead of image in gallery. */
  video?: string;
  /** Optional testimonial card (full-width row). When set, rendered instead of image/video. */
  testimonial?: {
    author: string;
    role?: string;
    /** Optional circular profile picture above author name */
    avatar?: string;
    avatarAlt?: string;
    quote: string;
    body?: string;
    image?: string;
    imageAlt?: string;
    /** Optional button below the body (e.g. "Check out more from Pilates Leucadia here") */
    buttonText?: string;
    buttonHref?: string;
  };
  hotspots?: Array<{
    x: number;
    y: number;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    link?: string;
  }>;
};

export type MerchWeMadeProduct = {
  image: string;
  imageAlt: string;
  /** Optional multiple images per product (e.g. front/back). When length > 1, shown as carousel. */
  images?: Array<{ src: string; alt: string }>;
  name: string;
  /** Optional color/variant label (e.g. "White", "Beige"). Shown on single-product layout. */
  color?: string;
  description: string;
};

export type MerchWeMadePageContent = {
  heroBackgroundImage: string;
  heroBackgroundImageAlt: string;
  /** Optional video for hero (autoplay, loop). When set, used instead of heroBackgroundImage. */
  heroVideo?: string;
  heroHeading: string;
  heroSubtext: string;
  /** When 'masonry', gallery displays Pinterest-style; otherwise uniform grid. */
  layout?: 'grid' | 'masonry';
  /** Optional fluid scrolling text shown at top of page (e.g. "Spring 2026"). */
  scrollingText?: string;
  /** When true, omit hero and full-width footer (use rich text CTA instead). Used for Spring 2026 Inspo. */
  minimalLayout?: boolean;
  galleryImages: MerchWeMadeGalleryImage[];
  products?: MerchWeMadeProduct[];
  /** Optional title for the products section (default: "Products We Used"). E.g. "The Tee We Used" for Katie Austin. */
  productsSectionTitle?: string;
  /** When set, "Products We Used" is rendered between gallery rows (after this many items). E.g. 8 = after row 2 in a 4-col grid. */
  productsBreakAfterIndex?: number;
  /** When set, an image + text section ("shoot story") is rendered between gallery rows (after this many items). E.g. 4 = after row 1 in a 4-col grid. */
  shootStoryAfterIndex?: number;
  shootStory?: {
    image: string;
    imageAlt: string;
    heading?: string;
    body: string;
  };
  fullWidthImage: string;
  fullWidthImageAlt: string;
  /** Optional video for bottom section (autoplay, loop). When set, used instead of fullWidthImage. */
  fullWidthVideo?: string;
  /** Full-width CTA overlay: align left (default right). */
  fullWidthCtaAlign?: 'left' | 'right';
  /** Full-width CTA overlay: use dark text/button (inverted from default white). */
  fullWidthCtaInvertColors?: boolean;
  ctaTitle: string;
  ctaButtonText: string;
  ctaButtonHref: string;
};

// Script collection - full content
const scriptContent: MerchWeMadePageContent = {
  heroBackgroundImage: 'https://drive.google.com/uc?export=view&id=16oqAzQGo_StXYvU7ysh41naQ5V2ae9qr',
  heroBackgroundImageAlt: 'Script Collection Hero',
  heroHeading: 'SCRIPT COLLECTION',
  heroSubtext: 'Designed as a uniform for slower days, studio mornings, and everything in between.',
  galleryImages: [
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
  ],
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

// Be Right Back – images from public/our-work/Merch We Made/Be Right Back/
const beRightBackBase = '/our-work/Merch%20We%20Made/Be%20Right%20Back';
const beRightBackFilenames = [
  'BF5A8348.jpg', 'BF5A8420.jpg', 'BF5A8425.jpg', 'BF5A8440.jpg', 'BF5A8447.jpg', 'BF5A8455.jpg',
  'BF5A8459.jpg', 'BF5A8489.jpg', 'BF5A8493.jpg', 'BF5A8495.jpg', 'BF5A8522.jpg',
  'BF5A8545.jpg', 'BF5A8566.jpg', 'BF5A8578.jpg', 'BF5A8617.jpg', 'BF5A8624.jpg', 'BF5A8645.jpg',
  'BF5A8659.jpg', 'BF5A8709.jpg', 'BF5A8725.jpg', 'BF5A8739.jpg', 'BF5A8780.jpg', 'BF5A8882.jpg',
  'BF5A8948.jpg', 'BF5A8958.jpg',
];
// Mixed order: indices shuffled for visual variety
const beRightBackOrder = [0, 12, 5, 18, 2, 14, 7, 20, 4, 16, 9, 22, 1, 13, 6, 19, 3, 15, 8, 21, 10, 17, 11, 23];
const beRightBackGalleryImages: MerchWeMadeGalleryImage[] = beRightBackOrder.map((idx, i) => ({
  src: `${beRightBackBase}/${beRightBackFilenames[idx]}`,
  alt: `Be Right Back ${i + 1}`,
}));

const beRightBackContent: MerchWeMadePageContent = {
  heroBackgroundImage: `${beRightBackBase}/BF5A8948.jpg`,
  heroBackgroundImageAlt: 'Be Right Back',
  heroHeading: 'BE RIGHT BACK',
  heroSubtext: 'A travel moment with a calm athleisure lifestyle vibe.',
  galleryImages: beRightBackGalleryImages,
  shootStoryAfterIndex: 4,
  shootStory: {
    image: `${beRightBackBase}/BF5A8425.jpg`,
    imageAlt: 'Be Right Back shoot',
    heading: 'The Shoot',
    body: 'Add a short piece of content about the shoot here. Edit this in lib/merch-we-made-content.ts under beRightBackContent.shootStory.',
  },
  productsBreakAfterIndex: 8,
  products: [
    { image: 'https://drive.google.com/uc?export=view&id=13s38B_ewu9fEG_AMnOIq_cvMrkaMMHtP', imageAlt: 'The Womens Crewneck - Bone', name: 'The Womens Crewneck', description: 'Bone' },
    { image: 'https://drive.google.com/uc?export=view&id=1FkR1Q_qfTJ0uytNfckT2NAAR56jDi5QA', imageAlt: 'The Womens Sweat Shorts - Bone', name: 'The Womens Sweat Shorts', description: 'Bone' },
    { image: 'https://drive.google.com/uc?export=view&id=1HqOpSpZv5edt_2vXzYc5IcUQkv8qDHwN', imageAlt: 'The Womens Hoodie - Clay', name: 'The Womens Hoodie', description: 'Clay' },
    { image: 'https://drive.google.com/uc?export=view&id=1WouoXB5yK7eJ3Uy9Y74v0N7qev-T8XlT', imageAlt: 'The Womens Sweatpants - Clay', name: 'The Womens Sweatpants', description: 'Clay' },
    { image: 'https://drive.google.com/uc?export=view&id=1JiXpbd-fKkFQtudWuNl-V3HtlwDITs9W', imageAlt: 'The Mens Sweat Shorts - Heather', name: 'The Mens Sweat Shorts', description: 'Heather' },
  ],
  fullWidthImage: `${beRightBackBase}/BF5A8529.jpg`,
  fullWidthImageAlt: 'Be Right Back',
  ctaTitle: 'Ready to create something?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

// Varsity – images from public/our-work/Merch We Made/Varsity/ (duplicate of Be Right Back structure)
const varsityBase = '/our-work/Merch%20We%20Made/Varsity';
const varsityFilenames = [
  '395A8419.jpg', '395A8424.jpg', '395A8431.jpg', '395A8439.jpg', '395A8445.jpg', '395A8448.jpg',
  '395A8463.jpg', '395A8469.jpg', '395A8477.jpg', '395A8485.jpg', '395A8495.jpg', '395A8509.jpg',
  '395A8554.jpg', '395A8563.jpg', '395A8589.jpg', '395A8638.jpg', '395A8652.jpg', '395A8663.jpg',
  '395A8679.jpg', '395A8696.jpg', '395A8697.jpg', '395A8699.jpg', '395A8725.jpg', '395A8731.jpg',
  '395A8743.jpg', '395A8818.jpg', '395A8830.jpg', '395A8857.jpg', '395A8862.jpg',
];
// Full-width CTA (footer) uses 395A8699; hero uses 395A8818; shoot story uses 395A8439. Exclude 395A8589, 395A8554 from gallery. Gallery = rest (24 images).
const varsityGalleryFilenames = varsityFilenames.filter(
  (f) => f !== '395A8818.jpg' && f !== '395A8699.jpg' && f !== '395A8439.jpg' && f !== '395A8589.jpg' && f !== '395A8554.jpg'
);
const varsityOrder = [0, 12, 5, 18, 2, 14, 7, 20, 4, 16, 9, 22, 1, 13, 6, 19, 3, 15, 8, 21, 10, 17, 11, 23];
const varsityImageItems = varsityOrder.map((idx, i) => ({
  src: `${varsityBase}/${varsityGalleryFilenames[idx]}`,
  alt: `Varsity ${i + 1}`,
}));
const varsityVideoItems = [
  {
    src: `${varsityBase}/395A8419.jpg`,
    alt: 'Varsity video 1',
    video: `${varsityBase}/IMG_5708.MOV`,
  },
  {
    src: `${varsityBase}/395A8419.jpg`,
    alt: 'Varsity video 2',
    video: `${varsityBase}/IMG_5709.MP4`,
  },
  {
    src: `${varsityBase}/395A8419.jpg`,
    alt: 'Varsity video 3',
    video: `${varsityBase}/IMG_7749.MOV`,
  },
  {
    src: `${varsityBase}/395A8419.jpg`,
    alt: 'Varsity video 4',
    video: `${varsityBase}/IMG_7784.MOV`,
  },
  {
    src: `${varsityBase}/395A8419.jpg`,
    alt: 'Varsity video 5',
    video: `${varsityBase}/IMG_7828.MOV`,
  },
  {
    src: `${varsityBase}/395A8419.jpg`,
    alt: 'Varsity video 6',
    video: `${varsityBase}/IMG_7948.MOV`,
  },
  {
    src: `${varsityBase}/395A8419.jpg`,
    alt: 'Varsity video 7',
    video: `${varsityBase}/IMG_7970%202.MOV`,
  },
];
// Mix videos throughout the gallery at varied positions (2, 5, 9, 13, 17, 20, 24)
const varsityGalleryImages: MerchWeMadeGalleryImage[] = [
  ...varsityImageItems.slice(0, 2),
  varsityVideoItems[0],
  ...varsityImageItems.slice(2, 4),
  varsityVideoItems[1],
  ...varsityImageItems.slice(4, 8),
  varsityVideoItems[2],
  ...varsityImageItems.slice(8, 12),
  varsityVideoItems[3],
  ...varsityImageItems.slice(12, 16),
  varsityVideoItems[4],
  ...varsityImageItems.slice(16, 18),
  varsityVideoItems[5],
  ...varsityImageItems.slice(18, 22),
  varsityVideoItems[6],
  ...varsityImageItems.slice(22),
];

const varsityContent: MerchWeMadePageContent = {
  heroBackgroundImage: `${varsityBase}/395A8818.jpg`,
  heroBackgroundImageAlt: 'Varsity',
  heroHeading: 'VARSITY',
  heroSubtext: 'A cozy café moment with varsity-inspired vibe.',
  galleryImages: varsityGalleryImages,
  shootStoryAfterIndex: 4,
  shootStory: {
    image: `${varsityBase}/395A8439.jpg`,
    imageAlt: 'Varsity shoot',
    heading: 'The Shoot',
    body: 'Add a short piece of content about the shoot here. Edit this in lib/merch-we-made-content.ts under varsityContent.shootStory.',
  },
  productsBreakAfterIndex: 8,
  products: [
    { image: 'https://drive.google.com/uc?export=view&id=13s38B_ewu9fEG_AMnOIq_cvMrkaMMHtP', imageAlt: 'The Womens Crewneck - Bone', name: 'The Womens Crewneck', description: 'Bone' },
    { image: 'https://drive.google.com/uc?export=view&id=1FkR1Q_qfTJ0uytNfckT2NAAR56jDi5QA', imageAlt: 'The Womens Sweat Shorts - Bone', name: 'The Womens Sweat Shorts', description: 'Bone' },
    { image: 'https://drive.google.com/uc?export=view&id=1HqOpSpZv5edt_2vXzYc5IcUQkv8qDHwN', imageAlt: 'The Womens Hoodie - Clay', name: 'The Womens Hoodie', description: 'Clay' },
    { image: 'https://drive.google.com/uc?export=view&id=1WouoXB5yK7eJ3Uy9Y74v0N7qev-T8XlT', imageAlt: 'The Womens Sweatpants - Clay', name: 'The Womens Sweatpants', description: 'Clay' },
    { image: 'https://drive.google.com/uc?export=view&id=1JiXpbd-fKkFQtudWuNl-V3HtlwDITs9W', imageAlt: 'The Mens Sweat Shorts - Heather', name: 'The Mens Sweat Shorts', description: 'Heather' },
  ],
  fullWidthImage: `${varsityBase}/395A8699.jpg`,
  fullWidthImageAlt: 'Varsity',
  ctaTitle: 'Ready to create something?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

// Cloud Collection – images from public/our-work/Merch We Made/Cloud Collection/
const cloudCollectionBase = '/our-work/Merch%20We%20Made/Cloud%20Collection';
const cloudCollectionFilenames = [
  '395A7001.jpg', '395A7011.jpg', '395A7014.jpg', '395A7017.jpg', '395A7111.jpg', '395A7130.jpg',
  '395A7145.jpg', '395A7148.jpg', '395A7149.jpg', '395A7197.jpg', '395A7219.jpg', '395A7220.jpg',
  '395A7234.jpg', '395A7237.jpg', '395A7240.jpg', '395A7282.jpg', '395A7296.jpg', '395A7297.jpg',
  '395A7298.jpg', '395A7308.jpg', '395A7334.jpg', '395A7542.jpg', '395A7745.jpg', '395A7892.jpg', '395A7952.jpg',
];
// Hero uses 395A7001; full-width CTA uses 395A7952; shoot story uses 395A7148. Gallery = rest (22 images).
const cloudCollectionGalleryFilenames = cloudCollectionFilenames.filter(
  (f) => f !== '395A7001.jpg' && f !== '395A7952.jpg' && f !== '395A7148.jpg'
);
const cloudCollectionOrder = [0, 10, 4, 14, 2, 12, 6, 16, 8, 18, 1, 11, 5, 15, 3, 13, 7, 17, 9, 19, 20, 21];
const cloudCollectionGalleryImages: MerchWeMadeGalleryImage[] = cloudCollectionOrder.map((idx, i) => ({
  src: `${cloudCollectionBase}/${cloudCollectionGalleryFilenames[idx]}`,
  alt: `Cloud Collection ${i + 1}`,
}));

const cloudCollectionContent: MerchWeMadePageContent = {
  heroBackgroundImage: `${cloudCollectionBase}/395A7001.jpg`,
  heroBackgroundImageAlt: 'Cloud Collection',
  heroHeading: 'CLOUD COLLECTION',
  heroSubtext: 'Soft, elevated merch with a cloud-inspired vibe.',
  galleryImages: cloudCollectionGalleryImages.slice(0, 6),
  productsBreakAfterIndex: 4,
  products: [
    { image: 'https://drive.google.com/uc?export=view&id=13s38B_ewu9fEG_AMnOIq_cvMrkaMMHtP', imageAlt: 'The Womens Crewneck - Bone', name: 'The Womens Crewneck', description: 'Bone' },
    { image: 'https://drive.google.com/uc?export=view&id=1FkR1Q_qfTJ0uytNfckT2NAAR56jDi5QA', imageAlt: 'The Womens Sweat Shorts - Bone', name: 'The Womens Sweat Shorts', description: 'Bone' },
    { image: 'https://drive.google.com/uc?export=view&id=1HqOpSpZv5edt_2vXzYc5IcUQkv8qDHwN', imageAlt: 'The Womens Hoodie - Clay', name: 'The Womens Hoodie', description: 'Clay' },
    { image: 'https://drive.google.com/uc?export=view&id=1WouoXB5yK7eJ3Uy9Y74v0N7qev-T8XlT', imageAlt: 'The Womens Sweatpants - Clay', name: 'The Womens Sweatpants', description: 'Clay' },
    { image: 'https://drive.google.com/uc?export=view&id=1JiXpbd-fKkFQtudWuNl-V3HtlwDITs9W', imageAlt: 'The Mens Sweat Shorts - Heather', name: 'The Mens Sweat Shorts', description: 'Heather' },
  ],
  fullWidthImage: `${cloudCollectionBase}/395A7952.jpg`,
  fullWidthImageAlt: 'Cloud Collection',
  ctaTitle: 'Ready to create something?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

// Solos Pilates – images from public/our-work/Case Study/Solos Pilates/
const solosPilatesBase = '/our-work/Case%20Study/Solos%20Pilates';
const solosPilatesFilenames = [
  '8D2A9565.png', '8D2A9573.png', '8D2A9577.png', '8D2A9578.png', '8D2A9592.png',
  '8D2A9593.png', '8D2A9597.png', '8D2A9606.png', '8D2A9615.png', '8D2A9618.png',
];
const solosPilatesGalleryImages: MerchWeMadeGalleryImage[] = [
  ...solosPilatesFilenames.map((name, i) => ({
    src: `${solosPilatesBase}/${name}`,
    alt: `Solos Pilates ${i + 1}`,
  })),
  {
    src: `${solosPilatesBase}/8D2A9565.png`,
    alt: 'Solos Pilates video 1',
    video: `${solosPilatesBase}/3e1247361277414cb0a3a800d8c7157a.mov`,
  },
  {
    src: `${solosPilatesBase}/8D2A9565.png`,
    alt: 'Solos Pilates video 2',
    video: `${solosPilatesBase}/copy_9CDF2160-B938-4300-A2D1-CF4700B6DB60.MOV`,
  },
];

const solosPilatesContent: MerchWeMadePageContent = {
  heroBackgroundImage: `${solosPilatesBase}/8D2A9578.png`,
  heroBackgroundImageAlt: 'Solos Pilates',
  heroVideo: `${solosPilatesBase}/copy_AC63F4B9-6C94-487B-B891-FCDEF24E251B.MOV`,
  heroHeading: 'SOLOS PILATES',
  heroSubtext: 'A high end boutique pilates studio with 4 locations in Socal.',
  galleryImages: solosPilatesGalleryImages,
  fullWidthImage: `${solosPilatesBase}/8D2A9578.png`,
  fullWidthImageAlt: 'Solos Pilates',
  ctaTitle: 'Ready to create something?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

// Spring 2026 Inspo – Pinterest-style masonry from public/our-work/Inspo/Spring 2026/
const spring2026Base = '/our-work/Inspo/Spring%202026';
const spring2026Filenames = [
  '04275807c01ae6f835ee3a0240e77db8.jpg', '1435ed2d92261dcb5b4c5dd472d96087.jpg', '169a835fab5455ddfcf9815ae13611bd.jpg',
  '1ab550ca504abebd38139b0fbc6ea9b1.jpg', '1ab8304adf1e915de48cf5c8217c197e.jpg', '27a8cc2f7e5b32777e48c6893f55272f.jpg',
  '28a0e4beac49f9523ff9aa45f5c3a83d.jpg', '2be1bb58bf3f515aae13cd8f6546c013.jpg', '3b3ba0bf6e10d09dd88a9836fdd1ce47.jpg',
  '4099d9612a630f109fffad5e8d53cbbf.jpg', '44c2ba4debbe1f35d267f2b63e18a15c.jpg', '49bf9e7519b02f61354bf20b3ede068c.jpg',
  '4b41f0e83a27250d17f23439a5c3fd81.jpg', '4c9c8dbda6c59484850c830c1a0a4516.jpg', '4cf6821cd25af6e474ddc91c38cbc49c.jpg',
  '4e502e3e0853964c44306a013cd5fd2b.jpg', '64b5de45e1b61aaaefa629af31e1878f.jpg', '6706760d6ab8a7174a1084c074f74d9d.jpg',
  '69b9cd06715aec93a8270c71f0b7ddd1.jpg', '7663e3709e1eaa62f511141525003e69.jpg', '79fbbbc293ab3fa878880850f70690cb.jpg',
  '817df216b3ebee982aaa31ae2d9f291b.jpg', '8783eca87199c2ebd8aaa83a4da2118b.jpg', '8807d21bcdac50f895582c04aa1e1556.jpg',
  '919f8bf827ee00083da651367382bd98.jpg', '9352547e4fe006d8da04c537b4b0556d.jpg', '949f206e72710d22f0c471b05aa8d40e.jpg',
  '99ac4a861531810cb9ab2ed3f9dd2b32.jpg', '99c4e9abc70bd537958a3c79ee2faddb.jpg', 'a1394a6963f588c9d785b2b797b2a7a9.jpg',
  'a28c4ec8abe039016198720e5c52f4c6.jpg', 'a6babd492a5451bf9f7d8939753f82cb.jpg', 'bf2204736401fe8ce12728160f3d8a6b.jpg',
  'ca8bc0b5bd5fca2be63c266726b31a4c.jpg', 'ce7f7b99a437bbcd57abded910f42b6b.jpg', 'd0e13adc80ee04171f3833f9b9c24646.jpg',
  'd86e843ee24d4599a2ded0f59df9c291.jpg', 'da5cf28864d07777d050f6e12c043ba6.jpg', 'dbc6311ecb264ca500f13e88cc82c1d1.jpg',
  'de9383cfbab90ffb4bb32f5a76cbac5b.jpg', 'download (1).png', 'download (13).jpg', 'download.png',
  'e02e493cec9498619d1440453bfc39e7.jpg', 'e1705d79b564bc9cf7db3fbdda073de4.jpg', 'e4dc6f72b6c14d1ccbdb08bc6802ceef.jpg',
  'e7c16160e1777b0eba9116251acb8fab.jpg', 'e905336fb61bce58b0948b8b303b28d9.jpg', 'e9570834af1e91fbc2e8850679e7095c.jpg',
  'f085cdf7fc507139c5ddd1be465ae9e0.jpg', 'f5aabd45cd76ddab367207aa894e180d.jpg', 'fd897787bd837c5aa4a0f96c0ac0e367.jpg',
];
const spring2026GalleryImages: MerchWeMadeGalleryImage[] = spring2026Filenames.map((name, i) => ({
  src: `${spring2026Base}/${encodeURIComponent(name)}`,
  alt: `Spring 2026 Inspo ${i + 1}`,
}));

/** Summer picks – product cards for click-through carousel (Spring 2026 page). Edit here to change products/links. */
export const summerPicks = [
  { image: `${spring2026Base}/04275807c01ae6f835ee3a0240e77db8.jpg`, imageAlt: 'Summer pick 1', name: 'Product name', description: 'Short description', link: '/catalog' },
  { image: `${spring2026Base}/1435ed2d92261dcb5b4c5dd472d96087.jpg`, imageAlt: 'Summer pick 2', name: 'Product name', description: 'Short description', link: '/catalog' },
  { image: `${spring2026Base}/169a835fab5455ddfcf9815ae13611bd.jpg`, imageAlt: 'Summer pick 3', name: 'Product name', description: 'Short description', link: '/catalog' },
  { image: `${spring2026Base}/1ab550ca504abebd38139b0fbc6ea9b1.jpg`, imageAlt: 'Summer pick 4', name: 'Product name', description: 'Short description', link: '/catalog' },
  { image: `${spring2026Base}/28a0e4beac49f9523ff9aa45f5c3a83d.jpg`, imageAlt: 'Summer pick 5', name: 'Product name', description: 'Short description', link: '/catalog' },
  { image: `${spring2026Base}/3b3ba0bf6e10d09dd88a9836fdd1ce47.jpg`, imageAlt: 'Summer pick 6', name: 'Product name', description: 'Short description', link: '/catalog' },
];

const spring2026InspoContent: MerchWeMadePageContent = {
  heroBackgroundImage: 'https://drive.google.com/uc?export=view&id=1S5zI7MUI2HpabdoiMgMfgYdQnafSxb6B',
  heroBackgroundImageAlt: 'Spring 2026 Inspo',
  heroHeading: 'SPRING 2026 INSPO',
  heroSubtext: 'Soft pastel inspo for the Spring 2026 season.',
  layout: 'masonry',
  scrollingText: 'Spring 2026',
  minimalLayout: true,
  galleryImages: spring2026GalleryImages,
  fullWidthImage: 'https://drive.google.com/uc?export=view&id=1S5zI7MUI2HpabdoiMgMfgYdQnafSxb6B',
  fullWidthImageAlt: 'Spring 2026 Inspo',
  ctaTitle: 'Ready to create something?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

// July 4th Inspo – Pinterest-style masonry from public/our-work/Inspo/July 4th/
const july4Base = '/our-work/Inspo/July%204th';
const july4Filenames = ['00348ffacc1fd5a899c103ec0529fce8.jpg', '020b64a71c2f150900426d0ad679e2c9.jpg', '06010c85973c481609dc431a898d8f38.jpg', '06a6f6cf15e2c2ef5bbcc3ee8213e788.jpg', '0725ae3d8908d54fd7aee5a4e7d720ff.jpg', '07719662e0915ccc741798ce66ee6000.jpg', '08e377104647f9446b5f2c088e97a312.jpg', '09f265bb9aaa5df1ef0feea72e5926c6.jpg', '0dc44601a817a78e01390520785bee27.jpg', '0dc61746d0807bd38722668e37f8b487.jpg', '0ff1d165350262e8eeb72385ad74b1c2.jpg', '105dfd7cf5ee7702b6534c7eeb0a8936.jpg', '11c7634f60932b40a44c4b6d6f640fff.jpg', '12aadd34f70c3e4c2b764045b17d1647.jpg', '185d18a152ee038bfb893e6cd6eba6a2.jpg', '19cce510a35d69bc17a1b77e81f1ec69.jpg', '1e97409448655fd272180b1845645751.jpg', '1fb0ae7172039a498d602593c6d4eb56.jpg', '20ec9a3be0923bf9ee8eb915b6bcce20.jpg', '21064cd6cd594abd8d4ed0b9bdd8ebe3.jpg', '237f27803220804851246b14240ed5e9.jpg', '26e2e355ec39c54142843e6fd6eae8c3.jpg', '26e36ed378022b390159ee2ccfce3d48.jpg', '276c2e7acd9876ceb458119eb80d7c1a.jpg', '2920780df40994243fb388fc84187dd2.jpg', '2ae7b4668a2e0ce339f0dd1fa5e9f433.jpg', '2d5fdde238ee73af0a309e7939334725.jpg', '2d98eafc9db82b37f91d4daa519a3735.jpg', '3678c9c4a53b40b631a50170b7501dce.jpg', '3c560317e000bc70116952040589c586.jpg', '3f6f7a72b4a1e4f2883fc7e6d6ab4d4d.jpg', '3ffbf771f279e67f9e00af6f46b8ab80.jpg', '406befa644cf79d5e11aa825fab20537.jpg', '408dbac54319965d9aeca7e826c97006.jpg', '42c7f1858b3df05c92e73c3a332c5eca.jpg', '4427ae3d40de8fed5cc91a5436336a50.jpg', '45feab2995398e9fb0cf49ac6f343146.jpg', '48f5dc458318d63faa1aa8bc5263acc0.jpg', '4a7c2f0df7fdd3d955a2c81838f4bbcf.jpg', '54a967bebd9253101e625b26fe8e4b45.jpg', '5670e10fd259b9ea76f6eccc0c70a410.jpg', '57db33bc93393534c32b9052d7154e06.jpg', '583c59d3b5a4b8163e28a33def65f0d1.jpg', '5ad39613b8b03a8d13b8f282ca27b57a.jpg', '5b25c34bdbe7165f6e54916f34a0b2a8.jpg', '5cc0536d0e0f62c978dc87e3cc6de0d3.jpg', '5d3361de28601462b9ec0012c9bfb678.jpg', '5e000b1cac8ca8bdd093574ef0cbd5c3.jpg', '5e38b4fe909589b359c10579bc8b5e3c.jpg', '5fdd69cd3273848e89de656574610a5a.jpg', '6156f83d78798e2523328b94db4cc1ac.jpg', '6177a5dd7987d40a5c6d61c3d0d5aa32.jpg', '6515e2c79a57d22f7286f0bb11895360.jpg', '663d3371c863b7e5d1e9dbc11d3085df.jpg', '66f92d450900adfd579da0fd505d058d.jpg', '693fa5fa745a12298634a79abef92b86.jpg', '6d0cf5bcef0c9bc78670d811991a91ff.jpg', '70397e0010221b6bb4efe255bc84d00d.jpg', '70c694d02ad734b0a0db72f574ca6827.jpg', '75f378f32547933fbe459505644ea93a.jpg', '75fd9cb166e9ca40b86f076b5ac2b225.jpg', '769485c588253ee3734d82d2bacc44d1.jpg', '77846a73eeb9bc349b7cd0ce1f45d683.jpg', '7cf529bf4211ba463ddbb83828bb338e.jpg', '7d21307f9ef75490877a7f1f83cb1dda.jpg', '817430b6efc3142b420b406a479d5c37.jpg', '85c890f1751c42cb64e12bd79d4efb33.jpg', '86505f07bd649e766206a3e448d19dd9.jpg', '86cbe506966d987fff97b201ea689059.jpg', '8adaf6a68987ac692eb6d6b8755f1f64.jpg', '8c2ad99fde26697ccd3679ef65ee188e.jpg', '8c4cd4f158bae3b0165599dc25ffc1bd.jpg', '8c6a525ad0d9c2f7fb582cb8a509950e.jpg', '8f8aab7b5eafffb3559826362d87febf.jpg', '918e68cc2d83eb8bdc112e7fc46798e1.jpg', '923520f9d5ca93218f0720dffb8b2416.jpg', '9259447eb7d2d545232aaacd68a1e914.jpg', '93fa73bf1cd8e8c158c0ece8e4f862c4.jpg', '95464d717ceda4c52539d898e69371c9.jpg', '956743b5dde0fd90e866726b985bdfb9.jpg', '9ac5717393069b2d1e2a1a16122969cc.jpg', '9b52f5355640d997b378ad80dda0fcf1.jpg', '9ba4216efac00ea28d772d325cc0b5cf.jpg', '9c76a5208b4fa61f8485df480632a993.jpg', '9c82c97f8fcdca621082de45916e3c6b.jpg', '9ca2ad84c39f132e9965c6d4f401ed3f.jpg', 'a1b4553fbcf5364ef71c971156096ae1.jpg', 'a680e61a560a6a0567d4aa6bffc563c3.jpg', 'a7db557caad136572d182cbcc408cdf9.jpg', 'aaa0667eb664ecb2bda80ffc2c646611.jpg', 'aae6274af04e04dfae5f904c155de06d.jpg', 'ae63746f9a1af55c50c4aeeab563044e.jpg', 'aef29445e1bd4ebe684b04eee4d56883.jpg', 'b21b628a3df08aa39f95b46510167596.jpg', 'b3d23bb23cdb3460e9aaa67e7d388a9d.jpg', 'b5cdfb8e3dd09996fb9c85e70858970e.jpg', 'b60b611fd6ddc24868b17cf4d9beb580.jpg', 'b6beec047ed5ed213ab698ce8a4b788f.jpg', 'b8359b7a2087f59230a30cb146375b09.jpg', 'bab6a1b95dd5f3b08b531501421addf5.jpg', 'bfe633273c008a5c03fd0e92af08de93.jpg', 'c2ef6d9885b09ae39394930d86466ded.jpg', 'c71742363fcbce2c5246050f86cec474.jpg', 'c88cc23c7aa06a0f42bb38b2602f3059.jpg', 'cd9c92d116753bb027dfe65edeaf1b76.jpg', 'ce2b1390f9081f4b3c13a769e7c77b47.jpg', 'd2afc7f3a7645ac7038f6671d37c460b.jpg', 'd2d534fb1df4258f69e3b7eed8082b69.jpg', 'd3a97bec03a6b5dc171985e278826381.jpg', 'd5628753e233b4730b517eb30d0336ad.jpg', 'd755c6d827641a0ecda10ec9f544d153.jpg', 'd7e2dc4f508341be79dc31294e9fd1db.jpg', 'd7eef8cb10a7d54162d3834f015b58b3.jpg', 'd8f548707b470352eab3fdaed16a17d4.jpg', 'dae54a7667ca602ce62a42475d734f27.jpg', 'dc82f02cb89e0462c883e9c4465c575b.jpg', 'dfd1b4f1ef00fbdc4ea0c665d58a4d21.jpg', 'e23dd0c33e18310e825c504f22d437c7.jpg', 'e5a7dfe20c241d0cfddd55aa9ef6525d.jpg', 'e887f2e4aafd2ef45ea4bf9b470b67d8.jpg', 'e977bef471be44159e83c1ca06432345.jpg', 'eccd3c1d96d18b13aee8fb27b3e8f152.jpg', 'efd34200d4a84c15d6b51142b1597e10.jpg', 'f05a7dd58d6559333b66948ddd942d7f.jpg', 'f0a56d2112269a490f1576dc6d138de9.jpg', 'f15f823b2c493e6a638d07e54d489af2.jpg', 'f1787236e5a4ecc9000b1dc1758d01ce.jpg', 'f1cf1f79a216ad0a650583d716f73b69.jpg', 'f1e99f67d594adafef3b87174b1819c7.jpg', 'f2bae1226ec4ba6ddcbb77a7f51d5253.jpg', 'f35116b24c782cb30eaf19a3832c6284.jpg', 'f595858b79390f0625309cd0a4063112.jpg', 'f7ab128a730a87b7f7a31585f2fded15.jpg', 'f8afa8ead847b67ee8d3a47a98b53945.jpg', 'faf0aed5874187f581bd6ac6b3b1cc5f.jpg', 'fbaa02f52b4fb6a606bbd5bff96514b7.jpg', 'fd090c0911197487eb4cc0869d937628.jpg', 'fe3fa9b96ca9dea8337404ad3d5371ce.jpg'];
const july4GalleryImages: MerchWeMadeGalleryImage[] = july4Filenames.map((name, i) => ({
  src: `${july4Base}/${encodeURIComponent(name)}`,
  alt: `July 4th Inspo ${i + 1}`,
}));

/** July 4th picks – product cards for click-through carousel (July 4th page). Edit here to change products/links. */
export const july4Picks = [
  { image: `${july4Base}/00348ffacc1fd5a899c103ec0529fce8.jpg`, imageAlt: 'July 4th pick 1', name: 'Product name', description: 'Short description', link: '/catalog' },
  { image: `${july4Base}/020b64a71c2f150900426d0ad679e2c9.jpg`, imageAlt: 'July 4th pick 2', name: 'Product name', description: 'Short description', link: '/catalog' },
  { image: `${july4Base}/06010c85973c481609dc431a898d8f38.jpg`, imageAlt: 'July 4th pick 3', name: 'Product name', description: 'Short description', link: '/catalog' },
  { image: `${july4Base}/06a6f6cf15e2c2ef5bbcc3ee8213e788.jpg`, imageAlt: 'July 4th pick 4', name: 'Product name', description: 'Short description', link: '/catalog' },
  { image: `${july4Base}/0725ae3d8908d54fd7aee5a4e7d720ff.jpg`, imageAlt: 'July 4th pick 5', name: 'Product name', description: 'Short description', link: '/catalog' },
  { image: `${july4Base}/07719662e0915ccc741798ce66ee6000.jpg`, imageAlt: 'July 4th pick 6', name: 'Product name', description: 'Short description', link: '/catalog' },
];

const july4InspoContent: MerchWeMadePageContent = {
  heroBackgroundImage: `${july4Base}/00348ffacc1fd5a899c103ec0529fce8.jpg`,
  heroBackgroundImageAlt: 'July 4th Inspo',
  heroHeading: 'JULY 4TH INSPO',
  heroSubtext: 'Patriotic inspo for the Fourth of July.',
  layout: 'masonry',
  minimalLayout: true,
  galleryImages: july4GalleryImages,
  fullWidthImage: `${july4Base}/00348ffacc1fd5a899c103ec0529fce8.jpg`,
  fullWidthImageAlt: 'July 4th Inspo',
  ctaTitle: 'Ready to create something?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

// Baseball Season Inspo
const baseballSeasonBase = '/our-work/Inspo/Baseball%20Season';
const baseballSeasonFilenames = [
  '0a362b0578c28c11969a04e0bde9a733.jpg', '0d2e5cc9f68f5685c410f100716b7fad.jpg', '0e69bb5b3e04861fedb70f9dde04e8cd.jpg', '141fa0dbc4a7ca9ed9178e2ceafa2565.jpg', '1804f70585d82cec5cb0c4df3eb961cf.jpg', '23ce680ed56545a66a6127b65670608f.jpg', '289ec0e595491b957fad1e345960443f.jpg', '2c0900250722c96ed73c58065926678e.jpg', '3845292b4d525d4b830a4c7bd6e9e2cf.jpg', '39b9d7e89c00d4f860c7af37f9193b03.jpg', '3bfe7df6927f3b31186a1704ee34d331.jpg', '3cc3eca889819391533ba5514346eb03.jpg', '3f10a91c3bd9cccfe74485cce02be35c.jpg', '419c856c468b3e6cb2e1803df2313410.jpg', '4365bcaa92a485ec2329855358af4938.jpg', '564ea6404ebfd9925af4e80f5315d106.jpg', '5da1d3dbc2985c86f6f93a213c270498.jpg', '5eff933328b49bdcd6ecc938756fcdd1.jpg', '65e78fd50ffedb583e06ba15a6b2e8b2.jpg', '66f94bdf42289a99ad19bc164768ac48.jpg', '706f818543c05107a124deca25cb3092.jpg', '70930f25adf1e80b485497f8e6e4d8d0.jpg', '735cb8828c1ef9e9c0beaff89be18eeb.jpg', '84dd658c837d33738d888a540d924881.jpg', '86bc334871b88fdccf9d2e1ce0a601ce.jpg', '8c2fb3956d597fc2b66046327a867ea9.jpg', '9352547e4fe006d8da04c537b4b0556d.jpg', '99cf3b5d315fc1a776602a1ecd79ac95.jpg', '9caa441c784950131dd40e5082ebf4d0.jpg', 'a4370da039820ff76b169665da3ec625.jpg', 'aaae03c74e1be901149dda034163692d.jpg', 'b0bf10062037f3d9e437022c3fb7f58a.jpg', 'b3b3ae6b11f43c6d8876883c20c31821.jpg', 'b553d723b12cd6c7e8d32d51e35568a9.jpg', 'ba74880bb93cb2b9b824ffb6f609bb96.jpg', 'bb1c168e1a72fa71142c6c8b8482cde2.jpg', 'bdb189383f465122b99d4672ebf45cd1.jpg', 'c387628c8874fc54667eee32beca5c85.jpg', 'c444432478357fab6b885abe08172ad2.jpg', 'c938cd352ccfdf8cb26fb2cc9341f042.jpg', 'ce406297d177563352cbd12c0d2ea18e.jpg', 'd5b7138637c28c0cd31fef7b7a4b4032.jpg', 'dfa41d77f6739c3ac99ee8058d0f1e96.jpg', 'e14b68d1958aedcb75448c26aac9d987.jpg', 'e6a9491cc38fc4313f4891f359239566.jpg', 'ea759a1c959988a26483e240cef9a4a2.jpg', 'eb4e786af56894b99a29537b00217c45.jpg', 'f259c8ce9a03e92641ca58bc5886f2ca.jpg', 'f6684f64a248aa436f09a935d12c0425.jpg', 'f8c5e3f0fca37c7a7a2b441a2e9304f3.jpg',
];
const baseballSeasonGalleryImages: MerchWeMadeGalleryImage[] = baseballSeasonFilenames.map((name, i) => ({
  src: `${baseballSeasonBase}/${encodeURIComponent(name)}`,
  alt: `Baseball Season Inspo ${i + 1}`,
}));
const baseballSeasonInspoContent: MerchWeMadePageContent = {
  heroBackgroundImage: `${baseballSeasonBase}/0a362b0578c28c11969a04e0bde9a733.jpg`,
  heroBackgroundImageAlt: 'Baseball Season Inspo',
  heroHeading: 'BASEBALL SEASON INSPO',
  heroSubtext: 'Dugout and diamond inspo for baseball season.',
  layout: 'masonry',
  minimalLayout: true,
  galleryImages: baseballSeasonGalleryImages,
  fullWidthImage: `${baseballSeasonBase}/0a362b0578c28c11969a04e0bde9a733.jpg`,
  fullWidthImageAlt: 'Baseball Season Inspo',
  ctaTitle: 'Ready to create something?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

// Collegiate Inspo
const collegiateBase = '/our-work/Inspo/Collegiate';
const collegiateFilenames = [
  '012e18c07b2fc744f8db292a78f9f012.jpg', '064a7623951849717611f4d95d72a839.jpg', '07039a4858ebd60dce2f2323cac92173.jpg', '0b1c1fde5afcf780fb77a6e85c3a9b97.jpg', '100011128bf5e2e14f54ee4c7ba0febf.jpg', '1049e10a74d7d839a92623118eb34239.jpg', '1628d145c326aa97abac58420b8968de.jpg', '183d945f1580e98737e2d37510429234.jpg', '18900750cfd2f4c540e96103a0cf7362.jpg', '18dbc4fb428742cec08185cc1291a681.jpg', '1932b84cfc986bca0ee3951c11589c86.jpg', '20c684c82a695c9adff5881345e56979.jpg', '23839c4336316cb899d32c69adb600f2.jpg', '2b37e38f897f1e041d7d432618ce335f.jpg', '30cf1a0c2df3d657fe2ac13dcf749953.jpg', '33bf656929d701a07991c9c158605166.jpg', '34b9d3c080eda268b77a399923516f46.jpg', '42a5f089126196642ce528d06f521629.jpg', '43d662359eb5dac4162d9d5316a4baf7.jpg', '4bc5363f11c1f2f8a5a0178b83bfe16a.jpg', '4cfc5d6d5a8c1f4f0d54f1c8be4ba593.jpg', '51ce511d38a0252ff1d2ec20cf0ad56d.jpg', '544a946aa8b28e1953764e93e7ba83f7.jpg', '551e0bd064c647bac62b23c3772a6eca.jpg', '55a52dc1d14e7d7e0d4c7e72e0d9c9af.jpg', '6030b8601157b26461aebd604093cb55.jpg', '63887d97a6d3ba774cd721c751fcbb73.jpg', '659acd66f696d639cb4d116f597946cb.jpg', '66aa773fc364a1fc53beb20435a4a9c7.jpg', '6a2360247b0888684089eb2355a6be7e.jpg', '6b4d8f8c6b00c64af6cb35d0d8a1588c.jpg', '6e0cea992de938591b941e124ba9143c.jpg', '6f1cbbb8e08faf5611ad25d196851cc0.jpg', '706f818543c05107a124deca25cb3092.jpg', '775402eac809c37b6d21a8f6ca61c5e8.jpg', '7cfa321ddc82fefe7ea22830170aff4d.jpg', '7f02e4a48cd884dfa68cdc56811b0f60.jpg', '87552d29c6dfd0dc19d2ae89e2c834fd.jpg', '8b3e795a26f080248c838704bed9d0af.jpg', '8d3336181c587c2b60a442b82ca753b3.jpg', '8d961fe96a7c781b636ed13b69fde59d.jpg', '8dcc4043287b67ccd2ef1f74fa7bc1df.jpg', '8e8dc4b28bf8a1a5ffb921ab5b989fd9.jpg', '8e9f4221e92245140e2b628bdb3a91ac.jpg', '95782c202be94dfe33ed5a17b0e1f849.jpg', '98bfd9a0bfb75356f6d5bc29b64bd494.jpg', '9c13d0cc4dd1e73720a80ef405f6b1a6.jpg', 'a07ac4bf2175d5b2750652e6a27c1ccc.jpg', 'aa3b8ff74a7fcdddef2deeab19690188.jpg', 'ac47a3c5d326466042af33cd06dbe9cd.jpg', 'b072dbb4fe871495d4c7a572e3f54939.jpg', 'b6b49d97f998acfcee58f942244241fe.jpg', 'bb6851c8aadddfc8babc7bba7491f283.jpg', 'bdb189383f465122b99d4672ebf45cd1.jpg', 'c02afb3845b48dba4006828df081c312.jpg', 'c2964bff7bc459bb33c8d236a067042a.jpg', 'cbb142167ea184f71206d1eaa360bbe8.jpg', 'd353217649ee4260b8252067042ab364.jpg', 'd8014eb95ac8f1eb1aee6e376b37ca9f.jpg', 'e4d4fa8c1c73702a116a2033e17a899f.jpg', 'f613c5a2bc2c1bbce23710f47b09210b.jpg', 'f64b976ae6d5ae79d71fc115ff025bb3.jpg', 'fa454403c9e63a905616b5e924eda272.jpg', 'fd0329f420b0989bc52cb0c598d4a671.jpg',
];
const collegiateGalleryImages: MerchWeMadeGalleryImage[] = collegiateFilenames.map((name, i) => ({
  src: `${collegiateBase}/${encodeURIComponent(name)}`,
  alt: `Collegiate Inspo ${i + 1}`,
}));
const collegiateInspoContent: MerchWeMadePageContent = {
  heroBackgroundImage: `${collegiateBase}/012e18c07b2fc744f8db292a78f9f012.jpg`,
  heroBackgroundImageAlt: 'Collegiate Inspo',
  heroHeading: 'COLLEGIATE INSPO',
  heroSubtext: 'Campus and game day inspo with collegiate spirit.',
  layout: 'masonry',
  minimalLayout: true,
  galleryImages: collegiateGalleryImages,
  fullWidthImage: `${collegiateBase}/012e18c07b2fc744f8db292a78f9f012.jpg`,
  fullWidthImageAlt: 'Collegiate Inspo',
  ctaTitle: 'Ready to create something?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

// Fall 2026 Inspo
const fall2026Base = '/our-work/Inspo/Fall%202026';
const fall2026Filenames = [
  '048a8d9ef5de13fb5d26b26de567cb64.jpg', '18eada8f1978c4a797da2cf38907ea9d.jpg', '1905da4cbbb70997ec17f0dc395879a5.jpg', '265541a2cff97f496c5f9bbf7bdb4ebf.jpg', '2c69d6af5841e38953c01c72e4f03038.jpg', '32d0b900ef6c8095257fd93c26b8d0c3.jpg', '34df716b035c307b10b6bf74dafdb9c3.jpg', '3845292b4d525d4b830a4c7bd6e9e2cf.jpg', '38863a70863e4aa30b3be0ff5244846f.jpg', '4225c734b2cd559f5a2cf8ef6c893f94.jpg', '4993163071d521e9da8ea88fbd9f1ccc (1).jpg', '4993163071d521e9da8ea88fbd9f1ccc.jpg', '4a22cc441352af921345ab0c87b0f3c9.jpg', '4cceb0d516a8ed22846881009ef17653.jpg', '581f222d7dabad373fcb751c5f50f7f6.jpg', '5896d0cff8e1d2981c743a3eb0ad3101.jpg', '5b0dddd11be9d17545a921c4b5334071.jpg', '625d836968e24a494c0933a401777b72.jpg', '6cddb1068d103ed05f1f8f31ce315913.jpg', '6e2e98c62bd03cbf3eb21370bbbb2056.jpg', '6f5999f14bb7ded6c5699f218e64b2b0.jpg', '7553b04cc15844dfde1c0ff0a1c62e0f.jpg', '77b179e5d519dc48ae10530482c76adf.jpg', '7e03c64753e8dc29de43c56c84f9cc12.jpg', '7e98ac376115f6de4a02cd7184283fd4.jpg', '7ff91e637d63de2d01c434dca5b47dc5.jpg', '81d5635fc2a7d09ea0ddb2f1a074804b.jpg', '85248af5ea573743326007ca96bc1d29.jpg', '85295f0fe0c3b8aa526a6ce32e6e367e.jpg', '8ddf3a22a6a072623243e6c26ea7bca6.jpg', '8e8afa68707dcc7be43bce55e6e67547.jpg', '8f01295ac12947ded8c1a0be47151ee6.jpg', '8f796e09525c403b690d6e8804cbf642.jpg', '944d1117da10333ef95183656ca73e52.jpg', 'a46e2cb1e70e77bcdb8539ba4ad7801a.jpg', 'a4d7c9959fe9ceb1b68c73826297ad0f.jpg', 'a52b27c27173219e3e1bc2997e032df3.jpg', 'a5a7992e9f2fcad352f54252235d32ad.jpg', 'a84f83561f4fb73ddf517ab6885157d4.jpg', 'aa3d6339008041c937bb5cf6902988c6.jpg', 'aa5f4ca226b81f8562260bdefff02981.jpg', 'b05cc92126c740975e6b1658c1ff7510.jpg', 'b25fa486afb5e4083e544582b8371260.jpg', 'b5514273000004f3852f607f522a9ad2.jpg', 'b7fd1382d93e784f9a1a39de56f4c8a3.jpg', 'b8e5a5ae340b351f233946bc343df788.jpg', 'bc363871c39da1d09b8d216f12cb4440.jpg', 'be83300ff182a49f4f53f1f4f4d7e718.jpg', 'beedd6288cff9ad1ea778444cc0c0210.jpg', 'bfb062c43207c1ca43282fef347025c7.jpg', 'c0b5dff3364ed3ac8c71a937adba84ae.jpg', 'c2f8e2320fb072a64ae7a316bf2542a0.jpg', 'cb7bc5af63ec441dffc0a07fa94e36fc.jpg', 'cc5fd6b915281bf8b66efcb57a3b6ba4.jpg', 'cd1d794651b9f03859ebd07a4feb5ea1.jpg', 'd0c868743d4c33f77e9e315c35d21c9b.jpg', 'd1c4c6daaa14b3e001258aa36f2ee326.jpg', 'd38819f0f465a2df48b7641c7159e5d2.jpg', 'd644805ed9dccdf9de0877a9f80707ea.jpg', 'da5cf28864d07777d050f6e12c043ba6.jpg', 'daa587f09e69f2b1b0674c755d3e4fb9.jpg', 'dc0e350a229468b57dbdc986f35bfe5f.jpg', 'de35fba1e137d2357fc5e91d6126d6c5.jpg', 'deadd89d4027e3bb5b376d907cf40a3a.jpg', 'e01547e8be522b840ebb3447b63c1c53.jpg', 'e19eacaf1cd6e691964cb27148be3ada.jpg', 'e31349739aaa2091f48d8b16c2a5be95.jpg', 'e61e0b57fd77a893fba7112482ed6359.jpg', 'e7d5ffa5f44f34ba292f1f9ebe402a87.jpg', 'ebefd0479329f085f6ffdb12dcb11576.jpg', 'ef06f1325a3cffcf1ad471e6b1099e58.jpg', 'f4f2bd077ab8a71580a591b1e1c8c983.jpg', 'fc71bebaed0b337fc88dc007ca84674b.jpg', 'ff7a00a4ad63abfd73fe1e1925e3548e.jpg', 'ff943d35b56f4e6f44b53a4d41f292eb.jpg',
];
const fall2026GalleryImages: MerchWeMadeGalleryImage[] = fall2026Filenames.map((name, i) => ({
  src: `${fall2026Base}/${encodeURIComponent(name)}`,
  alt: `Fall 2026 Inspo ${i + 1}`,
}));
const fall2026InspoContent: MerchWeMadePageContent = {
  heroBackgroundImage: `${fall2026Base}/048a8d9ef5de13fb5d26b26de567cb64.jpg`,
  heroBackgroundImageAlt: 'Fall 2026 Inspo',
  heroHeading: 'FALL 2026 INSPO',
  heroSubtext: 'Cozy autumn inspo for the Fall 2026 season.',
  layout: 'masonry',
  minimalLayout: true,
  galleryImages: fall2026GalleryImages,
  fullWidthImage: `${fall2026Base}/048a8d9ef5de13fb5d26b26de567cb64.jpg`,
  fullWidthImageAlt: 'Fall 2026 Inspo',
  ctaTitle: 'Ready to create something?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

// Racing Team Inspo
const racingTeamBase = '/our-work/Inspo/Racing%20Team';
const racingTeamFilenames = [
  '0292e81fee8b21438a1e2aba6d170abc.jpg', '03008ef95fb8d171e12dedaf43468069.jpg', '034801b1f4b7f5c1521c8140c12170ab.jpg', '09c38cba78d119d7df3192ebe1a505ae.jpg', '0b731d1c71dafad71effd6b51ece5b3d.jpg', '0de073d9d1e91e989c9a1ab35a01b5a7.jpg', '0f1a31dc5781c6eb5957f91541cce104.jpg', '0f2eaec90f8aeef12d7fd6372c15f62f.jpg', '17e8556d9401be0f71725e74d86f8b01.jpg', '1aeaa2b69da0d3cd45056af4ea4d67e1.jpg', '24218c192a9b8ca87be7d5cacc53400d.jpg', '24ea829dabda8f1e19c48cb14880a7d3.jpg', '2d1c0ef28e52afb948efe72a699032b1.jpg', '36eeb8ebaf0af6bc9133b238d3e7da97.jpg', '3a1ef0e75d2a8cce3d7190c389de2816.jpg', '3a3efdabbc2e4dad1a41534d4d177e9a.jpg', '3d1d8dcc5f652b242d89fbe002a00f01.jpg', '42b3fa34cb991d2e84d8ed66837d4048.jpg', '439aa75cf2ad2183a6c974601ee260d9.jpg', '4da59f47d18d0095bb4bf1e543fdf09c.jpg', '4f593a84b300270e080c5895b7224216.jpg', '63824080a8858d7056b4e00b780163d4.jpg', '66205a8beb23ce8d1e95554250c1d7d6.jpg', '697f997f1b4cf66fd967012085784e4e.jpg', '6b6fc8164ce95b4e21b1ae586b42e444.jpg', '704a8240266d1c5ff802947880441cbd.jpg', '76749abf07cafec7ce972cac4a6730c1.jpg', '849fdda6f021ac96f1acf12aad4f915c.jpg', '86c1cf597e8e9a43529b29f5d10595ec.jpg', '8ced1c3d1c2294f5c1d68bbb1d2eebd7.jpg', '8da4ef55cbc4fe53fc111a9db4d37cc1.jpg', '8ea3dceba19326694255d422dc8171c5.jpg', '91e95f04052d048899014d713331a064.jpg', '9823194454cab825a51a1ee50c678dbb.jpg', '9caa441c784950131dd40e5082ebf4d0.jpg', 'a01dd1fa04a0b9a82fc77921e9c52c5e.jpg', 'a53e67adb0899f2508265fa9cb69d7fa.jpg', 'a7fce219b98b07c2c772605398b3bd95.jpg', 'aa6fefe2e93aef87c8616afaf52e7649.jpg', 'b3ff4eb42d422a557bc6bbeed6eeb03b.jpg', 'bf5eb2c8a8ec5bfb7ed2415455c2c1cf.jpg', 'd17f516c7a74ceddf1538fdae73bfa86.jpg', 'd5739fa2a250e21674c28c34d59f755b.jpg', 'dbf86f83a7ed0e00ad8837daf5b8c351.jpg', 'ead3e2d7d412ab45c56283ac2a47cac9.jpg', 'f342e1deb4028c2538506bb2e67ac88b.jpg', 'fe65bf967dfa8495dc096375f81ba2db.jpg', 'ff0e27868a48f539d8248c1c7239832d.jpg', 'ff8f022971bf5e7d0cf0556a194f99b8.jpg',
];
const racingTeamGalleryImages: MerchWeMadeGalleryImage[] = racingTeamFilenames.map((name, i) => ({
  src: `${racingTeamBase}/${encodeURIComponent(name)}`,
  alt: `Racing Team Inspo ${i + 1}`,
}));
const racingTeamInspoContent: MerchWeMadePageContent = {
  heroBackgroundImage: `${racingTeamBase}/0292e81fee8b21438a1e2aba6d170abc.jpg`,
  heroBackgroundImageAlt: 'Racing Team Inspo',
  heroHeading: 'RACING TEAM INSPO',
  heroSubtext: 'Speed and team spirit inspo for racing.',
  layout: 'masonry',
  minimalLayout: true,
  galleryImages: racingTeamGalleryImages,
  fullWidthImage: `${racingTeamBase}/0292e81fee8b21438a1e2aba6d170abc.jpg`,
  fullWidthImageAlt: 'Racing Team Inspo',
  ctaTitle: 'Ready to create something?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

// Run Club Inspo
const runClubBase = '/our-work/Inspo/Run%20Club';
const runClubFilenames = [
  '00fd0fb56d7bde09fd305a9b482bbb29.jpg', '017148e1385ca0c0d5f94d95acf13a3b.jpg', '027e55a2369b69f6c1f4a120d4a9cdff.jpg', '07cbc5af7dc352e3ae3851e4217d0518.jpg', '0b5186298c77417385b647b1fa2c5c7f.jpg', '0c7422e57fdd7dce9697e9724e605913.jpg', '0cf03b11082c1c437617e09bf77363b8.jpg', '17328d23f6b7a8589f32769de994af29.jpg', '17501bc8a06129d53ea45918c2ca739a.jpg', '176c4b5a3896464960d015635b6c1e6c.jpg', '1a9863bb968ca2bf056d978ad8374ef5.jpg', '1a994fc62b0d13f743c1c578b341d75f.jpg', '1c3febfd3a855911f38c44d248995756.jpg', '1cc29b26330346033739b5fc222b5442.jpg', '1ce95367310ca4f198928069041f7fdb.jpg', '1f81b3589435cc6fd108216aac67b07c.jpg', '20e982ffb6a0604d32e88cf90ca69bdb.jpg', '23a9e49309f8c50cf1592f022ba5e6ad.jpg', '28d4c7bb9e200f950be39cf21e3c7ab6.jpg', '29e793bfc52580b39eb7709806512c2a.jpg', '2bac6fdd3ac76596c751f83c3f57f695.jpg', '341d049c865cdb82917d570674407c62.jpg', '3518f2d574254b99dbbcbf55546ef262.jpg', '38a3c9edc8a7894a52520f964e6a6290.jpg', '3acb44600f88a61216243db64be97636.jpg', '40df21f3c64eb217d6e725f2816ae24f.jpg', '4102824763979920e8b9bad0d906534a.jpg', '4402d3347839adef3504ad15a0442861.jpg', '458a860fdc929f1d4502286992774f7d.jpg', '46c4df7214735751781e06d8e7939690.jpg', '4c5600010be2a486676932f273e5919a.jpg', '4db209760fcc95e02fd163adef6f1c60.jpg', '51ca9c95c82a8dbde186a83d104ca5bc.jpg', '524e4a006cc1ae0b861f00786ce52d9a.jpg', '583d4b3c14d998d7aa7b6b60b9c6b814.jpg', '5ab08f71c868a9e5e2300de346ca80f5.jpg', '5aee5f0533c88b48d26d6e90a3e5d64e.jpg', '5dfad577b40db4714817c3105ead7213.jpg', '62414ae502a586ae210214f03d1adef1.jpg', '64b5de45e1b61aaaefa629af31e1878f.jpg', '64f60dec0177d440d156519d41786075.jpg', '66e92a9cf768d95b421d03dfba4cfd15.jpg', '674c78e0727cc157dbe997ed80586937.jpg', '67a5780a80cfe7ab2bd8b743b5cc27c3.jpg', '69dee31e49ac5fcdda7f8d8e35d528a3.jpg', '6beac6d28233639f37d4cf5afb51d451.jpg', '75a5530abfa6dd48810f29739e905707 (1).jpg', '75a5530abfa6dd48810f29739e905707.jpg', '76c685603ab691bdeafb7c3e14df7a92.jpg', '77785759fda8e9cfa24275b8e3089fac.jpg', '78a52faf21237d84fbf354d37b5cc7b9.jpg', '7aa29bf2638721b4f635e2a0c5076d96.jpg', '7ac1056d6035ad9a305f741ca6e1d6ac.jpg', '7baa07c93771f3246ffec334612f6d42.jpg', '7eb0fa8ac1e2c4fe9ad26845069e270e.jpg', '7fcdfaa2399437e10db298605b251cf6.jpg', '840634a4b492407509873f854666e3c9.jpg', '8631b81317bc5c85f757072c283b2eb6.jpg', '8d3a480695d909f83ae89fe6b94e98d3.jpg', '9261cb38f758d5b87a4b736188f31c2a.jpg', '9522617bc60d82d0606038c7ad77f4a6.jpg', '9ce1bbf81a68cdb544c0c6acadb862a1.jpg', '9f9cb7329ffe28c050b7cc0696f1eb5a.jpg', 'a0c42333f42e1a01d236818a45b8abca.jpg', 'a5793a2f013a1298665419151dab07d4.jpg', 'aa729799871d09bdf95743cb2ffcc823.jpg', 'ad0aedd5d2579a1a78833e7bbf11fd70.jpg', 'ae1467735a9b01f61951a39c1d982529.jpg', 'aecf58eb2783f64aa9e6314a98d99620.jpg', 'b004c308d8761d6f37fa1a20ed4f837e.jpg', 'b121ede7b23e8ceb50fe0f0e8fa6a26f.jpg', 'b1b1b71da8eb7be81d92b7bd57fb0960.jpg', 'b1c231e71eb697fffd701c7326eb921e.jpg', 'b4b692b5b35336539468fb6102fd5a30.jpg', 'b7d1b27d031f6b0f9773085edc52e495.jpg', 'baedd725ad100f6d5c94e9bcf7d0061a.jpg', 'bb7841356fec2ce76d3157a669b39d75.jpg', 'bc6015e43a7c66cf93ba4d7634fa842b.jpg', 'bd4c87cde3ceca111f144d92d8cb34f5.jpg', 'bdc912e92d809f347c7ec89a31104180.jpg', 'c01702803641379aeb1ba321fcf49672.jpg', 'cb5a0c6ffceb059a04a801784fd5ba52.jpg', 'cc76c6858425b62af4d895b60e3e5c88.jpg', 'cce6773989d409d90ca0dfd10facd42d.jpg', 'cf09cc1276d0eb343d2199c320d79c1b.jpg', 'cfb3773397ae9720cedb17323ea259d7.jpg', 'cfbd9802f62ab9857fea37dfafd453aa.jpg', 'd45aed7a7f6ea81e1834253a22929a43.jpg', 'd4adc226acbfc62de3bb58f2a769028d.jpg', 'd69b69ba19d53352c0b89fda5f676cad.jpg', 'd6b991cfbd2f5bd2ba8c236875e0f1bc.jpg', 'd9f0a4e00b7f6827ba1f781add3a3576.jpg', 'da3322c337a2b8c6459e7e856f130151.jpg', 'de08b493b85397b1312e753d11e4a08d.jpg', 'e2685c8929c84ace8311ab8211834103.jpg', 'e29c340582162a6217e3e6894bd50abe.jpg', 'e417a4cef67ee973e78acf4276475684.jpg', 'e46aea9077b9c6c99f853be6afe7f253.jpg', 'e4d1b9153fca5763ce67ab7f07ce81f5.jpg', 'e5ae696945f8be1624f7fce8b9aa909c.jpg', 'e66403b843026071bcd9022fc39b3841.jpg', 'f0cd0078e7a2d7db533ba26a0ce4d150.jpg', 'f12e6de8b67d7b686a6dfbf62cf44802.jpg', 'f4605ac398ce863735cb71c6c45df605.jpg', 'f552b76000fe30d115de9491f3f5d72a.jpg', 'f67883257f878b104695bf5a71176eb1.jpg', 'fc555ccdffd0a48d64cdf4251b7ebb1b.jpg', 'fd5c23e289943cfb3e9a3d10c1efde1e.jpg',
];
const runClubGalleryImages: MerchWeMadeGalleryImage[] = runClubFilenames.map((name, i) => ({
  src: `${runClubBase}/${encodeURIComponent(name)}`,
  alt: `Run Club Inspo ${i + 1}`,
}));
const runClubInspoContent: MerchWeMadePageContent = {
  heroBackgroundImage: `${runClubBase}/00fd0fb56d7bde09fd305a9b482bbb29.jpg`,
  heroBackgroundImageAlt: 'Run Club Inspo',
  heroHeading: 'RUN CLUB INSPO',
  heroSubtext: 'Running and community inspo for run clubs.',
  layout: 'masonry',
  minimalLayout: true,
  galleryImages: runClubGalleryImages,
  fullWidthImage: `${runClubBase}/00fd0fb56d7bde09fd305a9b482bbb29.jpg`,
  fullWidthImageAlt: 'Run Club Inspo',
  ctaTitle: 'Ready to create something?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

// Summer 2026 Inspo
const summer2026Base = '/our-work/Inspo/Summer%202026';
const summer2026Filenames = [
  '00d31b4fb084fc384a721855086dd366.jpg', '03e925c9da8da1a714bf09afc493f14b.jpg', '08587a50d58ba90cec5bf9cc01731af3.jpg', '159cf7f669384f8c5bcae83f2c02faa4.jpg', '17e144e37d0441b83c171b4f150b0bd0.jpg', '1aee473cfe350539e6de32de54a63b91.jpg', '1b8019324bec1311d40265ecc204741a.jpg', '1e31f6127e9e45ca32c4f8b27ce4ca00.jpg', '1e3f093e92a77fc109981ad557495123.jpg', '1f49af7c95597df490647eb90d395a6d.jpg', '1f81b3589435cc6fd108216aac67b07c.jpg', '2387a6b3a60aeb760456618d94947212.jpg', '27705bc6e35d8bc6124ae9a7bf6c949e.jpg', '2ab5903e1f68aa96091f9245c45cd307.jpg', '2abac020865cbab8f7828497801e8b53.jpg', '31b0e51f6790a6f47c1919f962290a1e.jpg', '362c1ecaf7fb430f2fdc9cae43f0495a.jpg', '3bcaebe170d8ca986ab7313fc734ae8c.jpg', '42154d6012c4f590f631798e229a3d4c.jpg', '4c4dac4debb2039d63d8a4e5ca99d8fd.jpg', '534e0f8165f32d8a9ed31f05c6d76737.jpg', '586965b8927fbb192d95b55874f64855.jpg', '5cbd4bfab68b05618fd29cf21e6cf237.jpg', '5d650a99521b9adf869f696840e2d657.jpg', '6353ad6c464d42d7ff66c223eab353f4.jpg', '6bebed45f832d72b00aecaf1b3a9b07b.jpg', '6c34a451d75996485883299e69f17f19.jpg', '7127a2dda640dfddf4f899db7be1ad9b.jpg', '73224cd46e243bac62c048c4773e9ac1.jpg', '7b05d5373ce85196a53a47fba46d3500.jpg', '7db8e2d82cd6c0b2fc5b5d73bb9c1856.jpg', '8056f0d8d5d4b1231a6ace18644de2ec.jpg', '96b13afa3bc327ef4aecef000f745722.jpg', '9c0b4a1d90be9ac816a9df95de2cb68e.jpg', 'acb648615c5e84f26b80f57f7a8fd2a3.jpg', 'bc111035ddd6544d36bbc80f5933e1f5.jpg', 'bd3652d9d1e952cef80152b6897b46ce.jpg', 'bd42a7e49aaf56678d87580e33cb2583.jpg', 'be643264b61e95b1575c8f2be9a2294e.jpg', 'c7dca9579b7aeab88a3bb019876debf3.jpg', 'c8f61017c29769fac8f38e089ae225c1.jpg', 'c97a569793a9273b6c96af5cdfe4500d.jpg', 'cae8fe3b051819ff3be0bb9b4ee0a198.jpg', 'd13449704857b2ac668dd86f346ea090.jpg', 'd415b845898e949c10493c6910854c2b.jpg', 'd51342772b05d092a300bdb47eadd107.jpg', 'd682864679f43a473b719cb2b09c2e9e.jpg', 'd7c0f97f07b2a4b43fc61d0d69e3acef.jpg', 'da08374f894a2041edd9c5df07af7150.jpg', 'e4c83061124c9b00d8043c3241c7b672.jpg', 'e7ecbe1c09a4a01a49bcda778dc8e2ae.jpg', 'ef57b9a3a08ef9a3b4f6f94460bb87a2.jpg', 'fb548bf3c68efa3fe2aae93568af4627.jpg', 'fde6833c730f404aa00c05bca095d5b7.jpg', 'ff8f022971bf5e7d0cf0556a194f99b8 (1).jpg',
];
const summer2026GalleryImages: MerchWeMadeGalleryImage[] = summer2026Filenames.map((name, i) => ({
  src: `${summer2026Base}/${encodeURIComponent(name)}`,
  alt: `Summer 2026 Inspo ${i + 1}`,
}));
const summer2026InspoContent: MerchWeMadePageContent = {
  heroBackgroundImage: `${summer2026Base}/00d31b4fb084fc384a721855086dd366.jpg`,
  heroBackgroundImageAlt: 'Summer 2026 Inspo',
  heroHeading: 'SUMMER 2026 INSPO',
  heroSubtext: 'Bright summer inspo for the Summer 2026 season.',
  layout: 'masonry',
  minimalLayout: true,
  galleryImages: summer2026GalleryImages,
  fullWidthImage: `${summer2026Base}/00d31b4fb084fc384a721855086dd366.jpg`,
  fullWidthImageAlt: 'Summer 2026 Inspo',
  ctaTitle: 'Ready to create something?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

/** Inspo page product carousel: picks + title by slug. Used by client for ProductShowcase in masonry inspo pages. */
export type InspoPicksItem = { image: string; imageAlt: string; name: string; description: string; link: string };
export const inspoPicksBySlug: Record<string, { picks: InspoPicksItem[]; title: string }> = {
  'spring-2026-inspo': { picks: summerPicks, title: "Things we're loving this Spring" },
  'july-4th-inspo': { picks: july4Picks, title: "Things we're loving this July" },
  'baseball-season-inspo': {
    picks: baseballSeasonFilenames.slice(0, 6).map((name, i) => ({
      image: `${baseballSeasonBase}/${encodeURIComponent(name)}`,
      imageAlt: `Baseball Season pick ${i + 1}`,
      name: 'Product name',
      description: 'Short description',
      link: '/catalog',
    })),
    title: "Things we're loving this season",
  },
  'collegiate-inspo': {
    picks: collegiateFilenames.slice(0, 6).map((name, i) => ({
      image: `${collegiateBase}/${encodeURIComponent(name)}`,
      imageAlt: `Collegiate pick ${i + 1}`,
      name: 'Product name',
      description: 'Short description',
      link: '/catalog',
    })),
    title: "Things we're loving",
  },
  'fall-2026-inspo': {
    picks: fall2026Filenames.slice(0, 6).map((name, i) => ({
      image: `${fall2026Base}/${encodeURIComponent(name)}`,
      imageAlt: `Fall 2026 pick ${i + 1}`,
      name: 'Product name',
      description: 'Short description',
      link: '/catalog',
    })),
    title: "Things we're loving this Fall",
  },
  'racing-team-inspo': {
    picks: racingTeamFilenames.slice(0, 6).map((name, i) => ({
      image: `${racingTeamBase}/${encodeURIComponent(name)}`,
      imageAlt: `Racing Team pick ${i + 1}`,
      name: 'Product name',
      description: 'Short description',
      link: '/catalog',
    })),
    title: "Things we're loving",
  },
  'run-club-inspo': {
    picks: runClubFilenames.slice(0, 6).map((name, i) => ({
      image: `${runClubBase}/${encodeURIComponent(name)}`,
      imageAlt: `Run Club pick ${i + 1}`,
      name: 'Product name',
      description: 'Short description',
      link: '/catalog',
    })),
    title: "Things we're loving",
  },
  'summer-2026-inspo': {
    picks: summer2026Filenames.slice(0, 6).map((name, i) => ({
      image: `${summer2026Base}/${encodeURIComponent(name)}`,
      imageAlt: `Summer 2026 pick ${i + 1}`,
      name: 'Product name',
      description: 'Short description',
      link: '/catalog',
    })),
    title: "Things we're loving this Summer",
  },
};

/** Content keyed by slug (e.g. "script", "case-study-6"). Add entries here for each Merch We Made page. */
export const merchWeMadeContentBySlug: Record<string, MerchWeMadePageContent> = {
  script: scriptContent,
  'be-right-back': beRightBackContent,
  varsity: varsityContent,
  'cloud-collection': cloudCollectionContent,
  'solos-pilates': solosPilatesContent,
  'spring-2026-inspo': spring2026InspoContent,
  'july-4th-inspo': july4InspoContent,
  'baseball-season-inspo': baseballSeasonInspoContent,
  'collegiate-inspo': collegiateInspoContent,
  'fall-2026-inspo': fall2026InspoContent,
  'racing-team-inspo': racingTeamInspoContent,
  'run-club-inspo': runClubInspoContent,
  'summer-2026-inspo': summer2026InspoContent,
};

const defaultCta = {
  ctaTitle: 'Ready to create something?',
  ctaButtonText: 'Get Started',
  ctaButtonHref: 'https://ethos-b2b.clickoapps.com/login',
};

/**
 * Get template content for a slug. If no custom content exists, returns fallback built from blog card data.
 */
export function getMerchWeMadeContent(
  slug: string,
  fallback: { title: string; description: string; img: string; alt?: string } | null
): MerchWeMadePageContent {
  const custom = merchWeMadeContentBySlug[slug];
  if (custom) {
    // Solos Pilates: deterministic shuffle + testimonial card between row 1 and row 2
    if (slug === 'solos-pilates' && custom.galleryImages.length > 0) {
      const shuffled = shuffleWithSeed(custom.galleryImages, slug);
      const testimonialItem: MerchWeMadeGalleryImage = {
        src: '',
        alt: '',
        className: 'md:col-span-4',
        testimonial: {
          author: 'Kelley Moller',
          role: 'Owner',
          avatar: `${solosPilatesBase}/Attachment-1.jpeg`,
          avatarAlt: 'Kelley Moller',
          quote: 'Truly a one-stop shop for everything you need in boutique fitness retail.',
          body: 'Working with Ethos has been a game-changer for our studio. The flexibility in design and variety of merch options let us create pieces that our clients actually want to wear.\n\nQuality and pricing are exactly what we needed for a boutique fitness retail experience. From tanks to socks to accessories, everything feels premium and on-brand.\n\nThe process was streamlined from start to finish. We\'ll definitely be ordering again.',
          image: `${solosPilatesBase}/8D2A9576.png`,
          imageAlt: 'Solos Pilates retail merchandise',
        },
      };
      let galleryWithTestimonial = [
        ...shuffled.slice(0, 4),
        testimonialItem,
        ...shuffled.slice(4),
      ];
      // Swap video in row 3 with image 1 in row 2 (index 5)
      const row3Start = 9;
      const row3End = 12;
      const row2First = 5;
      const videoInRow3Index = galleryWithTestimonial
        .slice(row3Start, row3End)
        .findIndex((item) => item.video);
      if (videoInRow3Index !== -1) {
        const videoIndex = row3Start + videoInRow3Index;
        const a = galleryWithTestimonial[row2First];
        const b = galleryWithTestimonial[videoIndex];
        galleryWithTestimonial = [...galleryWithTestimonial];
        galleryWithTestimonial[row2First] = b;
        galleryWithTestimonial[videoIndex] = a;
      }
      // Tooltip (hotspot) design – same as Script page
      const embroideryHotspot = [
        {
          x: 65,
          y: 35,
          title: 'Custom Embroidery',
          description: 'Our premium embroidery service allows you to add your brand logo or custom text to any garment.',
          image: '/ethos-hoodie-hotspot.png',
          imageAlt: 'Custom Embroidery Example',
          link: '/what-we-do/embroidery',
        },
      ];
      // Row 1 image 4 (index 3)
      const row1Image4Index = 3;
      const row1Image4 = galleryWithTestimonial[row1Image4Index];
      if (row1Image4 && !row1Image4.testimonial) {
        galleryWithTestimonial = [...galleryWithTestimonial];
        galleryWithTestimonial[row1Image4Index] = { ...row1Image4, hotspots: embroideryHotspot };
      }
      // Row 3 image 2 (index 10)
      const row3Image2Index = 10;
      const row3Image2 = galleryWithTestimonial[row3Image2Index];
      if (row3Image2 && !row3Image2.testimonial) {
        galleryWithTestimonial = [...galleryWithTestimonial];
        galleryWithTestimonial[row3Image2Index] = { ...row3Image2, hotspots: embroideryHotspot };
      }
      const base = { ...custom, galleryImages: galleryWithTestimonial };
      if (fallback?.img) {
        base.heroBackgroundImage = fallback.img;
        base.heroBackgroundImageAlt = fallback.alt ?? fallback.title;
      }
      return base;
    }
    if (fallback?.img) {
      return { ...custom, heroBackgroundImage: fallback.img, heroBackgroundImageAlt: fallback.alt ?? fallback.title };
    }
    return custom;
  }

  // Fallback: use card data for hero and full-width image; empty gallery and products
  const title = fallback?.title ?? slug;
  const description = fallback?.description ?? '';
  // Fallback image: use card img, or first image from this post’s folder if you add /our-work/<slug>/ later
  const img = fallback?.img ?? '/our-work/Script/BF5A8725.jpg';

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
