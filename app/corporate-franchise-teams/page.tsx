import RichText from '@/components/shadcn-studio/blocks/rich-text-component/rich-text-component';
import CollaborationTimeline from '@/components/shadcn-studio/blocks/collaboration-timeline/collaboration-timeline';
import WorkLinksSection from '@/components/shadcn-studio/blocks/work-links-section/work-links-section';
import Link from 'next/link';

const navigationData: Navigation[] = [
  {
    title: 'What We Do',
    href: '/what-we-do'
  },
  {
    title: 'Our Work',
    href: '/our-work'
  },
  {
    title: 'Catalog',
    href: '/catalog'
  }
];

// Timeline events with images
const timelineEvents = [
  {
    title: 'Initial Discovery & Consultation',
    description: 'We dive deep into understanding your brand, values, and goals for the collaboration.',
    details: [
      'Brand identity analysis',
      'Target audience research',
      'Budget and timeline discussion',
      'Product category exploration'
    ],
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-1.png',
    imageAlt: 'Initial Discovery & Consultation'
  },
  {
    title: 'Creative Strategy & Concept Development',
    description: 'Our team crafts unique concepts tailored specifically to your brand and campaign objectives.',
    details: [
      'Mood board creation',
      'Design direction proposals',
      'Material and finish selection',
      'Sample product mockups'
    ],
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-2.png',
    imageAlt: 'Creative Strategy & Concept Development'
  },
  {
    title: 'Design Refinement & Approval',
    description: 'We iterate on designs based on your feedback until every detail meets your vision.',
    details: [
      'Multiple design revisions',
      'Color palette optimization',
      'Typography and branding integration',
      'Final design approval process'
    ],
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-3.png',
    imageAlt: 'Design Refinement & Approval'
  },
  {
    title: 'Production Planning & Quality Control',
    description: 'Meticulous attention to production details ensures consistent, high-quality results.',
    details: [
      'Manufacturing partner selection',
      'Quality assurance protocols',
      'Production timeline management',
      'Pre-production samples review'
    ],
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-1.png',
    imageAlt: 'Production Planning & Quality Control'
  },
  {
    title: 'Fulfillment & Distribution',
    description: 'We handle every aspect of getting your products to the right people at the right time.',
    details: [
      'Custom packaging design',
      'Inventory management',
      'Shipping coordination',
      'Delivery tracking and confirmation'
    ],
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-2.png',
    imageAlt: 'Fulfillment & Distribution'
  },
  {
    title: 'Post-Launch Support & Analysis',
    description: 'Our partnership continues beyond delivery with ongoing support and performance insights.',
    details: [
      'Customer feedback collection',
      'Campaign performance analysis',
      'Re-order facilitation',
      'Long-term partnership planning'
    ],
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-3.png',
    imageAlt: 'Post-Launch Support & Analysis'
  }
];

// Work links - linking to some of the 'our work' posts
const workLinks = [
  {
    title: 'Spring 2026 Inspo',
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-1.png',
    imageAlt: 'Spring 2026 Inspo',
    href: '/case-study/spring-2026-inspo'
  },
  {
    title: 'Thane Development Plan 2026 & Master Plan',
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-2.png',
    imageAlt: 'Thane Development Plan',
    href: '/case-study/thane-development-plan-2026-master-plan'
  },
  {
    title: 'Case Study 4',
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/blog/image-1.png',
    imageAlt: 'Case Study 4',
    href: '/case-study/case-study-4'
  },
];

export default function CorporateFranchiseTeams() {
  return (
    <div className='flex min-h-screen flex-col relative'>
      <main className='flex flex-1 flex-col pt-20'>
        {/* Breadcrumb */}
        <div className="px-6 pt-0 pb-4 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto">
            <nav className="text-sm text-zinc-600 dark:text-zinc-400">
              <Link href="/" className="hover:text-black dark:hover:text-white">Home</Link>
              {' > '}
              <Link href="/what-we-do" className="hover:text-black dark:hover:text-white">What We Do</Link>
              {' > '}
              <span className="text-black dark:text-white">Corporate & Franchise Teams</span>
            </nav>
          </div>
        </div>

        {/* Rich Text Section */}
        <RichText 
          heading="Corporate & Franchise Teams"
          subheading="Customize this page content"
          buttonText=""
        />

        {/* Collaboration Timeline */}
        <CollaborationTimeline events={timelineEvents} />

        {/* Work Links Section - 3 columns */}
        <WorkLinksSection workLinks={workLinks} />
      </main>
    </div>
  );
}
