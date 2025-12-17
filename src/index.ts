import app from "./server";
import cors from "cors";
import express from "express";
import router from "./routes/pdfRoutes";

app.use(cors());
app.use(express());

app.use("/api", router);

app.listen(8000, () => {
  console.log("server is running okay");
});
