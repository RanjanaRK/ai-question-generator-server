import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId;

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
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch MCQs" });
  }
};

export const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId;
    const { name } = req.body;

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
        updatedAt: true,
      },
    });

    res.json({
      success: true,
      message: `Your profile has been updated`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

export const deleteUserAccount = async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId;

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    req.session.destroy(() => {});

    res.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

export const updateUserPlan = async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId;
    const { plan } = req.body;

    if (!plan || !["FREE", "PRO"].includes(plan)) {
      return res.status(401).json({ success: false, message: "Invalid Plan" });
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
        updatedAt: true,
      },
    });

    res.json({
      success: true,
      message: `Your plan has been upgraded to ${plan}`,
      data: userPlan,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update Plan" });
  }
};
