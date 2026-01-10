import React from "react";
import useAuth from "../hooks/useAuth";
import "./ProfilePage.css";

export default function ProfilePage() {
  const { user } = useAuth();

  const displayUser = user || {
    name: "Student User",
    email: "student@example.com",
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src="https://source.unsplash.com/200x200/?portrait,person"
          alt="Profile"
        />
        <h2>{displayUser.name}</h2>
        <p className="email">{displayUser.email}</p>

        <button className="edit-btn">Edit Profile</button>
      </div>

      <div className="settings-card">
        <h3>Account Settings</h3>
        <div className="setting-item">Change Password</div>
        <div className="setting-item">Notification Preferences</div>
        <div className="setting-item">Privacy Settings</div>
      </div>
    </div>
  );
}
