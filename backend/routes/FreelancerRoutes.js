const express = require("express");
const router = express.Router();
const upload = require("../config/Multer.js");
const requireAuth = require('../utils/requireAuth')

const {
  GetAllUsers,
  GetSpecificUser,
  CreateUser,
  EditUser,
  EditPortfolio,
  DeleteUser,
  ValidateUserData
} = require("../controllers/FreelancerController.js");

router.use(requireAuth);
router.get("/", GetAllUsers);
router.get("/:id", GetSpecificUser);
router.post("/upload", upload.single("file"), CreateUser);
router.patch("/update/:id", upload.single("file"), EditUser);
router.patch("/update/portfolio/:id", upload.array("files", 5), EditPortfolio);
router.delete("/delete/:id", DeleteUser);
router.post("/validate", ValidateUserData);

module.exports = router;