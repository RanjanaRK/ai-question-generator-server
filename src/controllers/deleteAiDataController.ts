import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { deleteExpiredMcqsService } from "../service/deleteExpiresService";

export const deleteExpiresMcqs = async (req: Request, res: Response) => {
  try {
    const result = await deleteExpiredMcqsService();

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
