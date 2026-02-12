import { Router } from "express";
import { register } from "../controllers/auth/registerController";
import { login } from "../controllers/auth/loginController";
import { logout } from "../controllers/auth/logoutController";
import passport from "passport";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.post("/login/federated/google", passport.authenticate("google"));

export default authRouter;
