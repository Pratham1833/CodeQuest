import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestions, deleteQuestion } from "../services/teacherApi";
import "../styles/ViewQuestions.css";

const ViewQuestionsPage = () => {
  const { courseName } = useParams();
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestions(courseName);
        // Ensure response.data is an array
        setQuestions(Array.isArray(response.data.questions) ? response.data.questions : []);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };
    fetchQuestions();
  }, [courseName]);

  const handleDeleteQuestion = async (index) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await deleteQuestion(courseName, index);
        setQuestions(questions.filter((_, i) => i !== index));
      } catch (error) {
        console.error("Failed to delete question:", error);
      }
    }
  };

  return (
    <div className="view-questions-container">
      <h2>Questions for {courseName}</h2>
      {questions.length === 0 ? (
        <p>No questions available.</p>
      ) : (
        <table className="questions-table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q, index) => (
              <tr key={index}>
                <td>{q}</td>
                <td>
                  <button onClick={() => handleDeleteQuestion(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="back-btn" onClick={() => navigate("/teacher-dashboard")}>Back</button>
    </div>
  );
};

export default ViewQuestionsPage;
