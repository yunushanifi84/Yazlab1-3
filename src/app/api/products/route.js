import db from '@/lib/mongodb';
import Product from '@/models/ProductModel';

export async function GET(request) {
    try {
        const products = await Product.find({});
        return new Response(JSON.stringify(products), { status: 200 });
    } catch (error) {
        console.error("Error during fetch:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch products' }), { status: 500 });
    }
}


//for add product
export async function POST(request) {
    try {
        const body = await request.json();
        const { productName, description, stock, price } = body;
        const product = new Product({ productName: productName, description: description, stock: stock, price: price });
        await product.save();
        return new Response(JSON.stringify({ message: 'Product added', id: product._id }), { status: 201 });
    } catch (error) {
        console.error("Error during add:", error);
        return new Response(JSON.stringify({ error: 'Failed to add product' }), { status: 500 });
    }
}