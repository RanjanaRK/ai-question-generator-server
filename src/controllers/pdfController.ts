import { Request, Response } from "express";
import { pdfParsing } from "../lib/pdfParsing";
import { prisma } from "../lib/prisma";
import { uploadPdfStorage } from "../lib/storage";

export const uploadPdf = async (req: Request, res: Response) => {
  const file = req.file!;

  const userId = req.session!.userId;

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
        userId: userId,
      },
    });

    res.json({ success: true, pdfId: pdf.id, text });
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
};

export const getPdf = async (req: Request, res: Response) => {
  try {
    const userId = req.session!.userId;

    const pdfId = req.params.pdfId as string;

    const pdf = await prisma.pdfDocument.findFirst({
      where: {
        id: pdfId,
        userId: userId,
      },
    });

    if (!pdf) {
      return res.status(404).json({
        message: "PDF not found",
      });
    }

    res.json({
      success: true,
      data: pdf,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch PDF" });
  }
};
