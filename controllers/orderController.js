const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");

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

            for (const product of order.orderDetail) {
                await Product.findOneAndUpdate({ slug: product.slug }, { $inc: { quantity: - product.quantity, sold: + product.quantity } });
            }

            return res.status(200).json({status: 200, message: "Create order successfull!", data: savedOrder});
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },

    updateOrder: async(req, res) => {
        try {
            await Order.findByIdAndUpdate(req.params.id, { $set: req.body});
            return res.status(200).json("Update successfull");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },

    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find();
            return res.status(200).json(orders);
        }
        catch(err) {
            return res.status(500).json(err);
        }
    }
};

module.exports = orderController;