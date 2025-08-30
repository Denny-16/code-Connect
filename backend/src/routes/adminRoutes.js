const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/adminAuthentication");
const { authMiddleware, adminOnly } = require("../middlewares/authMiddleware");

const routes = express.Router();

// Public routes for admins
routes.post("/register", registerAdmin);
routes.post("/login", loginAdmin);

// Example protected route for admins only
routes.get("/dashboard", authMiddleware, adminOnly, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the admin dashboard",
    admin: req.user,
  });
});

module.exports = routes;
