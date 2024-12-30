import db from '@/lib/mongodb';
import Order from '@/models/OrderModel';
import CustomerLog from '@/models/CustomerLogModel';
import Product from '@/models/ProductModel';
import { Types } from 'mongoose';

export async function PUT(request,) {
    const { orderId, OrderStatus } = await request.json();

    try {

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
        
        const customerLog = new CustomerLog({
            LogType: 'Info',
            CustomerID: order.CustomerID._id,
            CustomerType: order.CustomerID.CustomerType,
            OrderDetails: order.Products.map(item => `(${item.ProductID} x ${item.Quantity})`).join(', '),
            OrderTime: order.OrderDate,
            LogDetails: 'Satın alma başarılı'
        });
        await customerLog.save();

        return new Response(JSON.stringify(order), { status: 200 });
    }
    catch (error) {
        const order = await Order
            .findById(new Types.ObjectId(orderId))
            .populate('CustomerID');
        order.OrderStatus = "Sipariş İptal Edildi";
        order.OrderLog = error.message;
        await order.save();

        const customerLog = new CustomerLog({
            LogType: 'Error',
            CustomerID: order.CustomerID._id,
            CustomerType: order.CustomerID.CustomerType,
            OrderDetails: order.Products.map(item => `${item.ProductID} x ${item.Quantity}`).join(', '),
            OrderTime: order.OrderDate,
            LogDetails: error.message
        });
        await customerLog.save();
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}