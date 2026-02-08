import { Request, Response } from "express";
import { askGemini } from "../lib/askGemini";
import { chunkText } from "../lib/chunkText";
import { extractJson } from "../lib/extractedJson";
import { prisma } from "../lib/prisma";
import { checkPlan } from "../service/checkPlan";
import { GeminiMcq, GeminiResponse } from "../utils/types/types";
export const generateMcq = async (req: Request, res: Response) => {
  try {
    const { pdfId } = req.body;
    const userId = req.session?.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        plan: true,
      },
    });

    const expiresAt =
      user?.plan === "FREE"
        ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        : null;

    const pdf = await prisma.pdfDocument.findUnique({
      where: { id: pdfId },
    });
    if (!pdf || !pdf.parsedText) {
      return res.status(400).json({ error: "Parsed text not found" });
    }

    const chunks = chunkText(pdf.parsedText);
    const context = chunks.slice(0, 5).join("\n");

    // generate questions
    const questionPrompt = `You are an expert teacher.Generate exactly 5 important multiple choice questions from the given content .

    Rules:
    - Return ONLY valid JSON
- Do NOT add explanation, markdown, or extra text
- Top-level key MUST be "mcqs"
- Each question must have exactly 4 options (A, B, C, D)
- Only ONE correct option
    
    JSON FORMAT:
{
  "mcqs": [
    {
      "question": "",
      "options": {
        "A": "",
        "B": "",
        "C": "",
        "D": ""
      },
      "correctAnswer": "A"
    }
  ]
}
CONTENT:
${context}

Difficulty: Medium`;

    const raw = await askGemini(questionPrompt);

    const jsonText = extractJson(raw);

    if (!jsonText) {
      console.error("Gemini raw output:", raw);
      return res.status(500).json({ error: "AI did not return valid JSON" });
    }

    let parsed: GeminiResponse;

    try {
      parsed = JSON.parse(jsonText);
    } catch (err) {
      console.error("JSON parse error:", jsonText);
      return res.status(500).json({ error: "Invalid JSON from AI" });
    }

    //  Normalize MCQs
    const mcqs = Array.isArray(parsed)
      ? parsed
      : parsed.mcqs || parsed.data?.mcqs || parsed.questions;

    if (!Array.isArray(mcqs)) {
      console.error("❌ Invalid AI structure:", parsed);
      return res.status(500).json({ error: "Invalid MCQ structure from AI" });
    }

    // Validate MCQs
    const validMcqs: GeminiMcq[] = mcqs.filter(
      (m) =>
        m.question &&
        m.options?.A &&
        m.options?.B &&
        m.options?.C &&
        m.options?.D &&
        ["A", "B", "C", "D"].includes(m.correctAnswer),
    );

    if (validMcqs.length === 0) {
      return res.status(500).json({ error: "No valid MCQs generated" });
    }

    const finalMcqs = validMcqs.slice(0, 5);

    //  Save to DB
    const mcqSet = await prisma.mcqSet.create({
      data: {
        pdfId: pdfId,
        expiresAt: expiresAt,
      },
    });

    const mcqItems = await prisma.mcqItem.createMany({
      data: finalMcqs.map((m) => ({
        mcqSetId: mcqSet.id,
        question: m.question,
        optionA: m.options.A,
        optionB: m.options.B,
        optionC: m.options.C,
        optionD: m.options.D,
        correctOption: m.correctAnswer,
      })),
    });

    console.log("RAW GEMINI RESPONSE:", raw);
    console.log("EXTRACTED JSON:", jsonText);
    console.log("PARSED OBJECT:", parsed);

    // 7️⃣ response
    res.json({
      success: true,
      mcqSetId: mcqSet.id,
      total: finalMcqs.length,
      mcqs: finalMcqs,
      mcqItems,
      mcqSet,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate MCQs" });
  }
};

export const generateQA = async (req: Request, res: Response) => {
  try {
    const userId = req.session?.userId;
    console.log(userId, "userId");

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      await checkPlan(userId);
    } catch (error: any) {
      return res.status(403).json({ message: error.message });
    }

    const { pdfId } = req.body;

    const pdf = await prisma.pdfDocument.findUnique({ where: { id: pdfId } });

    if (!pdf || !pdf.parsedText) {
      return res.status(400).json({ error: "Parsed text not found" });
    }

    const chunks = chunkText(pdf.parsedText);

    const context = chunks.slice(0, 5).join("\n");

    // generate questions
    const questionPrompt = `You are an expert teacher.

Generate exactly 5 important question and answer pairs from the given content.

Rules:
- Return ONLY valid JSON
- Do NOT add explanation, markdown, or extra text
- Top-level key MUST be "qa"
- Each item must contain:
  - "question"
  - "answer"
- Answers should be clear, correct, and based only on the given content

JSON FORMAT:
{
  "qa": [
    {
      "question": "",
      "answer": ""
    }
  ]
}

CONTENT:
${context}

Difficulty: Medium
`;

    // ask gemini
    const raw = await askGemini(questionPrompt);

    const jsonText = extractJson(raw);

    if (!jsonText) {
      console.error("Gemini raw output:", raw);
      return res.status(500).json({ error: "AI did not return valid JSON" });
    }
    let parsed: { qa?: [{ question: string; answer: string }] };

    try {
      parsed = JSON.parse(jsonText);
    } catch (err) {
      console.error("JSON parse error:", jsonText);
      return res.status(500).json({ error: "Invalid JSON from AI" });
    }

    const qa = Array.isArray(parsed) ? parsed : parsed.qa;

    if (!Array.isArray(qa)) {
      console.error(" Invalid QA structure:", parsed);
      return res.status(500).json({ error: "Invalid QA structure from AI" });
    }

    const finalQa = qa.filter((q) => q.question && q.answer).slice(0, 5);

    //  Save to DB

    const qaSet = await prisma.qaSet.create({
      data: {
        pdfId,
        items: {
          create: finalQa.map((qa) => ({
            question: qa.question,
            answer: qa.answer,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    console.log("RAW GEMINI RESPONSE:", raw);
    console.log("EXTRACTED JSON:", jsonText);
    console.log("PARSED OBJECT:", parsed);

    res.json({
      success: true,
      total: finalQa.length,
      qa: finalQa,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate Q&A" });
  }
};
