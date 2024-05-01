const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  admin: {
    type: String,
    default: "",
    required: true
  },
  password: {
    type: String,
    default: "",
    required: true
  }
});

module.exports = mongoose.model("admin", AdminSchema);
