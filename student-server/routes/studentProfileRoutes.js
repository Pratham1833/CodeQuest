const express = require("express");
const { getStudentProfile, updateStudentProfile } = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get student profile
router.get("/", authMiddleware, getStudentProfile);

// Update student profile
router.put("/", authMiddleware, updateStudentProfile);

module.exports = router;
