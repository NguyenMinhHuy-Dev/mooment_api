const userController = require("../controllers/userController");
const router = require('express').Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);

router.put("/:id", userController.updateUser);

router.post("/:id/favourite", userController.addToFavourite);
router.delete("/:id/favourite", userController.removeFromFavourite);

module.exports = router;