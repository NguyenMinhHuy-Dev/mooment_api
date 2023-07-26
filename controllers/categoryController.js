const Category = require("../models/categoryModel");

const categoryController = {
    getAllCategory: async (req, res) => {
        try {
            const categories = await Category.find();
            return res.status(200).json(categories);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
};

module.exports = categoryController;