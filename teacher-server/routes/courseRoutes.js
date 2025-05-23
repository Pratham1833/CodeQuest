const express = require("express");
const { 
  addCourse, 
  startTest, 
  getCourses, 
  deleteCourse, 
  getCourseQuestions, 
  deleteQuestion 
} = require("../controllers/courseController");

const router = express.Router();

router.post("/add", addCourse);
router.put("/:courseId/start-test", startTest);
router.get("/", getCourses);
router.delete("/:courseId", deleteCourse);

// ✅ New Routes for Managing Questions
router.get("/:courseName/questions", getCourseQuestions);
router.delete("/:courseName/questions/:questionId", deleteQuestion);

module.exports = router;
