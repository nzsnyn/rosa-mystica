import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET /api/comments/admin - Get all comments for admin (including unapproved)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contentId = searchParams.get("contentId");
    
    const whereClause = contentId ? { contentId } : {};
    
    const comments = await prisma.comment.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: {
        content: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching admin comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

// POST /api/comments/admin - Admin actions (approve, reply, delete)
export async function POST(request: NextRequest) {
  try {
    const { action, commentId, adminReply } = await request.json();

    if (!action || !commentId) {
      return NextResponse.json(
        { error: "Action and comment ID are required" },
        { status: 400 }
      );
    }

    switch (action) {
      case "approve":
        await prisma.comment.update({
          where: { id: commentId },
          data: { isApproved: true },
        });
        return NextResponse.json({ message: "Comment approved successfully" });

      case "unapprove":
        await prisma.comment.update({
          where: { id: commentId },
          data: { isApproved: false },
        });
        return NextResponse.json({ message: "Comment unapproved successfully" });

      case "reply":
        if (!adminReply || adminReply.trim().length < 1) {
          return NextResponse.json(
            { error: "Admin reply is required" },
            { status: 400 }
          );
        }
        
        await prisma.comment.update({
          where: { id: commentId },
          data: {
            adminReply: adminReply.trim(),
            repliedAt: new Date(),
            isApproved: true, // Auto-approve when admin replies
          },
        });
        return NextResponse.json({ message: "Reply added successfully" });

      case "delete":
        await prisma.comment.delete({
          where: { id: commentId },
        });
        return NextResponse.json({ message: "Comment deleted successfully" });

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error performing admin action:", error);
    return NextResponse.json(
      { error: "Failed to perform action" },
      { status: 500 }
    );
  }
}
