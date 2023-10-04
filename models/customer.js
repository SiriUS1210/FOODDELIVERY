const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phonenumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: String,
        required: true,
        default: 'no',
        enum: ['yes', 'no']
    }
}, { timestamps: true });

customerSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);  // Use a specific number of rounds (e.g., 10)
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
