const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  firstName: {
    type: String,
    default: "",
    index: true,
    required: true,
  },
  surName: {
    type: String,
    default: "",
    index: true,
    required: true,
  },
  userName: {
    type: String,
    default: "",
    index: true,
    required: true,
  },
  eMail: {
    type: String,
    default: "",
    index: true,
    required: true,
  },
  passWord: {
    type: String,
    default: "",
    index: true,
    required: true,
  },
  contactNum: {
    type: Number,
    default: "",
    required: true,
  },
  region: {
    type: String,
    default: "",
    index: true,
    required: true,
  },
  province: {
    type: String,
    default: "",
    index: true,
    required: true,
  },
  city: {
    type: String,
    default: "",
    index: true,
    required: true,
  },
  accType: {
    type: String,
    default: "",
    index: true,
    required: true
  },
  aggRee:{
    type: Boolean,
    default: "",
    index: true,
    required: true,
  },
});

module.exports = mongoose.model("client", ClientSchema);