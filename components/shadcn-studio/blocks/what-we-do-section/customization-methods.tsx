import Link from 'next/link';

interface CustomizationMethod {
  title: string;
  explanation: string;
  image?: string;
  video?: string; // Google Drive video URL
}

interface CustomizationMethodsProps {
  methods?: CustomizationMethod[];
}

// Helper function to convert Google Drive video URL to iframe embed URL
function getVideoEmbedUrl(url: string): string {
  // Extract file ID from Google Drive URL
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    // Use Google Drive's preview endpoint
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  return url;
}

export default function CustomizationMethods({
  methods = [
    { title: 'DTF', explanation: 'Explanation' },
    { title: 'EMBROIDERY', explanation: 'Explanation' },
    { title: 'PATCHES', explanation: 'Explanation' },
    { title: 'PUFF PRINT', explanation: 'Explanation' },
    { title: 'TOWELS', explanation: 'Explanation' },
    { title: 'BOTTLES', explanation: 'Explanation' },
    { title: 'HAIR CLIPS', explanation: 'Explanation' },
    { title: 'SOCKS', explanation: 'Explanation' }
  ]
}: CustomizationMethodsProps) {
  return (
    <section className="py-20 px-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-12 text-center">
          CUSTOMIZATION METHODS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {methods.map((method, index) => {
            const methodSlug = method.title.toLowerCase().replace(/\s+/g, '-');
            return (
              <Link
                key={index}
                href={`/what-we-do/${methodSlug}`}
                className="bg-white dark:bg-black rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
              >
                <div className="aspect-square bg-white dark:bg-zinc-900 flex items-center justify-center relative overflow-hidden">
                  {method.video ? (
                    <div className="absolute inset-0 w-full h-full">
                      <iframe
                        src={getVideoEmbedUrl(method.video)}
                        className="w-full h-full border-0"
                        allow="autoplay; encrypted-media; fullscreen"
                        allowFullScreen
                        title={method.title}
                        style={{
                          transform: 'scale(1.1)',
                          transformOrigin: 'center center'
                        }}
                      />
                      {/* Overlay to hide Google Drive UI elements */}
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: 'transparent',
                          zIndex: 1
                        }}
                      />
                    </div>
                  ) : method.image ? (
                    <img src={method.image} alt={method.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800"></div>
                  )}
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900">
                  <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                    {method.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {method.explanation}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

