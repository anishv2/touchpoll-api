const express = require("express");
const router = express.Router();
const pollController = require("../controllers/poll");
const pollHandler = require("../middlewares/poll-handler");
const tokenVerify = require("../middlewares/token-verify");
const { POLLS, SUBMIT_POLL, POLL } = require("../utils/constants/appconstants").ROUTES;



router.get(POLLS, tokenVerify, pollController.getUserPolls);
router.get(POLL, tokenVerify, pollController.getUserPoll);
router.post(POLLS, tokenVerify, pollHandler.create, pollController.create);
router.put(POLL, tokenVerify, pollHandler.edit, pollController.edit);
router.delete(POLL, tokenVerify, pollHandler.edit, pollController.delete);
router.post(SUBMIT_POLL, tokenVerify, pollController.submitPoll);

module.exports = router;
