const express = require("express");
const router = express.Router();
const upload = require("../config/Multer.js");
const requireAuth = require('../utils/requireAuth')

const {
  GetAllUsers,
  GetSpecificUserWithAuth,
  CreateUserWithAuth,
  EditUserWithAuth,
  DeleteUserWithAuth,
  SubscriptionStatusWithAuth,
  EditBillingWithAuth,
  ValidateUserData,
} = require("../controllers/ClientController.js");

router.use(requireAuth);
router.get("/", GetAllUsers);
router.get("/:id", GetSpecificUserWithAuth);
router.post("/upload", upload.single("file"), CreateUserWithAuth);
router.patch("/update/:id", upload.single("file"), EditUserWithAuth);
router.patch("/status/:id", SubscriptionStatusWithAuth);
router.patch("/billing/:id", EditBillingWithAuth)
router.delete("/delete/:id", DeleteUserWithAuth);
router.post("/validate", ValidateUserData);

module.exports = router;