export type GeminiMcq = {
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: "A" | "B" | "C" | "D";
};

export type GeminiResponse = {
  mcqs?: GeminiMcq[];
  questions?: GeminiMcq[];
  data?: {
    mcqs?: GeminiMcq[];
  };
};
