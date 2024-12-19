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

export async function DELETE(request, { params }) {
    const { id } = await params;
    try {
        const client = await clientPromise;
        const db = client.db('yazlab1-3');

        const product = await db.collection('products').deleteOne({ _id: new ObjectId(id) });

        if (product.deletedCount === 0) {
            return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'Product deleted' }), { status: 200 });
    }
    catch (error) {
        console.error("Error during delete:", error);
        return new Response(JSON.stringify({ error: 'Failed to delete product' }), { status: 500 });
    }
}

export async function PUT(request, { params }) {
    const { id } = await params;
    const { name, price } = await request.json();
    try {
        const client = await clientPromise;
        const db = client.db('yazlab1-3');

        const product = await db.collection('products').updateOne({ _id: new ObjectId(id) }, { $set: { name, price } });

        if (product.matchedCount === 0) {
            return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'Product updated' }), { status: 200 });
    }
    catch (error) {
        console.error("Error during update:", error);
        return new Response(JSON.stringify({ error: 'Failed to update product' }), { status: 500 });
    }
}