import React, { useState } from "react";
import axios from "axios";

const StartTestForm = ({ course, onClose }) => {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !rollNumber) {
      alert("Please enter all details!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/students/start-test", { name, rollNumber, course });
      alert("Test Started!");
      onClose();
      window.location.href = `/test/${course}`;
    } catch (error) {
      alert("Error starting test");
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Start Test - {course}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="text" placeholder="Roll Number" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} required />
          <button type="submit">Start Test</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default StartTestForm;
