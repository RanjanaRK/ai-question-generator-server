import { Request, Response, Router } from "express";
import { uploadPdf } from "../controllers/pdfController";
import multer from "multer";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.file);
});

export default router;
