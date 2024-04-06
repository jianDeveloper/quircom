const mongoose = require("mongoose");
const Client = require('../models/ClientModel');
const Freelancer = require('../models/FreelancerModel');

// Function to handle user login
const LoginClient = async (req, res) => {
    const { userName, passWord } = req.body;

    try {
        // Find the user in the database
        const user = await Client.findOne({ userName: userName });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password matches the one stored in the database
        if (passWord !== user.passWord) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Return success message or user data if needed
        res.status(200).json({ 
            message: 'Login successful', 
            user: { 
                _id: user._id,
                accType: user.accType, // Include the accType here             
            } 
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const LoginFreelancer = async (req, res) => {
    const { userName, passWord } = req.body;

    try {
        // Find the user in the database
        const user = await Freelancer.findOne({ userName: userName });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password matches the one stored in the database
        if (passWord !== user.passWord) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Return success message along with user data and accType
        res.status(200).json({ 
            message: 'Login successful', 
            user: { 
                _id: user._id,
                accType: user.accType, // Include the accType here             
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

module.exports = { LoginClient, LoginFreelancer };
