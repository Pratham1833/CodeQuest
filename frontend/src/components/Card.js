// Card.js
import React from 'react';

const Card = ({ course, onTestStart }) => {
  return (
    <div className="course-card">
      <h3>{course.name}</h3>
      <p>{course.description}</p>
      <button onClick={() => onTestStart(course._id)}>Start Test</button>
    </div>
  );
};

export default Card;
