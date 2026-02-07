import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import argon2 from "argon2";
import { loginSchema } from "../../utils/schema";

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Invalid input", errors: parsed.error.format() });
    }

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.regenerate(function (err) {
      req.session.userId = user.id;

      console.info(`User logged in: ${user.email} (ID: ${user.id})`);
      res.status(200).json({
        message: "User logged in successfully",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
