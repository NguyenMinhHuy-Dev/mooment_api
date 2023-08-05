const Category = require("../models/categoryModel");

const categoryController = {
    getAllCategory: async (req, res) => {
        try {
            const categories = await Category.find().populate("collections");
            return res.status(200).json(categories);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },

    getCategory: async (req, res) => {
        try {
            const category = await Category.find({ slug: req.params.slug })
        } 
        catch (err) {
            return res.status(500).json(err);
        }
    },

    addCategory: async (req, res) => {
        try {
            const newCategory = new Category(req.body);
            const savedCategory = await newCategory.save();
            return res.status(200).json(savedCategory);
        }   
        catch (err) {
            return res.status(500).json(err);
        }
    }
};

module.exports = categoryController;