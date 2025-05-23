const express = require("express");
const router = express.Router();
const { startTestForCourse, getStudentsByCourse, deleteStudentRecord  } = require("../controllers/testController");

// Route to start test for a course (teacher side)
router.post("/:courseName/start-test", startTestForCourse);

// Route to get students who have started the test for a course
router.get("/get-students-started/:course", getStudentsByCourse);

router.delete("/retake-test/:studentId", deleteStudentRecord);


module.exports = router;

