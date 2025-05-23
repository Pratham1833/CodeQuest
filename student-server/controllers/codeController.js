const axios = require("axios");
const TestStartedNew = require("../models/TestStartedNew");

const compileCode = async (req, res) => {
  try {
    const { code, language, input, rollNumber, courseName, isFinalSubmit } = req.body;

    if (!code || !language) {
      return res.status(400).json({ error: "Missing code or language" });
    }

    const paizaLanguageMap = {
      python: "python3",
      cpp: "cpp",
      c: "c",
      java: "java",
    };

    const paizaLang = paizaLanguageMap[language.toLowerCase()];
    if (!paizaLang) {
      return res.status(400).json({ error: "Unsupported language" });
    }

    const createRes = await axios.post("https://api.paiza.io/runners/create", null, {
      params: {
        source_code: code,
        language: paizaLang,
        input: input || "",
        api_key: "guest",
      },
    });

    const { id } = createRes.data;
    let status = "running";
    let result;

    while (status === "running") {
      const statusRes = await axios.get("https://api.paiza.io/runners/get_details", {
        params: {
          id,
          api_key: "guest",
        },
      });

      result = statusRes.data;
      status = result.status;

      if (status === "running") {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
    }

    if (isFinalSubmit && rollNumber && courseName) {
      await TestStartedNew.findOneAndUpdate(
        { rollNumber, courseName },
        {
          submitted: true,
          submissionReason: "Submitted by student",
          submittedCode: code,
        },
        { new: true }
      );
    }

    if (result.stderr) {
      res.json({ output: `❌ ${result.stderr}` });
    } else {
      res.json({ output: result.stdout || "✅ Code ran successfully but returned no output." });
    }
  } catch (err) {
    console.error("Error compiling code:", err);
    res.status(500).json({ output: "❌ Error compiling code" });
  }
};

module.exports = { compileCode };
