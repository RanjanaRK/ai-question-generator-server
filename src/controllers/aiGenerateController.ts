import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const generateMcq = async (req: Request, res: Response) => {
  try {
    const { pdfId } = req.body;

    const pdf = await prisma.pdfDocument.findUnique({
      where: { id: pdfId },
    });
    if (!pdf || !pdf.parsedText) {
      return res.status(400).json({ error: "Parsed text not found" });
    }
  } catch (error) {}
};
