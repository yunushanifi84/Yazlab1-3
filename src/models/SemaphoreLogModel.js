const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, // İlgili sipariş ID'si
    status: { type: String, required: true }, // Semafor durumu: "Semafor alındı", "Semafor serbest bırakıldı"
    message: { type: String, required: true }, // Log mesajı: Örneğin, "Stok güncellendi: 5 ürün"
    timestamp: { type: Date, default: Date.now } // İşlem zamanı
});

const SemaphoreLog = mongoose.models.SemaphoreLog || mongoose.model('SemaphoreLog', logSchema, 'semaphoreLogs');

module.exports = SemaphoreLog;
