import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

interface TimelineEvent {
  title: string;
  description: string;
  details?: string[];
  image?: string;
  imageAlt?: string;
}

interface CollaborationTimelineProps {
  events?: TimelineEvent[];
}

export default function CollaborationTimeline({
  events = [
    {
      title: 'Initial Discovery & Consultation',
      description: 'We dive deep into understanding your brand, values, and goals for the collaboration.',
      details: [
        'Brand identity analysis',
        'Target audience research',
        'Budget and timeline discussion',
        'Product category exploration'
      ]
    },
    {
      title: 'Creative Strategy & Concept Development',
      description: 'Our team crafts unique concepts tailored specifically to your brand and campaign objectives.',
      details: [
        'Mood board creation',
        'Design direction proposals',
        'Material and finish selection',
        'Sample product mockups'
      ]
    },
    {
      title: 'Design Refinement & Approval',
      description: 'We iterate on designs based on your feedback until every detail meets your vision.',
      details: [
        'Multiple design revisions',
        'Color palette optimization',
        'Typography and branding integration',
        'Final design approval process'
      ]
    },
    {
      title: 'Production Planning & Quality Control',
      description: 'Meticulous attention to production details ensures consistent, high-quality results.',
      details: [
        'Manufacturing partner selection',
        'Quality assurance protocols',
        'Production timeline management',
        'Pre-production samples review'
      ]
    },
    {
      title: 'Fulfillment & Distribution',
      description: 'We handle every aspect of getting your products to the right people at the right time.',
      details: [
        'Custom packaging design',
        'Inventory management',
        'Shipping coordination',
        'Delivery tracking and confirmation'
      ]
    },
    {
      title: 'Post-Launch Support & Analysis',
      description: 'Our partnership continues beyond delivery with ongoing support and performance insights.',
      details: [
        'Customer feedback collection',
        'Campaign performance analysis',
        'Re-order facilitation',
        'Long-term partnership planning'
      ]
    }
  ]
}: CollaborationTimelineProps) {
  return (
    <section className="py-12 px-4 bg-white dark:bg-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-2 text-center">
          Our Collaboration Process
        </h2>
        <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 mb-10 text-center max-w-2xl mx-auto">
          Every collaboration receives meticulous attention at every stage. Here's how we ensure exceptional results through our detailed process.
        </p>
        
        <div className="relative">
          <div className="space-y-6">
            {events.map((event, index) => {
              const isEven = index % 2 === 0;
              const contentOnLeft = isEven;
              const isLast = index === events.length - 1;
              
              return (
                <div key={index}>
                  <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4">
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-black dark:bg-white rounded-full border-2 border-white dark:border-black transform md:-translate-x-1/2 z-10"></div>
                    
                    {/* Image on opposite side of content */}
                    {event.image && (
                      <div
                        className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                          contentOnLeft ? 'md:order-2 md:pl-6' : 'md:order-1 md:pr-6'
                        }`}
                      >
                        <div className="relative w-full aspect-video rounded-md overflow-hidden border border-zinc-200 dark:border-zinc-800">
                          <Image
                            src={event.image}
                            alt={event.imageAlt || event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Content */}
                    <div
                      className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                        contentOnLeft ? 'md:order-1 md:pr-6 md:text-right' : 'md:order-2 md:ml-auto md:pl-6'
                      }`}
                    >
                      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-md p-4 border border-zinc-200 dark:border-zinc-800">
                        <h3 className="text-base md:text-lg font-bold text-black dark:text-white mb-1.5">
                          {event.title}
                        </h3>
                        <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                          {event.description}
                        </p>
                        {event.details && event.details.length > 0 && (
                          <ul className={`space-y-1 ${contentOnLeft ? 'md:text-right' : ''}`}>
                            {event.details.map((detail, detailIndex) => (
                              <li
                                key={detailIndex}
                                className="text-xs text-zinc-500 dark:text-zinc-500 flex items-center gap-1.5"
                              >
                                {contentOnLeft ? (
                                  <>
                                    <span className="md:order-2">{detail}</span>
                                    <span className="md:order-1 text-black dark:text-white">•</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-black dark:text-white">•</span>
                                    <span>{detail}</span>
                                  </>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Arrow connecting to next step */}
                  {!isLast && (
                    <div className="flex justify-center my-2">
                      <ArrowDown className="w-4 h-4 text-zinc-400 dark:text-zinc-600" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
