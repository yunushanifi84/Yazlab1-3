import Customer from "@/models/CustomerModel";
import db from "@/lib/mongodb";
import Log from "@/models/LogModel";


// Tüm müşterileri getir
export async function GET(request) {


    try {
        // Tüm müşterileri getir
        const customers = await Customer.find({});
        return new Response(JSON.stringify(customers), { status: 200 });
    } catch (error) {
        console.error('Error fetching customers:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch customers' }), { status: 500 });
    }
}

// Yeni müşteri oluştur
export async function POST(request) {

    try {
        const body = await request.json();
        const { CustomerName, Budget, CustomerType, Email, Password } = body;
        // Yeni müşteri oluşturma
        const newCustomer = await Customer.create({
            CustomerName: CustomerName,
            Budget: Budget,
            CustomerType: CustomerType,
            Email: Email,
            Password: Password
        });
        await Log.create({
            LogType: 'Info',
            LogDetails: `New customer created: {Name:${newCustomer.CustomerName}, Id:${newCustomer._id}}`,
        });

        return new Response(JSON.stringify({ message: 'Customer added', id: newCustomer._id }), {
            status: 201,
        });
    } catch (error) {
        console.error('Error creating new customer:', error);
        await Log.create({
            LogType: 'Error',
            LogDetails: `Error creating new customer: ${error.message}`,
        });
        return new Response(JSON.stringify({ error: 'Failed to add customer' }), { status: 500 });
    }
}
