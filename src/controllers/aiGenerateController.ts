import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { chunkText } from "../lib/chunkText";

export const generateMcq = async (req: Request, res: Response) => {
  try {
    const { pdfId } = req.body;

    const pdf = await prisma.pdfDocument.findUnique({
      where: { id: pdfId },
    });
    if (!pdf || !pdf.parsedText) {
      return res.status(400).json({ error: "Parsed text not found" });
    }

    const chunks = chunkText(pdf.parsedText);
    const context = chunks.slice(0, 5).join("\n");

    // generate questions
    const questionPrompt = `You are an expert teacher.
    
    Generate excatly 20 important multiple choise questions from the given content .

    Rules:
    - Each question must have 4 options (A, B, C, D)
    - Only ONE correct option
    - Return STRICT JSON only (no markdown, no explanation)
    


   
    JSON format: {
    mcq:[{
      "question": "",
      "options": {
      "A": "",
      "B": "",
      "C": "",
      "D": ""
      },
      "correctAnswer": "A"
    }]
    }

    CONTENT:${context}

    Difficulty level: medium.`;
  } catch (error) {}
};
