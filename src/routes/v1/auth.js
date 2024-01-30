const router = require("express").Router();
const { controllers: authController } = require("@/src/api/auth");

const { uploadImage } = require("@/src/middleware/uploadImage");

// const auth = require("@/src/middleware/authenticate");
// const authorize = require("../middleware/authorize");
// const ownership = require('../middleware/ownership');

// !: AUTH ROUTES
// *: USER  LOGIN
router.post("/user/login", authController.userLogin);

module.exports = router;
