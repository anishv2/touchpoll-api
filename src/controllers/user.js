const userManage=require('../database/repository/user_manage');
const messageReader = require('../utils/i18n/message_reader');
const {SUCCESS,SERVER_ERROR}=require('../utils/constants/appconstants').STATUS_CODES;

module.exports={
    register(req,res){
        const userObj=req.body;
        // req.header('Access-Control-Allow-Origin','*');
        return userManage.add(userObj,res);
    },
     signin(req,res){
        const userObj=req.body;
        const result=userManage.find(userObj,res);
        return result;
    },
    changePassword(req,res){
        const userObj=req.body;
        userObj.email=req.decode.email;
        return userManage.updatePassword(userObj,res);
    }

}