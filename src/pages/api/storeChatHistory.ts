import { NextApiRequest, NextApiResponse } from "next";
import { neon } from "@neondatabase/serverless";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { userId, messages } = req.body;

    if (!userId || !messages) {
      return res.status(400).json({ error: "Missing required fields: userId or messages" });
    }

    try {
      const sql = neon(process.env.DATABASE_URL || ""); // Initialize Neon database connection

      const id = uuidv4(); // Generate a unique ID for the chat history

      await sql`
        INSERT INTO ChatHistory (id, user_id, messages, created_at)
        VALUES (${id}, ${userId}, ${JSON.stringify(messages)}, NOW())
      `;

      res.status(200).json({ message: "Chat history stored successfully!" });
    } catch (error) {
      console.error("Error storing chat history:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}