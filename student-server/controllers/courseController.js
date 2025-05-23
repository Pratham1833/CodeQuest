const Course = require('../models/Course');

// Add course to student database
const addCourse = async (req, res) => {
  const { courseName } = req.body;

  try {
    const newCourse = new Course({ name: courseName, testEnabled: false });
    await newCourse.save();
    res.status(201).json({ message: "Course added to student database" });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const getCoursesWithTestStatus = async (req, res) => {
  try {
    const courses = await Course.find({}); // Fetch all courses

    const updatedCourses = courses.map(course => ({
      ...course._doc,
      testEnabled: course.isTestActive // ✅ Ensure testEnabled reflects isTestActive
    }));

    res.status(200).json({ courses: updatedCourses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Error fetching courses" });
  }
};


// Fetch all courses for the student dashboard
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Error fetching courses" });
  }
};

module.exports = { addCourse, getCourses };
