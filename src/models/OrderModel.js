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
    OrderStatus: { type: String, enum: ['Bekliyor', 'Sipariş İşleniyor', 'Sipariş Onaylandı'], default: 'Bekliyor' }
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;