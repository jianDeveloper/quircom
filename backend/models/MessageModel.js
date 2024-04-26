const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  requestId: {
    type: Schema.Types.ObjectId,
    ref: 'request'
  },
  sender: {
    type: Schema.Types.ObjectId,
    refPath: 'senderType'
  },
  senderType: {
    type: String,
    required: true,
    enum: ['client', 'freelancer']
  },
  receiver: {
    type: Schema.Types.ObjectId,
    refPath: 'receiverType'
  },
  receiverType: {
    type: String,
    required: true,
    enum: ['client', 'freelancer']
  },
  message: {
    type: String
  },
  attachment: {
    id: {type: String},
    name: {type: String},
    link: {type: String},
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("message", MessageSchema);
