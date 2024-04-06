const mongoose = require("mongoose");
const Client = require('../models/ClientModel');
const Freelancer = require('../models/FreelancerModel');

// Function to handle user login
const LoginUser = async (req, res) => {
    try {
      const { userName, passWord } = req.body;
  
      // Check if the user exists in the freelancer collection
      let user = await Freelancer.findOne({ userName, passWord });
      let accType = 'freelancer';
  
      // If not found in freelancer collection, check client collection
      if (!user) {
        user = await Client.findOne({ userName, passWord });
        accType = 'client';
      }
  
      // If user not found in either collection, return error
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // User found, return user data along with accType and _id
      res.status(200).json({
        message: 'Login successful',
        user: {
          _id: user._id,
          accType
        }
      });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// Function to handle user logout (if needed)
// const logoutUser = async (req, res) => {
//     // Perform any logout actions if necessary
//     res.status(200).json({ message: 'Logout successful' });
// };

module.exports = { LoginUser };
