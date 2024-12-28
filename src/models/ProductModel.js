import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    imageStream: { type: Buffer, required: false }
});


// Örnek bir kilitli işlem
productSchema.methods.updateStock = async function (quantity) {

    try {
        if (this.stock < quantity) {
            throw new Error('Stok Yetersiz!');
        }
        this.stock -= quantity;
        await this.save();
    } finally {
    }
};

const Product = mongoose.models.Product || mongoose.model('Product', productSchema, 'products');

export default Product;