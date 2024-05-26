const express = require("express");
const router = express.Router();
const upload = require("../config/Multer.js");
const requireAuth = require('../utils/requireAuth')

const {
  GetAllUsersWithAuth,
  GetSpecificUserWithAuth,
  CreateUser,
  EditUserWithAuth,
  DeleteUserWithAuth,
  SubscriptionStatusWithAuth,
  EditBillingWithAuth,
  VerifyUserWithAuth,
  ValidateUserData,
} = require("../controllers/ClientController.js");

router.post("/upload", upload.single("file"), CreateUser);
router.use(requireAuth);
router.get("/", GetAllUsersWithAuth);
router.get("/:id", GetSpecificUserWithAuth);
router.patch("/update/:id", upload.single("file"), EditUserWithAuth);
router.patch("/status/:id", SubscriptionStatusWithAuth);
router.patch("/billing/:id", EditBillingWithAuth)
router.patch("/verify/:id", VerifyUserWithAuth);
router.delete("/delete/:id", DeleteUserWithAuth);
router.post("/validate", ValidateUserData);

module.exports = router;