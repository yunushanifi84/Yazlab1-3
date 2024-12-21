import Customer from "@/models/CustomerModel";


// Tüm müşterileri getir
export async function GET(request) {


    try {
        // Tüm müşterileri getir
        const customers = await Customer.find({});
        return new Response(JSON.stringify(customers), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch customers' }), { status: 500 });
    }
}