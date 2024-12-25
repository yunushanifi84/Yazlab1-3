import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    imageStream: { type: Buffer, required: false } // Add this line for image bytestream

});


const Product = mongoose.models.Product || mongoose.model('Product', productSchema, 'products');

export default Product;