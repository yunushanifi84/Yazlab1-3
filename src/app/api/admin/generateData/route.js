import db from '@/lib/mongodb';
import Customer from '@/models/CustomerModel';


export async function GET(req) {
    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const initializeCustomers = async () => {

        const customerCount = getRandomInt(5, 10);
        const customers = [];

        for (let i = 0; i < customerCount; i++) {
            const isPremium = i < 2 || Math.random() < 0.5; // Ensure at least 2 premium customers
            const customer = new Customer({
                CustomerName: `Customer${i + 1}`,
                Budget: getRandomInt(500, 3000),
                CustomerType: isPremium ? 'Premium' : 'Standard',
                TotalSpent: 0,
                Email: `customer${i + 1}@example.com`,
                Password: '123' // In a real application, ensure to hash passwords
            });
            customers.push(customer);
        }

        try {
            await Customer.insertMany(customers);
        } catch (err) {
            console.error(err.message);
        }
    };
    initializeCustomers();
};

