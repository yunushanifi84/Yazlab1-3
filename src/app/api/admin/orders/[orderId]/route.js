import Order from "@/models/OrderModel";

// sipariş durumunu günceller
export async function PUT(req, { params }) {
    try {
        const { orderId } = params;
        const { status } = await req.json();

        // Siparişi güncelle
        const updatedOrder = await Order.findOneAndUpdate(
            { OrderID: orderId },
            { OrderStatus: status },
            { new: true }
        );

        if (!updatedOrder) {
            return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(updatedOrder), { status: 200 });
    } catch (error) {
        console.error("Error updating order status:", error);
        return new Response(JSON.stringify({ error: 'Failed to update order status' }), { status: 500 });
    }
}