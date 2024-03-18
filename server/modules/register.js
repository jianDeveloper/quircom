const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  fName: {
    type: String,
    required: true
  },
  surName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  passWord: {
    type: String,
    required: true
  },
  contactNum: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  eMail: {
    type: String,
    required: true
  },
  accType: {
    type: String,
    required: true
  }
},{timeStamps: true});

const userReg = mongoose.model("userReg", contactSchema);

module.exports = userReg;

