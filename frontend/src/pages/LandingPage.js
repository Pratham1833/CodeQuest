import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h1>Welcome to Code Quest Platform</h1>
      <div className="options">
        {/* Button to navigate to student login */}
        <button
          className="student-login-btn"
          onClick={() => navigate("/student-login")}
        >
          Login as Student
        </button>
        {/* Button to navigate to teacher login */}
        {/* <button
          className="teacher-login-btn"
          onClick={() => navigate("/teacher-dashboard")}
        >
          Login as Teacher
        </button> */}
        {/* <button
          className="teacher-signup-btn"
          onClick={() => navigate("/teacher-signup")}
        >
          Signup as Teacher
      </button> */}
      </div>
    </div>
  );
};

export default LandingPage;
