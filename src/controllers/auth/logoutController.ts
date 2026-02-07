import { Request, Response } from "express";

export const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.clearCookie("sid");
    res.json({ message: "Logged out" });
  });
};
