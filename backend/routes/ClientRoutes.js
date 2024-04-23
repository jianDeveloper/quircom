const express = require("express");
const router = express.Router();
const upload = require("../config/Multer.js");
const requireAuth = require('../utils/requireAuth')

const {
  GetAllUsers,
  GetSpecificUser,
  CreateUser,
  EditUser,
  DeleteUser,
  ValidateUserData,
  SubscriptionStatus
} = require("../controllers/ClientController.js");

router.use(requireAuth);
router.get("/", GetAllUsers);
router.get("/:id", GetSpecificUser);
router.post("/upload", upload.single("file"), CreateUser);
router.patch("/update/:id", upload.single("file"), EditUser);
router.patch("/status/:id", SubscriptionStatus);
router.delete("/delete/:id", DeleteUser);
router.post("/validate", ValidateUserData);

module.exports = router;