import { Router } from "express";
import { register } from "../controllers/auth/registerController";
import { login } from "../controllers/auth/loginController";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;
