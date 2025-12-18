import fs from "fs";
import { Request, Response } from "express";
import { PDFParse } from "pdf-parse";

const pdfParse = require("pdf-parse").default;

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
