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
            const category = await Category.find({ slug: req.params.slug });
            return res.status(200).json(category);
        } 
        catch (err) {
            return res.status(500).json(err);
        }
    },

    addCategory: async (req, res) => {
        try {
            const stripHTML = (str) => {
                return str.replace(/<[^>]+>/g," ").replace(/ +/g," ").trim();
            }
            function removeUnicode(str) {
                return stripHTML(str).normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[đĐ]/g,"d");
            }
            function toSlug(str) {
                return removeUnicode(str).toLocaleLowerCase().replace(/([^0-9a-z-\s])/g,"-").replace(/(\s+)/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"");
            }

            const categories = await Category.find();

            const { name } = req.body;

            const newCategory = new Category({ id: `MMCT${Object.keys(categories).length}`, name, slug: toSlug(name) });
            const savedCategory = await newCategory.save();  
            
            return res.status(200).json(savedCategory);
        }   
        catch (err) {
            return res.status(500).json(err);
        }
    },

    editCategory: async (req, res) => {
        try {
            const stripHTML = (str) => {
                return str.replace(/<[^>]+>/g," ").replace(/ +/g," ").trim();
            }
            function removeUnicode(str) {
                return stripHTML(str).normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[đĐ]/g,"d");
            }
            function toSlug(str) {
                return removeUnicode(str).toLocaleLowerCase().replace(/([^0-9a-z-\s])/g,"-").replace(/(\s+)/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"");
            }

            const { name } = req.body;

            await Category.findByIdAndUpdate(req.params.id, { name , slug: toSlug(name) });
            return res.status(200).json('Update successful');
        }
        catch (err) {
            return res.status(500).json({status: 500, message: 'Something went wrong!'});
        }
    },

    deleteCategory: async (req, res) => {
        try { 
            await Category.findByIdAndDelete(req.params.id);
            return res.status(200).json('Delete successful');
        }
        catch (err) {
            return res.status(500).json({status: 500, message: 'Something went wrong!'});
        }
    }
};

module.exports = categoryController;