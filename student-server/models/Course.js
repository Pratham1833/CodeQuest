
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  testEnabled: { type: Boolean, default: false },
});

module.exports = mongoose.model("Course", courseSchema);
