const express = require("express");
const router = express.Router();
const upload = require("../config/Multer.js");
const requireAuth = require('../utils/requireAuth')

const {
  GetAllUsersWithAuth,
  GetSpecificUserWithAuth,
  CreateUser,
  EditUserWithAuth,
  EditPortfolioWithAuth,
  VerifyUserWithAuth,
  DeleteUserWithAuth,
  ValidateUserData,
  AddRatingWithAuth
} = require("../controllers/FreelancerController.js");

router.post("/upload", upload.single("file"), CreateUser);
router.use(requireAuth);
router.get("/", GetAllUsersWithAuth);
router.get("/:id", GetSpecificUserWithAuth);
router.patch("/update/:id", upload.single("file"), EditUserWithAuth);
router.patch("/update/portfolio/:id", upload.single("file"), EditPortfolioWithAuth);
router.patch("/verify/:id", VerifyUserWithAuth);
router.patch("/rating/:id", AddRatingWithAuth)
router.delete("/delete/:id", DeleteUserWithAuth);
router.post("/validate", ValidateUserData);

module.exports = router;