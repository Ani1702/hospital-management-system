const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");

// Get doctor's appointments
router.get("/appointments/:doctorId", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.params.doctorId,
      status: { $in: ["confirmed", "checked-in"] },
    }).populate("patientId", "name");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create prescription
router.post("/prescriptions", async (req, res) => {
  try {
    const { appointmentId, doctorId, patientId, medicines, tests, notes } =
      req.body;

    const prescription = new Prescription({
      appointmentId,
      doctorId,
      patientId,
      medicines,
      tests,
      notes,
    });

    await prescription.save();

    // Update appointment status
    await Appointment.findByIdAndUpdate(appointmentId, { status: "completed" });

    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add available slots
router.post("/slots/:doctorId", async (req, res) => {
  try {
    const { date, time } = req.body;

    await Doctor.findByIdAndUpdate(req.params.doctorId, {
      $push: { availableSlots: { date, time, isBooked: false } },
    });

    res.status(201).json({ message: "Slot added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
