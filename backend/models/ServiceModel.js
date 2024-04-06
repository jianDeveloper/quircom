const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  serviceType: {
    type: String,
    default: "",
    required: true
  },
  freelancerId: {
    type: Schema.Types.ObjectId, 
    ref: 'freelancer'
  },
  progLang : {
    type: String,
    default: "",
  },
  Date : {
    type: new Date()
  }
});

module.exports = mongoose.model("service", ServiceSchema);