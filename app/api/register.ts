import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/app/db";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { user_name, email, password, role } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await query(
        "INSERT INTO users (user_name, email, password, role) VALUES (?, ?, ?, ?)",
        [user_name, email, hashedPassword, role]
      );

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
