const CourseQuestion = require("../models/CoursesQuestion");

const addQuestion = async (req, res) => {
  try {
    let { courseName, question } = req.body;
    if (!courseName || !question) {
      return res.status(400).json({ success: false, message: "Course name and question are required." });
    }
    // Trim the course name for consistency
    courseName = courseName.trim();
    let course = await CourseQuestion.findOne({ courseName });
    if (!course) {
      course = new CourseQuestion({ courseName, questions: [question] });
    } else {
      course.questions.push(question);
    }
    await course.save();
    return res.status(201).json({ success: true, message: "Question added successfully." });
  } catch (error) {
    console.error("Error adding question:", error.message);
    return res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
};

const getQuestions = async (req, res) => {
  try {
    let { courseName } = req.params;
    if (!courseName) {
      return res.status(400).json({ success: false, message: "Course name is required." });
    }
    courseName = courseName.trim();
    const course = await CourseQuestion.findOne({ courseName });
    if (!course) {
      return res.status(404).json({ success: false, message: "No questions found for this course." });
    }
    return res.status(200).json({ success: true, questions: course.questions });
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    return res.status(500).json({ success: false, message: "Failed to fetch questions." });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    let { courseName, questionId } = req.params;
    if (!courseName || questionId === undefined) {
      return res.status(400).json({ success: false, message: "Course name and question ID are required." });
    }
    courseName = courseName.trim();
    const course = await CourseQuestion.findOne({ courseName });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found." });
    }
    // Since questions are stored as plain strings, we assume questionId is the index (string) of the question.
    const index = parseInt(questionId, 10);
    if (isNaN(index) || index < 0 || index >= course.questions.length) {
      return res.status(400).json({ success: false, message: "Invalid question ID." });
    }
    course.questions.splice(index, 1);
    await course.save();
    return res.status(200).json({ success: true, message: "Question deleted successfully." });
  } catch (error) {
    console.error("Error deleting question:", error.message);
    return res.status(500).json({ success: false, message: "Failed to delete question." });
  }
};

module.exports = { addQuestion, getQuestions, deleteQuestion };
