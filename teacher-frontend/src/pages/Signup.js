import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css'; // Ensure correct CSS import

const TeacherSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.endsWith('@pccoepune.org')) {
      setError('Email must end with @pccoepune.org');
      return;
    }

    try {
      const response = await fetch('http://localhost:6001/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      console.log(data); // Log response for debugging

      if (response.ok) {
        navigate('/teacher-login');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup Error:', err);
      setError('Something went wrong. Please try again.(Frontend)');
    }
  };

  return (
    <div className="auth-container">
      <h2>Teacher Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit" className="auth-button">Sign Up</button>
      </form>
      <p>
        Already have an account? <span onClick={() => navigate('/teacher-login')}>Login</span>
      </p>
    </div>
  );
};

export default TeacherSignup;
