/*
  Warnings:

  - You are about to drop the `PdfChunk` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PdfChunk" DROP CONSTRAINT "PdfChunk_pdfId_fkey";

-- DropTable
DROP TABLE "PdfChunk";
