import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../services/studentApi";
import "../../styles/slogin.css";

const StudentSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.endsWith("@pccoepune.org")) {
      setError("Email must end with @pccoepune.org");
      return;
    }

    try {
      await signupUser(email, password, rollNumber);
      navigate("/student-login");
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Student Signup</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email (yourname@pccoepune.org)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          required
        />
        <button type="submit" className="auth-button">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <span onClick={() => navigate("/student-login")}>Login</span>
      </p>
    </div>
  );
};

export default StudentSignup;
