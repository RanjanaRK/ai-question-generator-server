import { Router } from "express";
import { generateMcq, generateQA } from "../controllers/aiGenerateController";

const airouter = Router();

airouter.post("/generate/mcq", generateMcq);

airouter.post("/generate/qa", generateQA);

export default airouter;
