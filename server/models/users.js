const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  userName: {type: String, required: true},
  password: {type: String, required: true},
  contactNum: {type: Number, required: true},
  country: {type: String, required: true},
  email: {type: String, required: true},
  accType: {type:String, required: true}
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY)
}