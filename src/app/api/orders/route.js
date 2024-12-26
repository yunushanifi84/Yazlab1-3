import db from '@/lib/mongodb';
import Order from '@/models/OrderModel';
import CustomerLog from '@/models/CustomerLogModel';
import { Types } from 'mongoose';

export async function POST(request) {
    
    try {
        const { CustomerID, Products, TotalPrice, CustomerType } = await request.json();
        for (const product of Products) {
            if (!product.ProductID || !product.Quantity) {
                return new Response(JSON.stringify({ error: 'ProductID and Quantity are required' }), { status: 400 });
            }

            if (product.Quantity > 5) {
                const customerLog = new CustomerLog({
                    LogType: 'Error',
                    CustomerID: new Types.ObjectId(CustomerID),
                    CustomerType: CustomerType,
                    OrderDetails: `${Products.length} products ordered with total price ${TotalPrice}`,
                    OrderTime: new Date(),
                    LogDetails: 'Order failed due to product quantity limit'
                });
                await customerLog.save();
                return new Response(JSON.stringify({ error: 'Satın Alınan ürün adeti 5 den fazla olamaz' }), { status: 400 });
                
            }
        }

        const order = new Order({ CustomerID: new Types.ObjectId(CustomerID), Products: Products, TotalPrice: TotalPrice });
        await order.save();
        const customerLog = new CustomerLog({
            LogType: 'Info',
            CustomerID: new Types.ObjectId(CustomerID),
            CustomerType: CustomerType,
            OrderDetails: `${Products.length} products ordered with total price ${TotalPrice}`,
            OrderTime: order.OrderDate,
            LogDetails: 'Order created'
        });
        await customerLog.save();
        return new Response(JSON.stringify({ success: 'Order created' }), { status: 200 });

    } catch (error) {
        console.error("Error during fetch:", error);
        return new Response(JSON.stringify({ error: 'Failed to create order' }), { status: 500 });
    }
}