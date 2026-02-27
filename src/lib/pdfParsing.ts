import { PDFParse } from "pdf-parse";

export const pdfParsing = async (fileBuffer: Buffer) => {
  const uint8Array = new Uint8Array(fileBuffer);

  const data = new PDFParse(uint8Array);

  const result = await data.getText();

  return result;
};
