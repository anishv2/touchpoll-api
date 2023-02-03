const PollModel = require('../database/models/polls');
const pollManage = require('../database/repository/poll_manage');
const userManage = require('../database/repository/user_manage');
const messageReader = require('../utils/i18n/message_reader');
const { SUCCESS, CREATE, SERVER_ERROR } = require('../utils/constants/appconstants').STATUS_CODES;

module.exports = {
    // create poll
    async createPoll(req, res) {
        const pollObject = req.body;
        const {id}=req.decode;
        try {
            const pollDoc = await pollManage.create(pollObject);
            if (pollDoc && pollDoc._id) {
                    const user=await userManage.findUser(id);
                    if(user){
                        user.polls.push(pollDoc._id)
                        await user.save();
                    }
                    res.status(CREATE).json({ message: messageReader.readMessage("poll", "create") });
                }
                else {
                    res.status(SERVER_ERROR).json({ message: messageReader.readMessage("poll", "createfail") });
                }
        }
        catch (error) {
            res.status(SERVER_ERROR).send('SERVER ERROR Something went wrong...');
        }
    },
    // edit poll
    editPoll(req,res){
        const data=req.body;
        const pollid=req.params.id;
        const poll=pollManage.edit(pollid,data);
        if(poll){
            res.status(SUCCESS).json({message:messageReader.readMessage("poll","updatesuccess")});
        }
        else res.status(SERVER_ERROR).json({message:messageReader.readMessage("poll","updatefail")});
    },
    deletePoll(req,res){
        const {id}=req.decode;
        const pollid=req.params.id;
        return pollManage.delete(req,res);
    },
    // fetch all polls for user
    getUserPolls(req,res){
        const {id}=req.decode;
        return pollManage.findUser(id,res);
    },
    // fetch poll for vote
    getUserPoll(req,res){
        return pollManage.findPoll(req,res);
    },
    // submit  poll
    submitPoll(req, res) {
        try {
            return pollManage.submit(req,res);
        }
        catch (err) {
            res.json({message:err.message});
        }
    },
    // poll result
    async resultPoll(req,res){
        const poll=await pollManage.findPoll(req,res);
        
    }
}