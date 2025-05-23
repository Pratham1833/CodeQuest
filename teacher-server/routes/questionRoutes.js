const express = require("express");
const router = express.Router();
const { addQuestion, getQuestions, deleteQuestion } = require("../controllers/questionController");

router.post("/add", addQuestion);
router.get("/:courseName", getQuestions);
router.delete("/:courseName/:questionId", deleteQuestion);

module.exports = router;
