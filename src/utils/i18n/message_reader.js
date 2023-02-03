const fs=require('fs');
const path=require('path');
const DEFAULT_LANG = require('../constants/appconstants').DEFAULT_LANG


module.exports={
    messageObject:null,
    readMessageFile(){
        const fullPath=path.join(__dirname,DEFAULT_LANG+'.json');
        const buffer=fs.readFileSync(fullPath); // read JSON file
        this.messageObject=JSON.parse(buffer.toString()); // convert JSON into object
    },
    readMessage(key1,key2){
        if(this.messageObject==null){
            this.readMessageFile();
        }
        return this.messageObject[key1][key2]
    }
}