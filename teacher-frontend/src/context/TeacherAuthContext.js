import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const TeacherAuthContext = createContext();

export const TeacherAuthProvider = ({ children }) => {
  const [teacher, setTeacher] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("teacherToken");
    if (token) {
      const decoded = jwtDecode(token);
      setTeacher(decoded);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("teacherToken", token);
    setTeacher(jwtDecode(token));
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("teacherToken");
    setTeacher(null);
    navigate("/login");
  };

  return (
    <TeacherAuthContext.Provider value={{ teacher, login, logout }}>
      {children}
    </TeacherAuthContext.Provider>
  );
};

export default TeacherAuthContext;
