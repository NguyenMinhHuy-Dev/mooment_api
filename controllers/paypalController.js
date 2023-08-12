const paypal = require("../api/paypal-api");

const paypalController = {
    createOrder: async (req, res) => {
        try {
          const order = await paypal.createOrder(req.body);
          return res.json(order);
        } catch (err) {
          return res.status(500).send(err.message);
        }
    },
    capturePaypalOrder: async (req, res) => {
        const { orderID } = req.body;
        try {
          const captureData = await paypal.capturePayment(orderID);
          res.json(captureData);
        } catch (err) {
          res.status(500).send(err.message);
        }
    }
}

module.exports = paypalController;