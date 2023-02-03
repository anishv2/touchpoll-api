const pollManage = require('../database/repository/poll_manage');
const userManage = require('../database/repository/user_manage')
const messageReader = require('../utils/i18n/message_reader');
const { SUCCESS,CREATE, SERVER_ERROR } = require('../utils/constants/appconstants').STATUS_CODES;

module.exports = {
    // retrive all polls 
    async getPolls(req, res) {
        const polls = await pollManage.get();
        // res.header("Access-Control-Allow-Origin", "http://localhost:3000")
        res.status(SUCCESS).json(polls);
    },
    // delete polls
    async removePoll(req, res) {
        const deletedPoll = await pollManage.delete(req.params.id);
        console.log('deleted poll', deletedPoll)
        if (!deletedPoll) {
            res.status(SERVER_ERROR).json({ message: messageReader.readMessage("poll", "deletefail") });
        }
        else {
            res.status(SUCCESS).json({ message: messageReader.readMessage("poll", "deletesuccess") });
        }
    },
    // update polls
    async updatePoll(req, res) {
        let polls = await pollManage.update(req.params.id, req.body);
        if (polls._id) {
            res.status(SUCCESS).json({ message: messageReader.readMessage("poll", "updatesuccess") });
        }
        else {
            res.status(SERVER_ERROR).json({ message: messageReader.readMessage("poll", "updatefail") });
        }

    },
    async submitPoll(req, res) {
        let pollObject = req.body;
        // req.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
        // req.setHeader("Access-Control-Allow-Credentials", "true");
        // req.setHeader("Access-Control-Max-Age", "1800");
        // req.setHeader("Access-Control-Allow-Headers", "content-type");
        // req.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
        // header("Access-Control-Allow-Origin: http://localhost:3000");
        // header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
        // header("Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization");

        try {
            const pollDoc = await pollManage.submit(pollObject);
            if (pollDoc && pollDoc._id) {
                res.status(SUCCESS).json({ "message": "Succesfully saved" })
                return pollDoc;
            }
            else {
                res.status(SERVER_ERROR).json({ "message": "Not saved" });
            }
            // if(pollDoc&&pollDoc._id){
            //    const userPollDoc= await userManage.updatePoll(pollObject.userid, pollDoc._id);
            //    if(userPollDoc&&userPollDoc._id){
            //         res.status(SUCCESS).json({'poll-info':userPollDoc});
            //    }
            //    else {
            //         res.status(SERVER_ERROR).json({'poll-info':userPollDoc});
            //    }
            // }

        }
        catch (err) {
            console.log('Error occured while save poll', err);
            res.status(SERVER_ERROR).send('SERVER ERROR Something went wrong...');
        }
    }
}