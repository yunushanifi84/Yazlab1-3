import Customer from "@/models/CustomerModel";

// müşteri bilgisini döner
export async function GET(request, { params }) {
    const { customerId } = params;

    try {
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return new Response(JSON.stringify({ error: 'Customer not found' }), { status: 404 });
        }
        return new Response(JSON.stringify(customer), { status: 200 });
    } catch (error) {
        console.error("Error fetching customer:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch customer' }), { status: 500 });
    }
}