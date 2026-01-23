import Image from 'next/image';

interface CorporateFranchiseSectionProps {
  imageUrl?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function CorporateFranchiseSection({ 
  imageUrl = 'https://cdn.shopify.com/s/files/1/0609/4752/9901/files/BF5A9955.jpg?v=1767384638',
  buttonText = 'Corporate & Franchise Teams',
  buttonHref = '/corporate-franchise-teams'
}: CorporateFranchiseSectionProps) {
  return (
    <section className="relative min-h-[600px] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={imageUrl}
          alt="Corporate & Franchise Teams"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better button visibility */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 px-6">
        <a
          href={buttonHref}
          className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-zinc-100 transition-colors text-lg shadow-lg"
        >
          {buttonText}
        </a>
      </div>
    </section>
  );
}
