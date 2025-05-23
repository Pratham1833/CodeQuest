import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/test.css";

const TestPage = () => {
  const { testId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [timer, setTimer] = useState(60);
  const [changesLeft, setChangesLeft] = useState(2);
  const [marksDeducted, setMarksDeducted] = useState(0);

  const testDetails = location.state || {};
  const { courseName, rollNumber } = testDetails;

  useEffect(() => {
    if (!testDetails || !testId || !courseName) {
      alert("Invalid test details. Redirecting to dashboard.");
      navigate("/student-dashboard");
      return;
    }
    if (testDetails.question) {
      setQuestion(testDetails.question);
    } else {
      fetchRandomQuestion();
    }
  }, [testId, testDetails, courseName, navigate]);

  const fetchRandomQuestion = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/student/test/get-random-question/${courseName}`, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.success) {
        setQuestion(response.data.question);
      } else {
        setQuestion("No question available.");
      }
    } catch (err) {
      console.error("Error fetching question:", err);
      setQuestion("Error fetching question.");
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      handleTestCompletion();
    }
  }, [timer]);

  const handleChangeQuestion = async () => {
    if (changesLeft > 0) {
      try {
        const res = await axios.post("http://localhost:5000/api/student/test/change-question", { testId }, {
          headers: { "Content-Type": "application/json" },
        });

        if (res.data.success && res.data.test) {
          setQuestion(res.data.test.question);
          setChangesLeft(res.data.test.remainingChanges);
          setMarksDeducted(res.data.test.marksDeducted);
          setTimer(60);
        } else {
          alert(res.data.message);
        }
      } catch (err) {
        console.error("Error changing question:", err);
        alert("Failed to change question.");
      }
    } else {
      alert("You cannot change the question anymore.");
    }
  };

  const handleQuestionLock = () => {
    // Pass `testId` correctly to the next page
    navigate("/code-editor", {
      state: {
        question,
        courseName,
        rollNumber,
        testId, // Pass testId here
      },
    });
  };

  const handleTestCompletion = () => {
    alert("Time is up! Navigating to code editor.");
    handleQuestionLock();
  };

  return (
    <div className="test-page-container">
      <h2>{courseName} Test</h2>
      <div className="question-container">
        <h3>Question:</h3>
        <p>{question}</p>
      </div>
      <div className="test-info">
        <p>Timer: <span>{timer}s</span></p>
        <p>You have <span>{changesLeft}</span> changes left. For every change, 5 marks will be deducted.</p>
      </div>
      <button onClick={handleChangeQuestion} disabled={changesLeft === 0} className="change-button">
        Change Question
      </button>
      <button onClick={handleQuestionLock} className="lock-button">
        Question Locked
      </button>
    </div>
  );
};

export default TestPage;
