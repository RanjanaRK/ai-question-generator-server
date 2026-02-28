import { Request, Response } from "express";
import { pdfParsing } from "../lib/pdfParsing";
import { prisma } from "../lib/prisma";
import { uploadPdfStorage } from "../lib/storage";
import { supabase } from "../lib/supabase";

export const uploadPdf = async (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      error: "No file uploaded",
    });
  }
  const userId = req.session?.userId;

  if (!userId) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  const storagePath = `${Date.now()}-${file.originalname}`;

  try {
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    //  upload to storage

    const uploading = await uploadPdfStorage(
      "pdfs",
      file.buffer,
      storagePath,
      file.mimetype,
    );

    // console.log("Upload success:", uploading);
    //  parse pdf
    const text = await pdfParsing(file.buffer);

    // console.log(text, "textextract", file.buffer);

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

    res.json({ success: true, pdfId: pdf.id });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
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

    // Generate signed URL
    const { data } = await supabase.storage
      .from("pdfs")
      .createSignedUrl(pdf.storagePath, 3600);

    res.json({
      success: true,
      data: {
        ...pdf,
        signedUrl: data?.signedUrl,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch PDF",
    });
  }
};
