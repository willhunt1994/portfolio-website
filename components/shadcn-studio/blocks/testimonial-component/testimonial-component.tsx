'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';

interface TestimonialItem {
  clientName: string;
  clientPosition: string;
  clientHeadshot?: string;
  testimonialTitle: string;
  testimonialText: string;
}

interface TestimonialProps {
  testimonials?: TestimonialItem[];
  clientName?: string;
  clientPosition?: string;
  clientHeadshot?: string;
  testimonialTitle?: string;
  testimonialText?: string;
}

export default function Testimonial({
  testimonials,
  clientName = 'Client Name',
  clientPosition = 'Position At Company',
  clientHeadshot,
  testimonialTitle = 'Testimonial Title',
  testimonialText = 'Full testimonial'
}: TestimonialProps) {
  // Convert single testimonial props to array format if testimonials array not provided
  const testimonialArray: TestimonialItem[] = testimonials || [{
    clientName,
    clientPosition,
    clientHeadshot,
    testimonialTitle,
    testimonialText
  }];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < testimonialArray.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : testimonialArray.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < testimonialArray.length - 1 ? prev + 1 : 0));
  };

  const currentTestimonial = testimonialArray[currentIndex];

  return (
    <section className="py-8 px-6 dark:bg-black" style={{ backgroundColor: '#fcfcfc' }}>
      <div className="max-w-7xl mx-auto">
        <div
          ref={carouselRef}
          className="relative overflow-hidden min-h-[300px]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {testimonialArray.map((testimonial, index) => (
            <div
              key={index}
              className={`flex flex-row items-start gap-6 transition-opacity duration-500 ease-in-out ${
                index === currentIndex 
                  ? 'opacity-100 relative z-10' 
                  : 'opacity-0 absolute inset-0 z-0 pointer-events-none'
              }`}
            >
              {/* Headshot - 10% width */}
              <div className="w-[10%] flex-shrink-0">
                {testimonial.clientHeadshot ? (
                  <Image
                    src={testimonial.clientHeadshot}
                    alt={testimonial.clientName}
                    width={120}
                    height={120}
                    className="rounded-full object-cover w-full aspect-square"
                  />
                ) : (
                  <div className="w-full aspect-square rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                    <span className="text-zinc-500 dark:text-zinc-400 text-xs text-center px-2">
                      Client Headshot
                    </span>
                  </div>
                )}
              </div>

              {/* Client Name and Position - 15% width */}
              <div className="w-[15%] flex-shrink-0 flex flex-col">
                <h3 className="text-3xl font-bold text-black dark:text-white mb-2">
                  {testimonial.clientName}
                </h3>
                <p className="text-lg text-black dark:text-white">
                  {testimonial.clientPosition}
                </p>
              </div>

              {/* Testimonial - 75% width */}
              <div className="w-[75%] flex-shrink-0 bg-zinc-100 dark:bg-zinc-900 rounded-lg p-8">
                <h4 className="text-2xl font-bold text-black dark:text-white mb-4 underline">
                  {testimonial.testimonialTitle}
                </h4>
                <p className="text-lg text-black dark:text-white leading-relaxed">
                  {testimonial.testimonialText}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation */}
        {testimonialArray.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-0">
            {/* Left Arrow */}
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-5 h-5 text-black dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonialArray.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ease-in-out hover:scale-110 ${
                    index === currentIndex
                      ? 'bg-black dark:bg-white w-8'
                      : 'bg-zinc-300 dark:bg-zinc-700 w-2 hover:bg-zinc-400 dark:hover:bg-zinc-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={goToNext}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Next testimonial"
            >
              <svg
                className="w-5 h-5 text-black dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
