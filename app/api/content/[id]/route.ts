import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const content = await prisma.content.findUnique({
      where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  try {
    const contentType = request.headers.get("content-type");
    
    // Get existing content first
    const existingContent = await prisma.content.findUnique({
      where: { id: params.id },
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
      };

      if (file) {
        // Remove old file if it exists
        if (existingContent.filename) {
          const oldFilePath = path.join(process.cwd(), "public/uploads", existingContent.filename);
          try {
            await unlink(oldFilePath);
          } catch (error) {
            // File might not exist, continue
          }
        }

        // Save new file
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}_${file.name}`;
        const filepath = path.join(process.cwd(), "public/uploads", filename);
        await writeFile(filepath, buffer);

        updateData = {
          ...updateData,
          filename,
          path: `/uploads/${filename}`,
          size: file.size,
          mimeType: file.type,
        };
      }

      const updatedContent = await prisma.content.update({
        where: { id: params.id },
        data: updateData,
      });

      return NextResponse.json(updatedContent);
    } else {
      // Handle JSON update (article or image metadata only)
      const { title, content, excerpt, description, published } = await request.json();

      const updatedContent = await prisma.content.update({
        where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  try {
    // Get existing content to clean up files
    const existingContent = await prisma.content.findUnique({
      where: { id: params.id },
    });

    if (!existingContent) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    // Delete the database record first
    await prisma.content.delete({
      where: { id: params.id },
    });

    // Clean up file if it's an image
    if (existingContent.type === "IMAGE" && existingContent.filename) {
      const filePath = path.join(process.cwd(), "public/uploads", existingContent.filename);
      try {
        await unlink(filePath);
      } catch (error) {
        // File might not exist, but don't fail the deletion
        console.warn("Could not delete file:", filePath);
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
