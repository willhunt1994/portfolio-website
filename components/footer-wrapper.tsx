'use client';

import { usePathname } from 'next/navigation';
import MegaFooter from '@/components/shadcn-studio/blocks/mega-footer-02/mega-footer-02';

export default function FooterWrapper() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  const isOrders = pathname?.startsWith('/orders');
  const isMockupSubmissions = pathname?.startsWith('/mockup-submissions');

  if (isDashboard || isOrders || isMockupSubmissions) {
    return null;
  }

  return <MegaFooter />;
}
