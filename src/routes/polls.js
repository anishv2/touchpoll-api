const express=require('express');
const route=express.Router();
const pollController=require('../controllers/poll_controller');
const pollHandler=require('../middlewares/poll-handler');
const tokenVerify=require('../middlewares/token-verify');
const {
    EDIT_POLL,
    ALL_POLLS,
    CREATE_POLL,
    DELETE_POLL,
    SUBMIT_POLL,
    USER_POLL
}=require('../utils/constants/appconstants').ROUTES;


route.get(ALL_POLLS, tokenVerify,pollController.getUserPolls);
route.get(USER_POLL,tokenVerify,pollController.getUserPoll);
route.post(CREATE_POLL,tokenVerify,pollHandler.create,pollController.createPoll);
route.put(EDIT_POLL,tokenVerify,pollHandler.edit,pollController.editPoll);
route.delete(DELETE_POLL,tokenVerify,pollHandler.edit,pollController.deletePoll);
route.post(SUBMIT_POLL,tokenVerify,pollController.submitPoll);

module.exports=route;