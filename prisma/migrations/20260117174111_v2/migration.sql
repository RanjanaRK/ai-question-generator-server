-- DropForeignKey
ALTER TABLE "PdfChunk" DROP CONSTRAINT "PdfChunk_pdfId_fkey";

-- DropForeignKey
ALTER TABLE "PdfDocument" DROP CONSTRAINT "PdfDocument_userId_fkey";

-- CreateIndex
CREATE INDEX "PdfChunk_pdfId_idx" ON "PdfChunk"("pdfId");

-- CreateIndex
CREATE INDEX "PdfDocument_userId_idx" ON "PdfDocument"("userId");

-- AddForeignKey
ALTER TABLE "PdfDocument" ADD CONSTRAINT "PdfDocument_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PdfChunk" ADD CONSTRAINT "PdfChunk_pdfId_fkey" FOREIGN KEY ("pdfId") REFERENCES "PdfDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
