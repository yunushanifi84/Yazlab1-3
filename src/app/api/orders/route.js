import db from '@/lib/mongodb';
import Order from '@/models/OrderModel';

export async function POST(request) {
    try {
        const { CustomerID, Products, TotalPrice } = await request.json();
        console.log("CustomerID", CustomerID);
        console.log("Products", Products);
        const order = new Order({ CustomerID: CustomerID, Products: Products, TotalPrice: TotalPrice });
        await order.save();
        return new Response(JSON.stringify({ success: 'Order created' }), { status: 200 });


    } catch (error) {
        console.error("Error during fetch:", error);
        return new Response(JSON.stringify({ error: 'Failed to create order' }), { status: 500 });
    }
}