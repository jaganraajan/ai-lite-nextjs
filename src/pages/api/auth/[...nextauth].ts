import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NeonAdapter from "@auth/neon-adapter";
import { Pool } from "@neondatabase/serverless";
import { compare } from "bcrypt";
 
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Create a `Pool` inside the request handler.
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const options: NextAuthOptions = {
    adapter: NeonAdapter(pool),
    providers: [
      CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};

        // Query the database to find the user
        const sql = await pool.connect();
        const user = await sql.query(
          `SELECT * FROM Users WHERE email = $1`,
          [email]
        );

        if (user.rows.length === 0) {
          throw new Error("No user found with this email");
        }

        const dbUser = user.rows[0];

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await compare(password || '', dbUser.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        // Return user object if authentication is successful
        return { id: dbUser.id, email: dbUser.email };
      },
    }),
  ]
  };

  return await NextAuth(req, res, options);
}