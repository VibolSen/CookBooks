"use server";

import cloudinary from "./cloudinary";

export const uploadToCloudinary = async (
  formData: FormData,
  folder: string
): Promise<string> => {
  const file = formData.get("file") as File;
  if (!file) return "";
  
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url || "");
        }
      }
    ).end(buffer);
  });
};
