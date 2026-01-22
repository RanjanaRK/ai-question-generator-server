import { ai } from "./gemini";

export const askGemini = async (content: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: content,
  });
  console.log(response.text);

  return response.text ?? "";
};
