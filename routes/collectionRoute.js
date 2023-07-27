const collectionController = require("../controllers/collecttionController");

const router = require("express").Router();

router.get("/", collectionController.getAllCollection);
router.post("/", collectionController.addCollection);

module.exports = router;