const mongoose = require("mongoose");
const FreelancerModel = require("../models/FreelancerModel");
const ClientModel = require("../models/ClientModel");

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
    console.error('Error validating user data:', error);
    res.status(500).json({ message: 'Internal server error' });
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
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  ValidateUserData,
  LoginUser
};