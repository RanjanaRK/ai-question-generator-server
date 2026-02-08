import cors from "cors";
import "dotenv/config";
import express from "express";
import router from "./routes/pdfRoutes";
import authRouter from "./routes/authRoute";
import app from "./server";
import airouter from "./routes/aiRoutes";
import { sessionMiddleware } from "./config/session";
import userRouter from "./routes/userRoutes";

// dotenv.config();

app.use(cors());
app.use(express.json());

app.use(sessionMiddleware);

app.use("/api/auth", authRouter);
app.use("/api", router);
app.use("/api/user", userRouter);
app.use("/api", airouter);

app.listen(8000, () => {
  console.log("server is running okay");
});
