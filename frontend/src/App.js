import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/LandingPage";

// Student pages
import StudentLogin from "./pages/Student/Login";
import StudentSignup from "./pages/Student/Signup";
import StudentDashboard from "./pages/Student/Dashboard";
import TestPage from "./pages/Student/Test";
import CodeEditor from "./pages/Student/CodeEditor";

// Shared
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-signup" element={<StudentSignup />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student/test/:testId" element={<TestPage />} />
        <Route path="/code-editor" element={<CodeEditor/>} />
        <Route path="/student/*" element={<Navigate to="/student-dashboard" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;





