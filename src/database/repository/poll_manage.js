const UserModel = require('../models/user');
const PollModel = require('../models/polls');
const messageReader = require('../../utils/i18n/message_reader');
const { SERVER_ERROR, EXIST, RESOURCE_NOT_FOUND, SUCCESS } = require('../../utils/constants/appconstants').STATUS_CODES;


module.exports = {
    create(pollObject) {
        return PollModel.create(pollObject);
    },
    get() {
        return PollModel.find().sort({ createdAt: -1 });
    },
    async edit(pollid, data) {
        return await PollModel.findByIdAndUpdate({ _id: pollid }, data);
    },
    async delete(req,res){
        const userid=req.decode.id;
        const pollid=req.params.id;
        try {
            const isDeleted=await PollModel.deleteOne({ _id: pollid });
            if(isDeleted.acknowledged){
                const user=await UserModel.findById(userid);
                let newPolls=[];
               const deleted= user.polls.filter((poll)=>poll==pollid);
               const undeleted= user.polls.filter((poll)=>poll.toString()!==pollid);
               if(deleted.length>0){
                await UserModel.updateOne({_id:userid},{ $set: { polls: undeleted } });
                return res.status(SUCCESS).json({message:messageReader.readMessage("poll","deletesuccess")});
               }
               else {
                return res.status(SERVER_ERROR).json({message:messageReader.readMessage("poll","deletefail")});
               }
            }
        } catch (error) {
            return res.json({message:error.message});
        }

    },
    async submit(req, res) {
        let { answer } = req.body;
        let pollid = req.params.id;
        let userid = req.decode.id;
        const poll = await PollModel.findById(pollid);
        if (poll) {
            let voted = poll.voted.filter(user => user.toString() === userid);
            if (voted.length <= 0) {
                const options = poll.options.map((opt) => {
                    return opt.option === answer ? { _id: opt._id, option: opt.option, votes: opt.votes + 1 } : opt
                });
                const updatedPoll = await PollModel.updateOne({ _id: pollid }, { $set: { options: options } });
                poll.voted.push(userid);
                await PollModel.updateOne({ _id: pollid }, { $set: { voted: poll.voted } });
                if (updatedPoll) {
                    return res.status(SUCCESS).json({ message: messageReader.readMessage("poll", "submitted") });
                }
            }
            else {
                return res.status(EXIST).json({ message: messageReader.readMessage("poll", "alreadyvoted") });
            }
        }
        else {
            res.status(RESOURCE_NOT_FOUND).json({ message: messageReader.readMessage("Poll not found") });
        }

    },
    async findPoll(req, res) {
        const pollid=req.params.id;
        const userid=req.decode.id;
        try {
            const poll = await PollModel.findById(pollid);
            if (poll) {
                let voted = poll.voted.filter(user => user.toString() === userid);
                if(voted.length<=0){
                    return res.status(SUCCESS).json({ poll: [poll] });
                }
                else {
                    return res.status(SUCCESS).json({ poll: [poll], voted:true });
                }
            }
            else {
                return res.status(RESOURCE_NOT_FOUND).json({ message: "Poll not found" });
            }
        } catch (error) {
            return res.json({ message: error.message});
        }
        
    },
    async findUserAndUpdatePoll(userid, res) {
        try {
            const user = await UserModel.findById(userid).populate({ path: 'polls', options: { sort: { created_date: -1 }}});
            return res.status(SUCCESS).json({ polls: user.polls });
        }
        catch (err) {
            return res.status(err.code).json({ message: err.message });
        }
    }
}