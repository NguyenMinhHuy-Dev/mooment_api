const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        fullName: {
            type: String,
            require: true,
            default: '',
        },
        gender: {
            type: Number,
            default: -1,
        },
        phoneNumber: {
            type: String,
            default: '',
        },
        role: {
            type: Number,
            default: 0
        },
        type: {
            type: String,
            default: 'Part-time',
        },
        salary: {
            type: Number,
            default: 0
        },
        address: {
            type: String,
        },
        orders: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }],
        lately: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }],
        favourite: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }],
        vouchers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Voucher"
        }]
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;