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
                status: 'Hata',
                message: `ID'si ${item.ProductID} olan ürün bulunamadı`
            });
            throw new Error(`ID'si ${item.ProductID} olan ürün bulunamadı`);
        }

        try {
            // Semafor alındı logu
            await SemaphoreLog.create({
                orderId: this._id,
                status: 'Semafor alındı',
                message: `Ürün ${item.ProductID} için stok güncellemesi işleniyor`
            });

            // Delay ekle (örneğin, 2 saniye)
            await delay(2000);

            // Stok güncellemesi
            await product.updateStock(item.Quantity);

            // Stok güncellendi logu
            await SemaphoreLog.create({
                orderId: this._id,
                status: 'Stok güncellendi',
                message: `Stok başarıyla güncellendi. Kalan stok: ${product.stock}`
            });
        } catch (error) {
            // Hata logu
            await SemaphoreLog.create({
                orderId: this._id,
                status: 'Hata',
                message: `Ürün ${item.ProductID} için stok güncellenemedi: ${error.message}`
            });
            await delay(2000);
            throw error;

        } finally {
            // Semafor serbest bırakıldı logu
            await SemaphoreLog.create({
                orderId: this._id,
                status: 'Semafor serbest bırakıldı',
                message: `Ürün ${item.ProductID} için semafor serbest bırakıldı`
            });

            // Delay ekle (örneğin, 1 saniye)
            await delay(1000);
        }
    }
};

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;