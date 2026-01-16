// import { PDFParse } from "pdf-parse";
// import fs from "fs";
// import path from "path";

// export const pdfParsing = async (filPath: string) => {
//   const buffer = fs.readFileSync(filPath);
//   const uint8Array = new Uint8Array(buffer);
//   const data = new PDFParse(uint8Array);
//   const result = data.getText();
//   return result;
// };

import fs from "fs";
import { PDFParse } from "pdf-parse";
import path from "path";

export const pdfParsing = async (filePath: string) => {
  const buffer = fs.readFileSync(filePath);
  const uint8Array = new Uint8Array(buffer);
  const data = new PDFParse(uint8Array);
  const result = data.getText({
    standardFontDataUrl:
      "D:/PDFScribe/nodejs/node_modules/pdfjs-dist/standard_fonts",
  } as any);

  return result;
};
