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
        orders: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Oder"
        }],
        lately: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }],
        favourite: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }] 
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;