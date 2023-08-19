const orderController = require("../controllers/orderController");
const router = require("express").Router();
 
router.post("/", orderController.createOrder);

router.get("/", orderController.getAllOrders);

router.put("/:id", orderController.updateOrder);

module.exports = router;