const express = require("express");
const router = express.Router();
const axios = require("axios");

const {
  startTest,
  changeQuestion,
  getTestDetails,
  getStudentsForCourse,
  submitTest,
} = require("../controllers/testController");

const TestStartedNew = require("../models/TestStartedNew"); // ✅ Import the model

// Start a test
router.post("/start-test", startTest);

// Change the test question
router.post("/change-question", changeQuestion);

// Get test details
router.get("/:testId", getTestDetails);

// Submit test endpoint
router.put("/submit", submitTest);

// Get students for a course (teacher view)
router.get("/get-students-started/:courseName", getStudentsForCourse);

// Run code using Piston API
router.post("/run-code", async (req, res) => {
  const { language, code, input } = req.body;
  try {
    const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language,
      source: code,
      stdin: input,
    });
    res.json({ output: response.data.run.output });
  } catch (error) {
    console.error("Error running code:", error);
    res.status(500).json({ error: "Error executing code" });
  }
});

module.exports = router;
