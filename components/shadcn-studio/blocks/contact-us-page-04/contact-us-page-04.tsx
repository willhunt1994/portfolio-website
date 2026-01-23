import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ContactCard {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

interface ContactUsProps {
  contactCards: ContactCard[];
}

export default function ContactUs({ contactCards }: ContactUsProps) {
  return (
    <section className="py-20 px-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-colors"
              >
                <div className="flex flex-col items-start">
                  <div className="mb-4">
                    <Icon className="w-8 h-8 text-black dark:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm">
                    {card.description}
                  </p>
                  <Link
                    href={card.ctaLink}
                    className="text-black dark:text-white font-medium hover:underline text-sm"
                  >
                    {card.ctaText} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
