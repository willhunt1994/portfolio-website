/**
 * Extract folder ID from Google Drive URL
 * Supports formats:
 * - https://drive.google.com/drive/folders/FOLDER_ID
 * - https://drive.google.com/drive/folders/FOLDER_ID?usp=sharing
 * - FOLDER_ID (direct ID)
 */
function extractFolderId(urlOrId: string): string {
  // If it's already just an ID, return it
  if (!urlOrId.includes('drive.google.com')) {
    return urlOrId;
  }

  // Extract folder ID from URL
  // Handles: https://drive.google.com/drive/folders/FOLDER_ID?usp=sharing
  const match = urlOrId.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    console.log(`Extracted folder ID: ${match[1]}`);
    return match[1];
  }
  
  console.warn(`Could not extract folder ID from: ${urlOrId}`);
  return urlOrId;
}

/**
 * Fetch images from a Google Drive folder
 * 
 * Setup Instructions:
 * 1. Create a Google Drive folder and upload your images
 * 2. Right-click the folder > Share > Change to "Anyone with the link" > Copy link
 * 3. Use the folder ID or full URL in your code
 * 
 * @param folderIdOrUrl - Google Drive folder ID or full URL
 * @param options - Optional configuration
 */
export async function fetchGoogleDriveImages(
  folderIdOrUrl: string,
  options?: {
    apiKey?: string;
    altPrefix?: string;
  }
): Promise<Array<{ src: string; alt: string; width?: number; height?: number }>> {
  try {
    const folderId = extractFolderId(folderIdOrUrl);
    const apiKey = options?.apiKey || process.env.GOOGLE_DRIVE_API_KEY;
    const altPrefix = options?.altPrefix || 'Gallery Image';

    // Method 1: Use Google Drive API (requires API key)
    if (apiKey) {
      // Request only basic fields - we'll construct the URL ourselves
      // webContentLink requires authentication, so we don't request it
      const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType+contains+'image'&fields=files(id,name,mimeType)&key=${apiKey}`;

      const response = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `Google Drive API error (${response.status}): ${errorText}`;
        
        if (response.status === 403) {
          errorMessage += '\n\n⚠️ 403 Forbidden - Make sure:\n';
          errorMessage += '1. GOOGLE_DRIVE_API_KEY is set correctly\n';
          errorMessage += '2. Google Drive API is enabled in Google Cloud Console\n';
          errorMessage += '3. Folder is shared with "Anyone with the link"\n';
          errorMessage += '4. Each image file is individually shared (not just the folder)';
        } else if (response.status === 404) {
          errorMessage += '\n\n⚠️ 404 Not Found - Check that the folder ID is correct';
        }
        
        console.error(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      if (!data.files || data.files.length === 0) {
        console.warn(`No images found in Google Drive folder: ${folderId}`);
        return [];
      }

      const images = data.files.map((file: any, index: number) => {
        // Google Drive image URL formats:
        // Use uc?export=view format - this works for publicly shared files
        // DO NOT use webContentLink as it requires authentication
        // DO NOT use export=download as it also requires authentication
        
        // Standard format for viewing publicly shared images
        const imageUrl = `https://drive.google.com/uc?export=view&id=${file.id}`;
        
        return {
          src: imageUrl,
          alt: file.name || `${altPrefix} ${index + 1}`,
          width: undefined,
          height: undefined,
        };
      });

      console.log(`Successfully fetched ${images.length} images from Google Drive folder ${folderId}`);
      return images;
    }

    // Method 2: Use public folder sharing (no API key needed)
    // Note: This requires manual image URLs or using a service that can parse the folder
    // For now, return empty and suggest using manual URLs or API key
    console.warn('Google Drive API key not found. Please either:');
    console.warn('1. Set GOOGLE_DRIVE_API_KEY in your .env.local file, OR');
    console.warn('2. Use getGoogleDriveImagesFromList() with manual image URLs');
    
    return [];
  } catch (error) {
    console.error('Error fetching Google Drive images:', error);
    return [];
  }
}

/**
 * Convert Google Drive share links to direct image URLs
 * Supports multiple Google Drive URL formats
 */
function convertToDirectImageUrl(shareUrl: string): string {
  // Format 1: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  let fileIdMatch = shareUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch) {
    return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
  }

  // Format 2: https://drive.google.com/open?id=FILE_ID
  fileIdMatch = shareUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (fileIdMatch) {
    return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
  }

  // Format 3: Already a direct link or other format
  return shareUrl;
}

/**
 * Alternative function that accepts a manual list of Google Drive image URLs
 * This is useful if you don't want to set up API authentication
 * 
 * Usage:
 * const imageUrls = [
 *   'https://drive.google.com/file/d/FILE_ID/view?usp=sharing',
 *   'https://drive.google.com/file/d/ANOTHER_ID/view?usp=sharing'
 * ];
 * const images = getGoogleDriveImagesFromList(imageUrls, 'Gallery Name');
 */
export function getGoogleDriveImagesFromList(
  imageUrls: string[],
  altPrefix: string = 'Gallery Image'
): Array<{ src: string; alt: string; width?: number; height?: number }> {
  return imageUrls.map((url, index) => {
    const directUrl = convertToDirectImageUrl(url);
    
    return {
      src: directUrl,
      alt: `${altPrefix} ${index + 1}`,
      width: undefined,
      height: undefined,
    };
  });
}
