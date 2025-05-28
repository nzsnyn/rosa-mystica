import { getStorageStats } from "@/lib/storage-utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const stats = await getStorageStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Failed to get storage stats:", error);
    return NextResponse.json(
      { error: "Failed to get storage statistics" },
      { status: 500 }
    );
  }
}
