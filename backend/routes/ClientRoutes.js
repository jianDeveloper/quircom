const express = require("express");
const router = express.Router();

const {
  GetAllUsers,
  GetSpecificUser,
  CreateUser,
  EditUser,
  DeleteUser,
<<<<<<< Updated upstream:backend/routes/UserRoutes.js
} = require("../controllers/UserController");
=======
  ValidateUserData
} = require("../controllers/ClientController.js");
>>>>>>> Stashed changes:backend/routes/ClientRoutes.js

router.get("/", GetAllUsers);
router.get("/:id", GetSpecificUser);
router.post("/", CreateUser);
router.patch("/:id", EditUser);
router.delete("/:id", DeleteUser);

module.exports = router;