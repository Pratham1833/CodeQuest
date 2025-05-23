import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentsStartedTest, deleteStudentRecord } from "../services/teacherApi";
import '../styles/ViewStudents.css';

const ViewStudents = () => {
  const { courseName } = useParams();
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await getStudentsStartedTest(courseName);
      const updatedStudents = response.data.map(student => ({
        ...student,
        changeCount: student.changeCount ?? 0,
        submissionStatus: student.submitted ? "Submitted" : "Not Submitted",
        submissionReason: student.submissionReason || "",
      }));
      setStudents(updatedStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleRetakeTest = async (studentId, rollNumber) => {
    try {
      const response = await deleteStudentRecord(studentId);
      if (response.status === 200) {
        alert(`Student with Roll Number: ${rollNumber} can now retake the test.`);
        fetchStudents();
      }
    } catch (error) {
      console.error("Error allowing retake:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
    const interval = setInterval(fetchStudents, 10000);
    return () => clearInterval(interval);
  }, [courseName]);

  return (
    <div className="view-students-container">
      <h2>Students in {courseName}</h2>
      {students.length === 0 ? (
        <p className="no-students">No students have started the test yet.</p>
      ) : (
        <table className="students-table">
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Change Count</th>
              <th>Submission Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.rollNumber}</td>
                <td>{student.name}</td>
                <td>
                  {student.changeCount === 0 ? (
                    <span className="zero-change">0</span>
                  ) : (
                    student.changeCount
                  )}
                </td>
                <td>
                  {student.submissionStatus === "Submitted" ? (
                    student.submissionReason === "Submitted by student" ? (
                      <span className="submission-status normal">
                        Submitted
                      </span>
                    ) : (
                      <span className="submission-status malpractice">
                        Submitted ({student.submissionReason})
                      </span>
                    )
                  ) : (
                    <span className="submission-status not-submitted">
                      Not Submitted
                    </span>
                  )}
                </td>
                <td>
                  {/* Only show the "Give Test Again" button if malpractice occurred */}
                  {student.submissionStatus === "Submitted" &&
                    student.submissionReason !== "Submitted by student" && (
                      <button
                        className="give-test-again-btn"
                        onClick={() => handleRetakeTest(student._id, student.rollNumber)}
                      >
                        Allow Retest
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewStudents;
