'use server';

/**
 * DISABLED: ImageKit migration functionality has been disabled
 * since ImageKit integration has been completely removed from this application.
 * These functions now return error messages instead of performing migrations.
 */

export async function migrateImageKitToLocal(contentId: string) {
  return {
    success: false,
    message: 'ImageKit migration has been disabled. ImageKit integration has been completely removed from this application.'
  };
}

export async function migrateAllImagesToLocal() {
  return {
    summary: {
      total: 0,
      success: 0,
      failure: 0,
      successPercentage: '0'
    },
    results: [],
    message: 'ImageKit migration has been disabled. ImageKit integration has been completely removed from this application.'
  };
}
