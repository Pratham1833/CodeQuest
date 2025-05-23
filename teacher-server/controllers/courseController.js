const Course = require("../models/Courses");
const CourseQuestion = require("../models/CoursesQuestion"); // ✅ Import Questions Model

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    console.log("Courses fetched for Teacher:", courses);
    res.status(200).json(courses);
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};


const addCourse = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: "Course name and description are required." });
  }

  try {
    const newCourse = new Course({ name, description, isTestActive: false, testEnabled: false });
    await newCourse.save();
    res.status(201).json({ message: "Course added successfully!", course: newCourse });
  } catch (error) {
    res.status(500).json({ message: "Failed to add course" });
  }
};


const startTest = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findByIdAndUpdate(
      courseId,
      { isTestActive: true, testEnabled: true },
      { new: true }
    );

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.status(200).json({ message: "Test started successfully for the course", course });
  } catch (error) {
    res.status(500).json({ message: "Failed to start test for course" });
  }
};

// ✅ Delete Course
const deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete course" });
  }
};

// ✅ Fetch all questions for a course
const getCourseQuestions = async (req, res) => {
  const { courseName } = req.params;
  try {
    const courseQuestions = await CourseQuestion.findOne({ courseName });

    if (!courseQuestions) {
      return res.status(404).json({ message: "No questions found for this course." });
    }

    res.status(200).json(courseQuestions.questions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch questions." });
  }
};

// ✅ Delete a specific question from a course
const deleteQuestion = async (req, res) => {
  const { courseName, questionId } = req.params;

  try {
    const courseQuestions = await CourseQuestion.findOne({ courseName });

    if (!courseQuestions) {
      return res.status(404).json({ message: "Course not found." });
    }

    courseQuestions.questions = courseQuestions.questions.filter((q, index) => index.toString() !== questionId);
    await courseQuestions.save();

    res.status(200).json({ message: "Question deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete question." });
  }
};

module.exports = { 
  getCourses, 
  addCourse, 
  startTest, 
  deleteCourse, 
  getCourseQuestions, 
  deleteQuestion 
};
