const mongoose = require ('mongoose');

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try{
    mongoose.connect(process.env.DB, connectionParams);
    console.log("Connected to database successfully");
  }catch(error){
    console.log(error);
    console.log("Could not connect to database!");
  }
}

const UserSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  uName: String,
  pass: String,
  contact: String,
  country: String,
  email: String,
  accType: String,
  agrmnt: String
})
