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
        console.log('New customer created:', newCustomer);

        return new Response(JSON.stringify({ message: 'Customer added', id: newCustomer._id }), {
            status: 201,
        });
    } catch (error) {
        console.error('Error creating new customer:', error);
        return new Response(JSON.stringify({ error: 'Failed to add customer' }), { status: 500 });
    }
}
