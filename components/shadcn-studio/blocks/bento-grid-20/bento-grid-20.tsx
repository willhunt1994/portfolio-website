import { MotionPreset } from '@/components/ui/motion-preset';
import ImportExport from '@/components/shadcn-studio/blocks/bento-grid-20/import-export';
import RealTimeCustomizationCard from '@/components/shadcn-studio/blocks/bento-grid-20/real-time-customization-card';
import TypographyFineTuning from '@/components/shadcn-studio/blocks/bento-grid-20/typography-fine-tuning';

const themes = [
  {
    name: 'Fitstop',
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-105.png',
    bgImg:
      'https://cdn.shadcnstudio.com/ss-assets/landing-page/theme-generator/basic-features-real-time-default-light.png',
  },
  {
    name: 'Barre3',
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-108.png',
    bgImg:
      'https://cdn.shadcnstudio.com/ss-assets/landing-page/theme-generator/basic-features-real-time-clean-slate-light.png',
  },
  {
    name: 'Bodyrok',
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-107.png',
    bgImg:
      'https://cdn.shadcnstudio.com/ss-assets/landing-page/theme-generator/basic-features-real-time-ghibli-studio-light.png',
  },
  {
    name: 'Bodybar',
    img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-106.png',
    bgImg:
      'https://cdn.shadcnstudio.com/ss-assets/landing-page/theme-generator/basic-features-real-time-marvel-light.png',
  },
];

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
            <h3 className="text-xl font-semibold">Build & Design With Us</h3>
            <p className="text-muted-foreground">
              Work with our team to create corporate approved products that live as items for your franchisees to purchase.
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
          className="bg-card flex flex-col gap-6 overflow-hidden rounded-xl py-6 sm:row-span-2"
        >
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-6">
            <p className="text-xl font-medium text-foreground">custom socks</p>
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
            <h3 className="text-xl font-semibold">B2B & DTC Capabilities</h3>
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
