import { Request, Response, Router } from "express";

import multer from "multer";
import { uploadPdf } from "../controllers/pdfController";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadPdf);

export default router;
