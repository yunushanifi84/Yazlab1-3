import Product from '@/models/ProductModel';

export async function POST(request) {
    try {
        const body = await request.json();
        const { ids } = body;
        console.log("IDSSSSSSSSSS ", ids);
        // ObjectId'ye dönüştürmeden `ids` listesini doğrudan kullanıyoruz
        const products = await Product.find({ _id: { $in: ids } }).exec();

        if (products.length === 0) {
            return new Response(JSON.stringify({ error: 'No products found' }), { status: 404 });
        }

        return new Response(JSON.stringify(products), { status: 200 });
    } catch (error) {
        console.error("Error during fetch:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch products' }), { status: 500 });
    }
}
