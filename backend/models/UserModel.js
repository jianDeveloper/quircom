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
  surName: {
    type: String,
    default: "",
    index: true,
    uppercase: true,
    required: true,
  },
  userName: {
    type: String,
    default: "",
    index: true,
    uppercase: true,
    required: true,
  },
  eMail: {
    type: String,
    default: "",
    index: true,
    uppercase: true,
    required: true,
  },
  passWord: {
    type: String,
    default: "",
    index: true,
    uppercase: true,
    required: true,
  },
  contactNum: {
    type: Number,
    default: "",
    index: true,
    uppercase: true,
    required: true,
  },
  country: {
    type: String,
    default: "",
    index: true,
    uppercase: true,
    required: true,
  },
  accType: {
    type: String,
    default: "",
    index: true,
    uppercase: true,
    required: true,
  },
  aggRee:{
    type: Boolean,
    default: "",
    index: true,
    uppercase: true,
    required: true,
  },
});

module.exports = mongoose.model("users", UserSchema);