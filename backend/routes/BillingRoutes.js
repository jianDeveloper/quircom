const express = require("express");
const router = express.Router();

const {
    GetAllBilling,
    GetSpecificBilling,
    CreateBilling,
    EditBilling,
    DeleteBilling
} = require("../controllers/BillingController.js");

// Routes for Service
router.get("/", GetAllBilling);
router.get("/:id", GetSpecificBilling);
router.post("/create", CreateBilling);
router.patch("/edit/:id", EditBilling);
router.delete("/delete/:id", DeleteBilling);

module.exports = router;
