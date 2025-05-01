import { NextApiRequest, NextApiResponse } from "next";
import { neon } from "@neondatabase/serverless";
// import { v4 as uuidv4 } from "uuid";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { id } = req.query; 

    if (!id) {
      return res.status(400).json({ error: "Missing required fields: userId or messages" });
    }

    try {
      const sql = neon(process.env.DATABASE_URL || ""); // Initialize Neon database connection

      const result = await sql`SELECT messages FROM chathistory WHERE user_id = ${id} ORDER BY created_at DESC`;
    
      res.status(200).json({ chats: result });
    } catch (error) {
      console.error("Error storing chat history:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}