import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css"; // Import styles (reuse from student frontend if needed)

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>Welcome to the Teacher Portal</h1>
      <p>Manage courses, analyze student performance, and conduct tests efficiently.</p>
      
      <div className="button-container">
        <button className="btn login-btn" onClick={() => navigate("/teacher-login")}>
          Login as Teacher
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
