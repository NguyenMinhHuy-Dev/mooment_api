const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        id: {
            type: "String",
            require: true
        },
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
        config: {
            type: String,
        },
        imageUrl: {
            type: String,
            require: true
        },
        imageList: [{
            type: String
        }],
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
        unit: {
            type: String,
            require: true
        },
        quantity: {
            type: Number,
            require: true,
            default: 0
        },
        sold: {
            type: Number,
            require: true,
            default: 0
        },
        rated: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;