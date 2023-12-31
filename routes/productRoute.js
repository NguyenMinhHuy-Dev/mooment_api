const router = require("express").Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProduct);
router.get("/:slug", productController.getProduct);
router.get("/:slug/relate", productController.getRelateProducts);

router.post("/", productController.addProduct);

router.put("/:id", productController.editProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;