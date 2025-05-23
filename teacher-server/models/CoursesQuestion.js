// models/CourseQuestion.js
const mongoose = require("mongoose");

const courseQuestionsSchema = new mongoose.Schema({
  courseName: { type: String, required: true, unique: true },
  questions: [{ type: String, required: true }],
});

module.exports = mongoose.model("CourseQuestion", courseQuestionsSchema);
