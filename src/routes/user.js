const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const tokenVerify = require("../middlewares/token-verify");
const { CHANGE_PWD } = require("../utils/constants/appconstants").ROUTES;

// protected routes
router.put(CHANGE_PWD, tokenVerify, userController.changePassword);

module.exports = router;
