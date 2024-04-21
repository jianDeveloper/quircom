const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReqServiceSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "client",
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: "service"
  },
  requestId:{
    type: Number,
    default: "",
  },
  status:{
    type: String,
    default: "",
  },
  taskTitle:{
    type: String,
    default: "",
    requred: ""
  },
  taskDetails:{
    type: String,
    default: "",
    requred: ""
  },
  // taskPicture: [{
  //   id: {type: String}, 
  //   name: {type: String}, 
  //   link: {type: String}
  // }],
  deadLine: {
    type: Date,
    default: "",
    required: true,
  },
  feedbackNum: {
    type: Number,
    default: 1
  },
  feedbackInfo:{
    type: String,
    default: ""
  },
  dateUploaded:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("request", ReqServiceSchema);