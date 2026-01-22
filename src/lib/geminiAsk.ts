import { ai } from "./gemini";

export const geminiAsk = async (content: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: content,
  });
  console.log(response.text);
};
