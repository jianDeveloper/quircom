const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    default: "",
    index: true,
    uppercase: true,
    required: true,
  },
  middleName: {
    type: String,
    default: "",
    index: true,
    uppercase: true,
    required: true,
  },
  lastName: {
    type: String,
    default: "",
    index: true,
    uppercase: true,
    required: true,
  },
});

module.exports = mongoose.model("users", UserSchema);