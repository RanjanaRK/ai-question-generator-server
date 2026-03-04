import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import {
  deleteUserAccount,
  getCurrentUser,
  updateCurrentUser,
  updateUserPlan,
} from "../controllers/user/userController";

const userRouter = Router();

userRouter.get("/me", requireAuth, getCurrentUser);

userRouter.patch("/me", requireAuth, updateCurrentUser);

userRouter.delete("/account", requireAuth, deleteUserAccount);

userRouter.patch("/plan/upgrade", requireAuth, updateUserPlan);

export default userRouter;
