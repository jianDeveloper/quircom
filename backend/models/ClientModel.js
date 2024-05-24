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
  verify:{
    type: Boolean,
    default: false
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
    dateExpire: {
      type: Date,
      default: ""
    }
  },
  billing: {
    amount: {
      type: Number,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    refNum: {
      type: String,
      default: "",
    },
    paymentNum: {
      type: Number,
      default: "", 
    },
    paymentMethod: {
      type: String,
      default: "",
    }
  }
});

module.exports = mongoose.model("client", ClientSchema);