const express = require("express");
const router = express.Router();
const upload = require("../config/Multer.js");
const requireAuth = require('../utils/requireAuth')

const {
  GetMessageWithAuth,
  GetSpecificMessageWithAuth,
  CreateMessageWithAuth,
  DeleteMessageWithAuth,
} = require("../controllers/MessageController.js");

router.use(requireAuth)
router.get("/", GetMessageWithAuth);
router.get("/:id", GetSpecificMessageWithAuth);
router.post("/create", upload.single("file"), CreateMessageWithAuth);
router.delete("/delete/:id", DeleteMessageWithAuth);

module.exports = router;