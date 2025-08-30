const express = require("express");
const { register, login, logout, getProfile } = require("../controllers/userAuthentication");
const { authMiddleware } = require("../middlewares/authMiddleware");  // <-- FIX

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.post("/logout", authMiddleware, logout);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
