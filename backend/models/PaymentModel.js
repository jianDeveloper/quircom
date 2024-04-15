const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId, 
    ref: 'client'
  },
  firstName: {
    type: String,
    default: "",
    required: true
  },
  surName: {
    type: String,
    default: "",
    required: true
  },
  cardNum: {
    type: Number,
    default: "",
    required: true
  },
  expireDate: {
    type: Date,
    default: "",
    required: true
  },
  cvv: {
    type: Number,
    default: "",
    required: true,
  },
  aggRee: {
    type: Boolean,
    default: false,
    required: true
  }
});

module.exports = mongoose.model("payment", PaymentSchema);