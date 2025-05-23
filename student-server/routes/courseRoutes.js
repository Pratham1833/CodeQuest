const express = require("express");
const { addCourse, getCourses } = require("../controllers/courseController");

const router = express.Router();

router.post("/add", addCourse);
router.get("/courses", getCourses);

module.exports = router;
