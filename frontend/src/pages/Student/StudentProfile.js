import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/studentProfile.css";

const StudentProfile = () => {
  const [profile, setProfile] = useState({ email: "", name: "", rollNumber: "", profilePic: "", courses: [] });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({ name: "", rollNumber: "", profilePic: "" });

  const BACKEND_URL = process.env.REACT_APP_STUDENT_BACKEND_URL || "http://localhost:5000/api/student";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BACKEND_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
        setUpdatedProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [BACKEND_URL]);

  if (loading) return <div>Loading profile...</div>;

  return (
    <div className="student-profile-container">
      <h2>Student Profile</h2>
      <div className="profile-header">
        <img
          src={profile.profilePic || "https://via.placeholder.com/120"}
          alt="Profile"
          className="profile-pic"
        />
        <div className="profile-details">
          <p><strong>Email:</strong> {profile.email}</p>
          {editing ? (
            <>
              <input
                type="text"
                value={updatedProfile.name}
                onChange={(e) => setUpdatedProfile({ ...updatedProfile, name: e.target.value })}
              />
              <input
                type="text"
                value={updatedProfile.rollNumber}
                onChange={(e) => setUpdatedProfile({ ...updatedProfile, rollNumber: e.target.value })}
              />
              <input
                type="text"
                placeholder="Profile Pic URL"
                value={updatedProfile.profilePic}
                onChange={(e) => setUpdatedProfile({ ...updatedProfile, profilePic: e.target.value })}
              />
              <button onClick={() => { setEditing(false); }}>Cancel</button>
              <button onClick={async () => {
                try {
                  const token = localStorage.getItem("token");
                  await axios.put(`${BACKEND_URL}/profile`, updatedProfile, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  alert("Profile updated successfully!");
                  setEditing(false);
                } catch (error) {
                  console.error("Error updating profile:", error);
                  alert("Failed to update profile.");
                }
              }}>Save</button>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Roll Number:</strong> {profile.rollNumber}</p>
              <button onClick={() => setEditing(true)}>Edit Profile</button>
            </>
          )}
        </div>
      </div>
      <div className="courses-section">
        <h3>Your Courses</h3>
        {profile.courses && profile.courses.length > 0 ? (
          <ul>
            {profile.courses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
        ) : (
          <p>No courses enrolled.</p>
        )}
      </div>
      <div className="discussion-room-section">
        <h3>Discussion Forum</h3>
        <p>Join the discussion with your peers and teachers.</p>
        <a href={profile.discussionRoomLink || "#"} target="_blank" rel="noopener noreferrer">
          Go to Discussion Room
        </a>
      </div>
      <div className="notification-section">
        <h3>Upcoming Test Notifications</h3>
        <p>You will receive an email notification one hour before the test starts.</p>
      </div>
    </div>
  );
};

export default StudentProfile;
