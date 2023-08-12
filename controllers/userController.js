const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const userController = {
    signUp: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const newUser = await new User({
                email: req.body.email,
                password: hashedPassword,
                fullName: req.body.fullName,
            });

            const savedUser = await newUser.save();
            return res.status(200).json(savedUser);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },

    signIn: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) return res.status(404).json("Invalid email");

            const validPassword = await bcrypt.compareSync(req.body.password, user.password);
            if (!validPassword) return res.status(404).json("Invalid password");

            const returnUser = user.toObject();
            delete returnUser.password;

            return res.status(200).json(returnUser);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            return res.status(200).json(users);
        }
        catch (err) {
            return res.status(500).json({
                status: 500,
                error: err
            })
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({status: 404, message: "Invalid User"});
            return res.status(200).json(user);
        }
        catch (err) {
            return res.status(500).json({status: 500, error: err});
        }
    },

    updateUser: async (req, res) => {
        try {   
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
            return res.status(200).json(user);
        }
        catch (err) {
            return res.status(500).json({status: 500, message: "Something went wrong!"});
        }
    },

    addToFavourite: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({status: 404, message: "Invalid User"});
            if (!user.favourite.includes(req.body.id))
                await user.updateOne({ $push: { favourite: req.body.id } })
            return res.status(200).json("Added");
        }
        catch (err) {
            return res.status(500).json({status: 500, error: err});
        }
    },

    removeFromFavourite: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({status: 404, message: "Invalid User"});

            await user.updateOne({ $pull: { favourite: req.body.id } })

            return res.status(200).json("Removed");
        }
        catch (err) {
            return res.status(500).json({status: 500, error: err});
        }
    }
};

module.exports = userController;