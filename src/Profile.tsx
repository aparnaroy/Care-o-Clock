import { useEffect, useState } from "react";
import axios from "axios";
import "./ProfilePage.css";

// Define User Type
interface EmergencyContact {
  name: string;
  phone_number: string;
}

interface MedicalProfile {
  legal_name: string;
  dob: string;
  emergency_contact: EmergencyContact;
  medical_conditions: string[];
}

interface User {
  email: string;
  medical_profile: MedicalProfile;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const API_URL = import.meta.env.VITE_API_URL || "https://care-o-clock.up.railway.app";

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("❌ No token found, user not logged in.");
        return;
      }

      try {
        console.log("📢 Sending request to:", `${API_URL}/api/user/profile`);

        const response = await axios.get(`${API_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ Server Response:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("❌ Error fetching user:", error);
        setUser(null); // Ensures UI updates even if the request fails
      }
    };

    fetchUser();
  }, [API_URL]); // ✅ Include API_URL as a dependency

  return (
    <div className="container">
      {/* Name and Avatar Placeholder */}
      <div className="flex-container">
        <h2 className="name-text">{user?.medical_profile?.legal_name || "Loading..."}</h2>
        <div className="avatar"></div>
      </div>

      {/* Profile Details */}
      <div className="profile-box">
        <div className="profile-detail">
          <p className="detail-title">DOB:</p>
          <div className="placeholder">{user?.medical_profile?.dob || "Loading..."}</div>
        </div>

        <div className="profile-detail">
          <p className="detail-title">Emergency Contact:</p>
          <div className="placeholder">
            {user?.medical_profile?.emergency_contact
              ? `${user.medical_profile.emergency_contact.name} (${user.medical_profile.emergency_contact.phone_number})`
              : "Loading..."}
          </div>
        </div>

        <div className="profile-detail">
          <p className="detail-title">Medical Condition(s):</p>
          <div className="placeholder">
            {user?.medical_profile?.medical_conditions.length
              ? user.medical_profile.medical_conditions.join(", ")
              : "None"}
          </div>
        </div>
      </div>

      {/* Sign Out Button */}
      <button className="sign-out-button" onClick={() => localStorage.removeItem("token")}>
        SIGN OUT
      </button>
    </div>
  );
};

export default Profile;
