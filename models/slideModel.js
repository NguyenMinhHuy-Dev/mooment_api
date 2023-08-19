const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            default: '',
        },
        image: {
            type: String,
            require: true,
        }
    },
    {
        timestamps: true,
    }
);

const Slide = mongoose.model("Slide", slideSchema);
module.exports = Slide;