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
    required: true,
  },
  contactNum: {
    type: Number,
    default: "",
    index: true,
    required: true,
  },
  region: {
    type: String,
    default: "",
    required: true,
  },
  province: {
    type: String,
    default: "",
    required: true,
  },
  city: {
    type: String,
    default: "",
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
    default: false,
    required: true,
  },
  profilePic: {
    id: {type: String, required: true},
    name: {type: String, required: true},
    link: {type: String},
  },
  userInfo:{
    type: String,
    default: "",
  },
  subs:{
    status: {
      type: Boolean,
      default: false
    },
    dateSubscribed: {
      type: Date,
      default: ""
    }, 
  },
  paymentId: [{
    type: Schema.Types.ObjectId, 
    ref: 'payment'
  }]
});

module.exports = mongoose.model("client", ClientSchema);