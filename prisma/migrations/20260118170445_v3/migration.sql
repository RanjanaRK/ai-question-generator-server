/*
  Warnings:

  - Added the required column `status` to the `PdfDocument` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PdfDocument" ADD COLUMN     "parsedText" TEXT,
ADD COLUMN     "status" TEXT NOT NULL;
