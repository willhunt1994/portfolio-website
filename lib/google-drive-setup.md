# Google Drive Gallery Setup Guide

## Option 1: Using Google Drive API (Recommended for automatic updates)

### Step 1: Get a Google Drive API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the "Google Drive API" for your project
4. Go to "Credentials" > "Create Credentials" > "API Key"
5. Copy your API key

### Step 2: Add API Key to Environment Variables

Add to your `.env.local` file:
```
GOOGLE_DRIVE_API_KEY=your_api_key_here
```

### Step 3: Share Your Google Drive Folder

1. Create a folder in Google Drive
2. Upload your images to the folder
3. Right-click the folder > Share > Change to "Anyone with the link"
4. Copy the folder link (e.g., `https://drive.google.com/drive/folders/FOLDER_ID`)

### Step 4: Use in Your Code

```typescript
import { fetchGoogleDriveImages } from '@/lib/google-drive';

// In your page component
const images = await fetchGoogleDriveImages(
  'FOLDER_ID_HERE', // or full URL
  { altPrefix: 'Gallery Name' }
);
```

---

## Option 2: Manual Image URLs (Easiest - No API Key Needed)

### Step 1: Get Image Share Links

1. Upload images to Google Drive
2. Right-click each image > Share > Change to "Anyone with the link"
3. Copy each image's share link

### Step 2: Use in Your Code

```typescript
import { getGoogleDriveImagesFromList } from '@/lib/google-drive';

const imageUrls = [
  'https://drive.google.com/file/d/FILE_ID_1/view?usp=sharing',
  'https://drive.google.com/file/d/FILE_ID_2/view?usp=sharing',
  'https://drive.google.com/file/d/FILE_ID_3/view?usp=sharing',
];

const images = getGoogleDriveImagesFromList(imageUrls, 'Gallery Name');
```

---

## Quick Reference

### Extract Folder ID from URL

If you have a folder URL like:
```
https://drive.google.com/drive/folders/1ABC123xyz789?usp=sharing
```

The folder ID is: `1ABC123xyz789`

You can use either:
- The full URL: `fetchGoogleDriveImages('https://drive.google.com/drive/folders/1ABC123xyz789')`
- Just the ID: `fetchGoogleDriveImages('1ABC123xyz789')`
