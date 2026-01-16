import fs from "fs";
import { Request, Response } from "express";
import { PDFParse } from "pdf-parse";

export const pdfToQaController = async (req: Request, res: Response) => {
  if (!req.file?.path) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const buffer = fs.readFileSync(req.file.path);
  const uint8Array = new Uint8Array(buffer);
  const data = new PDFParse(uint8Array);
  const result = data.getText();
  console.log((await result).text);
  res.json({
    success: true,
    preview: (await result).text,
  });
};

// generator client {
//   provider = "prisma-client-js"
//   output   = "../src/generated/prisma"
// }

// datasource db {
//   provider = "postgresql"
// }

// model User {
//   id        String   @id @default(uuid())
//   name      String
//   email     String   @unique
//   password  String
//   createdAt DateTime @default(now())
//   pdfs      PdfDocument[]
// }

// model PdfDocument{
//   id String @default(uuid()) @id
//   originalName String
//   storagePath  String
//   createdAt DateTime @default(now())
//   userId String?
//   user User? @relation(fields: [userId], references: [id])
//   chunks PdfChunk[]
// }

// model PdfChunk {
//   id       String @default(uuid()) @id
//   content  String
//   createdAt DateTime @default(now())
//   pdfId     String
//   pdf       PdfDocument @relation(fields: [pdfId],references: [id])

// }
