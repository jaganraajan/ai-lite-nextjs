import { NextApiRequest, NextApiResponse } from 'next';
import { neon } from '@neondatabase/serverless';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        console.log(email, password);

        try {
            const sql = neon(process.env.DATABASE_URL || '');
            // Check if user exists
            const existingUser = await sql`
                SELECT * FROM Users WHERE email = ${email}
            `;

            if (existingUser.length > 0) {
                // User exists, return user data
                res?.status(200).json({ message: 'User already exists', user: existingUser[0] });
            }
        } catch (error) {
            console.error(error);
            res?.status(500).json({ error: 'Internal server error.' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}