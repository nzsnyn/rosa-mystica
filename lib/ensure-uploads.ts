import fs from 'fs';
import path from 'path';

/**
 * Ensure the uploads directory exists in the public folder
 */
export function ensureUploadsDirectory() {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    if (!fs.existsSync(uploadsDir)) {
      console.log('Creating uploads directory...');
      fs.mkdirSync(uploadsDir, { recursive: true });
      console.log('Uploads directory created successfully at:', uploadsDir);
    } else {
      console.log('Uploads directory already exists at:', uploadsDir);
    }
  } catch (error) {
    console.error('Error ensuring uploads directory exists:', error);
  }
}
