const mongoose = require("mongoose");
const FreelancerModel = require("../models/FreelancerModel");
const ClientModel = require("../models/ClientModel");
const AdminModel = require("../models/AdminModel");
const jwt = require("jsonwebtoken");
const mailer = require("nodemailer");
const requireAuth = require("../utils/requireAuth");

const transporter = mailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_SENDER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const ValidateUserData = async (req, res) => {
  try {
    const { userName, eMail, contactNum } = req.body;

    // Perform individual checks for each field
    const userNameUser =
      (await FreelancerModel.findOne({ userName })) ||
      (await ClientModel.findOne({ userName }));
    const eMailUser =
      (await FreelancerModel.findOne({ eMail })) ||
      (await ClientModel.findOne({ eMail }));
    const contactNumUser =
      (await FreelancerModel.findOne({ contactNum })) ||
      (await ClientModel.findOne({ contactNum }));

    res.status(200).json({
      userName: {
        exists: !!userNameUser,
        userId: userNameUser ? userNameUser._id : null,
      },
      eMail: {
        exists: !!eMailUser,
        userId: eMailUser ? eMailUser._id : null,
      },
      contactNum: {
        exists: !!contactNumUser,
        userId: contactNumUser ? contactNumUser._id : null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { userName, passWord } = req.body;

    const userChecks = await Promise.all([
      FreelancerModel.findOne({ userName }),
      ClientModel.findOne({ userName }),
    ]);

    const freelancerUser = userChecks[0];
    const clientUser = userChecks[1];

    if (freelancerUser) {
      const authToken = jwt.sign(
        { _id: freelancerUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "5d" }
      );
      const emailToken = jwt.sign(
        { _id: freelancerUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "3m" }
      );
      if (freelancerUser.passWord !== passWord) {
        return res.status(401).json({ message: "Invalid password" });
      }
      return res.status(200).json({
        message: "Login successful",
        user: {
          _id: freelancerUser._id,
          accType: "freelancer",
          verify: freelancerUser.verify,
        },
        authToken,
        emailToken,
      });
    }

    if (clientUser) {
      const authToken = jwt.sign(
        { _id: clientUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "5d" }
      );
      const emailToken = jwt.sign(
        { _id: clientUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "3m" }
      );
      if (clientUser.passWord !== passWord) {
        return res.status(401).json({ message: "Invalid password" });
      }
      return res.status(200).json({
        message: "Login successful",
        user: {
          _id: clientUser._id,
          accType: "client",
          verify: clientUser.verify,
        },
        authToken,
        emailToken,
      });
    }

    // If user is not found in either collection, return error
    res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const LoginAdmin = async (req, res) => {
  try {
    const { admin, password } = req.body;

    // Check if the admin exists
    const foundAdmin = await AdminModel.findOne({ admin });
    if (!foundAdmin) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct
    if (foundAdmin.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const authToken = jwt.sign(
      { _id: foundAdmin._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: foundAdmin._id,
      },
      authToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const ForgotPassword = async (req, res) => {
  try {
    const { eMail } = req.body;

    // Perform parallel database queries to check for existing data in both collections
    const userChecks = await Promise.all([
      FreelancerModel.findOne({ eMail }),
      ClientModel.findOne({ eMail }),
    ]);

    // Extract user data from the checks
    const freelancerUser = userChecks[0];
    const clientUser = userChecks[1];

    // If user is found in freelancer collection
    if (freelancerUser) {
      const emailToken = jwt.sign(
        { _id: freelancerUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "5m" }
      );
      const username = freelancerUser.userName;
      const id = freelancerUser._id;

      // Direct URL of the company logo image
      const companyLogoUrl =
        "https://drive.google.com/uc?id=1wc0kK6tHtpDCuPszIRimda3xX_Ctd9bG";

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
                      <a href="https://quircom.netlify.app/reset-pass/${id}" style="display: inline-block; padding: 10px 20px; background-color: rgb(234, 88, 12); color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
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
        replyTo: "", // Set an empty reply-to address to disable reply functionality
        disableReplyTo: true,
      });
      res.status(201).json({
        message: "An email has been sent into your account",
        emailToken,
      });
    }

    // If user is found in client collection
    if (clientUser) {
      const emailToken = jwt.sign(
        { _id: clientUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "5m" }
      );
      const username = clientUser.userName;
      const id = clientUser._id;

      // Direct URL of the company logo image
      const companyLogoUrl =
        "https://drive.google.com/uc?id=1wc0kK6tHtpDCuPszIRimda3xX_Ctd9bG";

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
                      <a href="https://quircom.netlify.app/reset-pass/${id}" style="display: inline-block; padding: 10px 20px; background-color: rgb(234, 88, 12); color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
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
        replyTo: "", // Set an empty reply-to address to disable reply functionality
        disableReplyTo: true,
      });
      res.status(201).json({
        message: "An email has been sent into your account",
        emailToken,
      });
    }

    if (!freelancerUser && !clientUser) {
      // Send error response indicating user not found
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const EmailVerification = async (req, res) => {
  try {
    const { eMail } = req.body;

    const userChecks = await Promise.all([
      FreelancerModel.findOne({ eMail }),
      ClientModel.findOne({ eMail }),
    ]);

    const freelancerUser = userChecks[0];
    const clientUser = userChecks[1];

    if (freelancerUser) {
      const emailToken = jwt.sign(
        { _id: freelancerUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "3m" }
      );
      const username = freelancerUser.firstName + " " + freelancerUser.surName;
      const id = freelancerUser._id;

      const companyLogoUrl =
        "https://drive.google.com/uc?id=1wc0kK6tHtpDCuPszIRimda3xX_Ctd9bG";

      const verificationLink = `https://quircom.netlify.app/verify-success/${id}?token=${emailToken}`;

      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
        </head>
        <body style="font-family: Arial, sans-serif;">
        
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; color: #000; font-size: 16px;">
                <img src="${companyLogoUrl}" alt="Company Logo" style="max-width: 200px; margin: 0 auto 20px; display: block;">
                <h2 style="margin-bottom: 20px; text-align: center; color: #000;">Email Verification</h2>
                <p>${username}, thank you for registering with our service. Please verify your email address to complete your registration.</p>
                <p style="text-align: center;">To verify your email, click the button below:</p>
                <p style="text-align: center;">
                    <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: rgb(234, 88, 12); color: #fff; text-decoration: none; border-radius: 5px;">Verify Email</a>
                </p>
                <p>If you did not create an account, no further action is required.</p>
                <p>Thank you,</p>
                <p>QUIRCOM</p>
            </div>
        
        </body>
        </html>`;

      // Sending email without attachment and disable reply to this email
      await transporter.sendMail({
        from: process.env.GMAIL_SENDER,
        to: freelancerUser.eMail,
        subject: "Email Verification",
        html: htmlContent,
        replyTo: "", // Set an empty reply-to address to disable reply functionality
        disableReplyTo: true,
      });
      res.status(201).json({
        message: "An email has been sent into your account",
        emailToken,
      });
    }

    if (clientUser) {
      const emailToken = jwt.sign(
        { _id: clientUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "3m" }
      );
      const username = clientUser.firstName + " " + clientUser.surName;
      const id = clientUser._id;

      const companyLogoUrl =
        "https://drive.google.com/uc?id=1wc0kK6tHtpDCuPszIRimda3xX_Ctd9bG";

        const verificationLink = `https://quircom.netlify.app/verify-success/${id}?token=${emailToken}`;

        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
        </head>
        <body style="font-family: Arial, sans-serif;">
        
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; color: #000; font-size: 16px;">
                <img src="${companyLogoUrl}" alt="Company Logo" style="max-width: 200px; margin: 0 auto 20px; display: block;">
                <h2 style="margin-bottom: 20px; text-align: center; color: #000;">Email Verification</h2>
                <p>${username}, thank you for registering with our service. Please verify your email address to complete your registration.</p>
                <p style="text-align: center;">To verify your email, click the button below:</p>
                <p style="text-align: center;">
                    <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: rgb(234, 88, 12); color: #fff; text-decoration: none; border-radius: 5px;">Verify Email</a>
                </p>
                <p>If you did not create an account, no further action is required.</p>
                <p>Thank you,</p>
                <p>QUIRCOM</p>
            </div>
        
        </body>
        </html>`;

      await transporter.sendMail({
        from: process.env.GMAIL_SENDER,
        to: clientUser.eMail,
        subject: "Email Verification",
        html: htmlContent,
        replyTo: "",
        disableReplyTo: true,
      });
      res.status(201).json({
        message: "An email has been sent into your account",
        emailToken,
      });
    }

    if (!freelancerUser && !clientUser) {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const ResetPassword = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid ID" });
    }

    requireAuth(req, res, async () => {
      const user = await Promise.all([
        FreelancerModel.findOne({ _id: id }),
        ClientModel.findOne({ _id: id }),
      ]);

      const freelancerUser = user[0];
      const clientUser = user[1];

      if (freelancerUser) {
        const { passWord } = req.body;
        freelancerUser.passWord = passWord;
        await freelancerUser.save();
        return res
          .status(200)
          .json({ message: "Password reset successfully for freelancer user" });
      }

      if (clientUser) {
        const { passWord } = req.body;
        clientUser.passWord = passWord;
        await clientUser.save();
        return res
          .status(200)
          .json({ message: "Password reset successfully for client user" });
      }

      // If user is not found in either collection, return error
      res.status(404).json({ message: "User not found" });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  ValidateUserData,
  LoginUser,
  LoginAdmin,
  ForgotPassword,
  ResetPassword,
  EmailVerification,
};
