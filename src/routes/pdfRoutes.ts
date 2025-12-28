import { Request, Response, Router } from "express";

import multer from "multer";
import { pdfToQaController } from "../controllers/pdfToQaController";
import path from "path";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // .pdf
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");

    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, `${base}-${unique}${ext}`);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), pdfToQaController);

export default router;
