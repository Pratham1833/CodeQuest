import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../../styles/codeEditor.css";

const CodeEditor = () => {
  const location = useLocation();
  const { question, courseName, rollNumber, name, testId } = location.state || {};

  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupColor, setPopupColor] = useState("green");
  const [isCodeFrozen, setIsCodeFrozen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const editorRef = useRef(null);

  const handleRunCode = async () => {
    if (!code.trim()) {
      setPopupColor("red");
      setPopupMessage("❌ Please enter some code before running.");
      setShowPopup(true);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/student/code/compile", {
        code,
        language,
        input,
      });
      setOutput(res.data.output);
    } catch (err) {
      console.error("Backend error:", err);
      setOutput("❌ Error connecting to code execution server.");
    }
  };

  const submitTest = async (reason = null) => {
    if (isSubmitted) return;

    setIsSubmitted(true);
    setIsCodeFrozen(true);

    setShowPopup(true);
    setPopupColor(reason ? "red" : "green");
    setPopupMessage(
      reason
        ? `❌ Test submitted due to ${reason}.`
        : `✅ Test submitted successfully.`
    );

    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch (err) {
        console.error("Error exiting fullscreen:", err);
      }
    }
    console.log("Submitting:", { testId, rollNumber, code });

    // ✅ Submit test status to backend
    try {
      await axios.put("http://localhost:5000/api/student/test/submit", {
        testId,
        rollNumber,
        code,
        submitted: true,
        submissionReason: reason || "Submitted by student",
      });
    } catch (err) {
      console.error("❌ Failed to mark test as submitted:", err);
    }
  };

  const handleSubmitClick = () => {
    submitTest();
  };

  useEffect(() => {
    const enterFullscreen = async () => {
      if (editorRef.current?.requestFullscreen) {
        try {
          await editorRef.current.requestFullscreen();
        } catch (err) {
          console.error("Error entering fullscreen:", err);
        }
      }
    };
    enterFullscreen();
  }, []);

  useEffect(() => {
    const handleCheat = (reason) => {
      if (!isSubmitted) {
        submitTest(reason);
      }
    };

    const handleKeyDown = (e) => {
      if (isSubmitted) return;

      const cheatKeys = {
        KeyC: "Ctrl+C",
        KeyV: "Ctrl+V",
        KeyX: "Ctrl+X",
        F12: "F12",
      };

      if (e.ctrlKey && cheatKeys[e.code]) {
        e.preventDefault();
        handleCheat(cheatKeys[e.code]);
      }
    };

    const handleVisibilityChange = () => {
      if (!isSubmitted && document.hidden) {
        handleCheat("tab switching or screen change");
      }
    };

    const handleFullscreenChange = () => {
      if (!isSubmitted && !document.fullscreenElement) {
        setIsCodeFrozen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [isSubmitted]);

  return (
    <div className="code-editor-container" ref={editorRef}>
      <h2>Code Editor - {courseName} Test</h2>
      <h3>Question:</h3>
      <p>{question}</p>

      <label>Language:</label>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="python">Python</option>
        <option value="cpp">C++</option>
        <option value="c">C</option>
        <option value="java">Java</option>
      </select>

      <textarea
        className="code-input"
        placeholder="Write your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        disabled={isCodeFrozen}
      />

      <textarea
        className="input-box"
        placeholder="Custom input (optional)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleRunCode} className="run-button">
        Compile/Run
      </button>
      <button
        onClick={handleSubmitClick}
        className="submit-button"
        disabled={isSubmitted}
      >
        Submit
      </button>

      <div className="output-container">
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content" style={{ backgroundColor: popupColor }}>
            <h3>{popupMessage}</h3>
            <div className="popup-buttons">
              <button className="yes-btn" onClick={() => setShowPopup(false)}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;



