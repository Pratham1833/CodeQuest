// const mongoose = require("mongoose");

// const testStartedNewSchema = new mongoose.Schema({
//   rollNumber: { type: String, required: true },
//   name: { type: String, required: true },
//   courseName: { type: String, required: true },
//   question: { type: String, required: true },
//   remainingChanges: { type: Number, default: 2 },
//   changeCount: { type: Number, default: 0 },
//   marksDeducted: { type: Number, default: 0 },
//   startTime: { type: Date, required: true },
//   submitted: { type: Boolean, default: false },
//   submissionReason: { type: String, default: "" },
// }, { timestamps: true });

// testStartedNewSchema.index({ rollNumber: 1, courseName: 1 }, { unique: true });

// module.exports = mongoose.model("TestStartedNew", testStartedNewSchema);


const mongoose = require("mongoose");

const testStartedNewSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true },
  name: { type: String, required: true },
  courseName: { type: String, required: true },
  question: { type: String, required: true },
  remainingChanges: { type: Number, default: 2 },
  changeCount: { type: Number, default: 0 },
  marksDeducted: { type: Number, default: 0 },
  startTime: { type: Date, required: true },
  submitted: { type: Boolean, default: false },
  submissionReason: { type: String, default: "" },
  submittedCode: { type: String, default: "" }, // 🔥 new field
}, { timestamps: true });

testStartedNewSchema.index({ rollNumber: 1, courseName: 1 }, { unique: true });

module.exports = mongoose.model("FinalTestStarted", testStartedNewSchema);


