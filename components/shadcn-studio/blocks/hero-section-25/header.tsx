'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  HeroNavigation01,
  HeroNavigation01SmallScreen,
  type Navigation,
} from '@/components/shadcn-studio/blocks/hero-navigation-01';
import Logo from '@/components/shadcn-studio/logo';
import { cn } from '@/lib/utils';

type HeaderProps = {
  navigationData: Navigation[];
  className?: string;
};

const Header = ({ navigationData, className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-16 w-full border-b transition-all duration-300',
        {
          'bg-card/75 backdrop-blur': isScrolled,
        },
        className
      )}
    >
      {/* Desktop layout */}
      <div className="mx-auto hidden h-full w-full items-center justify-between gap-6 px-4 sm:px-6 md:flex">
        <Link href="/">
          <Logo className="gap-3" />
        </Link>

        <HeroNavigation01 navigationData={navigationData} navigationClassName="md:block" />

        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-lg" asChild>
            <a href="https://ethos-b2b.clickoapps.com/login">Login</a>
          </Button>
          <Button className="rounded-lg" asChild>
            <a href="https://ethos-b2b.clickoapps.com/login">Get Started</a>
          </Button>
        </div>
      </div>

      {/* Mobile layout: menu left, logo center */}
      <div className="mx-auto flex h-full w-full items-center px-4 md:hidden">
        <HeroNavigation01SmallScreen
          navigationData={navigationData}
          screenSize={767}
          triggerClassName="md:hidden"
          actions={
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="rounded-lg w-full" asChild>
                <a href="https://ethos-b2b.clickoapps.com/login">Login</a>
              </Button>
              <Button className="rounded-lg w-full" asChild>
                <a href="https://ethos-b2b.clickoapps.com/login">Get Started</a>
              </Button>
            </div>
          }
        />
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Logo className="gap-3" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
