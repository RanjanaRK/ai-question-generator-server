export const chunkText = (text: string, maxLength = 800): string[] => {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const chunks: string[] = [];
  let current = "";

  for (const s of sentences) {
    if ((current + s).length > maxLength) {
      chunks.push(current.trim());
      current = s;
    } else {
      current += " " + s;
    }
  }

  if (current) chunks.push(current.trim());
  return chunks;
};
