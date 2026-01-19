import { Request, Response } from "express";

export const mcqGenerate = async (req: Request, res: Response) => {
  try {
    const { pdfId } = req.body;

    if (!pdfId) {
      return res.status(400).json({ error: "pdf is required" });
    }
  } catch (error) {}
};
