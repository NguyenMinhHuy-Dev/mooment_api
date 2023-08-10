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
            const product = await Product.findOne({ slug: req.params.slug }).populate("category").populate("brand");
            return res.status(200).json(product);
        }   
        catch (err) {
            return res.status(500).json(err);
        }
    },
    getRelateProducts: async (req, res) => {
        try {
            const products = await Product.find();

            return res.status(200).json(products);
        }
        catch (err) {
            return res.status(500).json({ status: 500, message: err });
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
            const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
                upload_preset: 'dev_setups'
            })

            const fileStrs = req.body.imageList;
            var array = [];
            for (const image of fileStrs) {
                const responseImage = await cloudinary.uploader.upload(image, {
                    upload_preset: 'dev_setups'
                })
                array.push(responseImage.url);
            }
            
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
                imageUrl: uploadedResponse.url,
                imageList: array,
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