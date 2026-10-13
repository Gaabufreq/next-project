
import "server-only";
import supabase from "@/lib/supabase";
import { randomUUID } from "crypto";

const uploadOnSupabase = async (
  file: Blob | null,
  userId: string,
): Promise<string | null> => {
  if (!file) return null;

  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image must be smaller than 5 MB");
  }

  const extension = file.type.split("/")[1]?.replace("jpeg", "jpg");

  if (!extension || !/^[a-zA-Z0-9]+$/.test(extension)) {
    throw new Error("Unsupported image format");
  }

  const filePath = `${userId}/${randomUUID()}.${extension}`;
  const arrayBuffer = await file.arrayBuffer();

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(filePath, arrayBuffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    console.error("SUPABASE UPLOAD ERROR:", error);
    throw error;
  }

  const { data: publicData } = supabase.storage
    .from("avatars")
    .getPublicUrl(data.path);

  return publicData.publicUrl;
};

export default uploadOnSupabase;
