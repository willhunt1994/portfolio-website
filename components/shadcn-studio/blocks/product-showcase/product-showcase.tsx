import Image from 'next/image';

interface Product {
  image: string;
  imageAlt: string;
  name: string;
  description?: string;
  link?: string;
}

interface ProductShowcaseProps {
  products?: Product[];
  title?: string;
}

export default function ProductShowcase({ 
  products = [],
  title = 'Products We Used'
}: ProductShowcaseProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-8 px-6" style={{ backgroundColor: '#fcfcfc' }}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-6 text-center">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[2px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all"
            >
              <div className="aspect-[2/3] relative">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-black dark:text-white mb-1">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {product.description}
                  </p>
                )}
                {product.link && (
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm text-black dark:text-white underline hover:no-underline"
                  >
                    View Product →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
