const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }]
    },
    {
        timestamps: true,
    }
);

const Collection = mongoose.model("Collection", collectionSchema);
