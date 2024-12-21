import Customer from '@/models/CustomerModel';
import { generateToken, verifyToken } from '@/lib/jwt';

export async function GET(request) {


    try {
        // Tüm müşterileri getir
        const customers = await Customer.find({});
        return new Response(JSON.stringify(customers), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch customers' }), { status: 500 });
    }
}

export async function POST(request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        const body = await request.json();

        // Yeni müşteri oluşturma
        const newCustomer = new Customer(body);
        await newCustomer.save();

        return new Response(JSON.stringify({ message: 'Customer added', id: newCustomer._id }), {
            status: 201,
        });
    } catch (error) {
        console.error("Error during customer creation:", error);
        return new Response(JSON.stringify({ error: 'Failed to add customer' }), { status: 500 });
    }
}
