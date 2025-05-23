const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  isTestActive: { type: Boolean, default: false }, // ✅ Teacher-side flag
  testEnabled: { type: Boolean, default: false }, // ✅ Student-side flag (Syncs with teacher-side flag)
  studentsStartedTest: [{ name: String, rollNumber: String }]
});

module.exports = mongoose.model("Course", courseSchema);
