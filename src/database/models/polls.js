const { SchemaTypes } = require("mongoose");
const connection = require("../connection");
const Schema = connection.Schema;

const optionSchema = new Schema({
  option: { type: SchemaTypes.String, required: true },
  votes: { type: SchemaTypes.Number, default: 0 },
});

const question_set = new Schema({
  id: { type: SchemaTypes.Number, required: true, unique: true },
  question: { type: SchemaTypes.String, required: true },
  image: { type: SchemaTypes.String },
  options: [{ type: optionSchema, required: true }],
  answer: { type: SchemaTypes.String, required: false },
  createdOn: { type: SchemaTypes.Date, default: Date.now() },
  endDate: {
    type: SchemaTypes.Date,
    required: true,
    default: Date.now() + 24 * 60 * 60 * 1000,
  },
});

// const pollSchema=new Schema({
//     'id':{type:SchemaTypes.Number, required:true, unique:true},
//     'title':{type:SchemaTypes.String, required:true, unique:true},
//     'description':{type:SchemaTypes.String, required:true},
//     'cover':{type:SchemaTypes.String},
//     'created_date':{type:SchemaTypes.Date, default:new Date(), required:true},
//     'start_date':{type:SchemaTypes.Date, required:true},
//     'end_date':{type:SchemaTypes.Date, required:true},
//     'status':{type:SchemaTypes.Boolean},
//     'question_set':[{type:question_set, required:true}],
//     'voted':[{type:SchemaTypes.ObjectId,required:true, unique:true, ref:'users'}],
//     'user':{type:SchemaTypes.ObjectId, ref:'users'}
// });

const pollSchema = new Schema({
  uid: { type: SchemaTypes.String, required: true, unique: true },
  question: { type: SchemaTypes.String, required: true },
  options: [{ type: optionSchema }],
  image: { type: SchemaTypes.String, default: "" },
  created_date: { type: SchemaTypes.Date, default: new Date(), required: true },
  expiry_date: {
    type: SchemaTypes.Date,
    default: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    required: true,
  },
  voted: [{ type: SchemaTypes.ObjectId, unique: true, ref: "users" }],
  user: { type: SchemaTypes.ObjectId, ref: "users" },
});

const PollModel = connection.model("polls", pollSchema);

module.exports = PollModel;
