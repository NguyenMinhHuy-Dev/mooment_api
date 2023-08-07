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
    }
};

module.exports = userController;