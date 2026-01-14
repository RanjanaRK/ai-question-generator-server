// // import { Request, Response } from "express";
// // import fs from "fs";
// // import pdf from "pdf-parse";

// // export const uploadPdf = async (req: Request, res: Response) => {
// //   try {
// //     if (!req.file) {
// //       return res.status(400).json({ message: "No file uploaded" });
// //     }

// //     // 1. Read PDF (non-blocking)
// //     const dataBuffer = await fs.readFile(req.file.path, "utf8", cb);

// //     console.log("this is data buffer", dataBuffer);

// //     // 2. Parse PDF
// //     const data = await pdf(dataBuffer);
// //     console.log("this is data ", data);

// //     // 3. Delete temp file (IMPORTANT)
// //     await fs.unlink(req.file.path, cb);

// //     res.json({
// //       message: "PDF uploaded successfully",
// //       text: data.text.substring(0, 500),
// //     });
// //   } catch (err: any) {
// //     res.status(500).json({ error: err.message });
// //   }
// // };
// // import { Request, Response } from "express";
// // import fs from "fs/promises";
// // import pdfParse, { PDFParse } from "pdf-parse";

// // export const uploadPdf = async (req: Request, res: Response) => {
// //   try {
// //     if (!req.file) {
// //       return res.status(400).json({ message: "No file uploaded" });
// //     }
// //     console.log("file path", req.file.path);

// //     const buffer = await fs.readFile(req.file.path);
// //     console.log("buffer", buffer);

// //     const parser = new PDFParse(buffer);

// //     const result = await parser.getText();

// //     // const data = await pdfParse(buffer);

// //     const abc = await fs.unlink(req.file.path);

// //     console.log("dataaaaa", result);
// //     console.log("parser", parser);
// //     console.log("unlink msg", abc);

// //     res.json({
// //       message: "PDF uploaded successfully",
// //       text: result.text.length,
// //     });
// //   } catch (err: any) {
// //     console.error(err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// import { Request, Response } from "express";
// import fs from "fs/promises";
// const pdfParse = require("pdf-parse");

// export const uploadPdf = async (req: Request, res: Response) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const buffer = await fs.readFile(req.file.path);

//     const data = await pdfParse(new Uint8Array(buffer));

//     await fs.unlink(req.file.path);

//     res.json({
//       message: "PDF uploaded successfully",
//       textPreview: data.text.slice(0, 500),
//       pages: data.numpages,
//     });
//   } catch (err: any) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };

// model User{
//    id String @default(uuid()) @id
//    name String
//    email  String @unique
//    password String
//    createdAt DateTime @default(now())
//    pdfDocs PdfDocument[]
// }

// model PdfDocument{
//   id String @default(uuid()) @id
//   originalName String
//   storagePath  String
//   createdAt DateTime @default(now())
//   userId String
//   user User @relation(fields: [userId], references: [id])
//   chunks PdfChunk[]
// }

// model PdfChunk {
//   id       String @default(uuid()) @id
//   content  String
//   createdAt DateTime @default(now())
//   pdfId     String
//   pdf       PdfDocument @relation(fields: [pdfId],references: [id])

// }
