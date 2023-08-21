const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema(
    {  
        price: {
            type: Number,
            default: 0
        },
        condition: {
            type: Number,
            default: 0
        },
        expDate: {
            type: Date,
            require: true
        },
        quantity: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const Voucher = mongoose.model("Voucher", voucherSchema);
module.exports = Voucher;