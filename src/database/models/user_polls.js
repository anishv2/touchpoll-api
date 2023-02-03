const { SchemaTypes } = require('mongoose');
const connection = require('../connection');
const Schema = connection.Schema;

const userPollSchema = new Schema({
    'userid':{type:SchemaTypes.ObjectId, ref:'users'},
    'main_pollid':{type:SchemaTypes.ObjectId, required:true, ref:'polls'},
    'title':{type:String, required:true},
    'answers':{type:SchemaTypes.Array, required:true},
    'submitted':{type:SchemaTypes.Date, default:new Date(), required:true},
    'vote':{type:SchemaTypes.Boolean, required:true}
})

const UserPollModel = connection.model('userPolls', userPollSchema);

module.exports = UserPollModel;
