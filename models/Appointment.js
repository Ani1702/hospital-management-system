const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  reason: { type: String, required: true },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "confirmed", "checked-in", "completed"],
  },
  checkedInAt: { type: Date },
  completedAt: { type: Date },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
