import { Request, Response } from "express";
import { askGemini } from "../lib/askGemini";
import { chunkText } from "../lib/chunkText";
import { prisma } from "../lib/prisma";
import { extractJson } from "../lib/extractedJson";

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

    console.log(pdf.parsedText, ":parseeeeedddd text");

    const chunks = chunkText(pdf.parsedText);
    const context = chunks.slice(0, 5).join("\n");

    // generate questions
    const questionPrompt = `You are an expert teacher.Generate exactly 20 important multiple choice questions from the given content .

    Rules:
    - Each question must have 4 options (A, B, C, D)
    - Only ONE correct option
    - Return STRICT JSON only (no markdown, no explanation)
    
    JSON format: {
    mcqs:[{
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

    const jsonText = extractJson(raw);

    if (!jsonText) {
      console.error("No JSON found in AI output:", raw);
      return res.status(500).json({ error: "Invalid MCQ format from AI" });
    }

    let parsed: { mcqs: GeminiMcq[] };

    try {
      parsed = JSON.parse(jsonText);
    } catch (err) {
      console.error("Gemini raw output:", raw);
      return res.status(500).json({ error: "Invalid MCQ format from AI" });
    }

    if (!parsed.mcqs || !Array.isArray(parsed.mcqs)) {
      console.error("Parsed structure invalid:", parsed);
      return res.status(500).json({ error: "Invalid MCQ structure from AI" });
    }

    const mcqs = parsed.mcqs.slice(0, 20);

    const mcqSet = await prisma.mcqSet.create({
      data: {
        pdfId: pdfId,
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
