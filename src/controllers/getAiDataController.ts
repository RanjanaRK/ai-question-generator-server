import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getMcqsByPdf = async (req: Request, res: Response) => {
  try {
    const userId = req.session?.userId;
    const pdfId = req.params.pdfId as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!pdfId) {
      return res.status(400).json({ message: "pdfId is required" });
    }

    const pdf = await prisma.pdfDocument.findUnique({
      where: {
        id: pdfId,
      },
    });

    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

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
    const userId = req.session?.userId;
    const pdfId = req.params.pdfId as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!pdfId) {
      return res.status(400).json({ message: "pdfId is required" });
    }

    const pdf = await prisma.pdfDocument.findUnique({
      where: {
        id: pdfId,
      },
    });

    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

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
