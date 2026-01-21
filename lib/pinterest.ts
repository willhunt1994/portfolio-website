// Function to fetch Pinterest board images
// This function attempts to fetch and parse Pinterest board HTML to extract pin image URLs only

export async function fetchPinterestBoardImages(boardUrl: string): Promise<Array<{ src: string; alt: string; width?: number; height?: number }>> {
  try {
    // Fetch the Pinterest board page
    const response = await fetch(boardUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error(`Failed to fetch Pinterest board: ${response.status} ${response.statusText}`);
      return [];
    }

    const html = await response.text();
    
    if (!html || html.length < 1000) {
      console.error('Pinterest HTML response seems too short or empty');
      return [];
    }
    
    // Extract pin images from Pinterest board HTML
    // Pinterest stores pin data in JSON-LD and script tags
    const pinImages: Array<{ src: string; alt: string; width?: number; height?: number }> = [];
    const seenUrls = new Set<string>();
    
    // Pattern 1: Extract from JSON-LD structured data
    const jsonLdMatches = html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis);
    for (const match of jsonLdMatches) {
      try {
        const jsonData = JSON.parse(match[1]);
        if (Array.isArray(jsonData)) {
          jsonData.forEach((item: any) => {
            if (item['@type'] === 'ImageObject' || item.image) {
              const imageUrl = item.url || item.image || (typeof item.image === 'object' ? item.image.url : null);
              if (imageUrl && imageUrl.includes('pinimg.com') && !seenUrls.has(imageUrl)) {
                const dimensionMatch = imageUrl.match(/\/(\d+)x\//);
                const dimension = dimensionMatch ? parseInt(dimensionMatch[1]) : null;
                // Filter out small images (profile pictures are usually 60x, 100x, 236x)
                if (!dimension || dimension >= 400) {
                  pinImages.push({
                    src: imageUrl,
                    alt: item.name || item.description || item.alt || 'Pinterest pin',
                    width: dimension || undefined,
                    height: dimension || undefined,
                  });
                  seenUrls.add(imageUrl);
                }
              }
            }
          });
        } else if (jsonData['@type'] === 'ImageObject' || jsonData.image) {
          const imageUrl = jsonData.url || jsonData.image || (typeof jsonData.image === 'object' ? jsonData.image.url : null);
          if (imageUrl && imageUrl.includes('pinimg.com') && !seenUrls.has(imageUrl)) {
            const dimensionMatch = imageUrl.match(/\/(\d+)x\//);
            const dimension = dimensionMatch ? parseInt(dimensionMatch[1]) : null;
            if (!dimension || dimension >= 400) {
              pinImages.push({
                src: imageUrl,
                alt: jsonData.name || jsonData.description || jsonData.alt || 'Pinterest pin',
                width: dimension || undefined,
                height: dimension || undefined,
              });
              seenUrls.add(imageUrl);
            }
          }
        }
      } catch (e) {
        // Skip invalid JSON
      }
    }
    
    // Pattern 2: Extract from Pinterest's initial state JSON
    const initialStateMatch = html.match(/window\.__initialData__\s*=\s*({.*?});/s);
    if (initialStateMatch) {
      try {
        const initialState = JSON.parse(initialStateMatch[1]);
        // Navigate through Pinterest's data structure to find pins
        const extractPins = (obj: any): void => {
          if (typeof obj !== 'object' || obj === null) return;
          
          if (Array.isArray(obj)) {
            obj.forEach(item => extractPins(item));
          } else {
            // Look for pin objects with images
            if (obj.images && typeof obj.images === 'object') {
              const imageUrl = obj.images.orig?.url || 
                              obj.images['736x']?.url || 
                              obj.images['564x']?.url || 
                              obj.images['474x']?.url;
              if (imageUrl && imageUrl.includes('pinimg.com') && !seenUrls.has(imageUrl)) {
                const dimensionMatch = imageUrl.match(/\/(\d+)x\//);
                const dimension = dimensionMatch ? parseInt(dimensionMatch[1]) : null;
                // Only include larger images (pins), exclude small profile pics
                if (!dimension || dimension >= 400) {
                  pinImages.push({
                    src: imageUrl,
                    alt: obj.title || obj.description || obj.richSummary?.displayName || 'Pinterest pin',
                    width: dimension || undefined,
                    height: dimension || undefined,
                  });
                  seenUrls.add(imageUrl);
                }
              }
            }
            
            // Recursively search nested objects
            Object.values(obj).forEach(value => extractPins(value));
          }
        };
        
        extractPins(initialState);
      } catch (e) {
        // Skip if JSON parsing fails
      }
    }
    
    // Pattern 3: Extract from data-pin-media attributes (fallback)
    const pinMediaMatches = html.matchAll(/data-pin-media="([^"]+)"/g);
    for (const match of pinMediaMatches) {
      if (match[1] && match[1].includes('pinimg.com') && !seenUrls.has(match[1])) {
        const dimensionMatch = match[1].match(/\/(\d+)x\//);
        const dimension = dimensionMatch ? parseInt(dimensionMatch[1]) : null;
        // Filter out small images (profile pictures)
        if (!dimension || dimension >= 400) {
          pinImages.push({
            src: match[1],
            alt: 'Pinterest pin',
            width: dimension || undefined,
            height: dimension || undefined,
          });
          seenUrls.add(match[1]);
        }
      }
    }
    
    // Pattern 4: Extract from img tags with pin-specific classes/attributes
    const pinImgMatches = html.matchAll(/<img[^>]*(?:class=["'][^"']*pin[^"']*["']|data-pin-id=["'][^"']+["'])[^>]*src="([^"]*pinimg\.com[^"]+)"[^>]*>/gi);
    for (const match of pinImgMatches) {
      if (match[1] && !seenUrls.has(match[1])) {
        const dimensionMatch = match[1].match(/\/(\d+)x\//);
        const dimension = dimensionMatch ? parseInt(dimensionMatch[1]) : null;
        if (!dimension || dimension >= 400) {
          const altMatch = match[0].match(/alt="([^"]+)"/i);
          pinImages.push({
            src: match[1],
            alt: altMatch ? altMatch[1] : 'Pinterest pin',
            width: dimension || undefined,
            height: dimension || undefined,
          });
          seenUrls.add(match[1]);
        }
      }
    }
    
    // Pattern 5: More aggressive - find ALL pinimg.com URLs and filter intelligently
    // This is the most reliable pattern - finds all Pinterest image URLs
    const allPinImgMatches = html.matchAll(/https?:\/\/[^"'\s<>]*pinimg\.com\/[^"'\s<>]+\.(jpg|jpeg|png|webp)/gi);
    for (const match of allPinImgMatches) {
      let url = match[0];
      // Clean up URL (remove trailing characters that might have been captured)
      url = url.replace(/[<>"']+$/, '').trim();
      
      if (!seenUrls.has(url) && url.includes('pinimg.com')) {
        const dimensionMatch = url.match(/\/(\d+)x\//);
        const dimension = dimensionMatch ? parseInt(dimensionMatch[1]) : null;
        
        // Skip small images and profile pictures
        if (dimension && dimension < 400) continue;
        if (url.includes('/60x/') || url.includes('/100x/') || url.includes('/236x/')) continue;
        if (url.includes('avatar') || url.includes('profile') || url.includes('user')) continue;
        if (url.includes('logo') || url.includes('icon')) continue;
        
        // Include URLs that have dimension >= 400 in the path
        if (dimension && dimension >= 400) {
          pinImages.push({
            src: url,
            alt: 'Spring 2026 Inspo',
            width: dimension,
            height: dimension,
          });
          seenUrls.add(url);
        }
      }
    }
    
    // If we still don't have images, try a simpler pattern - just get any pinimg.com URL with a reasonable size
    if (pinImages.length === 0) {
      const simpleMatches = html.matchAll(/https?:\/\/i\.pinimg\.com\/(\d+)x\/[^"'\s<>]+\.(jpg|jpeg|png|webp)/gi);
      for (const match of simpleMatches) {
        const url = match[0].replace(/[<>"']+$/, '').trim();
        const dimension = parseInt(match[1]);
        
        if (!seenUrls.has(url) && dimension >= 400 && 
            !url.includes('/60x/') && !url.includes('/100x/') && !url.includes('/236x/') &&
            !url.includes('avatar') && !url.includes('profile')) {
          pinImages.push({
            src: url,
            alt: 'Spring 2026 Inspo',
            width: dimension,
            height: dimension,
          });
          seenUrls.add(url);
        }
      }
    }

    // Remove duplicates and filter out profile pictures more aggressively
    const filteredImages = pinImages.filter((img, index, self) => {
      // Remove exact duplicates
      const isDuplicate = self.findIndex(i => i.src === img.src) !== index;
      if (isDuplicate) return false;
      
      // Filter out very small images (likely profile pics)
      if (img.width && img.width < 400) return false;
      
      // Filter out common profile picture patterns
      if (img.src.includes('/60x/') || img.src.includes('/100x/') || img.src.includes('/236x/')) {
        return false;
      }
      
      return true;
    });
    
    // Return unique pin images (limit to 50 for performance)
    const result = filteredImages.slice(0, 50);
    
    // Log for debugging
    if (result.length === 0) {
      console.warn('No Pinterest images found. This might be due to Pinterest blocking the request or changed HTML structure.');
    } else {
      console.log(`Successfully extracted ${result.length} Pinterest images`);
    }
    
    return result;
  } catch (error) {
    console.error('Error fetching Pinterest board images:', error);
    // Return empty array on error - the gallery component handles this gracefully
    return [];
  }
}
