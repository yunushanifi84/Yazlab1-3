import db from '@/lib/mongodb';
import Customer from '@/models/CustomerModel';
import { generateToken } from '@/middlewares/auth';

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        // CustomerModel'i kullanarak müşteri bulma
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = generateToken({ email: process.env.ADMIN_EMAIL });
            return new Response(JSON.stringify({ token }), { status: 200 });
        }

        const customer = await Customer.findOne({ Email: email, Password: password });

        if (!customer) {
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
        }
        const CustomerID = customer._id;
        const token = generateToken({ email: customer.email });
        return new Response(JSON.stringify({ token, CustomerID ,CustomerType:customer.CustomerType}), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to login' }), { status: 500 });
    }
}