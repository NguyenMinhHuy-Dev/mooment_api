const categoryController = require('../controllers/categoryController'); 
const router = require('express').Router();

router.get("/", categoryController.getAllCategory);
router.get("/:slug", categoryController.getCategory);

router.post("/", categoryController.addCategory);

router.put("/:id", categoryController.editCategory);

router.delete("/:id", categoryController.deleteCategory);

module.exports = router;