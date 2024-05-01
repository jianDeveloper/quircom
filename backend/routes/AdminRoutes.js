const express = require("express");
const router = express.Router();
const requireAuth = require('../utils/requireAuth')

const {
  GetAllAdminWithAuth,
  GetSpecificAdminWithAuth,
  CreateAdminWithAuth,
  UpdateAdminWithAuth,
  DeleteAdminWithAuth,
} = require("../controllers/AdminController.js");

// Routes for Service
router.use(requireAuth);
router.get("/", GetAllAdminWithAuth);
router.get("/:id", GetSpecificAdminWithAuth);
router.post("/create", CreateAdminWithAuth);
router.patch("/edit/:id", UpdateAdminWithAuth);
router.delete("/delete/:id", DeleteAdminWithAuth);

module.exports = router;
