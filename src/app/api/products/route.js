import Product from '@/models/ProductModel';
import db from '@/lib/mongodb';

export async function GET(request) {
    try {
        const products = await Product.find({});
        return new Response(JSON.stringify(products), { status: 200 });
    } catch (error) {
        console.error("Error during fetch:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch products' }), { status: 500 });
    }
}


