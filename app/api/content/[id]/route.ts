import { prisma } from "@/lib/db";
import { saveLocalFile, deleteLocalFile } from "@/lib/file-storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const content = await prisma.content.findUnique({
      where: { id },
    });

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const contentType = request.headers.get("content-type");
    
    // Get existing content first
    const existingContent = await prisma.content.findUnique({
      where: { id },
    });

    if (!existingContent) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    if (contentType?.includes("multipart/form-data")) {
      // Handle image file update
      const formData = await request.formData();
      const file = formData.get("file") as File;
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const published = formData.get("published") === "true";

      let updateData: any = {
        title,
        description,
        published,
      };      if (file) {
        // Check file size (1MB = 1024 * 1024 bytes)
        const maxSize = 1 * 1024 * 1024; // 1MB
        if (file.size > maxSize) {
          return NextResponse.json({ 
            error: `File size must be less than 1MB. Uploaded file is ${(file.size / 1024 / 1024).toFixed(2)}MB` 
          }, { status: 400 });
        }

        // Delete old file from local storage if it exists
        if (existingContent.path) {
          try {
            await deleteLocalFile(existingContent.path);
          } catch (error) {
            console.warn("Could not delete old file:", error);
          }
        }

        // Save new file to local storage
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const fileInfo = await saveLocalFile(buffer, file.name);

        updateData = {
          ...updateData,
          filename: fileInfo.filename,
          path: fileInfo.path,
          size: fileInfo.size,
          mimeType: file.type,
          // Clear any ImageKit data that might exist
          imagekitFileId: null,
          imagekitPath: null,
        };
      }const updatedContent = await prisma.content.update({
        where: { id },
        data: updateData,
      });

      return NextResponse.json(updatedContent);
    } else {
      // Handle JSON update (article or image metadata only)
      const { title, content, excerpt, description, published } = await request.json();

      const updatedContent = await prisma.content.update({
        where: { id },
        data: {
          title,
          description,
          content: content || undefined,
          excerpt: excerpt || undefined,
          published,
        },
      });

      return NextResponse.json(updatedContent);
    }
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    // Get existing content to clean up files
    const existingContent = await prisma.content.findUnique({
      where: { id },
    });

    if (!existingContent) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    // Delete the database record first
    await prisma.content.delete({
      where: { id },
    });    // Clean up file if it's an image
    if (existingContent.type === "IMAGE" && existingContent.path) {
      try {
        await deleteLocalFile(existingContent.path);
      } catch (error) {
        // Don't fail the deletion if file cleanup fails
        console.warn("Could not delete local file:", existingContent.path, error);
      }
    }

    return NextResponse.json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete content" },
      { status: 500 }
    );
  }
}
