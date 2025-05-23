const mongoose = require("mongoose");

const studentTestStartedSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: false },
  course: { type: String, required: true }, // e.g., "DSA"
  startTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model("StudentTestStarted", studentTestStartedSchema);
