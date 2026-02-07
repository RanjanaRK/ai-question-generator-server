import { Router } from "express";
import { uploadPdf } from "../controllers/pdfController";
import { upload } from "../lib/multerHandler";

const router = Router();

router.post("/upload", upload.single("file"), uploadPdf);

export default router;
