import argon2 from "argon2";
import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const blacklistedUser = await prisma.blacklistedEmail.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (blacklistedUser) {
      return res.status(400).json({
        message: "This email cannot be used",
      });
    }

    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        name,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
