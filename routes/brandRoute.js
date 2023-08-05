const brandController = require("../controllers/brandController");
const router = require("express").Router();

router.get("/", brandController.getAllBrand);
router.post("/", brandController.addBrand);

module.exports = router;