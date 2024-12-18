import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function PUT(request, { params }) {
    const { id } = await params;
    //  console.log("id", id);
    try {
        const client = await clientPromise;
        const db = client.db('yazlab1-3');
        const body = await request.json();

        // `_id`'yi string'den ObjectId'ye çeviriyoruz
        const result = await db.collection('customers').updateOne(
            { _id: new ObjectId(id) },
            { $set: { email: body.email, password: body.password } } // Sadece ilgili alanları güncelle
        );

        console.log("Update result:", result);
        console.log("Update body:", body);

        if (result.matchedCount === 0) {
            return new Response(JSON.stringify({ error: 'Customer not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'Customer updated' }), { status: 200 });
    } catch (error) {
        console.error("Error during update:", error);
        return new Response(JSON.stringify({ error: 'Failed to update user' }), { status: 500 });
    }
}
