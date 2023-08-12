const Order = require("../models/orderModel");
const User = require("../models/userModel");

const orderController = {
    createOrder: async (req, res) => {
        try {
            const { isAuth, ...data } = req.body;
            const order = new Order(data);
            const savedOrder = await order.save();

            if (isAuth) {
                const user = await User.findOne({ email: req.body.customerEmail });
                await user.updateOne({ $push: { orders: savedOrder._id } });
            }

            return res.status(200).json({status: 200, message: "Create order successfull!", data: savedOrder});
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
};

module.exports = orderController;