import Header from '@/components/shadcn-studio/blocks/hero-section-29/header';
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-29/hero-section-29';
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-navigation-02';
import Features from '@/components/shadcn-studio/blocks/features-section-06/features-section-06';

import Marquee from '@/components/ui/marquee';

const navigationData: Navigation[] = [
  {
    title: 'What We Do',
    href: '#'
  },
  {
    title: 'Our Work',
    href: '#'
  }
];

const featuresData = [
  {
    title: 'Monitor Your Metrics Effortlessly and Accurately.',
    subtitle: 'Create dashboards with shadcn/studio that provide real-time insights.',
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-2.png',
    imageAlt: 'Monitor Your Metrics Effortlessly and Accurately',
    cursorText: 'Case Study 1',
    href: '/gallery',
    description:
      'Create dynamic dashboards with shadcn/studio for real-time insights and metrics. Widgets and live feeds keep your data up-to-date.'
  },
  {
    title: 'Visualize Your Data with Clarity Precision.',
    subtitle: 'shadcn/studio provides customizable charts and graphs for clearer data representation.',
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-4.png',
    imageAlt: 'Visualize Your Data with Clarity Precision',
    cursorText: 'Case Study 2',
    href: '/gallery',
    description:
      'shadcn/studio offers customizable charts and graphs for clear data analysis. Interactive views include bar, pie, and line options.'
  },
  {
    title: 'Boost Productivity & Streamline Tasks Efficiently.',
    subtitle: "Manage workflows effortlessly with shadcn/studio's intuitive UI components.",
    image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-3.png',
    imageAlt: 'Boost Productivity & Streamline Tasks Efficiently',
    cursorText: 'Case Study 3',
    href: '/gallery',
    description:
      "Manage workflows easily with shadcn/studio's intuitive UI. Streamlined design automates tasks and boosts productivity."
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
        <HeroSection />
      </main>

      {/* Skills Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-12">
            Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Tailwind CSS",
              "Node.js",
              "Express",
              "Prisma",
              "PostgreSQL",
            ].map((skill) => (
              <div
                key={skill}
                className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
              >
                <span className="text-black dark:text-white font-medium">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-12">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Project One",
                description: "A modern web application built with Next.js and TypeScript, featuring real-time updates and a beautiful UI.",
                tech: ["Next.js", "TypeScript", "Tailwind CSS"],
              },
              {
                title: "Project Two",
                description: "Full-stack application with authentication, database integration, and API endpoints.",
                tech: ["React", "Node.js", "PostgreSQL"],
              },
              {
                title: "Project Three",
                description: "E-commerce platform with payment integration and admin dashboard.",
                tech: ["Next.js", "Stripe", "Prisma"],
              },
              {
                title: "Project Four",
                description: "Portfolio website with CMS integration and dynamic content management.",
                tech: ["Next.js", "Headless CMS", "TypeScript"],
              },
            ].map((project, index) => (
              <div
                key={index}
                className="p-8 bg-white dark:bg-black rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all hover:shadow-lg"
              >
                <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href="#"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  View Project →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

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
          <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
