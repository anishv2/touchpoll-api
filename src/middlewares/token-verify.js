const messageReader = require('../utils/i18n/message_reader');
const {tokenDecode}=require('../utils/token');
const {UNAUTHORIZE} = require('../utils/constants/appconstants').STATUS_CODES;


const tokenVerify=(req, res, next)=>{
    const token=req.headers['authorization'];
    const isVerified=tokenDecode(token,req);
    if(isVerified){
        next();
    }
    else {
        res.status(UNAUTHORIZE).json({message:messageReader.readMessage("user","unauthorize")})
    }
}

module.exports=tokenVerify;