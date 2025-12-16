import { Request, Response } from "express";
import pdf from 'pdf-parse';
import fs from "fs";

export const uploadPdf = async (req: Request, res: Response) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const dataBuffer = fs.readFileSync(req.file?.path);

    const data = await pdf(dataBuffer);
    // res.json({
    //   message: "PDF uploaded successfully",
    //   text: data.text.substring(0, 500), 
    // });
  } catch (error) {}
};
