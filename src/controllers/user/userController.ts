import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        pdfs: true,
      },
    });

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch MCQs" });
  }
};
