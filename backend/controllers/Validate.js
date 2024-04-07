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
    const userNameExists = checks.some(result => result && result.userName === userName);
    const eMailExists = checks.some(result => result && result.eMail === eMail);
    const contactNumExists = checks.some(result => result && result.contactNum === contactNum);

    // If any of the fields exist in either collection, respond accordingly
    if (userNameExists || eMailExists || contactNumExists) {
      return res.status(200).json({
        exists: true,
        userNameExists,
        eMailExists,
        contactNumExists,
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
      // Check if password matches
      if (freelancerUser.passWord !== passWord) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      return res.status(200).json({
        message: 'Login successful',
        user: {
          _id: freelancerUser._id,
          accType: 'freelancer'
        }
      });
    }

    // If user is found in client collection
    if (clientUser) {
      // Check if password matches
      if (clientUser.passWord !== passWord) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      return res.status(200).json({
        message: 'Login successful',
        user: {
          _id: clientUser._id,
          accType: 'client'
        }
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
      const authToken = jwt.sign({eMail}, process.env.JWT_KEY, {expiresIn: '5m'})
      await transporter.sendMail({
        from: process.env.GMAIL_SENDER,
        to: freelancerUser.eMail,
        subject: "Reset Password",
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset</title>
        </head>
        <body style="font-family: Arial, sans-serif;">
        
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
                <h2>Password Reset</h2>
                <p>We received a request to reset your password. If you did not make this request, please ignore this email.</p>
                <p>To reset your password, click the button below:</p>
                <p style="text-align: center;">
                    <a href=`` style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
                </p>
                <p>If you're having trouble clicking the "Reset Password" button, copy and paste the following link into your browser:</p>
                <p>RESET_LINK_HERE</p>
                <p>If you did not request a password reset, no further action is required.</p>
                <p>Thank you,</p>
                <p>Your Company Name</p>
            </div>
        
        </body>
        </html>`
      })
      // ${freelancerUser._id}
      res.status(201).json({ message: "An email has been sent into your account", authToken })
    }

    // If user is found in client collection
    if (clientUser) {
      const authToken = jwt.sign({eMail}, process.env.JWT_KEY, {expiresIn: '5m'})
      await transporter.sendMail({
        from: process.env.GMAIL_SENDER,
        to: clientUser.eMail,
        subject: "Reset Password",
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset</title>
        </head>
        <body style="font-family: Arial, sans-serif;">
        
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
                <h2>Password Reset</h2>
                <p>We received a request to reset your password. If you did not make this request, please ignore this email.</p>
                <p>To reset your password, click the button below:</p>
                <p style="text-align: center;">
                    <a href="RESET_LINK_HERE" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
                </p>
                <p>If you're having trouble clicking the "Reset Password" button, copy and paste the following link into your browser:</p>
                <p>RESET_LINK_HERE</p>
                <p>If you did not request a password reset, no further action is required.</p>
                <p>Thank you,</p>
                <p>Your Company Name</p>
            </div>
        
        </body>
        </html>`
      })

      res.status(201).json({ message: "An email has been sent into your account", authToken })
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