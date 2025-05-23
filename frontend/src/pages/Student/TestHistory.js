import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/testHistory.css";

const TestHistory = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = process.env.REACT_APP_STUDENT_BACKEND_URL || "http://localhost:5000/api/student";

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BACKEND_URL}/test-results`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResults(response.data.results || []);
      } catch (error) {
        console.error("Error fetching test results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestResults();
  }, [BACKEND_URL]);

  if (loading) return <p>Loading test history...</p>;

  return (
    <div className="test-history-container">
      <h2>Your Test History</h2>
      {results.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Date</th>
              <th>Result</th>
              <th>Changes</th>
              <th>Marks Deducted</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.courseName}</td>
                <td>{new Date(result.testDate).toLocaleDateString()}</td>
                <td>{result.result}</td>
                <td>{result.changeCount}</td>
                <td>{result.marksDeducted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No test history available.</p>
      )}
    </div>
  );
};

export default TestHistory;
