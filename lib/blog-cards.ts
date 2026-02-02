// Shared blog/case study card data for Our Work and home page

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const blogCardsData = [
  {
    img: 'https://drive.google.com/uc?export=view&id=1VnNs7Z0w363VEmfe3pKaC_iUWifQeDN5',
    alt: 'Script Gallery',
    title: 'Script',
    description:
      'Designed as a uniform for slower days, studio mornings, and everything in between.',
    tags: ['Merch We Made']
  },
  {
    img: '/our-work/Merch%20We%20Made/Be%20Right%20Back/BF5A8725.jpg',
    alt: 'ETHOS CO. athleisure and custom goods at airport',
    title: 'Be Right Back',
    description:
      'A travel moment with a calm athleisure lifestyle vibe.',
    tags: ['Merch We Made']
  },
  {
    img: '/our-work/Merch%20We%20Made/Varsity/395A8862.jpg',
    alt: 'Varsity – cozy café moment',
    title: 'Varsity',
    description:
      'A cozy café moment with varsity-inspired vibe.',
    tags: ['Merch We Made']
  },
  {
    img: '/our-work/Merch%20We%20Made/Cloud%20Collection/395A7001.jpg',
    alt: 'Cloud Collection',
    title: 'Cloud Collection',
    description: 'Soft, elevated merch with a cloud-inspired vibe.',
    tags: ['Merch We Made']
  },
  {
    img: 'https://drive.google.com/uc?export=view&id=1S5zI7MUI2HpabdoiMgMfgYdQnafSxb6B',
    alt: 'Spring 2026 Inspo',
    title: 'Spring 2026 Inspo',
    description:
      'Soft pastel inspo for the Spring 2026 season.',
    tags: ['Inspo']
  },
  {
    img: '/our-work/Inspo/July%204th/1fb0ae7172039a498d602593c6d4eb56.jpg',
    alt: 'July 4th Inspo',
    title: 'July 4th Inspo',
    description:
      'Patriotic inspo for the Fourth of July.',
    tags: ['Inspo']
  },
  {
    img: '/our-work/Inspo/Baseball%20Season/0a362b0578c28c11969a04e0bde9a733.jpg',
    alt: 'Baseball Season Inspo',
    title: 'Baseball Season Inspo',
    description: 'Dugout and diamond inspo for baseball season.',
    tags: ['Inspo']
  },
  {
    img: '/our-work/Inspo/Collegiate/012e18c07b2fc744f8db292a78f9f012.jpg',
    alt: 'Collegiate Inspo',
    title: 'Collegiate Inspo',
    description: 'Campus and game day inspo with collegiate spirit.',
    tags: ['Inspo']
  },
  {
    img: '/our-work/Inspo/Fall%202026/048a8d9ef5de13fb5d26b26de567cb64.jpg',
    alt: 'Fall 2026 Inspo',
    title: 'Fall 2026 Inspo',
    description: 'Cozy autumn inspo for the Fall 2026 season.',
    tags: ['Inspo']
  },
  {
    img: '/our-work/Inspo/Racing%20Team/0292e81fee8b21438a1e2aba6d170abc.jpg',
    alt: 'Racing Team Inspo',
    title: 'Racing Team Inspo',
    description: 'Speed and team spirit inspo for racing.',
    tags: ['Inspo']
  },
  {
    img: '/our-work/Inspo/Run%20Club/00fd0fb56d7bde09fd305a9b482bbb29.jpg',
    alt: 'Run Club Inspo',
    title: 'Run Club Inspo',
    description: 'Running and community inspo for run clubs.',
    tags: ['Inspo']
  },
  {
    img: '/our-work/Inspo/Summer%202026/00d31b4fb084fc384a721855086dd366.jpg',
    alt: 'Summer 2026 Inspo',
    title: 'Summer 2026 Inspo',
    description: 'Bright summer inspo for the Summer 2026 season.',
    tags: ['Inspo']
  },
  {
    img: '/our-work/Case%20Study/Solos%20Pilates/8D2A9578.png',
    alt: 'Solos Pilates',
    title: 'Solos Pilates',
    description:
      'A high end boutique pilates studio with 4 locations in Socal.',
    tags: ['Case Study']
  },
  {
    img: '/our-work/Case%20Study/Helios/8D2A9710.jpg',
    alt: 'Helios – luxury Pilates studio Little Italy San Diego',
    title: 'Helios',
    description:
      'A luxury Pilates studio in the heart of Little Italy, San Diego.',
    tags: ['Case Study']
  },
  {
    img: '/our-work/Case%20Study/Cymbiotika/395A8520.jpg',
    alt: 'Cymbiotika',
    title: 'Cymbiotika',
    description: 'Premium supplements and wellness brand – custom merch that fits the brand.',
    tags: ['Case Study']
  },
  {
    img: '/our-work/Case%20Study/Katie%20Austin%20Workout%20Tour/395A6334.jpg',
    alt: 'Katie Austin Workout Tour',
    title: 'Katie Austin Workout Tour',
    description: 'Tour merch and apparel for the Katie Austin Workout Tour.',
    tags: ['Case Study']
  },
  {
    img: '/our-work/Case%20Study/The%20Glow%20Morning/FB2A0865.jpg',
    alt: 'The Glow Morning',
    title: 'The Glow Morning',
    description: 'Morning wellness and lifestyle brand – merch that brings the glow.',
    tags: ['Case Study']
  },
  {
    img: '/our-work/Case%20Study/Activate%20House/IMG_3749.JPG',
    alt: 'Activate House',
    title: 'Activate House',
    description: 'Custom merch and brand experience for Activate House.',
    tags: ['Case Study']
  },
  {
    img: '/our-work/Case%20Study/Pilates%20Leucadia/DSC04186_copy.webp',
    alt: 'Pilates Leucadia',
    title: 'Pilates Leucadia',
    description: 'Boutique pilates studio in Leucadia – custom apparel and merchandise.',
    tags: ['Case Study']
  },
  {
    img: '/our-work/Case%20Study/Bodyrok/DSC04223_copy.webp',
    alt: 'Bodyrok',
    title: 'Bodyrok',
    description: 'Custom merch and brand experience for Bodyrok.',
    tags: ['Case Study']
  }
];

export type BlogCard = {
  img: string;
  alt: string;
  title: string;
  description: string;
  blogLink: string;
  tags?: string[];
};

export function getBlogCards(): BlogCard[] {
  return blogCardsData.map(card => ({
    ...card,
    blogLink: card.tags?.includes('Case Study')
      ? `/case-study/${generateSlug(card.title)}`
      : `/merch-we-made/${generateSlug(card.title)}`,
  }));
}

/** Get a single card by slug (e.g. "script", "case-study-6") for use in detail pages. */
export function getBlogCardBySlug(slug: string): { title: string; description: string; img: string } | null {
  const card = blogCardsData.find(c => generateSlug(c.title) === slug);
  return card ? { title: card.title, description: card.description, img: card.img } : null;
}
