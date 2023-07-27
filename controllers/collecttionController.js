const Category = require("../models/categoryModel");
const Collection = require("../models/collectionModel");

const collectionController = {
    getAllCollection: async (req, res) => {
        try {
            const collections = await Collection.find();
            return res.status(200).json(collections);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },

    addCollection: async (req, res) => {
        try {
            const newCollection = new Collection(req.body);
            const saveCollection = await newCollection.save();
            if (newCollection.category) {
                const category = await Category.findById(newCollection.category._id);
                await category.updateOne({ $push: { collections: saveCollection._id } });
            }
            return res.status(200).json(saveCollection);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
};

module.exports = collectionController;