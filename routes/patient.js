const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");

// Get available doctors by specialization
router.get("/doctors/:specialization", async (req, res) => {
  try {
    const doctors = await Doctor.find({
      specialization: req.params.specialization,
      approved: true,
    }).populate("userId", "name");

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get available slots for a doctor
router.get("/slots/:doctorId", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const availableSlots = doctor.availableSlots.filter(
      (slot) => !slot.isBooked
    );
    res.json(availableSlots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Book appointment
router.post("/appointments", async (req, res) => {
  try {
    const { patientId, doctorId, date, time, reason } = req.body;

    // Create appointment
    const appointment = new Appointment({
      patientId,
      doctorId,
      date,
      time,
      reason,
      status: "pending",
    });
    await appointment.save();

    // Mark slot as booked
    await Doctor.updateOne(
      {
        _id: doctorId,
        "availableSlots.date": date,
        "availableSlots.time": time,
      },
      { $set: { "availableSlots.$.isBooked": true } }
    );

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get patient appointments
router.get("/appointments/:patientId", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.params.patientId,
    })
      .populate("doctorId", "userId specialization")
      .populate("doctorId.userId", "name");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get patient prescriptions
router.get("/prescriptions/:patientId", async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      patientId: req.params.patientId,
    })
      .populate("doctorId", "userId")
      .populate("doctorId.userId", "name");

    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
