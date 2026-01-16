import { PDFParse } from "pdf-parse";
import fs from "fs";

export const pdfParsing = async (filPath: string) => {
  const buffer = fs.readFileSync(filPath);
  const uint8Array = new Uint8Array(buffer);
  const data = new PDFParse(uint8Array);
  const result = data.getText();
  return result;
};
