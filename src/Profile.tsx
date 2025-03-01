import React from "react";
import "./ProfilePage.css";

const ProfilePage = () => {
  return (
    <div className="container">
      {/* Name and Avatar Placeholder */}
      <div className="flex-container">
        <h2 className="name-text">Robert Doe</h2>
        <div className="avatar"></div>
      </div>

      {/* Profile Details */}
      <div className="profile-box">
        <div className="profile-detail">
          <p className="detail-title">DOB:</p>
          <div className="placeholder"></div>
        </div>

        <div className="profile-detail">
          <p className="detail-title">Provider:</p>
          <div className="placeholder"></div>
        </div>

        <div className="profile-detail">
          <p className="detail-title">Emergency Contact:</p>
          <div className="placeholder"></div>
        </div>

        <div className="profile-detail">
          <p className="detail-title">Medical Condition(s):</p>
          <div className="placeholder"></div>
        </div>
      </div>

      {/* Sign Out Button */}
      <button className="sign-out-button">SIGN OUT</button>
    </div>
  );
};

export default ProfilePage;
