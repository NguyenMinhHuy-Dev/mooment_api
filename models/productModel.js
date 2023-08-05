const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        slug: {
            type: String, 
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brand'
        },
        description: {
            type: String,
            require: true
        },
        imageUrl: {
            type: String,
            require: true
        },
        costPrice: {
            type: Number,
            require: true
        },
        normalPrice: {
            type: Number,
            require: true
        },
        salePrice: {
            type: Number,
            require: true
        },
        quantity: {
            type: Number,
            require: true,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;