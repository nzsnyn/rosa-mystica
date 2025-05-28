import { promises as fs } from 'fs';
import path from 'path';
import { randomBytes } from 'crypto';

/**
 * Save an uploaded file to the local filesystem
 * @param file Buffer containing the file data
 * @param filename Original filename
 * @returns Information about the saved file
 */
export async function saveLocalFile(
  fileBuffer: Buffer,
  filename: string
): Promise<{
  filename: string;
  path: string;
  size: number;
}> {
  try {
    // Create a timestamp and random string to ensure unique filenames
    const timestamp = Date.now();
    const uniqueFilename = `${timestamp}_${filename}`;
    
    // Ensure the uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await fs.access(uploadsDir);
    } catch {
      await fs.mkdir(uploadsDir, { recursive: true });
    }
    
    // Save the file
    const filePath = path.join(uploadsDir, uniqueFilename);
    await fs.writeFile(filePath, fileBuffer);
    
    // Return file info
    return {
      filename: uniqueFilename,
      path: `/uploads/${uniqueFilename}`,
      size: fileBuffer.length,
    };
  } catch (error) {
    console.error('Error saving file:', error);
    throw new Error('Failed to save file to local storage');
  }
}

/**
 * Delete a file from the local filesystem
 * @param filePath Path to the file to delete
 */
export async function deleteLocalFile(filePath: string): Promise<void> {
  try {
    // Extract filename from path (which would be like /uploads/filename.jpg)
    const filename = path.basename(filePath);
    
    // Create the full path to the file
    const fullPath = path.join(process.cwd(), 'public', 'uploads', filename);
    
    // Check if file exists
    try {
      await fs.access(fullPath);
    } catch {
      console.warn(`File not found: ${fullPath}`);
      return;
    }
    
    // Delete the file
    await fs.unlink(fullPath);
    console.log(`Deleted file: ${fullPath}`);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error('Failed to delete file from local storage');
  }
}
