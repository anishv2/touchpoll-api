const UserModel = require('../models/user');
const encrypt = require('../../utils/encrypt');
const messageReader = require('../../utils/i18n/message_reader');
const { tokenEncode } = require('../../utils/token');
const { SERVER_ERROR, SUCCESS, RESOURCE_NOT_FOUND } = require('../../utils/constants/appconstants').STATUS_CODES;

module.exports = {
    // user register
    add(userObject, response) {
        return UserModel.findOne({ email: userObject.email }, (err, doc) => {
            if (err) {
                return response.status(SERVER_ERROR).json({ error: "500 Server error..." + err.message });
            }
            else if (doc && doc.email) {
                return response.status(SUCCESS).json({ message: messageReader.readMessage("user", "exist") });
            }
            else {
                userObject.password = encrypt.hashPassword(userObject.password);
                UserModel.create(userObject).then(res => {
                    if (res._id) {
                        return response.status(SUCCESS).json({ message: messageReader.readMessage("user", "register"), username: userObject.name });
                    }
                    else {
                        return response.status(SERVER_ERROR).json({ message: messageReader.readMessage("user", "registerfail") });
                    }
                })
            }
        })

    },
    // user login
    find(userObject, response) {
        try {
            UserModel.findOne({ email: userObject.email }, (err, doc) => {
                if (err) {
                    return response.status(SERVER_ERROR).json({ message: messageReader.readMessage("user", "signinerror") + err });
                }
                else if (doc && doc.email) {
                    let dbPassword = doc.password;
                    let plainPassword = userObject.password;
                    if (encrypt.comparePassword(plainPassword, dbPassword)) {
                        const token = tokenEncode(doc.email, doc.id);
                        return response.status(SUCCESS).json({
                            message: messageReader.readMessage("user", "welcome") + doc.name,
                            name: doc.name,
                            email: doc.email,
                            token: token,
                            id: doc.id
                        });
                    }
                    else {
                        return response.status(RESOURCE_NOT_FOUND).json({ message: messageReader.readMessage("user", "invalid") });
                    }
                }
                else {
                    return response.status(RESOURCE_NOT_FOUND).json({ message: messageReader.readMessage("user", "notexist") });
                }
            })
        } catch (error) {
            return response.json({ message: error.message });
        }

    },
    async findUser(userid) {
        return await UserModel.findById(userid);
    },
    // update user poll 
    updatePoll(userid, pollid) {
        return UserModel.findByIdAndUpdate({ _id: userid }, { polls: pollid }).exec();
    },
    // update password
    updatePassword(userObject, response) {
        UserModel.findOne({ email: userObject.email }, (err, doc) => {
            if (err) {
                response.status(SERVER_ERROR).json({ message: messageReader.readMessage("user", "signinerror") + err });
            }
            else if (doc && doc.email) {
                let dbPassword = doc.password;
                let plainPassword = userObject.password;
                if (encrypt.comparePassword(plainPassword, dbPassword)) {
                    userObject.newPassword = encrypt.hashPassword(userObject.newPassword);
                    UserModel.updateOne({ "email": userObject.email }, { password: userObject.newPassword }, (error, doc) => {
                        if (error) {
                            response.status(SERVER_ERROR).json({ message: messageReader.readMessage("user", "updatefail") });
                        }
                        else {
                            response.status(SUCCESS).json({ message: messageReader.readMessage("user", "updatesuccess") });
                        }
                    });
                }
                else {
                    response.status(RESOURCE_NOT_FOUND).json({ message: messageReader.readMessage("user", "invalid") });
                }
            }
            else {
                response.status(RESOURCE_NOT_FOUND).json({ message: messageReader.readMessage("user", "invalid") });
            }
        })
    },

    // user remove
    remove() {
    },
    // remove references
    removeRef(userid, pollid) {
        // UserModel.findById(userid);
    },
    // show user polls
    async showUserPolls(userid) {
        return await UserModel.findById(userid).populate("polls").exec();
    }
}