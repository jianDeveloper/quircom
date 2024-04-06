const mongoose = require("mongoose");
const FreelancerModel = require("../models/FreelancerModel");
const ClientModel = require("../models/ClientModel");

const LoginUser = async (req, res) => {
  try {
    const { userName, passWord } = req.body;

    // Perform parallel database queries to check for existing data in both collections
    const userChecks = await Promise.all([
      FreelancerModel.findOne({ userName, passWord }),
      ClientModel.findOne({ userName, passWord })
    ]);

    // Extract user data from the checks
    const freelancerUser = userChecks[0];
    const clientUser = userChecks[1];

    // If user is found in freelancer collection
    if (freelancerUser) {
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
  LoginUser
};
