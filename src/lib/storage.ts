import { supabase } from "./supabase";

export const uploadPdfStorage = async (
  pdfs: string,
  fileBuffer: Buffer,
  storagePath: string,
  contentType: string,
) => {
  const { data, error } = await supabase.storage
    .from(pdfs)
    .upload(storagePath, fileBuffer, {
      contentType,
      upsert: false,
    });

  if (error) {
    console.error("SUPABASE ERROR:", error);
    throw error;
  }

  return data;
};
