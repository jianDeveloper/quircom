const express = require("express");
const router = express.Router();
const upload = require("../config/Multer.js");

const {
  GetAllUsers,
  GetSpecificUser,
  CreateUser,
  EditUser,
  DeleteUser,
  ValidateUserData
} = require("../controllers/ClientController.js");

router.get("/", GetAllUsers);
router.get("/:id", GetSpecificUser);
router.post("/upload", upload.single("file"), CreateUser);
router.patch("/update/:id", upload.single("file"), EditUser);
router.delete("/delete/:id", DeleteUser);
router.post("/validate", ValidateUserData);

module.exports = router;