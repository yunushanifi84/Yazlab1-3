import Order from "@/models/OrderModel";


//tüm siparişleri getirir
export async function GET(req, res) {
    const orders = await Order.find({});
    return new Response(JSON.stringify(orders), { status: 200 });
}