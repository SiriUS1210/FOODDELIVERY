const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    order: {
        type: Array,
        required: true
    },
    customer_id: {
        type: String,
        required: true
    },
    dPerson_id: {
        type: String,
        required: true
    },
    expiry: {
        type: String,
        required: true,
        enum: ['expired', 'not expired'],
        default: 'not expired'
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
