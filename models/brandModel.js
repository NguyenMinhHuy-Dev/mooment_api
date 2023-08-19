const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        slug: {
            type: String,
            require: true
        },
        categories: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }]
    },
    {
        timestamps: true,
    }
);
 
const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;