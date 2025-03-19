const { SchemaTypes } = require("mongoose");
const connection = require("../connection");
const Schema = connection.Schema;

const userSchema = new Schema({
  name: { type: SchemaTypes.String, required: true },
  email: { type: SchemaTypes.String, required: true, unique: true },
  password: { type: SchemaTypes.String, required: true },
  created: { type: SchemaTypes.Date, default: new Date(), required: true },
  polls: [{ type: SchemaTypes.ObjectId, ref: "polls" }],
});

const UserModel = connection.model("users", userSchema);

module.exports = UserModel;
