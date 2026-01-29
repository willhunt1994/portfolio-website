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
    img: 'https://drive.google.com/uc?export=view&id=1S5zI7MUI2HpabdoiMgMfgYdQnafSxb6B',
    alt: 'Spring 2026 Inspo',
    title: 'Spring 2026 Inspo',
    description:
      'Soft pastel inspo for the Spring 2026 season.',
    tags: ['Inspo']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-2.png',
    alt: 'Traditional house',
    title: 'Thane Development Plan 2026 & Master Plan',
    description:
      'Discover a unique nook in the heart of the city, offering convenience and access to attractions. Stylishly designed, it provides a comfortable retreat.',
    tags: ['Case Study']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-3.png',
    alt: 'Modern house with pool',
    title: 'What is a Property Sale Agreement?',
    description:
      'Welcome to this charming independent house bedroom, featuring a spacious layout and cozy furnishings. Enjoy abundant natural light and peaceful.',
    tags: ['Case Study']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-1.png',
    alt: 'Modern house',
    title: 'Case Study 4',
    description:
      'Experience the charm of this lovely and cozy apartment, featuring warm decor and inviting spaces, perfect for relaxation and comfort, ideal for your next getaway.',
    tags: ['Case Study']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-2.png',
    alt: 'Traditional house',
    title: 'Case Study 5',
    description:
      'Discover a unique nook in the heart of the city, offering convenience and access to attractions. Stylishly designed, it provides a comfortable retreat.',
    tags: ['Case Study', 'Merch We Made']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-3.png',
    alt: 'Modern house with pool',
    title: 'Case Study 6',
    description:
      'Welcome to this charming independent house bedroom, featuring a spacious layout and cozy furnishings. Enjoy abundant natural light and peaceful.',
    tags: ['Inspo']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-1.png',
    alt: 'Modern house',
    title: 'Case Study 7',
    description:
      'Experience the charm of this lovely and cozy apartment, featuring warm decor and inviting spaces, perfect for relaxation and comfort, ideal for your next getaway.',
    tags: ['Merch We Made']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-2.png',
    alt: 'Traditional house',
    title: 'Case Study 8',
    description:
      'Discover a unique nook in the heart of the city, offering convenience and access to attractions. Stylishly designed, it provides a comfortable retreat.',
    tags: ['Case Study']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-3.png',
    alt: 'Modern house with pool',
    title: 'Case Study 9',
    description:
      'Welcome to this charming independent house bedroom, featuring a spacious layout and cozy furnishings. Enjoy abundant natural light and peaceful.',
    tags: ['Inspo']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-1.png',
    alt: 'Modern house',
    title: 'Case Study 10',
    description:
      'Experience the charm of this lovely and cozy apartment, featuring warm decor and inviting spaces, perfect for relaxation and comfort, ideal for your next getaway.',
    tags: ['Merch We Made']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-2.png',
    alt: 'Traditional house',
    title: 'Case Study 11',
    description:
      'Discover a unique nook in the heart of the city, offering convenience and access to attractions. Stylishly designed, it provides a comfortable retreat.',
    tags: ['Case Study']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-3.png',
    alt: 'Modern house with pool',
    title: 'Case Study 12',
    description:
      'Welcome to this charming independent house bedroom, featuring a spacious layout and cozy furnishings. Enjoy abundant natural light and peaceful.',
    tags: ['Case Study', 'Inspo']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-1.png',
    alt: 'Modern house',
    title: 'Case Study 13',
    description:
      'Experience the charm of this lovely and cozy apartment, featuring warm decor and inviting spaces, perfect for relaxation and comfort, ideal for your next getaway.',
    tags: ['Inspo']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-2.png',
    alt: 'Traditional house',
    title: 'Case Study 14',
    description:
      'Discover a unique nook in the heart of the city, offering convenience and access to attractions. Stylishly designed, it provides a comfortable retreat.',
    tags: ['Merch We Made']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-3.png',
    alt: 'Modern house with pool',
    title: 'Case Study 15',
    description:
      'Welcome to this charming independent house bedroom, featuring a spacious layout and cozy furnishings. Enjoy abundant natural light and peaceful.',
    tags: ['Case Study']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-1.png',
    alt: 'Modern house',
    title: 'Case Study 16',
    description:
      'Experience the charm of this lovely and cozy apartment, featuring warm decor and inviting spaces, perfect for relaxation and comfort, ideal for your next getaway.',
    tags: ['Case Study', 'Merch We Made']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-2.png',
    alt: 'Traditional house',
    title: 'Case Study 17',
    description:
      'Discover a unique nook in the heart of the city, offering convenience and access to attractions. Stylishly designed, it provides a comfortable retreat.',
    tags: ['Inspo']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-3.png',
    alt: 'Modern house with pool',
    title: 'Case Study 18',
    description:
      'Welcome to this charming independent house bedroom, featuring a spacious layout and cozy furnishings. Enjoy abundant natural light and peaceful.',
    tags: ['Merch We Made']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-1.png',
    alt: 'Modern house',
    title: 'Case Study 19',
    description:
      'Experience the charm of this lovely and cozy apartment, featuring warm decor and inviting spaces, perfect for relaxation and comfort, ideal for your next getaway.',
    tags: ['Case Study', 'Inspo']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-2.png',
    alt: 'Traditional house',
    title: 'Case Study 20',
    description:
      'Discover a unique nook in the heart of the city, offering convenience and access to attractions. Stylishly designed, it provides a comfortable retreat.',
    tags: ['Inspo', 'Merch We Made']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-3.png',
    alt: 'Modern house with pool',
    title: 'Case Study 21',
    description:
      'Welcome to this charming independent house bedroom, featuring a spacious layout and cozy furnishings. Enjoy abundant natural light and peaceful.',
    tags: ['Case Study']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-1.png',
    alt: 'Modern house',
    title: 'Case Study 22',
    description:
      'Experience the charm of this lovely and cozy apartment, featuring warm decor and inviting spaces, perfect for relaxation and comfort, ideal for your next getaway.',
    tags: ['Merch We Made']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-2.png',
    alt: 'Traditional house',
    title: 'Case Study 23',
    description:
      'Discover a unique nook in the heart of the city, offering convenience and access to attractions. Stylishly designed, it provides a comfortable retreat.',
    tags: ['Case Study', 'Inspo']
  },
  {
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-3.png',
    alt: 'Modern house with pool',
    title: 'Case Study 24',
    description:
      'Welcome to this charming independent house bedroom, featuring a spacious layout and cozy furnishings. Enjoy abundant natural light and peaceful.',
    tags: ['Case Study', 'Merch We Made']
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
    blogLink: `/case-study/${generateSlug(card.title)}`
  }));
}
