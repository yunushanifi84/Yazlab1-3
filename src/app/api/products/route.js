import db from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(request) {
    try {
        const products = await Product.find({});
        return new Response(JSON.stringify(products), { status: 200 });
    } catch (error) {
        console.error("Error during fetch:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch products' }), { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const product = new Product({ name: body.name, price: body.price, description: body.description });
        await product.save();
        return new Response(JSON.stringify({ message: 'Product added', id: product._id }), { status: 201 });
    } catch (error) {
        console.error("Error during add:", error);
        return new Response(JSON.stringify({ error: 'Failed to add product' }), { status: 500 });
    }
}