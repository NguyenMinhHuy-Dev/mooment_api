const orderController = require("../controllers/orderController");
const router = require("express").Router();

router.post("/", orderController.createOrder);

module.exports = router;