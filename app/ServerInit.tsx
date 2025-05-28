'use server';

import { ensureUploadsDirectory } from '@/lib/ensure-uploads';

// Run this when the server starts up
ensureUploadsDirectory();

export default async function ServerInit() {
  // This is a server component that doesn't render anything
  // It just runs code on the server when the app starts
  return null;
}
