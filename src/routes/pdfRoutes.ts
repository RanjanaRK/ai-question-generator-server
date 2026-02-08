import { Router } from "express";
import { getPdf, uploadPdf } from "../controllers/pdfController";
import { upload } from "../lib/multerHandler";
import { requireAuth } from "../middlewares/requireAuth";

const router = Router();

router.post("/upload", requireAuth, upload.single("file"), uploadPdf);

router.get("/pdf/:pdfId", requireAuth, getPdf);

export default router;
