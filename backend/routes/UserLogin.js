const express = require('express');
const router = express.Router();

// Import your authentication controller
const { 
  loginUser, 
} = require('../controllers/UserLoginController');

// Define routes for user authentication
router.post('/login', loginUser);

module.exports = router;
