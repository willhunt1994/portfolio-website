import { MotionPreset } from '@/components/ui/motion-preset';
import ImportExport from '@/components/shadcn-studio/blocks/bento-grid-20/import-export';
import RealTimeCustomizationCard from '@/components/shadcn-studio/blocks/bento-grid-20/real-time-customization-card';
import TypographyFineTuning from '@/components/shadcn-studio/blocks/bento-grid-20/typography-fine-tuning';
import Link from 'next/link';

const customDashboardLogosBase = '/home-page/custom-dashboard';
const customDashboardLogos = [
  'Artboard 1-8.png',
  'Artboard 2-8.png',
  'Artboard 3-8.png',
  'Artboard 4-8.png',
  'Artboard 5-8.png',
];

const themes = customDashboardLogos.map((file, i) => ({
  name: `Partner ${i + 1}`,
  img: `${customDashboardLogosBase}/${file}`,
  bgImg: `${customDashboardLogosBase}/${customDashboardLogos[0]}`,
}));

const BentoGrid20 = () => {
  return (
    <section className="bg-muted py-6">
      <div className="mx-auto grid w-full grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 xl:grid-cols-3">
        <MotionPreset
          fade
          blur
          slide={{ direction: 'down', offset: 75 }}
          delay={0}
          transition={{ duration: 0.45 }}
          className="bg-card group flex max-xl:order-1 flex-col gap-6 overflow-hidden rounded-xl py-6"
        >
          <div className="space-y-3.5 px-6">
            <h3 className="text-[21px] font-semibold">We Help You Create Designs</h3>
            <p className="text-muted-foreground">
              Our team helps create new graphics with you to build your perfect product. It all begins with an idea...
            </p>
          </div>
          <TypographyFineTuning />
        </MotionPreset>

        <RealTimeCustomizationCard themes={themes} />

        <MotionPreset
          fade
          blur
          slide={{ direction: 'down', offset: 75 }}
          delay={0.15}
          transition={{ duration: 0.45 }}
          className="relative flex flex-col gap-6 overflow-hidden rounded-xl py-6 sm:row-span-2 bg-cover bg-center"
          motionProps={{
            style: {
              backgroundImage: "url('/custom-socks-card-bg.png')",
            },
          }}
        >
          <div className="relative flex flex-col">
            <div className="space-y-3.5 px-6">
              <h3 className="text-[21px] font-semibold text-foreground">Custom Socks</h3>
              <Link
                href="/what-we-do/socks"
                className="group relative inline-block text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                View More
                <span
                  className="absolute bottom-0 left-0 h-px w-0 bg-current transition-[width] duration-300 ease-out group-hover:w-full"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </MotionPreset>

        <MotionPreset
          fade
          blur
          slide={{ direction: 'down', offset: 75 }}
          delay={0.45}
          transition={{ duration: 0.45 }}
          className="bg-card flex flex-col gap-6 overflow-hidden rounded-xl py-6 sm:col-span-2"
        >
          <div className="space-y-3.5 px-6">
            <h3 className="text-[21px] font-semibold">B2B & DTC Capabilities</h3>
            <p className="text-muted-foreground">
              Serve franchisees and wholesale partners (B2B) and sell direct to consumers (DTC) from one platform.
            </p>
          </div>
          <div className="py-6">
            <ImportExport />
          </div>
        </MotionPreset>
      </div>
    </section>
  );
};

export default BentoGrid20;
