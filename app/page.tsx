import Header from '@/components/shadcn-studio/blocks/hero-section-29/header';
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-29/hero-section-29';
import HeroSectionImage from '@/components/shadcn-studio/blocks/hero-section-29/hero-section-image';
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-navigation-02';
import Features from '@/components/shadcn-studio/blocks/features-section-06/features-section-06';

const navigationData: Navigation[] = [
  {
    title: 'What We Do',
    href: '/what-we-do'
  },
  {
    title: 'Our Work',
    href: '#'
  }
];

const featuresData = [
  {
    title: 'Content #1',
    subtitle: 'Create dashboards with shadcn/studio that provide real-time insights.',
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-2.png',
    imageAlt: 'Content #1',
    cursorText: 'Case Study 1',
    href: '/case-study-1',
    description: 'explain something here'
  },
  {
    title: 'Content #2',
    subtitle: 'shadcn/studio provides customizable charts and graphs for clearer data representation.',
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-4.png',
    imageAlt: 'Content #2',
    cursorText: 'Case Study 2',
    href: '/case-study-2',
    description: 'explain something here'
  },
  {
    title: 'Content #3',
    subtitle: "Manage workflows effortlessly with shadcn/studio's intuitive UI components.",
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-3.png',
    imageAlt: 'Content #3',
    cursorText: 'Case Study 3',
    href: '/case-study-3',
    description: 'explain something here'
  },
  {
    title: 'Content #4',
    subtitle: 'Connect teams with shadcn/studio collaboration tools and real-time updates.',
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-2.png',
    imageAlt: 'Content #4',
    cursorText: 'Case Study 4',
    href: '/case-study-4',
    description: 'explain something here'
  }
];

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col relative'>
      {/* Header Section */}
      <Header navigationData={navigationData} />

      {/* Main Content */}
      <main className='flex flex-1 flex-col'>
        <HeroSection />
        <Features featuresData={featuresData} />
        <HeroSectionImage />
      </main>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-8 text-center">
            Get In Touch
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-12 text-center max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col gap-4">
              <a
                href="mailto:your.email@example.com"
                className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors text-center"
              >
                <span className="text-black dark:text-white font-medium">
                  📧 your.email@example.com
                </span>
              </a>
              <div className="flex gap-4 justify-center">
                <a
                  href="https://github.com/mranav2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                >
                  <span className="text-black dark:text-white">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                >
                  <span className="text-black dark:text-white">LinkedIn</span>
                </a>
                <a
                  href="https://twitter.com/yourhandle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                >
                  <span className="text-black dark:text-white">Twitter</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto text-center text-zinc-600 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} Ethos. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
