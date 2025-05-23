import { Navigate } from "react-router-dom";
import { useContext } from "react";
import TeacherAuthContext from "../context/TeacherAuthContext";

const ProtectedRoute = ({ component: Component }) => {
  const { teacher } = useContext(TeacherAuthContext);

  return teacher ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
