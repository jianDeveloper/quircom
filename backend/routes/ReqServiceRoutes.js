const express = require("express");
const router = express.Router();
const upload = require("../config/Multer.js");
const requireAuth = require('../utils/requireAuth')

const {
    GetAllRequest,
    GetSpecificRequest,
    CreateRequest,
    EditRequest,
    SubmitFeedback,
    VerifyRequest,
    DeleteRequest
} = require("../controllers/ReqServiceController.js");

// Routes for Service
router.get("/", GetAllRequest);
router.get("/:id", GetSpecificRequest);
// router.use(requireAuth);
router.post("/create", /*upload.array("files", 5),*/ CreateRequest);
router.patch("/edit/:id", /*upload.array("files", 5),*/ EditRequest);
router.patch("/feedback/:id", SubmitFeedback);
router.patch("/verify/:id", VerifyRequest);
router.delete("/delete/:id", DeleteRequest);

module.exports = router;
