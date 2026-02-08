import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import {
  getCurrentUser,
  updateCurrentUser,
} from "../controllers/user/userController";

const userRouter = Router();

userRouter.get("/me", requireAuth, getCurrentUser);

userRouter.patch("/me", requireAuth, updateCurrentUser);

export default userRouter;
