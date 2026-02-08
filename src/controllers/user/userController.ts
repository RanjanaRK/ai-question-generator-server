import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },

      select: {
        id: true,
        name: true,
        email: true,
        plan: true,
        createdAt: true,
        pdfs: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch MCQs" });
  }
};

export const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId;
    const { name } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
        email: true,
        plan: true,
        updateAt: true,
      },
    });
    console.log(user);

    res.json({
      success: true,
      message: `Your profile has been update`,

      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

export const updateUserPlan = async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId;
    const { plan } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!plan || !["FREE", "PRO"].includes(plan)) {
      return res.status(401).json({ message: "Invalid Plan" });
    }

    const userPlan = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        plan,
      },
      select: {
        id: true,
        name: true,
        email: true,
        plan: true,
        updateAt: true,
      },
    });
    console.log(userPlan);

    res.json({
      success: true,
      message: `Your plan has been upgraded to ${plan}`,
      data: userPlan,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update Plan" });
  }
};
