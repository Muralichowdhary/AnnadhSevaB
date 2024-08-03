const express = require("express");
const {
  loginUser,
  registerUser
} = require("../controllers/user.controller");
const router = express.Router();

// Admin Routes
router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
