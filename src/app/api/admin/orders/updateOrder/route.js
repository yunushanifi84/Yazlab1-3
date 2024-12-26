import db from '@/lib/mongodb';
import Order from '@/models/OrderModel';
import CustomerLog from '@/models/CustomerLogModel';
import { Types } from 'mongoose';

export async function PUT(request,) {
    try {
        const { orderId, OrderStatus } = await request.json();
        console.log(orderId, OrderStatus);
        const order = await Order
            .findByIdAndUpdate(new Types.ObjectId(orderId), { OrderStatus: OrderStatus })
            .populate('CustomerID');
        order.save();
        console.log(order)
        if (!order) {
            return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404 });
        }
        return new Response(JSON.stringify(order), { status: 200 });
    }
    catch (error) {
        console.log("Error during fetch:", error);
    }
}

