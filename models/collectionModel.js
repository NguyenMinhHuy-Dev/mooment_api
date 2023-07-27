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
        items: [{
            title: {
                type: String,
                require: true
            },
            slug: {
                type: String,
                require: true
            }
        }]
    },
    {
        timestamps: true,
    }
);

const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;