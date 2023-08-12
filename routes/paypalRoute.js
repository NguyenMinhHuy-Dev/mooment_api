const paypalController = require("../controllers/paypalController");
const router = require("express").Router();

router.post("/create-paypal-order", paypalController.createOrder);
router.post("/capture-paypal-order", paypalController.capturePaypalOrder);

module.exports = router;