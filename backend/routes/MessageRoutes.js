const express = require("express");
const router = express.Router();
const upload = require("../config/Multer.js");
const requireAuth = require('../utils/requireAuth')

const {
  GetMessage,
  GetSpecificMessage,
  CreateMessage,
  DeleteMessage,
} = require("../controllers/MessageController.js");

router.get("/", GetMessage);
router.get("/:id", GetSpecificMessage);
router.post("/create", upload.single("file"), CreateMessage);
router.delete("/delete/:id", DeleteMessage);

module.exports = router;