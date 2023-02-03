const bcrypt=require('bcrypt');

module.exports={
    SALT:10,
    hashPassword(plainPassword){
        return bcrypt.hashSync(plainPassword,this.SALT);
    },
    comparePassword(plainPassword,dbPassword){
        return bcrypt.compareSync(plainPassword,dbPassword);
    }
}