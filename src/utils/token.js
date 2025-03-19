const jwt = require('jsonwebtoken');
const secretKey=process.env.JWT_KEY;
let tokenObject = {
    tokenEncode(email,id) {
    const dt=new Date();
        const token = jwt.sign({ email,id}, secretKey,{
            algorithm:'HS256',
            expiresIn:'6h'
        });
        return token;
    },
   tokenDecode(token,req) {
        try {
            const decode = jwt.verify(token, secretKey);
            if (decode && decode.id) {
                req.decode=decode;
                return true;
            }
            else {
                return false;
            }
        }
        catch(err){
            console.log('catch error', err);
            return false;
        }
    }
}

module.exports = tokenObject;
