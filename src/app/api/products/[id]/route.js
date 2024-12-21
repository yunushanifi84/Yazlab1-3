import Product from '@/models/ProductModel';

export async function GET(request, { params }) {
    const { id } = params;
    try {
        // Verilen ID ile ürün sorgulama
        const product = await Product.findById(id);

        if (!product) {
            return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(product), { status: 200 });
    } catch (error) {
        console.error("Error during fetch:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch product' }), { status: 500 });
    }
}

