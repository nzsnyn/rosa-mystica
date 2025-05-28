import { prisma } from "./db";

/**
 * Get statistics about storage usage
 */
export async function getStorageStats() {
  try {
    // Get all image content
    const images = await prisma.content.findMany({
      where: {
        type: "IMAGE",
      },
      select: {
        size: true,
      },
    });
    
    // Calculate total size in bytes
    const totalSize = images.reduce((sum, image) => sum + (image.size || 0), 0);
    
    return {
      totalImages: images.length,
      totalSizeBytes: totalSize,
      totalSizeMB: totalSize / (1024 * 1024),
    };
  } catch (error) {
    console.error("Failed to get storage stats:", error);
    return {
      totalImages: 0,
      totalSizeBytes: 0,
      totalSizeMB: 0,
    };
  }
}
