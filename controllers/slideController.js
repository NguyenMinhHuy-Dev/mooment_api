const Slide = require("../models/slideModel");
const { cloudinary } = require("../utils/cloudinary");

const slideController = {
    getAllSlides: async (req, res) => {
        try {
            const slides = await Slide.find();
            return res.status(200).json(slides);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },

    addSlide: async (req, res) => {
        try {
            const fileStr = req.body.image;
            const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
                upload_preset: 'dev_setups'
            });

            const newSlide = new Slide({
                url: req.body.url,
                image: uploadedResponse.url,
            })
            const savedSlide = await newSlide.save();
            return res.status(200).json(savedSlide);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },

    editSlide: async (req, res) => {
        try {
            const fileStr = req.body.image;
            const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
                upload_preset: 'dev_setups'
            });
 
            await Slide.findByIdAndUpdate(req.params.id, { $set: { url: req.body.url, image: uploadedResponse.url } });
            return res.status(200).json("Updated successfully");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },

    deleteSlide: async (req, res) => {
        try {
            await Slide.findByIdAndDelete(req.params.id);
            return res.status(200).json("Deleted successfully");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
};

module.exports = slideController;