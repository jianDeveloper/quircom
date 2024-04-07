const express = require('express');
const router = express.Router();

// Import your authentication controller
const { ValidateUserData, LoginUser, ForgotPassword, ResetPassword } = require('../controllers/Validate');

// Define routes for user authentication
router.post('/validate', ValidateUserData);
router.post('/login', LoginUser);
router.post('/forgotpass', ForgotPassword);
router.patch('/resetpass/:id', ResetPassword);

module.exports = router;
