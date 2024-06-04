const express = require("express");
const router = express.Router();
const upload = require("../config/Multer.js");
const requireAuth = require('../utils/requireAuth')

const {
    GetAllRequestWithAuth,
    GetSpecificRequestWithAuth,
    CreateRequestWithAuth,
    EditRequestWithAuth,
    SubmitFeedbackWithAuth,
    VerifyRequestWithAuth,
    ReportRequestWithAuth,
    ContractCRequestWithAuth,
    ContractFRequestWithAuth,
    DeleteRequestWithAuth
} = require("../controllers/ReqServiceController.js");

// Routes for Service
router.use(requireAuth);
router.get("/", GetAllRequestWithAuth);
router.get("/:id", GetSpecificRequestWithAuth);
router.post("/create", /*upload.array("files", 5),*/ CreateRequestWithAuth);
router.patch("/edit/:id", /*upload.array("files", 5),*/ EditRequestWithAuth);
router.patch("/feedback/:id", SubmitFeedbackWithAuth);
router.patch("/verify/:id", VerifyRequestWithAuth);
router.patch("/report/:id", ReportRequestWithAuth);
router.patch("/contractC/:id", ContractCRequestWithAuth);
router.patch("/contractF/:id", ContractFRequestWithAuth);
router.delete("/delete/:id", DeleteRequestWithAuth);

module.exports = router;
