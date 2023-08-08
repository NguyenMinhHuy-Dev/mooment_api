const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const { cloudinary } = require("../utils/cloudinary");

const productController = {
    // GET METHOD
    getAllProduct: async (req, res) => {
        try {
            const products = await Product.find().populate("category").populate("brand");
            return res.status(200).json(products);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    getProduct: async (req, res) => {
        try {
            const product = await Product.find({ slug: req.params.slug });
            return res.status(200).json(product);
        }   
        catch (err) {
            return res.status(500).json(err);
        }
    },

    // POST METHOD
    addProduct: async (req, res) => {
        try {  
            const { name, description, category, brand, costPrice, normalPrice, quantity } = req.body;

            
            const stripHTML = (str) => {
                return str.replace(/<[^>]+>/g," ").replace(/ +/g," ").trim();
            }
            function removeUnicode(str) {
                return stripHTML(str).normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[đĐ]/g,"d");
            }
            function toSlug(str) {
                return removeUnicode(str).toLocaleLowerCase().replace(/([^0-9a-z-\s])/g,"-").replace(/(\s+)/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"");
            }

            // UPLOAD IMAGE TO CLOUDINARY
            const fileStr = req.body.imageUrl;
            const uploadedRespose = await cloudinary.uploader.upload(fileStr, {
                upload_preset: 'dev_setups'
            })
            
            // SAVE NEW PRODUCT TO MONGODB
            const product = new Product({
                name,
                description,
                category,
                brand,
                costPrice,
                normalPrice,
                salePrice: normalPrice,
                quantity,
                sold: 0,
                slug: toSlug(name),
                imageUrl: uploadedRespose.url
            });
            const saveProduct = await product.save();
            return res.status(200).json(saveProduct);
        }
        catch (err) {
            return res.status(500).json({err: "Something went wrong!"});
        }
    }
    // PUT METHOD

    // DELETE MEDTHOD
};

module.exports = productController;