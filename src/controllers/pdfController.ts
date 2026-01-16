import { Request, Response } from "express";
import { uploadPdfStorage } from "../lib/storage";

export const uploadPdf = async (req: Request, res: Response) => {
  const file = req.file!;

  const fileName = `${Date.now()}-${file.originalname}`;

  const storagePath = `${file.filename}`;

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    //  upload to storage
    const uploading = await uploadPdfStorage(
      "pdfs",
      file.path,
      storagePath,
      file.mimetype
    );

    //  save metadata
    // const pdf = await prisma.
  } catch (error) {}
};
