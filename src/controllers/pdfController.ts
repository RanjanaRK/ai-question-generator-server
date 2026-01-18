import { Request, Response } from "express";
import { uploadPdfStorage } from "../lib/storage";
import { prisma } from "../lib/prisma";
import { pdfParsing } from "../lib/pdfParsing";
import { chunkText } from "../lib/chunkText";

export const uploadPdf = async (req: Request, res: Response) => {
  // if (!req.file) {
  //   return res.status(400).json({ error: "No file uploaded" });
  // }

  const file = req.file!;

  const storagePath = `${Date.now()}-${file.originalname}`;

  try {
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    //  upload to storage
    const uploading = await uploadPdfStorage(
      "pdfs",
      file.path,
      storagePath,
      file.mimetype,
    );

    //  save metadata
    const pdf = await prisma.pdfDocument.create({
      data: {
        originalName: file.originalname,
        storagePath: storagePath,
      },
    });

    //  parse pdf
    const text = await pdfParsing(file.path);

    // chunk text

    const chunking = chunkText(text.text);

    res.json({ success: true, pdfId: pdf.id, text });
  } catch (error) {
    console.error(error);
  }
};
