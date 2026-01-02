export default function MegaFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-start">
          <div className="flex flex-wrap justify-between items-center w-full mb-1">
            <div className="flex flex-wrap gap-6 text-sm text-white">
              <a href="/what-we-do" className="hover:text-zinc-300 transition-colors">
                What We Do
              </a>
              <a href="#" className="hover:text-zinc-300 transition-colors">
                Our Work
              </a>
              <a href="#" className="hover:text-zinc-300 transition-colors">
                Contact
              </a>
            </div>
            <a href="#" className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200 transition-colors">
              Get Started
            </a>
          </div>
          <div className="w-full h-[1px] my-4" style={{ backgroundColor: 'rgba(252, 252, 252, 0.3)' }}></div>
          <div className="w-full text-center">
            <p className="text-xs text-white">
              © {currentYear} Ethos. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

