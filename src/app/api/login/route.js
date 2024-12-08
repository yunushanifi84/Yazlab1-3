import { generateToken } from '@/lib/jwt';
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        const client = await clientPromise;
        const db = client.db('yazlab1-3');
        const customer = await db.collection('customers').findOne({ email, password });

        if (!customer) {
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
        }

        const token = generateToken({ email: customer.email });
        return new Response(JSON.stringify({ token }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to login' }), { status: 500 });
    }
}