import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import {
  getCurrentUser,
  updateCurrentUser,
  updateUserPlan,
} from "../controllers/user/userController";

const userRouter = Router();

userRouter.get("/me", requireAuth, getCurrentUser);

userRouter.patch("/me", requireAuth, updateCurrentUser);

userRouter.patch("/plan/upgrade", requireAuth, updateUserPlan);

export default userRouter;
