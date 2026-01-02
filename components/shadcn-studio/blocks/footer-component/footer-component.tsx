import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center py-4">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image
                src="https://cdn.shopify.com/s/files/1/0609/4752/9901/files/Ethos_Logo_-_Black.png?v=1767327560"
                alt="Ethos Logo"
                width={120}
                height={40}
                className="h-6 w-auto dark:invert"
              />
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
              What We Do
            </Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
              Our Work
            </Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
              Contact
            </Link>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-zinc-600 dark:text-zinc-400">
            <p>© {new Date().getFullYear()} Ethos. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

