const express = require("express");
const router = express.Router();
const upload = require("../config/Multer.js");
const requireAuth = require('../utils/requireAuth')

const {
  GetMessageWithAuth,
  GetMessageWithPollingWithAuth,
  GetSpecificMessageWithAuth,
  CreateMessageWithAuth,
  DownloadAttachmentWithAuth,
  DeleteMessageWithAuth,
} = require("../controllers/MessageController.js");

router.use(requireAuth)
router.get("/", GetMessageWithAuth);
router.get("/message", GetMessageWithPollingWithAuth);
router.get("/:id", GetSpecificMessageWithAuth);
router.post("/create", upload.single("file"), CreateMessageWithAuth);
router.get("/download/:id", DownloadAttachmentWithAuth);
router.delete("/delete/:id", DeleteMessageWithAuth);

module.exports = router;