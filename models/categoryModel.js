const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        id: {
            type: String,
            require: true,
        },
        name: {
            type: String,
            require: true
        },
        slug: {
            type: String,
            require: true
        },
        collections: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Collection"
        }]
    },
    {
        timestamps: true
    }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;