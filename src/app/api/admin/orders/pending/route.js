import Order from "@/models/OrderModel";

export async function GET(req, res) {
    try {
        const pendingOrders = await Order.find({ OrderStatus: 'Pending' });
        return new Response(JSON.stringify(pendingOrders), { status: 200 });
    } catch (error) {
        console.error("Error fetching pending orders:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch pending orders' }), { status: 500 });
    }
}
