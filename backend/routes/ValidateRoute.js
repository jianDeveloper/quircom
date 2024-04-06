const express = require('express');
const router = express.Router();

// Import your authentication controller
const { ValidateUserData, LoginUser } = require('../controllers/Validate');

// Define routes for user authentication
router.post('/validate', ValidateUserData);
router.post('/login', LoginUser);

module.exports = router;
