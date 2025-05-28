// Simple SVG placeholder
export const generatePlaceholderImage = () => {
  return `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="#f0f0f0" />
    <text x="50%" y="50%" font-family="Arial" font-size="20" text-anchor="middle" fill="#999">Image Unavailable</text>
  </svg>`;
};

// Convert SVG to Data URL
export const placeholderImageDataUrl = () => {
  const svg = generatePlaceholderImage();
  const encodedSvg = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${encodedSvg}`;
};

// Generate a placeholder image and save it to the public folder
export const savePlaceholderImage = async () => {
  const fs = await import('fs/promises');
  const path = await import('path');
  
  const svg = generatePlaceholderImage();
  const outputPath = path.join(process.cwd(), 'public', 'placeholders', 'image-unavailable.svg');
  
  try {
    await fs.writeFile(outputPath, svg, 'utf-8');
    console.log(`Placeholder image saved to ${outputPath}`);
    return true;
  } catch (error) {
    console.error('Failed to save placeholder image:', error);
    return false;
  }
};

// Use this in a Node.js script to generate the placeholder
if (typeof require !== 'undefined' && require.main === module) {
  savePlaceholderImage()
    .then(() => console.log('Done!'))
    .catch(console.error);
}
