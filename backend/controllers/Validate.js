const mongoose = require("mongoose");
const FreelancerModel = require("../models/FreelancerModel");
const ClientModel = require("../models/ClientModel");
const jwt = require("jsonwebtoken");
const mailer = require("nodemailer")

const transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_SENDER,
    pass: process.env.GMAIL_PASSWORD
  }
});

const ValidateUserData = async (req, res) => {
  try {
    const { userName, eMail, contactNum } = req.body;

    // Perform parallel database queries to check for existing data in both collections
    const checks = await Promise.all([
      FreelancerModel.findOne({ $or: [{ userName }, { eMail }, { contactNum }] }),
      ClientModel.findOne({ $or: [{ userName }, { eMail }, { contactNum }] })
    ]);

    // checks[0] will contain the result from FreelancerModel, and checks[1] from ClientModel
    const freelancerUser = checks[0];
    const clientUser = checks[1];

    // If any of the fields exist in either collection, respond accordingly
    if (freelancerUser || clientUser) {
      const userId = freelancerUser ? freelancerUser._id : clientUser ? clientUser._id : null;
      return res.status(200).json({
        exists: true,
        userId
      });
    }

    // If none of the fields exist in either collection, proceed
    res.status(200).json({ exists: false });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { userName, passWord } = req.body;

    // Perform parallel database queries to check for existing data in both collections
    const userChecks = await Promise.all([
      FreelancerModel.findOne({ userName }),
      ClientModel.findOne({ userName })
    ]);

    // Extract user data from the checks
    const freelancerUser = userChecks[0];
    const clientUser = userChecks[1];

    // If user is found in freelancer collection
    if (freelancerUser) {
      const femail = freelancerUser.eMail;
      const authToken = jwt.sign({femail}, process.env.SECRET_KEY, {expiresIn: '1h'})
      // Check if password matches
      if (freelancerUser.passWord !== passWord) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      return res.status(200).json({
        message: 'Login successful',
        user: {
          _id: freelancerUser._id,
          accType: 'freelancer'
        },
        authToken
      });
    }

    // If user is found in client collection
    if (clientUser) {
      const cemail = clientUser.eMail;
      const authToken = jwt.sign({cemail}, process.env.SECRET_KEY, {expiresIn: '1h'})
      // Check if password matches
      if (clientUser.passWord !== passWord) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      return res.status(200).json({
        message: 'Login successful',
        user: {
          _id: clientUser._id,
          accType: 'client'
        },
        authToken
      });
    }

    // If user is not found in either collection, return error
    res.status(404).json({ message: 'User not found' });
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

const ForgotPassword = async (req, res) => {
  try {
    const { eMail } = req.body;

    // Perform parallel database queries to check for existing data in both collections
    const userChecks = await Promise.all([
      FreelancerModel.findOne({ eMail }),
      ClientModel.findOne({ eMail })
    ]);

    // Extract user data from the checks
    const freelancerUser = userChecks[0];
    const clientUser = userChecks[1];

    // If user is found in freelancer collection
    if (freelancerUser) {
      const authToken = jwt.sign({eMail}, process.env.SECRET_KEY, {expiresIn: '5m'})
      const username = freelancerUser.userName;
      const id = freelancerUser._id;
  
      // Direct URL of the company logo image
      const companyLogoUrl = 'https://drive.google.com/uc?id=1wc0kK6tHtpDCuPszIRimda3xX_Ctd9bG';
  
      // HTML content with embedded image and username
      const htmlContent = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Password Reset</title>
          </head>
          <body style="font-family: Arial, sans-serif;">
  
              <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; color: #000; font-size: 16px;">
                  <img src="${companyLogoUrl}" alt="Company Logo" style="max-width: 200px; margin: 0 auto 20px; display: block;">
                  <h2 style="margin-bottom: 20px; text-align: center; color: #000;">Password Reset</h2>
                  <p>${username}, We have received a request to reset your password. If you did not make this request, please ignore this email.</p>
                  <p style="text-align: center;">To reset your password, click the button below:</p>
                  <p style="text-align: center;">
                      <a href="hhttp://localhost:5173/resetpass/${id}" style="display: inline-block; padding: 10px 20px; background-color: rgb(234, 88, 12); color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
                  </p>
                  <p>If you did not request a password reset, no further action is required.</p>
                  <p>Thank you,</p>
                  <p>QUIRCOM</p>
              </div>
  
          </body>
          </html>`;
  
      // Sending email without attachment and disable reply to this email
      await transporter.sendMail({
          from: process.env.GMAIL_SENDER,
          to: freelancerUser.eMail,
          subject: "Reset Password",
          html: htmlContent,
          replyTo: '', // Set an empty reply-to address to disable reply functionality
          disableReplyTo: true
      });
      res.status(201).json({ message: "An email has been sent into your account", authToken });
    }

    // If user is found in client collection
    if (clientUser) {
      const authToken = jwt.sign({ eMail }, process.env.SECRET_KEY, { expiresIn: '5m' });
      const username = clientUser.userName;
      const id = clientUser._id;
  
      // Direct URL of the company logo image
      const companyLogoUrl = 'https://drive.google.com/uc?id=1wc0kK6tHtpDCuPszIRimda3xX_Ctd9bG';
  
      // HTML content with embedded image and username
      const htmlContent = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Password Reset</title>
          </head>
          <body style="font-family: Arial, sans-serif;">
  
              <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; color: #000; font-size: 16px;">
                  <img src="${companyLogoUrl}" alt="Company Logo" style="max-width: 200px; margin: 0 auto 20px; display: block;">
                  <h2 style="margin-bottom: 20px; text-align: center; color: #000;">Password Reset</h2>
                  <p>${username}, We have received a request to reset your password. If you did not make this request, please ignore this email.</p>
                  <p style="text-align: center;">To reset your password, click the button below:</p>
                  <p style="text-align: center;">
                      <a href="http://localhost:5173/resetpass/${id}" style="display: inline-block; padding: 10px 20px; background-color: rgb(234, 88, 12); color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
                  </p>
                  <p>If you did not request a password reset, no further action is required.</p>
                  <p>Thank you,</p>
                  <p>QUIRCOM</p>
              </div>
  
          </body>
          </html>`;
  
      // Sending email without attachment and disable reply to this email
      await transporter.sendMail({
          from: process.env.GMAIL_SENDER,
          to: clientUser.eMail,
          subject: "Reset Password",
          html: htmlContent,
          replyTo: '', // Set an empty reply-to address to disable reply functionality
          disableReplyTo: true
      });
      res.status(201).json({ message: "An email has been sent into your account", authToken });
  }
  
   
  if (!freelancerUser && !clientUser) {
    // Send error response indicating user not found
    res.status(404).json({ message: "User not found" });
  }
  } catch (error) {
    res.status(404).json({ message: error.message});
  }
};

const ResetPassword = async(req, res) => {
  try{
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({ message: "Invalid ID" });
    }

    // Search for the user in both collections using $or operator
    const user = await Promise.all([
      FreelancerModel.findOne({ _id: id }),
      ClientModel.findOne({ _id: id })
    ]);

    const freelancerUser = user[0];
    const clientUser = user[1];

    if (freelancerUser) {
      // Update password for freelancer user
      const { passWord } = req.body;
      freelancerUser.passWord = passWord;
      await freelancerUser.save();
      return res.status(200).json({ message: "Password reset successfully for freelancer user" });
    }

    if (clientUser) {
      // Update password for client user
      const { passWord } = req.body;
      clientUser.passWord = passWord;
      await clientUser.save();
      return res.status(200).json({ message: "Password reset successfully for client user" });
    }

    // If user is not found in either collection, return error
    res.status(404).json({ message: 'User not found' });

  } catch (error) {
    res.status(404).json({ message: error.message});
  }
}

module.exports = {
  ValidateUserData,
  LoginUser,
  ForgotPassword,
  ResetPassword
};