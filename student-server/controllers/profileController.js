const Student = require("../models/User");

// Get Student Profile
const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.user.email }).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student profile:", error);
    res.status(500).json({ message: "Server error fetching profile" });
  }
};

// Update Student Profile
const updateStudentProfile = async (req, res) => {
  try {
    const { name, rollNumber } = req.body;
    const student = await Student.findOne({ email: req.user.email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (name) student.name = name;
    if (rollNumber) student.rollNumber = rollNumber;

    await student.save();
    res.status(200).json({ message: "Profile updated successfully", student });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error updating profile" });
  }
};

// Upload Profile Picture using Multer
const uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const profilePicUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    const student = await Student.findOneAndUpdate(
      { email: req.user.email },
      { profilePic: profilePicUrl },
      { new: true }
    );

    res.status(200).json({ profilePicUrl, student });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ message: "Server error uploading profile picture" });
  }
};

module.exports = { getStudentProfile, updateStudentProfile, uploadProfilePic };
