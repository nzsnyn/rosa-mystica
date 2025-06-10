import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET /api/comments - Get comments for a specific article
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contentId = searchParams.get("contentId");
    
    if (!contentId) {
      return NextResponse.json(
        { error: "Content ID is required" },
        { status: 400 }
      );
    }

    const comments = await prisma.comment.findMany({
      where: {
        contentId,
        isApproved: true, // Only show approved comments to public
      },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        message: true,
        adminReply: true,
        repliedAt: true,
        createdAt: true,
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

// POST /api/comments - Create a new comment
export async function POST(request: NextRequest) {
  try {
    const { contentId, name, email, message } = await request.json();

    // Validation
    if (!contentId || !name || !message) {
      return NextResponse.json(
        { error: "Content ID, name, and message are required" },
        { status: 400 }
      );
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters long" },
        { status: 400 }
      );
    }

    if (message.trim().length < 5) {
      return NextResponse.json(
        { error: "Message must be at least 5 characters long" },
        { status: 400 }
      );
    }

    // Check if content exists and is an article
    const content = await prisma.content.findUnique({
      where: { id: contentId },
    });

    if (!content || content.type !== "ARTICLE") {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        contentId,
        name: name.trim(),
        email: email?.trim() || null,
        message: message.trim(),
        isApproved: false, // Comments need admin approval
      },
    });

    return NextResponse.json(
      {
        message: "Comment submitted successfully. It will be visible after admin approval.",
        commentId: comment.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
