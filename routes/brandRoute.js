const brandController = require("../controllers/brandController");
const router = require("express").Router();

router.get("/", brandController.getAllBrand);

router.post("/", brandController.addBrand);

router.put("/:id", brandController.editBrand);

router.delete("/:id", brandController.deleteBrand);

module.exports = router;