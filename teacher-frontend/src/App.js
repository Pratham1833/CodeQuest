import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TeacherDashboard from "./pages/Dashboard";
import AddQuestions from "./pages/AddQuestions"; 
import ViewStudents from "./pages/ViewStudents"; // ✅ Import ViewStudents Page
import ViewQuestionsPage from "./pages/ViewQuestionsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/teacher-login" element={<Login />} />
        <Route path="/teacher-signup" element={<Signup />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/add-questions/:courseName" element={<AddQuestions />} />
        <Route path="/view-students/:courseName" element={<ViewStudents />} /> {/* ✅ New Route Added */}
        <Route path="/view-questions/:courseName" element={<ViewQuestionsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
