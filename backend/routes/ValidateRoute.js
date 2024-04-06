const express = require('express');
const router = express.Router();

// Import your authentication controller
const { ValidateUserData } = require('../controllers/Validate');

// Define routes for user authentication
router.post('/validate', ValidateUserData);

module.exports = router;
