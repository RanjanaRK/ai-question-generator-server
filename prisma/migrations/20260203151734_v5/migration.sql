-- CreateTable
CREATE TABLE "QaSet" (
    "id" TEXT NOT NULL,
    "pdfId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QaSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QaItem" (
    "id" TEXT NOT NULL,
    "qaSetId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "QaItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QaSet_pdfId_idx" ON "QaSet"("pdfId");

-- CreateIndex
CREATE INDEX "QaItem_qaSetId_idx" ON "QaItem"("qaSetId");

-- AddForeignKey
ALTER TABLE "QaSet" ADD CONSTRAINT "QaSet_pdfId_fkey" FOREIGN KEY ("pdfId") REFERENCES "PdfDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QaItem" ADD CONSTRAINT "QaItem_qaSetId_fkey" FOREIGN KEY ("qaSetId") REFERENCES "QaSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
