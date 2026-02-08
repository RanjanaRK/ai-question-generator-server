import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import { getCurrentUser } from "../controllers/user/userController";

const userRouter = Router();

userRouter.get("/me", requireAuth, getCurrentUser);

export default userRouter;
