import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const deleteExpiresMcqs = async (req: Request, res: Response) => {
  try {
    const result = await prisma.mcqSet.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    res.json({
      success: true,
      message: "Expired MCQs deleted successfully",
      deletedCount: result.count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete expired MCQs",
    });
  }
};
