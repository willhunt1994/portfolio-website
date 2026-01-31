import { CaseStudyPageClient } from './case-study-page-client';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Case Study detail page – same template as merch-we-made/solos-pilates.
 * Content is per-case-study: edit lib/case-study-content.ts.
 * Server wrapper unwraps params so the client never receives a Promise (Next.js 15+).
 */
export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  return <CaseStudyPageClient slug={slug} />;
}
