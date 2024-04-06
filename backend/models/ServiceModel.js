const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  thumbNail: {
    id: {type: String},
    name: {type: String},
    link: {type: String}
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
  reviews:{
    type: String,
    default: "",
  },
  freelancerId: {
    type: Schema.Types.ObjectId, 
    ref: 'freelancer'
  },
  dateUploaded : {
    type: new Date()
  },
});

module.exports = mongoose.model("service", ServiceSchema);