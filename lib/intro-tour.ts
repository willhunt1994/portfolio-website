/**
 * Intro.js "How to use the site" tour. Call startIntroTour() from the header
 * info button or elsewhere to run the guide.
 */
export async function startIntroTour(): Promise<void> {
  const introJs = (await import('intro.js')).default;
  const intro = introJs();
  intro.setOptions({
    nextLabel: 'Next',
    prevLabel: 'Back',
    skipLabel: 'Skip',
    doneLabel: 'Done',
    tooltipRenderAsHtml: true,
    steps: [
      {
        title: 'Welcome',
        intro: 'This short guide shows you how to get around the site. Click Next to continue or Skip to close.',
      },
      {
        element: document.querySelector('header'),
        title: 'Navigation',
        intro: 'Use the menu to explore <strong>What We Do</strong> (customization options), <strong>Our Work</strong> (case studies), and <strong>Catalog</strong> (products). The logo takes you back home.',
      },
      {
        element: document.querySelector('main'),
        title: 'Page content',
        intro: 'This area shows the main content for each page. Scroll down to see galleries, services, and more.',
      },
      {
        element: document.querySelector('footer'),
        title: 'Footer',
        intro: 'The footer has quick links, contact info, and ways to get in touch. Use it from any page.',
      },
      {
        element: document.querySelector('#tour-floating-actions'),
        title: 'Scroll to top',
        intro: 'When you scroll down, this button appears so you can jump back to the top.',
      },
    ].filter((step) => {
      if ('element' in step && typeof step.element === 'object' && step.element == null) return false;
      return true;
    }) as { title: string; intro: string; element?: string | Element }[],
  });
  intro.start();
}
