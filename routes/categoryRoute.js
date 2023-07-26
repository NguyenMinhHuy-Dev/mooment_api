const categoryController = require('../controllers/categoryController'); 
const router = require('express').Router();

router.get("/", categoryController.getAllCategory);

module.exports = router;