import Link from 'next/link';

interface RichTextProps {
  heading?: string;
  subheading?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function RichText({
  heading = 'Heading',
  subheading = 'Subheading text goes here',
  buttonText,
  buttonHref = '#'
}: RichTextProps) {
  return (
    <section className="pt-20 pb-20 px-6 dark:bg-black" style={{ backgroundColor: '#fcfcfc' }}>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-6">
          {heading}
        </h1>
        {subheading && (
          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 mb-0">
            {subheading}
          </p>
        )}
        {buttonText && buttonText.trim() !== '' && (
          <Link
            href={buttonHref}
            className="inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-md text-base font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors mt-8"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}

