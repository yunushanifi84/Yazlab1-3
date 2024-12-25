const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    LogDate: { type: Date, default: Date.now },
    LogType: { type: String, enum: ['Error', 'Warning', 'Info'], required: true },
    LogDetails: { type: String, required: true }
});

const Log = mongoose.models.Log || mongoose.model('Log', logSchema, "logs");

module.exports = Log;