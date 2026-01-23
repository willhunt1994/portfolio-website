import Image from 'next/image';

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
    <section className="py-20 px-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 text-center">
          Our Collaboration Process
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-16 text-center max-w-3xl mx-auto">
          Every collaboration receives meticulous attention at every stage. Here's how we ensure exceptional results through our detailed process.
        </p>
        
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-800 transform md:-translate-x-1/2"></div>
          
          <div className="space-y-12">
            {events.map((event, index) => {
              const isEven = index % 2 === 0;
              const contentOnLeft = isEven;
              
              return (
                <div
                  key={index}
                  className="relative flex flex-col md:flex-row items-start md:items-center gap-6"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-black dark:bg-white rounded-full border-4 border-white dark:border-black transform md:-translate-x-1/2 z-10"></div>
                  
                  {/* Image on opposite side of content */}
                  {event.image && (
                    <div
                      className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                        contentOnLeft ? 'md:order-2 md:pl-8' : 'md:order-1 md:pr-8'
                      }`}
                    >
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
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
                    className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                      contentOnLeft ? 'md:order-1 md:pr-8 md:text-right' : 'md:order-2 md:ml-auto md:pl-8'
                    }`}
                  >
                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800">
                      <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                        {event.description}
                      </p>
                      {event.details && event.details.length > 0 && (
                        <ul className={`space-y-2 ${contentOnLeft ? 'md:text-right' : ''}`}>
                          {event.details.map((detail, detailIndex) => (
                            <li
                              key={detailIndex}
                              className="text-sm text-zinc-500 dark:text-zinc-500 flex items-center gap-2"
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
