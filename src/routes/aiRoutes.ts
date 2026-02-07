import { Router } from "express";
import { generateMcq, generateQA } from "../controllers/aiGenerateController";
import { getMcqsByPdf, getQaByPdf } from "../controllers/getAiDataController";
import { requireAuth } from "../middlewares/requireAuth";

const airouter = Router();

airouter.post("/generate/mcq", generateMcq);

airouter.post("/generate/qa", generateQA);

airouter.get("/mcq/:pdfId", requireAuth, getMcqsByPdf);

airouter.get("/qa/:pdfId", requireAuth, getQaByPdf);

export default airouter;
