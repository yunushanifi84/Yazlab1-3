import mongoose from 'mongoose';
import { semaphorePlugin } from '../plugins/semaphorePlugin.js';

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    imageStream: { type: Buffer, required: false }
});

// Plugin'i şemaya ekle
productSchema.plugin(semaphorePlugin);

// Örnek bir kilitli işlem
productSchema.methods.updateStock = async function (quantity) {
    await this.acquireLock(); // Semaforu al
    try {
        if (this.stock < quantity) {
            throw new Error('Stok Yetersiz!');
        }
        this.stock -= quantity;
        await this.save();
    } finally {
        this.releaseLock(); // Semaforu serbest bırak
    }
};

const Product = mongoose.models.Product || mongoose.model('Product', productSchema, 'products');

export default Product;