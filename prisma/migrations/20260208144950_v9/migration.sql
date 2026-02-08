-- DropForeignKey
ALTER TABLE "McqItem" DROP CONSTRAINT "McqItem_mcqSetId_fkey";

-- DropForeignKey
ALTER TABLE "McqSet" DROP CONSTRAINT "McqSet_pdfId_fkey";

-- AlterTable
ALTER TABLE "QaSet" ADD COLUMN     "expiresAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "McqSet" ADD CONSTRAINT "McqSet_pdfId_fkey" FOREIGN KEY ("pdfId") REFERENCES "PdfDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "McqItem" ADD CONSTRAINT "McqItem_mcqSetId_fkey" FOREIGN KEY ("mcqSetId") REFERENCES "McqSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
