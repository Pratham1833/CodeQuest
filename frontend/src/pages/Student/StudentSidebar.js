import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/studentSidebar.css";

const StudentSidebar = ({ profile, closeSidebar }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    closeSidebar();
    navigate(path);
  };

  return (
    <div className="sidebar-overlay" onClick={closeSidebar}>
      <div className="sidebar slide-in" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-header">
          <img
            src={profile?.profilePic || "https://via.placeholder.com/100"}
            alt="Profile"
            className="sidebar-profile-pic"
          />
          <p>Hi, {profile?.rollNumber || "Student"}</p>
        </div>
        <div className="sidebar-menu">
          <button onClick={() => handleNavigation("/student/test-history")}>
            Test History
          </button>
          <button onClick={() => handleNavigation("/student/edit-profile")}>
            Edit Profile
          </button>
          <button onClick={() => alert("Chat Room coming soon!")}>
            Chat Room
          </button>
        </div>
        <button className="sidebar-close" onClick={closeSidebar}>
          Close
        </button>
      </div>
    </div>
  );
};

export default StudentSidebar;
