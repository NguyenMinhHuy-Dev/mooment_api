const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        customerEmail: {
            type: String,
            require: true
        },
        customerName: {
            type: String,
            require: true
        },
        customerPhoneNumber: {
            type: String,
            require: true
        },
        customerAddress: {
            type: String,
            require: true
        },
        payment: { 
            type: String,
            require: true
        },
        note: {
            type: String,
            default: '',
        },
        shipCost: {
            type: Number,
            default: 0,
        },
        voucher: {
            type: Number,
            default: 0,
        },
        orderDetail: [{
            name: {
                type: String,
                require: true,
            },
            slug: {
                type: String,
            },
            imageUrl: {
                type: String,
            },
            totalPrice: {
                type: Number,
            },
            quantity: {
                type: Number,
                require: true
            },
            salePrice: {
                type: Number,
                require: true,
            }
        }],
        isPaid: {
            type: Boolean,
            default: false,
        },
        totalCost: {
            type: Number,
            require: true
        }
    }, 
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;