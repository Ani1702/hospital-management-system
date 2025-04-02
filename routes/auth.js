const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Receptionist = require("../models/Receptionist");

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, password, role, name, email, phone, specialization } =
      req.body;

    // Create user
    const user = new User({ username, password, role, name, email, phone });
    await user.save();

    // Create role-specific document
    if (role === "doctor") {
      const doctor = new Doctor({
        userId: user._id,
        specialization,
        approved: false, // Doctors need approval
      });
      await doctor.save();
    } else if (role === "receptionist") {
      const receptionist = new Receptionist({ userId: user._id });
      await receptionist.save();
    }

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = await User.findOne({ username, password, role });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // For doctors, check if approved
    if (role === "doctor") {
      const doctor = await Doctor.findOne({ userId: user._id });
      if (!doctor.approved) {
        return res.status(403).json({ error: "Doctor not approved yet" });
      }
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
