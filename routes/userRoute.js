const userController = require("../controllers/userController");
const router = require('express').Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.get("/:id/orders", userController.getOrders);

router.put("/:id", userController.updateUser);

router.post("/:id/favourite", userController.addToFavourite);
router.put("/:id/lately", userController.addToLately);
router.put("/:id/vouchers", userController.addVoucher);

router.delete("/:id", userController.deleteUser);
router.delete("/:id/favourite", userController.removeFromFavourite);

module.exports = router;