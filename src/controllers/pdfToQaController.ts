// import fs from "fs";
// import * as pdf from "pdf-parse";
// import { Request, Response } from "express";

// export const pdfToQaController = async (req: Request, res: Response) => {
//   try {
//     if (!req.file?.path) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const buffer = fs.readFileSync(req.file.path);

//     const data = await pdf(buffer);
//     const text = data.text;

//     return res.json({
//       success: true,
//       textPreview: text.slice(0, 500),
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "PDF parsing failed" });
//   }
// };

import fs from "fs";
import { Request, Response } from "express";

const pdfParse = require("pdf-parse").default;

export const pdfToQaController = async (req: Request, res: Response) => {
  if (!req.file?.path) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const buffer = fs.readFileSync(req.file.path);

  const data = await pdfParse(buffer);
  const text = data.text;

  res.json({
    success: true,
    preview: text.slice(0, 500),
  });
};
