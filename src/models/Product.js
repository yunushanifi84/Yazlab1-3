import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    // Diğer alanlar...
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema, 'products');

export default Product;