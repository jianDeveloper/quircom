const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReqServiceSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "client",
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: "service"
  },
  deadline: {
    type: Date,
    default: "",
    required: true,
  },
});

module.exports = mongoose.model("request", ReqServiceSchema);