const mongoose = require('mongoose');
import { Schema } from 'mongoose';

const orderSchema = new mongoose.Schema({
    CustomerID: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    Products: [
        {
            ProductID: { type: String, required: true },
            Quantity: { type: Number, required: true }
        }
    ],
    TotalPrice: { type: Number, required: true },
    OrderDate: { type: Date, default: Date.now },
    OrderStatus: { type: String, enum: ['Bekliyor', 'Sipariş İşleniyor', 'Sipariş Onaylandı', 'Sipariş İptal Edildi'], default: 'Bekliyor' }
});

orderSchema.methods.updateProductStocks = async function () {
    for (const item of this.Products) {
        const product = await mongoose.model('Product').findById(item.ProductID);
        if (!product) {
            throw new Error(`Product with ID ${item.ProductID} not found`);
        }
        await product.updateStock(item.Quantity);
    }
};

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;