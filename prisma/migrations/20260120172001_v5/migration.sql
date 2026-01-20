-- CreateTable
CREATE TABLE "McqSet" (
    "id" TEXT NOT NULL,
    "pdfId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "McqSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "McqItem" (
    "id" TEXT NOT NULL,
    "mcqSetId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "optionA" TEXT NOT NULL,
    "optionB" TEXT NOT NULL,
    "optionC" TEXT NOT NULL,
    "optionD" TEXT NOT NULL,
    "correctOption" TEXT NOT NULL,

    CONSTRAINT "McqItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "McqSet" ADD CONSTRAINT "McqSet_pdfId_fkey" FOREIGN KEY ("pdfId") REFERENCES "PdfDocument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "McqItem" ADD CONSTRAINT "McqItem_mcqSetId_fkey" FOREIGN KEY ("mcqSetId") REFERENCES "McqSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
