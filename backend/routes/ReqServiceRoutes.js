const express = require("express");
const router = express.Router();
const upload = require("../config/Multer.js");

const {
    GetAllRequest,
    GetSpecificRequest,
    CreateRequest,
    EditRequest,
    DeleteRequest
} = require("../controllers/ReqServiceController.js");

// Routes for Service
router.get("/", GetAllRequest);
router.get("/:id", GetSpecificRequest);
router.post("/create", /*upload.array("files", 5),*/ CreateRequest);
router.patch("/edit/:id", /*upload.array("files", 5),*/ EditRequest);
router.delete("/delete/:id", DeleteRequest);

module.exports = router;
