const categoryController = require('../controllers/categoryController'); 
const router = require('express').Router();

router.get("/", categoryController.getAllCategory);
router.get("/:slug", categoryController.getCategory);
router.post("/", categoryController.addCategory);

module.exports = router;