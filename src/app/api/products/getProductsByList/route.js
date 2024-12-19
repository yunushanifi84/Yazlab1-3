import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db('yazlab1-3');
        const body = await request.json();
        const { ids } = body;

        // `ids` listesindeki string'leri ObjectId'ye çeviriyoruz
        const objectIds = ids.map(id => new ObjectId(id));
        const products = await db.collection('products').find({ _id: { $in: objectIds } }).toArray();

        if (products.length === 0) {
            return new Response(JSON.stringify({ error: 'No products found' }), { status: 404 });
        }

        return new Response(JSON.stringify(products), { status: 200 });
    }
    catch (error) {
        console.error("Error during fetch:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch products' }), { status: 500 });
    }
}