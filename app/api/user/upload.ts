import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false, // Important for file uploads
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const form = formidable({
    uploadDir: path.join(process.cwd(), "public/upload"),
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: "File upload error" });

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });
    const newPath = path.join(process.cwd(), "public/upload", file.newFilename);

    fs.renameSync(file.filepath, newPath);

    res.status(200).json({ url: `/upload/${file.newFilename}` }); // Send URL to frontend
  });
}
