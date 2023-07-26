const router = require("express").Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProduct);
router.get("/:slug", productController.getProduct);
router.post("/", productController.addProduct);

module.exports = router;