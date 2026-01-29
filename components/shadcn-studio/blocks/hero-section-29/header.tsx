'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-navigation-02';

interface HeaderProps {
  navigationData: Navigation[];
}

export default function Header({ navigationData }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push(href);
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="https://cdn.shopify.com/s/files/1/0609/4752/9901/files/Ethos_Logo-05.jpg?v=1769654967"
                alt="Ethos Logo"
                width={120}
                height={40}
                className="h-6 w-auto dark:invert"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex md:items-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
            <div className="flex items-center space-x-1">
              {navigationData.map((item, index) => (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => item.items && setActiveDropdown(item.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.items ? (
                    <>
                      <button className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900">
                        {item.title}
                      </button>
                      {activeDropdown === item.title && (
                        <div className="absolute left-0 mt-2 w-96 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg p-4 z-50">
                          {item.subtitle && (
                            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
                              {item.subtitle}
                            </p>
                          )}
                          <div className="grid grid-cols-1 gap-2">
                            {item.items.map((navItem, idx) => (
                              <Link
                                key={idx}
                                href={navItem.href}
                                className="flex items-start gap-3 p-2 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                              >
                                {navItem.icon && (
                                  <div className="mt-0.5">{navItem.icon}</div>
                                )}
                                <div>
                                  <div className="text-sm font-medium text-black dark:text-white">
                                    {navItem.title}
                                  </div>
                                  {navItem.description && (
                                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                      {navItem.description}
                                    </div>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>
                          {item.imageSection && (
                            <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                              <Link href={item.imageSection.href} className="block">
                                <img
                                  src={item.imageSection.img}
                                  alt={item.imageSection.title}
                                  className="w-full rounded-md mb-2"
                                />
                                <div className="text-sm font-medium text-black dark:text-white">
                                  {item.imageSection.title}
                                </div>
                                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                  {item.imageSection.description}
                                </div>
                              </Link>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      onClick={(e) => handleLinkClick(e, item.href || '#')}
                      className={`text-sm font-medium transition-all duration-200 px-4 py-2 ${
                        pathname === item.href
                          ? 'text-black dark:text-white underline'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Get Started Button - Right Side */}
          <div className="hidden md:block">
            <Link
              href="https://ethos-b2b.clickoapps.com/login"
              className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {!mobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationData.map((item) => (
              <div key={item.title}>
                {item.items ? (
                  <div>
                    <div className="text-zinc-600 dark:text-zinc-400 px-3 py-2 text-base font-medium">
                      {item.title}
                    </div>
                    <div className="pl-4 space-y-1">
                      {item.items.map((navItem, idx) => (
                        <Link
                          key={idx}
                          href={navItem.href}
                          className="text-zinc-500 dark:text-zinc-500 block px-3 py-2 text-sm"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {navItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href || '#'}
                    className={`block px-3 py-2 text-base font-medium transition-all duration-200 rounded-md ${
                      pathname === item.href
                        ? 'bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white underline'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                    }`}
                    onClick={(e) => {
                      handleLinkClick(e, item.href || '#');
                      setMobileMenuOpen(false);
                    }}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="https://ethos-b2b.clickoapps.com/login"
              className="bg-black text-white inline-block px-4 py-2 rounded-md text-base font-medium mt-2 ml-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

