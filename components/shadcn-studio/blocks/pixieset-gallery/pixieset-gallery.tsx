'use client';

interface PixiesetGalleryProps {
  galleryUrl: string;
}

export default function PixiesetGallery({ galleryUrl }: PixiesetGalleryProps) {
  return (
    <section className="py-20 px-[10px] bg-white dark:bg-black w-full">
      <div className="w-full max-w-none relative overflow-hidden">
        {/* Clip the top portion to hide header */}
        <div 
          className="w-full"
          style={{
            clipPath: 'inset(120px 0 0 0)',
            marginTop: '-120px',
            height: 'calc(5000px + 120px)',
          }}
        >
          <iframe
            src={galleryUrl}
            className="w-full border-0"
            style={{ 
              width: '100%',
              height: '5000px',
              display: 'block',
            }}
            allow="fullscreen"
            allowFullScreen
            loading="lazy"
            title="Pixieset Gallery"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
      </div>
    </section>
  );
}
