import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Diğer alanlar...
});

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema, 'customers');

export default Customer;