import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/editProfile.css";

const EditProfile = () => {
  const [profile, setProfile] = useState({ name: "", rollNumber: "", profilePic: "" });
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const BACKEND_URL = process.env.REACT_APP_STUDENT_BACKEND_URL || "http://localhost:5000/api/student";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BACKEND_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [BACKEND_URL]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${BACKEND_URL}/profile`, profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const response = await axios.post(`${BACKEND_URL}/profile/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      // Update profile picture URL with the URL received from backend
      setProfile({ ...profile, profilePic: response.data.profilePicUrl });
      alert("Profile picture uploaded successfully!");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture.");
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <div className="profile-field">
        <label>Name:</label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />
      </div>
      <div className="profile-field">
        <label>Roll Number:</label>
        <input
          type="text"
          value={profile.rollNumber}
          onChange={(e) => setProfile({ ...profile, rollNumber: e.target.value })}
        />
      </div>
      <div className="profile-field">
        <label>Current Profile Picture:</label>
        <img
          src={profile.profilePic || "/default-profile.png"}
          alt="Profile"
          className="current-profile-pic"
        />
      </div>
      <div className="profile-field">
        <label>Upload New Profile Picture:</label>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <button className="save-button" onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default EditProfile;
