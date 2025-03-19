const express = require("express");
const route = express.Router();
const userController = require("../controllers/user");
const { REGISTER, SIGNIN } = require("../utils/constants/appconstants").ROUTES;

route.post(REGISTER, userController.register);
route.post(SIGNIN, userController.signin);

module.exports = route;
