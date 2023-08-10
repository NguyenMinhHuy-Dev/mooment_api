const router = require("express").Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProduct);
router.get("/:slug", productController.getProduct);
router.get("/:slug/relate", productController.getRelateProducts);

router.post("/", productController.addProduct);

module.exports = router;