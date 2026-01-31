import { MerchWeMadePageClient } from './merch-we-made-page-client';

interface MerchWeMadePageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Merch We Made detail page – same template for every slug.
 * Content is driven by lib/merch-we-made-content.ts (and blog card fallback).
 * Server wrapper unwraps params so the client never receives a Promise (Next.js 15+).
 */
export default async function MerchWeMadePage({ params }: MerchWeMadePageProps) {
  const { slug } = await params;
  return <MerchWeMadePageClient slug={slug} />;
}
