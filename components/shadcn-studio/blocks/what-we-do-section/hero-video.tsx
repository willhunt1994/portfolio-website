import Link from 'next/link';

export default function HeroVideo() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-zinc-100 dark:bg-zinc-900">
      <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
        <div className="text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-4">
            VIDEO WITH TEXT OVERLAY
          </h1>
          <p className="text-lg md:text-xl text-black dark:text-white mb-6">
            Hit the link below to get started.
          </p>
          <Link
            href="https://ethos-b2b.clickoapps.com/login"
            className="inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-md text-base font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}

