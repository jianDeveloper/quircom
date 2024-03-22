const express = require('express');
const router = express.Router();

// Import your authentication controller
const { loginUser, logoutUser } = require('../controllers/UserLoginController');

// Define routes for user authentication
router.post('/login', loginUser);
router.post('/logout', logoutUser);

module.exports = router;
