import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; // Ensure correct CSS import

const TeacherLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await fetch('http://localhost:6001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      
      if (response.ok) {
        console.log('Login Successful:', data);
        navigate('/teacher-dashboard');
      } else {
        console.error('Login Failed:', data);
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Fetch Error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Teacher Login</h2>
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleLogin}>
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
        <button type="submit" className="auth-button">Login</button>
      </form>

      <p className="signup-text">
        Don't have an account? 
        <span className="signup-link" onClick={() => navigate('/teacher-signup')}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default TeacherLogin;
