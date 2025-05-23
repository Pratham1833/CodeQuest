const Student = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_jwt_secret_key"; // Use a strong secret in production

// Signup function
const signup = async (req, res) => {
  const { email, password, rollNumber } = req.body;

  try {
    // Validate email domain
    if (!email.endsWith("@pccoepune.org")) {
      return res.status(400).json({ message: "Email must end with @pccoepune.org" });
    }

    // Check if email or roll number already exists
    const existingEmail = await Student.findOne({ email });
    const existingRollNumber = await Student.findOne({ rollNumber });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (existingRollNumber) {
      return res.status(400).json({ message: "Roll number already exists" });
    }

    // Hash password and create a new student
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({ email, password: hashedPassword, rollNumber });
    await newStudent.save();

    res.status(201).json({ message: "Signup successful", success: true });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
};

// Login function
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: student._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

module.exports = { signup, login };
