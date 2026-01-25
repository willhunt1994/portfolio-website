// Function to fetch images from a Dropbox folder using Dropbox API
// Requires DROPBOX_ACCESS_TOKEN environment variable

interface DropboxFile {
  name: string;
  path_lower: string;
  id: string;
}

interface DropboxListResponse {
  entries: DropboxFile[];
  has_more: boolean;
  cursor?: string;
}

export async function fetchDropboxImages(folderPathOrUrl: string): Promise<Array<{ src: string; alt: string; width?: number; height?: number }>> {
  try {
    const accessToken = process.env.DROPBOX_ACCESS_TOKEN;
    
    if (!accessToken) {
      console.error('DROPBOX_ACCESS_TOKEN environment variable is not set');
      return [];
    }

    let normalizedPath = folderPathOrUrl;

    // If it's a Dropbox share URL, extract the folder name or convert it
    if (folderPathOrUrl.includes('dropbox.com/scl/fo/')) {
      // Extract folder name from URL - try to get it from the URL structure
      // Or use Dropbox API to resolve the shared link
      try {
        // Try to get metadata from shared link
        const sharedLinkResponse = await fetch('https://api.dropboxapi.com/2/sharing/get_shared_link_metadata', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: folderPathOrUrl,
          }),
        });

        if (sharedLinkResponse.ok) {
          const metadata = await sharedLinkResponse.json();
          if (metadata.path_lower) {
            normalizedPath = metadata.path_lower;
            console.log(`Resolved shared link to path: ${normalizedPath}`);
          } else if (metadata.name) {
            // If we get the name, try to use it as a path
            normalizedPath = `/${metadata.name}`;
            console.log(`Using folder name as path: ${normalizedPath}`);
          }
        }
      } catch (error) {
        console.warn('Could not resolve shared link, will try to extract folder name');
        // Fallback: try to extract folder name from URL or use a default
        // The folder name might be visible in the URL or we can list root folders
      }
    }
    
    // If it's a folder ID format (starts with "id:"), try to get the actual path
    if (normalizedPath.startsWith('id:')) {
      const folderId = normalizedPath.replace('id:', '');
      
      try {
        const metadataResponse = await fetch('https://api.dropboxapi.com/2/files/get_metadata', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: folderId,
          }),
        });

        if (metadataResponse.ok) {
          const metadata = await metadataResponse.json();
          if (metadata.path_lower) {
            normalizedPath = metadata.path_lower;
            console.log(`Resolved folder ID to path: ${normalizedPath}`);
          }
        }
      } catch (error) {
        console.warn('Could not resolve folder ID');
      }
    }

    // If normalizedPath still looks like a URL or ID, try listing root to find the folder
    if (normalizedPath.includes('dropbox.com') || normalizedPath.startsWith('id:')) {
      console.log('Trying to find folder by listing root directories...');
      // We'll handle this in the list_folder call by trying common paths
      // For now, let's try to get the folder name from the user's share link
      // The folder name is often visible in Dropbox - ask user to check
      throw new Error('Could not resolve folder path. Please use the folder path format: /FolderName (e.g., /Spring 2026 Inspo)');
    }

    console.log(`Fetching images from Dropbox folder: "${normalizedPath}"`);
    
    // Validate the path format
    if (!normalizedPath.startsWith('/')) {
      console.warn(`Warning: Folder path should start with "/". Adding it: "/${normalizedPath}"`);
      normalizedPath = `/${normalizedPath}`;
    }

    const images: Array<{ src: string; alt: string; width?: number; height?: number }> = [];
    let cursor: string | undefined = undefined;
    let hasMore = true;

    // List all files in the folder (handle pagination)
    while (hasMore) {
      // Dropbox API endpoint
      const endpoint = cursor 
        ? 'https://api.dropboxapi.com/2/files/list_folder/continue'
        : 'https://api.dropboxapi.com/2/files/list_folder';
      
      const requestBody = cursor 
        ? { cursor }
        : { 
            path: normalizedPath,
            recursive: false,
            include_media_info: false,
            include_deleted: false,
          };

      console.log(`Making Dropbox API request to ${endpoint} with path: ${normalizedPath}`);

      const listResponse = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!listResponse.ok) {
        const errorText = await listResponse.text();
        let errorData: any;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: errorText || 'Unknown error', rawResponse: errorText };
        }
        
        // Log detailed error information
        console.error('Dropbox API error details:', {
          status: listResponse.status,
          statusText: listResponse.statusText,
          error: errorData,
          requestPath: normalizedPath,
        });
        
        // If it's a path not found error, try to list root folders to help user
        if (listResponse.status === 409 || (errorData.error && errorData.error['.tag'] === 'path')) {
          console.log('Attempting to list root folders to help find the correct path...');
          try {
            const rootListResponse = await fetch('https://api.dropboxapi.com/2/files/list_folder', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                path: '',
                recursive: false,
              }),
            });
            
            if (rootListResponse.ok) {
              const rootData = await rootListResponse.json();
              const folders = rootData.entries
                .filter((entry: any) => entry['.tag'] === 'folder')
                .map((entry: any) => entry.name);
              console.log('Available folders in root:', folders);
              throw new Error(`Folder not found at "${normalizedPath}". Available folders: ${folders.join(', ')}. Please update DROPBOX_FOLDER_PATH in .env.local`);
            }
          } catch (listError) {
            // If listing fails, just throw the original error
          }
        }
        
        throw new Error(`Dropbox API error: ${listResponse.status} - ${errorData.error_summary || errorData.error?.['.tag'] || JSON.stringify(errorData)}`);
      }

      const data: DropboxListResponse = await listResponse.json();
      
      // Filter for image files
      const imageFiles = data.entries.filter(file => {
        const ext = file.name.toLowerCase().split('.').pop();
        return ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext || '');
      });

      // Get temporary links for each image
      for (const file of imageFiles) {
        try {
          const linkResponse = await fetch('https://api.dropboxapi.com/2/files/get_temporary_link', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              path: file.path_lower,
            }),
          });

          if (linkResponse.ok) {
            const linkData = await linkResponse.json();
            images.push({
              src: linkData.link,
              alt: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension for alt text
            });
          }
        } catch (error) {
          console.error(`Error getting link for ${file.name}:`, error);
        }
      }

      hasMore = data.has_more;
      cursor = data.cursor;
    }

    console.log(`Successfully fetched ${images.length} images from Dropbox folder: ${folderPathOrUrl}`);
    return images;
  } catch (error) {
    console.error('Error fetching Dropbox images:', error);
    return [];
  }
}
