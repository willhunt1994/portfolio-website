// Function to fetch images from a Pixieset gallery
// Pixieset galleries have images accessible via their API/CDN

export async function fetchPixiesetImages(galleryUrl: string): Promise<Array<{ src: string; alt: string; width?: number; height?: number }>> {
  try {
    // Fetch the Pixieset gallery page
    const response = await fetch(galleryUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Pixieset gallery: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    
    if (!html || html.length < 1000) {
      console.error('Pixieset HTML response seems too short or empty');
      return [];
    }

    const images: Array<{ src: string; alt: string; width?: number; height?: number }> = [];
    const seenUrls = new Set<string>();

    // Pattern 1: Extract from Pixieset's image data attributes
    // Pixieset uses data-src or data-original for lazy loading
    const dataSrcMatches = html.matchAll(/data-(?:src|original|image)="([^"]*pixieset\.com[^"]+)"[^>]*/gi);
    for (const match of dataSrcMatches) {
      if (match[1] && !seenUrls.has(match[1])) {
        images.push({
          src: match[1],
          alt: 'Spring 2026 Inspo',
        });
        seenUrls.add(match[1]);
      }
    }

    // Pattern 2: Extract from img src attributes
    const imgSrcMatches = html.matchAll(/<img[^>]+src="([^"]*pixieset\.com[^"]+)"[^>]*>/gi);
    for (const match of imgSrcMatches) {
      if (match[1] && !seenUrls.has(match[1])) {
        const altMatch = match[0].match(/alt="([^"]+)"/i);
        images.push({
          src: match[1],
          alt: altMatch ? altMatch[1] : 'Spring 2026 Inspo',
        });
        seenUrls.add(match[1]);
      }
    }

    // Pattern 3: Extract from Pixieset's JSON data (if embedded)
    const jsonMatches = html.matchAll(/"image":\s*"([^"]*pixieset\.com[^"]+)"/gi);
    for (const match of jsonMatches) {
      if (match[1] && !seenUrls.has(match[1])) {
        images.push({
          src: match[1],
          alt: 'Spring 2026 Inspo',
        });
        seenUrls.add(match[1]);
      }
    }

    // Pattern 4: Extract all pixieset.com image URLs (most aggressive)
    const allPixiesetMatches = html.matchAll(/https?:\/\/[^"'\s<>]*pixieset\.com\/[^"'\s<>]+\.(jpg|jpeg|png|webp)/gi);
    for (const match of allPixiesetMatches) {
      let url = match[0];
      url = url.replace(/[<>"']+$/, '').trim();
      
      if (!seenUrls.has(url) && url.includes('pixieset.com')) {
        // Skip thumbnails and small images if possible
        if (url.includes('thumb') || url.includes('thumbnail')) {
          // Try to get full size version
          url = url.replace(/\/thumb\//, '/').replace(/\/thumbnail\//, '/');
        }
        
        images.push({
          src: url,
          alt: 'Spring 2026 Inspo',
        });
        seenUrls.add(url);
      }
    }

    // Remove duplicates and filter
    const uniqueImages = images.filter((img, index, self) => {
      return self.findIndex(i => i.src === img.src) === index;
    });

    console.log(`Successfully extracted ${uniqueImages.length} images from Pixieset gallery`);
    return uniqueImages;
  } catch (error) {
    console.error('Error fetching Pixieset gallery images:', error);
    return [];
  }
}
