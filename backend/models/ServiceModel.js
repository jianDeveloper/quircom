const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  thumbNail: {
    id: {type: String},
    name: {type: String},
    link: {type: String}
  },
  serviceId:{
    type: Number,
    default: "",
  },
  serviceName: {
    type: String,
    default: "",
    required: true
  },
  serviceType: {
    type: String,
    default: "",
    required: true
  },
  serviceSubCat: [{
    type: String,
    default: "",
    required: true
  }],
  serviceInfo: {
    type: String,
    default: "",
    required: true,
  },
  price: {
    type: String,
    default: "",
    required: true,
  },
  requestId:[{
    type: Schema.Types.ObjectId,
    ref: 'request'
  }],
  freelancerId: {
    type: Schema.Types.ObjectId, 
    ref: 'freelancer'
  },
  dateUploaded : {
    type: Date,
    default: Date.now
  },
  dateUpdated : {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("service", ServiceSchema);