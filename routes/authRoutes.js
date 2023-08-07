const express = require("express");
const {
  registerController,
  loginController,
  currentUserController,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Registser || POST
router.post("/register", registerController);

// Login || POST
router.post("/login", loginController);

// GET Current User

router.get("/current-user", authMiddleware, currentUserController);

module.exports = router;