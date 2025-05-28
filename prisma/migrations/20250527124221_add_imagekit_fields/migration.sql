-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('IMAGE', 'ARTICLE');

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "ContentType" NOT NULL,
    "filename" TEXT,
    "path" TEXT,
    "size" INTEGER,
    "mimeType" TEXT,
    "imagekitFileId" TEXT,
    "imagekitPath" TEXT,
    "content" TEXT,
    "excerpt" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);
