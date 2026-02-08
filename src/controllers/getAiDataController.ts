import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getMcqsByPdf = async (req: Request, res: Response) => {
  try {
    const pdfId = req.query.pdfId as string;

    const mcqSets = await prisma.mcqSet.findMany({
      where: { pdfId },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: mcqSets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch MCQs" });
  }
};

export const getQaByPdf = async (req: Request, res: Response) => {
  try {
    const pdfId = req.params.pdfId as string;

    const qaSets = await prisma.qaSet.findMany({
      where: { pdfId },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: qaSets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch MCQs" });
  }
};
