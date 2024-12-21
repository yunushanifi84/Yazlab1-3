import Order from "@/models/OrderModel";


//tüm siparişleri getirir
export async function GET(req, res) {
    const orders = await Order.find({});
    console.log(orders);
    return new Response(JSON.stringify(orders), { status: 200 });
}