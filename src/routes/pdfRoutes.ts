import { Request, Response, Router } from "express";

import multer from "multer";
import { pdfToQaController } from "../controllers/pdfToQaController";
import path from "path";
import { upload } from "../lib/multerHandler";
import { uploadPdf } from "../controllers/pdfController";

const router = Router();

router.post("/upload", upload.single("file"), uploadPdf);

export default router;
