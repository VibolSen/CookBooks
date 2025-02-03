import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/app/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const users = await query(
        "SELECT user_name, email, about_me, profile FROM user WHERE id = ?",
        [id]
      ) as { user_name: string; email: string; about_me: string; profile: string }[];
      const user = users[0];
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
