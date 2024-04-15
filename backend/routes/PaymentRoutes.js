const express = require("express");
const router = express.Router();

const {
    GetAllCredit,
    GetSpecificCredit,
    CreateCredit,
    EditCredit,
    DeleteCredit
} = require("../controllers/PaymentController.js");

// Routes for Service
router.get("/", GetAllCredit);
router.get("/:id", GetSpecificCredit);
router.post("/create", CreateCredit);
router.patch("/edit/:id", EditCredit);
router.delete("/delete/:id", DeleteCredit);

module.exports = router;
