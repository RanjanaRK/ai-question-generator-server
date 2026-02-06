import { Router } from "express";
import { register } from "../controllers/auth/registerController";

const authRouter = Router();

authRouter.post("/register", register);

export default authRouter;
