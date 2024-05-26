const express = require("express");
const router = express.Router();
const requireAuth = require("../utils/requireAuth");

// Import your authentication controller
const {
  ValidateUserData,
  LoginUser,
  LoginAdmin,
  ForgotPassword,
  ResetPassword,
  EmailVerification
} = require("../controllers/Validate");

// Define routes for user authentication
router.post("/validate", ValidateUserData);
router.post("/forgotpass", ForgotPassword);
router.post("/verify", EmailVerification)
router.post("/login", LoginUser);
router.post("/login-admin", LoginAdmin);
router.use(requireAuth);
router.patch("/resetpass/:id", ResetPassword);


module.exports = router;
