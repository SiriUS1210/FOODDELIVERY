const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliverySchema = new Schema({
    deliverer_name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    occupied: {
        type: String,
        default: 'no',
        enum: ['yes', 'no'],
        required: true
    },
    numberOrders: {
        type: Number,
        default: 0,
        enum: [0, 1, 2, 3, 4, 5],
        required: true
    }
});

const Delivery = mongoose.model('Delivery', deliverySchema);
module.exports = Delivery;
