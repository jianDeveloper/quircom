const express = require('express');
const router = express.Router();

// Import your authentication controller
const { LoginUser } = require('../controllers/UserLoginController');

// Define routes for user authentication
router.post('/verification', LoginUser);


module.exports = router;
