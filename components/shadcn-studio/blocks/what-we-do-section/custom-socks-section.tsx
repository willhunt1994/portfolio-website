import Link from 'next/link';

export default function CustomSocksSection() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 my-20">
      <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
        <div className="text-center z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
            CUSTOM SOCKS
          </h2>
          <Link
            href="#"
            className="inline-block bg-white dark:bg-black text-black dark:text-white px-6 py-3 rounded-md text-base font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors border border-black dark:border-white"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}

