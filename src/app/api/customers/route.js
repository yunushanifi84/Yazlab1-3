import clientPromise from '@/lib/mongodb';

export async function GET(request) {
    try {
        const client = await clientPromise;
        const db = client.db('yazlab1-3'); // Veritabanı adı
        const customers = await db.collection('customers').find({}).toArray();
        return new Response(JSON.stringify(customers), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch customers' }), { status: 500 });
    }
}

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db('yazlab1-3'); // Veritabanı adı

        const body = await request.json();
        const result = await db.collection('customers').insertOne(body);

        return new Response(JSON.stringify({ message: 'customer added', id: result.insertedId }), {
            status: 201,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to add user' }), { status: 500 });
    }
}
