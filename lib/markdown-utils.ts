/**
 * Utility functions for processing markdown content
 */

/**
 * Remove markdown syntax and get plain text preview
 */
export function getMarkdownPreview(markdown: string, maxLength: number = 300): string {
  if (!markdown) return '';
  
  // Remove image markdown syntax
  let preview = markdown.replace(/!\[.*?\]\(.*?\)/g, '');
  
  // Remove link markdown syntax but keep the text
  preview = preview.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  
  // Remove header markdown
  preview = preview.replace(/#{1,6}\s/g, '');
  
  // Remove emphasis markdown
  preview = preview.replace(/\*\*(.*?)\*\*/g, '$1');
  preview = preview.replace(/\*(.*?)\*/g, '$1');
  
  // Remove code blocks
  preview = preview.replace(/```[\s\S]*?```/g, '');
  preview = preview.replace(/`([^`]+)`/g, '$1');
  
  // Remove blockquotes
  preview = preview.replace(/>\s/g, '');
  
  // Clean up whitespace
  preview = preview.replace(/\n+/g, ' ').trim();
  
  // Truncate to maxLength
  if (preview.length > maxLength) {
    preview = preview.substring(0, maxLength) + '...';
  }
  
  return preview;
}

/**
 * Extract first image from markdown content
 */
export function getFirstImageFromMarkdown(markdown: string): string | null {
  if (!markdown) return null;
  
  const imageRegex = /!\[.*?\]\((.*?)\)/;
  const match = markdown.match(imageRegex);
  
  return match ? match[1] : null;
}

/**
 * Check if markdown content has images
 */
export function hasImagesInMarkdown(markdown: string): boolean {
  if (!markdown) return false;
  
  const imageRegex = /!\[.*?\]\(.*?\)/;
  return imageRegex.test(markdown);
}
