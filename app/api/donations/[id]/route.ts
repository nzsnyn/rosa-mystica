import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    if (!["PENDING", "VERIFIED", "REJECTED"].includes(status)) {
      return NextResponse.json(
        { error: "Status tidak valid" },
        { status: 400 }
      );
    }

    const donation = await prisma.donation.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({
      message: "Status donasi berhasil diperbarui",
      donation,
    });
  } catch (error) {
    console.error("Error updating donation status:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memperbarui status donasi" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const donation = await prisma.donation.findUnique({
      where: { id },
    });

    if (!donation) {
      return NextResponse.json(
        { error: "Donasi tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ donation });
  } catch (error) {
    console.error("Error fetching donation:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data donasi" },
      { status: 500 }
    );
  }
}
