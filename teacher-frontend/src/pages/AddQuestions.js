import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { addQuestion } from "../services/teacherApi"; // Now correctly importing addQuestion
import "../styles/addQuestions.css";

const AddQuestions = () => {
  const { courseName } = useParams();
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState("");

  const handleAddQuestion = async () => {
    if (!question.trim()) {
      setMessage("Question cannot be empty.");
      return;
    }

    try {
      await addQuestion(courseName, question);
      setMessage("Question added successfully!");
      setQuestion(""); // Clear input after adding
    } catch (error) {
      setMessage("Failed to add question.");
      console.error("Error adding question:", error);
    }
  };

  return (
    <div className="add-questions-container">
      <h2>Add Questions for {courseName}</h2>
      <textarea
        placeholder="Enter your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={handleAddQuestion}>Add Question</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddQuestions;
