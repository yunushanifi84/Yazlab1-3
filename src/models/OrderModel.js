const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    OrderID: { type: String, required: true, unique: true },
    CustomerID: { type: String, required: true },
    ProductID: { type: String, required: true },
    Quantity: { type: Number, required: true },
    TotalPrice: { type: Number, required: true },
    OrderDate: { type: Date, default: Date.now },
    OrderStatus: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' }
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;