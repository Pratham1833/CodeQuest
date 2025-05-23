const Student = require("../models/User");

// Get student profile
const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.userId).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.error("Error fetching student profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update student profile
const updateStudentProfile = async (req, res) => {
  const { name, rollNumber } = req.body;
  try {
    const student = await Student.findById(req.user.userId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (name) student.name = name;
    if (rollNumber) student.rollNumber = rollNumber;

    await student.save();
    res.json({ message: "Profile updated successfully", student });
  } catch (error) {
    console.error("Error updating student profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getStudentProfile, updateStudentProfile };
