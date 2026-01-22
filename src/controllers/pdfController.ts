import { Request, Response } from "express";
import { pdfParsing } from "../lib/pdfParsing";
import { prisma } from "../lib/prisma";
import { uploadPdfStorage } from "../lib/storage";

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

    //  parse pdf
    const text = await pdfParsing(file.path);

    console.log(text, "textextract", file.path);

    //  save metadata
    const pdf = await prisma.pdfDocument.create({
      data: {
        originalName: file.originalname,
        storagePath: storagePath,
        parsedText: text.text,
        status: "PARSED",
      },
    });

    res.json({ success: true, pdfId: pdf.id, text });
  } catch (error) {
    console.error(error);
  }
};
