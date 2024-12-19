import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function GET(request, { params }) {
    const { id } = await params;
    try {
        const client = await clientPromise;
        const db = client.db('yazlab1-3');

        // `_id`'yi string'den ObjectId'ye çeviriyoruz
        const product = await db.collection('products').findOne({ _id: new ObjectId(id) });

        if (!product) {
            return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(product), { status: 200 });
    }
    catch (error) {
        console.error("Error during fetch:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch product' }), { status: 500 });
    }

}