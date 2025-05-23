const express = require("express");
const { compileCode } = require("../controllers/codeController");

const router = express.Router();

router.post("/compile", compileCode);

module.exports = router;
