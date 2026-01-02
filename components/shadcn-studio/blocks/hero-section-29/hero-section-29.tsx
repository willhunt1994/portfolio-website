export default function HeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden flex items-center">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="https://cdn.shopify.com/videos/c/o/v/434be4680b3943cf910c961e5f598218.mov" type="video/quicktime" />
          <source src="https://cdn.shopify.com/videos/c/o/v/434be4680b3943cf910c961e5f598218.mov" type="video/mp4" />
        </video>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-6 leading-tight tracking-[-0.05em]">
            We Make Custom Merch
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Ready To Get Started?
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#"
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              Get Started
            </a>
            <a
              href="#"
              className="px-6 py-3 border-2 border-zinc-300 dark:border-zinc-700 text-black dark:text-white rounded-full font-medium hover:border-black dark:hover:border-white transition-colors"
            >
              View Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
