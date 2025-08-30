const User = require("../models/user");
const validator = require("../utils/validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ---------------- REGISTER ----------------

  // ---------------- REGISTER ----------------
const register = async (req, res) => {
  try {
    // force role = "user" for this route
    const { error, value } = validator({ ...req.body, role: "user" });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((err) => err.message),
      });
    }

    const existingUser = await User.findOne({ emailId: value.emailId });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(value.password, 10);
    value.password = hashedPassword;

    const user = await User.create(value);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        age: user.age,
        role: user.role, // always "user"
        problemSolved: user.problemSolved,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};


// ---------------- LOGIN ----------------
const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Find user
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },   // payload
      process.env.JWT_SECRET,              // secret key
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" } // expiry
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token, // ✅ send token to frontend
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// ---------------- LOGOUT ----------------
// Since JWT is stateless, logout is handled on the client by deleting the token.
// But we can still provide a route to instruct client to remove token.
const logout = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Logged out successfully. Please remove token from client.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// ---------------- GET PROFILE ----------------
const getProfile = async (req, res) => {
  try {
    // req.user is set by authMiddleware
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = { register, login, logout, getProfile };
