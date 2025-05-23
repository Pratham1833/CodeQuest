const TestStartedNew = require("../models/TestStartedNew");
const CourseQuestions = require("../models/coursequestions");

// Start a test
const startTest = async (req, res) => {
  const { rollNumber, name, courseName } = req.body;

  if (!rollNumber || !name || !courseName) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    const existingTest = await TestStartedNew.findOne({ rollNumber, courseName });
    if (existingTest) {
      return res.status(400).json({
        success: false,
        message: "This roll number has already started the test for this course.",
      });
    }

    const course = await CourseQuestions.findOne({ courseName: courseName.trim() });

    if (!course || course.questions.length === 0) {
      return res.status(404).json({ success: false, message: `No questions available for ${courseName}` });
    }

    const randomIndex = Math.floor(Math.random() * course.questions.length);
    const selectedQuestion = course.questions[randomIndex];

    const newTest = await TestStartedNew.create({
      name,
      rollNumber,
      courseName,
      question: selectedQuestion,
      remainingChanges: 2,
      changeCount: 0,
      marksDeducted: 0,
      startTime: new Date(),
      submitted: false,
    });

    return res.status(200).json({
      success: true,
      message: "Test started successfully.",
      testId: newTest._id,
      question: newTest.question,
    });
  } catch (error) {
    console.error("Error starting test:", error.message);
    return res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

// Change the question
const changeQuestion = async (req, res) => {
  const { testId } = req.body;

  try {
    const test = await TestStartedNew.findById(testId);
    if (!test) return res.status(404).json({ success: false, message: "Test not found." });
    if (test.remainingChanges <= 0) {
      return res.status(400).json({ success: false, message: "No changes left." });
    }

    const course = await CourseQuestions.findOne({ courseName: test.courseName.trim() });
    if (!course || course.questions.length <= 1) {
      return res.status(400).json({ success: false, message: "No alternative questions available." });
    }

    let newQuestion;
    do {
      newQuestion = course.questions[Math.floor(Math.random() * course.questions.length)];
    } while (newQuestion === test.question);

    test.question = newQuestion;
    test.remainingChanges -= 1;
    test.changeCount += 1;
    test.marksDeducted += 5;
    await test.save();

    return res.status(200).json({
      success: true,
      message: "Question changed successfully.",
      test,
    });
  } catch (error) {
    console.error("Error changing question:", error.message);
    return res.status(500).json({ success: false, message: "Failed to change question." });
  }
};

// Get test details
const getTestDetails = async (req, res) => {
  try {
    const { testId } = req.params;
    const test = await TestStartedNew.findById(testId);
    if (!test) return res.status(404).json({ success: false, message: "Test not found." });

    return res.status(200).json({ success: true, test });
  } catch (error) {
    console.error("Error fetching test details:", error.message);
    return res.status(500).json({ success: false, message: "Failed to fetch test details." });
  }
};

// Get students who started a test for a course
const getStudentsForCourse = async (req, res) => {
  const { courseName } = req.params;
  try {
    const students = await TestStartedNew.find({ courseName }).sort({ rollNumber: 1 });
    if (!students.length) {
      return res.status(404).json({ message: "No students found for this course." });
    }

    const data = students.map(student => ({
      _id: student._id,
      rollNumber: student.rollNumber,
      name: student.name,
      changeCount: student.changeCount,
      submitted: student.submitted ? "Submitted" : "Not Submitted",
    }));

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching students:", error.message);
    res.status(500).json({ message: "Error fetching students." });
  }
};



const submitTest = async (req, res) => {
  try {
    const { testId, rollNumber, code, submissionReason } = req.body;

    console.log("Submit payload received:", { testId, rollNumber, submissionReason });

    const test = await TestStartedNew.findOne({ _id: testId, rollNumber });
    if (!test) {
      console.log("❌ Test not found for submission");
      return res.status(404).json({ message: "Student test record not found" });
    }

    test.submitted = true;
    test.submissionReason = submissionReason || "Submitted by student";
    test.submittedCode = code || ""; // Save the code even if empty
    test.submissionTime = new Date();

    await test.save();

    res.status(200).json({ message: "✅ Test submitted successfully", updatedTest: test });
  } catch (err) {
    console.error("❌ Error submitting test:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


module.exports = {
  startTest,
  changeQuestion,
  getTestDetails,
  getStudentsForCourse,
  submitTest,
};

