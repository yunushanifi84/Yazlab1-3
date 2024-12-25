import db from '@/lib/mongodb';
import Order from '@/models/OrderModel';
import { Types } from 'mongoose';

export async function POST(request) {
    try {
        const { CustomerID, Products, TotalPrice } = await request.json();

        const order = new Order({ CustomerID: new Types.ObjectId(CustomerID), Products: Products, TotalPrice: TotalPrice });
        await order.save();
        return new Response(JSON.stringify({ success: 'Order created' }), { status: 200 });


    } catch (error) {
        console.error("Error during fetch:", error);
        return new Response(JSON.stringify({ error: 'Failed to create order' }), { status: 500 });
    }
}