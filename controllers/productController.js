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
            const { name, description, config, category, brand, costPrice, normalPrice, quantity, unit } = req.body;

            
            const stripHTML = (str) => {
                return str.replace(/<[^>]+>/g," ").replace(/ +/g," ").trim();
            }
            function removeUnicode(str) {
                return stripHTML(str).normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[đĐ]/g,"d");
            }
            function toSlug(str) {
                return removeUnicode(str).toLocaleLowerCase().replace(/([^0-9a-z-\s])/g,"-").replace(/(\s+)/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"");
            }

            const checkSlug = await Product.findOne({ slug: toSlug(name) });
            if (checkSlug) return res.status(500).json({status: 500, message: 'Name already existed!'});

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
            
            const products = await Product.find();


            // SAVE NEW PRODUCT TO MONGODB
            const product = new Product({ 
                id: `MMP${Object.keys(products).length}`,
                name,
                description,
                config,
                category,
                brand,
                costPrice,
                normalPrice,
                salePrice: normalPrice,
                quantity,
                unit,
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
    },

    // PUT METHOD
    editProduct: async (req, res) => {
        try {  
            const { isChangeImg, isChangeImgs, ...data} = req.body; 
            
            const stripHTML = (str) => {
                return str.replace(/<[^>]+>/g," ").replace(/ +/g," ").trim();
            }
            function removeUnicode(str) {
                return stripHTML(str).normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[đĐ]/g,"d");
            }
            function toSlug(str) {
                return removeUnicode(str).toLocaleLowerCase().replace(/([^0-9a-z-\s])/g,"-").replace(/(\s+)/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"");
            } 

            var img;
            var array = [];;
            if (isChangeImg) { 
                // UPLOAD IMAGE TO CLOUDINARY
                const fileStr = req.body.imageUrl;
                const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
                    upload_preset: 'dev_setups'
                }) 
                img = uploadedResponse.url;
            }
            if (isChangeImgs) { 
                const fileStrs = req.body.imageList;
                for (const image of fileStrs) {
                    const responseImage = await cloudinary.uploader.upload(image, {
                        upload_preset: 'dev_setups'
                    })
                    array.push(responseImage.url);
                }
            } 

            // SAVE NEW PRODUCT TO MONGODB 
            await Product.findByIdAndUpdate(req.params.id, { $set: {  
                name: data.name,
                description: data.description,
                config: data.config,
                category: data.category,
                brand: data.brand,
                costPrice: data.costPrice,
                normalPrice: data.normalPrice,
                salePrice: data.salePrice,
                quantity: data.quantity,
                unit: data.unit,
                sold: data.sold,
                slug: toSlug(data.name),
                imageUrl: isChangeImg ? img : data.imageUrl,
                imageList: isChangeImgs ? array : data.imageList,
            } });
            return res.status(200).json("Update successful");
        }
        catch (err) {
            return res.status(500).json({err: "Something went wrong!"});
        }
    },

    // DELETE MEDTHOD
    deleteProduct: async (req, res) => {
        try {
            // const product = await Product.findById(req.params.id);
            await Product.findByIdAndDelete(req.params.id);
            return res.status(200).json("Delete successful");
        }
        catch (err) {
            return res.status(500).json({status: 500, message: "Something went wrong!"});
        }
    }
};

module.exports = productController;