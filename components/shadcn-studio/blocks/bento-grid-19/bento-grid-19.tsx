import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface BentoItem {
  id: string;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  imageFit?: 'cover' | 'contain'; // How the image should fit: cover (crop) or contain (no crop)
  href?: string;
  className?: string;
  textPosition?: 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right' | 'center';
  textColor?: 'white' | 'black';
  buttonText?: string;
  buttonHref?: string;
  trending?: boolean;
  span?: {
    col?: number; // 1-4 columns
    row?: number; // 1-4 rows
  };
  content?: React.ReactNode;
}

interface BentoGridProps {
  items?: BentoItem[];
  className?: string;
  columns?: 3 | 4;
}

export default function BentoGrid({ 
  items = [],
  className = '',
  columns = 4,
}: BentoGridProps) {
  const getGridColSpan = (span?: number) => {
    if (!span) return '';
    const spans: Record<number, string> = {
      1: 'md:col-span-1',
      2: 'md:col-span-2',
      3: 'md:col-span-3',
      4: 'md:col-span-4',
    };
    return spans[span] || '';
  };

  const getGridRowSpan = (span?: number) => {
    if (!span) return '';
    const spans: Record<number, string> = {
      1: 'md:row-span-1',
      2: 'md:row-span-2',
      3: 'md:row-span-3',
      4: 'md:row-span-4',
    };
    return spans[span] || '';
  };

  const defaultItems: BentoItem[] = [
    {
      id: '1',
      title: 'Welcome',
      description: 'Get started with our platform',
      span: { col: 2, row: 1 },
    },
    {
      id: '2',
      title: 'Features',
      description: 'Discover what we offer',
      span: { col: 1, row: 2 },
    },
    {
      id: '3',
      title: 'About',
      description: 'Learn more about us',
      span: { col: 1, row: 1 },
    },
  ];

  const displayItems = items.length > 0 ? items : defaultItems;
  const lastItem = displayItems[displayItems.length - 1];
  const lastItemIsContain = lastItem?.imageFit === 'contain';

  return (
    <section className={cn(lastItemIsContain ? 'pb-0' : 'pb-20', 'px-6 bg-white dark:bg-black', className)}>
      <div className="w-full mx-auto">
        <div className={cn('grid grid-cols-1 gap-4 auto-rows-fr items-stretch', columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4')}>
          {displayItems.map((item) => {
            const colSpan = getGridColSpan(item.span?.col);
            const rowSpan = getGridRowSpan(item.span?.row);
            const hasAspectRatio = item.className?.includes('aspect-');
            const isContainImage = item.imageFit === 'contain';
            const isLastItem = displayItems.indexOf(item) === displayItems.length - 1;
            const baseClasses = `${isContainImage ? '' : 'rounded-[2px] border border-zinc-200 dark:border-zinc-800'} transition-all hover:shadow-lg ${item.image ? '' : 'bg-zinc-50 dark:bg-zinc-900'}`;
            // Remove gap for contain images by using negative margins
            const gapAdjustment = isContainImage ? (isLastItem ? '-mb-4' : '-my-4') : '';
            const itemClasses = `${baseClasses} ${colSpan} ${hasAspectRatio || isContainImage ? '' : rowSpan} ${item.className || ''} ${isContainImage ? '' : 'h-full'} ${isContainImage ? 'overflow-hidden' : ''} ${gapAdjustment}`;

            const content = (
              <div className={`relative flex flex-col ${item.imageFit === 'contain' ? 'w-full' : 'h-full w-full'}`}>
                {item.image && (
                  <>
                    {item.imageFit === 'contain' ? (
                      <div className="relative w-full">
                        <img
                          src={item.image}
                          alt={item.imageAlt || item.title || ''}
                          className="w-full h-auto object-contain block"
                          style={{ display: 'block', margin: 0, padding: 0 }}
                        />
                        {/* Overlay for text on contain images */}
                        {(item.title || item.description || item.buttonText) && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                        )}
                      </div>
                    ) : (
                      <div className="absolute inset-0">
                        <Image
                          src={item.image}
                          alt={item.imageAlt || item.title || ''}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </>
                )}
                {item.trending && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-orange-500/90 to-pink-500/90 backdrop-blur-sm border border-white/30 animate-subtle-glow">
                      <span className="relative flex h-2 w-2 mr-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-60 animate-ping"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      Trending
                    </span>
                  </div>
                )}
                {(() => {
                  const textPosition = item.textPosition || 'top-left';
                  const positionClasses = {
                    'top-left': 'justify-start items-start',
                    'bottom-left': 'justify-end items-start',
                    'top-right': 'justify-start items-end',
                    'bottom-right': 'justify-end items-end',
                    'center': 'justify-center items-center',
                  };
                  
                  // Determine text color: use override if provided, otherwise default to white for images, black for no image
                  // For contain images, always use white text since they have a dark overlay
                  const textColor = item.textColor || (item.image ? (isContainImage ? 'white' : 'white') : 'black');
                  const containerTextColor = textColor === 'white' ? 'text-white' : '';
                  const titleTextColor = textColor === 'white' ? 'text-white' : 'text-black dark:text-white';
                  const descriptionTextColor = textColor === 'white' ? 'text-white/90' : 'text-zinc-600 dark:text-zinc-400';
                  const buttonTextColor = textColor === 'white' ? 'text-white' : 'text-black dark:text-white';
                  
                  return (
                    <div className={`absolute inset-0 z-10 ${isContainImage ? '' : 'relative'} ${isContainImage ? 'p-6' : 'p-6'} flex flex-col ${positionClasses[textPosition]} ${containerTextColor}`}>
                      <div>
                        {item.title && (
                          <h3 className={`text-[20.5px] font-bold mb-2 ${titleTextColor}`}>
                            {item.title}
                          </h3>
                        )}
                        {item.description && (
                          <p className={`text-sm mb-2 ${descriptionTextColor}`}>
                            {item.description}
                          </p>
                        )}
                        {item.buttonText && (
                          <Link
                            href={item.buttonHref || '#'}
                            className={`inline-block relative group text-sm ${buttonTextColor} pointer-events-auto`}
                          >
                            <span className="relative z-10 font-medium">{item.buttonText}</span>
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full"></span>
                          </Link>
                        )}
                      </div>
                      {item.content && (
                        <div className="flex-1">
                          {item.content}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            );

            if (item.href) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={itemClasses}
                >
                  {content}
                </Link>
              );
            }

            return (
              <div key={item.id} className={itemClasses} style={item.className?.includes('min-h-') ? {} : undefined}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
