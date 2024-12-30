import Product from '@/models/ProductModel';


//ürünü silme
export async function DELETE(request, { params }) {
    const { id } =await params;
    try {
        // Verilen ID ile ürün silme
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'Product deleted successfully' }), { status: 200 });
    } catch (error) {
        console.error("Error during delete:", error);
        return new Response(JSON.stringify({ error: 'Failed to delete product' }), { status: 500 });
    }
}

export async function PUT(request, { params }) {
    const { id } =await params;
    const { stock } = await request.json();
    try {
        // Verilen ID ile ürün güncelleme
        const product = await Product.findByIdAndUpdate(id, { stock }, { new: true });

        if (!product) {
            return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(product), { status: 200 });
    } catch (error) {
        console.error("Error during update:", error);
        return new Response(JSON.stringify({ error: 'Failed to update product' }), { status: 500 });
    }
}
