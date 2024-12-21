import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function GET(request, { params }) {
    const { id } = params;

    try {
        const client = await clientPromise;
        const db = client.db('yazlab1-3');

        // `_id`'yi string'den ObjectId'ye çeviriyoruz
        const customer = await db.collection('customers').findOne({ _id: new ObjectId(id) });

        if (!customer) {
            return new Response(JSON.stringify({ error: 'Customer not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(customer), { status: 200 });
    } catch (error) {
        console.error("Error during fetch:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch customer' }), { status: 500 });
    }
}

export async function PUT(request, { params }) {
    const { id } = params;

    try {
        const client = await clientPromise;
        const db = client.db('yazlab1-3');
        const body = await request.json();

        // `_id`'yi string'den ObjectId'ye çeviriyoruz
        const result = await db.collection('customers').updateOne(
            { _id: new ObjectId(id) },
            { $set: { email: body.email, password: body.password } }
        );

        if (result.matchedCount === 0) {
            return new Response(JSON.stringify({ error: 'Customer not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'Customer updated' }), { status: 200 });
    } catch (error) {
        console.error("Error during update:", error);
        return new Response(JSON.stringify({ error: 'Failed to update customer' }), { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;

    try {
        const client = await clientPromise;
        const db = client.db('yazlab1-3');

        // `_id`'yi string'den ObjectId'ye çeviriyoruz
        const result = await db.collection('customers').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return new Response(JSON.stringify({ error: 'Customer not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'Customer deleted' }), { status: 200 });
    } catch (error) {
        console.error("Error during delete:", error);
        return new Response(JSON.stringify({ error: 'Failed to delete customer' }), { status: 500 });
    }
}
