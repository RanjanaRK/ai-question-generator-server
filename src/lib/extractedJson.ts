export const extractJson = (text: string) => {
  const match = text.match(/\[.*\]/s);
  if (!match) return null;
  return match[0];
};
