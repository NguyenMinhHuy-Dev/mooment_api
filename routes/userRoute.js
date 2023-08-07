const userController = require("../controllers/userController");
const router = require('express').Router();

router.post("/signin", userController.signIn);
router.post("/signup", userController.signUp);

module.exports = router;