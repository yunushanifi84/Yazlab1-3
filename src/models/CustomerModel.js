const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    CustomerName: { type: String, required: true },
    Budget: { type: Number, required: true },
    CustomerType: { type: String, enum: ['Premium', 'Standard'], required: true },
    TotalSpent: { type: Number, default: 0 },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true }
});

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema, 'customers');

module.exports = Customer;
