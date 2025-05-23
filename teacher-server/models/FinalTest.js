const mongoose = require("mongoose");

const FinalTest = new mongoose.Schema({
  courseName: { type: String, required: true },
  rollNumber: { type: String, required: true },
  name: { type: String, required: true },
  remainingChanges: { type: Number, default: 2 },
  changeCount: { type: Number, default: 0 },
  marksDeducted: { type: Number, default: 0 },
  startTime: { type: Date, required: true },
  submitted: { type: Boolean, default: false }
}, { timestamps: true });

FinalTest.index({ rollNumber: 1, courseName: 1 }, { unique: true });

module.exports = mongoose.model("FinalTest", FinalTest);
