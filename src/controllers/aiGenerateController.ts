import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { chunkText } from "../lib/chunkText";
import { askGemini } from "../lib/askGemini";

type GeminiMcq = {
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: "A" | "B" | "C" | "D";
};

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

    const raw = await askGemini(questionPrompt);

    let parsed: { mcqs: GeminiMcq[] };

    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      console.error("Gemini raw output:", raw);
      return res.status(500).json({ error: "Invalid MCQ format from AI" });
    }

    const mcqs = parsed.mcqs.slice(0, 20);

    const mcqSet = await prisma.mcqSet.create({
      data: {
        pdfId,
      },
    });

    const mcqItems = await prisma.mcqItem.createMany({
      data: mcqs.map((m) => ({
        mcqSetId: mcqSet.id,
        question: m.question,
        optionA: m.options.A,
        optionB: m.options.B,
        optionC: m.options.C,
        optionD: m.options.D,
        correctOption: m.correctAnswer,
      })),
    });
    // 7️⃣ response
    res.json({
      success: true,
      mcqSetId: mcqSet.id,
      total: mcqs.length,
      mcqs,
      mcqItems,
      mcqSet,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate MCQs" });
  }
};
