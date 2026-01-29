import Image from 'next/image';
import { cn } from '@/lib/utils';

const ETHOS_LOGO_URL =
  'https://cdn.shopify.com/s/files/1/0609/4752/9901/files/Ethos_Logo_-_Black.png?v=1767327560';

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center', className)}>
      <Image
        src={ETHOS_LOGO_URL}
        alt="Ethos"
        width={64}
        height={64}
        className="size-16 object-contain dark:invert"
      />
    </div>
  );
};

export default Logo;
