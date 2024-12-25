const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    LogDate: { type: Date, default: Date.now },
    LogType: { type: String, enum: ['Error', 'Warning', 'Info'], required: true },
    CustomerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    CustomerType: { type: String, enum: ['Premium', 'Standard'], required: true },
    OrderDetails: { type: String, required: true },
    OrderTime: { type: Date, required: true , default: Date.now},
    LogDetails: { type: String, required: true }
});

const CustomerLog = mongoose.models.CustomerLog || mongoose.model('CustomerLog', logSchema, "customerLogs");

module.exports = CustomerLog;