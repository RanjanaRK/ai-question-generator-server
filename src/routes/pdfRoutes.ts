import { Request, Response, Router } from "express";

import multer from "multer";
import { pdfToQaController } from "../controllers/pdfToQaController";

const router = Router();
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post("/upload", upload.single("file"), pdfToQaController);

export default router;
