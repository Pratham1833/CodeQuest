// models/StudentProfile.js
const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, ref: "User" },
  rollNumber: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePic: { type: String, default: "" }, // URL of profile picture
  testResults: [
    {
      courseName: String,
      testDate: Date,
      result: String,
      marksDeducted: Number,
      changeCount: Number,
    }
  ],
  discussionRoomLink: { type: String, default: "" }, // Optional link for discussion room
  // Any other fields you want...
}, { timestamps: true });

module.exports = mongoose.model("StudentProfile", studentProfileSchema);
