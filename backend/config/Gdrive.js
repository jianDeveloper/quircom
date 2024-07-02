const { google } = require("googleapis");
const dotenv = require("dotenv");

dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

const JWTClient = new google.auth.JWT(
  process.env.CLIENT_EMAIL,
  null,
  process.env.CLIENT_PRIVATE_KEY,
  SCOPES
);

JWTClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Google Authorization Complete");
  }
});

module.exports = JWTClient;