import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get("name") as string;
    const city = formData.get("city") as string;
    const amount = formData.get("amount") as string;
    const proofFile = formData.get("proofFile") as File;

    if (!name || !city || !amount || !proofFile) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    // Validate file
    if (!proofFile.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File harus berupa gambar" },
        { status: 400 }
      );
    }

    if (proofFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Ukuran file harus kurang dari 5MB" },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "donations");
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = path.extname(proofFile.name);
    const fileName = `donation_${timestamp}${fileExtension}`;
    const filePath = path.join(uploadsDir, fileName);

    // Save file
    const bytes = await proofFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Remove "Rp" and dots from amount, then convert to number
    const cleanAmount = amount.replace(/[Rp\s.]/g, "");
    const numericAmount = parseInt(cleanAmount, 10);

    // Save to database
    const donation = await prisma.donation.create({
      data: {
        name,
        city,
        amount: numericAmount,
        proofImagePath: `/uploads/donations/${fileName}`,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      message: "Donasi berhasil dikirim",
      donation: {
        id: donation.id,
        name: donation.name,
        city: donation.city,
        amount: donation.amount,
        status: donation.status,
        createdAt: donation.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating donation:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menyimpan donasi" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get("status");
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const where = status ? { status: status as any } : {};

    const [donations, total] = await Promise.all([
      prisma.donation.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.donation.count({ where }),
    ]);

    return NextResponse.json({
      donations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching donations:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data donasi" },
      { status: 500 }
    );
  }
}
