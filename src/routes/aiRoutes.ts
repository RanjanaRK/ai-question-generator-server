import { Router } from "express";
import { generateMcq } from "../controllers/aiGenerateController";

const airouter = Router();

airouter.post("/generate/mcq", generateMcq);

export default airouter;
