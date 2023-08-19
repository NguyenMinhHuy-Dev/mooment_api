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
            const stripHTML = (str) => {
                return str.replace(/<[^>]+>/g," ").replace(/ +/g," ").trim();
            }
            function removeUnicode(str) {
                return stripHTML(str).normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[đĐ]/g,"d");
            }
            function toSlug(str) {
                return removeUnicode(str).toLocaleLowerCase().replace(/([^0-9a-z-\s])/g,"-").replace(/(\s+)/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"");
            }
            const { name, categories } = req.body;
            const newBrand = new Brand({ name, slug: toSlug(name), categories });
            const savedBrand = await newBrand.save();
            return res.status(200).json(savedBrand);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },

    editBrand: async (req, res) => {
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
 
            const { name, categories } = req.body;
            await Brand.findByIdAndUpdate(req.params.id, { name, slug: toSlug(name), categories });
            return res.status(200).json("Updated successfull");
        }
        catch(err) {
            return res.status(500).json(err);
        }
    },

    deleteBrand: async (req, res) => {
        try {
            await Brand.findByIdAndDelete(req.params.id);
            return res.status(200).json("Delete successfull");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
};

module.exports = brandController;