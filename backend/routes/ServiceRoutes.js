const express = require("express");
const router = express.Router();
const upload = require("../config/Multer.js");

const {
    GetAllServices,
    GetSpecificService,
    CreateService,
    EditService,
    DeleteService
} = require("../controllers/ServiceController.js");

// Routes for Service
router.get("/", GetAllServices);
router.get("/:id", GetSpecificService);
router.post("/create", upload.single("file"), CreateService);
router.patch("/edit/:id", upload.single("file"), EditService);
router.delete("/delete/:id", DeleteService);

module.exports = router;
