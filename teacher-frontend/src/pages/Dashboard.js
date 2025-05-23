import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addCourse, getCourses, startTest, deleteCourse } from "../services/teacherApi";
import "../styles/dashboard.css";

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await getCourses();
      setCourses(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    }
  };

  const handleStartTest = async (courseName) => {
    try {
      const response = await startTest(courseName);
      alert(response.data.message);
      loadCourses();
    } catch (error) {
      alert(error.response?.data?.message || "Error starting test.");
    }
  };

  const handleAddCourse = async () => {
    if (!courseName.trim() || !courseDescription.trim()) {
      alert("Course name and description are required.");
      return;
    }
    try {
      await addCourse({ name: courseName, description: courseDescription });
      loadCourses();
      setShowModal(false);
      setCourseName("");
      setCourseDescription("");
    } catch (error) {
      console.error("Failed to add course:", error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(courseId);
        setCourses((prev) => prev.filter((course) => course._id !== courseId));
      } catch (error) {
        console.error("Failed to delete course:", error);
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📚 Teacher Dashboard</h2>

      <button className="add-course-button" onClick={() => setShowModal(true)}>
        ➕ Add Course
      </button>

      {courses.length === 0 ? (
        <p className="no-courses">No courses available.</p>
      ) : (
        <div className="course-cards">
          {courses.map((course) => (
            <div key={course._id} className="course-card">
              <h3 className="course-title">{course.name}</h3>

              <div className="button-group">
                <div className="tooltip">
                  <button
                    className={course.isTestActive ? "test-started-btn" : "start-btn"}
                    onClick={() => handleStartTest(course.name)}
                    disabled={course.isTestActive}
                  >
                    {course.isTestActive ? "✅ Test Started" : "🚀 Start Test"}
                  </button>
                  <span className="tooltip-text">Start the test for students</span>
                </div>

                <div className="tooltip">
                  <button
                    className="view-students-btn"
                    onClick={() => navigate(`/view-students/${course.name}`)}
                  >
                    🧑‍🎓 View Students
                  </button>
                  <span className="tooltip-text">See students who started the test</span>
                </div>

                <div className="tooltip">
                  <button
                    className="view-questions-btn"
                    onClick={() => navigate(`/view-questions/${course.name}`)}
                  >
                    📜 View Questions
                  </button>
                  <span className="tooltip-text">View all questions of this course</span>
                </div>

                <div className="tooltip">
                  <button
                    className="add-question-btn"
                    onClick={() => navigate(`/add-questions/${course.name}`)}
                  >
                    ➕ Add Questions
                  </button>
                  <span className="tooltip-text">Add new questions to this course</span>
                </div>

                <div className="tooltip">
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteCourse(course._id)}
                  >
                    ❌ Delete
                  </button>
                  <span className="tooltip-text">Course will be deleted from both sides</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Adding New Course */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Course</h3>

            <input
              type="text"
              placeholder="Course Name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="modal-input"
            />

            <textarea
              placeholder="Course Description"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              className="modal-textarea"
            />

            <div className="modal-buttons">
              <button className="modal-add-btn" onClick={handleAddCourse}>
                Add Course
              </button>
              <button className="modal-cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
