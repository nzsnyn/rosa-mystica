import { prisma } from "@/lib/db";
import { saveLocalFile } from "@/lib/file-storage";
import { NextRequest, NextResponse } from "next/server";

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

      // Check file size (1MB = 1024 * 1024 bytes)
      const maxSize = 1 * 1024 * 1024; // 1MB
      if (file.size > maxSize) {
        return NextResponse.json({ 
          error: `File size must be less than 1MB. Uploaded file is ${(file.size / 1024 / 1024).toFixed(2)}MB` 
        }, { status: 400 });
      }      
      
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Save file to local storage
      const fileInfo = await saveLocalFile(buffer, file.name);

      // Save to database with local file information
      const content = await prisma.content.create({
        data: {
          title,
          description,
          type: "IMAGE",
          filename: fileInfo.filename,
          path: fileInfo.path,
          size: fileInfo.size,
          mimeType: file.type,
          published: true,
        },
      });

      return NextResponse.json(content, { status: 201 });    } else {
      // Handle JSON request
      const body = await request.json();
      
      if (body.type === "IMAGE") {
        // Handle image content creation (no direct upload support for ImageKit anymore)
        const newContent = await prisma.content.create({
          data: {
            title: body.title,
            description: body.description,
            type: "IMAGE",
            filename: body.filename,
            path: body.path,
            size: body.size,
            mimeType: body.mimeType,
            published: body.published || false,
          },
        });
        
        return NextResponse.json(newContent, { status: 201 });
      } else if (body.type === "ARTICLE") {
        // Handle article creation
        const { title, content, excerpt, description, published } = body;

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
      } else {
        // Handle other JSON requests
        const { title, content, excerpt, description, published } = body;

        const newContent = await prisma.content.create({
          data: {
            title,
            description,
            type: body.type || "ARTICLE",
            content,
            excerpt,
            published: published || false,
          },
        });

        return NextResponse.json(newContent, { status: 201 });
      }
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create content" },
      { status: 500 }
    );
  }
}
