import { Router } from "express";
import { generateMcq } from "../controllers/aiGenerateController";

const router = Router();

router.post("/generate/mcq", generateMcq);

export default router;
