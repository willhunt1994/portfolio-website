// Quick test script to verify Dropbox API connection
// Run with: node scripts/test-dropbox.js

require('dotenv').config({ path: '.env.local' });

const accessToken = process.env.DROPBOX_ACCESS_TOKEN;
const folderPath = process.env.DROPBOX_FOLDER_PATH || '/Winter Lookbook';

async function testDropbox() {
  if (!accessToken) {
    console.error('❌ DROPBOX_ACCESS_TOKEN not found in .env.local');
    return;
  }

  console.log(`🔍 Testing Dropbox API connection...`);
  console.log(`📁 Folder path: "${folderPath}"`);
  console.log(`🔑 Access token: ${accessToken.substring(0, 20)}...`);

  try {
    // Test 1: List folder
    console.log('\n📋 Testing list_folder API...');
    const listResponse = await fetch('https://api.dropboxapi.com/2/files/list_folder', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: folderPath,
        recursive: false,
      }),
    });

    const listData = await listResponse.json();
    
    if (listResponse.ok) {
      console.log('✅ Folder found!');
      console.log(`📊 Found ${listData.entries.length} items`);
      
      const images = listData.entries.filter(file => {
        const ext = file.name.toLowerCase().split('.').pop();
        return ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext || '');
      });
      
      console.log(`🖼️  Found ${images.length} image files:`);
      images.slice(0, 5).forEach(img => console.log(`   - ${img.name}`));
      if (images.length > 5) {
        console.log(`   ... and ${images.length - 5} more`);
      }
    } else {
      console.error('❌ Error listing folder:');
      console.error(JSON.stringify(listData, null, 2));
      
      // Try to list root to see available folders
      console.log('\n📋 Trying to list root folders...');
      const rootResponse = await fetch('https://api.dropboxapi.com/2/files/list_folder', {
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
      
      if (rootResponse.ok) {
        const rootData = await rootResponse.json();
        const folders = rootData.entries
          .filter(entry => entry['.tag'] === 'folder')
          .map(entry => entry.name);
        console.log('📁 Available folders in root:');
        folders.forEach(folder => console.log(`   - ${folder}`));
      }
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testDropbox();
