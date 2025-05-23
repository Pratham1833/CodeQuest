const Course = require("../models/Courses");
const TestStartedNew = require("../models/TestStartedNew");

const startTestForCourse = async (req, res) => {
  try {
    const { courseName } = req.params;
    const course = await Course.findOne({ name: courseName });
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }
    if (course.isTestActive) {
      return res.status(400).json({ message: "Test already started for this course." });
    }

    course.isTestActive = true;
    course.testEnabled = true;
    await course.save();
    res.status(200).json({ message: "Test started successfully." });
  } catch (error) {
    console.error("Error starting test:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getStudentsByCourse = async (req, res) => {
  try {
    const { course } = req.params;
    const students = await TestStartedNew.find({ courseName: course }).sort({ rollNumber: 1 });

    if (!students || students.length === 0) {
      return res.status(404).json({ message: "No students found for this course." });
    }

    const formattedData = students.map(student => ({
      _id: student._id,
      rollNumber: student.rollNumber,
      name: student.name,
      changeCount: student.changeCount || 0,
      submitted: student.submitted === true,
      submissionReason: student.submissionReason || "",
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students" });
  }
};




const deleteStudentRecord = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Find and delete the student from the TestStartedNew collection
    const student = await TestStartedNew.findByIdAndDelete(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json({ message: "Student record deleted, they can retake the test." });
  } catch (error) {
    console.error("Error deleting student record:", error);
    res.status(500).json({ message: "Error deleting student record" });
  }
};

module.exports = { deleteStudentRecord };


module.exports = { startTestForCourse, getStudentsByCourse , deleteStudentRecord  };
