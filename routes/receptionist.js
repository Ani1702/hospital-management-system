const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Get pending appointments
router.get("/appointments/pending", async (req, res) => {
  try {
    const appointments = await Appointment.find({ status: "pending" })
      .populate("patientId", "name")
      .populate("doctorId", "userId")
      .populate("doctorId.userId", "name");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Confirm appointment
router.put("/appointments/:id/confirm", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "confirmed" },
      { new: true }
    );

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check-in patient
router.put("/appointments/:id/checkin", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status: "checked-in",
        checkedInAt: new Date(),
      },
      { new: true }
    );

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Checkout patient
router.put("/appointments/:id/checkout", async (req, res) => {
  try {
    const { billAmount, medicines, tests, otherCharges } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status: "completed",
        completedAt: new Date(),
        bill: {
          amount: billAmount,
          medicines,
          tests,
          otherCharges,
        },
      },
      { new: true }
    );

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
