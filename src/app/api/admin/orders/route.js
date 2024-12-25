import Order from "@/models/OrderModel";
import Customer from "@/models/CustomerModel";
import db from "@/lib/mongodb";


//tüm siparişleri getirir
export async function GET(req, res) {
    const orders = await Order.find({}).populate('CustomerID');
    return new Response(JSON.stringify(orders), { status: 200 });
}