'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import AutoScroll from 'embla-carousel-auto-scroll'

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

export type GalleryItem =
  | string
  | {
      src: string
      title?: string
    }

const normalizeItem = (item: GalleryItem, index: number): { src: string; title: string } =>
  typeof item === 'string'
    ? { src: item, title: `Image ${index + 1}` }
    : { src: item.src, title: item.title ?? `Image ${index + 1}` }

const Gallery = ({
  gallery,
  itemHref = '/our-work'
}: {
  gallery: GalleryItem[]
  itemHref?: string
}) => {
  const [api, setApi] = useState<CarouselApi>()
  const items = gallery.map(normalizeItem)
  const plugin = useRef(
    AutoScroll({
      speed: 0.5,
      startDelay: 0,
      stopOnInteraction: false
    })
  )

  useEffect(() => {
    if (!api) return
    api.plugins().autoScroll?.play()
  }, [api])

  return (
    <section className='py-4'>
      <div className='mx-auto w-full px-4 sm:px-4 lg:px-6'>
        <div className='mx-auto'>
          <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            opts={{
              align: 'center',
              loop: true
            }}
            className='relative flex items-center justify-center gap-6'
          >
            <CarouselContent className='items-center'>
              {items.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className={cn(
                      'flex justify-center transition-transform duration-500 ease-out',
                      'sm:basis-[40%] lg:basis-[24%]'
                    )}
                  >
                    <div className='w-full overflow-hidden px-1'>
                      <Link
                        href={itemHref}
                        className='group relative block w-full rounded-[2px] overflow-hidden bg-muted'
                      >
                        <div className='w-full aspect-[4/5] overflow-hidden rounded-[2px]'>
                          <img
                            className='h-full w-full rounded-[2px] object-cover transition-all duration-600 group-hover:scale-[1.02]'
                            src={item.src}
                            alt={item.title}
                          />
                        </div>
                        <div className='absolute bottom-0 left-0 right-0 px-3 py-2 bg-black/60 text-white text-sm font-medium rounded-b-[2px]'>
                          {item.title}
                        </div>
                      </Link>
                    </div>
                  </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  )
}

export default Gallery
