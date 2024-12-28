const mongoose = require('mongoose');
const SemaphoreLog = require('./SemaphoreLogModel');
import { Schema } from 'mongoose';

// Gecikme fonksiyonu
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
    OrderStatus: { type: String, enum: ['Bekliyor', 'Sipariş İşleniyor', 'Sipariş Onaylandı', 'Sipariş İptal Edildi'], default: 'Bekliyor' },
    OrderLog: { type: String, required: false }
});

orderSchema.methods.updateProductStocks = async function () {
    for (const item of this.Products) {
        const product = await mongoose.model('Product').findById(item.ProductID);
        if (!product) {
            await SemaphoreLog.create({
                orderId: this._id,
                status: 'Error',
                message: `Product with ID ${item.ProductID} not found`
            });
            throw new Error(`Product with ID ${item.ProductID} not found`);
        }

        try {
            // Semafor alındı logu
            await SemaphoreLog.create({
                orderId: this._id,
                status: 'Semaphore acquired',
                message: `Processing stock update for product ${item.ProductID}`
            });

            // Delay ekle (örneğin, 2 saniye)
            await delay(2000);

            // Stok güncellemesi
            await product.updateStock(item.Quantity);

            // Stok güncellendi logu
            await SemaphoreLog.create({
                orderId: this._id,
                status: 'Stock updated',
                message: `Stock updated successfully. Remaining stock: ${product.stock}`
            });
        } catch (error) {
            // Hata logu
            await SemaphoreLog.create({
                orderId: this._id,
                status: 'Error',
                message: `Failed to update stock for product ${item.ProductID}: ${error.message}`
            });
            throw error;
        } finally {
            // Semafor serbest bırakıldı logu
            await SemaphoreLog.create({
                orderId: this._id,
                status: 'Semaphore released',
                message: `Semaphore released for product ${item.ProductID}`
            });

            // Delay ekle (örneğin, 1 saniye)
            await delay(2000);
        }
    }
};

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;