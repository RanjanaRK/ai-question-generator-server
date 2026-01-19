import { Router } from "express";
import { mcqGenerate } from "../controllers/aiGenerateController";

const router = Router();

router.post("/generate/mcq", mcqGenerate);

export default router;
