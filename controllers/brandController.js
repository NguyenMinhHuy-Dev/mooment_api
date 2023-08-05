const Brand = require("../models/brandModel");

const brandController = {
    getAllBrand: async (req, res) => {
        try {
            const brands = await Brand.find();
            return res.status(200).json(brands);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },

    addBrand: async (req, res) => {
        try {
            const newBrand = new Brand(req.body);
            const savedBrand = await newBrand.save();
            return res.status(200).json(savedBrand);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
};

module.exports = brandController;