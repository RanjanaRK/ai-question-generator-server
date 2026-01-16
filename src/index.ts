import cors from "cors";
import "dotenv/config";
import express from "express";
import router from "./routes/pdfRoutes";
import app from "./server";

// dotenv.config();

app.use(cors());
app.use(express());

app.use("/api", router);

app.listen(8000, () => {
  console.log("server is running okay");
});
