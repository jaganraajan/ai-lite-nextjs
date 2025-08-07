import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NeonAdapter from "@auth/neon-adapter";
import { Pool } from "@neondatabase/serverless";
import { compare } from "bcrypt";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const authOptions: NextAuthOptions = {
  adapter: NeonAdapter(pool),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};
        const client = await pool.connect();
        try {
          const result = await client.query(
            `SELECT * FROM Users WHERE email = $1`,
            [email]
          );
          if (result.rows.length === 0) {
            throw new Error("No user found with this email");
          }
          const dbUser = result.rows[0];
          const isPasswordValid = await compare(password ?? "", dbUser.password);
          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }
          return { id: dbUser.id, email: dbUser.email };
        } finally {
          client.release();
        }
      },
    }),
  ],
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions);
}