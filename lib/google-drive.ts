// Function to fetch images from a Google Drive folder
// You can get the folder ID from the Google Drive folder URL
// Example: https://drive.google.com/drive/folders/FOLDER_ID_HERE

export async function fetchGoogleDriveImages(folderId: string): Promise<Array<{ src: string; alt: string; width?: number; height?: number }>> {
  try {
    // Google Drive API endpoint to list files in a folder
    // Note: This requires the folder to be publicly shared
    // For production, you'd want to use Google Drive API with proper authentication
    const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType+contains+'image'&fields=files(id,name,mimeType,thumbnailLink,webContentLink)&key=${process.env.GOOGLE_DRIVE_API_KEY || ''}`;
    
    // If no API key, try using a public folder share link approach
    if (!process.env.GOOGLE_DRIVE_API_KEY) {
      // Alternative: Use Google Drive's public folder view
      // This requires the folder to be shared publicly with "Anyone with the link"
      const publicFolderUrl = `https://drive.google.com/drive/folders/${folderId}`;
      
      // For now, return empty array and log that API key is needed
      console.warn('Google Drive API key not found. Please set GOOGLE_DRIVE_API_KEY in your .env file, or use the manual image list approach.');
      return [];
    }

    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Google Drive folder: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.files || data.files.length === 0) {
      console.warn('No images found in Google Drive folder');
      return [];
    }

    // Convert Google Drive files to image objects
    const images = data.files.map((file: any) => {
      // Use webContentLink for direct download, or construct a direct link
      // Google Drive direct image link format: https://drive.google.com/uc?export=view&id=FILE_ID
      const imageUrl = file.webContentLink || `https://drive.google.com/uc?export=view&id=${file.id}`;
      
      return {
        src: imageUrl,
        alt: file.name || 'Spring 2026 Inspo',
        width: undefined, // Will be determined by browser
        height: undefined,
      };
    });

    console.log(`Successfully fetched ${images.length} images from Google Drive`);
    return images;
  } catch (error) {
    console.error('Error fetching Google Drive images:', error);
    return [];
  }
}

// Alternative function that accepts a manual list of Google Drive image URLs
// This is useful if you don't want to set up API authentication
export function getGoogleDriveImagesFromList(imageUrls: string[]): Array<{ src: string; alt: string; width?: number; height?: number }> {
  return imageUrls.map((url, index) => {
    // Convert Google Drive share links to direct image links if needed
    let directUrl = url;
    
    // If it's a Google Drive share link, convert to direct view link
    if (url.includes('drive.google.com/file/d/')) {
      const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (fileIdMatch) {
        directUrl = `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
      }
    }
    
    return {
      src: directUrl,
      alt: `Spring 2026 Inspo ${index + 1}`,
      width: undefined,
      height: undefined,
    };
  });
}
