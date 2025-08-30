const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("../utils/validator");
const User = require("../models/user");
// ✅ Admin Registration
const registerAdmin = async (req, res) => {
  try {
    const { error } = validator({ ...req.body, role: "admin" }); // force role=admin
    if (error) return res.status(400).json({ error: error.details.map(e => e.message) });

    const { firstName, lastName, emailId, age, password } = req.body;

    const existingUser = await User.findOne({ emailId });
    if (existingUser) return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new User({
      firstName,
      lastName,
      emailId,
      age,
      role: "admin",   // always admin here
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const admin = await User.findOne({ emailId, role: "admin" }); // check role

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, role: admin.role });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { registerAdmin, loginAdmin };
