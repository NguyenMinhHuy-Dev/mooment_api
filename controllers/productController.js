const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const { cloudinary } = require("../utils/cloudinary");

const productController = {
    // GET METHOD
    getAllProduct: async (req, res) => {
        try {
            const products = await Product.find().populate("category");
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
            const { name, description, category, costPrice, salePrice, quantity } = req.body;

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
                costPrice,
                salePrice,
                quantity,
                slug: name.toLocaleLowerCase().replaceAll(' ', '-'),
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