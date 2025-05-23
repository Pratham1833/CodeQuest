const mongoose = require("mongoose");

const testStartedNewSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  rollNumber: { type: String, required: true },
  name: { type: String, required: true },
  remainingChanges: { type: Number, default: 2 },
  changeCount: { type: Number, default: 0 },
  marksDeducted: { type: Number, default: 0 },
  startTime: { type: Date, required: true },
  submitted: { type: Boolean, default: false },
  submissionReason: { type: String, default: "" }  // Reason for submission
}, { timestamps: true });

// Ensure using the correct collection name
module.exports = mongoose.model("TestStartedNew", testStartedNewSchema, "finalteststarteds");
