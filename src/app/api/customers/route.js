import clientPromise from '@/lib/mongodb';
import { generateToken, verifyToken } from '@/lib/jwt';

export async function GET(request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    const decoded = verifyToken(token);

    // if (!decoded) {
    //     return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    // }

    try {
        const client = await clientPromise;
        const db = client.db('yazlab1-3');
        const customers = await db.collection('customers').find({}).toArray();
        return new Response(JSON.stringify(customers), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch customers' }), { status: 500 });
    }
}

export async function POST(request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    const decoded = verifyToken(token);

    // if (!decoded) {
    //     return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    // }

    try {
        const client = await clientPromise;
        const db = client.db('yazlab1-3');

        const body = await request.json();
        const result = await db.collection('customers').insertOne(body);
        //console.log("result", result);
        return new Response(JSON.stringify({ message: 'customer added', id: result.insertedId }), {
            status: 201,
        });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: 'Failed to add user' }), { status: 500 });
    }
}


