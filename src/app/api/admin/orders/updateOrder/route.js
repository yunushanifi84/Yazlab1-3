import db from '@/lib/mongodb';
import Order from '@/models/OrderModel';
import CustomerLog from '@/models/CustomerLogModel';
import Product from '@/models/ProductModel';
import { Types } from 'mongoose';

export async function PUT(request,) {
    const { orderId, OrderStatus } = await request.json();

    try {
        console.log(orderId, OrderStatus);

        const order = await Order
            .findById(new Types.ObjectId(orderId))
            .populate('CustomerID');

        if (!order) {
            return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404 });
        }

        if (OrderStatus === 'Sipariş Onaylandı') {
            await order.updateProductStocks();
        }

        order.OrderStatus = OrderStatus;
        order.OrderLog = 'Sipariş tamamlandı';
        await order.save();
        console.log(order);

        return new Response(JSON.stringify(order), { status: 200 });
    }
    catch (error) {
        const order = await Order
            .findById(new Types.ObjectId(orderId))
            .populate('CustomerID');
        order.OrderStatus = "Sipariş İptal Edildi";
        order.OrderLog = error.message;
        await order.save();
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}