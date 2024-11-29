// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const {
  validateSignup,
  validateLogin,
} = require("../middleware/validationMiddleware");

router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);

module.exports = router;