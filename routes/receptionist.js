const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");
const Doctor = require("../models/Doctor");
// Get pending appointments
router.get("/appointments/confirmed", async (req, res) => {
  try {
    const appointments = await Appointment.find({ status: "confirmed" })
      .populate("patientId", "name")
      .populate({
        path: "doctorId",
        select: "name",
        model: "User",
      });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/appointments/completed", async (req, res) => {
  try {
    const appointments = await Appointment.find({ status: "completed" })
      .populate("patientId", "name")
      .populate({
        path: "doctorId",
        select: "name",
        model: "User",
      });

    // Fetch prescription details for each appointment
    const appointmentsWithPrescriptions = await Promise.all(
      appointments.map(async (appointment) => {
        const prescription = await Prescription.findOne({
          appointmentId: appointment._id,
        }).select("medicines tests notes -_id");

        // Convert to plain object and add prescription details
        const appointmentObj = appointment.toObject();
        appointmentObj.prescription = prescription || null;

        return appointmentObj;
      })
    );

    res.json(appointmentsWithPrescriptions);
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
// Checkout patient with bill generation
router.put("/appointments/:id/checkout", async (req, res) => {
  try {
    const { billAmount, medicines, tests, otherCharges, notes } = req.body;

    // Validate required fields
    if (!billAmount || !medicines) {
      return res
        .status(400)
        .json({ error: "Bill amount and medicines are required" });
    }

    // 1. Update Prescription with bill details
    const prescription = await Prescription.findOneAndUpdate(
      { appointmentId: req.params.id }, // Match prescription by appointmentId
      {
        completedAt: new Date(),
        bill: {
          amount: billAmount,
          medicines: medicines || [],
          tests: tests || [],
          otherCharges: otherCharges || 0,
        },
        notes: notes || "",
      },
      { new: true }
    );

    if (!prescription) {
      return res.status(404).json({ error: "Prescription not found" });
    }

    // 2. Update Appointment status to "completed"
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id, // Directly use the appointment _id
      {
        status: "completed",
        completedAt: new Date(),
      },
      { new: true }
    );

    res.json({
      prescription,
      appointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const User = require("../models/User");

// Approve doctor
router.put("/doctors/:id/approve", async (req, res) => {
  try {
    console.log(req.params);
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/doctors/pending", async (req, res) => {
  try {
    // First find all doctors with approved: false
    const pendingDoctors = await Doctor.find({ approved: false });

    // Then get their user details
    const pendingDoctorsWithDetails = await Promise.all(
      pendingDoctors.map(async (doctor) => {
        const user = await User.findById(doctor.userId);
        return {
          _id: doctor._id,
          userId: doctor.userId,
          specialization: doctor.specialization,
          // availableSlots: doctor.availableSlots,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      })
    );

    res.json(pendingDoctorsWithDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/doctors/pending", async (req, res) => {
  try {
    // First find all doctors with approved: false
    const pendingDoctors = await Doctor.find({ approved: true });

    // Then get their user details
    const pendingDoctorsWithDetails = await Promise.all(
      pendingDoctors.map(async (doctor) => {
        const user = await User.findById(doctor.userId);
        return {
          _id: doctor._id,
          userId: doctor.userId,
          specialization: doctor.specialization,
          availableSlots: doctor.availableSlots,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      })
    );

    res.json(pendingDoctorsWithDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
