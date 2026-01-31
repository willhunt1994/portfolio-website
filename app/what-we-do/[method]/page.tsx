import { WhatWeDoPageClient } from './what-we-do-page-client';

interface WhatWeDoMethodPageProps {
  params: Promise<{ method: string }>;
}

/**
 * What We Do method detail page – same template for every slug.
 * Content is driven by lib/what-we-do-content.ts.
 * Server wrapper unwraps params so the client never receives a Promise (Next.js 15+).
 */
export default async function WhatWeDoMethodPage({ params }: WhatWeDoMethodPageProps) {
  const { method } = await params;
  return <WhatWeDoPageClient slug={method} />;
}
