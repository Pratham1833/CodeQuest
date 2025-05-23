const express = require("express");
const router = express.Router();
const Question = require("../models/Question"); // Replace with your Question model

// Fetch a random question for a course
router.get("/random", async (req, res) => {
  try {
    const { course } = req.query;
    const randomQuestion = await Question.aggregate([
      { $match: { course } },
      { $sample: { size: 1 } },
    ]);
    if (randomQuestion.length > 0) {
      res.json({ success: true, question: randomQuestion[0].text });
    } else {
      res.json({ success: false, message: "No questions available for this course." });
    }
  } catch (err) {
    console.error("Error fetching random question:", err);
    res.status(500).json({ success: false, message: "Failed to fetch random question." });
  }
});

module.exports = router;
