import app from "./server";
import cors from "cors";
import express from "express";

app.use(cors());
app.use(express());

app.listen(8000, () => {
  console.log("server is running okay");
});
