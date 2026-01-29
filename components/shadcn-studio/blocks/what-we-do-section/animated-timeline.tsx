'use client';

import { useEffect, useRef, useState } from 'react';

interface TimelineStep {
  title: string;
}

interface AnimatedTimelineProps {
  steps?: TimelineStep[];
}

export default function AnimatedTimeline({
  steps = [
    { title: 'Choose Your Blanks' },
    { title: 'Design phase' },
    { title: 'Dashboard / ordering' },
    { title: 'We customize your product' },
    { title: 'Ship to you once completed' }
  ]
}: AnimatedTimelineProps) {
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const [arrowProgress, setArrowProgress] = useState<number[]>(new Array(steps.length - 1).fill(0));
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const arrowRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Observe widgets for visibility
    stepRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSteps((prev) => new Set([...prev, index]));
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    // Animate arrows based on scroll progress
    const handleScroll = () => {
      const newProgress = arrowProgress.map((_, arrowIndex) => {
        const startWidget = stepRefs.current[arrowIndex];
        const endWidget = stepRefs.current[arrowIndex + 1];

        if (!startWidget || !endWidget) return 0;

        const startRect = startWidget.getBoundingClientRect();
        const endRect = endWidget.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Start animating when start widget bottom passes top of viewport
        if (startRect.bottom < 0) return 1; // Already scrolled past
        if (startRect.top > windowHeight) return 0; // Not yet visible

        // Calculate progress: 0 when start widget bottom is at top, 1 when end widget top reaches viewport
        const scrollStart = startRect.bottom;
        const scrollEnd = endRect.top;
        const currentScroll = window.scrollY + windowHeight;

        if (scrollEnd <= currentScroll) return 1;
        if (scrollStart > currentScroll) return 0;

        const progress = (currentScroll - scrollStart) / (scrollEnd - scrollStart);
        return Math.min(1, Math.max(0, progress));
      });

      setArrowProgress(newProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Update arrow paths based on actual widget positions
  useEffect(() => {
    const updateArrows = () => {
      arrowRefs.current.forEach((arrowRef, arrowIndex) => {
        if (!arrowRef) return;

        const startWidget = stepRefs.current[arrowIndex];
        const endWidget = stepRefs.current[arrowIndex + 1];

        if (!startWidget || !endWidget) return;

        const startRect = startWidget.getBoundingClientRect();
        const endRect = endWidget.getBoundingClientRect();
        const container = startWidget.closest('section');
        if (!container) return;

        const containerRect = container.getBoundingClientRect();

        // Calculate positions relative to arrow container (which is positioned between widgets)
        const arrowContainer = arrowRef.closest('.arrow-container');
        if (!arrowContainer) return;

        const arrowRect = arrowContainer.getBoundingClientRect();

        const startX = startRect.left + startRect.width / 2 - arrowRect.left;
        const startY = startRect.bottom - arrowRect.top;
        const endX = endRect.left + endRect.width / 2 - arrowRect.left;
        const endY = endRect.top - arrowRect.top;

        // Create path with rounded corners
        const midY = startY + (endY - startY) / 2;
        const radius = 20;

        const path = `
          M ${startX} ${startY}
          L ${startX} ${midY - radius}
          Q ${startX} ${midY} ${startX + (endX > startX ? radius : -radius)} ${midY}
          L ${endX - (endX > startX ? radius : -radius)} ${midY}
          Q ${endX} ${midY} ${endX} ${midY + radius}
          L ${endX} ${endY}
        `;

        arrowRef.setAttribute('d', path);
      });
    };

    updateArrows();
    window.addEventListener('resize', updateArrows);
    window.addEventListener('scroll', updateArrows, { passive: true });

    return () => {
      window.removeEventListener('resize', updateArrows);
      window.removeEventListener('scroll', updateArrows);
    };
  }, [visibleSteps]);

  return (
    <section className="min-h-screen py-20 px-6 bg-white dark:bg-black flex items-center">
      <div className="max-w-7xl mx-auto w-full relative">
        <div className="space-y-32">
          {steps.map((step, index) => {
            const isVisible = visibleSteps.has(index);
            const isLeft = index % 2 === 0;
            const isLast = index === steps.length - 1;

            return (
              <div key={index} className="relative">
                {/* Step Widget */}
                <div
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className={`
                    bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2px] p-8 w-full max-w-[400px] text-center
                    transition-all duration-700 ease-out
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                    ${isLeft ? 'ml-0 mr-auto' : 'ml-auto mr-0'}
                  `}
                  style={{
                    transitionDelay: `${index * 150}ms`
                  }}
                >
                  <p className="text-xl font-bold text-black dark:text-white">
                    {step.title}
                  </p>
                </div>

                {/* Animated Arrow Connector */}
                {!isLast && (
                  <div className="arrow-container absolute top-full left-0 right-0 h-32 pointer-events-none">
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 1000 128"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <marker
                          id={`arrowhead-${index}`}
                          markerWidth="10"
                          markerHeight="10"
                          refX="9"
                          refY="3"
                          orient="auto"
                        >
                          <polygon
                            points="0 0, 10 3, 0 6"
                            fill="#71717a"
                            className="dark:fill-zinc-600"
                          />
                        </marker>
                      </defs>
                      <path
                        ref={(el) => {
                          arrowRefs.current[index] = el;
                        }}
                        d=""
                        stroke="#71717a"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        markerEnd={`url(#arrowhead-${index})`}
                        className="dark:stroke-zinc-600"
                        strokeDasharray="1000"
                        strokeDashoffset={1000 * (1 - arrowProgress[index])}
                        style={{
                          opacity: arrowProgress[index] > 0 ? 1 : 0,
                          transition: 'opacity 0.3s ease-out'
                        }}
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
