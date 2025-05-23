const express = require("express");
const { getStudentProfile, updateStudentProfile, uploadProfilePic } = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");

const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Profile routes
router.get("/", authMiddleware, getStudentProfile);
router.put("/", authMiddleware, updateStudentProfile);
router.post("/upload", authMiddleware, upload.single("profilePic"), uploadProfilePic);

module.exports = router;
