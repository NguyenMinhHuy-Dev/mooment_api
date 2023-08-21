const Order = require("../models/orderModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const userController = {
    signUp: async (req, res) => {
        try {
            const {email, password, fullName, address, gender, phoneNumber, role, type, salary } = await req.body;

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await new User({
                email,
                password: hashedPassword,
                fullName,
                address,
                gender, 
                phoneNumber, 
                role, 
                type, 
                salary
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
            const user = await User.findById(req.params.id).populate('favourite').populate("vouchers");
            if (!user) return res.status(404).json({status: 404, message: "Invalid User"});
            return res.status(200).json(user);
        }
        catch (err) {
            return res.status(500).json({status: 500, error: err});
        }
    },

    getOrders: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).populate('orders');
            if (!user) return res.status(404).json({status: 404, message: "Invalid User"});
            return res.status(200).json(user.orders);
        }
        catch (err) {
            return res.status(500).json({status: 500, error: err});
        }
    },

    updateUser: async (req, res) => {
        try {   
            const { isChangePassword, oldPassword, newPassword, ...data } = req.body;
            if (!isChangePassword) { 
                await User.findByIdAndUpdate(req.params.id, { $set: {...data} }, { new: true });
            }
            else {
                const user = await User.findById(req.params.id);
                const validPassword = await bcrypt.compareSync(req.body.oldPassword, user.password);
                if (!validPassword) return res.status(404).json("Invalid password");

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);

                await User.findByIdAndUpdate(req.params.id, { $set: { password: hashedPassword } }, { new: true });
            }
            const user = await User.findById(req.params.id);
            return res.status(200).json(user);
        }
        catch (err) {
            return res.status(500).json({status: 500, message: "Something went wrong!"});
        }
    },

    deleteUser : async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("Delete successfull");
        }
        catch (err) {
            return res.status(500).json(err);
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
    },

    addToLately: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({status: 404, message: "Invalid User"});

            if (!user.lately.includes(req.body.id))
                await user.updateOne({ $push: { lately: req.body.id } })
         
            return res.status(200).json('Add to lately successfully');
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },

    addVoucher: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({status: 404, message: "Invalid User"});

            if (!user.vouchers.includes(req.body.id))
                await user.updateOne({ $push: { vouchers: req.body.id } })
         
            return res.status(200).json('Add to vouchers successfully');
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
};

module.exports = userController;