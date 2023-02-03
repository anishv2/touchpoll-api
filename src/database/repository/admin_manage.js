const PollModel=require('../models/polls');
const uploadFile=require('../../middlewares/upload-file');
const {SERVER_ERROR,SUCCESS,RESOURCE_NOT_FOUND}=require('../../utils/constants/appconstants').STATUS_CODES;


module.exports={
    create(pollObj){
        uploadFile(pollObj.image);
        return PollModel.create(pollObj);
    },
    update(pollId,pollObj){
        let updatedPoll=PollModel.findById(pollId);
        updatedPoll= PollModel.findByIdAndUpdate(pollId,pollObj);
        return updatedPoll;
     },
     delete(id){
         return PollModel.findByIdAndDelete(id);
     },
    get(){
        return PollModel.find();
    },
    getOne(id){
        return PollModel.findById(id);
    }

}