import { supabase } from "./supabase";
import fs from "fs";

export const uploadPdfStorage = async (
  pdfs: string,
  localFilePath: string,
  storagePath: string,
  contentType: string,
) => {
  const fileBuffer = fs.readFileSync(localFilePath);

  try {
    const { data, error } = await supabase.storage
      .from(pdfs)
      .upload(storagePath, fileBuffer, {
        contentType,
        upsert: false,
      });
    if (error) throw new Error(error.message);

    return data;
  } catch (error) {}
};
