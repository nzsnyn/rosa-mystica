import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // 'IMAGE', 'ARTICLE', or null for all
    
    const where = type ? { type: type as any } : {};
    
    const content = await prisma.content.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type");
    
    if (contentType?.includes("multipart/form-data")) {
      // Handle image upload
      const formData = await request.formData();
      const file = formData.get("file") as File;
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;

      if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const filename = `${Date.now()}_${file.name}`;
      const filepath = path.join(process.cwd(), "public/uploads", filename);

      // Write file to public/uploads directory
      await writeFile(filepath, buffer);

      // Save to database
      const content = await prisma.content.create({
        data: {
          title,
          description,
          type: "IMAGE",
          filename,
          path: `/uploads/${filename}`,
          size: file.size,
          mimeType: file.type,
          published: true,
        },
      });

      return NextResponse.json(content, { status: 201 });
    } else {
      // Handle article creation
      const { title, content, excerpt, description, published } = await request.json();

      const newContent = await prisma.content.create({
        data: {
          title,
          description,
          type: "ARTICLE",
          content,
          excerpt,
          published: published || false,
        },
      });

      return NextResponse.json(newContent, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create content" },
      { status: 500 }
    );
  }
}
