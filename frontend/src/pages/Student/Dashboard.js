import React, { useState, useEffect } from "react";
import { fetchCourses } from "../../services/studentApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
    const interval = setInterval(loadCourses, 3000);
    return () => clearInterval(interval);
  }, []);

  const loadCourses = async () => {
    try {
      const updatedCourses = await fetchCourses();
      setCourses([...updatedCourses]);
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !rollNumber) {
      alert("Please enter all details!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/student/test/start-test", {
        name,
        rollNumber,
        courseName: selectedCourse,
      });
      if (response.data.success && response.data.testId) {
        alert("Test Started!");
        const testId = response.data.testId;

        const testData = {
          testId,
          courseName: selectedCourse,
          rollNumber,
          question: response.data.question,
        };

        localStorage.setItem("testDetails", JSON.stringify(testData));

        navigate(`/student/test/${testId}`, {
          state: testData,
        });
      } else {
        alert(response.data.message || "Error: Could not start test.");
      }
    } catch (error) {
      console.error("Error starting test:", error);
      alert(error.response?.data?.message || "Error starting test. Please try again.");
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Course Dashboard</h2>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div className="course-cards">
          {courses.map((course) => (
            <div key={course._id} className="course-card">
              <div className="course-title">{course.name}</div>
              <div className="course-description">{course.description || "No description available."}</div>
              <button
                className={course.testEnabled ? "enabled-button" : "disabled-button"}
                disabled={!course.testEnabled}
                onClick={() => setSelectedCourse(course.name)}
              >
                {course.testEnabled ? "Start Test" : "Test Not Available"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Popup form for starting test */}
      {selectedCourse && (
        <div className="popup">
          <div className="popup-content">
            <h2>Start Test - {selectedCourse}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Enter Roll No: TYITA001, TYITA025"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                required
              />
              <button type="submit">Start Test</button>
            </form>
            <button onClick={() => setSelectedCourse(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
