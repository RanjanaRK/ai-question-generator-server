// import { Request, Response } from "express";
// import fs from "fs";
// import pdf from "pdf-parse";

// export const uploadPdf = async (req: Request, res: Response) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // 1. Read PDF (non-blocking)
//     const dataBuffer = await fs.readFile(req.file.path, "utf8", cb);

//     console.log("this is data buffer", dataBuffer);

//     // 2. Parse PDF
//     const data = await pdf(dataBuffer);
//     console.log("this is data ", data);

//     // 3. Delete temp file (IMPORTANT)
//     await fs.unlink(req.file.path, cb);

//     res.json({
//       message: "PDF uploaded successfully",
//       text: data.text.substring(0, 500),
//     });
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };
import { Request, Response } from "express";
import fs from "fs/promises";
import { PDFParse } from "pdf-parse";

export const uploadPdf = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    console.log("file path", req.file.path);

    const buffer = await fs.readFile(req.file.path);
    console.log("buffer", buffer);

    const data = new PDFParse(buffer);

    const abc = await fs.unlink(req.file.path);

    console.log("dataaaaa", data);
    console.log("unlink msg", abc);

    res.json({
      message: "PDF uploaded successfully",
      text: data,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
