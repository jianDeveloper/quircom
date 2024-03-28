const User = require('../models/UserModel'); // Assuming you have a User model

// Function to handle user login
const loginUser = async (req, res) => {
    const { eMail, passWord } = req.body;

    try {
        // Find the user in the database
        const user = await User.findOne({ userName: eMail });
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
                firstName: user.firstName,
                lastName: user.lastName,
                // Include any other user data you need
                accType: user.accType, // Include the accType here            
                _id: user._id 
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

module.exports = { loginUser };
