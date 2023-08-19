const slideController = require("../controllers/slideController");
const router = require('express').Router();

router.get("/", slideController.getAllSlides);

router.post("/", slideController.addSlide);

router.put("/:id", slideController.editSlide);

router.delete("/:id", slideController.deleteSlide);

module.exports = router;