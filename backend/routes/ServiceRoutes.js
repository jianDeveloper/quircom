const express = require("express");
const router = express.Router();
const upload = require("../config/Multer.js");
const requireAuth = require("../utils/requireAuth");

const {
  GetAllServicesWithAuth,
  GetSpecificServiceWithAuth,
  CreateServiceWithAuth,
  EditServiceWithAuth,
  DeleteServiceWithAuth,
} = require("../controllers/ServiceController.js");

// Routes for Service
router.use(requireAuth);
router.get("/", GetAllServicesWithAuth);
router.get("/:id", GetSpecificServiceWithAuth);
router.post("/create", upload.single("file"), CreateServiceWithAuth);
router.patch("/edit/:id", upload.single("file"), EditServiceWithAuth);
router.delete("/delete/:id", DeleteServiceWithAuth);

module.exports = router;
