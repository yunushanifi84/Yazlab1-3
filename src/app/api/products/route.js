import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function GET(request) {

    try {
        const client = await clientPromise;
        const db = client.db('yazlab1-3');

        // `_id`'yi string'den ObjectId'ye çeviriyoruz
        const products = await db.collection('products').find({}).toArray();



        return new Response(JSON.stringify(products), { status: 200 });
    } catch (error) {
        console.error("Error during fetch:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch products' }), { status: 500 });
    }

}

export async function POST(request) {

    try {
        const client = await clientPromise;
        const db = client.db('yazlab1-3');

        const body = await request.json();
        const result = await db.collection('products').insertOne(body);

        return new Response(JSON.stringify({ message: 'product added', id: result.insertedId }), {
            status: 201,
        });
    } catch (error) {
        console.error("Error during add:", error);
        return new Response(JSON.stringify({ error: 'Failed to add product' }), { status: 500 });
    }
}