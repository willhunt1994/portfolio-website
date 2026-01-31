'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/shadcn-studio/blocks/hero-section-25/header';
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-navigation-01';

export default function HeaderWrapper() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  const isOrders = pathname?.startsWith('/orders');
  const isMockupSubmissions = pathname?.startsWith('/mockup-submissions');
  const isMockupsSubmissions2 = pathname?.startsWith('/mockups-submissions');
  const isLogin = pathname?.startsWith('/login');
  const isRegister = pathname?.startsWith('/register');
  const isForgotPassword = pathname?.startsWith('/forgot-password');

  // Hide header on dashboard, orders, mockup-submissions, mockups-submissions-2, login, register, and forgot-password pages
  if (isDashboard || isOrders || isMockupSubmissions || isMockupsSubmissions2 || isLogin || isRegister || isForgotPassword) {
    return null;
  }

  const navigationData: Navigation[] = [
    {
      title: 'What We Do',
      href: '/what-we-do',
    },
    {
      title: 'Our Work',
      href: '/our-work',
    },
    {
      title: 'Catalog',
      href: '/catalog',
    },
  ];

  return <Header navigationData={navigationData} />;
}
